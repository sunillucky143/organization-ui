import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import miningBack from '../assets/mining-back1.jpg'; 
import axios from 'axios';

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
        username: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
    });

    const { organizationName, username, emailAddress, password, confirmPassword } = formData;

    
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePasswords = () => {
      if (password !== confirmPassword || password === '' || confirmPassword === '') {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    };

    const onBlur = () => {
      validatePasswords();
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isButtonDisabled) {
        try {
          const res = await axios.post('http://localhost:8000/register/', {
            organizationName,
            username,
            email: emailAddress, // Ensure the naming matches with backend
            password,
            confirmPassword,
          });
          console.log(res.data);  // Handle successful response (e.g., redirect)
          navigate('/login');  // Redirect to login page or another page after submission
        } catch (error) {
          console.error(error.response?.data || error.message);
        }
      }
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
          backgroundImage: `url(${miningBack})`, // Gradient background
          backgroundSize: "cover",
          backgroundPosition: "center",
          backdropFilter: "blur(10px)",
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
              color: "black",
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
            name="username"
            fullWidth
            variant="outlined"
            value={formData.username}
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
            onBlur={onBlur}
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
            onBlur={onBlur}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            fullWidth
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
          {password !== confirmPassword && <p color='red'>Passwords do not match!</p>}
          </Box>
          <Typography variant="body2" component="p" textAlign="center">
            Already have an account?{' '}
            <Link to="/" style={{ color: "black" }}>
              Log In
            </Link>
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;