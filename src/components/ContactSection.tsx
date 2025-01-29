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

// Memoized contact info component for better performance
const ContactInfoCard = memo(({ icon: Icon, title, content, link }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <Card
      sx={{
        p: 3,
        height: "100%",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        transition: "all 0.3s ease",
        willChange: "transform",
        "&:hover": {
          transform: "translateY(-5px)",
          background: "rgba(255, 255, 255, 0.15)",
        },
      }}
    >
      <Box
        component="a"
        href={link}
        sx={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Icon sx={{ fontSize: "2rem", mr: 2, opacity: 0.9 }} />
        <Box>
          <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {content}
          </Typography>
        </Box>
      </Box>
    </Card>
  </motion.div>
));

ContactInfoCard.displayName = "ContactInfoCard";

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
        <motion.div style={{ opacity, y }}>
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
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
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    endIcon={<SendIcon />}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      px: 4,
                      borderRadius: "12px",
                      background: "white",
                      color: "primary.main",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box sx={{ pl: { md: 4 } }}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      mb: { xs: 3, md: 4 },
                      fontFamily: "var(--font-cormorant)",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    Contact Information
                  </Typography>
                </motion.div>

                <Grid container spacing={3}>
                  {contactInfo.map((info, index) => (
                    <Grid item xs={12} key={info.title}>
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
