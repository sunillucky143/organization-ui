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
import { ThemeProvider, createTheme } from '@mui/material/styles';

function TailingsForm() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
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

  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: prefersDarkMode ? '#BB86FC' : '#6200EE',
      },
      background: {
        default: prefersDarkMode ? '#121212' : '#f9f9f9',
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
    console.log("Form submitted:", form);
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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
          {/* Your form content here */}
          {/* Move the entire form logic here from App.js */}
          <Grid container spacing={3}>
            {/* Mineral Content and Water Quality Data */}
            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ padding: 2, border: '1px solid', borderColor: theme.palette.divider, backgroundColor: prefersDarkMode ? '#444444' : '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: prefersDarkMode ? '#ffffff' : '#000000' }}>
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
                {selectedMineral === "Other" && (
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

            <Grid item xs={12} sm={6}>
              <Paper elevation={2} sx={{ padding: 2, border: '1px solid', borderColor: theme.palette.divider, backgroundColor: prefersDarkMode ? '#444444' : '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: prefersDarkMode ? '#ffffff' : '#000000' }}>
                  Water Quality Data
                </Typography>
                <TextField
                  label="pH Levels"
                  name="phLevel"
                  fullWidth
                  type="number"
                  variant="outlined"
                  value={form.phLevel}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Check the acidity or alkalinity of water in the tailings."
                />
                <TextField
                  label="Dissolved Solids"
                  name="dissolvedSolids"
                  fullWidth
                  variant="outlined"
                  value={form.dissolvedSolids}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Analyze the concentration of salts and other dissolved materials."
                />
                <TextField
                  label="Heavy Metals Concentration"
                  name="heavyMetals"
                  fullWidth
                  variant="outlined"
                  value={form.heavyMetals}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Measure levels of heavy metals like lead, cadmium, and zinc."
                />
              </Paper>
            </Grid>

            {/* Volume and Storage */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ padding: 2, border: '1px solid', borderColor: theme.palette.divider, backgroundColor: prefersDarkMode ? '#444444' : '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ color: prefersDarkMode ? '#ffffff' : '#000000' }}>
                  Volume and Storage
                </Typography>
                <TextField
                  label="Quantity of Tailings"
                  name="quantity"
                  fullWidth
                  variant="outlined"
                  value={form.quantity}
                  onChange={handleChange}
                  helperText="Measure the volume of tailings for disposal or treatment."
                />
                <TextField
                  label="Current Storage Method"
                  name="storageMethod"
                  fullWidth
                  variant="outlined"
                  value={form.storageMethod}
                  onChange={handleChange}
                  helperText="Identify how the tailings are stored (tailing ponds, dry stacking, etc.)."
                />
                <TextField
                  label="Potential for Dust Emissions"
                  name="dustEmissions"
                  fullWidth
                  variant="outlined"
                  value={form.dustEmissions}
                  onChange={handleChange}
                  helperText="Assess the risk of dust dispersal from dry tailings."
                />
              </Paper>
            </Grid>

            {/* Treatment Objectives */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ padding: 2, border: '1px solid', borderColor: theme.palette.divider, backgroundColor: prefersDarkMode ? '#444444' : '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: prefersDarkMode ? '#ffffff' : '#000000' }}>
                  Treatment Objectives
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("reduce-toxicity")}
                        onChange={handleCheckboxChange}
                        value="reduce-toxicity"
                        name="treatmentObjectives"
                      />
                    }
                    label="Reduce Toxicity"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("stabilize-hazardous")}
                        onChange={handleCheckboxChange}
                        value="stabilize-hazardous"
                        name="treatmentObjectives"
                      />
                    }
                    label="Stabilize Hazardous Materials"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.treatmentObjectives.includes("recover-materials")}
                        onChange={handleCheckboxChange}
                        value="recover-materials"
                        name="treatmentObjectives"
                      />
                    }
                    label="Recover Valuable Materials"
                  />
                </FormGroup>
              </Paper>
            </Grid>

            {/* Available Technology for Treatment */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ padding: 2, border: '1px solid', borderColor: theme.palette.divider, backgroundColor: prefersDarkMode ? '#444444' : '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: prefersDarkMode ? '#ffffff' : '#000000' }}>
                  Available Technology for Treatment
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("neutralization")}
                        onChange={handleCheckboxChange}
                        value="neutralization"
                        name="technologies"
                      />
                    }
                    label="Neutralization"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("filtration")}
                        onChange={handleCheckboxChange}
                        value="filtration"
                        name="technologies"
                      />
                    }
                    label="Filtration"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("bioremediation")}
                        onChange={handleCheckboxChange}
                        value="bioremediation"
                        name="technologies"
                      />
                    }
                    label="Bioremediation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("encapsulation")}
                        onChange={handleCheckboxChange}
                        value="encapsulation"
                        name="technologies"
                      />
                    }
                    label="Encapsulation"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.technologies.includes("tailings-reprocessing")}
                        onChange={handleCheckboxChange}
                        value="tailings-reprocessing"
                        name="technologies"
                      />
                    }
                    label="Tailings Reprocessing"
                  />
                </FormGroup>
              </Paper>
            </Grid>

            {/* Location Input */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ padding: 2, border: '1px solid', borderColor: theme.palette.divider, backgroundColor: prefersDarkMode ? '#444444' : '#ffffff', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, color: prefersDarkMode ? '#ffffff' : '#000000' }}>
                  Location
                </Typography>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  variant="outlined"
                  value={form.location}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  helperText="Enter the location where the tailings are being treated."
                />
              </Paper>
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