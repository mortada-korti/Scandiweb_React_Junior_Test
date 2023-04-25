import { styled } from "@mui/material";

export const TextInput = styled("div")<any>(({ theme, w, h, fs, lh }) => ({
  "&.radio-container": {
    display: "inline-block",
    position: "relative",
    textAlign: "center",
    minWidth: w,
    height: h,
  },

  "&.radio-container input[type='radio']": {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
    transform: "translate(-50%, -50%)",
    zIndex: 999,
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
  },

  "&.radio-container label": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    border: "1px solid" + theme.palette.text.primary,
    fontSize: fs ?? "16px",
    textAlign: "center",
    fontFamily: "Source Sans Pro, sans-serif",
    cursor: "pointer",
    letterSpacing: "50%",
    fontWeight: "400",
    lineHeight: lh ?? "18px",
    transition: "0.2s ease-in-out",
  },

  "&.radio-container input[type='radio']:checked + label": {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.mode === "dark" ? "#000" : "#FFF",
  },
}));
