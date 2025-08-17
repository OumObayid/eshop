/*
 * eShop Project
 * Wishlist Redux Slice
 *
 * Description:
 * Manages the user's wishlist items.
 * Allows adding and removing products from the wishlist.
 * Persists wishlist in localStorage.
 *
 * License:
 * MIT License
 */

import { createSlice } from "@reduxjs/toolkit";

// Load wishlist items from localStorage if available
const items =
  localStorage.getItem("wishItems") !== null
    ? JSON.parse(localStorage.getItem("wishItems"))
    : [];

// Helper function to save wishlist to localStorage
const setItemStorage = (item) => {
  localStorage.setItem("wishItems", JSON.stringify(item));
};

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wishItems: items, // Current wishlist items
  },

  reducers: {
    // Add a new item to wishlist
    addWish: (state, action) => {
      const newWish = action.payload;
      const existingItem = state.wishItems.find(
        (item) => item.id === newWish.id
      );
      if (!existingItem) {
        state.wishItems.push({
          id: newWish.id,
          productName: newWish.productName,
          imgUrl: newWish.imgUrl,
          price: newWish.price,
          category: newWish.category,
          brand: newWish.brand,
        });
      }
      // Save updated wishlist to localStorage
      setItemStorage(state.wishItems.map((item) => item));
    },

    // Remove an item from wishlist
    deleteWish: (state, action) => {
      const id = action.payload;
      state.wishItems = state.wishItems.filter((item) => item.id !== id);
      // Save updated wishlist to localStorage
      setItemStorage(state.wishItems.map((item) => item));
    },
  },
});

// Export actions to call in components
export const { addWish, deleteWish } = wishSlice.actions;

// Selector to get wishlist items from state
export const dataWishs = (state) => state.wish.wishItems;

// Export all actions
export const wishActions = wishSlice.actions;

export default wishSlice;
