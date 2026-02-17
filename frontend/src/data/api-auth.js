import { API_URL } from '../../config';

export const loginAdmin = async (username, password) => {
  try {
    console.log('Attempting login to:', `${API_URL}/admin/login`);
    
    // Create URLSearchParams instead of FormData for OAuth2
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error:', errorData);
      throw new Error(errorData.detail || 'Login failed');
    }

    const data = await response.json();
    console.log('Login successful:', data);
    return data;
  } catch (error) {
    console.error('Login error:', error);
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
  return !!(token && token.length > 0 && user && user.length > 0);
};

export const getAdminToken = () => {
  return localStorage.getItem('admin_token');
};

export const getAdminUser = () => {
  return localStorage.getItem('admin_user') || 'Admin User';
};