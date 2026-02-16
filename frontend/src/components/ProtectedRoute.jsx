import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminLoggedIn } from '../data/api-auth';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = isAdminLoggedIn();

  if (!isLoggedIn) {
    // Clear any stale data and redirect to login
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
