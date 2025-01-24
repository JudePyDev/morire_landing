"use client";

import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function ThankYouPage() {
  const router = useRouter();
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Initial animations
      await controls.start("visible");
      // Wait for 4 seconds before redirecting
      setTimeout(() => {
        router.push("/");
      }, 4000);
    };
    sequence();
  }, [controls, router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8FAF9 0%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: "absolute",
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            background: `rgba(27, 67, 50, ${Math.random() * 0.3})`,
            borderRadius: "50%",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          transition={{
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 2,
          }}
        />
      ))}

      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{ textAlign: "center" }}
        >
          <motion.div variants={checkmarkVariants}>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: "6rem",
                color: "primary.main",
                mb: 3,
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontFamily: "var(--font-cormorant)",
                color: "primary.main",
                mb: 2,
                position: "relative",
              }}
            >
              Thank You!
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                color: "text.secondary",
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Your interest has been registered successfully. We'll be in touch
              with you shortly.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} style={{ position: "relative" }}>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.7,
                fontSize: "0.9rem",
              }}
            >
              Redirecting you to home page...
            </Typography>
            <motion.div
              style={{
                width: "50px",
                height: "2px",
                background: "#1B4332",
                margin: "20px auto",
              }}
              animate={{
                scaleX: [1, 0],
                transition: {
                  duration: 4,
                  ease: "linear",
                },
              }}
            />
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
