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

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactInfo>(initialFormState);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [100, 0, 0]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSnackbar({
      open: true,
      message: "Thank you for your interest! We'll contact you soon.",
      severity: "success",
    });
    setFormData(initialFormState);
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: EmailIcon,
      title: "Email",
      content: "info@morire.com",
      link: "mailto:info@morire.com",
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
      sx={{
        py: { xs: 6, md: 12 },
        background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Animated Background Pattern */}
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
          animation: "moveBackground 20s linear infinite",
          "@keyframes moveBackground": {
            "0%": { transform: "translateY(0)" },
            "100%": { transform: "translateY(40px)" },
          },
        }}
      />

      <Container maxWidth="xl">
        <motion.div style={{ opacity, y }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            {/* Contact Information - Moved to top on mobile */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box sx={{ pl: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
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
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Box
                          component={motion.a}
                          href={info.link}
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
                            "&:hover": {
                              background: "rgba(255, 255, 255, 0.15)",
                            },
                          }}
                        >
                          <info.icon
                            sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                                fontSize: { xs: "0.9rem", md: "1rem" },
                              }}
                            >
                              {info.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                opacity: 0.8,
                                fontSize: { xs: "0.8rem", md: "0.9rem" },
                              }}
                            >
                              {info.content}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: { xs: "20px", md: "30px" },
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
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
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
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
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
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
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          multiline
                          rows={4}
                          variant="outlined"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "15px",
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
                      </Grid>
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
                                animate={isSubmitting ? { rotate: 360 } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <SendIcon />
                              </motion.div>
                            }
                            sx={{
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
                      </Grid>
                    </Grid>
                  </form>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          bottom: { xs: 16, sm: 24 },
        }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            maxWidth: { xs: "90vw", sm: "auto" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactSection;
