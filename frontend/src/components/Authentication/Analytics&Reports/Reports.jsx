import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Reports.css";

function Reports() {
  const [dashboard, setDashboard] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    consultations: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/dashboard"
      );

      const data = await response.json();

      setDashboard({
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
      console.error("Report error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reports-page">

      <div className="reports-header">

        <div>
          <h1>Healthcare Reports</h1>
          <p>
            Detailed reports generated from MediTrack data.
          </p>
        </div>

        <Link
          to="/analytics/export"
          className="reports-export-btn"
        >
          📤 Export Reports
        </Link>

      </div>

      {loading ? (
        <div className="reports-loading">
          Loading reports...
        </div>
      ) : (

        <div className="report-grid">

          <div className="report-card">

            <div className="report-icon">
              👥
            </div>

            <h2>Patient Report</h2>

            <p>
              Total registered patients in the system.
            </p>

            <strong>
              {dashboard.patients}
            </strong>

            <span>
              Registered Patients
            </span>

          </div>

          <div className="report-card">

            <div className="report-icon">
              👨‍⚕️
            </div>

            <h2>Doctor Report</h2>

            <p>
              Total doctors available in MediTrack.
            </p>

            <strong>
              {dashboard.doctors}
            </strong>

            <span>
              Registered Doctors
            </span>

          </div>

          <div className="report-card">

            <div className="report-icon">
              📅
            </div>

            <h2>Appointment Report</h2>

            <p>
              Total appointments recorded.
            </p>

            <strong>
              {dashboard.appointments}
            </strong>

            <span>
              Appointments
            </span>

          </div>

          <div className="report-card">

            <div className="report-icon">
              🩺
            </div>

            <h2>Consultation Report</h2>

            <p>
              Total consultations recorded.
            </p>

            <strong>
              {dashboard.consultations}
            </strong>

            <span>
              Consultations
            </span>

          </div>

        </div>

      )}

    </div>
  );
}

export default Reports;