"""
models.py – Database schema for QR Attendance System.

Tables
------
Student          – remembered student profile (set once, reused forever)
AttendanceSession – a class/lecture session created by a teacher
AttendanceRecord  – one row per student per session (prevents duplicates)
RateLimitLog      – lightweight abuse-prevention log (IP + timestamp)
"""

import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Student(models.Model):
    """
    Persisted student profile created on first QR scan.
    Identified by a UUID stored in the browser cookie so the
    student never has to re-enter their details.
    """
    id           = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_id   = models.CharField(max_length=20, unique=True, db_index=True,
                                    help_text="Official student ID number, e.g. ST-2024-001")
    full_name    = models.CharField(max_length=120)
    email        = models.EmailField(unique=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    last_seen_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['full_name']

    def __str__(self):
        return f"{self.full_name} ({self.student_id})"


class AttendanceSession(models.Model):
    """
    A single class session (lecture, lab, etc.) created by a teacher.
    Generates one unique token that powers the QR code URL.
    """
    STATUS_OPEN   = 'open'
    STATUS_CLOSED = 'closed'
    STATUS_CHOICES = [
        (STATUS_OPEN,   'Open'),
        (STATUS_CLOSED, 'Closed'),
    ]

    id          = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    teacher     = models.ForeignKey(User, on_delete=models.CASCADE,
                                    related_name='sessions')
    course_name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    token       = models.CharField(max_length=128, unique=True, db_index=True,
                                   help_text="Secret token embedded in the QR code URL")
    qr_code     = models.ImageField(upload_to='qrcodes/', blank=True,
                                    help_text="Generated QR code PNG")
    status      = models.CharField(max_length=10, choices=STATUS_CHOICES,
                                   default=STATUS_OPEN)
    created_at  = models.DateTimeField(auto_now_add=True)
    expires_at  = models.DateTimeField(help_text="Token expires after this time")

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.course_name} – {self.created_at:%Y-%m-%d %H:%M}"

    @property
    def is_active(self):
        """True when the session is open AND the token has not expired."""
        return self.status == self.STATUS_OPEN and timezone.now() < self.expires_at

    @property
    def attendance_count(self):
        return self.records.count()


class AttendanceRecord(models.Model):
    """
    One row per (student, session) pair.
    The unique_together constraint is the database-level guard
    against duplicate submissions.
    """
    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session       = models.ForeignKey(AttendanceSession, on_delete=models.CASCADE,
                                      related_name='records')
    student       = models.ForeignKey(Student, on_delete=models.CASCADE,
                                      related_name='records')
    # Verification metadata stored for audit purposes
    submitted_at  = models.DateTimeField(auto_now_add=True)
    ip_address    = models.GenericIPAddressField()
    wifi_verified = models.BooleanField(default=False,
                                        help_text="IP matched school WiFi subnet")
    gps_latitude  = models.FloatField(null=True, blank=True)
    gps_longitude = models.FloatField(null=True, blank=True)
    gps_verified  = models.BooleanField(default=False,
                                        help_text="GPS coords within school radius")
    gps_distance_m = models.FloatField(null=True, blank=True,
                                       help_text="Calculated distance from school (metres)")
    user_agent    = models.TextField(blank=True)

    class Meta:
        unique_together = ('session', 'student')   # ← prevents duplicate attendance
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.student} @ {self.session.course_name} ({self.submitted_at:%H:%M})"


class RateLimitLog(models.Model):
    """
    Tracks scan attempts per IP to prevent brute-force / flooding.
    Old entries are cleaned up by the middleware automatically.
    """
    ip_address  = models.GenericIPAddressField(db_index=True)
    attempted_at = models.DateTimeField(auto_now_add=True)
    endpoint    = models.CharField(max_length=60, default='submit')

    class Meta:
        ordering = ['-attempted_at']

    def __str__(self):
        return f"{self.ip_address} at {self.attempted_at:%H:%M:%S}"
