import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B4332", // Dark green
      light: "#2D6A4F",
      dark: "#081C15",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#40916C",
      light: "#52B788",
      dark: "#2D6A4F",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#F8FAF9",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "2.5rem",
      letterSpacing: "-0.01em",
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: "2rem",
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: "0.01em",
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.7,
      letterSpacing: "0.01em",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
        },
      },
    },
  },
});

export default theme;
