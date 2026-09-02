import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookAppointment.css";

function BookAppointment() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    pid: user?.pid || "",
    doctor: "",
    date: "",
    time: "",
    reason: ""
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

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/appointments",
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
        setMessage("Appointment booked successfully! ✅");

        setTimeout(() => {
          navigate("/patient/appointments");
        }, 1000);
      } else {
        setMessage(data.message || "Unable to book appointment.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="appointment-page">

      <div className="appointment-container">

        <h1>Book Appointment</h1>
        <p>Schedule an appointment with a doctor.</p>

        {message && (
          <div className="appointment-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="appointment-group">
            <label>Patient ID</label>
            <input
              type="text"
              name="pid"
              value={formData.pid}
              onChange={handleChange}
              required
            />
          </div>

          <div className="appointment-group">
            <label>Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Rajesh Kumar">
                Dr. Rajesh Kumar
              </option>
              <option value="Dr. Priya Sharma">
                Dr. Priya Sharma
              </option>
              <option value="Dr. Anjali Reddy">
                Dr. Anjali Reddy
              </option>
              <option value="Dr. Arjun Rao">
                Dr. Arjun Rao
              </option>
            </select>
          </div>

          <div className="appointment-row">

            <div className="appointment-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="appointment-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="appointment-group">
            <label>Reason for Visit</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Describe the reason for your appointment"
              rows="4"
              required
            />
          </div>

          <button type="submit">
            Book Appointment
          </button>

        </form>

      </div>

    </div>
  );
}

export default BookAppointment;