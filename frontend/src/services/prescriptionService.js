import { apiRequest } from "./api";

export const getPrescriptions = async () => {
  return await apiRequest("/prescriptions");
};

export const getPrescription = async (
  prescriptionId
) => {
  return await apiRequest(
    `/prescriptions/${prescriptionId}`
  );
};

export const createPrescription = async (
  prescriptionData
) => {
  return await apiRequest("/prescriptions", {
    method: "POST",
    body: JSON.stringify(prescriptionData),
  });
};

export const updatePrescription = async (
  prescriptionId,
  prescriptionData
) => {
  return await apiRequest(
    `/prescriptions/${prescriptionId}`,
    {
      method: "PUT",
      body: JSON.stringify(prescriptionData),
    }
  );
};

export const deletePrescription = async (
  prescriptionId
) => {
  return await apiRequest(
    `/prescriptions/${prescriptionId}`,
    {
      method: "DELETE",
    }
  );
};