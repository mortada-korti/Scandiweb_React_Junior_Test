import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Components
import CartProduct from "./CartProduct";
import CartFooter from "./CartFooter";

// Functions
import { getCurrencyIndex } from "../../functions";

// @mui
import { Stack } from "@mui/material";

// Styles
import { AddToCartButton, CustomTitle } from "../product/style";
import { PageContainer } from "../../shared/style";
import { CartTitle } from "./style";

const Cart = () => {
  const navigate = useNavigate();
  // Redux
  const cart = useSelector((state: RootState) => state.cart);
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const currencyIndex = getCurrencyIndex(selectedCurrency, cart);

  return (
    <PageContainer>
      {/* IF CART IS EMPTY */}
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
          {/* CART HEADER */}
          <CartTitle>CART</CartTitle>

          {/* CART PRODUCTS */}
          {cart.items.map((item, index) => (
            <CartProduct
              key={index}
              currencyIndex={currencyIndex ?? 0}
              quantity={item.quantity}
              product={item.product}
            />
          ))}

          {/* CART FOOTER */}
          <CartFooter
            currencyIndex={currencyIndex ?? 0}
            cart={cart}
            selectedCurrency={selectedCurrency}
          />
        </>
      )}
    </PageContainer>
  );
};

export default Cart;
