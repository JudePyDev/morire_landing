"use client";

import { Box, Container, Typography, Grid, Card } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import SecurityIcon from "@mui/icons-material/Security";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ParkIcon from "@mui/icons-material/Park";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useRef } from "react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: SecurityIcon,
    title: "Secure and Gated Community",
    description:
      "24/7 security with controlled access points and surveillance systems for your peace of mind.",
  },
  {
    icon: DirectionsCarIcon,
    title: "Well-Paved Roads and Drainage",
    description:
      "Modern infrastructure with properly constructed roads and efficient drainage systems.",
  },
  {
    icon: ElectricBoltIcon,
    title: "Reliable Utilities",
    description:
      "Consistent electricity and water supply ensuring comfortable living conditions.",
  },
  {
    icon: ParkIcon,
    title: "Recreational Spaces",
    description:
      "Beautiful green spaces and recreational facilities for leisure and community activities.",
  },
  {
    icon: LocalHospitalIcon,
    title: "Essential Services",
    description:
      "Easy access to schools, hospitals, and markets for your daily convenience.",
  },
];

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
    hover: {
      scale: 1.05,
      rotate: 2,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        rotate: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
    },
  };

  return (
    <Box
      id="features"
      ref={containerRef}
      sx={{
        position: "relative",
        py: { xs: 6, sm: 8, md: 12 },
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(27, 67, 50, 0.1) 0%, rgba(45, 106, 79, 0.05) 100%)",
          backgroundSize: "400% 400%",
          opacity,
          y: backgroundY,
        }}
      />

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          opacity: 0.1,
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
              background: "currentColor",
              color: "#1B4332",
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

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        {/* Section Header */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 10 }, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              color="primary"
              sx={{
                mb: { xs: 1.5, sm: 2, md: 2 },
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                fontFamily: '"Playfair Display", serif',
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: { xs: "40px", sm: "50px", md: "60px" },
                  height: { xs: "2px", md: "3px" },
                  background: "primary.main",
                  borderRadius: "2px",
                },
              }}
            >
              Premium Features & Amenities
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: { xs: "95%", sm: "800px" },
                mx: "auto",
                mt: { xs: 3, sm: 4 },
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                opacity: 0.8,
                px: { xs: 2, sm: 0 },
              }}
            >
              Experience luxury living with our carefully curated amenities
            </Typography>
          </motion.div>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
              >
                <Card
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 3.5, md: 4 },
                    height: "100%",
                    borderRadius: { xs: "20px", md: "24px" },
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: "divider",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(135deg, transparent 0%, rgba(27, 67, 50, 0.05) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover": {
                      "&::before": {
                        opacity: 1,
                      },
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(27, 67, 50, 0.1)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                    style={{ display: "inline-block" }}
                  >
                    <feature.icon
                      sx={{
                        fontSize: { xs: "2.75rem", sm: "3rem", md: "3.5rem" },
                        color: "primary.main",
                        mb: { xs: 1.5, sm: 2 },
                        filter: "drop-shadow(0 4px 6px rgba(27, 67, 50, 0.2))",
                      }}
                    />
                  </motion.div>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "primary.main",
                      mb: { xs: 1.5, sm: 2 },
                      fontSize: { xs: "1.25rem", sm: "1.35rem", md: "1.5rem" },
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-6px",
                        left: 0,
                        width: { xs: "30px", sm: "35px", md: "40px" },
                        height: "2px",
                        background: "primary.main",
                        borderRadius: "1px",
                      },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      lineHeight: { xs: 1.6, md: 1.7 },
                      mt: { xs: 1.5, sm: 2 },
                      fontSize: { xs: "0.9rem", sm: "0.95rem", md: "1rem" },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
