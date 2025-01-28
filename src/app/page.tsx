"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import UnitsSection from "@/components/UnitsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <Box component="main">
              <Navbar />
              <HeroSection />
              <AboutSection />
              <UnitsSection />
              <FeaturesSection />
              <ContactSection />
              <Footer />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
