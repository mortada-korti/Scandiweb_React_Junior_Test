import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/darkModeSlice";
import { RootState } from "../../redux/store";

// GraphQL
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES, CategoriesType } from "../../GraphQL/categories";

// Icons
import Logo from "../../assets/logo.svg";
import CartIcon from "../../icons/CartIcon";
import ArrowDownIcon from "../../icons/ArrowDownIcon";

// DropDowns
import MenuDropDown from "../dropDowns/MenuDropDown";
import CurrenciesDropDown from "../dropDowns/CurrenciesDropDown";
import CartDropDown from "../dropDowns/CartDropDown";

// @mui
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";

// Styles
import {
  Actions,
  CurrencyIcon,
  HeaderWrapper,
  LogoImg,
  MobileMenuIcon,
  NavItem,
  Navigation,
} from "./style";

const Header = () => {
  // Redux
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state: RootState) => state.currency);
  const cart = useSelector((state: RootState) => state.cart);
  let totalQuantity = 0;
  cart.items.map((item) => (totalQuantity += item.quantity));

  // Managing States
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isCurrenciesToggled, setIsCurrenciesToggled] =
    useState<boolean>(false);
  const [isCartToggled, setIsCartToggled] = useState<boolean>(false);

  // GraphQL
  const { loading, error, data } = useQuery<CategoriesType>(GET_ALL_CATEGORIES);

  // Refs
  const currencyRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // Handling Dropdowns
  useEffect(() => {
    const handleCurrenciesDropDown = (e: MouseEvent) => {
      const element = e.target as Element;
      if (!currencyRef.current?.contains(e.target as Node)) {
        setIsCurrenciesToggled(false);
      }
    };
    const handleCartDropDown = (e: MouseEvent) => {
      if (!cartRef.current?.contains(e.target as Node)) {
        setIsCartToggled(false);
      }
    };
    document.addEventListener("mousedown", handleCurrenciesDropDown);
    document.addEventListener("mousedown", handleCartDropDown);
    return () => {
      document.removeEventListener("mousedown", handleCurrenciesDropDown);
      document.removeEventListener("mousedown", handleCartDropDown);
    };
  }, []);

  return (
    <HeaderWrapper>
      {/* MENU FOR MOBILE SCREENS */}
      <MobileMenuIcon>
        {!isMenuToggled && (
          <IconButton onClick={() => setIsMenuToggled(true)}>
            <MenuIcon />
          </IconButton>
        )}
        {isMenuToggled && (
          <IconButton onClick={() => setIsMenuToggled(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </MobileMenuIcon>

      {isMenuToggled && <MenuDropDown isMenuToggled={isMenuToggled} setIsMenuToggled={setIsMenuToggled} />}

      {/* NAVIGATION LINKS */}
      <Navigation>
        {data?.categories.map((category, index) => (
          <NavItem key={index}>
            <NavLink to={`${category.name}`}>{category.name}</NavLink>
          </NavItem>
        ))}
      </Navigation>

      {/* SITE LOGO */}
      <LogoImg onClick={() => dispatch(toggleDarkMode())} className='logo'>
        <img src={Logo} alt='logo' />
      </LogoImg>

      {/* ACTIONS */}
      <Actions>
        {/* CURRENCY */}
        <div ref={currencyRef}>
          <CurrencyIcon
            onClick={() => setIsCurrenciesToggled(!isCurrenciesToggled)}>
            {selectedCurrency.symbol} <ArrowDownIcon />
          </CurrencyIcon>
          <CurrenciesDropDown isCurrenciesToggled={isCurrenciesToggled} />
        </div>

        {/* CART */}
        <div className='mini-cart' ref={cartRef}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setIsCartToggled(!isCartToggled)}>
            <Badge badgeContent={totalQuantity} showZero color='secondary'>
              <CartIcon />
            </Badge>
          </div>
          <CartDropDown
            setIsCartToggled={setIsCartToggled}
            isCartToggled={isCartToggled}
          />
        </div>
      </Actions>
    </HeaderWrapper>
  );
};

export default Header;
