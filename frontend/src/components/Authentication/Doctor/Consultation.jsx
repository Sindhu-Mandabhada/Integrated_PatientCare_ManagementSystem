import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Consultation.css";

function Consultation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pid: "",
    diagnosis: "",
    symptoms: "",
    notes: "",
    consultation_date: new Date().toISOString().split("T")[0]
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/consultations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Consultation saved successfully! ✅");

        setTimeout(() => {
          navigate("/doctor/consultation-history");
        }, 1000);
      } else {
        setMessage(
          data.message || "Unable to save consultation."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="consultation-page">

      <div className="consultation-container">

        <h1>Patient Consultation</h1>

        <p>
          Record the consultation details for a patient.
        </p>

        {message && (
          <div className="consultation-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="consultation-group">
            <label>Patient ID</label>
            <input
              type="text"
              name="pid"
              value={formData.pid}
              onChange={handleChange}
              placeholder="Enter patient ID"
              required
            />
          </div>

          <div className="consultation-group">
            <label>Symptoms</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              placeholder="Enter patient symptoms"
              rows="4"
              required
            />
          </div>

          <div className="consultation-group">
            <label>Diagnosis</label>
            <textarea
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              placeholder="Enter diagnosis"
              rows="4"
              required
            />
          </div>

          <div className="consultation-group">
            <label>Doctor's Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add additional notes"
              rows="4"
            />
          </div>

          <div className="consultation-group">
            <label>Consultation Date</label>
            <input
              type="date"
              name="consultation_date"
              value={formData.consultation_date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">
            Save Consultation
          </button>

        </form>

      </div>

    </div>
  );
}

export default Consultation;