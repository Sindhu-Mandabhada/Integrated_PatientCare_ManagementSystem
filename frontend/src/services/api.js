const API_BASE_URL = "http://127.0.0.1:5000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    const contentType = response.headers.get("content-type");

    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(
        data?.message ||
        data?.error ||
        "Something went wrong"
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default API_BASE_URL;