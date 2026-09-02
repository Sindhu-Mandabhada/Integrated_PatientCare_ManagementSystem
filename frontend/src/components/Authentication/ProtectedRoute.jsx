import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();

  const userData = localStorage.getItem("user");

  if (!userData) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return <Navigate to="/login" replace />;
  }

  if (!user || !user.role) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return <Navigate to="/login" replace />;
  }

  /*
    If allowedRoles is provided, check whether
    the logged-in user's role is allowed.
  */

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    }

    if (user.role === "doctor") {
      return <Navigate to="/doctor-dashboard" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;