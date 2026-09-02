import { apiRequest } from "./api";

export const getConsultations = async () => {
  return await apiRequest("/consultations");
};

export const getConsultation = async (
  consultationId
) => {
  return await apiRequest(
    `/consultations/${consultationId}`
  );
};

export const createConsultation = async (
  consultationData
) => {
  return await apiRequest("/consultations", {
    method: "POST",
    body: JSON.stringify(consultationData),
  });
};

export const updateConsultation = async (
  consultationId,
  consultationData
) => {
  return await apiRequest(
    `/consultations/${consultationId}`,
    {
      method: "PUT",
      body: JSON.stringify(consultationData),
    }
  );
};