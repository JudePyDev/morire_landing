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
    layoutEffect: false,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"], {
    clamp: true,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0.3, 1, 1, 0.3],
    {
      clamp: true,
    }
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
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
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Optimized Background */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(135deg, rgba(27, 67, 50, 0.1) 0%, rgba(45, 106, 79, 0.05) 100%)",
          opacity,
          y: backgroundY,
          willChange: "transform, opacity",
        }}
      />

      {/* Optimized Decorative Elements */}
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
          transform: "translateZ(0)",
        }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 15 + 10,
              height: Math.random() * 15 + 10,
              borderRadius: "50%",
              background: "rgba(27, 67, 50, 0.5)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: "transform",
            }}
            animate={{
              y: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            align="center"
            color="primary"
            sx={{
              mb: { xs: 3, md: 6 },
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontFamily: "var(--font-cormorant)",
              lineHeight: 1.2,
            }}
          >
            Features & Amenities
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={feature.title}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                custom={index}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: "100%",
                    borderRadius: "24px",
                    background: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(27, 67, 50, 0.1)",
                    transition: "all 0.3s ease",
                    willChange: "transform",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.95)",
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(27, 67, 50, 0.1)",
                    },
                  }}
                >
                  <motion.div variants={iconVariants}>
                    <feature.icon
                      sx={{
                        fontSize: { xs: "2.5rem", md: "3rem" },
                        color: "primary.main",
                        mb: 2,
                      }}
                    />
                  </motion.div>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      color: "primary.main",
                      fontFamily: "var(--font-cormorant)",
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      fontFamily: "var(--font-playfair)",
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      lineHeight: 1.6,
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
