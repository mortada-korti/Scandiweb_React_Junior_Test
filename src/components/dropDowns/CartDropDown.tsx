import { useNavigate } from "react-router-dom";
import { CartDropDownWrapper } from "./style";
import { Typography, Stack, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  AddToCartButton,
  CustomTitle,
  ProductHeader,
  ProductPrice,
  ViewBagButton,
} from "../../pages/product/style";
import { AttributeItemsContainer, AttributeTitle } from "../attributes/style";
import { Input } from "../attributes/Swatch";
import { RadioInput } from "../attributes/Text";
import {
  CartProductGallery,
  CartProductImg,
  HandleQuantity,
  QuantityAction,
} from "../../pages/cart/style";
import ArrowLefIcon from "../../icons/ArrowLefIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { useState } from "react";
import { styled } from "@mui/material";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { AttributeType, PriceType } from "../../GraphQL/products";
type Props = {
  isCartToggled: boolean;
};

const CartDropDown = ({ isCartToggled }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const currencyIndex = cart.items.map((item) =>
    item.product.prices.findIndex(
      (e) => e.currency.symbol === selectedCurrency.symbol
    )
  )[0];
  let totalQuantity = 0;
  let totalPrice = 0;
  cart.items.map((item) => (totalQuantity += item.quantity));
  cart.items.map(
    (item) =>
      (totalPrice +=
        item.quantity * parseFloat(item.product.prices[currencyIndex].amount))
  );

  return (
    <CartDropDownWrapper className={`${isCartToggled ? "active" : ""}`}>
      {cart.items.length === 0 ? (
        <Stack gap='20px'>
          <CustomTitle fw='700' fs='20px' lh='20px'>
            Your Cart is Empty
          </CustomTitle>
          <ViewBagButton onClick={() => navigate("/cart")} p='20px'>
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
            {totalQuantity > 0 && (
              <CustomTitle lh='25.6px' fw='500'>
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
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
                              <Input
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
                              </Input>
                            ))
                          : attribute.items.map((itm, index) => (
                              <RadioInput
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
                              </RadioInput>
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
                    <img
                      src={item.product.gallery[imgIndex]}
                      alt=''
                      style={{
                        width: "inherit",
                        height: "inherit",
                        objectFit: "contain",
                        backgroundColor: "white",
                      }}
                    />
                  </CartProductImg>
                </Stack>
              </Stack>
            ))}
            <Stack direction='row' justifyContent='space-between' mb='34px'>
              <Typography fontWeight='500'>Total</Typography>
              <Typography fontFamily='Raleway, sans-serif' fontWeight='700'>
                {selectedCurrency.symbol}
                {totalPrice.toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction='row' gap='12px'>
            <ViewBagButton
              p='13px'
              sx={{ flex: 1 }}
              onClick={() => navigate("/cart")}>
              View bag
            </ViewBagButton>
            <AddToCartButton
              onClick={() => navigate("/cart")}
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
