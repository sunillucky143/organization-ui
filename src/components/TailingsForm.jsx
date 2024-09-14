import React, { useState } from "react";
import { useVerification } from "../context/Verification_context";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Box,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LoadingAnimation from "./LoadingAnimation";


function TailingsForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { setBackendResponse } = useVerification();
  const { backendResponse } = useVerification();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mineralContent: "",
    chemicalComposition: "",
    physicalCharacteristics: "",
    phLevel: "",
    dissolvedSolids: "",
    heavyMetals: "",
    quantity: "",
    storageMethod: "",
    dustEmissions: "",
    treatmentObjectives: [],
    technologies: [],
    location: "",
  });

  const [selectedMineral, setSelectedMineral] = useState("");
  const [customMineralContent, setCustomMineralContent] = useState(""); // New state for custom mineral content
  const [loading, setLoading] = useState(false);

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
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "mineralContent") {
      setSelectedMineral(value);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const mineralContentToSubmit = form.mineralContent === "Other" && customMineralContent
    ? customMineralContent
    : form.mineralContent;

    const formData = {
      mineralContent: mineralContentToSubmit,
      chemicalComposition: form.chemicalComposition,
      physicalCharacteristics: form.physicalCharacteristics,
      phLevel: form.phLevel,
      dissolvedSolids: form.dissolvedSolids,
      heavyMetals: form.heavyMetals,
      quantity: form.quantity,
      storageMethod: form.storageMethod,
      dustEmissions: form.dustEmissions,
      treatmentObjectives: form.treatmentObjectives,
      technologies: form.technologies,
      location: form.location
    };
    console.log(formData);
  
    fetch('http://localhost:8000/process-form/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.response.success) {
        console.log("LLM Response:", data.response);
        setBackendResponse({
          procedure: data.response.response.procedure,
          safetyProtocols: data.response.response.safetyProtocols,
          lawsAndRegulations: data.response.response.lawsAndRegulations,
        });
        setLoading(false);
        navigate('/verification')
        console.log("Backend Response Updated:", backendResponse["procedure"]);
      } else {
        console.error("Error:", data.error);
      }
    })
    .catch(error => {
      console.error("Error submitting form:", error);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        maxWidth="md"
        sx={{
          minHeight: "100vh",
          padding: "50px 0",
          backgroundColor: theme.palette.background.default,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loading ? (
          <LoadingAnimation onSuccess={() => setLoading(false)} />
        ) : (
          <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ color: '#ffffff' }}>
            Tailings Treatment
          </Typography>
        </Box>
        <Button
                variant="outlined"
                color='#ffffff'
                onClick={() => navigate(-1)} // Navigate back to the previous page
              >
                Back
              </Button>
        <Paper
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          elevation={3}
          sx={{ padding: "30px", backgroundColor: theme.palette.background.paper }}
        >
          <Grid container spacing={3}>
            {/* Mineral Content and Water Quality Data */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color:  "#000000" }}
                >
                  Mineral Content
                </Typography>
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Mineral Content</InputLabel>
                  <Select
                    name="mineralContent"
                    value={form.mineralContent}
                    onChange={handleChange}
                    label="Mineral Content"
                  >
                    <MenuItem value="" disabled>
                      Choose an option
                    </MenuItem>
                    <MenuItem value="Hematite">Hematite (Fe₂O₃)</MenuItem>
                    <MenuItem value="Magnetite">Magnetite (Fe₃O₄)</MenuItem>
                    <MenuItem value="Chalcopyrite">Chalcopyrite (CuFeS₂)</MenuItem>
                    <MenuItem value="Bornite">Bornite (Cu₅FeS₄)</MenuItem>
                    <MenuItem value="Native Gold">Native Gold (Au)</MenuItem>
                    <MenuItem value="Pyrite">Pyrite (FeS₂)</MenuItem>
                    <MenuItem value="Sphalerite">Sphalerite (ZnS)</MenuItem>
                    <MenuItem value="Galena">Galena (PbS)</MenuItem>
                    <MenuItem value="Malachite">Malachite (Cu₂CO₃(OH)₂)</MenuItem>
                    <MenuItem value="Azurite">Azurite (Cu₃(CO₃)₂(OH)₂)</MenuItem>
                    <MenuItem value="Talc">Talc (Mg₃Si₄O₁₀(OH)₂)</MenuItem>
                    <MenuItem value="Gypsum">Gypsum (CaSO₄·2H₂O)</MenuItem>
                    <MenuItem value="Fluorite">Fluorite (CaF₂)</MenuItem>
                    <MenuItem value="Orthoclase">Orthoclase (KAlSi₃O₈)</MenuItem>
                    <MenuItem value="Quartz">Quartz (SiO₂)</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Show file upload and custom input when "Other" is selected */}
                {selectedMineral === "Other" && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Upload Document
                      </Typography>
                      <input
                        type="file"
                        accept=".pdf, .doc, .docx, .xls, .xlsx"
                        onChange={handleFileUpload}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Enter Mineral Content Name"
                        name="customMineralContent"
                        fullWidth
                        variant="outlined"
                        value={customMineralContent}
                        onChange={(e) => setCustomMineralContent(e.target.value)} // Update custom mineral content state
                        sx={{ mb: 2 }}
                        helperText="Provide a name for the custom mineral content."
                      />
                    </Grid>
                  </>
                )}

                <TextField
                  label="Chemical Composition"
                  name="chemicalComposition"
                  fullWidth
                  variant="outlined"
                  value={form.chemicalComposition}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Measure levels of toxic chemicals, such as cyanide, arsenic, or mercury, used in mining."
                />
                <TextField
                  label="Physical Characteristics"
                  name="physicalCharacteristics"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={form.physicalCharacteristics}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Determine the particle size, density, and whether the tailings are solid or slurry."
                />
              </Paper>
            </Grid>

            {/* Water Quality Data */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color:  "#000000" }}
                >
                  Water Quality Data
                </Typography>

                <TextField
                  label="pH Level"
                  name="phLevel"
                  fullWidth
                  variant="outlined"
                  value={form.phLevel}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Indicate acidity or alkalinity of the tailings water."
                />

                <TextField
                  label="Dissolved Solids"
                  name="dissolvedSolids"
                  fullWidth
                  variant="outlined"
                  value={form.dissolvedSolids}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Concentration of dissolved solids, such as salts and minerals."
                />

                <TextField
                  label="Heavy Metals"
                  name="heavyMetals"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  value={form.heavyMetals}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Presence of heavy metals like lead, mercury, or cadmium."
                />
              </Paper>
            </Grid>

            {/* Additional Fields */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#000000" }}
                >
                  Tailings Storage & Environmental Concerns
                </Typography>

                <TextField
                  label="Quantity"
                  name="quantity"
                  fullWidth
                  variant="outlined"
                  value={form.quantity}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Volume or mass of tailings produced."
                />

                <TextField
                  label="Storage Method"
                  name="storageMethod"
                  fullWidth
                  variant="outlined"
                  value={form.storageMethod}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Type of storage method used (e.g., dams, ponds)."
                />

                <TextField
                  label="Dust Emissions"
                  name="dustEmissions"
                  fullWidth
                  variant="outlined"
                  value={form.dustEmissions}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Potential dust emissions from dry tailings."
                />
              </Paper>
            </Grid>

            {/* Treatment Objectives */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#000000" }}
                >
                  Treatment Objectives
                </Typography>
                <TextField
                  label="Enter Treatment Objectives (comma-separated)"
                  name="treatmentObjectives"
                  fullWidth
                  variant="outlined"
                  value={form.treatmentObjectives}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="List the objectives for treating the tailings, separated by commas."
                />
              </Paper>
            </Grid>

            {/* Available Technologies */}
            <Grid item xs={12}>
              <Paper
                elevation={2}
                sx={{
                  padding: 2,
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  backgroundColor:  "#ffffff",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color:  "#000000" }}
                >
                  Available Technologies
                </Typography>
                <TextField
                  label="Enter Available Technologies (comma-separated)"
                  name="technologies"
                  fullWidth
                  variant="outlined"
                  value={form.technologies}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="List the technologies available for treatment, separated by commas."
                />
              </Paper>
            </Grid>

            {/* Location Field */}
            <Grid item xs={12}>
              <TextField
                label="Location"
                name="location"
                fullWidth
                variant="outlined"
                value={form.location}
                onChange={handleChange}
                sx={{ mb: 2 }}
                helperText="Location where tailings are produced or treated."
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#388E3C', 
                  '&:hover': {
                    backgroundColor: '#2C6B2F', 
                  },
                }}
                fullWidth
                onClick={handleSubmit}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </Button>

            </Grid>
          </Grid>
        </Paper>
        </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default TailingsForm;