import { apiRequest } from "./api";

export const getAppointments = async () => {
  return await apiRequest("/appointments");
};

export const getAppointment = async (
  appointmentId
) => {
  return await apiRequest(
    `/appointments/${appointmentId}`
  );
};

export const bookAppointment = async (
  appointmentData
) => {
  return await apiRequest("/appointments", {
    method: "POST",
    body: JSON.stringify(appointmentData),
  });
};

export const updateAppointment = async (
  appointmentId,
  appointmentData
) => {
  return await apiRequest(
    `/appointments/${appointmentId}`,
    {
      method: "PUT",
      body: JSON.stringify(appointmentData),
    }
  );
};

export const cancelAppointment = async (
  appointmentId
) => {
  return await apiRequest(
    `/appointments/${appointmentId}`,
    {
      method: "DELETE",
    }
  );
};