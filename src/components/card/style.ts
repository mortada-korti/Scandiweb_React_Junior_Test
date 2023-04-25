import { styled } from "@mui/material";

export const CartIconWrapper = styled("div")(({ theme }) => ({
  opacity: 0,
  cursor: "pointer",
  transition: "0.3s all ease-in-out",
  backgroundColor: theme.palette.primary.main,
  "& > svg > path": {
    fill: "white",
    transition: "0.3s ease-in-out",
  },
  "&:hover": {
    transform: "scale(1.2)",
    backgroundColor: theme.palette.mode === "dark" ? "#CCC" : "black",
    "& > svg > path": {
      fill: theme.palette.background.default,
    },
  },
  borderRadius: "50%",
  width: "52px",
  height: "52px",
  position: "absolute",
  bottom: "-26px",
  right: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const CardWrapper = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  width: "386px",
  display: "flex",
  padding: "16px",
  flexDirection: "column",
  gap: "24px",
  transition: "0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 4px 35px rgba(168, 172, 176, 0.40);",
    "& > div:not(.out-of-stock)": {
      "& > .cart-icon": {
        opacity: 1,
      },
    },
  },
}));

export const CardImg = styled("div")(({ theme }) => ({
  width: "100%",
  height: "330px",
  position: "relative",
  "&.out-of-stock": {
    "& a::before": {
      top: "50%",
      left: "50%",
      color: "#8D8F9A",
      width: "100%",
      height: "100%",
      display: "flex",
      content: "'OUT OF STOCK'",
      fontSize: "24px",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      lineHeight: "38.4px",
      alignItems: "center",
      justifyContent: "center",
    },
    "& > a > img": {
      opacity: 0.4,
    },
  },
  "& > a > img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export const CardTitle = styled("span")(({ theme }) => ({
  fontWeight: 300,
  fontSize: "18px",
  lineHeight: "28.8px",
  color: theme.palette.text.primary,
}));

export const CardPrice = styled("div")(({ theme }) => ({
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "28.8px",
  color: theme.palette.text.primary,
}));
