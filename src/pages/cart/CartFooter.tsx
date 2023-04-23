import { Stack, Typography, styled } from "@mui/material";
import { CartFooterWrapper } from "./style";
import { AddToCartButton } from "../product/style";
import { CartState } from "../../redux/cartSlice";
import { currencyState } from "../../redux/currencySlice";

type Props = {
  cart: CartState;
  selectedCurrency: currencyState;
  currencyIndex: number;
};

const CartFooter = ({ cart, selectedCurrency, currencyIndex }: Props) => {
  const getTotalBeforeTax = () => {
    let totalBeforeTax = 0;
    cart.items.map(
      (item) =>
        (totalBeforeTax +=
          item.quantity * parseFloat(item.product.prices[currencyIndex].amount))
    );
    return parseFloat(totalBeforeTax.toFixed(2));
  };

  const getTotalQuantity = () => {
    let totalQuantity = 0;
    cart.items.map((item) => (totalQuantity += item.quantity));
    return totalQuantity;
  };

  const getTax = () => {
    return (21 * getTotalBeforeTax()) / 100;
  };

  const getTotalAfterTax = () => {
    return (getTotalBeforeTax() + getTax()).toFixed(2);
  };
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
            {getTax().toFixed(2)}
          </Typography>
        </Stack>

        {/* QUANTITY */}
        <Stack direction='row'>
          <Typography component='span' className='title'>
            Quantity:
          </Typography>
          <Typography component='span' className='value'>
            {getTotalQuantity()}
          </Typography>
        </Stack>

        {/* Total */}
        <Stack direction='row' mb='8px'>
          <Typography component='span' className='total'>
            Total:
          </Typography>
          <Typography component='span' className='value'>
            {selectedCurrency.symbol}
            {getTotalAfterTax()}
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
