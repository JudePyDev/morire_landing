"use client";

import { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BedIcon from "@mui/icons-material/KingBed";
import BathIcon from "@mui/icons-material/Bathtub";
import AreaIcon from "@mui/icons-material/SquareFoot";

interface UnitType {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const units: UnitType[] = [
  {
    id: 1,
    name: "2 Bedroom Apartment",
    description:
      "Experience modern comfort in our thoughtfully designed 2-bedroom apartment. Perfect for small families or professionals, featuring contemporary finishes and optimal space utilization.",
    price: "₦15.5M",
    image: "/images/units/2-bedroom.jpg",
  },
  {
    id: 2,
    name: "3 Bedroom Apartment",
    description:
      "Embrace spacious living in our elegant 3-bedroom apartment. Ideal for growing families, offering generous living spaces and modern amenities for comfortable family living.",
    price: "₦18.5M",
    image: "/images/units/3-bedroom.jpg",
  },
  {
    id: 3,
    name: "3 Bedroom Apartment with BQ",
    description:
      "Discover premium living in our exclusive 3-bedroom apartment with BQ. Perfect for families desiring extra space and privacy, featuring additional quarters for staff or guests.",
    price: "₦19.5M",
    image: "/images/units/3-bedroom-bq.jpg",
  },
];

const UnitsSection = () => {
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Function to handle mouse move for 3D effect
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardRef: React.RefObject<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse position X relative to card
    const y = e.clientY - rect.top; // Mouse position Y relative to card

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees rotation
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees rotation

    // Apply the transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  };

  // Function to reset card position
  const handleMouseLeave = (cardRef: React.RefObject<HTMLDivElement>) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  };

  const backgroundElements = [...Array(3)].map((_, index) => ({
    width: { xs: "300px", md: "500px" },
    height: { xs: "300px", md: "500px" },
    left: `${index * 30}%`,
    top: `${index * 20}%`,
    duration: 15 + index * 2,
  }));

  return (
    <Box
      id="units"
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        py: { xs: 6, sm: 8, md: 12 },
        background: "linear-gradient(180deg, #F8FAF9 0%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
        backfaceVisibility: "hidden",
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
          opacity: 0.5,
        }}
      >
        {backgroundElements.map((element, index) => (
          <Box
            key={index}
            component={motion.div}
            sx={{
              position: "absolute",
              width: element.width,
              height: element.height,
              left: element.left,
              top: element.top,
              background:
                "linear-gradient(45deg, rgba(27, 67, 50, 0.1), rgba(45, 106, 79, 0.05))",
              borderRadius: "50%",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </Box>

      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ mb: { xs: 4, sm: 6, md: 10 }, textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              color="primary"
              sx={{
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                fontFamily: "var(--font-cormorant)",
                lineHeight: 1.2,
              }}
            >
              Available Units
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: { xs: "95%", sm: "90%", md: "800px" },
                mx: "auto",
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                opacity: 0.8,
                px: { xs: 2, sm: 0 },
              }}
            >
              Discover our thoughtfully designed living spaces that blend
              comfort with luxury
            </Typography>
          </motion.div>
        </Box>

        {/* Units Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <Grid container spacing={{ xs: 4, sm: 6, md: 8 }}>
            {units.map((unit, index) => (
              <Grid item xs={12} md={6} lg={4} key={unit.id}>
                <motion.div
                  variants={cardVariants}
                  onHoverStart={() => setHoveredUnit(unit.id)}
                  onHoverEnd={() => setHoveredUnit(null)}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: { xs: "30px", md: "40px" },
                      overflow: "hidden",
                      position: "relative",
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      minHeight: { xs: "500px", md: "550px" },
                      willChange: "transform",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        borderColor: "rgba(27, 67, 50, 0.3)",
                        boxShadow:
                          "0 20px 40px rgba(27, 67, 50, 0.1), 0 0 20px rgba(27, 67, 50, 0.05)",
                      },
                    }}
                  >
                    {/* Background Image */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 0,
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(2px)",
                          zIndex: 1,
                        },
                      }}
                    >
                      <motion.div
                        variants={imageVariants}
                        whileHover="hover"
                        style={{
                          width: "100%",
                          height: "100%",
                          willChange: "transform",
                        }}
                      >
                        <Image
                          src={unit.image}
                          alt={unit.name}
                          fill
                          style={{
                            objectFit: "cover",
                          }}
                          sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                          priority={unit.id === 1}
                        />
                      </motion.div>
                    </Box>

                    <Box
                      sx={{
                        position: "relative",
                        p: { xs: 4, sm: 5, md: 6 },
                        zIndex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Price Tag */}
                      <motion.div
                        initial={false}
                        animate={
                          hoveredUnit === unit.id
                            ? { scale: 1.05, y: -5 }
                            : { scale: 1, y: 0 }
                        }
                        transition={{ duration: 0.2 }}
                      >
                        <Box
                          sx={{
                            mb: 4,
                            background: "rgba(27, 67, 50, 0.1)",
                            display: "inline-block",
                            px: { xs: 3, md: 4 },
                            py: { xs: 1.5, md: 2 },
                            borderRadius: "20px",
                            backdropFilter: "blur(5px)",
                            border: "2px solid",
                            borderColor: "primary.main",
                            boxShadow: "0 4px 12px rgba(27, 67, 50, 0.1)",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: {
                                xs: "1.2rem",
                                sm: "1.3rem",
                                md: "1.5rem",
                              },
                              color: "primary.main",
                            }}
                          >
                            {unit.price}
                          </Typography>
                        </Box>
                      </motion.div>

                      {/* Unit Name */}
                      <Typography
                        variant="h5"
                        sx={{
                          color: "primary.main",
                          fontFamily: "var(--font-cormorant)",
                          mb: 3,
                          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                          fontWeight: 600,
                        }}
                      >
                        {unit.name}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.8,
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                          mb: 0,
                          flex: 1,
                        }}
                      >
                        {unit.description}
                      </Typography>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default UnitsSection;
