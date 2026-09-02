import React from "react";
import "./DoctorCard.css";

function DoctorCard({
  doctor,
  onBook,
  onView
}) {
  if (!doctor) {
    return null;
  }

  const {
    name,
    specialization,
    department,
    experience,
    phone,
    image,
    availability
  } = doctor;

  return (
    <div className="doctor-card">

      <div className="doctor-card-top">

        <div className="doctor-image-wrapper">

          {image ? (
            <img
              src={image}
              alt={name || "Doctor"}
              className="doctor-image"
            />
          ) : (
            <div className="doctor-placeholder">
              👨‍⚕️
            </div>
          )}

        </div>

        <div className="doctor-info">

          <h3>
            {name || "Doctor"}
          </h3>

          <p className="doctor-specialization">
            {specialization || "General Physician"}
          </p>

          {department && (
            <p className="doctor-department">
              {department}
            </p>
          )}

        </div>

      </div>

      <div className="doctor-details">

        {experience && (
          <div>
            <span>💼</span>
            <p>
              <strong>{experience}</strong>
              <small> Experience</small>
            </p>
          </div>
        )}

        {phone && (
          <div>
            <span>📞</span>
            <p>
              <strong>{phone}</strong>
              <small> Contact</small>
            </p>
          </div>
        )}

        {availability && (
          <div>
            <span>🟢</span>
            <p>
              <strong>{availability}</strong>
              <small> Availability</small>
            </p>
          </div>
        )}

      </div>

      <div className="doctor-actions">

        {onView && (
          <button
            className="doctor-view-btn"
            onClick={() => onView(doctor)}
          >
            View Profile
          </button>
        )}

        {onBook && (
          <button
            className="doctor-book-btn"
            onClick={() => onBook(doctor)}
          >
            Book Appointment
          </button>
        )}

      </div>

    </div>
  );
}

export default DoctorCard;