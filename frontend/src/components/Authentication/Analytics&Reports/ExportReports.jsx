import React, { useState } from "react";
import "./ExportReports.css";

function ExportReports() {
  const [loading, setLoading] = useState("");

  const exportReport = async (type, format) => {
    setLoading(`${type}-${format}`);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/reports/${type}?format=${format}`
      );

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        `meditrack_${type}_report.${format === "pdf" ? "pdf" : "csv"}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Export error:", error);

      alert(
        "Report export is not available yet. Please check the Flask backend."
      );
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="export-reports-page">

      <div className="export-header">

        <h1>Export Reports</h1>

        <p>
          Download MediTrack reports for analysis and documentation.
        </p>

      </div>

      <div className="export-grid">

        {/* Patient Report */}

        <div className="export-card">

          <div className="export-icon">
            👥
          </div>

          <h2>Patient Report</h2>

          <p>
            Export registered patient information.
          </p>

          <div className="export-buttons">

            <button
              onClick={() =>
                exportReport("patients", "csv")
              }
              disabled={loading !== ""}
            >
              {loading === "patients-csv"
                ? "Exporting..."
                : "📊 CSV"}
            </button>

            <button
              onClick={() =>
                exportReport("patients", "pdf")
              }
              disabled={loading !== ""}
            >
              {loading === "patients-pdf"
                ? "Exporting..."
                : "📄 PDF"}
            </button>

          </div>

        </div>

        {/* Appointment Report */}

        <div className="export-card">

          <div className="export-icon">
            📅
          </div>

          <h2>Appointment Report</h2>

          <p>
            Export appointment records and details.
          </p>

          <div className="export-buttons">

            <button
              onClick={() =>
                exportReport("appointments", "csv")
              }
              disabled={loading !== ""}
            >
              {loading === "appointments-csv"
                ? "Exporting..."
                : "📊 CSV"}
            </button>

            <button
              onClick={() =>
                exportReport("appointments", "pdf")
              }
              disabled={loading !== ""}
            >
              {loading === "appointments-pdf"
                ? "Exporting..."
                : "📄 PDF"}
            </button>

          </div>

        </div>

        {/* Consultation Report */}

        <div className="export-card">

          <div className="export-icon">
            🩺
          </div>

          <h2>Consultation Report</h2>

          <p>
            Export consultation records.
          </p>

          <div className="export-buttons">

            <button
              onClick={() =>
                exportReport("consultations", "csv")
              }
              disabled={loading !== ""}
            >
              {loading === "consultations-csv"
                ? "Exporting..."
                : "📊 CSV"}
            </button>

            <button
              onClick={() =>
                exportReport("consultations", "pdf")
              }
              disabled={loading !== ""}
            >
              {loading === "consultations-pdf"
                ? "Exporting..."
                : "📄 PDF"}
            </button>

          </div>

        </div>

        {/* Prescription Report */}

        <div className="export-card">

          <div className="export-icon">
            💊
          </div>

          <h2>Prescription Report</h2>

          <p>
            Export prescription and medication records.
          </p>

          <div className="export-buttons">

            <button
              onClick={() =>
                exportReport("prescriptions", "csv")
              }
              disabled={loading !== ""}
            >
              {loading === "prescriptions-csv"
                ? "Exporting..."
                : "📊 CSV"}
            </button>

            <button
              onClick={() =>
                exportReport("prescriptions", "pdf")
              }
              disabled={loading !== ""}
            >
              {loading === "prescriptions-pdf"
                ? "Exporting..."
                : "📄 PDF"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ExportReports;