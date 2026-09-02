// Get logged-in user
export const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user data");
    return null;
  }
};


// Get authentication token
export const getToken = () => {
  return localStorage.getItem("token");
};


// Check whether user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};


// Get user's role
export const getUserRole = () => {
  const user = getUser();

  return user?.role || null;
};


// Check specific role
export const hasRole = (role) => {
  return getUserRole() === role;
};


// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


// Check whether user has one of the given roles
export const hasAnyRole = (roles = []) => {
  const userRole = getUserRole();

  return roles.includes(userRole);
};