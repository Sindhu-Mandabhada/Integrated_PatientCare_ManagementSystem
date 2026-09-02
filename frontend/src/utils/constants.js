// User roles
export const ROLES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  ADMIN: "admin"
};


// Appointment statuses
export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};


// Gender options
export const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other"
];


// Blood groups
export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];


// Doctor departments
export const DEPARTMENTS = [
  "General Medicine",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "ENT",
  "Ophthalmology",
  "Dentistry"
];


// Appointment interval
export const APPOINTMENT_INTERVAL = 30;


// Default doctor working hours
export const DEFAULT_WORKING_HOURS = {
  start: "09:00",
  end: "17:00"
};


// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user"
};


// API URL
export const API_BASE_URL =
  "http://127.0.0.1:5000/api";