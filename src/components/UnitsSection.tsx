"use client";

import { useState, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  IconButton,
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
  specs: {
    beds: number;
    baths: number;
    area: string;
  };
}

const units: UnitType[] = [
  {
    id: 1,
    name: "Premium Villa",
    description:
      "Luxurious 4-bedroom villa with modern amenities and spacious living areas.",
    price: "₦75M",
    image: "/unit1.jpg",
    specs: {
      beds: 4,
      baths: 4,
      area: "350 sqm",
    },
  },
  {
    id: 2,
    name: "Family Terrace",
    description: "Contemporary 3-bedroom terrace perfect for growing families.",
    price: "₦55M",
    image: "/unit2.jpg",
    specs: {
      beds: 3,
      baths: 3,
      area: "280 sqm",
    },
  },
  {
    id: 3,
    name: "Executive Suite",
    description: "Modern 2-bedroom apartment with premium finishes.",
    price: "₦45M",
    image: "/unit3.jpg",
    specs: {
      beds: 2,
      baths: 2,
      area: "200 sqm",
    },
  },
];

const UnitsSection = () => {
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
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

  return (
    <Box
      id="units"
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        py: { xs: 6, sm: 8, md: 12 },
        background: "linear-gradient(180deg, #F8FAF9 0%, #FFFFFF 100%)",
      }}
    >
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
                fontFamily: '"Playfair Display", serif',
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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            {units.map((unit) => {
              const cardRef = useRef<HTMLDivElement>(null);
              return (
                <Grid item xs={12} sm={6} md={4} key={unit.id}>
                  <motion.div variants={cardVariants}>
                    <Card
                      ref={cardRef}
                      elevation={0}
                      onMouseMove={(e) => handleMouseMove(e, cardRef)}
                      onMouseLeave={() => handleMouseLeave(cardRef)}
                      onMouseEnter={() => setHoveredUnit(unit.id)}
                      sx={{
                        borderRadius: { xs: "20px", md: "24px" },
                        overflow: "hidden",
                        cursor: "pointer",
                        position: "relative",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "transform 0.2s ease-out",
                        transformStyle: "preserve-3d",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(45deg, rgba(27, 67, 50, 0.05), rgba(45, 106, 79, 0.05))",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                          transform: "translateZ(0)",
                        },
                        "&:hover::before": {
                          opacity: 1,
                        },
                        "& > *": {
                          transform: "translateZ(50px)",
                        },
                      }}
                    >
                      {/* Image Container */}
                      <Box
                        sx={{
                          position: "relative",
                          height: { xs: 250, sm: 280, md: 300 },
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "30%",
                            background:
                              "linear-gradient(to top, rgba(27, 67, 50, 0.8), transparent)",
                            zIndex: 1,
                          },
                        }}
                      >
                        <motion.div
                          variants={imageVariants}
                          style={{ height: "100%", position: "relative" }}
                        >
                          <Image
                            src={unit.image}
                            alt={unit.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </motion.div>
                        {/* Price Tag */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: { xs: 16, md: 20 },
                            right: { xs: 16, md: 20 },
                            zIndex: 2,
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(8px)",
                            borderRadius: { xs: "12px", md: "16px" },
                            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            px: { xs: 2, md: 2.5 },
                            py: { xs: 0.75, md: 1 },
                          }}
                        >
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                              fontWeight: 600,
                              letterSpacing: "0.02em",
                              fontSize: {
                                xs: "1rem",
                                sm: "1.1rem",
                                md: "1.25rem",
                              },
                            }}
                          >
                            {unit.price}
                          </Typography>
                        </Box>
                        {/* Unit Name Overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: { xs: 16, md: 20 },
                            left: { xs: 16, md: 20 },
                            zIndex: 2,
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              color: "white",
                              fontFamily: '"Playfair Display", serif',
                              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                              fontSize: {
                                xs: "1.25rem",
                                sm: "1.35rem",
                                md: "1.5rem",
                              },
                            }}
                          >
                            {unit.name}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Content */}
                      <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            mb: { xs: 2, sm: 3 },
                            minHeight: { xs: 40, sm: 48 },
                            lineHeight: 1.6,
                            fontSize: {
                              xs: "0.9rem",
                              sm: "0.95rem",
                              md: "1rem",
                            },
                          }}
                        >
                          {unit.description}
                        </Typography>

                        {/* Specifications */}
                        <Grid
                          container
                          spacing={{ xs: 1.5, sm: 2 }}
                          sx={{ mb: { xs: 2, sm: 3 } }}
                        >
                          {[
                            { icon: BedIcon, value: `${unit.specs.beds} Beds` },
                            {
                              icon: BathIcon,
                              value: `${unit.specs.baths} Baths`,
                            },
                            { icon: AreaIcon, value: unit.specs.area },
                          ].map((spec, index) => (
                            <Grid item xs={4} key={index}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  p: 1.5,
                                  borderRadius: "12px",
                                  bgcolor: "rgba(27, 67, 50, 0.05)",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    bgcolor: "rgba(27, 67, 50, 0.1)",
                                  },
                                }}
                              >
                                <spec.icon color="primary" />
                                <Typography
                                  sx={{
                                    fontSize: "0.9rem",
                                    fontWeight: 500,
                                  }}
                                >
                                  {spec.value}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>

                        {/* View Details Link */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "primary.main",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              gap: 2,
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 600,
                              letterSpacing: "0.02em",
                              fontSize: { xs: "0.9rem", sm: "1rem" },
                            }}
                          >
                            View Details
                          </Typography>
                          <ArrowForwardIcon
                            sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
                          />
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default UnitsSection;
