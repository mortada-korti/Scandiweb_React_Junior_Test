import { NavLink } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { CategoriesType, GET_ALL_CATEGORIES } from "../../GraphQL/categories";

// Styles
import { MenuDropDownWrapper } from "./style";
import { NavItem } from "../header/style";

type Props = {
  isMenuToggled: boolean;
  setIsMenuToggled: (value: boolean) => void;
};

const MenuDropDown = ({ isMenuToggled, setIsMenuToggled }: Props) => {
  // GraphQL
  const { data } = useQuery<CategoriesType>(GET_ALL_CATEGORIES);

  return (
    <MenuDropDownWrapper className={`${isMenuToggled ? "active" : ""}`}>
      {data?.categories.map((category, index) => (
        <NavItem key={index}>
          <NavLink
            onClick={() => setIsMenuToggled(false)}
            to={`${category.name}`}>
            {category.name}
          </NavLink>
        </NavItem>
      ))}
    </MenuDropDownWrapper>
  );
};

export default MenuDropDown;
