/*
 * eShop Project
 * cartSlice
 *
 * Description:
 * Redux slice to manage the shopping cart state.
 * Handles adding, removing, deleting items, and clearing the cart.
 * Persists cart data (items, total amount, total quantity) to localStorage.
 *
 * License:
 * MIT License
 */

import { createSlice } from "@reduxjs/toolkit";

// Get initial cart state from localStorage if available
const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

// Helper function to persist cart state to localStorage
const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

// Initial state
const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        // Add new item if it does not exist
        state.cartItems.push({
          id: newItem.id,
          title: newItem.productName,
          img: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          orderDate: "",
          totalPrice: newItem.price,
        });
      } else {
        // Update existing item quantity and totalPrice
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // Update total amount
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    // Remove one quantity of item from cart
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    // Delete entire item from cart
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    // Clear entire cart
    clearCart(state, action) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      setItemFunc([], 0, 0);
    },
  },
});

// Export actions to dispatch
export const { addItem, setItemFunct, removeItem, deleteItem, clearCart } =
  cartSlice.actions;

// Selectors to access cart state
export const cartItems = (state) => state.cart.cartItems;
export const totalQuantityy = (state) => state.cart.totalQuantity;
export const totalAmountt = (state) => state.cart.totalAmount;

// Export cart actions and reducer
export const cartActions = cartSlice.actions;
export default cartSlice;
