import API_BASE_URL from "./api";

export const downloadReport = async (
  reportType,
  format
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/reports/${reportType}?format=${format}`,
    {
      headers: {
        Authorization: token
          ? `Bearer ${token}`
          : "",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to download report");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download =
    `meditrack_${reportType}_report.${format}`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};

export const getReports = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/reports`,
    {
      headers: {
        Authorization: token
          ? `Bearer ${token}`
          : "",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reports");
  }

  return await response.json();
};