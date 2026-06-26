"""
services.py – Business logic layer for QR Attendance System.

Keeps views thin by encapsulating:
  • QR code generation
  • Attendance token creation & validation
  • GPS distance verification
  • WiFi / IP subnet verification
  • Student remember-me cookie helpers
"""

import io
import math
import secrets
import ipaddress
import logging

import qrcode
from django.conf import settings
from django.core.files.base import ContentFile
from django.utils import timezone
from datetime import timedelta

from .utils import (
    SCHOOL_LATITUDE, SCHOOL_LONGITUDE, SCHOOL_RADIUS_METERS,
    SCHOOL_WIFI_SUBNETS, TOKEN_BYTE_LENGTH,
    STUDENT_COOKIE_NAME, STUDENT_SESSION_KEY,
)

logger = logging.getLogger(__name__)


# ── Token helpers ──────────────────────────────────────────────────────────────

def generate_session_token() -> str:
    """Return a cryptographically secure random hex token."""
    return secrets.token_hex(TOKEN_BYTE_LENGTH)


def build_scan_url(request, token: str) -> str:
    """Build the absolute URL a student lands on after scanning."""
    return request.build_absolute_uri(f'/scan/{token}/')


# ── QR code generation ─────────────────────────────────────────────────────────

def generate_qr_code(data: str) -> ContentFile:
    """
    Render *data* as a QR code PNG and return it as a Django ContentFile
    ready to be saved to an ImageField.
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color='black', back_color='white')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    return ContentFile(buffer.getvalue())


def create_session_with_qr(request, teacher, course_name: str,
                            description: str = '') -> 'AttendanceSession':
    """
    Factory that creates an AttendanceSession, generates a token,
    and saves the QR code image in one step.
    """
    from .models import AttendanceSession  # local import avoids circular deps

    expiry_minutes = getattr(settings, 'ATTENDANCE_TOKEN_EXPIRY_MINUTES', 30)
    token = generate_session_token()
    scan_url = build_scan_url(request, token)

    session = AttendanceSession(
        teacher=teacher,
        course_name=course_name,
        description=description,
        token=token,
        expires_at=timezone.now() + timedelta(minutes=expiry_minutes),
    )

    # Save QR code image to media/qrcodes/
    qr_image = generate_qr_code(scan_url)
    session.qr_code.save(f'qr_{token[:12]}.png', qr_image, save=False)
    session.save()

    logger.info("Session created: %s by %s (expires %s)",
                session.id, teacher.username, session.expires_at)
    return session


# ── GPS verification ───────────────────────────────────────────────────────────

def haversine_distance(lat1: float, lon1: float,
                       lat2: float, lon2: float) -> float:
    """
    Return the great-circle distance in metres between two GPS points
    using the Haversine formula.
    """
    R = 6_371_000  # Earth radius in metres
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = (math.sin(dphi / 2) ** 2
         + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2)
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def verify_gps(latitude: float, longitude: float) -> tuple[bool, float]:
    """
    Check whether (latitude, longitude) is within SCHOOL_RADIUS_METERS
    of the school's coordinates.

    Returns
    -------
    (is_within_radius, distance_in_metres)
    """
    distance = haversine_distance(
        SCHOOL_LATITUDE, SCHOOL_LONGITUDE,
        latitude, longitude,
    )
    return distance <= SCHOOL_RADIUS_METERS, round(distance, 1)


# ── WiFi / IP verification ─────────────────────────────────────────────────────

def get_client_ip(request) -> str:
    """
    Extract the real client IP, honouring X-Forwarded-For when behind
    a reverse proxy (nginx, etc.).
    """
    xff = request.META.get('HTTP_X_FORWARDED_FOR')
    if xff:
        # X-Forwarded-For can be a comma-separated list; the first is the client
        return xff.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', '127.0.0.1')


def verify_wifi(ip_address: str) -> bool:
    """
    Return True if *ip_address* falls within one of the school's
    known WiFi subnets (defined in utils.SCHOOL_WIFI_SUBNETS).
    """
    try:
        client_ip = ipaddress.ip_address(ip_address)
    except ValueError:
        logger.warning("Invalid IP address for WiFi check: %s", ip_address)
        return False

    for subnet_str in SCHOOL_WIFI_SUBNETS:
        try:
            if client_ip in ipaddress.ip_network(subnet_str, strict=False):
                return True
        except ValueError:
            logger.error("Invalid subnet in SCHOOL_WIFI_SUBNETS: %s", subnet_str)
    return False


# ── Student remember-me helpers ────────────────────────────────────────────────

def get_remembered_student(request):
    """
    Look up the Student whose UUID is stored in the remember-me cookie.
    Returns a Student instance or None.
    """
    from .models import Student
    student_uuid = request.COOKIES.get(STUDENT_COOKIE_NAME)
    if not student_uuid:
        return None
    try:
        return Student.objects.get(pk=student_uuid)
    except (Student.DoesNotExist, ValueError):
        return None


def set_student_cookie(response, student) -> None:
    """
    Write the student's UUID into a long-lived cookie so the browser
    remembers them across sessions and devices (on the same browser).
    """
    max_age = getattr(settings, 'STUDENT_COOKIE_DAYS', 365) * 24 * 60 * 60
    response.set_cookie(
        STUDENT_COOKIE_NAME,
        str(student.id),
        max_age=max_age,
        httponly=True,   # JS cannot read it
        samesite='Lax',
    )


def store_student_in_session(request, student) -> None:
    """Cache lightweight student info in the server-side session."""
    request.session[STUDENT_SESSION_KEY] = {
        'id':         str(student.id),
        'student_id': student.student_id,
        'full_name':  student.full_name,
        'email':      student.email,
    }
