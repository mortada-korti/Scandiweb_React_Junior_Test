import { Link } from "react-router-dom";

// GraphQL
import { ProductType } from "../../GraphQL/products";

// Icons
import CartIcon from "../../icons/CartIcon";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Styles
import {
  CardImg,
  CardInfo,
  CardPrice,
  CardTitle,
  CardWrapper,
  CartIconWrapper,
} from "./style";
import { addToCart } from "../../redux/cartSlice";

const Card = ({
  id,
  name,
  inStock,
  gallery,
  prices,
  category,
  brand,
  description,
  attributes,
}: ProductType) => {
  // Redux
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  // console.log(cart);
  const currenyIndex = prices.findIndex(
    (e) => e.currency.symbol === selectedCurrency.symbol
  );
  return (
    <CardWrapper>
      {/* CARD IMAGE */}
      <CardImg className={`${inStock ? "" : "out-of-stock"}`}>
        <Link to={`/${category}/${id}`}>
          <img src={gallery[0]} alt='product' />
        </Link>

        <CartIconWrapper
          className='cart-icon'
          onClick={() =>
            dispatch(
              addToCart({
                id: id,
                name: name,
                prices: prices,
                gallery: gallery,
                category: category,
                inStock: inStock,
                brand: brand,
                description: description,
                attributes: attributes,
              })
            )
          }>
          <CartIcon />
        </CartIconWrapper>
      </CardImg>

      {/* CARD INFO */}
      <CardInfo>
        <CardTitle>{name}</CardTitle>
        <CardPrice>
          {prices[currenyIndex].currency?.symbol}
          {prices[currenyIndex]?.amount}
        </CardPrice>
      </CardInfo>
    </CardWrapper>
  );
};

export default Card;
