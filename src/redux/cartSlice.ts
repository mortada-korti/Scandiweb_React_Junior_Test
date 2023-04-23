import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../GraphQL/products";



interface CartItem {
  product: ProductType;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload
      );
      if (index !== -1) {
        const item = state.items[index];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
