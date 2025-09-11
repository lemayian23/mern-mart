import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// Create and export the context
export const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component (named export)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set auth token in axios headers and verify token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Set token in axios headers
          authService.setAuthToken(token);
          
          // Verify token and get user data
          const userData = await authService.verifyToken(token);
          setUser(userData);
          setError(null);
        } catch (error) {
          console.error('Token verification failed:', error);
          setError('Your session has expired. Please log in again.');
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      const { token: newToken, user: newUser } = response;
      
      setToken(newToken);
      setUser(newUser);
      authService.setAuthToken(newToken);
      localStorage.setItem('token', newToken);
      
      return { 
        success: true, 
        message: 'Registration successful',
        user: newUser,
        token: newToken
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      const { token: newToken, user: newUser } = response;
      
      // Add isAdmin flag based on email (for demo purposes)
      // In production, this should come from your backend
      const userWithAdmin = {
        ...newUser,
        isAdmin: newUser.email === 'admin@example.com' || newUser.email === 'lemayian23@example.com'
      };
      
      setToken(newToken);
      setUser(userWithAdmin);
      authService.setAuthToken(newToken);
      localStorage.setItem('token', newToken);
      
      return { 
        success: true, 
        message: 'Login successful',
        user: userWithAdmin,
        token: newToken
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    authService.removeAuthToken();
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    clearError,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export for backward compatibility
export default AuthProvider;