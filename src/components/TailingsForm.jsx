import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Box,
  useMediaQuery,
  FormGroup,
} from "@mui/material";
import { motion } from "framer-motion";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function TailingsForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

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

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: prefersDarkMode ? "#BB86FC" : "#6200EE",
      },
      background: {
        default: prefersDarkMode ? "#121212" : "#f9f9f9",
        paper: prefersDarkMode ? "#1f1f1f" : "#ffffff",
      },
      text: {
        primary: prefersDarkMode ? "#ffffff" : "#000000",
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
        if (data.success) {
          console.log("LLM Response:", data.response);
          // Handle success: Display response or take action
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch(error => {
        console.error("Error submitting form:", error);
      });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    setForm((prevForm) => {
      const updatedArray = checked
        ? [...prevForm[name], value]
        : prevForm[name].filter((item) => item !== value);
      return { ...prevForm, [name]: updatedArray };
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
            Tailings Treatment
          </Typography>
        </Box>

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
                  backgroundColor: prefersDarkMode ? "#444444" : "#ffffff",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: prefersDarkMode ? "#ffffff" : "#000000" }}
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
                  backgroundColor: prefersDarkMode ? "#444444" : "#ffffff",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: prefersDarkMode ? "#ffffff" : "#000000" }}
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
                  backgroundColor: prefersDarkMode ? "#444444" : "#ffffff",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: prefersDarkMode ? "#ffffff" : "#000000" }}
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
                  backgroundColor: prefersDarkMode ? "#444444" : "#ffffff",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: prefersDarkMode ? "#ffffff" : "#000000" }}
                >
                  Treatment Objectives
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("Neutralization")}
                        onChange={handleCheckboxChange}
                        name="treatmentObjectives"
                        value="Neutralization"
                      />
                    }
                    label="Neutralization (pH adjustment)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("Precipitation")}
                        onChange={handleCheckboxChange}
                        name="treatmentObjectives"
                        value="Precipitation"
                      />
                    }
                    label="Precipitation (metal recovery)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("Filtration")}
                        onChange={handleCheckboxChange}
                        name="treatmentObjectives"
                        value="Filtration"
                      />
                    }
                    label="Filtration (solid-liquid separation)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("Stabilization")}
                        onChange={handleCheckboxChange}
                        name="treatmentObjectives"
                        value="Stabilization"
                      />
                    }
                    label="Stabilization (long-term containment)"
                  />
                </FormGroup>
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
                  backgroundColor: prefersDarkMode ? "#444444" : "#ffffff",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: prefersDarkMode ? "#ffffff" : "#000000" }}
                >
                  Available Technologies
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("Bioremediation")}
                        onChange={handleCheckboxChange}
                        name="technologies"
                        value="Bioremediation"
                      />
                    }
                    label="Bioremediation (use of microorganisms)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("Chemical Treatment")}
                        onChange={handleCheckboxChange}
                        name="technologies"
                        value="Chemical Treatment"
                      />
                    }
                    label="Chemical Treatment (neutralization, precipitation)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("Physical Separation")}
                        onChange={handleCheckboxChange}
                        name="technologies"
                        value="Physical Separation"
                      />
                    }
                    label="Physical Separation (e.g., filtration, centrifugation)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("Recycling")}
                        onChange={handleCheckboxChange}
                        name="technologies"
                        value="Recycling"
                      />
                    }
                    label="Recycling (reuse of treated tailings)"
                  />
                </FormGroup>
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
                color="primary"
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
      </Container>
    </ThemeProvider>
  );
}

export default TailingsForm;
