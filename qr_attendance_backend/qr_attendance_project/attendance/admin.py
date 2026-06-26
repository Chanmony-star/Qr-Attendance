"""
admin.py – Django admin configuration for QR Attendance System.

Registers all models with custom list displays, filters, and search
so teachers and admins can manage data from the Django admin panel.
"""

from django.contrib import admin
from django.utils.html import format_html

from .models import AttendanceSession, AttendanceRecord, Student, RateLimitLog


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display  = ('student_id', 'full_name', 'email', 'created_at', 'last_seen_at')
    search_fields = ('student_id', 'full_name', 'email')
    readonly_fields = ('id', 'created_at', 'last_seen_at')
    ordering = ('full_name',)


class AttendanceRecordInline(admin.TabularInline):
    model         = AttendanceRecord
    extra         = 0
    readonly_fields = ('student', 'submitted_at', 'ip_address',
                       'wifi_verified', 'gps_verified', 'gps_distance_m')
    can_delete    = False
    show_change_link = True


@admin.register(AttendanceSession)
class AttendanceSessionAdmin(admin.ModelAdmin):
    list_display   = ('course_name', 'teacher', 'status', 'created_at',
                      'expires_at', 'attendance_count', 'qr_preview')
    list_filter    = ('status', 'teacher', 'created_at')
    search_fields  = ('course_name', 'teacher__username')
    readonly_fields = ('id', 'token', 'qr_code', 'created_at', 'qr_preview')
    inlines        = [AttendanceRecordInline]
    ordering       = ('-created_at',)

    def qr_preview(self, obj):
        if obj.qr_code:
            return format_html('<img src="{}" style="width:80px;height:80px;" />', obj.qr_code.url)
        return '—'
    qr_preview.short_description = 'QR Code'

    def attendance_count(self, obj):
        return obj.records.count()
    attendance_count.short_description = '# Students'


@admin.register(AttendanceRecord)
class AttendanceRecordAdmin(admin.ModelAdmin):
    list_display  = ('student', 'session', 'submitted_at', 'ip_address',
                     'wifi_verified', 'gps_verified', 'gps_distance_m')
    list_filter   = ('wifi_verified', 'gps_verified', 'submitted_at',
                     'session__course_name')
    search_fields = ('student__full_name', 'student__student_id',
                     'session__course_name', 'ip_address')
    readonly_fields = ('id', 'submitted_at')
    ordering = ('-submitted_at',)


@admin.register(RateLimitLog)
class RateLimitLogAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'endpoint', 'attempted_at')
    list_filter  = ('endpoint', 'attempted_at')
    search_fields = ('ip_address',)
    readonly_fields = ('ip_address', 'endpoint', 'attempted_at')
    ordering = ('-attempted_at',)
