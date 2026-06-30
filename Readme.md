
# Data Model: Student Attendance System

This branch introduces the core database architecture for the QR-based student attendance tracking system. It establishes the foundational models, relationships, and data integrity constraints using Django's ORM.

## 🏗️ Entity-Relationship Overview

The data model consists of three main tables handling students, individual QR code generation sessions, and the intersection table that tracks actual student attendance.

* **`Student`**: Stores student profiles with a unique academic identifier.
* **`QrSession`**: Manages the lifecycle of generated QR tokens, including creation and expiration timestamps.
* **`AttendanceRecord`**: A many-to-many junction table linking a student to a specific QR session, capturing the precise timestamp of check-in.

### Database Constraints
* **Idempotency & Data Integrity**: An explicit `UniqueConstraint` (`unique_attendance_per_session`) is enforced on `AttendanceRecord`. A student can only scan into a specific QR session **exactly once**, preventing duplicate attendance logs from double-scanning.
* **Cascade Deletion**: If a `Student` or a `QrSession` is deleted from the system, all associated `AttendanceRecords` are removed automatically (`models.CASCADE`).

---

## 📊 Data Dictionary

### 1. Student Model
| Field Name | Type | Modifiers / Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | Auto-Field | Primary Key | Auto-incrementing internal ID. |
| `student_id` | IntegerField | `unique=True` | The unique academic/matriculation number. |
| `full_name` | CharField | `max_length=50` | Full name of the student. |
| `created_at` | DateTimeField | `auto_now_add=True` | Timestamp when the profile was created. |

### 2. QrSession Model
| Field Name | Type | Modifiers / Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | Auto-Field | Primary Key | Auto-incrementing internal ID. |
| `token` | CharField | `max_length=255`, `unique=True` | Cryptographic or unique string embedded in the QR. |
| `created_at` | DateTimeField | `auto_now_add=True` | Timestamp when the QR code was generated. |
| `expires_at` | DateTimeField | Explicit input required | Expiration limit to prevent stale check-ins. |

### 3. AttendanceRecord Model
| Field Name | Type | Modifiers / Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | Auto-Field | Primary Key | Auto-incrementing internal ID. |
| `student` | ForeignKey | `to=Student`, `on_delete=CASCADE` | Link to the attending student. |
| `qr_session` | ForeignKey | `to=QrSession`, `on_delete=CASCADE` | Link to the scanned session. |
| `timestamp` | DateTimeField | `auto_now_add=True` | Exact time the attendance was marked. |

---

## 🚀 How to Verify & Test This Branch

To apply these models to your local database environment and verify their instantiation, follow these steps:

