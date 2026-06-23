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
       print("Success: UniqueConstraint prevented duplicate attendance!")
