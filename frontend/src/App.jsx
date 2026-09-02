import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// ==============================
// Authentication
// ==============================
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";

// ==============================
// Patient Module
// ==============================
import PatientDashboard from "./components/Patient/PatientDashboard";
import PatientRegistration from "./components/Patient/PatientRegistration";
import PatientProfile from "./components/Patient/PatientProfile";
import EditPatientProfile from "./components/Patient/EditPatientProfile";
import BookAppointment from "./components/Patient/BookAppointment";
import MyAppointments from "./components/Patient/MyAppointments";

// ==============================
// Doctor Module
// ==============================
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import PatientList from "./components/Doctor/PatientList";
import Consultation from "./components/Doctor/Consultation";
import ConsultationHistory from "./components/Doctor/ConsultationHistory";
import Prescription from "./components/Doctor/Prescription";
import PrescriptionHistory from "./components/Doctor/PrescriptionHistory";

// ==============================
// Admin Module
// ==============================
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageDoctors from "./components/Admin/ManageDoctors";
import ManagePatients from "./components/Admin/ManagePatients";
import ManageAppointments from "./components/Admin/ManageAppointments";
import AuditLogs from "./components/Admin/AuditLogs";
import Notifications from "./components/Admin/Notifications";

// ==============================
// Analytics & Reports
// ==============================
import AnalyticsDashboard from "./components/Analytics&Reports/AnalyticsDashboard";
import Reports from "./components/Analytics&Reports/Reports";
import ExportReports from "./components/Analytics&Reports/ExportReports";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==============================
            PUBLIC ROUTES
        ================================= */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* ==============================
            PATIENT ROUTES
        ================================= */}

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/registration"
          element={
            <ProtectedRoute role="patient">
              <PatientRegistration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute role="patient">
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile/edit"
          element={
            <ProtectedRoute role="patient">
              <EditPatientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/book-appointment"
          element={
            <ProtectedRoute role="patient">
              <BookAppointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute role="patient">
              <MyAppointments />
            </ProtectedRoute>
          }
        />


        {/* ==============================
            DOCTOR ROUTES
        ================================= */}

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute role="doctor">
              <PatientList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/consultation"
          element={
            <ProtectedRoute role="doctor">
              <Consultation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/consultation-history"
          element={
            <ProtectedRoute role="doctor">
              <ConsultationHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/prescription"
          element={
            <ProtectedRoute role="doctor">
              <Prescription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/prescription-history"
          element={
            <ProtectedRoute role="doctor">
              <PrescriptionHistory />
            </ProtectedRoute>
          }
        />


        {/* ==============================
            ADMIN ROUTES
        ================================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <ManageDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute role="admin">
              <ManagePatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <ManageAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute role="admin">
              <AuditLogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute role="admin">
              <Notifications />
            </ProtectedRoute>
          }
        />


        {/* ==============================
            ANALYTICS & REPORTS
        ================================= */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute role="admin">
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics/export"
          element={
            <ProtectedRoute role="admin">
              <ExportReports />
            </ProtectedRoute>
          }
        />


        {/* ==============================
            UNKNOWN ROUTE
        ================================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;