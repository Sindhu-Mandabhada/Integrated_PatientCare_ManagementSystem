import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>
            Welcome, {user?.name || "Administrator"} 👋
          </p>
        </div>

        <div className="admin-badge">
          🛡️ Administrator
        </div>
      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">👨‍⚕️</div>
          <div>
            <h3>Doctors</h3>
            <p>Manage Doctors</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">👥</div>
          <div>
            <h3>Patients</h3>
            <p>Manage Patients</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">📅</div>
          <div>
            <h3>Appointments</h3>
            <p>Manage Appointments</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">🔔</div>
          <div>
            <h3>Notifications</h3>
            <p>System Notifications</p>
          </div>
        </div>

      </div>

      <h2 className="admin-section-title">
        Administration
      </h2>

      <div className="admin-menu">

        <Link
          to="/admin/doctors"
          className="admin-menu-card"
        >
          <span>👨‍⚕️</span>
          <h3>Manage Doctors</h3>
          <p>
            Add, view, update and manage doctor accounts.
          </p>
        </Link>

        <Link
          to="/admin/patients"
          className="admin-menu-card"
        >
          <span>👥</span>
          <h3>Manage Patients</h3>
          <p>
            View and manage registered patient records.
          </p>
        </Link>

        <Link
          to="/admin/appointments"
          className="admin-menu-card"
        >
          <span>📅</span>
          <h3>Manage Appointments</h3>
          <p>
            Monitor and manage patient appointments.
          </p>
        </Link>

        <Link
          to="/admin/audit-logs"
          className="admin-menu-card"
        >
          <span>📋</span>
          <h3>Audit Logs</h3>
          <p>
            Monitor system activity and administrative actions.
          </p>
        </Link>

        <Link
          to="/admin/notifications"
          className="admin-menu-card"
        >
          <span>🔔</span>
          <h3>Notifications</h3>
          <p>
            Manage system notifications and alerts.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;