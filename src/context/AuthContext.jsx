import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Function to calculate the expiration time (30 minutes)
  const calculateExpirationTime = () => {
    return new Date().getTime() + 30 * 60 * 1000; // Current time + 30 minutes in milliseconds
  };

  // Function to check if the token is expired
  const isTokenExpired = (expirationTime) => {
    return new Date().getTime() > expirationTime;
  };

  // Load token from localStorage (if available) when the app starts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expirationTime = localStorage.getItem('authTokenExpiration');

    if (token && expirationTime && !isTokenExpired(expirationTime)) {
      setIsAuthenticated(true);
      setAuthToken(token);
    } else {
      logout(); // Clear any invalid or expired tokens
    }
  }, []);

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/login/', {
        username: email,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is returned in the response
        const expirationTime = calculateExpirationTime();

        localStorage.setItem('authToken', token); // Store token in localStorage
        localStorage.setItem('authTokenExpiration', expirationTime); // Store expiration time in localStorage
        setAuthToken(token); // Save token to state
        setIsAuthenticated(true); // Set user as authenticated
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return error.response?.data || "Login failed";
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access authentication data
export const useAuth = () => useContext(AuthContext);