import { API_URL } from '../../config';

export const loginAdmin = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Unable to connect to server');
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
};

export const isAdminLoggedIn = () => {
  const token = localStorage.getItem('admin_token');
  const user = localStorage.getItem('admin_user');
  
  // Both token and user must exist
  return !!(token && token.length > 0 && user && user.length > 0);
};

export const getAdminToken = () => {
  return localStorage.getItem('admin_token');
};

export const getAdminUser = () => {
  return localStorage.getItem('admin_user') || 'Admin User';
};
