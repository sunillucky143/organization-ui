import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import ForgetPasswordPage from './components/ForgetPasswordPage';

const theme = createTheme({
  // Define your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