1. Open the Django shell in your terminal:
```bash
   python manage.py shell
   from django.utils import timezone
   from database.models import Student, QrSession, AttendanceRecord
   from django.db import IntegrityError

   # 1. Instantiate and save a mock student
   student = Student.objects.create(student_id=1001, full_name="John Doe")
   print(f"Created Student: {student}")

   # 2. Instantiate and save a mock QR session
   session = QrSession.objects.create(
       token="xyz_secure_token_123", 
       expires_at=timezone.now() + timezone.timedelta(minutes=15)
ed)
   print(f"Created Session: {session}")

   # 3. Instantiate and save an attendance record
   record = AttendanceRecord.objects.create(student=student, qr_session=session)
   print(f"Created Attendance Record: {record}")

   # 4. Verify UniqueConstraint (This should fail safely)
   try:
       duplicate_record = AttendanceRecord.objects.create(student=student, qr_session=session)
   except IntegrityError:
<<<<<<< HEAD
       print("Success: UniqueConstraint prevented duplicate attendance!")
=======
       print("Success: UniqueConstraint prevented duplicate attendance!")
=======
# 📘 QR Attendance System — Full Team README

> **Team of 6 — 2-Week Django Project**  
> Web-based QR Attendance with Remember-Me, GPS, and School WiFi Validation

---

## 📑 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem & Goals](#2-problem--goals)
3. [Features](#3-features)
4. [How It Works](#4-how-it-works)
5. [Tech Stack](#5-tech-stack)
6. [Folder Structure](#6-folder-structure)
7. [Database Models](#7-database-models)
8. [Validation Logic](#8-validation-logic)
9. [Team Roles (6 Members)](#9-team-roles-6-members)
10. [2-Week Roadmap](#10-2-week-roadmap)
11. [Git Workflow](#11-git-workflow)
12. [Setup Guide](#12-setup-guide)
13. [Environment Variables](#13-environment-variables)
14. [School WiFi & GPS Setup](#14-school-wifi--gps-setup)
15. [Team Rules](#15-team-rules)
16. [Testing Checklist](#16-testing-checklist)
17. [Deployment](#17-deployment)
18. [Known Limitations](#18-known-limitations)
19. [Future Improvements](#19-future-improvements)
20. [Contributors](#20-contributors)

---

## 1. Project Overview

This is a **web-based QR Attendance System** built with **Django**. Students scan a QR code in class, enter their info **only once**, and the system remembers them for all future scans.

The system also verifies:
- 📡 Student is connected to **school WiFi**
- 📍 Student is **physically at school** (GPS check)
- 🚫 Student cannot mark attendance **twice**

---

## 2. Problem & Goals

### Problem
Manual attendance is slow, error-prone, and easy to cheat.

### Goals
1. Allow teachers to create attendance sessions easily
2. Generate a unique QR code per session
3. Let students mark attendance with one scan
4. Remember students after first scan
5. Verify students are physically at school
6. Prevent duplicate or fake attendance
7. Provide attendance reports

---

## 3. Features

### Must-Have (MVP)
- ✅ Admin login
- ✅ Create attendance sessions
- ✅ Generate QR codes
- ✅ Student scan page
- ✅ First-time student form (ID + name)
- ✅ Remember-me cookie/token
- ✅ Mark attendance
- ✅ Prevent duplicate attendance
- ✅ GPS location check
- ✅ School WiFi/IP check
- ✅ Admin attendance list

### Nice-to-Have (If Time)
- 📊 CSV export
- 📈 Dashboard charts
- 🔄 Rotating QR (anti-cheat)
- 📧 Email notifications

---

## 4. How It Works

### Student First-Time Flow
```
Student scans QR
    ↓
Page opens, no cookie found
    ↓
Show form: Student ID + Name
    ↓
Student fills form + allows GPS
    ↓
System checks: WiFi ✓  GPS ✓  Duplicate ✓
    ↓
Save attendance + Save cookie token
    ↓
Show success page
```

### Student Returning Flow
```
Student scans QR
    ↓
Cookie token found → Student recognized
    ↓
System checks: WiFi ✓  GPS ✓  Duplicate ✓
    ↓
Auto-mark attendance (no typing!)
    ↓
Show success page
```

### Admin Flow
```
Admin logs in
    ↓
Creates new session (title, date, time)
    ↓
QR code generated
    ↓
Displays QR to class
    ↓
Students scan
    ↓
Admin views attendance report
```

---

## 5. Tech Stack

| Layer | Technology |
|------|-----------|
| Backend | Django (Python) |
| Database | SQLite (dev) → PostgreSQL (production) |
| Frontend | Django Templates + Bootstrap |
| QR Code | `qrcode` Python package |
| Token | JWT (`PyJWT`) |
| GPS | Browser Geolocation API |
| WiFi | Server-side IP check |
| Version Control | Git + GitHub |
| Deployment | Render / Railway |

---

## 6. Folder Structure

```text
qr-attendance/
│
├── manage.py
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
│
├── qr_attendance/              ← Django project config
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── attendance/                 ← Main app
│   ├── models.py               ← Database tables
│   ├── views.py                ← Page logic
│   ├── urls.py                 ← URL routing
│   ├── forms.py                ← Form validation
│   ├── services.py             ← QR, GPS, WiFi, token logic
│   ├── middleware.py           ← Remember-me, rate limiting
│   ├── utils.py                ← Constants (school coords, IP)
│   ├── admin.py                ← Django admin setup
│   │
│   ├── static/attendance/
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── mobile.css
│   │   ├── js/
│   │   │   ├── gps.js
│   │   │   └── form.js
│   │   └── images/
│   │       └── logo.png
│   │
│   └── templates/attendance/
│       ├── base.html
│       ├── scan.html
│       ├── student_form.html
│       ├── success.html
│       ├── error.html
│       ├── admin_login.html
│       ├── admin_dashboard.html
│       ├── create_session.html
│       ├── session_detail.html
│       └── admin_reports.html
│
├── tests/
│   ├── unit/
│   └── integration/
│
└── docs/
    ├── api-plan.md
    ├── database-schema.md
    ├── setup-guide.md
    └── team-tasks.md
