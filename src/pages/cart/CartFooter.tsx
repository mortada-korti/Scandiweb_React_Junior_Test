// Redux
import { CartState } from "../../redux/cartSlice";
import { currencyState } from "../../redux/currencySlice";

// Functions
import {
  getTax,
  getTotalPriceAfterTax,
  getTotalQuantity,
} from "../../functions";

// @mui
import { Stack, Typography, styled } from "@mui/material";

// Styles
import { CartFooterWrapper } from "./style";
import { AddToCartButton } from "../product/style";

type Props = {
  cart: CartState;
  selectedCurrency: currencyState;
  currencyIndex: number;
};

const CartFooter = ({ cart, selectedCurrency, currencyIndex }: Props) => {
  return (
    <CartFooterWrapper>
      <Container>
        {/* TAX */}
        <Stack direction='row'>
          <Typography component='span' className='title'>
            Tax 21%:
          </Typography>
          <Typography component='span' className='value'>
            {selectedCurrency.symbol}
            {getTax(cart, currencyIndex)}
          </Typography>
        </Stack>

        {/* QUANTITY */}
        <Stack direction='row'>
          <Typography component='span' className='title'>
            Quantity:
          </Typography>
          <Typography component='span' className='value'>
            {getTotalQuantity(cart)}
          </Typography>
        </Stack>

        {/* Total */}
        <Stack direction='row' mb='8px'>
          <Typography component='span' className='total'>
            Total:
          </Typography>
          <Typography component='span' className='value'>
            {selectedCurrency.symbol}
            {getTotalPriceAfterTax(cart, currencyIndex)}
          </Typography>
        </Stack>

        {/* ORDER BUTTON */}
        <AddToCartButton p='13px' w='100%' mx='0'>
          Order
        </AddToCartButton>
      </Container>
    </CartFooterWrapper>
  );
};

export default CartFooter;

export const Container = styled(Stack)(({ theme }) => ({
  gap: "8px",
  width: "279px",
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
}));
