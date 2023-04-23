import { styled } from "@mui/material";

const dropDownAnimation = {
  zIndex: 10,
  opacity: 0,
  transform: "translateY(-20px)",
  transition: "0.3s ease",
  "&.active": {
    opacity: 1,
    transform: "translateY(0)",
    visibility: "visible",
  },
};

export const MenuDropDownWrapper = styled("div")(({ theme }) => ({
  gap: "10px",
  top: "55px",
  left: "0",
  position: "absolute",
  flexDirection: "column",
  ...dropDownAnimation,
  border: "1px solid" + theme.palette.divider,
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

export const CurrenciesDropDownWrapper = styled("div")(({ theme }) => ({
  gap: "10px",
  top: "67.5px",
  right: "78px",
  width: "114px",
  display: "flex",
  position: "absolute",
  visibility: "hidden",
  flexDirection: "column",
  ...dropDownAnimation,
  backgroundColor: theme.palette.background.default,
  border: "1px solid" + theme.palette.divider,
  [theme.breakpoints.down("md")]: {
    top: "55px",
    right: "0",
  },
}));

export const CurrencyItem = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: "20px",
  fontSize: "18px",
  fontWeight: "500",
  lineHeight: "28.8px",
  transition: "0.3s",

  "&.selected": {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const CartDropDownWrapper = styled("div")(({ theme }) => ({
  gap: "10px",
  top: "67.5px",
  right: "72px",
  width: "325px",
  display: "flex",
  position: "absolute",
  visibility: "hidden",
  flexDirection: "column",
  overflowY: "auto",
  maxHeight: "679px",
  ...dropDownAnimation,
  border: "1px solid" + theme.palette.divider,
  padding: "32px 16px",
  backgroundColor: theme.palette.background.default,
  "&::-webkit-scrollbar": {
    width: "5px",
    [theme.breakpoints.down("xs")]: {
      width: "5px",
    },
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    backgroundColor: theme.palette.mode === "dark" ? "#555" : "#EEE",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#EEE" : "#888",
    borderRadius: "50px",
  },
  [theme.breakpoints.down("md")]: {
    top: "55px",
    right: "0",
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
}));
