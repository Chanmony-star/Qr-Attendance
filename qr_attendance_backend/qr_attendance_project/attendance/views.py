"""
views.py – Backend & Auth views for QR Attendance System.

Member 2 Scope – Admin/Auth views with proper validation and error handling.

Admin / Teacher views  (login required)
────────────────────────────────────────
  admin_login          GET|POST /login/
  admin_logout         GET      /logout/
  dashboard            GET      /dashboard/
  create_session       GET|POST /session/create/
  session_detail       GET      /session/<uuid>/

Student-facing views  (public)
───────────────────────────────
  submit_attendance    POST     /submit-attendance/
"""

import logging
from datetime import timedelta

from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.views.decorators.http import require_http_methods, require_POST, require_GET
from django.views.decorators.csrf import csrf_protect

from .forms import (
    AdminLoginForm, CreateSessionForm,
    AttendanceSubmitForm,
)
from .models import AttendanceSession, AttendanceRecord, Student
from .services import (
    create_session_with_qr,
    get_client_ip,
    verify_gps,
    verify_wifi,
)

logger = logging.getLogger(__name__)


# ═══════════════════════════════════════════════════════════════════════════════
#  AUTH VIEWS
# ═══════════════════════════════════════════════════════════════════════════════

@require_http_methods(['GET', 'POST'])
def admin_login(request):
    """Teacher / admin login page."""
    if request.user.is_authenticated:
        return redirect('dashboard')

    form = AdminLoginForm(request=request, data=request.POST or None)

    if request.method == 'POST' and form.is_valid():
        login(request, form.get_user())
        logger.info("Teacher logged in: %s", form.get_user().username)
        next_url = request.GET.get('next', 'dashboard')
        return redirect(next_url)

    return render(request, 'attendance/login.html', {'form': form})


@login_required
def admin_logout(request):
    """Log out and redirect to login page."""
    username = request.user.username
    logout(request)
    logger.info("Teacher logged out: %s", username)
    return redirect('admin_login')


# ═══════════════════════════════════════════════════════════════════════════════
#  DASHBOARD
# ═══════════════════════════════════════════════════════════════════════════════

@login_required
@require_GET
def dashboard(request):
    """
    Main teacher dashboard.
    Shows all sessions owned by the logged-in teacher,
    newest first.
    """
    sessions = (
        AttendanceSession.objects
        .filter(teacher=request.user)
        .prefetch_related('records')
        .order_by('-created_at')
    )

    # Annotate quick stats
    total_sessions = sessions.count()
    open_sessions  = sessions.filter(status=AttendanceSession.STATUS_OPEN).count()

    context = {
        'sessions':       sessions,
        'total_sessions': total_sessions,
        'open_sessions':  open_sessions,
        'now':            timezone.now(),
    }
    return render(request, 'attendance/dashboard.html', context)


# ═══════════════════════════════════════════════════════════════════════════════
#  SESSION MANAGEMENT
# ═══════════════════════════════════════════════════════════════════════════════

@login_required
@require_http_methods(['GET', 'POST'])
def create_session(request):
    """Create a new attendance session and generate a QR code."""
    form = CreateSessionForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        cd = form.cleaned_data
        try:
            session = create_session_with_qr(
                request=request,
                teacher=request.user,
                course_name=cd['course_name'],
                description=cd.get('description', ''),
            )
            # Override expiry with the teacher's chosen duration

            session.expires_at = session.created_at + timedelta(minutes=cd['duration_minutes'])
            session.save(update_fields=['expires_at'])

            logger.info("New session %s created by %s", session.id, request.user.username)
            return redirect('session_detail', pk=session.pk)

        except Exception as exc:
            logger.error("Failed to create session: %s", exc)
            form.add_error(None, 'Could not create session. Please try again.')

    return render(request, 'attendance/create_session.html', {'form': form})


@login_required
@require_GET
def session_detail(request, pk):
    """Show a single session: QR code + live attendance list."""
    session = get_object_or_404(AttendanceSession, pk=pk, teacher=request.user)
    records = session.records.select_related('student').order_by('-submitted_at')

    context = {
        'session': session,
        'records': records,
        'now':     timezone.now(),
    }
    return render(request, 'attendance/session_detail.html', context)


