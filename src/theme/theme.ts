import { createTheme } from "@mui/material";

export const theme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#5ECE7B",
      },
      secondary: {
        main: darkMode ? "#5ECE7B" : "#1D1F22",
      },
      text: {
        primary: darkMode ? "#FFF" : "#1D1F22",
        secondary: "#8D8F9A",
      },
      background: {
        default: darkMode ? "#222" : "#FFF",
        paper: darkMode ? "#333" : "#EEE",
      },
      divider: darkMode ? "#353535" : "#E5E5E5",
    },

    breakpoints: {
      values: {
        xs: 500,
        sm: 768,
        md: 920,
        lg: 1440,
        xl: 1920,
      },
    },
  });
