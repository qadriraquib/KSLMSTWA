// Simple admin authentication using localStorage
const ADMIN_PASSWORD = "admin123"; // Change this to your desired password
const AUTH_KEY = "adminAuthenticated";

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === "true";
};
