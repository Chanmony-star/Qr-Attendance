# Web QR Attendance System

A web-based attendance system where students scan a QR code to mark attendance.  
The system supports:

- QR-based lecture/session attendance
- "Remember Me" behavior for returning students
- School WiFi/network validation
- GPS/geofence validation
- Duplicate attendance prevention
- Admin dashboard for lecture/session management
- Attendance reports and export

---

## 1. Project Overview

This project is built to make classroom attendance faster, simpler, and more secure.

Instead of manually writing names or calling attendance, an instructor creates a lecture/session and displays a QR code. Students scan the QR code using their phones, and the system records their attendance.

To improve convenience and reduce repeated input:

- On the **first scan**, the student enters their **student ID** and **name**
- The system stores a **remember-me token** on the student’s device/browser
- On the **next scan**, the student does not need to enter the same information again
- The system automatically recognizes them and marks attendance if all checks pass

---

## 2. Problem Statement

Manual attendance has many problems:

- Takes too much class time
- Easy to make mistakes
- Hard to organize records
- Students can try to cheat attendance
- Difficult to manage reports later

This project solves those issues by using a QR-based digital system with extra validation.

---

## 3. Main Goals

The main goals of this project are:

1. Allow admins/teachers to create attendance sessions
2. Generate a unique QR code for each session
3. Let students scan the QR and mark attendance
4. Remember student identity after first use
5. Verify that students are physically at school
6. Prevent duplicate or fake attendance
7. Provide reports for attendance management

---

## 4. Core Features

### 4.1 QR Attendance
- Each lecture/session has a unique QR code
- Students scan the QR using their mobile phones
- The QR opens a web attendance page

### 4.2 Remember Me
- First-time student enters:
  - Student ID
  - Full name
- The system stores:
  - Browser/device token
  - Optional local browser memory
- On next scans:
  - Student is recognized automatically
  - The form can be skipped

### 4.3 School WiFi / Network Check
- The system verifies whether the student is connected through the school network
- This is usually checked using:
  - Public IP address
  - Approved network range
- This helps reduce remote/fake attendance

> Important: Browsers usually cannot directly read the WiFi SSID name for security reasons.  
> In a web app, "school WiFi check" normally means checking whether the request comes from the school's approved network/IP range.

### 4.4 GPS / Geofence Check
- The student’s browser requests location permission
- The system compares student location with the school coordinates
- If the student is outside the allowed radius, attendance is rejected

### 4.5 Duplicate Prevention
- A student should not be able to mark attendance twice for the same session

### 4.6 Admin Dashboard
- Create lecture/session
- Generate QR code
- View attendance records
- Export results

### 4.7 Reports
- View attendance by:
  - Session
  - Date
  - Student
- Export to CSV or another format later

---

## 5. How the System Works

## 5.1 Student Flow

### First Time
1. Student scans the QR code
2. The web page opens
3. Student enters:
   - Student ID
   - Name
4. System checks:
   - Session is valid
   - Student is on school network
   - Student is inside school GPS radius
5. If valid:
   - Attendance is recorded
   - Remember-me token is saved
6. Success page is shown

### Next Time
1. Student scans the QR code again in a later session
2. System checks for remember-me token
3. If the token is valid:
   - Student data is recognized automatically
4. System still checks:
   - Session validity
   - WiFi/network
   - GPS location
5. If valid:
   - Attendance is recorded
   - No need to type ID/name again

---

## 5.2 Admin Flow

1. Admin logs in
2. Admin creates a new lecture/session
3. System generates:
   - Session ID
   - QR code
4. Admin displays QR to students
5. Students scan and submit attendance
6. Admin later views attendance report

---

## 6. Validation Logic

Attendance should only be marked when all required conditions pass.

### Required checks
- Session exists
- Session is active
- Student identity is known
- Remember-me token is valid, or student submits ID/name
- Student is on school network
- Student is within school GPS boundary
- Student has not already marked attendance for that session

### Recommended validation order
1. Check QR/session validity
2. Check remember-me token
3. If no token, collect student ID and name
4. Check school network
5. Check GPS location
6. Check duplicate attendance
7. Save attendance

---

## 7. Roles in the System

### Admin / Teacher
- Log in
- Create sessions
- Generate QR codes
- View attendance
- Export reports

### Student
- Scan QR
- Enter ID and name once
- Get remembered automatically on future scans
- Mark attendance only when location/network rules are satisfied

---

## 8. Tech Stack

Recommended stack:

### Frontend
- HTML / CSS / JavaScript
- EJS or another templating engine
- Mobile-first responsive UI

### Backend
- Node.js
- Express.js

### Database
- MongoDB / MongoDB Atlas

### Authentication / Token
- JWT or secure token-based remember-me mechanism
- Cookies for browser recognition

### QR Generation
- QR code generation library

### Deployment
- Render / Railway / Vercel for app hosting
- MongoDB Atlas for cloud database

---

## 9. Project Structure

```text
qr-attendance/
│
├── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── views/
│   ├── partials/
│   ├── scan.ejs
│   ├── success.ejs
│   ├── error.ejs
│   ├── admin-login.ejs
│   ├── admin-dashboard.ejs
│   ├── admin-attendance.ejs
│   └── admin-reports.ejs
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── docs/
│   ├── api-endpoints.md
│   ├── database-schema.md
│   ├── deployment-guide.md
│   └── wifi-gps-config.md
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
