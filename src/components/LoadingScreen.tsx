"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [greeting, setGreeting] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Start exit animation after content is shown
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadingComplete, 1000);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            background: "#ffffff",
          }}
        >
          {/* Background gradient animation */}
          <Box
            component={motion.div}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(45deg, rgba(27, 67, 50, 0.1), rgba(45, 106, 79, 0.1))",
              opacity: 0.5,
            }}
            animate={{
              background: [
                "linear-gradient(45deg, rgba(27, 67, 50, 0.1), rgba(45, 106, 79, 0.1))",
                "linear-gradient(225deg, rgba(27, 67, 50, 0.1), rgba(45, 106, 79, 0.1))",
                "linear-gradient(45deg, rgba(27, 67, 50, 0.1), rgba(45, 106, 79, 0.1))",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Content Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100vh",
              maxWidth: "800px",
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              style={{
                marginBottom: "3rem",
              }}
            >
              <Image
                src="/logo.png"
                alt="Estate Logo"
                width={120}
                height={120}
                priority
                style={{
                  objectFit: "contain",
                }}
              />
            </motion.div>

            {/* Text Content */}
            <Box sx={{ textAlign: "center", width: "100%" }}>
              {/* Greeting Text */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {greeting.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={letterAnimation}
                    custom={i}
                    style={{
                      display: "inline-block",
                      fontFamily: '"Playfair Display", serif',
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      color: "#1B4332",
                      marginRight: char === " " ? "0.5rem" : "0.1rem",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Typography
                  variant="h5"
                  color="primary.light"
                  sx={{
                    fontWeight: 300,
                    fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    my: 2,
                    opacity: 0.8,
                  }}
                >
                  Welcome to
                </Typography>
              </motion.div>

              {/* Estate Name */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 1.5,
                    },
                  },
                }}
              >
                {"AbdulRahman AbdulRazak Housing Estate"
                  .split(" ")
                  .map((word, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.8,
                            ease: [0.2, 0.65, 0.3, 0.9],
                          },
                        },
                      }}
                      style={{
                        display: "inline-block",
                        fontFamily: '"Playfair Display", serif',
                        fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                        color: "#1B4332",
                        margin: "0 0.5rem",
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
