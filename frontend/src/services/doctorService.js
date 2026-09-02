import { apiRequest } from "./api";

export const getDoctors = async () => {
  return await apiRequest("/doctors");
};

export const getDoctor = async (doctorId) => {
  return await apiRequest(`/doctors/${doctorId}`);
};

export const createDoctor = async (doctorData) => {
  return await apiRequest("/doctors", {
    method: "POST",
    body: JSON.stringify(doctorData),
  });
};

export const updateDoctor = async (
  doctorId,
  doctorData
) => {
  return await apiRequest(`/doctors/${doctorId}`, {
    method: "PUT",
    body: JSON.stringify(doctorData),
  });
};

export const deleteDoctor = async (doctorId) => {
  return await apiRequest(`/doctors/${doctorId}`, {
    method: "DELETE",
  });
};