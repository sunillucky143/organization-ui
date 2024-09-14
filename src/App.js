import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Adjust import path as needed
import { VerificationProvider } from './context/Verification_context';
import SignUpPage from './components/SignUpPage';
import ForgetPasswordPage from './components/ForgetPasswordPage';
import LoginPage from './components/LoginPage'; // Assuming you have a LoginPage component
import TailingsForm from './components/TailingsForm';
import Dashboard from "./components/dashboard/Home-screen";
import VerificationPage from "./components/verification/verification_page";
import WelcomePage from "./components/WelcomePage";
import PublicLogin from './components/PublicLogin'; 
import PublicSignup from './components/PublicSignup';
import PublicHome from './components/PublicHome';  
import FeedPage from './components/FeedPage'; 
import EditProfile from './components/EditProfile'; 

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  //const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<WelcomePage />} /> {/* Set WelcomePage as the default route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/PublicLogin" element={<PublicLogin />} />
      <Route path="/PublicSignup" element={<PublicSignup />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/tailing-form"
        element={isAuthenticated ? <TailingsForm /> : <Navigate to="/" />}
      />
      <Route
        path="/verification"
        element={isAuthenticated ? <VerificationPage /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route
        path="/PublicHome"
        element={isAuthenticated ? <PublicHome/> : <Navigate to="/" />}
      />
       <Route
        path="/FeedPage"
        element={isAuthenticated ? <FeedPage/> : <Navigate to="/" />}
      />
      <Route
        path="/EditProfile"
        element={isAuthenticated ? <EditProfile/> : <Navigate to="/" />}
      />
      {/* Redirect to WelcomePage for any other route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
  <VerificationProvide> {/* wrap with VerificationProvide */}
    <Router>
      <AppRoutes />
    </Router>
  </VerificationProvider>
  <Router>
    <AppRoutes />
  <Router>
  </AuthProvider>
);

export default App;
