import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, Typography, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for back button functionality

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
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    fetchDocumentsFromBackend();
  }, []);

  const fetchDocumentsFromBackend = async () => {
    try {
      const response = await fetch("/api/documents"); // Replace with your backend endpoint
      const data = await response.json();
      setDocuments(data); // Assuming the backend returns an array of documents
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleDownloadDocument = (documentContent, documentName) => {
    const blob = new Blob([documentContent], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentName}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: theme.palette.background.default, padding: '2rem', borderRadius: '8px' }}>
        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)} sx={{ marginBottom: '1rem' }}>
          Back
        </Button>

        <Typography variant="h4" color="textPrimary" gutterBottom>
          Available Documents
        </Typography>

        <List>
          {documents.map((doc, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <>
                    <Typography variant="body1" color="textPrimary">
                      Document: {doc.name}
                    </Typography>
                    {doc.posted && (
                      <Chip
                        label="Posted"
                        color="primary"
                        sx={{ marginLeft: '1rem' }}
                      />
                    )}
                  </>
                }
                secondary={`Content: ${doc.content}`}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDownloadDocument(doc.content, doc.name)}
              >
                Download
              </Button>
            </ListItem>
          ))}
        </List>

        {documents.length === 0 && (
          <Typography variant="body1" color="textPrimary">
            No documents available.
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Documents;
