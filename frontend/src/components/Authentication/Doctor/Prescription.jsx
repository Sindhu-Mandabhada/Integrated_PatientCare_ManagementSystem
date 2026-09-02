import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Prescription.css";

function Prescription() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pid: "",
    medicine: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: ""
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
        "http://127.0.0.1:5000/api/prescriptions",
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
        setMessage("Prescription created successfully! ✅");

        setTimeout(() => {
          navigate("/doctor/prescription-history");
        }, 1000);
      } else {
        setMessage(
          data.message || "Unable to create prescription."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="prescription-page">

      <div className="prescription-container">

        <h1>Create Prescription</h1>

        <p>
          Enter the medicine and dosage information.
        </p>

        {message && (
          <div className="prescription-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="prescription-group">
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

          <div className="prescription-group">
            <label>Medicine</label>
            <input
              type="text"
              name="medicine"
              value={formData.medicine}
              onChange={handleChange}
              placeholder="Enter medicine name"
              required
            />
          </div>

          <div className="prescription-row">

            <div className="prescription-group">
              <label>Dosage</label>
              <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="e.g. 500 mg"
                required
              />
            </div>

            <div className="prescription-group">
              <label>Frequency</label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Once a day">
                  Once a day
                </option>
                <option value="Twice a day">
                  Twice a day
                </option>
                <option value="Three times a day">
                  Three times a day
                </option>
                <option value="As needed">
                  As needed
                </option>
              </select>
            </div>

          </div>

          <div className="prescription-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 5 days"
              required
            />
          </div>

          <div className="prescription-group">
            <label>Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Enter medicine instructions"
              rows="4"
            />
          </div>

          <button type="submit">
            Create Prescription
          </button>

        </form>

      </div>

    </div>
  );
}

export default Prescription;