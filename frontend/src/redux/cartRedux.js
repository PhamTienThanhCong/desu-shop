import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        state.total += action.payload.price;
      } else {
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
      state.quantity = state.products.length;

    },
//delete product from cart
    removeProduct: (state, action) => {
        // console.log(action.payload);
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.total -= action.payload[0].price * action.payload[0].quantity;
        state.quantity = state.products.length;
    },
    clearProduct: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
      action.payload = [];
      console.log(state.products);
      
    },

  },
});

export const { addProduct, removeProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
