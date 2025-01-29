import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const pages = ["Home", "Units", "Features", "Contact Us"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: { opacity: 0, y: -20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(
      sectionId === "Contact Us"
        ? "contact"
        : sectionId === "Home"
        ? "home"
        : sectionId.toLowerCase()
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? "rgba(255, 255, 255, 0.98)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          transition: "all 0.3s ease-in-out",
          borderBottom: scrolled ? "1px solid rgba(27, 67, 50, 0.1)" : "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              py: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left Section: Logo */}
            <motion.div
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={logoVariants}
            >
              <Image
                src="/logo.png"
                alt="Estate Logo"
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            {/* Center Section: Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {pages.map((page, index) => (
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    onClick={() => handleNavClick(page)}
                    sx={{
                      px: 2.5,
                      py: 1,
                      color: scrolled ? "#1B4332" : "#1B4332",
                      fontSize: "0.95rem",
                      letterSpacing: "0.02em",
                      fontWeight: 600,
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: activeSection === page ? "2px" : "0px",
                        bgcolor: "primary.main",
                        transition: "all 0.3s ease-in-out",
                        opacity: 0.8,
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                        "&::before": {
                          height: "2px",
                        },
                      },
                    }}
                  >
                    {page}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Right Section: Register Button & Mobile Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                href="/register-interest"
                sx={{
                  display: { xs: "none", md: "flex" },
                  px: 3,
                  py: 1,
                  borderRadius: "4px",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "none",
                    background: "primary.dark",
                  },
                }}
              >
                Register Interest
              </Button>

              <IconButton
                sx={{
                  display: { xs: "flex", md: "none" },
                  color: scrolled ? "primary.main" : "white",
                }}
                onClick={() => setIsOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "400px",
            background: "#ffffff",
            px: 3,
          },
        }}
      >
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Image
              src="/logo.png"
              alt="Estate Logo"
              width={40}
              height={40}
              style={{ objectFit: "contain" }}
            />
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <List>
              {pages.map((page) => (
                <motion.div key={page} variants={itemVariants}>
                  <ListItem
                    sx={{
                      py: 2,
                      borderBottom: "1px solid",
                      borderColor: "rgba(27, 67, 50, 0.1)",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "primary.main",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        width: "100%",
                      }}
                      onClick={() => handleNavClick(page)}
                    >
                      {page}
                    </Typography>
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </motion.div>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
