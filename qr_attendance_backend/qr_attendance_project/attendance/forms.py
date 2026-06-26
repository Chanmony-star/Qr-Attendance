"""
forms.py – Django form definitions for QR Attendance System.

AdminLoginForm        – teacher / admin authentication
CreateSessionForm     – teacher creates a new attendance session
StudentRegistrationForm – student enters info on first QR scan
AttendanceSubmitForm  – carries GPS + student UUID when submitting attendance
"""

from django import forms
from django.contrib.auth import authenticate
from django.core.validators import RegexValidator


# ── Admin / teacher forms ──────────────────────────────────────────────────────

class AdminLoginForm(forms.Form):
    username = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Username',
            'autofocus': True,
        }),
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password',
        }),
    )

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self._user  = None
        super().__init__(*args, **kwargs)

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        if username and password:
            self._user = authenticate(self.request, username=username, password=password)
            if self._user is None:
                raise forms.ValidationError('Invalid username or password.')
            if not self._user.is_active:
                raise forms.ValidationError('This account is inactive.')
        return self.cleaned_data

    def get_user(self):
        return self._user


class CreateSessionForm(forms.Form):
    course_name = forms.CharField(
        max_length=120,
        label='Course / Class Name',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'e.g. Computer Fundamentals – Week 5',
        }),
    )
    description = forms.CharField(
        required=False,
        label='Description (optional)',
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Any notes for this session…',
        }),
    )
    duration_minutes = forms.IntegerField(
        min_value=5,
        max_value=480,
        initial=30,
        label='Session Duration (minutes)',
        widget=forms.NumberInput(attrs={
            'class': 'form-control',
        }),
        help_text='QR code will expire after this many minutes.',
    )

    def clean_course_name(self):
        name = self.cleaned_data['course_name'].strip()
        if not name:
            raise forms.ValidationError('Course name cannot be blank.')
        return name


# ── Student forms ──────────────────────────────────────────────────────────────

student_id_validator = RegexValidator(
    regex=r'^[A-Za-z0-9\-]{3,20}$',
    message='Student ID must be 3–20 alphanumeric characters (hyphens allowed).',
)


class StudentRegistrationForm(forms.Form):
    """
    Shown only on a student's FIRST scan.
    On subsequent scans the remember-me cookie bypasses this form entirely.
    """
    student_id = forms.CharField(
        max_length=20,
        label='Student ID',
        validators=[student_id_validator],
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'e.g. ST-2024-001',
        }),
    )
    full_name = forms.CharField(
        max_length=120,
        label='Full Name',
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your full name',
        }),
    )
    email = forms.EmailField(
        label='Email Address',
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'student@school.edu',
        }),
    )

    def clean_student_id(self):
        return self.cleaned_data['student_id'].strip().upper()

    def clean_full_name(self):
        return self.cleaned_data['full_name'].strip().title()


class AttendanceSubmitForm(forms.Form):
    """
    Hidden form submitted by JavaScript after the student confirms attendance.
    Carries GPS coordinates collected by the browser's Geolocation API.
    """
    latitude = forms.FloatField(
        required=False,
        widget=forms.HiddenInput(),
    )
    longitude = forms.FloatField(
        required=False,
        widget=forms.HiddenInput(),
    )
    # UUID of the remembered student (set by JS from cookie value or hidden input)
    student_uuid = forms.UUIDField(
        required=False,
        widget=forms.HiddenInput(),
    )

    def clean(self):
        cleaned = super().clean()
        lat  = cleaned.get('latitude')
        lon  = cleaned.get('longitude')
        # If one coordinate is supplied both must be
        if (lat is None) != (lon is None):
            raise forms.ValidationError('Both latitude and longitude are required.')
        return cleaned
