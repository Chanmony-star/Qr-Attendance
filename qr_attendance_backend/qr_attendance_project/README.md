# QR Attendance System – Setup Guide

## Quick Start

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # create your teacher account
python manage.py runserver
```

Open http://127.0.0.1:8000/login/ → log in → create a session → show the QR code.

## Production checklist

| Setting | What to change |
|---|---|
| `SECRET_KEY` | Set via environment variable |
| `DEBUG = False` | Always in production |
| `ALLOWED_HOSTS` | Add your domain |
| `DATABASES` | Switch to PostgreSQL |
| `SCHOOL_LATITUDE/LONGITUDE` | Your actual campus coords (utils.py) |
| `SCHOOL_WIFI_SUBNETS` | Your school's IP ranges (utils.py) |
| `TIME_ZONE` | Your timezone (settings.py) |
