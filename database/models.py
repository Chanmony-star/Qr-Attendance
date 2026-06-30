from django.db import models

class Student(models.Model):
    student_id = models.IntegerField(unique=True)
    remember_me_token = models.CharField(max_length=255, unique=True, null=True, blank=True)
    full_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_id} - {self.full_name}"
    

class QrSession(models.Model):
    class_name = models.CharField(max_length=255, default='')
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def __str__(self):
        return f"QR Session: {self.id or 'Unsaved'}"
    

class AttendanceRecord(models.Model):
    student = models.ForeignKey(
        Student, 
        on_delete=models.CASCADE, 
        related_name="attendance_records"
    )
    qr_session = models.ForeignKey(
        QrSession, 
        on_delete=models.CASCADE, 
        related_name="attendance_records"
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "qr_session"],
                name="unique_attendance_per_session"
            )
        ]

    def __str__(self):
        return f"{self.student.student_id} - {self.timestamp}"