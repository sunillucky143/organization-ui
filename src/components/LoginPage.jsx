import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import AuthContext
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import miningBack from '../assets/mining-back1.jpg'; // Update the path

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // For handling errors
  const { login } = useAuth();  // Get login and authentication status from AuthContext
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: 'light', 
      primary: {
        main: '#87CEEB',
      },
      secondary: {
        main: '#FF0000', 
      },
      background: {
        default: '#87CEEB', 
        paper: '#ffffff', 
      },
      text: {
        primary: '#000000',
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

  const handleLogin = async () => {
    const errorResponse = await login(loginData.email, loginData.password);  // Use the login function from AuthContext

    if (!errorResponse) {
      navigate('/dashboard');  // Redirect to dashboard if login is successful
    } else {
      if (typeof errorResponse === "object") {
        // If the error is an object, try to extract a message
        setError(errorResponse.message || JSON.stringify(errorResponse));
      } else {
        setError(errorResponse);  // If it's a string, set it directly
      }
    }
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
          backgroundImage: `url(${miningBack})`,
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
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            width: { xs: "90%", sm: "400px" },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
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
            Welcome Back!
          </Typography>

          {/* Render error message */}
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2, textAlign: "center" }}>
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </Typography>
          )}

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
              <Link href="/forget-password" underline="hover" color="black">
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
              <Link href="/sign-up" underline="hover" color="black">
                Sign Up
              </Link>
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              <Link href="/WelcomePage" underline="hover" color="black">
                Back
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
