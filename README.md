# Integrated_PatientCare_ManagementSystem

# 🏥 MediTrack – Integrated Patient Care Management System

MediTrack is a web-based **Integrated Patient Care Management System** designed to simplify and manage healthcare-related activities through a centralized platform.

The system provides separate functionality for **Patients, Doctors, and Administrators**, helping manage patient information, appointments, consultations, prescriptions, notifications, reports, and other healthcare operations.

## 🚀 Features

### 👤 Patient

* Patient registration and login
* Patient dashboard
* View and manage profile information
* Book and manage appointments
* View consultations
* View prescriptions
* Receive notifications
* Access healthcare-related reports

### 👨‍⚕️ Doctor

* Doctor login and dashboard
* View patient information
* Manage appointments
* Manage consultations
* Create and manage prescriptions
* View patient medical information
* Notifications and reports

### 🛡️ Admin

* Admin authentication
* Admin dashboard
* Manage users
* Manage patients and doctors
* Manage appointments
* View analytics
* Generate reports
* Audit logging and system monitoring

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* React.js

### Backend

* Python
* Flask
* REST APIs
* JWT Authentication

### Database

* SQLite

### Tools

* Git
* GitHub
* Visual Studio Code

## 📂 Project Structure

```text
MEDITRACK/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── requirements.txt
│   │
│   ├── middleware/
│   │   ├── audit_logger.py
│   │   ├── jwt_auth.py
│   │   └── role_auth.py
│   │
│   ├── models/
│   │   ├── appointment_model.py
│   │   ├── auditlog_model.py
│   │   ├── consultation_model.py
│   │   ├── doctor_model.py
│   │   ├── notification_model.py
│   │   ├── patient_model.py
│   │   ├── prescription_model.py
│   │   └── user_model.py
│   │
│   ├── routes/
│   │   ├── admin_routes.py
│   │   ├── analytics_routes.py
│   │   ├── appointment_routes.py
│   │   ├── auth_routes.py
│   │   ├── consultation_routes.py
│   │   ├── doctor_routes.py
│   │   ├── notification_routes.py
│   │   ├── patient_routes.py
│   │   ├── prescription_routes.py
│   │   └── report_routes.py
│   │
│   └── services/
│       ├── analytics_service.py
│       ├── appointment_service.py
│       ├── consultation_service.py
│       ├── notification_service.py
│       └── report_service.py
│
└── frontend/
    └── ...
```

The application can then be accessed through the local URL displayed by the development server.

## 🔐 Authentication

MediTrack uses role-based authentication to provide different access levels for:

* Patient
* Doctor
* Admin

JWT-based authentication is used to help secure protected API endpoints.

## 🔄 System Workflow

```text
User
  │
  ├── Patient
  │      ├── Login
  │      ├── Book Appointment
  │      ├── Consultation
  │      └── View Prescription
  │
  ├── Doctor
  │      ├── Login
  │      ├── Manage Appointments
  │      ├── Consultation
  │      └── Prescriptions
  │
  └── Admin
         ├── Manage Users
         ├── Analytics
         ├── Reports
         └── System Monitoring
```

## 🎯 Objectives

* Provide a centralized healthcare management platform
* Simplify appointment management
* Improve communication between patients and doctors
* Manage patient healthcare information efficiently
* Provide role-based access control
* Improve healthcare administration and reporting

## 🔮 Future Enhancements

* Online doctor consultation
* Email/SMS notifications
* Online payment integration
* Medical document upload
* Advanced AI-based health assistance
* Cloud database integration
* Deployment on a cloud platform
* Mobile application


