import { styled, Box } from "@mui/material";

export const Input = styled(Box)<any>(({ theme, value, w, h }) => ({
  position: "relative",
  "& .visually-hidden": {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 1,
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    opacity: "0",
    overflow: "hidden",
  },

  /* Style the label to look like a square */
  "& label": {
    display: "inline-block",
    width: w,
    height: h,
    backgroundColor: value,
    border:
      theme.palette.mode === "dark"
        ? "none"
        : `1px solid ${value === "#FFFFFF" ? "black" : "transparent"}`,
    cursor: "pointer",
    position: "relative",
  },

  // /* Style the label when the radio button is checked */
  ".visually-hidden:checked + label": {
    "&::after": {
      content: "''",
      width: `calc(${w} + 2px)`,
      height: `calc(${h} + 2px)`,
      border: "1px solid" + theme.palette.primary.main,
      position: "absolute",
      transform: "translate(-50%, -50%)",
      top: "50%",
      left: "50%",
      zIndex: 999,
    },
  },
}));
