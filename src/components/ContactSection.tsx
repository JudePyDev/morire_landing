"use client";

import { useState, useCallback, memo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialFormState: ContactInfo = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

// Add proper typing for the ContactInfoCard props
interface ContactInfoCardProps {
  icon: React.ElementType;
  title: string;
  content: string;
  link: string;
}

// Memoized contact info component for better performance
const ContactInfoCard = memo(
  ({ icon: Icon, title, content, link }: ContactInfoCardProps) => (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ willChange: "transform" }}
    >
      <Box
        component={motion.a}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ x: 10 }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          textDecoration: "none",
          color: "white",
          p: { xs: 1.5, md: 2 },
          borderRadius: "15px",
          background: "rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          willChange: "transform",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.15)",
          },
        }}
      >
        <Icon sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }} />
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: { xs: "0.8rem", md: "0.9rem" },
            }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  )
);

ContactInfoCard.displayName = "ContactInfoCard";

// Memoized form field component for better performance
const FormField = memo(
  ({
    label,
    name,
    value,
    onChange,
    required = false,
    multiline = false,
    type = "text",
    rows = undefined,
  }: {
    label: string;
    name: string;
    value: string;
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    required?: boolean;
    multiline?: boolean;
    type?: string;
    rows?: number;
  }) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      multiline={multiline}
      rows={rows}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255, 255, 255, 0.7)",
        },
      }}
    />
  )
);

FormField.displayName = "FormField";

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactInfo>(initialFormState);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    layoutEffect: false, // Optimize scroll handling
  });

  const opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 1], {
    clamp: true, // Optimize transform calculations
  });

  const y = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [100, 0, 0], {
    clamp: true, // Optimize transform calculations
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSnackbar({
        open: true,
        message: "Thank you for your interest! We'll contact you soon.",
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
  }, []);

  const handleSnackbarClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const contactInfo = [
    {
      icon: EmailIcon,
      title: "Email",
      content: "info@morire.com",
      link: "mailto:correspondentilr@ishihomes.com.ng",
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      content: "+234 704 700 0569",
      link: "tel:+2347047000569",
    },
    {
      icon: LocationOnIcon,
      title: "Contact Us",
      content: "123 Offa Road, Kwara",
      link: "#contact",
    },
  ];

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 6, md: 12 },
        background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
        position: "relative",
        overflow: "hidden",
        color: "white",
        willChange: "transform",
      }}
    >
      {/* Optimized Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background:
            "radial-gradient(circle at 50% 50%, white 1px, transparent 1px)",
          backgroundSize: { xs: "20px 20px", md: "40px 40px" },
          transform: "translateZ(0)", // Hardware acceleration
          willChange: "transform",
          "@keyframes moveBackground": {
            "0%": { transform: "translateY(0)" },
            "100%": { transform: "translateY(40px)" },
          },
          animation: "moveBackground 20s linear infinite",
        }}
      />

      <Container maxWidth="xl">
        <motion.div style={{ opacity, y, willChange: "transform" }}>
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ willChange: "transform" }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "24px",
                    p: { xs: 3, md: 4 },
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      mb: 3,
                      fontFamily: "var(--font-cormorant)",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                  >
                    Get in Touch
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ willChange: "transform" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size="large"
                      disabled={isSubmitting}
                      endIcon={
                        <motion.div
                          animate={isSubmitting ? { rotate: 360 } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          style={{ willChange: "transform" }}
                        >
                          <SendIcon />
                        </motion.div>
                      }
                      sx={{
                        mt: 3,
                        py: { xs: 1.5, md: 2 },
                        borderRadius: "15px",
                        textTransform: "none",
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        fontWeight: 500,
                        background:
                          "linear-gradient(45deg, #2D6A4F 30%, #40916C 90%)",
                        boxShadow: "none",
                        "&:hover": {
                          boxShadow: "0 6px 20px rgba(45, 106, 79, 0.4)",
                        },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box sx={{ pl: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ willChange: "transform" }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      mb: { xs: 2, md: 4 },
                      fontSize: { xs: "1.75rem", md: "2.5rem" },
                      fontFamily: '"Playfair Display", serif',
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    Let's Connect
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: { xs: 4, md: 6 },
                      opacity: 0.8,
                      fontSize: { xs: "1rem", md: "1.1rem" },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    Ready to find your dream home? Reach out to us and let's
                    make it happen.
                  </Typography>
                </motion.div>

                <Grid container spacing={2}>
                  {contactInfo.map((info, index) => (
                    <Grid item xs={12} key={index}>
                      <ContactInfoCard {...info} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
