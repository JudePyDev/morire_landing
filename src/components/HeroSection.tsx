"use client";

import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HeroSection() {
  const { scrollY } = useScroll({
    layoutEffect: false,
  });

  const y = useTransform(scrollY, [0, 500], [0, 150], {
    clamp: true,
  });

  const opacity = useTransform(scrollY, [0, 300], [1, 0], {
    clamp: true,
  });

  // Reduce number of animated background elements on mobile
  const numBackgroundElements =
    typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 8;

  // Background patterns
  const patterns = [
    {
      size: { xs: "150px", md: "300px" },
      color: "rgba(27, 67, 50, 0.08)",
      blur: "40px",
      animation: {
        duration: { base: 15, random: 5 },
        scale: [1, 1.2],
      },
    },
    {
      size: { xs: "100px", md: "200px" },
      color: "rgba(45, 106, 79, 0.06)",
      blur: "30px",
      animation: {
        duration: { base: 12, random: 4 },
        scale: [0.8, 1],
      },
    },
    {
      size: { xs: "80px", md: "150px" },
      color: "rgba(64, 145, 108, 0.05)",
      blur: "20px",
      animation: {
        duration: { base: 10, random: 3 },
        scale: [1.2, 1],
      },
    },
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.2,
        ease: [0.2, 0.65, 0.3, 0.9],
        staggerChildren: 0.1,
      },
    }),
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      willChange: "transform, opacity",
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
      id="home"
      component="section"
      sx={{
        minHeight: { xs: "calc(100vh - 64px)", md: "100vh" },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #E8F0ED 0%, #F5F9F7 50%, #E5EEE9 100%)",
        display: "flex",
        alignItems: "center",
        willChange: "transform",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(27, 67, 50, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(45, 106, 79, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(64, 145, 108, 0.06) 0%, transparent 70%)
          `,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, rgba(27, 67, 50, 0.04) 25%, transparent 25%) -50px 0,
            linear-gradient(-45deg, rgba(27, 67, 50, 0.04) 25%, transparent 25%) -50px 0,
            linear-gradient(45deg, transparent 75%, rgba(27, 67, 50, 0.04) 75%) -50px 0,
            linear-gradient(-45deg, transparent 75%, rgba(27, 67, 50, 0.04) 75%) -50px 0
          `,
          backgroundSize: "100px 100px",
          opacity: 0.7,
          pointerEvents: "none",
        },
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
          transform: "translateZ(0)",
          willChange: "transform",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('/images/pattern-dot.png')",
            backgroundSize: "30px 30px",
            opacity: 0.4,
            animation: "moveBackground 30s linear infinite",
          },
        }}
      >
        {[...Array(numBackgroundElements)].map((_, i) => {
          const patternIndex = i % patterns.length;
          const pattern = patterns[patternIndex];
          const randomDelay = Math.random() * 2;
          const randomDuration =
            pattern.animation.duration.base +
            Math.random() * pattern.animation.duration.random;

          return (
            <Box
              key={i}
              sx={{
                width: pattern.size,
                height: pattern.size,
                left: `${(i * 100) / numBackgroundElements}%`,
                top: `${Math.random() * 100}%`,
                position: "absolute",
                transform: "translateZ(0)",
                willChange: "transform",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  background: `radial-gradient(circle at center, ${pattern.color}, transparent)`,
                  borderRadius: "50%",
                  filter: `blur(${pattern.blur})`,
                  width: "100%",
                  height: "100%",
                  willChange: "transform, opacity",
                }}
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                  scale: pattern.animation.scale,
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: randomDuration,
                  delay: randomDelay,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.5, 1],
                }}
              />
            </Box>
          );
        })}
      </Box>

      {/* Subtle Grid Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(27, 67, 50, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(27, 67, 50, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: { xs: "20px 20px", md: "30px 30px" },
          opacity: 0.5,
          pointerEvents: "none",
          animation: "pulseGrid 10s ease-in-out infinite",
        }}
      />

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
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                  fontFamily: "var(--font-cormorant)",
                  mb: { xs: 1.5, md: 2 },
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: { xs: "0.1em", md: "0.2em" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  lineHeight: 1.2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: "0.05em", md: "0.1em" },
                    mb: { xs: 0.5, md: 1 },
                  }}
                >
                  {welcomeText.map((letter, i) => (
                    <motion.span
                      key={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: 0.3,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </Box>
                <Box
                  sx={{ display: "flex", gap: { xs: "0.05em", md: "0.1em" } }}
                >
                  {morireText.map((letter, i) => (
                    <motion.span
                      key={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + i * 0.05,
                        ease: "easeOut",
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
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  mb: { xs: 2.5, md: 3.5 },
                  maxWidth: "600px",
                  mx: { xs: "auto", md: 0 },
                  lineHeight: { xs: 1.5, md: 1.6 },
                  px: { xs: 2, md: 0 },
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
              style={{
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "300px", sm: "400px", md: "600px" },
                  width: "100%",
                  borderRadius: { xs: "24px", md: "40px" },
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(27, 67, 50, 0.2)",
                  transform: "translateZ(0)",
                  willChange: "transform",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#000",
                  "& video": {
                    width: "100%",
                    height: "auto",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: { xs: "24px", md: "40px" },
                    willChange: "transform",
                    transform: "translateZ(0)",
                  },
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/video-poster.jpg"
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    perspective: 1000,
                    WebkitTransform: "translate3d(0,0,0)",
                    WebkitBackfaceVisibility: "hidden",
                    WebkitPerspective: 1000,
                  }}
                >
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(27, 67, 50, 0.1) 0%, rgba(27, 67, 50, 0.05) 100%)",
                    pointerEvents: "none",
                    transform: "translate3d(0,0,0)",
                    backfaceVisibility: "hidden",
                    WebkitTransform: "translate3d(0,0,0)",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
