import { createSlice } from "@reduxjs/toolkit";

const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: { cartIsVisible: false },

  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});
export const cartUiActions = cartUiSlice.actions;
export const { toggle } = cartUiSlice.actions;
export const cartIsVisible = (state) => state.cartUi.cartIsVisible;

export default cartUiSlice;
