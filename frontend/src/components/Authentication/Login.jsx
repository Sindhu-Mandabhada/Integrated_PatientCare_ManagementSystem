
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid login credentials.");
      }

      localStorage.setItem("user", JSON.stringify(data.user || data));

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Unable to connect to the server. Please start the backend."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        <div className="login-brand-section">
          <div className="login-logo">M</div>
          <h1>MediTrack</h1>
          <p>Integrated Patient Care Management System</p>

          <div className="login-feature">
            <span>✓</span>
            <p>Secure patient information</p>
          </div>

          <div className="login-feature">
            <span>✓</span>
            <p>Easy appointment scheduling</p>
          </div>

          <div className="login-feature">
            <span>✓</span>
            <p>Connected healthcare management</p>
          </div>
        </div>

        <div className="login-card">
          <div className="login-heading">
            <h2>Welcome back</h2>
            <p>Sign in to continue to MediTrack</p>
          </div>

          <div className="role-selector">
            {["patient", "doctor", "admin"].map((item) => (
              <button
                key={item}
                type="button"
                className={role === item ? "active" : ""}
                onClick={() => setRole(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="login-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="signup-link">
            Don't have an account?
            <Link to="/signup"> Create an account</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;

