import { Input } from "../../components/attributes/Swatch";
import { RadioInput } from "../../components/attributes/Text";
import {
  AttributeItemsContainer,
  AttributeTitle,
} from "../../components/attributes/style";
import { CustomTitle, ProductHeader, ProductPrice } from "../product/style";
import { Stack, Box, styled } from "@mui/material";
import {
  CartPorductWrapper,
  CartProductGallery,
  CartProductImg,
  HandleQuantity,
  QuantityAction,
} from "./style";
import ArrowLefIcon from "../../icons/ArrowLefIcon";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { useState } from "react";

type Props = {
  currencyIndex: number;
  quantity: number;
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  category: string;
  description: string;
  attributes: {
    id: string;
    name: string;
    type: string;
    items: {
      id: string;
      value: string;
      displayValue: string;
    }[];
  }[];
  prices: {
    currency: {
      symbol: string;
    };
    amount: string;
  }[];
  brand: string;
};

const CartProduct = ({
  currencyIndex,
  id,
  name,
  inStock,
  gallery,
  category,
  attributes,
  prices,
  description,
  brand,
  quantity,
}: Props) => {
  const dispatch = useDispatch();
  const [imgIndex, setImgIndex] = useState<number>(0);
  const forwardImg = (index: number) => {
    if (index === gallery.length - 1) {
      setImgIndex(0);
    }
    setImgIndex((prevIndex) => prevIndex + 1);
  };
  const backwardImg = (index: number) => {
    if (index === 0) {
      setImgIndex(gallery.length - 1);
    }
    setImgIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <CartPorductWrapper>
      <Container>
        {/* PRODUCT HEADER */}
        <ProductHeader gap='16px' mb='4px' txtalign='center'>
          <CustomTitle fs='30px' fw='600' lh='27px'>
            {brand}
          </CustomTitle>
          <CustomTitle fs='30px' lh='27px'>
            {name}
          </CustomTitle>
        </ProductHeader>

        {/* PRODUCT PRICE */}
        <CustomTitle fs='24px' lh='24px' fw='700' mb='4px'>
          {prices[currencyIndex].currency.symbol}
          {prices[currencyIndex].amount}
        </CustomTitle>

        {attributes.map((attribute, index) => (
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
                    <Input key={index} value={item.value} w='32px' h='32px'>
                      <input
                        type='radio'
                        id={`custom-radio-${item.id}`}
                        name='radio-group'
                        className='visually-hidden'
                      />
                      <label htmlFor={`custom-radio-${item.id}`}></label>
                    </Input>
                  ))
                : attribute.items.map((item, index) => (
                    <RadioInput
                      w='63px'
                      h='45px'
                      className='radio-container'
                      key={index}>
                      <input type='radio' name={`${attribute.name}${id}`} />
                      <label>{item.value}</label>
                    </RadioInput>
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
                  id,
                  name,
                  description,
                  prices,
                  inStock,
                  attributes,
                  gallery,
                  brand,
                  category,
                })
              )
            }
          />
          <Box sx={{ fontWeight: "500", fontSize: "24px" }}>{quantity}</Box>
          <QuantityAction
            className='remove'
            size='45px'
            onClick={() => dispatch(removeFromCart(id))}
          />
        </HandleQuantity>
        <CartProductImg width='200px' height='288px'>
          <img
            src={gallery[imgIndex]}
            alt=''
            style={{
              width: "inherit",
              height: "inherit",
              objectFit: "contain",
              backgroundColor: "white",
            }}
          />
          {gallery.length > 1 && (
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
