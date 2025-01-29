"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useCallback } from "react";

// Sample images array - replace with your actual images
const carouselImages = [
  {
    src: "/images/about1.jpg",
    alt: "Morire Estate View 1",
  },
  {
    src: "/images/about2.jpg",
    alt: "Morire Estate View 2",
  },
  {
    src: "/images/about3.jpg",
    alt: "Morire Estate View 3",
  },
  {
    src: "/images/about4.jpg",
    alt: "Morire Estate View 4",
  },
  {
    src: "/images/about5.jpg",
    alt: "Morire Estate View 5",
  },
  // Add more images as needed
];

const CustomArrow = ({
  direction,
  onClick,
}: {
  direction: "next" | "prev";
  onClick?: () => void;
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(255, 255, 255, 0.9) !important",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: { xs: 40, md: 48 },
      height: { xs: 40, md: 48 },
      ...(direction === "next"
        ? { right: { xs: 10, md: 20 } }
        : { left: { xs: 10, md: 20 } }),
      "&:hover": {
        backgroundColor: "white !important",
        transform: "translateY(-50%) scale(1.1)",
      },
    }}
  >
    {direction === "next" ? (
      <ArrowForwardIcon color="primary" />
    ) : (
      <ArrowBackIcon color="primary" />
    )}
  </IconButton>
);

export default function AboutSection() {
  const sliderRef = useRef<Slider>(null);

  const next = useCallback(() => {
    sliderRef.current?.slickNext();
  }, []);

  const previous = useCallback(() => {
    sliderRef.current?.slickPrev();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAF9 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          {/* Image Carousel */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(27, 67, 50, 0.1)",
                  "&:hover .carousel-arrows": {
                    opacity: 1,
                  },
                  "& .slick-dots": {
                    bottom: 20,
                    "& li": {
                      mx: 1,
                      "& button": {
                        "&:before": {
                          fontSize: 12,
                          color: "white",
                          opacity: 0.7,
                        },
                      },
                      "&.slick-active button:before": {
                        opacity: 1,
                      },
                    },
                  },
                }}
              >
                <Slider ref={sliderRef} {...settings}>
                  {carouselImages.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        paddingTop: "75%", // 4:3 aspect ratio for bigger images
                        height: { xs: "300px", sm: "400px", md: "500px" },
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </Box>
                  ))}
                </Slider>
                <Box
                  className="carousel-arrows"
                  sx={{
                    opacity: { xs: 1, md: 0 },
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <CustomArrow direction="prev" onClick={previous} />
                  <CustomArrow direction="next" onClick={next} />
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                color="primary"
                sx={{
                  mb: { xs: 2.5, md: 3 },
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontFamily: "var(--font-cormorant)",
                  lineHeight: 1.2,
                }}
              >
                About Morire
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  lineHeight: 1.6,
                  fontFamily: "var(--font-playfair)",
                }}
              >
                Encounter the ultimate living at Morire City, a breathtaking
                real estate development by IshiHomes, strategically located in
                the heart of Offa, Kwara state. Spreading over 34 Hectares of
                land, with about 672 units of bungalows, the city offers a
                perfect settlement for families, professionals, and investors.
              </Typography>

              <Typography
                variant="h4"
                color="primary"
                align="center"
                sx={{
                  mb: 3,
                  fontFamily: "var(--font-cormorant)",
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  width: "100%",
                  lineHeight: 1.3,
                }}
              >
                Nearby Landmarks
              </Typography>

              <List sx={{ mb: 4 }}>
                <ListItem
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(27, 67, 50, 0.05)",
                      borderRadius: "12px",
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <SchoolIcon color="primary" sx={{ fontSize: "1.75rem" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Federal Polytechnic Offa"
                    primaryTypographyProps={{
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                      fontWeight: 500,
                      color: "primary.main",
                      fontFamily: "var(--font-playfair)",
                    }}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(27, 67, 50, 0.05)",
                      borderRadius: "12px",
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <LocalHospitalIcon
                      color="primary"
                      sx={{ fontSize: "1.75rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Health Tech College of Medicine"
                    primaryTypographyProps={{
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                      fontWeight: 500,
                      color: "primary.main",
                      fontFamily: "var(--font-playfair)",
                    }}
                  />
                </ListItem>
                <ListItem
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(27, 67, 50, 0.05)",
                      borderRadius: "12px",
                      transform: "translateX(8px)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <StorefrontIcon
                      color="primary"
                      sx={{ fontSize: "1.75rem" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Kara Market"
                    primaryTypographyProps={{
                      fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                      fontWeight: 500,
                      color: "primary.main",
                      fontFamily: "var(--font-playfair)",
                    }}
                  />
                </ListItem>
              </List>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
