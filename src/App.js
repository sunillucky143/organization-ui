import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Adjust import path as needed
import SignUpPage from './components/SignUpPage';
import ForgetPasswordPage from './components/ForgetPasswordPage';
import LoginPage from './components/LoginPage'; // Assuming you have a LoginPage component
import TailingForm from './components/TailingsForm';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/" element={<LoginPage />} />

      {/* Protected Route */}
      <Route
        path="/tailing-form"
        element={isAuthenticated ? <TailingForm /> : <Navigate to="/" />}
      />

      {/* Redirect to login if accessing any other route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
