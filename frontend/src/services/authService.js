import { apiRequest } from "./api";

export const loginUser = async (loginData) => {
  const data = await apiRequest("/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  if (data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  return data;
};

export const signupUser = async (signupData) => {
  return await apiRequest("/signup", {
    method: "POST",
    body: JSON.stringify(signupData),
  });
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};