# ═══════════════════════════════════════════════════════════════════════════════
#  ATTENDANCE SUBMIT  (public endpoint)
# ═══════════════════════════════════════════════════════════════════════════════

@require_POST
@csrf_protect
def submit_attendance(request):
    """
    AJAX / form POST endpoint that records attendance.

    Receives
    --------
    token        – session token
    student_uuid – UUID from cookie / hidden field
    latitude     – GPS lat from browser (optional but checked)
    longitude    – GPS lon from browser (optional but checked)
    """
    form = AttendanceSubmitForm(request.POST)
    if not form.is_valid():
        return JsonResponse({'success': False, 'errors': form.errors}, status=400)

    cd = form.cleaned_data
    token        = request.POST.get('token', '').strip()
    student_uuid = cd.get('student_uuid') or request.COOKIES.get('qr_student_id')

    # ── 1. Validate session ────────────────────────────────────────────────────
    try:
        session = AttendanceSession.objects.get(token=token)
    except AttendanceSession.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Invalid session token.'}, status=404)

    if not session.is_active:
        return JsonResponse({'success': False, 'error': 'Session is closed or expired.'}, status=410)

    # ── 2. Identify student ────────────────────────────────────────────────────
    try:
        student = Student.objects.get(pk=student_uuid)
    except (Student.DoesNotExist, ValueError, TypeError):
        return JsonResponse({
            'success': False,
            'error':   'Student not recognised. Please scan the QR code again.',
        }, status=403)

    # ── 3. Duplicate check ─────────────────────────────────────────────────────
    if AttendanceRecord.objects.filter(session=session, student=student).exists():
        return JsonResponse({
            'success':  False,
            'error':    'You have already marked attendance for this session.',
            'duplicate': True,
        }, status=409)

    # ── 4. WiFi verification ───────────────────────────────────────────────────
    ip_address    = get_client_ip(request)
    wifi_verified = verify_wifi(ip_address)

    # ── 5. GPS verification ────────────────────────────────────────────────────
    gps_verified  = False
    gps_distance  = None
    lat = cd.get('latitude')
    lon = cd.get('longitude')

    if lat is not None and lon is not None:
        gps_verified, gps_distance = verify_gps(lat, lon)
    else:
        logger.warning("No GPS data provided by student %s", student.student_id)

    # ── 6. Save record ─────────────────────────────────────────────────────────
    try:
        record = AttendanceRecord.objects.create(
            session        = session,
            student        = student,
            ip_address     = ip_address,
            wifi_verified  = wifi_verified,
            gps_verified   = gps_verified,
            gps_latitude   = lat,
            gps_longitude  = lon,
            gps_distance_m = gps_distance,
            user_agent     = request.META.get('HTTP_USER_AGENT', '')[:500],
        )
        logger.info("Attendance recorded: student=%s session=%s wifi=%s gps=%s",
                    student.student_id, session.id, wifi_verified, gps_verified)
    except IntegrityError:
        # Race condition: duplicate insert caught by DB unique_together
        return JsonResponse({
            'success':  False,
            'error':    'Duplicate attendance detected.',
            'duplicate': True,
        }, status=409)

    # ── 7. Build verification summary ──────────────────────────────────────────
    warnings = []
    if not wifi_verified:
        warnings.append('You do not appear to be on the school WiFi.')
    if lat is None:
        warnings.append('GPS location was not shared.')
    elif not gps_verified:
        warnings.append(f'Your GPS location is {gps_distance} m from school (limit: 150 m).')

    return JsonResponse({
        'success':       True,
        'message':       'Attendance recorded successfully!',
        'student_name':  student.full_name,
        'course':        session.course_name,
        'submitted_at':  record.submitted_at.isoformat(),
        'wifi_verified': wifi_verified,
        'gps_verified':  gps_verified,
        'gps_distance':  gps_distance,
        'warnings':      warnings,
    })
