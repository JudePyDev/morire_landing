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
  IconButton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredUnit: string;
  message: string;
}

const initialFormState: RegisterFormData = {
  fullName: "",
  email: "",
  phone: "",
  preferredUnit: "",
  message: "",
};

const unitTypes = [
  "2 Bedroom Apartment",
  "3 Bedroom Apartment",
  "3 Bedroom Apartment with BQ",
];

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });
  const router = useRouter();

  const formFields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      gridSize: 12,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      gridSize: 6,
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
      gridSize: 6,
    },
    {
      name: "preferredUnit",
      label: "Preferred Unit Type",
      type: "select",
      gridSize: 12,
      options: unitTypes,
    },
    {
      name: "message",
      label: "Additional Information",
      type: "multiline",
      gridSize: 12,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredUnit
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      setIsSubmitting(false);
      return;
    }

    console.log("Form submission started with data:", formData);

    try {
      // Send to Supabase
      const { error } = await supabase.from("registrations").insert([
        {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferred_unit: formData.preferredUnit,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // Send email notification using EmailJS
      try {
        console.log("Sending email with data:", {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          unit: formData.preferredUnit,
          message: formData.message,
        });

        const emailResult = await emailjs.send(
          "service_qh303g7",
          "template_3suvrq8",
          {
            to_name: "Admin",
            name: formData.fullName,
            from_email: formData.email,
            phone: formData.phone,
            unit: formData.preferredUnit,
            message: formData.message,
            user_name: formData.fullName,
            preferred_unit: formData.preferredUnit,
          },
          "5R7m9Lt_-i-F0LzsR"
        );

        console.log("EmailJS Response:", emailResult);
      } catch (emailError) {
        console.error(
          "Failed to send email notification. Full error:",
          emailError
        );
        setSnackbar({
          open: true,
          message: "Registration saved but email notification failed.",
          severity: "warning",
        });
      }

      router.push("/thank-you");
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: "Something went wrong. Please try again.",
        severity: "error",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        background: "linear-gradient(135deg, #F8FAF9 0%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              borderRadius: "50%",
              background: "rgba(27, 67, 50, 0.1)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </Box>

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
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "3px",
                background: "primary.main",
                borderRadius: "2px",
              },
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
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: "rgba(27, 67, 50, 0.1)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(27, 67, 50, 0.08)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {formFields.map((field) => (
                  <Grid item xs={12} sm={field.gridSize} key={field.name}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <Box>
                        {field.type === "select" ? (
                          <TextField
                            fullWidth
                            select
                            label={field.label}
                            name={field.name}
                            value={
                              formData[field.name as keyof RegisterFormData]
                            }
                            onChange={handleChange}
                            required
                            variant="outlined"
                            onFocus={() => setActiveField(field.name)}
                            onBlur={() => setActiveField(null)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                              },
                            }}
                          >
                            {field.options?.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        ) : field.type === "multiline" ? (
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label={field.label}
                            name={field.name}
                            value={
                              formData[field.name as keyof RegisterFormData]
                            }
                            onChange={handleChange}
                            variant="outlined"
                            placeholder="Tell us more about your requirements or any questions you have..."
                            onFocus={() => setActiveField(field.name)}
                            onBlur={() => setActiveField(null)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                              },
                            }}
                          />
                        ) : (
                          <TextField
                            fullWidth
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            value={
                              formData[field.name as keyof RegisterFormData]
                            }
                            onChange={handleChange}
                            required
                            variant="outlined"
                            onFocus={() => setActiveField(field.name)}
                            onBlur={() => setActiveField(null)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "12px",
                              },
                            }}
                          />
                        )}
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      endIcon={
                        <motion.div
                          animate={
                            isSubmitting
                              ? { rotate: 360 }
                              : { rotate: 0, scale: [1, 1.2, 1] }
                          }
                          transition={
                            isSubmitting
                              ? { duration: 1, repeat: Infinity }
                              : { duration: 0.5, repeat: Infinity }
                          }
                        >
                          <SendIcon />
                        </motion.div>
                      }
                      sx={{
                        py: { xs: 1.5, md: 2 },
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        borderRadius: "12px",
                        background:
                          "linear-gradient(45deg, #1B4332 30%, #2D6A4F 90%)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                          transform: "translateX(-100%)",
                        },
                        "&:hover": {
                          boxShadow: "0 6px 20px rgba(27, 67, 50, 0.4)",
                          "&::before": {
                            transform: "translateX(100%)",
                            transition: "transform 0.8s ease",
                          },
                        },
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Register Interest"}
                    </Button>
                  </motion.div>
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
            sx={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(27, 67, 50, 0.1)",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
