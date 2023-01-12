import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("wishItems") !== null
    ? JSON.parse(localStorage.getItem("wishItems"))
    : [];

const setItemStorage = (item) => {
  localStorage.setItem("wishItems", JSON.stringify(item));
};

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wishItems: items,
  },

  reducers: {
    addWish: (state, action) => {  
      const newWish = action.payload;
      if (state.wishItems !== []) {
        const existingItem = state.wishItems.find(
          (item) => item.id === newWish.id
        );
        if (!existingItem) {
          state.wishItems.push({
            id: newWish.id,
            productName: newWish.productName,
            imgUrl: newWish.imgUrl,
            price : newWish.price,
          });
        }
      } else {
        state.wishItems.push({
          id: newWish.id,
          productName: newWish.productName,
          imgUrl: newWish.imgUrl,
          price : newWish.price,
        });
      }
      setItemStorage(state.wishItems.map((item) => item));
    },
    //delete product
    deleteWish: (state, action) => {
      const id = action.payload;
      const existingItem = state.wishItems.find((item) => item.id === id);

      if (existingItem) {
        state.wishItems = state.wishItems.filter((item) => item.id !== id);
      }

      setItemStorage(state.wishItems.map((item) => item));
    },
  },
});

//exporter les actions a appeler
export const { addWish, deleteWish } = wishSlice.actions;
//select variables of state
export const dataWishs = (state) => state.wish.wishItems;

export const wishActions = wishSlice.actions;


export default wishSlice;
