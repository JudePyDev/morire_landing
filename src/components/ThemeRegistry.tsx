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
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
    },
    h2: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "var(--font-cormorant), serif",
      fontWeight: 500,
    },
    subtitle1: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 500,
    },
    subtitle2: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 400,
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "var(--font-inter), sans-serif",
      fontWeight: 500,
      textTransform: "none",
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
