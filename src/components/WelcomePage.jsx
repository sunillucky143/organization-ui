import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import miningBack from '../assets/mining-back1.jpg'; // Update the path

function WelcomePage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#6200EE',
      },
      background: {
        default: '#f0f0f0',
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

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default,
          backgroundImage: `url(${miningBack})`,
        }}
      >
        <Paper
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          elevation={3}
          sx={{
            padding: '40px',
            borderRadius: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
            width: { xs: '90%', sm: '400px' },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: 'center',
              color: theme.palette.text.primary,
            }}
          >
            Welcome!
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleNavigate('/PublicLogin')}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Public Access
            </Button>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => handleNavigate('/login')}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ mt: 2 }}
            >
              Mining Access
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default WelcomePage;
