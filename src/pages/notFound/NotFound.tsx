import { styled } from "@mui/material";
import { PageContainer } from "../../shared/style";
import { CustomTitle } from "../product/style";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <Container>
      <CustomTitle
        sx={{ color: "primary.main", fontWeight: "700", fontSize: "50px" }}>
        404
      </CustomTitle>
      <CustomTitle sx={{ fontWeight: "500", fontSize: "30px" }}>
        Page Not Found
      </CustomTitle>
    </Container>
  );
};

export default NotFound;

const Container = styled(PageContainer)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "50px",
}));
