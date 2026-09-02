import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  CalendarDays,
  Users,
  Stethoscope,
  ClipboardList,
  Pill,
  FileText,
  Bell,
  BarChart3,
  Settings,
  ShieldCheck,
  Activity,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ role = "patient" }) {
  const patientLinks = [
    {
      label: "Dashboard",
      path: "/patient-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "My Profile",
      path: "/patient-profile",
      icon: <UserRound size={18} />,
    },
    {
      label: "Edit Profile",
      path: "/edit-patient-profile",
      icon: <Settings size={18} />,
    },
    {
      label: "Book Appointment",
      path: "/book-appointment",
      icon: <CalendarDays size={18} />,
    },
    {
      label: "My Appointments",
      path: "/my-appointments",
      icon: <ClipboardList size={18} />,
    },
    {
      label: "Prescriptions",
      path: "/prescription-history",
      icon: <Pill size={18} />,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
    },
  ];

  const doctorLinks = [
    {
      label: "Dashboard",
      path: "/doctor-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Patients",
      path: "/patient-list",
      icon: <Users size={18} />,
    },
    {
      label: "Consultations",
      path: "/consultation",
      icon: <Stethoscope size={18} />,
    },
    {
      label: "Consultation History",
      path: "/consultation-history",
      icon: <ClipboardList size={18} />,
    },
    {
      label: "Prescriptions",
      path: "/prescription",
      icon: <Pill size={18} />,
    },
    {
      label: "Prescription History",
      path: "/prescription-history",
      icon: <FileText size={18} />,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Manage Doctors",
      path: "/manage-doctors",
      icon: <Stethoscope size={18} />,
    },
    {
      label: "Manage Patients",
      path: "/manage-patients",
      icon: <Users size={18} />,
    },
    {
      label: "Appointments",
      path: "/manage-appointments",
      icon: <CalendarDays size={18} />,
    },
    {
      label: "Audit Logs",
      path: "/audit-logs",
      icon: <ShieldCheck size={18} />,
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
    },
    {
      label: "Analytics",
      path: "/analytics-dashboard",
      icon: <BarChart3 size={18} />,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: <FileText size={18} />,
    },
  ];

  let links = patientLinks;

  if (role === "doctor") {
    links = doctorLinks;
  }

  if (role === "admin") {
    links = adminLinks;
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-section-title">
          {role === "admin"
            ? "Administration"
            : role === "doctor"
            ? "Doctor Portal"
            : "Patient Portal"}
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">{link.icon}</span>

              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-system-status">
          <span className="status-indicator"></span>

          <div>
            <strong>System Online</strong>
            <span>MediTrack services active</span>
          </div>
        </div>

        <div className="sidebar-version">
          MediTrack v1.0
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;