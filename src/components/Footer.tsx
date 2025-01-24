"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        backgroundColor: "#F8FAF9",
        borderTop: "1px solid",
        borderColor: "rgba(27, 67, 50, 0.1)",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo and Copyright */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--font-cormorant)",
                color: "primary.main",
                mb: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Morire
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: { xs: "center", md: "left" } }}
            >
              © {currentYear} All rights reserved.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Link
                href="/"
                color="text.secondary"
                underline="none"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                Home
              </Link>
              <Link
                href="#contact"
                color="text.secondary"
                underline="none"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                Contact
              </Link>
              <Link
                href="/register-interest"
                color="text.secondary"
                underline="none"
                sx={{ "&:hover": { color: "primary.main" } }}
              >
                Register
              </Link>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                gap: 1,
              }}
            >
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{ color: "primary.main" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{ color: "primary.main" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                sx={{ color: "primary.main" }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
