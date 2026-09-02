import React from "react";
import "./AppointmentCard.css";

function AppointmentCard({
  appointment,
  onCancel,
  onView
}) {
  if (!appointment) {
    return null;
  }

  const {
    doctor,
    patient,
    date,
    time,
    department,
    status
  } = appointment;

  return (
    <div className="appointment-card">

      <div className="appointment-card-header">

        <div className="appointment-icon">
          📅
        </div>

        <div className="appointment-title">
          <h3>
            {doctor
              ? `Dr. ${doctor}`
              : patient
              ? patient
              : "Appointment"}
          </h3>

          {department && (
            <p>{department}</p>
          )}
        </div>

        <span
          className={`appointment-status ${
            status?.toLowerCase() || "pending"
          }`}
        >
          {status || "Pending"}
        </span>

      </div>

      <div className="appointment-details">

        <div className="appointment-detail">
          <span>📅</span>
          <div>
            <small>Date</small>
            <strong>{date || "Not available"}</strong>
          </div>
        </div>

        <div className="appointment-detail">
          <span>⏰</span>
          <div>
            <small>Time</small>
            <strong>{time || "Not available"}</strong>
          </div>
        </div>

      </div>

      <div className="appointment-actions">

        {onView && (
          <button
            className="appointment-view-btn"
            onClick={() => onView(appointment)}
          >
            View Details
          </button>
        )}

        {onCancel &&
          status?.toLowerCase() !== "cancelled" &&
          status?.toLowerCase() !== "completed" && (
            <button
              className="appointment-cancel-btn"
              onClick={() => onCancel(appointment)}
            >
              Cancel
            </button>
          )}

      </div>

    </div>
  );
}

export default AppointmentCard;