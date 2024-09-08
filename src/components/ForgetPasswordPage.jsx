// src/components/ForgetPasswordPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import miningBack from '../assets/mining-back1.jpg';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const ForgetPasswordPage = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: prefersDarkMode ? '#BB86FC' : '#6200EE',
      },
      background: {
        default: prefersDarkMode ? '#121212' : '#f0f0f0',
        paper: prefersDarkMode ? '#1f1f1f' : '#ffffff',
      },
      text: {
        primary: prefersDarkMode ? '#ffffff' : '#000000',
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
        <Container
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          backgroundImage: `url(${miningBack})`, // Only the image as background
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        >
        <Paper
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          elevation={3}
          sx={{
            padding: "40px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent white
            backdropFilter: "blur(10px)", // Background blur effect
            width: { xs: "90%", sm: "400px" }, // Responsive width
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Shadow to highlight the box
            border: "1px solid rgba(255, 255, 255, 0.3)", // Optional subtle border
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: "center",
              color: theme.palette.primary.main,
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 3, textAlign: "center" }}
          >
            Enter your email address to receive a password reset link.
          </Typography>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Send Reset Link
          </Button>
          <Typography variant="body2" component="p" textAlign="center">
            Remember your password?{' '}
            <Link to="/" style={{ color: theme.palette.primary.main }}>
              Log In
            </Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ForgetPasswordPage;
