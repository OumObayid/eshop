import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import cartUiSlice from "./cartUiSlice";
import authSlice from "./authSlice";
import dataSlice from "./dataSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    data: dataSlice.reducer

  },
});

export default store;

