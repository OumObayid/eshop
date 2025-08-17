/*
 * eShop Project
 * authSlice
 *
 * Description:
 * Redux slice to manage user authentication state.
 * Stores login status, user email, and user ID.
 * Provides actions to set or remove the active user.
 *
 * License:
 * MIT License
 */

import { createSlice } from "@reduxjs/toolkit";

// Authentication slice
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState: {
    isLoggedIn: false, // User login status
    userEmail: null,   // Email of logged-in user
    userId: null,      // UID of logged-in user
  },
  reducers: {
    // Set the active user on login
    setActiveUser: (state, action) => {
      const { userEmail, uid } = action.payload;
      state.isLoggedIn = true;
      state.userEmail = userEmail;
      state.userId = uid;
    },
    // Remove the active user on logout
    removeActiveUser: (state, action) => {
      state.isLoggedIn = false;
      state.userEmail = null;
      state.userId = null;
    },
  },
});

// Export actions to be dispatched
export const { setActiveUser, removeActiveUser } = authSlice.actions;

// Selectors to access state values
export const stateIsLoggedIn = (state) => state.auth.isLoggedIn;
export const stateUserEmail = (state) => state.auth.userEmail;
export const stateUserName = (state) => state.auth.userName;
export const stateUserId = (state) => state.auth.userId;

// Export reducer to include in store
export default authSlice;
