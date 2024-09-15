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
import LikedPostsPage from './components/LikedPostsPage';
import DislikedPostsPage from './components/DislikedPostsPage';
import SavedPostsPage from './components/SavedPostsPage';
import Documents from './components/Documents';
import AnnouncementsPage from './components/dashboard/AnnouncementsPage';



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
        element={isAuthenticated ? <TailingsForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/verification"
        element={isAuthenticated ? <VerificationPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/announcements"
        element={isAuthenticated ? <AnnouncementsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/PublicHome"
        element={isAuthenticated ? <PublicHome/> : <Navigate to="/PublicLogin" />}
      />
       <Route
        path="/FeedPage"
        element={isAuthenticated ? <FeedPage/> : <Navigate to="/PublicLogin" />}
      />
      <Route
        path="/EditProfile"
        element={isAuthenticated ? <EditProfile/> : <Navigate to="/PublicLogin" />}
      />
      <Route
        path="/LikedPostsPage"
        element={isAuthenticated ? <LikedPostsPage/> : <Navigate to="/PublicLogin" />}
      />
      <Route
        path="/DislikedPostsPage"
        element={isAuthenticated ? <DislikedPostsPage/> : <Navigate to="/PublicLogin" />}
      />
      <Route
        path="/SavedPostsPage"
        element={isAuthenticated ? <SavedPostsPage/> : <Navigate to="/PublicLogin" />}
      />
       <Route
        path="/Documents"
        element={isAuthenticated ? <Documents/> : <Navigate to="/login" />}
      />
      {/* Redirect to WelcomePage for any other route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <VerificationProvider> {/* Wrap with VerificationProvider */}
      <Router>
        <AppRoutes />
      </Router>
    </VerificationProvider>
  </AuthProvider>
);

export default App;
