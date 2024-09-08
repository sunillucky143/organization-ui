import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import miningBack from '../assets/mining-back.jpeg'; // Update the path

function LoginPage() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log("Login data:", loginData);
  };

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
            Welcome Back!
          </Typography>

          <Box sx={{ mb: 3 }}>
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              variant="outlined"
              value={loginData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    📧
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              value={loginData.password}
              onChange={handleChange}
              sx={{ mb: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    🔑
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: "right", mb: 3 }}>
              <Link href="/forget-password" underline="hover" color="primary">
                Forgot Password?
              </Link>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </Button>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              Don't have an account?{" "}
              <Link href="/sign-up" underline="hover" color="primary">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
