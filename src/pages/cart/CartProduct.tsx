import { useState } from "react";

// Attributes
import { SwatchInput } from "../../components/attributes/Swatch";
import { TextInput } from "../../components/attributes/Text";

// Redux
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

// @mui
import { Stack, Box, styled } from "@mui/material";

// Icons
import ArrowLefIcon from "../../icons/ArrowLefIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";

// Styles
import { CustomTitle, ProductHeader } from "../product/style";
import { ProductType } from "../../GraphQL/products";
import {
  CartPorductWrapper,
  CartProductGallery,
  CartProductImg,
  HandleQuantity,
  QuantityAction,
} from "./style";

type Props = {
  product: ProductType;
  currencyIndex: number;
  quantity: number;
};

const CartProduct = ({ currencyIndex, quantity, product }: Props) => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState<number>(0);
  const forwardImg = (index: number) => {
    if (index === product.gallery.length - 1) {
      setImgIndex(0);
    }
    setImgIndex((prevIndex) => prevIndex + 1);
  };
  const backwardImg = (index: number) => {
    if (index === 0) {
      setImgIndex(product.gallery.length - 1);
    }
    setImgIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <CartPorductWrapper>
      <Container>
        {/* PRODUCT HEADER */}
        <ProductHeader gap='16px' mb='4px' txtalign='center'>
          <CustomTitle fs='30px' fw='600' lh='27px'>
            {product.brand}
          </CustomTitle>
          <CustomTitle fs='30px' lh='27px'>
            {product.name}
          </CustomTitle>
        </ProductHeader>

        {/* PRODUCT PRICE */}
        <CustomTitle fs='24px' lh='24px' fw='700' mb='4px'>
          {product.prices[currencyIndex].currency.symbol}
          {product.prices[currencyIndex].amount}
        </CustomTitle>

        {product.attributes.map((attribute, index) => (
          <Stack key={index} gap='8px'>
            {/* ATTRIBUTE NAME */}
            <CustomTitle
              fw='700'
              fs='18px'
              lh='18px'
              ff='Roboto Condensed, sans-serif'>
              {attribute.name}:
            </CustomTitle>

            {/* ATTRIBUTE CONTAINER */}
            <AttributeContainer>
              {attribute.type === "swatch"
                ? attribute.items.map((item, index) => (
                    <SwatchInput
                      key={index}
                      value={item.value}
                      w='32px'
                      h='32px'>
                      <input
                        type='radio'
                        id={`custom-radio-${item.id}`}
                        name='radio-group'
                        className='visually-hidden'
                      />
                      <label htmlFor={`custom-radio-${item.id}`}></label>
                    </SwatchInput>
                  ))
                : attribute.items.map((item, index) => (
                    <TextInput
                      w='63px'
                      h='45px'
                      className='radio-container'
                      key={index}>
                      <input
                        type='radio'
                        name={`${attribute.name}${product.id}`}
                      />
                      <label>{item.value}</label>
                    </TextInput>
                  ))}
            </AttributeContainer>
          </Stack>
        ))}
      </Container>

      <CartProductGallery gap='24px'>
        <HandleQuantity>
          <QuantityAction
            className='add'
            size='45px'
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  description: product.description,
                  prices: product.prices,
                  inStock: product.inStock,
                  attributes: product.attributes,
                  gallery: product.gallery,
                  brand: product.brand,
                  category: product.category,
                })
              )
            }
          />
          <Box sx={{ fontWeight: "500", fontSize: "24px" }}>{quantity}</Box>
          <QuantityAction
            className='remove'
            size='45px'
            onClick={() => dispatch(removeFromCart(product.id))}
          />
        </HandleQuantity>
        <CartProductImg width='200px' height='288px'>
          <img src={product.gallery[imgIndex]} alt='product-img' />
          {product.gallery.length > 1 && (
            <span className='arrows'>
              <span onClick={() => backwardImg(imgIndex)}>
                <ArrowLefIcon />
              </span>
              <span onClick={() => forwardImg(imgIndex)}>
                <ArrowRightIcon />
              </span>
            </span>
          )}
        </CartProductImg>
      </CartProductGallery>
    </CartPorductWrapper>
  );
};

export default CartProduct;

const Container = styled(Stack)(({ theme }) => ({
  gap: "16px",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

const AttributeContainer = styled(Stack)(({ theme }) => ({
  gap: "8px",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
  },
}));
