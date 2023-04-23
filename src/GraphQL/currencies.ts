import { gql } from "@apollo/client";

export type CurrencyType = {
  label: string;
  symbol: string;
};

export type CurrenciesType = {
  currencies: CurrencyType[];
};

export const GET_ALL_CURRENCIES = gql`
  query GetAllCurrencies {
    currencies {
      label
      symbol
    }
  }
`;
