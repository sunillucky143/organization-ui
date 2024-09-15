import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Documents-styling.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#87CEEB', // Light baby blue
    },
    secondary: {
      main: '#1E90FF', // Dodger blue
    },
    background: {
      default: '#87CEEB', // Background color
      paper: '#ffffff',  // Paper color
    },
    text: {
      primary: '#000000', // Text color
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [expandedDocumentId, setExpandedDocumentId] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://tailings-treatment.westus2.cloudapp.azure.com/api/post/');
        const responseData = response.data;
        console.log(responseData);

        const documentsArray = Array.isArray(responseData) ? responseData : Object.values(responseData);
        setDocuments(documentsArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocuments();
  }, []);

  const toggleExpand = (id) => {
    setExpandedDocumentId(expandedDocumentId === id ? null : id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: theme.palette.background.default, padding: '2rem', borderRadius: '8px' }}>
        <Button variant="outlined" color="solid black" onClick={() => navigate(-1)} sx={{ marginBottom: '1rem' }}>
          Back
        </Button>

        <Typography variant="h4" color="textPrimary" textAlign="center" gutterBottom>
          Available Documents
        </Typography>
        </Container>
       <div className="document-list">
        {documents.map((doc) => (
          <div
            key={doc.post_id}
            className={`document-item ${expandedDocumentId === doc.post_id ? 'expanded' : ''}`}
            style={{ borderColor: "#87CEEB", boxShadow: "0px 4px 12px 2px rgba(128, 128, 128, 0.5)"}}
            onClick={() => toggleExpand(doc.post_id)}
          >
            <p className="document-description">
              {expandedDocumentId === doc.post_id
                ? doc.procedure || 'No description available'
                : (doc.procedure && doc.procedure.length > 50 ? doc.procedure.substring(0, 50) + '...' : doc.procedure)}
            </p>
          </div>
        ))}
       </div>
    </ThemeProvider>
  );
};

export default Documents;
