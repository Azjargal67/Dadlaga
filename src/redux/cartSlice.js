import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    customerId: null,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.total = existingItem.price * existingItem.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
        item.total = item.price * quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCustomer: (state, action) => {
      state.customerId = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCustomer } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
