import { useParams } from "react-router-dom";
import { useState } from "react";

// Parser
import parse from "html-react-parser";

// GraphQL
import { useQuery } from "@apollo/client";
import { addToCart } from "../../redux/cartSlice";
import {
  AttributeType,
  GET_PRODUCT_INFO,
  PriceType,
  ProductInfoType,
} from "../../GraphQL/products";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Pages
import NotFound from "../notFound/NotFound";

// @mui
import { Skeleton, Stack } from "@mui/material";

// Styles
import { SwatchInput } from "../../components/attributes/Swatch";
import { TextInput } from "../../components/attributes/Text";
import {
  AttributeItemsContainer,
} from "../../components/attributes/style";
import {
  AddToCartButton,
  CustomTitle,
  GalleryContainer,
  LargeImgContainer,
  ProductContainer,
  ProductDescription,
  ProductHeader,
  ProductInfo,
  SmallImgsContainer,
} from "./style";

const Product = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  // GraphQL
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const { loading, error, data } = useQuery<ProductInfoType>(GET_PRODUCT_INFO, {
    variables: { id: productId },
  });
  const [imgSelected, setImgSelected] = useState<string | undefined>(
    data?.product?.gallery[0]
  );
  let currencyIndex = 0;

  // Define Selected img & currency
  if (data && data.product !== null) {
    currencyIndex = data?.product.prices.findIndex(
      (e) => e.currency.symbol === selectedCurrency.symbol
    );
  }
  const skeletonData = Array.from({ length: 5 });
  if (data?.product === null) return <NotFound />;
  return (
    <ProductContainer>
      <GalleryContainer>
        {/* SMALL IMAGES */}
        <SmallImgsContainer>
          {loading
            ? skeletonData.map((item, index) => (
                <Skeleton key={index} width='80px' height='100px' />
              ))
            : data?.product?.gallery.map((img, index) => (
                <div key={index} onClick={() => setImgSelected(img)}>
                  <img
                    src={img}
                    alt=''
                    className={`${imgSelected === img ? "selected" : ""} ${
                      index === 0 && imgSelected === undefined ? "selected" : ""
                    }`}
                  />
                </div>
              ))}
        </SmallImgsContainer>

        {/* LARGE IMAGE */}
        <LargeImgContainer>
          {loading ? (
            <Skeleton width='100%' height='100%' />
          ) : (
            <img
              style={{ backgroundColor: "white" }}
              src={imgSelected ? imgSelected : data?.product?.gallery[0]}
              alt=''
            />
          )}
        </LargeImgContainer>
      </GalleryContainer>

      {/* PRODUCT INFO */}
      <ProductInfo>
        {/* PRODUCT HEADER */}
        <ProductHeader gap='16px' mb='43px' txtalign='center'>
          {loading ? (
            <Skeleton height='100px' />
          ) : (
            <>
              <CustomTitle fs='30px' fw='600' lh='27px'>
                {data?.product.brand}
              </CustomTitle>
              <CustomTitle fs='30px' lh='27px'>
                {data?.product.name}
              </CustomTitle>
            </>
          )}
        </ProductHeader>

        {/* ATTRIBUTES */}
        <Stack
          sx={{
            gap: "24px",
            marginBottom: "38px",
          }}>
          {data?.product.attributes.map((attribute, index) => (
            <Stack key={index} gap='8px'>
              {/* ATTRIBUTE NAME */}
              {loading ? (
                <Skeleton height='50px' />
              ) : (
                <CustomTitle
                  fs='18px'
                  lh='18px'
                  fw='700'
                  ff='Roboto Condensed, sans-serif'>
                  {attribute.name}:
                </CustomTitle>
              )}

              {/* ATTRIBUE CONTAINER */}
              <AttributeItemsContainer
                gap={`${attribute.type === "swatch" ? "8px" : "12px"}`}>
                {attribute.type === "swatch"
                  ? attribute.items.map((item, index) =>
                      loading ? (
                        "loading"
                      ) : (
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
                      )
                    )
                  : attribute.items.map((item, index) =>
                      loading ? (
                        <Skeleton key={index} width='63px' height='45px' />
                      ) : (
                        <TextInput
                          className='radio-container'
                          w='63px'
                          h='45px'
                          key={index}>
                          <input type='radio' name={`${attribute.name}`} />
                          <label>{item.value}</label>
                        </TextInput>
                      )
                    )}
              </AttributeItemsContainer>
            </Stack>
          ))}
        </Stack>

        {/* PRODUCT PRICE */}
        <Stack gap='10px' marginBottom='20px'>
          {loading ? (
            <Skeleton />
          ) : (
            <CustomTitle
              fs='18px'
              lh='18px'
              ff='Roboto Condensed, sans-serif'
              fw='700'>
              Price:
            </CustomTitle>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <CustomTitle fs='24px' lh='18px' fw='700'>
              {data?.product.prices[currencyIndex ?? 0].currency.symbol}
              {data?.product.prices[currencyIndex ?? 0].amount}
            </CustomTitle>
          )}
        </Stack>
        {loading ? (
          <Skeleton height='100px' />
        ) : data?.product.inStock ? (
          <AddToCartButton
            w='100%'
            p='16px'
            mx='auto'
            mb='40px'
            onClick={() =>
              dispatch(
                addToCart({
                  id: data?.product.id as string,
                  name: data?.product.name as string,
                  description: data?.product.description as string,
                  prices: data?.product.prices as PriceType[],
                  inStock: data?.product.inStock as boolean,
                  attributes: data?.product.attributes as AttributeType[],
                  gallery: data?.product.gallery as string[],
                  brand: data?.product.brand as string,
                  category: data?.product.category as string,
                })
              )
            }>
            Add to cart
          </AddToCartButton>
        ) : (
          <AddToCartButton
            w='100%'
            p='16px'
            mx='auto'
            mb='40px'
            className='out-of-stock'>
            out of stock
          </AddToCartButton>
        )}
        {loading ? (
          <Skeleton height='200px' />
        ) : (
          <ProductDescription>
            {parse(data?.product.description || "")}
          </ProductDescription>
        )}
      </ProductInfo>
    </ProductContainer>
  );
};

export default Product;
