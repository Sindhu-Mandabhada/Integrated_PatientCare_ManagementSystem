
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user?.role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-brand" onClick={handleDashboard}>
          <div className="brand-icon">M</div>
          <div>
            <h2>MediTrack</h2>
            <span>Patient Care Management</span>
          </div>
        </div>

        {user && (
          <div className="navbar-right">

            <div className="navbar-user">
              <div className="user-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="user-info">
                <strong>{user.name || "User"}</strong>
                <span>{user.role || "Patient"}</span>
              </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;

