import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PatientProfile.css";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/patients"
        );

        const data = await response.json();

        const foundPatient = data.find(
          (p) =>
            p.pid === user?.pid ||
            p.phone === user?.phone ||
            p.name === user?.name
        );

        setPatient(foundPatient);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [user?.pid, user?.phone, user?.name]);

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (!patient) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <h2>Patient Profile</h2>
          <p>No patient record found.</p>
          <Link to="/patient/registration">
            Register Patient
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-top">
          <div className="profile-avatar">
            {patient.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>{patient.name}</h1>
            <p>Patient ID: {patient.pid}</p>
          </div>
        </div>

        <div className="profile-details">

          <div className="profile-item">
            <span>Full Name</span>
            <strong>{patient.name}</strong>
          </div>

          <div className="profile-item">
            <span>Patient ID</span>
            <strong>{patient.pid}</strong>
          </div>

          <div className="profile-item">
            <span>Age</span>
            <strong>{patient.age}</strong>
          </div>

          <div className="profile-item">
            <span>Gender</span>
            <strong>{patient.gender}</strong>
          </div>

          <div className="profile-item">
            <span>Phone</span>
            <strong>{patient.phone}</strong>
          </div>

          <div className="profile-item">
            <span>Blood Group</span>
            <strong>{patient.blood_group}</strong>
          </div>

        </div>

        <Link
          to="/patient/edit-profile"
          className="edit-profile-btn"
        >
          Edit Profile
        </Link>

      </div>

    </div>
  );
}

export default PatientProfile;