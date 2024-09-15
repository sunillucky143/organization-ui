import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Announcements-styling.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Announcements = ({ setAnnouncementCount }) => {
  const [comments, setComments] = useState([]);
  const [expandedCommentId, setExpandedCommentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://tailings-treatment.westus2.cloudapp.azure.com/api/feed/comment/');
        const responseData = response.data;

        // Convert the response data into an array of comments if needed
        const commentsArray = Array.isArray(responseData) ? responseData : Object.values(responseData);

        // Sort comments
        const sortedComments = sortCommentsByRisk(commentsArray);
        setComments(sortedComments);

        // Update announcement count
        setAnnouncementCount(sortedComments.length);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [setAnnouncementCount]);

  const sortCommentsByRisk = (comments) => {
    const riskOrder = {
      High: 1,
      Moderate: 2,
      Low: 3
    };

    return comments.sort((a, b) => riskOrder[a.risk_factor] - riskOrder[b.risk_factor]);
  };

  const toggleExpand = (id) => {
    setExpandedCommentId(expandedCommentId === id ? null : id);
  };

  const getBorderColor = (riskFactor) => {
    switch (riskFactor) {
      case 'High':
        return 'red';
      case 'Moderate':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <div className="announcements-container">
      <Button variant="outlined" color="solid black" onClick={() => navigate(-1)} sx={{ marginBottom: '1rem' }}>
          Back
      </Button>
      <h1>Community Announcements</h1>
      <div className="comments-list">
        {comments.map((comment) => (
          <div
            key={comment.post_id}
            className={`comment-item ${expandedCommentId === comment.post_id ? 'expanded' : ''}`}
            style={{ borderColor: getBorderColor(comment.risk_factor) }}
            onClick={() => toggleExpand(comment.post_id)}
          >
            <p className="comment-risk">{comment.risk_factor} Risk</p>
            <p className="comment-description">
              {expandedCommentId === comment.post_id
                ? comment.comment || 'No description available'
                : (comment.comment && comment.comment.length > 50 ? comment.comment.substring(0, 50) + '...' : comment.comment)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
