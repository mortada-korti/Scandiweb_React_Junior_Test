import { styled } from "@mui/material";

export const CategoryTitle = styled("h1")(({ theme }) => ({
  fontSize: "42px",
  lineHeight: "67.2px",
  fontWeight: "400",
  textTransform: "capitalize",
  marginBottom: "103px",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    marginBottom: "40px",
    textAlign: "center",
  },
}));

export const ProductsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  columnGap: "20px",
  rowGap: "103px",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    rowGap: "50px",
  },
}));

