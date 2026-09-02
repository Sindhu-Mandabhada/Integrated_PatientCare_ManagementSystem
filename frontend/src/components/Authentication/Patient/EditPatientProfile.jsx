import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditPatientProfile.css";

function EditPatientProfile() {
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

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/patients"
        );

        const data = await response.json();

        const patient = data.find(
          (p) =>
            p.pid === user?.pid ||
            p.phone === user?.phone ||
            p.name === user?.name
        );

        if (patient) {
          setFormData(patient);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadPatient();
  }, [user?.pid, user?.phone, user?.name]);

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
        `http://127.0.0.1:5000/api/patients/${formData.pid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully! ✅");

        setTimeout(() => {
          navigate("/patient/profile");
        }, 1000);
      } else {
        setMessage(data.message || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed.");
    }
  };

  return (
    <div className="edit-profile-page">

      <div className="edit-profile-container">

        <h1>Edit Patient Profile</h1>
        <p>Update your personal information.</p>

        {message && (
          <div className="edit-message">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="edit-group">
            <label>Patient ID</label>
            <input
              type="text"
              name="pid"
              value={formData.pid}
              readOnly
            />
          </div>

          <div className="edit-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-row">

            <div className="edit-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-group">
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

          <div className="edit-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-group">
            <label>Blood Group</label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
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

          <button type="submit">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditPatientProfile;