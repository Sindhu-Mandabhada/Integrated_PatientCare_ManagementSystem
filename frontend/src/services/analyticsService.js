import { apiRequest } from "./api";

export const getDashboardAnalytics = async () => {
  return await apiRequest("/dashboard");
};

export const getAnalytics = async () => {
  return await apiRequest("/analytics");
};

export const getPatientAnalytics = async () => {
  return await apiRequest("/analytics/patients");
};

export const getAppointmentAnalytics = async () => {
  return await apiRequest("/analytics/appointments");
};

export const getConsultationAnalytics = async () => {
  return await apiRequest(
    "/analytics/consultations"
  );
};