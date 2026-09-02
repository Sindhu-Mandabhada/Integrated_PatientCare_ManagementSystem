// Check required field
export const isRequired = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
  );
};


// Validate email
export const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};


// Validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;

  return phoneRegex.test(phone);
};


// Validate password
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};


// Validate age
export const isValidAge = (age) => {
  const number = Number(age);

  return (
    Number.isInteger(number) &&
    number > 0 &&
    number <= 120
  );
};


// Validate date
export const isValidDate = (date) => {
  if (!date) {
    return false;
  }

  const parsedDate = new Date(date);

  return !isNaN(parsedDate.getTime());
};


// Validate patient form
export const validatePatient = (patient) => {
  const errors = {};

  if (!isRequired(patient.name)) {
    errors.name = "Name is required";
  }

  if (!isValidAge(patient.age)) {
    errors.age = "Enter a valid age";
  }

  if (!isRequired(patient.gender)) {
    errors.gender = "Gender is required";
  }

  if (!isValidPhone(patient.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  if (
    patient.email &&
    !isValidEmail(patient.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};


// Validate login form
export const validateLogin = (data) => {
  const errors = {};

  if (!isRequired(data.username)) {
    errors.username = "Username is required";
  }

  if (!isRequired(data.password)) {
    errors.password = "Password is required";
  }

  if (!isRequired(data.role)) {
    errors.role = "Please select a role";
  }

  return errors;
};


// Validate signup form
export const validateSignup = (data) => {
  const errors = {};

  if (!isRequired(data.name)) {
    errors.name = "Name is required";
  }

  if (!isRequired(data.username)) {
    errors.username = "Username is required";
  }

  if (!isValidEmail(data.email)) {
    errors.email = "Enter a valid email";
  }

  if (!isValidPassword(data.password)) {
    errors.password =
      "Password must contain at least 6 characters";
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword =
      "Passwords do not match";
  }

  if (!isRequired(data.role)) {
    errors.role = "Please select a role";
  }

  return errors;
};


// Validate appointment
export const validateAppointment = (
  appointment
) => {
  const errors = {};

  if (!isRequired(appointment.doctor_id)) {
    errors.doctor_id = "Doctor is required";
  }

  if (!isRequired(appointment.date)) {
    errors.date = "Appointment date is required";
  }

  if (!isRequired(appointment.time)) {
    errors.time = "Appointment time is required";
  }

  return errors;
};