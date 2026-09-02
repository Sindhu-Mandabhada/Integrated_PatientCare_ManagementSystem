import { apiRequest } from "./api";

export const getPatients = async () => {
  return await apiRequest("/patients");
};

export const getPatient = async (patientId) => {
  return await apiRequest(`/patients/${patientId}`);
};

export const registerPatient = async (patientData) => {
  return await apiRequest("/patients", {
    method: "POST",
    body: JSON.stringify(patientData),
  });
};

export const updatePatient = async (
  patientId,
  patientData
) => {
  return await apiRequest(`/patients/${patientId}`, {
    method: "PUT",
    body: JSON.stringify(patientData),
  });
};

export const deletePatient = async (patientId) => {
  return await apiRequest(`/patients/${patientId}`, {
    method: "DELETE",
  });
};