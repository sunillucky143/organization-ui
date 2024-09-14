import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Button,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { AccountCircle as AccountCircleIcon, ThumbUp, ThumbDown, Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  

const FeedPage = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();  

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoToHome = () => {
    navigate('/PublicHome');  
  };

  // Example feed data: multiple file types
  const feedItems = [
    { type: 'image', src: '/src/assets/MiningExample.png', title: 'Mining Plan for ******' },
    { type: 'video', src: 'https://www.youtube.com/watch?v=K4TOrB7at0Y', title: 'Video Post' },
    { type: 'document', src: '/path/to/sample-document.pdf', title: 'PDF Document' },
  ];

  
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [saved, setSaved] = useState({});
  const [comments, setComments] = useState({}); 
  const [newComment, setNewComment] = useState({}); 

  const toggleLike = (index) => {
    setLikes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleDislike = (index) => {
    setDislikes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleSave = (index) => {
    setSaved((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleNewCommentChange = (index, value) => {
    setNewComment((prev) => ({ ...prev, [index]: value }));
  };

  const handleAddComment = (index) => {
    if (!newComment[index]) return;
    setComments((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), newComment[index]],
    }));
    setNewComment((prev) => ({ ...prev, [index]: '' }));
  };

  const renderFeedItem = (item) => {
    switch (item.type) {
      case 'image':
        return <img src={item.src} alt={item.title} style={{ width: '100%' }} />;
      case 'video':
        return (
          <video controls style={{ width: '100%' }}>
            <source src={item.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      case 'document':
        return (
          <a href={item.src} target="_blank" rel="noopener noreferrer">
            <Paper sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="body1">{item.title}</Typography>
            </Paper>
          </a>
        );
      default:
        return null;
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
          position: 'relative', // This ensures the icon stays in the corner
        }}
      >
        {/* Profile Icon Button */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}
          onClick={handleMenuOpen}
        >
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>

        {/* Menu for Profile and Logout */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleGoToHome}>Home</MenuItem> {/* Updated to use navigate */}
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        <Paper
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          elevation={3}
          sx={{
            padding: "40px",
            borderRadius: "10px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
            width: "100%", // Responsive width
            maxWidth: "800px", // Max width for larger screens
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
            Feed
          </Typography>

          <Box>
            {feedItems.map((item, index) => (
              <Paper key={index} sx={{ padding: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                {renderFeedItem(item)}

                {/* Action buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                  <Button
                    variant={likes[index] ? 'contained' : 'outlined'}
                    color="primary"
                    startIcon={<ThumbUp />}
                    onClick={() => toggleLike(index)}
                  >
                    Like
                  </Button>
                  <Button
                    variant={dislikes[index] ? 'contained' : 'outlined'}
                    color="secondary"
                    startIcon={<ThumbDown />}
                    onClick={() => toggleDislike(index)}
                  >
                    Dislike
                  </Button>
                  <Button
                    variant={saved[index] ? 'contained' : 'outlined'}
                    startIcon={<Bookmark />}
                    onClick={() => toggleSave(index)}
                  >
                    Save
                  </Button>
                </Box>

                {/* Comment Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Comments
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {comments[index]?.length > 0 ? (
                      comments[index].map((comment, commentIndex) => (
                        <Paper key={commentIndex} sx={{ padding: 1, mb: 1 }}>
                          <Typography variant="body2">{comment}</Typography>
                        </Paper>
                      ))
                    ) : (
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        No comments yet.
                      </Typography>
                    )}
                  </Box>
                  <TextField
                    label="Add a comment"
                    variant="outlined"
                    fullWidth
                    value={newComment[index] || ''}
                    onChange={(e) => handleNewCommentChange(index, e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddComment(index)}
                  >
                    Post Comment
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default FeedPage;
