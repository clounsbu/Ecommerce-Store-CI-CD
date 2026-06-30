import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../types/types";

const savedCart: CartItem[] = JSON.parse(
  sessionStorage.getItem("cart") || "[]",
);
//Starting value of the cart is an empty array cart = []

//Create a section of redux state called cart and set the initial value to an empty array
const cartSlice = createSlice({
  name: "cart",

  initialState: savedCart,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.push({
          ...product,
          count: 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    checkout: () => {
      return [];
    },
  },
  //Functions that change the state of the cart. For example, addToCart, removeFromCart, clearCart, etc.
});

export const { addToCart, removeFromCart, checkout } = cartSlice.actions;

export default cartSlice.reducer;
