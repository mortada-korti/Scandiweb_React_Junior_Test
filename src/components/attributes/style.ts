import { styled, Typography, Stack } from "@mui/material";

export const AttributeTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto Condensed, sans-serif",
  fontSize: "18px",
  lineHeight: "18px",
  fontWeight: "700",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  }
}));

export const AttributeItemsContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  [theme.breakpoints.down("lg")]: {
    margin: "auto",
  },
}));
