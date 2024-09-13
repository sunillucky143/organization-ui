import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';

// Define keyframes for text transitions
const fadeInOut = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

// Define keyframes for spinner rotation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingAnimation = ({ onSuccess }) => {
  const theme = useTheme();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textChangeInterval, setTextChangeInterval] = useState(null);
  const texts = ['Loading.....', 'Processing....', 'Loading.....Generating....'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1);
    setTextChangeInterval(interval);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    if (onSuccess) {
      if (textChangeInterval) {
        clearInterval(textChangeInterval);
      }
      setCurrentTextIndex(texts.length - 1); // Show last text until success
    }
  }, [onSuccess, textChangeInterval]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        textAlign: 'center',
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          animation: `${spin} 1s linear infinite`,
          mb: 2,
          color: theme.palette.primary.main,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          color: theme.palette.text.primary,
          animation: `${fadeInOut} 7s ease-in-out infinite`,
        }}
      >
        {texts[currentTextIndex]}
      </Typography>
    </Box>
  );
};

export default LoadingAnimation;
