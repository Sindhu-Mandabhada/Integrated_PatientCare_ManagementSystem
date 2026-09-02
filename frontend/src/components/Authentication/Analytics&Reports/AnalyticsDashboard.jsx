import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AnalyticsDashboard.css";

function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    consultations: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/dashboard"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();

      setStats({
        patients:
          data.patients ||
          data.total_patients ||
          0,

        doctors:
          data.doctors ||
          data.total_doctors ||
          0,

        appointments:
          data.appointments ||
          data.total_appointments ||
          0,

        consultations:
          data.consultations ||
          data.total_consultations ||
          0
      });

    } catch (error) {
      console.error("Analytics error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics-dashboard">

      <div className="analytics-header">

        <div>
          <h1>Analytics Dashboard</h1>
          <p>
            Monitor MediTrack performance and healthcare statistics.
          </p>
        </div>

        <div className="analytics-header-icon">
          📊
        </div>

      </div>

      {loading ? (
        <div className="analytics-loading">
          Loading analytics...
        </div>
      ) : (

        <>
          <div className="analytics-stats">

            <div className="analytics-card">
              <div className="analytics-card-icon">
                👥
              </div>

              <div>
                <h3>Total Patients</h3>
                <strong>{stats.patients}</strong>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-card-icon">
                👨‍⚕️
              </div>

              <div>
                <h3>Total Doctors</h3>
                <strong>{stats.doctors}</strong>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-card-icon">
                📅
              </div>

              <div>
                <h3>Appointments</h3>
                <strong>{stats.appointments}</strong>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-card-icon">
                🩺
              </div>

              <div>
                <h3>Consultations</h3>
                <strong>{stats.consultations}</strong>
              </div>
            </div>

          </div>

          <div className="analytics-actions">

            <Link
              to="/analytics/reports"
              className="analytics-action-card"
            >
              <span>📋</span>

              <div>
                <h3>View Reports</h3>
                <p>
                  View detailed healthcare reports.
                </p>
              </div>
            </Link>

            <Link
              to="/analytics/export"
              className="analytics-action-card"
            >
              <span>📤</span>

              <div>
                <h3>Export Reports</h3>
                <p>
                  Download reports in CSV or PDF format.
                </p>
              </div>
            </Link>

          </div>

          <div className="analytics-overview">

            <h2>System Overview</h2>

            <div className="overview-grid">

              <div className="overview-item">
                <span>Patient Records</span>
                <strong>{stats.patients}</strong>
              </div>

              <div className="overview-item">
                <span>Registered Doctors</span>
                <strong>{stats.doctors}</strong>
              </div>

              <div className="overview-item">
                <span>Total Appointments</span>
                <strong>{stats.appointments}</strong>
              </div>

              <div className="overview-item">
                <span>Completed Consultations</span>
                <strong>{stats.consultations}</strong>
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default AnalyticsDashboard;