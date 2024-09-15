import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { AccountCircle as AccountCircleIcon, ThumbUp, ThumbDown, Bookmark } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';  
import MiningExample from '../assets/MiningExample.png';
import axios from 'axios';

const FeedPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoToHome = () => {
    navigate('/PublicHome');  
  };

  const handleLogout = () => {
    // remove any necessary stuff  
    navigate('/PublicLogin'); 
  };
  
  // Example feed data with text files included
  const feedItems = [
    { id: 1, type: 'image', src: MiningExample, title: 'Mining Plan for Example' },
    { id: 2, type: 'video', src: 'https://www.youtube.com/watch?v=K4TOrB7at0Y', title: 'Video Post' },
    { id: 3, type: 'document', src: '/path/to/sample-document.txt', title: 'Text Document' },
  ];

  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [saved, setSaved] = useState({});
  const [comments, setComments] = useState({}); 
  const [newComment, setNewComment] = useState({}); 
  const [commentCounts, setCommentCounts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});
  const [saveCounts, setSaveCounts] = useState({});
  const [textContent, setTextContent] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const item of feedItems) {
          if (item.type === 'document' && item.src.endsWith('.txt')) {
            // Fetch text file content
            const res = await axios.get(item.src);
            setTextContent((prev) => ({ ...prev, [item.id]: res.data }));
          } else {
            // Fetch other feed data
            const res = await axios.get(`http:///tailings-treatment.westus2.cloudapp.azure.com/feed/${item.id}/data`);
            const { likeCount, dislikeCount, saveCount, commentCount, comments } = res.data;
            setLikeCounts((prev) => ({ ...prev, [item.id]: likeCount }));
            setDislikeCounts((prev) => ({ ...prev, [item.id]: dislikeCount }));
            setSaveCounts((prev) => ({ ...prev, [item.id]: saveCount }));
            setCommentCounts((prev) => ({ ...prev, [item.id]: commentCount }));
            setComments((prev) => ({ ...prev, [item.id]: comments || [] }));
          }
        }
      } catch (error) {
        console.error('Error fetching feed data', error);
      }
    };

    fetchData();
  }, []);

  const toggleLike = async (index) => {
    try {
      await axios.post(`http:///tailings-treatment.westus2.cloudapp.azure.com/feed/${index}/like`);
      setLikes((prev) =>({ ...prev, [index]: !prev[index] }));
      setLikeCounts((prev) => ({ ...prev, [index]: prev[index] + (likes[index] ? -1 : 1) }));
    } catch (error) {
      console.error('Error liking post', error);
    }
  };

  const toggleDislike = async (index) => {
    try {
      await axios.post(`http:///tailings-treatment.westus2.cloudapp.azure.com/feed/${index}/dislike`);
      setDislikes((prev) => ({ ...prev, [index]: !prev[index] }));
      setDislikeCounts((prev) => ({ ...prev, [index]: prev[index] + (dislikes[index] ? -1 : 1) }));
    } catch (error) {
      console.error('Error disliking post', error);
    }
  };

  const toggleSave = async (index) => {
    try {
      await axios.post(`http:///tailings-treatment.westus2.cloudapp.azure.com/feed/${index}/save`);
      setSaved((prev) => ({ ...prev, [index]: !prev[index] }));
      setSaveCounts((prev) => ({ ...prev, [index]: prev[index] + (saved[index] ? -1 : 1) }));
    } catch (error) {
      console.error('Error saving post', error);
    }
  };

  const handleNewCommentChange = (index, value) => {
    setNewComment((prev) => ({ ...prev, [index]: value }));
  };

  const handleAddComment = async (index) => {
    if (!newComment[index]) return;
  
    try {
      // First, analyze the comment's risk factor
      const analysisResponse = await fetch('http://tailings-treatment.westus2.cloudapp.azure.com/api/comment/analysis/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newComment[index] }),
      });
  
      const analysisData = await analysisResponse.json();
  
      if (analysisData.response.success) {
        console.log("LLM Response:", analysisData.response);
        // Use the analysis response directly to post the comment
        const riskFactor = analysisData.response.response.risk_factor; // Extract the risk factor from the response
  
        // Only after successful analysis, post the comment to the feed
        const res = await axios.post(`http://tailings-treatment.westus2.cloudapp.azure.com/api/feed/comment/`, {
          risk_factor: riskFactor, // Use the risk factor directly
          comment: newComment[index],
        });
  
        if (res.status === 201) {
          alert("Comment forwarded to database");
          navigate('/FeedPage');
        }
  
        // Update the comments in the frontend
        setComments((prev) => ({
          ...prev,
          [index]: [...(prev[index] || []), res.data.comment],
        }));
  
        setCommentCounts((prev) => ({ ...prev, [index]: prev[index] + 1 }));
        setNewComment((prev) => ({ ...prev, [index]: '' }));
      } else {
        console.error("Error in analysis:", analysisData.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
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
        if (item.src.endsWith('.txt')) {
          return (
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body1">{textContent[item.id]}</Typography>
            </Paper>
          );
        }
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
          position: 'relative', 
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
          <MenuItem onClick={handleGoToHome}>Home</MenuItem> 
          <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
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
                    variant={likes[item.id] ? 'contained' : 'outlined'}
                    color="primary"
                    startIcon={<ThumbUp />}
                    onClick={() => toggleLike(item.id)}
                  >
                    Like ({likeCounts[item.id] || 0})
                  </Button>
                  <Button
                    variant={dislikes[item.id] ? 'contained' : 'outlined'}
                    color="secondary"
                    startIcon={<ThumbDown />}
                    onClick={() => toggleDislike(item.id)}
                  >
                    Dislike ({dislikeCounts[item.id] || 0})
                  </Button>
                  <Button
                    variant={saved[item.id] ? 'contained' : 'outlined'}
                    startIcon={<Bookmark />}
                    onClick={() => toggleSave(item.id)}
                  >
                    Save ({saveCounts[item.id] || 0})
                  </Button>
                </Box>

                {/* Comment Section */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Comments ({commentCounts[item.id] || 0})
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {comments[item.id]?.length > 0 ? (
                      comments[item.id].map((comment, commentIndex) => (
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
                    value={newComment[item.id] || ''}
                    onChange={(e) => handleNewCommentChange(item.id, e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddComment(item.id)}
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
