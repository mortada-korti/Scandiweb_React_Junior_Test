import { NavLink } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { CategoriesType, GET_ALL_CATEGORIES } from "../../GraphQL/categories";

// Styles
import { MenuDropDownWrapper } from "./style";
import { NavItem } from "../header/style";

type Props = {
  isMenuToggled: boolean;
};

const MenuDropDown = ({ isMenuToggled }: Props) => {
  // GraphQL
  const { loading, error, data } = useQuery<CategoriesType>(GET_ALL_CATEGORIES);

  return (
    <MenuDropDownWrapper className={`${isMenuToggled ? "active" : ""}`}>
      {data?.categories.map((category, index) => (
        <NavItem key={index}>
          <NavLink to={`${category.name}`}>{category.name}</NavLink>
        </NavItem>
      ))}
    </MenuDropDownWrapper>
  );
};

export default MenuDropDown;
