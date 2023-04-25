import { Link } from "react-router-dom";

// GraphQL
import { ProductType } from "../../GraphQL/products";

// Icons
import CartIcon from "../../icons/CartIcon";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToCart } from "../../redux/cartSlice";

// Functions
import { getCurrencyIndex } from "../../functions";

// @mui
import { Stack } from "@mui/material";

// Styles
import {
  CardImg,
  CardPrice,
  CardTitle,
  CardWrapper,
  CartIconWrapper,
} from "./style";

type Props = {
  product: ProductType;
};

const Card = ({ product }: Props) => {
  // Redux
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const currencyIndex = getCurrencyIndex(selectedCurrency, undefined, product);

  return (
    <CardWrapper>
      {/* CARD IMAGE */}
      <CardImg className={`${product.inStock ? "" : "out-of-stock"}`}>
        <Link to={`/${product.category}/${product.id}`}>
          <img src={product.gallery[0]} alt='product' />
        </Link>

        <CartIconWrapper
          className='cart-icon'
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                name: product.name,
                prices: product.prices,
                gallery: product.gallery,
                category: product.category,
                inStock: product.inStock,
                brand: product.brand,
                description: product.description,
                attributes: product.attributes,
              })
            )
          }>
          <CartIcon />
        </CartIconWrapper>
      </CardImg>

      {/* CARD INFO */}
      <Stack>
        <CardTitle>{product.name}</CardTitle>
        <CardPrice>
          {product.prices[currencyIndex ?? 0].currency?.symbol}
          {product.prices[currencyIndex ?? 0]?.amount}
        </CardPrice>
      </Stack>
    </CardWrapper>
  );
};

export default Card;
