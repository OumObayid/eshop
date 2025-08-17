/*
 * eShop Project
 * Redux Store Configuration
 *
 * Description:
 * Central Redux store for the eShop application.
 * Combines slices for authentication, cart, UI state, data, and wishlist.
 *
 * License:
 * MIT License
 */

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import cartUiSlice from "./cartUiSlice";
import authSlice from "./authSlice";
import dataSlice from "./dataSlice";
import wishSlice from "./wishSlice";

// Configure the Redux store with multiple reducers
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,       // Authentication state
    cart: cartSlice.reducer,       // Cart items and totals
    cartUi: cartUiSlice.reducer,   // Cart UI visibility
    data: dataSlice.reducer,       // Products, categories, user info
    wish: wishSlice.reducer,       // Wishlist items
  },
});

export default store;
