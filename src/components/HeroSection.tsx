"use client";

import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 12px 24px rgba(27, 67, 50, 0.4)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const welcomeText = "Welcome to".split("");
  const morireText = "Morire City".split("");

  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #F8FAF9 0%, #FFFFFF 100%)",
        display: "flex",
        alignItems: "center",
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
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              width: { xs: "200px", md: "400px" },
              height: { xs: "200px", md: "400px" },
              left: `${i * 20}%`,
              top: `${i * 15}%`,
              position: "absolute",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                background:
                  "linear-gradient(45deg, rgba(27, 67, 50, 0.1), rgba(45, 106, 79, 0.05))",
                borderRadius: "50%",
                filter: "blur(60px)",
                width: "100%",
                height: "100%",
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </Box>
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 0 } }}>
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          {/* Text Content */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="h1"
                color="primary"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem" },
                  fontFamily: "var(--font-cormorant)",
                  mb: { xs: 2, md: 3 },
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.2em",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Box sx={{ display: "flex", gap: "0.1em", mb: 1 }}>
                  {welcomeText.map((letter, i) => (
                    <motion.span
                      key={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: "0.1em" }}>
                  {morireText.map((letter, i) => (
                    <motion.span
                      key={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: 0.5,
                        delay: 0.8 + i * 0.1,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      }}
                      style={{
                        color: i < 6 ? "#1B4332" : "#2D6A4F",
                        display: "inline-block",
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </Box>
              </Typography>
            </Box>

            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
                  mb: { xs: 3, md: 4 },
                  maxWidth: "600px",
                  mx: { xs: "auto", md: 0 },
                  background:
                    "linear-gradient(45deg, #1B4332 30%, #2D6A4F 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Experience luxury living in the heart of Offa, where modern
                comfort meets timeless elegance.
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowForwardIcon />
                    </motion.div>
                  }
                  href="/register-interest"
                  sx={{
                    py: { xs: 1.5, md: 2 },
                    px: { xs: 3, md: 4 },
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    borderRadius: "12px",
                    textTransform: "none",
                    background:
                      "linear-gradient(45deg, #1B4332 30%, #2D6A4F 90%)",
                    boxShadow: "0 8px 20px rgba(27, 67, 50, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #2D6A4F 30%, #1B4332 90%)",
                      boxShadow: "0 12px 24px rgba(27, 67, 50, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    "& .MuiButton-endIcon": {
                      marginLeft: 1,
                    },
                  }}
                >
                  Register Interest
                </Button>
              </motion.div>
            </Box>
          </Grid>

          {/* Video Section */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "300px", sm: "400px", md: "600px" },
                  width: "100%",
                  borderRadius: { xs: "24px", md: "40px" },
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(27, 67, 50, 0.2)",
                  "& video": {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#000",
                    borderRadius: { xs: "24px", md: "40px" },
                  },
                  "& video::-webkit-media-controls": {
                    backgroundColor: "rgba(27, 67, 50, 0.1)",
                    borderRadius: "12px",
                    padding: "0 8px",
                  },
                  "& video::-webkit-media-controls-panel": {
                    backgroundColor: "transparent",
                  },
                  "& video::-webkit-media-controls-play-button": {
                    backgroundColor: "#1B4332",
                    borderRadius: "50%",
                    color: "white",
                  },
                }}
              >
                <video
                  autoPlay
                  loop
                  playsInline
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                >
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
