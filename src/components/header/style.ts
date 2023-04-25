import { styled } from "@mui/material";

export const HeaderWrapper = styled("header")(({ theme }) => ({
  height: "80px",
  display: "flex",
  position: "relative",
  padding: "24px 101px 0",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    height: "65px",
    padding: "12px 5px",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 999,
  },
}));

export const Navigation = styled("nav")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const NavItem = styled("div")(({ theme }) => ({
  position: "relative",
  textTransform: "uppercase",
  padding: "4px 16px 32px 16px",
  "& a.active": {
    fontWeight: "600",
    color: theme.palette.primary.main,
    "&::after": {
      content: "''",
      width: "100%",
      height: "2px",
      left: 0,
      bottom: 0,
      position: "absolute",
      backgroundColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down("md")]: {
    padding: "14px",
  },
}));

export const LogoImg = styled("div")(({ theme }) => ({
  width: "41px",
  height: "41px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Actions = styled("div")(({ theme }) => ({
  gap: "22px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  padding: "5.5px 0px",
  [theme.breakpoints.down("md")]: {
    paddingRight: "8px",
  },
}));

export const CurrencyIcon = styled("div")(({ theme }) => ({
  gap: "10px",
  width: "40px",
  cursor: "pointer",
  display: "flex",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "28.8px",
  alignItems: "center",
  justifyContent: "flex-end",
  color: theme.palette.text.primary,
}));

export const MobileMenuIcon = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
