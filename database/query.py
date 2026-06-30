from database.models import Student, QrSession, AttendanceRecord
from django.utils import timezone
# from database.query import
def create_student(full_name, student_id):
    # Register students
    return Student.objects.create(
        full_name=full_name,
        student_id=student_id
    )

def get_student_by_student_id(student_id):
    # Search for student by using their student ID
    return Student.objects.filter(student_id=student_id).first()

def get_valid_session(token):
    # Search for valid QR sessions by their token
    if not token:
        return None
    session = QrSession.objects.filter(token=token).first()
    if session is None:
        return None
    if session.expires_at > timezone.now():
        return session
    return None

def get_student_by_token(token):
    # Search for student by their remember me token
    return Student.objects.filter(remember_me_token=token).first()

def save_remember_me_token(student, token):
    # Save remember me token to a student object
    # student = get_student_by_id(put in id)
    student.remember_me_token = token
    student.save()
    return student

def already_attended(student, session): # Para are student and session objects
    # student = get_student_by_student_id()
    # session = get_valid_session()
    return AttendanceRecord.objects.filter(
        student=student,
        qr_session=session
    ).exists()

def record_attendance(student, session):
    return AttendanceRecord.objects.create(
        student=student,
        qr_session=session
    )

def get_all_students():
    return Student.objects.all()

def get_all_sessions():
    return QrSession.objects.all()

def get_all_attendance():
    return AttendanceRecord.objects.all()

def get_attendance_by_student(student):
    return AttendanceRecord.objects.filter(student=student)

def get_attendance_by_session(session):
    return AttendanceRecord.objects.filter(qr_session=session)