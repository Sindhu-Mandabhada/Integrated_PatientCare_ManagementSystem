import React from "react";
import { Link } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="doctor-dashboard">

      <div className="doctor-header">
        <div>
          <h1>Doctor Dashboard</h1>
          <p>
            Welcome, Dr. {user?.name || "Doctor"} 👨‍⚕️
          </p>
        </div>

        <div className="doctor-status">
          <span></span>
          Available
        </div>
      </div>

      <div className="doctor-stats">

        <div className="doctor-stat-card">
          <div className="stat-icon">👥</div>
          <div>
            <h3>Patients</h3>
            <strong>View Patients</strong>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="stat-icon">📅</div>
          <div>
            <h3>Appointments</h3>
            <strong>Manage Appointments</strong>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="stat-icon">🩺</div>
          <div>
            <h3>Consultations</h3>
            <strong>Manage Consultations</strong>
          </div>
        </div>

        <div className="doctor-stat-card">
          <div className="stat-icon">💊</div>
          <div>
            <h3>Prescriptions</h3>
            <strong>Manage Prescriptions</strong>
          </div>
        </div>

      </div>

      <h2 className="doctor-section-title">
        Doctor Services
      </h2>

      <div className="doctor-menu">

        <Link
          to="/doctor/patients"
          className="doctor-menu-card"
        >
          <span>👥</span>
          <h3>Patient List</h3>
          <p>View registered patients and their information.</p>
        </Link>

        <Link
          to="/doctor/consultation"
          className="doctor-menu-card"
        >
          <span>🩺</span>
          <h3>Consultation</h3>
          <p>Record and manage patient consultations.</p>
        </Link>

        <Link
          to="/doctor/consultation-history"
          className="doctor-menu-card"
        >
          <span>📋</span>
          <h3>Consultation History</h3>
          <p>View previous patient consultations.</p>
        </Link>

        <Link
          to="/doctor/prescription"
          className="doctor-menu-card"
        >
          <span>💊</span>
          <h3>Prescription</h3>
          <p>Create prescriptions for patients.</p>
        </Link>

        <Link
          to="/doctor/prescription-history"
          className="doctor-menu-card"
        >
          <span>📑</span>
          <h3>Prescription History</h3>
          <p>View previously issued prescriptions.</p>
        </Link>

      </div>

    </div>
  );
}

export default DoctorDashboard;