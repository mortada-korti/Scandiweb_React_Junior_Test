import { styled, Skeleton, Box, Typography, Button } from "@mui/material";

export const ProductContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "100px",
  padding: "80px 101px",
  [theme.breakpoints.down("lg")]: {
    padding: "40px 101px",
    flexDirection: "column",
  },
  [theme.breakpoints.down("md")]: {
    gap: "50px",
    padding: "40px 10px",
  },
}));

export const GalleryContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  height: "511px",
  // border: "1px solid red",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    justifyContent: "space-between",
    flexDirection: "column",
    height: "450px",
    gap: "0",
  },
}));

export const SmallImgsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  overflowY: "auto",
  overflowX: "hidden",
  padding: "0px 10px",
  // border: "1px solid yellow",
  [theme.breakpoints.down("lg")]: {
    width: "120px",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    width: "100%",
    height: "100px",
    overflowX: "auto",
    overflowY: "hidden",
    padding: "0px 0px 10px",
  },

  "&::-webkit-scrollbar": {
    width: "7px",
    height: "7px",
    [theme.breakpoints.down("xs")]: {
      height: "5px",
    },
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    backgroundColor: theme.palette.mode === "dark" ? "#555" : "#EEE",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#EEE" : "#888",
    borderRadius: "50px",
    width: "5px",
    height: "5px",
  },
  "& > div": {
    width: "80px",
    height: "80px",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      width: "120px",
    },
    "&:hover": {
      "& > img": {
        opacity: 1,
      },
    },
    "& img": {
      transition: "0.3s ease-in-out",
      opacity: 0.5,
      width: "inherit",
      height: "inherit",
      objectFit: "cover",
      "&.selected": {
        opacity: 1,
      },
    },
  },
}));

export const LargeImgContainer = styled("div")(({ theme }) => ({
  width: "610px",
  height: "100%",
  // border: "1px solid green",
  [theme.breakpoints.down("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    height: "330px",
  },
  "& img": {
    width: "inherit",
    height: "inherit",
    objectFit: "contain",
    [theme.breakpoints.down("xs")]: {
      objectFit: "cover",
    },
  },
}));

export const ProductInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "292px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    alingItems: "center",
    textAlign: "center",
  },
}));

export const ProductHeader = styled(Box)<any>(
  ({ theme, gap, mb, txtalign }) => ({
    display: "flex",
    flexDirection: "column",
    gap: gap ?? 0,
    marginBottom: mb ?? 0,
    [theme.breakpoints.down("sm")]: {
      textAlign: txtalign ?? "left",
    },
  })
);

export const CustomTitle = styled(Typography)<any>(
  ({ theme, fs, fw, lh, ff }) => ({
    fontSize: fs ?? "16px",
    fontWeight: fw ?? "400",
    lineHeight: lh ?? "16px",
    fontFamily: ff ?? "Raleway, sans-serif",
    color: theme.palette.text.primary,
  })
);

export const ProductName = styled("span")(({ theme }) => ({
  fontSize: "30px",
  fontWeight: "400",
  lineHeight: "27px",
}));

export const ProductPrice = styled(Typography)<any>(({ theme, lh }) => ({
  fontSize: "24px",
  fontWeight: "700",
  display: "block",
  marginBottom: "20px",
  lineHeight: lh,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

export const ProductDescription = styled("div")(({ theme }) => ({
  fontFamily: "Roboto, sans-serif",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "25.59px",
  height: "103px",
  width: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  "&::-webkit-scrollbar": {
    width: "7px",
    height: "7px",
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
}));

export const AddToCartButton = styled(Button)<any>(
  ({ theme, w, p, mx, mb }) => ({
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "uppercase",
    lineHeight: "19.2px",
    width: w,
    padding: p,
    textAlign: "center",
    border: "none",
    color: "#FFF",
    cursor: "pointer",
    transition: "0.3s",
    marginBottom: mb ?? "0px",
    borderRadius: 0,
    fontFamily: "Raleway, sans-serif",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&.out-of-stock": {
      backgroundColor: theme.palette.text.disabled,
      cursor: "not-allowed",
      PointerEvents: "none",
    },
    [theme.breakpoints.down("lg")]: {
      width: w,
      marginLeft: mx,
      marginRight: mx,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  })
);

export const ViewBagButton = styled(AddToCartButton)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "1px solid",
  color: theme.palette.mode === "dark" ? "white" : "black",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
    color: theme.palette.mode === "dark" ? "black" : "white",
  },
}));

export const LargeImgSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "610px",
  height: "511px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    height: "330px",
  },
}));

export const SmallImgSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "80px",
  height: "80px",
}));

export const ProductInfoSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "292px",
  height: "511px",
  [theme.breakpoints.down("lg")]: {
    width: "50%",
    margin: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
