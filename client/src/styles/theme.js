import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007D3E", // Steimatzky Green
      light: "#6FBF73", // Light Green
      dark: "#004D23", // Dark Green
    },
    secondary: {
      main: "#FFC107", // Yellow Accent
      light: "#FFECB3", // Light Yellow
      dark: "#FFA000", // Dark Yellow
    },
    background: {
      default: "#FFFFFF", // White background
      paper: "#F9F9F9", // Light Gray for cards
    },
    text: {
      primary: "#000000", // Black text
      secondary: "#555555", // Medium Gray text
    },
  },
  typography: {
    fontFamily: "Heebo, Arial, sans-serif", // Hebrew-friendly font
    h1: {
      fontWeight: 700, // Bold headlines
      fontSize: "2rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#007D3E",
        },
      },
    },
  },
});

export default theme;
