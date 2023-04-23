import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { PageContainer } from "../../shared/style";
import { CartTitle } from "./style";
import {
  AddToCartButton,
  CustomTitle,
  ProductName,
  ProductPrice,
  ViewBagButton,
} from "../product/style";
import { Box, Stack, Typography } from "@mui/material";
import {
  AttributeItemsContainer,
  AttributeTitle,
} from "../../components/attributes/style";
import { Input } from "../../components/attributes/Swatch";
import { RadioInput } from "../../components/attributes/Text";
import CartProduct from "./CartProduct";
import CartFooter from "./CartFooter";
import { useNavigate } from "react-router-dom";

type Props = {};

const Cart = (props: Props) => {
  const cart = useSelector((state: RootState) => state.cart);
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const currencyIndex = cart.items.map((item) =>
    item.product.prices.findIndex(
      (e) => e.currency.symbol === selectedCurrency.symbol
    )
  )[0];
  const navigate = useNavigate();

  return (
    <PageContainer>
      {cart.items.length === 0 ? (
        <Stack gap='50px'>
          <CustomTitle fw='700' fs='50px' lh='50px'>
            Your Cart is Empty
          </CustomTitle>
          <AddToCartButton onClick={() => navigate("/all")} p='20px'>
            Continue Shopping
          </AddToCartButton>
        </Stack>
      ) : (
        <>
          <CartTitle>CART</CartTitle>

          {cart.items.map((item, index) => (
            <CartProduct
              key={index}
              currencyIndex={currencyIndex}
              brand={item.product.brand}
              name={item.product.name}
              attributes={item.product.attributes}
              inStock={item.product.inStock}
              prices={item.product.prices}
              gallery={item.product.gallery}
              category={item.product.category}
              id={item.product.id}
              description={item.product.description}
              quantity={item.quantity}
            />
          ))}

          <CartFooter
            currencyIndex={currencyIndex}
            cart={cart}
            selectedCurrency={selectedCurrency}
          />
        </>
      )}
    </PageContainer>
  );
};

export default Cart;