```

---

## 7. Database Models

### Student
```text
- student_id (unique)
- name
- created_at
```

### DeviceToken
```text
- student (FK)
- token
- created_at
- expires_at
- is_active
```

### AttendanceSession
```text
- session_code (unique)
- title
- date
- start_time
- end_time
- is_active
- created_by (FK to User)
```

### AttendanceRecord
```text
- student (FK)
- session (FK)
- marked_at
- latitude
- longitude
- ip_address
- gps_passed
- wifi_passed

Rule: Unique (student, session)  → Prevent duplicates
```

---

## 8. Validation Logic

Attendance is marked only when **ALL** checks pass:

```
1. Session exists and is active
2. Student is identified (token OR form submission)
3. Student is on school network
4. Student is within school GPS radius
5. Student has not already marked attendance
```

### Order of checks:
1. Session validity
2. Remember-me token
3. Collect ID/name (if no token)
4. WiFi/IP check
5. GPS check
6. Duplicate check
7. Save attendance

---

## 9. Team Roles (6 Members)

```
┌─────────────────────────────────────────────────────┐
│              👑 MEMBER 1 — TEAM LEAD                  │
│  Architecture • Git • Integration • Deployment      │
└─────┬─────┬─────┬─────┬─────┬─────────────────────┘
      │     │     │     │     │
   ┌──┴─┐ ┌─┴──┐ ┌┴──┐ ┌┴──┐ ┌┴──┐
   │ M2 │ │ M3 │ │M4 │ │M5 │ │M6 │
   │Back│ │Front│ │DB │ │GPS│ │QA │
   │end │ │end  │ │   │ │/IP│ │/Doc│
   └────┘ └────┘ └───┘ └───┘ └───┘
