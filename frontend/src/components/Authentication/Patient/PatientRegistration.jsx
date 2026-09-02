import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientRegistration.css";

function PatientRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pid: "",
    name: "",
    age: "",
    gender: "",
    phone: "",
    blood_group: ""
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
        "http://127.0.0.1:5000/api/patients",
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
        setMessage("Patient registered successfully! ✅");

        setTimeout(() => {
          navigate("/patient/profile");
        }, 1000);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="registration-page">

      <div className="registration-container">

        <h1>Patient Registration</h1>
        <p className="registration-subtitle">
          Enter your details to create your patient record.
        </p>

        {message && (
          <div className="registration-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
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

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            Register Patient
          </button>

        </form>

      </div>

    </div>
  );
}

export default PatientRegistration;