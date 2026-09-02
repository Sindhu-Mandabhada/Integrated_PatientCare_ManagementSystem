import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  UserRound,
  Stethoscope,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create account.");
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      {/* Left Side */}
      <div className="signup-brand">
        <div className="signup-brand-content">
          <div className="signup-logo">
            <div className="signup-logo-icon">
              <HeartPulse size={28} />
            </div>

            <div>
              <h1>MediTrack</h1>
              <span>Integrated Patient Care</span>
            </div>
          </div>

          <div className="signup-intro">
            <span className="signup-badge">
              <CheckCircle2 size={15} />
              Join MediTrack
            </span>

            <h2>
              Your healthcare,
              <br />
              connected.
            </h2>

            <p>
              Create your account and access a smarter, more
              organized healthcare experience.
            </p>
          </div>

          <div className="signup-benefits">
            <div>
              <CheckCircle2 size={18} />
              <span>Easy appointment scheduling</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Secure patient information</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Connected healthcare services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="signup-form-section">
        <div className="signup-container">
          <div className="signup-mobile-logo">
            <div>
              <HeartPulse size={24} />
            </div>
            <strong>MediTrack</strong>
          </div>

          <div className="signup-heading">
            <h2>Create your account</h2>
            <p>Enter your details to get started with MediTrack.</p>
          </div>

          {/* Role */}
          <div className="signup-role-selector">
            <button
              type="button"
              className={role === "patient" ? "active" : ""}
              onClick={() => setRole("patient")}
            >
              <UserRound size={17} />
              Patient
            </button>

            <button
              type="button"
              className={role === "doctor" ? "active" : ""}
              onClick={() => setRole("doctor")}
            >
              <Stethoscope size={17} />
              Doctor
            </button>

            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
            >
              <ShieldCheck size={17} />
              Admin
            </button>
          </div>

          <form onSubmit={handleSignup}>
            {error && (
              <div className="signup-message signup-error">
                <span>!</span>
                {error}
              </div>
            )}

            {success && (
              <div className="signup-message signup-success">
                <CheckCircle2 size={17} />
                {success}
              </div>
            )}

            {/* Name */}
            <div className="signup-input-group">
              <label>Full Name</label>

              <div className="signup-input">
                <User size={18} />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="signup-two-column">
              <div className="signup-input-group">
                <label>Email Address</label>

                <div className="signup-input">
                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="signup-input-group">
                <label>Phone Number</label>

                <div className="signup-input">
                  <Phone size={18} />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="signup-input-group">
              <label>Password</label>

              <div className="signup-input">
                <Lock size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="signup-password-toggle"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="signup-input-group">
              <label>Confirm Password</label>

              <div className="signup-input">
                <Lock size={18} />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="signup-password-toggle"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="signup-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="signup-spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create {role} account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="already-account">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>

          <div className="signup-security">
            <ShieldCheck size={15} />
            Your information is handled through secure
            role-based access.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;