"""
urls.py – URL routing for QR Attendance System (Backend & Auth).

Member 2 Scope: Auth routes and backend view endpoints.

Admin / teacher routes (login required – enforced inside each view)
────────────────────────────────────────────────────────────────────
  /login/                      → admin_login
  /logout/                     → admin_logout
  /dashboard/                  → dashboard
  /session/create/             → create_session
  /session/<uuid>/             → session_detail

Student routes (public)
───────────────────────
  /submit-attendance/          → submit_attendance
"""

from django.urls import path
from . import views

urlpatterns = [
    # ── Auth ──────────────────────────────────────────────────────────────────
    path('login/',  views.admin_login,  name='admin_login'),
    path('logout/', views.admin_logout, name='admin_logout'),

    # ── Teacher dashboard ──────────────────────────────────────────────────────
    path('dashboard/', views.dashboard, name='dashboard'),

    # ── Session management ─────────────────────────────────────────────────────
    path('session/create/',              views.create_session,    name='create_session'),
    path('session/<uuid:pk>/',           views.session_detail,    name='session_detail'),

    # ── Attendance submission (public) ─────────────────────────────────────────
    path('submit-attendance/',           views.submit_attendance, name='submit_attendance'),
]
