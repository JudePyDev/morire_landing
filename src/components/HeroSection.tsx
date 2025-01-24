"use client";

import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HeroSection = () => {
  // We'll use placeholder images until you provide the actual project images
  const projectImages = ["/project1.jpg", "/project2.jpg", "/project3.jpg"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? 50 : -50,
      y: i === 1 ? 50 : -50,
      rotate: i * 10,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      zIndex: 10,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const titleText = "Your Dream Home Awaits";
  const descriptionText =
    "Experience modern living in the heart of Offa, Kwara State. Affordable luxury homes designed for your comfort and convenience.";

  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        minHeight: { xs: "90vh", md: "100vh" },
        pt: { xs: "64px", sm: "80px", md: 0 },
        overflow: "hidden",
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(27, 67, 50, 0.1) 0%, rgba(45, 106, 79, 0.05) 100%)",
          zIndex: -1,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 8 }}
          alignItems="center"
          sx={{
            minHeight: { xs: "90vh", md: "100vh" },
            flexDirection: { xs: "column-reverse", md: "row" },
            pt: { xs: 2, sm: 3, md: 0 },
            pb: { xs: 4, sm: 5, md: 0 },
          }}
        >
          {/* Text Content */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, sm: 3, md: 0 },
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "100%", md: "90%" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3.5rem",
                      lg: "4rem",
                    },
                    fontWeight: 600,
                    fontFamily: '"Playfair Display", serif',
                    color: "primary.main",
                    mb: { xs: 1.5, sm: 2, md: 3 },
                    lineHeight: { xs: 1.3, md: 1.2 },
                  }}
                >
                  {titleText}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                    color: "text.secondary",
                    mb: { xs: 2.5, sm: 3, md: 4 },
                    lineHeight: { xs: 1.5, md: 1.6 },
                    maxWidth: { xs: "95%", sm: "90%", md: "80%" },
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  {descriptionText}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/register-interest"
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: { xs: 1.25, sm: 1.5, md: 2 },
                      px: { xs: 2.5, sm: 3, md: 4 },
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      borderRadius: "12px",
                      textTransform: "none",
                      background:
                        "linear-gradient(45deg, #1B4332 30%, #2D6A4F 90%)",
                      boxShadow: "none",
                      width: { xs: "100%", sm: "auto" },
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(27, 67, 50, 0.4)",
                      },
                    }}
                  >
                    Register Interest
                  </Button>
                </Link>
              </motion.div>
            </Box>
          </Grid>

          {/* Image Gallery */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: { xs: "35vh", sm: "45vh", md: "70vh" },
                maxHeight: { xs: "300px", sm: "400px", md: "600px" },
                mb: { xs: 2, sm: 3, md: 0 },
              }}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: "relative",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: { xs: 1, md: 2 },
                    p: { xs: 1, md: 2 },
                  }}
                >
                  {projectImages.map((src, index) => (
                    <motion.div
                      key={src}
                      custom={index}
                      variants={imageVariants}
                      whileHover="hover"
                      style={{
                        position: "relative",
                        gridColumn: index === 0 ? "span 2" : "span 1",
                        borderRadius: "24px",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          minHeight: { xs: "200px", md: "250px" },
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Project Image ${index + 1}`}
                          fill
                          style={{
                            objectFit: "cover",
                            borderRadius: "24px",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)",
                            borderRadius: "24px",
                            transition: "opacity 0.3s ease",
                            "&:hover": {
                              opacity: 0,
                            },
                          }}
                        />
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
