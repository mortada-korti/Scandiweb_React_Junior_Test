import { useNavigate } from "react-router-dom";

// Redux
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// GraphQL
import { AttributeType, PriceType } from "../../GraphQL/products";

// Functions
import {
  getCurrencyIndex,
  getTotalPriceBeforeTax,
  getTotalQuantity,
} from "../../functions";

// @mui
import { Typography, Stack } from "@mui/material";

// Styles
import { CartDropDownWrapper } from "./style";
import { CartProductImg, QuantityAction } from "../../pages/cart/style";
import { SwatchInput } from "../attributes/Swatch";
import { TextInput } from "../attributes/Text";
import {
  AddToCartButton,
  CustomTitle,
  ProductHeader,
  ViewBagButton,
} from "../../pages/product/style";

type Props = {
  isCartToggled: boolean;
  setIsCartToggled: (value: boolean) => void;
};

const CartDropDown = ({ isCartToggled, setIsCartToggled }: Props) => {
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const currencyIndex = getCurrencyIndex(selectedCurrency, cart) ?? 0;

  return (
    <CartDropDownWrapper className={`${isCartToggled ? "active" : ""}`}>
      {/* IF CART IS EMPTY */}
      {cart.items.length === 0 ? (
        <Stack gap='20px'>
          <CustomTitle fw='700' fs='20px' lh='20px'>
            Your Cart is Empty
          </CustomTitle>
          <ViewBagButton
            onClick={() => {
              navigate("/cart"), setIsCartToggled(false);
            }}
            p='20px'>
            View Bag
          </ViewBagButton>
        </Stack>
      ) : (
        <>
          {/* MINI CART TITLEs */}
          <Stack direction='row'>
            <CustomTitle lh='25.6px' fw='700'>
              My Bag.
            </CustomTitle>
            {getTotalQuantity(cart) > 0 && (
              <CustomTitle lh='25.6px' fw='500'>
                {getTotalQuantity(cart)}
                {getTotalQuantity(cart) === 1 ? "item" : "items"}
              </CustomTitle>
            )}
          </Stack>

          {/* MINI CART PRODUCTS */}
          <Stack gap='40px'>
            {cart.items.map((item, index) => (
              <Stack
                direction='row'
                gap='20px'
                key={index}
                justifyContent='space-between'
                alignItems='center'>
                <Stack gap='4px'>
                  {/* PRODUCT HEADER */}
                  <ProductHeader gap='4px' txtalign='left'>
                    <CustomTitle lh='25.6px'>{item.product.brand}</CustomTitle>
                    <CustomTitle lh='25.6px'>{item.product.name}</CustomTitle>
                  </ProductHeader>

                  <CustomTitle lh='25.6px' fw='500' mb='4px'>
                    {item.product.prices[currencyIndex].currency.symbol}
                    {item.product.prices[currencyIndex].amount}
                  </CustomTitle>

                  {/* ATTRIBUTES */}
                  {item.product.attributes.map((attribute, index) => (
                    <Stack key={index} gap='8px'>
                      {/* ATTRIBUTE NAME */}
                      <CustomTitle fs='14px' lh='16px'>
                        {attribute.name}:
                      </CustomTitle>

                      {/* ATTRIBUTE CONTAINER */}
                      <Stack direction='row' flexWrap='wrap' gap='8px'>
                        {attribute.type === "swatch"
                          ? attribute.items.map((item, index) => (
                              <SwatchInput
                                key={index}
                                value={item.value}
                                w='24px'
                                h='24px'>
                                <input
                                  type='radio'
                                  id={`custom-radio-${item.id}`}
                                  name='radio-group'
                                  className='visually-hidden'
                                />
                                <label
                                  htmlFor={`custom-radio-${item.id}`}></label>
                              </SwatchInput>
                            ))
                          : attribute.items.map((itm, index) => (
                              <TextInput
                                w='24px'
                                h='24px'
                                fs='14px'
                                lh='22.4px'
                                className='radio-container'
                                key={index}>
                                <input
                                  type='radio'
                                  name={`${attribute.name}${item.product.id}`}
                                />
                                <label>{itm.value}</label>
                              </TextInput>
                            ))}
                      </Stack>
                    </Stack>
                  ))}
                </Stack>

                <Stack direction='row' gap='8px'>
                  <Stack
                    direction='column'
                    justifyContent='space-between'
                    alignItems='center'>
                    <QuantityAction
                      className='add'
                      size='24px'
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item.product.id as string,
                            name: item.product.name as string,
                            description: item.product.description as string,
                            prices: item.product.prices as PriceType[],
                            inStock: item.product.inStock as boolean,
                            attributes: item.product
                              .attributes as AttributeType[],
                            gallery: item.product.gallery as string[],
                            brand: item.product.brand as string,
                            category: item.product.category as string,
                          })
                        )
                      }
                    />
                    <CustomTitle fw='500' lh='25.6px'>
                      {item.quantity}
                    </CustomTitle>
                    <QuantityAction
                      className='remove'
                      size='24px'
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                    />
                  </Stack>
                  <CartProductImg width='121px' height='190px'>
                    <img src={item.product.gallery[0]} alt='product-img' />
                  </CartProductImg>
                </Stack>
              </Stack>
            ))}
            <Stack direction='row' justifyContent='space-between' mb='34px'>
              <Typography fontWeight='500'>Total</Typography>
              <Typography fontFamily='Raleway, sans-serif' fontWeight='700'>
                {selectedCurrency.symbol}
                {getTotalPriceBeforeTax(cart, currencyIndex)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap='12px'>
            <ViewBagButton
              p='13px'
              sx={{ flex: 1 }}
              onClick={() => {
                navigate("/cart"), setIsCartToggled(false);
              }}>
              View bag
            </ViewBagButton>
            <AddToCartButton
              onClick={() => {
                navigate("/cart"), setIsCartToggled(false);
              }}
              p='13px'
              sx={{ flex: 1 }}>
              checkout
            </AddToCartButton>
          </Stack>
        </>
      )}
    </CartDropDownWrapper>
  );
};

export default CartDropDown;