```

---

### 👑 Member 1 — Team Lead / Integration-Mony

**Files owned:**
```
qr_attendance/settings.py
qr_attendance/urls.py
attendance/middleware.py
```

**Tasks:**
- Create GitHub repository
- Set up Django project skeleton
- Manage all branches (`main`, `develop`, features)
- Review every Pull Request
- Merge code from all members
- Solve merge conflicts
- Build remember-me middleware
- Build rate limiter middleware
- Final integration & deployment
- Lead daily standups

**Deliverable:** Working integrated app deployed to production

---

### 👤 Member 2 — Backend & Auth

**Files owned:**
```
attendance/views.py (admin & auth views)
attendance/forms.py
attendance/urls.py (auth routes)
```

**Tasks:**
- Build admin login/logout views
- Build admin dashboard view
- Build create session view
- Build session detail view
- Build attendance submit view
- Handle Django forms validation
- Handle all error responses
- Protect admin pages with `@login_required`

**Deliverable:** All backend views working with proper validation

---

### 👤 Member 3 — Frontend & UI/UX

**Files owned:**
```
attendance/templates/attendance/*.html
attendance/static/attendance/css/*.css
attendance/static/attendance/js/form.js
```

**Tasks:**
- Build all HTML templates with Bootstrap
- Design mobile-first scan page (students use phones!)
- Design admin dashboard
- Build success/error pages
- Form styling and validation messages
- Loading spinners
- Responsive design for all screen sizes
- Use Django template inheritance (`{% extends base.html %}`)

**Deliverable:** All pages designed and connected to backend

---

### 👤 Member 4 — Database & Models

**Files owned:**
```
attendance/models.py
attendance/admin.py
attendance/services.py (duplicate check)
docs/database-schema.md
```

**Tasks:**
- Design all database models
- Create migrations
- Register models in Django admin
- Build duplicate attendance check
- Build seed data script for testing
- Optimize queries with `select_related()`
- Write database schema documentation

**Deliverable:** Working database with all relationships + admin panel

---

### 👤 Member 5 — GPS, WiFi & QR Service

**Files owned:**
```
attendance/services.py (QR, GPS, WiFi)
attendance/utils.py
attendance/static/attendance/js/gps.js
docs/wifi-gps-config.md
```

**Tasks:**
- Build QR code generation service
- Build GPS distance calculation logic
- Build school IP/WiFi check logic
- Write JavaScript for browser GPS permission
- Get school GPS coordinates from Google Maps
- Get school IP from school IT admin
- Build token (JWT) create/verify service
- Document WiFi/GPS configuration

**Deliverable:** All validation services working correctly

---

### 👤 Member 6 — QA Testing & Documentation

**Files owned:**
```
tests/unit/*.py
tests/integration/*.py
docs/api-plan.md
docs/setup-guide.md
README.md
```

**Tasks:**
- Write unit tests for services
- Write integration tests for attendance flow
- Manual testing on phones + laptops
- Test in multiple browsers (Chrome, Safari, Firefox)
- Bug reporting via GitHub Issues
- Write complete documentation
- Test deployment process
- Prepare demo script for final presentation

**Deliverable:** Tested app + complete docs + demo plan

---

## 10. 2-Week Roadmap

### 📅 Week 1 — Foundation

| Day | Lead (M1) | Backend (M2) | Frontend (M3) | DB (M4) | GPS/WiFi (M5) | QA (M6) |
|-----|----------|--------------|---------------|---------|---------------|---------|
| **Day 1** | Create repo, setup Django | Install dependencies | Setup Bootstrap | Plan models | Research GPS API | Setup docs folder |
| **Day 2** | Branch structure | Auth views start | Base template | Build models | Build QR service | Write README skeleton |
| **Day 3** | Review PRs | Admin login working | Scan page UI | Models registered | GPS distance logic | Test base setup |
| **Day 4** | Remember-me middleware | Create session view | Admin dashboard | Seed data | School IP check | Test admin login |
| **Day 5** | Integrate everything | Submit view | Success/error pages | Duplicate check | Token service | Manual testing |
| **Day 6** | Fix conflicts | First end-to-end test | Form validation | Query optimization | Integrate GPS in views | Bug report |
| **Day 7** | Tag v0.1 | Fix backend bugs | Polish UI | Database docs | Test GPS on phone | Demo Week 1 MVP |

**Week 1 Goal:** ✅ Student can scan QR → enter ID → attendance saved → admin sees list

---

### 📅 Week 2 — Validation & Polish

| Day | Lead (M1) | Backend (M2) | Frontend (M3) | DB (M4) | GPS/WiFi (M5) | QA (M6) |
|-----|----------|--------------|---------------|---------|---------------|---------|
| **Day 8** | Rate limiter | Export CSV view | Mobile UI fix | Index optimization | GPS browser flow | Test on 3 phones |
| **Day 9** | Code review | Error handling | GPS permission UI | Backup strategy | WiFi check live test | Bug tracking |
| **Day 10** | Integration testing | Reports view | Admin reports page | Query speed test | Edge case handling | Cross-browser test |
| **Day 11** | Security review | Admin charts | UI polish | Final migrations | GPS docs | Write test cases |
| **Day 12** | Deploy to Render | Production fixes | Loading states | Production DB | HTTPS GPS test | Test production |
| **Day 13** | Final fixes | Final fixes | Final polish | Final fixes | Final fixes | Complete docs |
| **Day 14** | 🎉 DEMO | 🎉 DEMO | 🎉 DEMO | 🎉 DEMO | 🎉 DEMO | 🎉 DEMO |

**Week 2 Goal:** ✅ Deployed app with GPS + WiFi checks + clean UI + full docs

---

## 11. Git Workflow

### Branch Structure
```
main              ← Production (NEVER push directly)
 │
 └── develop      ← Integration branch
      │
      ├── feature/backend-auth         ← M2
      ├── feature/frontend-scan        ← M3
      ├── feature/database-models      ← M4
      ├── feature/gps-validation       ← M5
      ├── feature/wifi-check           ← M5
      ├── feature/remember-me          ← M1
      ├── test/attendance-flow         ← M6
      └── docs/readme                  ← M6
```

### Daily Git Commands

**Start of day:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-task-name
```

**While working:**
```bash
git add .
git commit -m "feat: add student scan form"
git push origin feature/your-task-name
```

**End of task:**
- Go to GitHub
- Create Pull Request: `feature/your-branch` → `develop`
- Request review from **Team Lead (M1)**
- Wait for approval and merge

### Commit Message Format
```
feat:     New feature        →  feat: add GPS distance check
fix:      Bug fix            →  fix: prevent duplicate attendance
docs:     Documentation      →  docs: update setup guide
style:    Formatting only    →  style: improve mobile layout
test:     Tests              →  test: add GPS unit tests
refactor: Code cleanup       →  refactor: simplify token logic
chore:    Config/setup       →  chore: update requirements.txt
```

### Pull Request Rules
- ✅ Always test your code before creating PR
- ✅ Write clear PR description
- ✅ Add screenshots if UI changed
- ✅ Request review from Team Lead
- ❌ Never merge your own PR
- ❌ Never push directly to `main` or `develop`

---

## 12. Setup Guide

### Prerequisites
- Python 3.10+
- Git
- VS Code
- GitHub account

### Setup Steps

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/qr-attendance.git
cd qr-attendance

# 2. Create virtual environment
python -m venv venv

# 3. Activate virtual environment
source venv/bin/activate          # Mac/Linux
venv\Scripts\activate             # Windows

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create .env file
cp .env.example .env
# Edit .env and add your values

# 6. Run database migrations
python manage.py makemigrations
python manage.py migrate

# 7. Create admin user
python manage.py createsuperuser

# 8. Run development server
python manage.py runserver

# 9. Open browser
# Admin: http://127.0.0.1:8000/admin/
# App:   http://127.0.0.1:8000/
```

### Testing on Phone (Same WiFi)

```bash
# Find your laptop IP
ipconfig            # Windows
ifconfig            # Mac/Linux

# Run server on all network interfaces
python manage.py runserver 0.0.0.0:8000

# On phone, visit: http://YOUR-LAPTOP-IP:8000/
```

---

## 13. Environment Variables

Create a `.env` file in the root:

```text
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=sqlite:///db.sqlite3

# JWT
JWT_SECRET=your-jwt-secret

# School Config
SCHOOL_LAT=11.5564
SCHOOL_LNG=104.9282
SCHOOL_RADIUS_METERS=200
SCHOOL_ALLOWED_IP=103.120.55.20
WIFI_CHECK_ENABLED=False

# Base URL
BASE_URL=http://127.0.0.1:8000
```

---

## 14. School WiFi & GPS Setup

### Get School GPS Coordinates
1. Open **Google Maps**
2. Find your school location
3. Right-click → Copy coordinates
4. Add to `.env`:
   ```
   SCHOOL_LAT=11.5564
   SCHOOL_LNG=104.9282
   SCHOOL_RADIUS_METERS=200
   ```

### Get School Public IP
1. Connect to school WiFi
2. Visit https://whatismyipaddress.com/
3. Copy the IPv4 address
4. Add to `.env`:
   ```
   SCHOOL_ALLOWED_IP=103.120.55.20
   WIFI_CHECK_ENABLED=True
   ```

### Important Notes
- 🚫 Browsers **cannot** read WiFi SSID name directly
- ✅ We check the **public IP** of the network instead
- 📱 GPS works best on phones (require HTTPS in production)
- ⚠️ Students can deny GPS permission — show clear error
- 🔧 Set `WIFI_CHECK_ENABLED=False` during development

---

## 15. Team Rules

```
╔══════════════════════════════════════════════════╗
║              🚨 TEAM RULES 🚨                     ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  1. NEVER push directly to main or develop       ║
║  2. Always work on a feature branch              ║
║  3. Pull develop BEFORE starting work            ║
║  4. Commit small, commit often                   ║
║  5. Use proper commit messages                   ║
║  6. Test your code before creating PR            ║
║  7. Request team lead review on every PR         ║
║  8. Don't modify other members' files            ║
║  9. Ask for help if stuck > 1 hour               ║
║ 10. Daily 15-min standup telegram
║                                                  ║
╚══════════════════════════════════════════════════╝
```

---

## 16. Testing Checklist

### Student Flow
- [ ] First-time scan shows form
- [ ] Form submits successfully
- [ ] Cookie/token created
- [ ] Returning student auto-recognized
- [ ] Duplicate attendance blocked
- [ ] Invalid session shows error

### GPS Flow
- [ ] Browser asks for location permission
- [ ] Attendance fails when location denied
- [ ] Attendance fails when outside school radius
- [ ] Attendance succeeds when at school

### WiFi/IP Flow
- [ ] Attendance succeeds on school WiFi
- [ ] Attendance fails on mobile data (when check enabled)
- [ ] Check skipped in development mode

### Admin Flow
- [ ] Admin can log in
- [ ] Admin can create session
- [ ] QR code displays correctly
- [ ] Admin can view attendance list
- [ ] Admin can export CSV

### Cross-Platform
- [ ] Works on Chrome (laptop)
- [ ] Works on Safari (iPhone)
- [ ] Works on Chrome (Android)
- [ ] Works on Firefox
- [ ] Mobile layout looks good

---

## 17. Deployment

### Recommended Platform: **Render**

### Pre-Deployment Checklist
- [ ] Set `DEBUG=False`
- [ ] Update `ALLOWED_HOSTS`
- [ ] Set strong `SECRET_KEY`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Configure static files
- [ ] Enable HTTPS (required for GPS)
- [ ] Test on real phone with real WiFi
- [ ] Set production school IP

### Deploy Steps
1. Push code to GitHub `main` branch
2. Create Render account
3. Connect GitHub repo
4. Add environment variables
5. Add PostgreSQL database
6. Deploy
7. Run migrations on production
8. Create production superuser
9. Test all flows

---

## 18. Known Limitations

- ⚠️ Browser cannot read WiFi SSID name (only IP check possible)
- ⚠️ GPS accuracy varies by device (±5-50 meters)
- ⚠️ Students can deny GPS permission
- ⚠️ VPN usage can bypass IP check
- ⚠️ Clearing browser data removes remember-me
- ⚠️ HTTPS required for GPS in production
- ⚠️ Students sharing devices may cause issues

---

## 19. Future Improvements

- 🔄 Rotating QR codes (refresh every 30 seconds)
- 📊 Attendance analytics dashboard
- 📧 Email absent students automatically
- 📱 PWA (installable on phones)
- 👤 Student profile management
- 📚 Multiple class/course support
- 📷 Face verification
- 📈 Export to PDF/Excel
- 🔔 Push notifications
- 📅 Class schedule integration

---

## 20. Contributors

| # | Name | Role | GitHub |
|---|------|------|--------|
| 👑 1 | `<Mony>` | Team Lead + Integration | @username |
| 2 | `<jolie>` | Backend & Auth | @username |
| 3 | `<Mony>` | Frontend & UI/UX | @username |
| 4 | `<vathana>` | Database & Models | @username |
| 5 | `<heng, reaksa, hour>` | GPS, WiFi & QR | @username |
| 6 | `<Mony>` | QA Testing & Docs | @username |

---

## 📞 Communication

- **Group Chat:** [telegram]
- **Daily Standup:** anytime
- **Code Reviews:** Within 4 hours
- **Emergency Contact:** Team Lead

---

## 🎯 Definition of Done

A feature is **done** when:
- ✅ Code is written and works
- ✅ Tested manually
- ✅ Pull Request created
- ✅ Reviewed by Team Lead
- ✅ Merged to `develop`
- ✅ Documented if needed

The **project is done** when:
- ✅ All MVP features work
- ✅ GPS + WiFi validation works
- ✅ Deployed to production
- ✅ Tested on multiple devices
- ✅ Documentation complete
- ✅ Team can demo successfully

---

## 📜 License

This project is for educational purposes.

---

## 🚀 Let's Build This!

Remember:
> "**Done is better than perfect.**"
> Focus on MVP first, then add features.
> Communicate daily. Help each other. Test often.

**Good luck team! 💪**

---

*Last updated: [Date]*  
*Project deadline: [Date + 14 days]*

>>>>>>> bfe7849e2045278208cf57f24e53f9ccf70021bf
