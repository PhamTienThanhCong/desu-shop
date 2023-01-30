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
        product.quantity += 1;
        state.total += action.payload.price;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }

    },
//delete product from cart
    removeProduct: (state, action) => {
        state.products = state.products.filter(
          
          (product) => product.id !== action.payload[0].id
        );
        state.total -= action.payload[0].price * action.payload[0].quantity;
        state.quantity -= 1;



    },
    clearProduct: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
      action.payload = [];
      
    },

  },
});

export const { addProduct, removeProduct, clearProduct } = cartSlice.actions;
export default cartSlice.reducer;
