import React from "react";
import { Link } from "react-router-dom";
import "./PatientDashboard.css";

function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="patient-dashboard">

      <div className="patient-header">
        <div>
          <h1>Patient Dashboard</h1>
          <p>Welcome back, {user?.name || "Patient"} 👋</p>
        </div>
      </div>

      <div className="patient-cards">

        <Link to="/patient/profile" className="patient-card">
          <div className="card-icon">👤</div>
          <h3>My Profile</h3>
          <p>View your personal and medical information.</p>
        </Link>

        <Link to="/patient/edit-profile" className="patient-card">
          <div className="card-icon">✏️</div>
          <h3>Edit Profile</h3>
          <p>Update your personal information.</p>
        </Link>

        <Link to="/patient/book-appointment" className="patient-card">
          <div className="card-icon">📅</div>
          <h3>Book Appointment</h3>
          <p>Schedule an appointment with a doctor.</p>
        </Link>

        <Link to="/patient/appointments" className="patient-card">
          <div className="card-icon">📋</div>
          <h3>My Appointments</h3>
          <p>View and manage your appointments.</p>
        </Link>

        <Link to="/patient/registration" className="patient-card">
          <div className="card-icon">📝</div>
          <h3>Patient Registration</h3>
          <p>Register or update your patient details.</p>
        </Link>

      </div>

    </div>
  );
}

export default PatientDashboard;