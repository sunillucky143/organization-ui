import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  Avatar,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EditProfilePage = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: 'light', // Always light mode
      primary: {
        main: '#87CEEB', // Adjust as needed for light mode
      },
      secondary: {
        main: '#1E90FF', // Red
      },
      background: {
        default: '#333333', // Light background
        paper: '#ffffff', // Paper background
      },
      text: {
        primary: '#000000', // Black text for light mode
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });
  
  const handleSave = () => {
    if (password.length === 0) {
      setPasswordError(true);
      return;
    }

    // Simulate password validation
    if (password === 'correct-password') {
      console.log('Profile updated:', { username, email });
      // Navigate to another page or show a success message
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            width: "100%",
            maxWidth: "600px",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{ position: 'absolute', top: 16, left: 25 }}>
            <IconButton onClick={() => navigate('/PublicHome')}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Avatar
            alt="Profile Picture"
            src="/path/to/profile-picture.jpg" //example pic
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Edit Profile
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              fullWidth
              error={passwordError}
              helperText={passwordError ? 'Password is required' : ''}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              fullWidth
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default EditProfilePage;
