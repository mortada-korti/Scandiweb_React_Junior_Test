import { styled, Box, Stack } from "@mui/material";

export const CartTitle = styled("div")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "32px",
  lineHeight: "40px",
  marginBottom: "55px",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

export const CartFooterWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "32px",
  borderTop: "1px solid" + theme.palette.divider,
  gap: "8px",
  fontSize: "24px",
  width: "100%",
  lineHeight: "28px",
  textAlign: "left",
  fontFamily: "Raleway, sans-serif",
  "& .title": {
    flex: 1,
    fontWeight: 400,
    fontSize: "inherit",
    fontFamily: "inherit",
  },
  "& .value": {
    flex: 1,
    fontWeight: 700,
    fontSize: "inherit",
    fontFamily: "inherit",
  },
  "& .total": {
    flex: 1,
    fontSize: "inherit",
    fontFamily: "inherit",
    fontWeight: 500,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    alignItems: "center",
  },
}));

export const CartPorductWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "24px 0",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: "1px solid" + theme.palette.divider,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "80px",
  },
}));

export const HandleQuantity = styled(Stack)(({ theme }) => ({
  height: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
    flexDirection: "row-reverse",
    width: "200px",
  },
}));

export const CartProductGallery = styled(Stack)<any>(({ theme, gap }) => ({
  flexDirection: "row",
  height: "288px",
  gap: gap,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    margin: "auto",
  },
}));

export const QuantityAction = styled("button")<any>(({ theme, size }) => ({
  width: size,
  height: size,
  position: "relative",
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "1px solid" + theme.palette.text.primary,
  "&.add": {
    "&::before": {
      content: "''",
      position: "absolute",
      width: "15px",
      height: "1px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.palette.text.primary,
    },
    "&::after": {
      content: "''",
      position: "absolute",
      width: "1px",
      height: "15px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.palette.text.primary,
    },
  },
  "&.remove": {
    "&::before": {
      content: "''",
      position: "absolute",
      width: "15px",
      height: "1px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.palette.text.primary,
    },
  },
}));

export const CartProductImg = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: "auto 0",
  backgroundColor: "white",
  "& img": {
    width: "inherit",
    height: "inherit",
    objectFit: "contain",
    backgroundColor: "white",
  },
  "& .arrows": {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    position: "absolute",
    bottom: "16px",
    right: "16px",
    "& span": {
      userSelect: "none",
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.73)",
      width: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "24px",
    },
  },
}));
