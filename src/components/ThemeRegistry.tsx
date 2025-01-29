"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeRegistryProps {
  children: React.ReactNode;
}

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-playfair), serif",
    h1: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "var(--font-playfair), serif",
      fontWeight: 500,
      textTransform: "none",
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      main: "#1B4332",
      light: "#2D6A4F",
      dark: "#081C15",
    },
    secondary: {
      main: "#40916C",
      light: "#52B788",
      dark: "#2D6A4F",
    },
    text: {
      primary: "#081C15",
      secondary: "#2D6A4F",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
