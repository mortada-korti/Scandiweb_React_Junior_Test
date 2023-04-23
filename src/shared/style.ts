import { styled } from "@mui/material";

export const Svg = styled("svg")(({ theme }) => ({
  "& > path": {
    stroke: theme.palette.mode === "dark" ? "#FFF" : "#000",
  },
}));

export const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  maxWidth: "1440px",
  margin: "auto",
}));

export const PageContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  maxWidth: "1440px",
  margin: "auto",
  padding: "80px 101px",
  minHeight: "calc(100vh - 80px)",
  [theme.breakpoints.down("md")]: {
    minHeight: "calc(100vh - 65px)",
    padding: "20px 10px",
  },
}));


