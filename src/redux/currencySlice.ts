import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CurrencyType } from "../GraphQL/currencies";

export interface currencyState {
  label: string;
  symbol: string;
}

const initialState: currencyState = {
  label: "USD",
  symbol: "$",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<CurrencyType>) => {
      state.label = action.payload.label;
      state.symbol = action.payload.symbol;
    },
  },
});

export const { setSelectedCurrency } = currencySlice.actions;
export default currencySlice.reducer;
