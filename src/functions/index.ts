import { ProductType } from "../GraphQL/products";
import { CartState } from "../redux/cartSlice";
import { currencyState } from "../redux/currencySlice";

export const getCurrencyIndex = (
  selectedCurrency: currencyState,
  cart?: CartState,
  product?: ProductType
) => {
  if (cart)
    return cart?.items.map((item) =>
      item.product.prices.findIndex(
        (e) => e.currency.symbol === selectedCurrency.symbol
      )
    )[0];

  if (product)
    return product.prices.findIndex(
      (e) => e.currency.symbol === selectedCurrency.symbol
    );
};

export const getTotalPriceBeforeTax = (
  cart: CartState,
  currencyIndex: number
): number => {
  let totalBeforeTax = 0;
  cart.items.map(
    (item) =>
      (totalBeforeTax +=
        item.quantity * parseFloat(item.product.prices[currencyIndex].amount))
  );
  return Number(totalBeforeTax.toFixed(2));
};

export const getTax = (cart: CartState, currencyIndex: number): number => {
  return Number(
    ((21 * getTotalPriceBeforeTax(cart, currencyIndex)) / 100).toFixed(2)
  );
};

export const getTotalPriceAfterTax = (
  cart: CartState,
  currencyIndex: number
): number => {
  return Number(
    (
      getTotalPriceBeforeTax(cart, currencyIndex) + getTax(cart, currencyIndex)
    ).toFixed(2)
  );
};

export const getTotalQuantity = (cart: CartState): number => {
  let totalQuantity = 0;
  cart.items.map((item) => (totalQuantity += item.quantity));
  return totalQuantity;
};
