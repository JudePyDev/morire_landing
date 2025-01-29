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
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import SchoolIcon from "@mui/icons-material/School";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function AboutSection() {
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
          {/* Text Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
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

          {/* Image */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "300px", sm: "400px", md: "500px" },
                  borderRadius: { xs: "24px", md: "40px" },
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(27, 67, 50, 0.2)",
                }}
              >
                <Image
                  src="/images/governor-image.jpg"
                  alt="Governor"
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(27, 67, 50, 0.2) 0%, rgba(27, 67, 50, 0.4) 100%)",
                    zIndex: 1,
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
