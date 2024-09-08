import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  TextField,
  Box,
  Button,
  Paper,
  Typography,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';

const SignUpPage = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [formData, setFormData] = useState({
        organizationName: "",
        employeeName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
    });
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Here you can also add code to send the form data to your backend server if needed
        navigate('/login'); // Redirect to login page or another page after submission
    };

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
        maxWidth="sm"
        disableGutters
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, #f06292 100%)`, // Gradient background
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <Paper
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          elevation={3}
          sx={{
            padding: "40px",
            borderRadius: "10px",
            backgroundColor: theme.palette.background.paper,
            width: { xs: "90%", sm: "400px" }, // Responsive width
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
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
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label="Organization Name"
            name="organizationName"
            fullWidth
            variant="outlined"
            value={formData.organizationName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Employee Name"
            name="employeeName"
            fullWidth
            variant="outlined"
            value={formData.employeeName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email Address"
            name="emailAddress"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.emailAddress}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            fullWidth
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
          </Box>
          <Typography variant="body2" component="p" textAlign="center">
            Already have an account?{' '}
            <Link to="/" style={{ color: theme.palette.primary.main }}>
              Log In
            </Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;