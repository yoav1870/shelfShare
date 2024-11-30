import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3b5998", // Deep Blue
      light: "#8b9dc3", // Light Blue
      dark: "#1d305e", // Dark Blue
    },
    secondary: {
      main: "#f7b733", // Vibrant Orange
      light: "#ffcc80", // Light Orange
      dark: "#c88719", // Dark Orange
    },
    background: {
      default: "#f5f5f5", // Light Gray
      paper: "#ffffff", // White
    },
    text: {
      primary: "#333333", // Dark Gray
      secondary: "#555555", // Medium Gray
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
