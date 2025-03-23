import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
