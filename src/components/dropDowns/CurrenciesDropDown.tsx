// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCurrency } from "../../redux/currencySlice";
import { RootState } from "../../redux/store";

// GraphQL
import { useQuery } from "@apollo/client";
import { CurrenciesType, GET_ALL_CURRENCIES } from "../../GraphQL/currencies";

// Styles
import { CurrenciesDropDownWrapper, CurrencyItem } from "./style";

type Props = {
  isCurrenciesToggled: boolean;
};

const CurrenciesDropDown = ({ isCurrenciesToggled }: Props) => {
  // Redux
  const dispatch = useDispatch();
  const selectedCurrency = useSelector((state: RootState) => state.currency);

  // GraphQL
  const { loading, error, data } = useQuery<CurrenciesType>(GET_ALL_CURRENCIES);

  return (
    <CurrenciesDropDownWrapper
      className={`${isCurrenciesToggled ? "active" : ""}`}>
      {data?.currencies.map((currency, index) => (
        <CurrencyItem
          key={index}
          className={
            selectedCurrency.label === currency.label ? "selected" : ""
          }
          onClick={() => dispatch(setSelectedCurrency(currency))}>
          {currency.symbol} {currency.label}
        </CurrencyItem>
      ))}
    </CurrenciesDropDownWrapper>
  );
};

export default CurrenciesDropDown;
