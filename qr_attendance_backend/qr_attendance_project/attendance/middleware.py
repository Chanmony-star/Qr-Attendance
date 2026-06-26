"""
middleware.py – Custom middleware for QR Attendance System.

StudentRememberMeMiddleware
    Reads the student UUID cookie on every request and attaches
    the Student object to request.remembered_student so views
    don't have to repeat the lookup.

AttendanceRateLimitMiddleware
    Blocks IPs that exceed RATE_LIMIT_MAX_ATTEMPTS scan or submit
    attempts within RATE_LIMIT_WINDOW_SECONDS.  Uses the database
    RateLimitLog table (no external cache required for a school project).
"""

import logging
from datetime import timedelta

from django.conf import settings
from django.http import JsonResponse
from django.utils import timezone

from .utils import STUDENT_COOKIE_NAME

logger = logging.getLogger(__name__)

# Endpoints that the rate limiter watches
RATE_LIMITED_PATHS = ('/scan/', '/submit-attendance/', '/attendance/submit/')


class StudentRememberMeMiddleware:
    """
    Attach request.remembered_student on every request.

    Views can check `request.remembered_student` instead of
    performing their own cookie → DB lookup.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        student_uuid = request.COOKIES.get(STUDENT_COOKIE_NAME)
        request.remembered_student = None

        if student_uuid:
            # Lazy import avoids circular dependency at module load time
            from .models import Student
            try:
                request.remembered_student = Student.objects.get(pk=student_uuid)
            except (Student.DoesNotExist, ValueError):
                # Cookie is stale / tampered – will be cleared on next response
                pass

        response = self.get_response(request)
        return response


class AttendanceRateLimitMiddleware:
    """
    Reject requests from IPs that spam the attendance endpoint.

    Algorithm
    ---------
    1. On each request to a rate-limited path, count DB rows for this
       IP within the rolling window.
    2. If the count exceeds the limit → return 429 JSON response.
    3. Otherwise log the attempt and let the request through.
    4. Periodically purge old rows (every 100 requests) to keep the
       table small.
    """

    MAX_ATTEMPTS = getattr(settings, 'RATE_LIMIT_MAX_ATTEMPTS', 10)
    WINDOW       = getattr(settings, 'RATE_LIMIT_WINDOW_SECONDS', 60)
    _counter     = 0   # class-level purge counter

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if any(request.path.startswith(p) for p in RATE_LIMITED_PATHS):
            response = self._check_rate_limit(request)
            if response:
                return response

        return self.get_response(request)

    # ── helpers ───────────────────────────────────────────────────────────────

    def _get_client_ip(self, request) -> str:
        xff = request.META.get('HTTP_X_FORWARDED_FOR', '')
        return xff.split(',')[0].strip() if xff else request.META.get('REMOTE_ADDR', '0.0.0.0')

    def _check_rate_limit(self, request):
        from .models import RateLimitLog

        ip = self._get_client_ip(request)
        window_start = timezone.now() - timedelta(seconds=self.WINDOW)

        attempt_count = RateLimitLog.objects.filter(
            ip_address=ip,
            attempted_at__gte=window_start,
        ).count()

        if attempt_count >= self.MAX_ATTEMPTS:
            logger.warning("Rate limit hit for IP %s (%d attempts)", ip, attempt_count)
            return JsonResponse(
                {
                    'error': 'Too many requests. Please wait before trying again.',
                    'retry_after_seconds': self.WINDOW,
                },
                status=429,
            )

        # Log this attempt
        RateLimitLog.objects.create(ip_address=ip, endpoint='submit')

        # Periodic cleanup – every 100 logged requests delete old rows
        AttendanceRateLimitMiddleware._counter += 1
        if AttendanceRateLimitMiddleware._counter % 100 == 0:
            cutoff = timezone.now() - timedelta(seconds=self.WINDOW * 2)
            deleted, _ = RateLimitLog.objects.filter(attempted_at__lt=cutoff).delete()
            logger.debug("Rate limit log cleanup: removed %d old entries", deleted)

        return None  # allow the request through
