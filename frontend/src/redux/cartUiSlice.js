/*
 * eShop Project
 * cartUiSlice
 *
 * Description:
 * Redux slice to manage the visibility of the shopping cart UI.
 * Provides a toggle action to show/hide the cart.
 *
 * License:
 * MIT License
 */

import { createSlice } from "@reduxjs/toolkit";

// Slice for cart UI visibility
const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: { cartIsVisible: false }, // initial state: cart hidden

  reducers: {
    // Toggle cart visibility
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

// Export actions
export const cartUiActions = cartUiSlice.actions;
export const { toggle } = cartUiSlice.actions;

// Selector to get cart visibility state
export const cartIsVisible = (state) => state.cartUi.cartIsVisible;

// Export reducer
export default cartUiSlice;
