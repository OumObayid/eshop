
import { createSlice } from "@reduxjs/toolkit";

//////////////////////////////////////////////authentification
const authSlice = createSlice({
  name: "auth", //nom de l'etat
  // contenu de l'etat
  initialState: {
    isLoggedIn: false,
    userEmail: null,
    userName: null,
    userId: null,
  },
  reducers: {
    setActiveUser: (state, action) => {
      const { userEmail, userName, uid } = action.payload;
      state.isLoggedIn = true;
      state.userEmail = userEmail;
      state.userName = userName;
      state.userId = uid;
    },
    removeActiveUser: (state, action) => {
      state.isLoggedIn = false;
      state.userEmail = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

//exporter les actions a appeler
export const { setActiveUser, removeActiveUser } = authSlice.actions;
//select variables of state
export const stateIsLoggedIn = (state) => state.auth.isLoggedIn;
export const stateUserEmail = (state) => state.auth.userEmail;
export const stateUserName = (state) => state.auth.userName;
export const stateUserId = (state) => state.auth.userId;

export default authSlice