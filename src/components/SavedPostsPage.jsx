import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const navigate = useNavigate(); 

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#4CAF50',
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

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/posts/saved');
        setSavedPosts(res.data);
      } catch (error) {
        console.error('Error fetching saved posts', error);
      }
    };

    fetchSavedPosts();
  }, []);

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
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Saved Posts
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/PublicHome')}
            sx={{ mb: 3 }}
          >
            Back
          </Button>
          <Box>
            {savedPosts.map((post) => (
              <Paper key={post.id} sx={{ padding: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {post.title}
                </Typography>
                <img src={post.src} alt={post.title} style={{ width: '100%' }} />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Bookmark />}
            
                >
                  Saved
                </Button>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default SavedPostsPage;

  