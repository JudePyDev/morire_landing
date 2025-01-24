"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredUnit: string;
  budget: string;
  timeframe: string;
  message: string;
}

const initialFormState: RegisterFormData = {
  fullName: "",
  email: "",
  phone: "",
  preferredUnit: "",
  budget: "",
  timeframe: "",
  message: "",
};

const budgetRanges = [
  "₦40M - ₦50M",
  "₦50M - ₦60M",
  "₦60M - ₦70M",
  "₦70M - ₦80M",
  "Above ₦80M",
];

const timeframes = [
  "Immediately",
  "Within 3 months",
  "3-6 months",
  "6-12 months",
  "More than 12 months",
];

const unitTypes = ["Premium Villa", "Family Terrace", "Executive Suite"];

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSnackbar({
        open: true,
        message:
          "Thank you for registering your interest! We'll be in touch soon.",
        severity: "success",
      });
      setFormData(initialFormState);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        background: "linear-gradient(135deg, #F8FAF9 0%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{
                mb: 4,
                color: "primary.main",
                "&:hover": {
                  background: "rgba(27, 67, 50, 0.08)",
                },
              }}
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontFamily: "var(--font-cormorant)",
              color: "primary.main",
              mb: 2,
              textAlign: "center",
            }}
          >
            Register Your Interest
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              mb: 6,
              textAlign: "center",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            Take the first step towards your dream home. Fill out the form below
            and our team will be in touch shortly.
          </Typography>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card
            elevation={0}
            sx={{
              maxWidth: "800px",
              mx: "auto",
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Preferred Unit Type"
                    name="preferredUnit"
                    value={formData.preferredUnit}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  >
                    {unitTypes.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Budget Range"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  >
                    {budgetRanges.map((range) => (
                      <MenuItem key={range} value={range}>
                        {range}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Preferred Timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  >
                    {timeframes.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Information"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Tell us more about your requirements or any questions you have..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={isSubmitting}
                    sx={{
                      py: { xs: 1.5, md: 2 },
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      borderRadius: "12px",
                      background:
                        "linear-gradient(45deg, #1B4332 30%, #2D6A4F 90%)",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(27, 67, 50, 0.4)",
                      },
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Register Interest"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </motion.div>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
