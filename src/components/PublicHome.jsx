import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  

const UserHomePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: 'light', 
      primary: {
        main: '#87CEEB', 
      },
      secondary: {
        main: '#1E90FF', 
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoToFeed = () => {
    navigate('/FeedPage');  
  };
  const handleViewProfile = () => {
    navigate('/EditProfile'); 
  };
  const handleLogout = () => {
  // remove any necessary stuff  
    navigate('/PublicLogin'); 
  };
  const handleLiked = () => {
    navigate('/LikedPostsPage');
  };
  const handleDisliked = () => {
    navigate('/DislikedPostsPage');
  };
  const handleNavigateToSavedPosts = () => {
    navigate('/SavedPostsPage');
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
          flexDirection: "center",
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
            Dashboard
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Welcome to your dashboard! Here you can access various features and manage your account.
          </Typography>

          <IconButton
            onClick={handleMenuClick}
            sx={{ mb: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); handleLiked(); }}>
              Liked Posts
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); handleNavigateToSavedPosts(); }}>
              Saved Posts
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); handleDisliked(); }}>
              Disliked Posts
            </MenuItem>
          </Menu>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleViewProfile}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Account Details
            </Button>

            {/* New Button to Navigate to Feed */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGoToFeed}  
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             Feed Page
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogout}
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log Out
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UserHomePage;
