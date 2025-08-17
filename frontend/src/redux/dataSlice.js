/*
 * eShop Project
 * dataSlice
 *
 * Description:
 * Redux slice for managing the core data of the eShop.
 * Handles products, categories, and user information.
 * Provides actions for adding, deleting, and updating products, categories, reviews, ratings, and user info.
 *
 * License:
 * MIT License
 */

import { createSlice } from "@reduxjs/toolkit";

// Main slice for products, categories, and user info
const dataSlice = createSlice({
  name: "data", // name of the state

  // initial state
  initialState: {
    products: [],
    categorys: [],
    userinfos: {
      id: "",
      name: "",
      email: "",
      tel: "",
      address: "",
      country: "",
      city: "",
      password: "",
      card: {
        idCard: "",
        numberCard: "",
        last4: "",
        nameOnCard: "",
        cvc: "",
        brand: "",
        exp_month: 0,
        exp_year: 0,
      },
      orders: [],
    },
  },

  reducers: {
    /////////////////////// PRODUCTS /////////////////////
    // Add a new product if it doesn't already exist
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === newProduct.id
      );
      if (!existingItem) {
        state.products.push({
          id: newProduct.id,
          productName: newProduct.productName,
          imgUrl: newProduct.imgUrl,
          price: newProduct.price,
          category: newProduct.category,
          brand: newProduct.brand,
          desc: newProduct.desc,
          rating1: newProduct.rating1,
          rating2: newProduct.rating2,
          rating3: newProduct.rating3,
          rating4: newProduct.rating4,
          rating5: newProduct.rating5,
          reviews: newProduct.reviews,
          wish: newProduct.wish,
        });
      }
    },

    // Delete a product by ID
    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((item) => item.id !== id);
    },

    // Add a review to a specific product
    productAddReview: (state, action) => {
      const { id, review } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.reviews.push({
          name: review.name,
          email: review.email,
          review: review.review,
        });
      }
    },

    // Placeholder for updating wish count on a product
    setWish: (state, action) => {
      // Currently commented out
    },

    // Increment rating counters for a product
    setRating: (state, action) => {
      const { id, numRat } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) {
        switch (numRat) {
          case 1: existingProduct.rating1 += 1; break;
          case 2: existingProduct.rating2 += 1; break;
          case 3: existingProduct.rating3 += 1; break;
          case 4: existingProduct.rating4 += 1; break;
          case 5: existingProduct.rating5 += 1; break;
          default: break;
        }
      }
    },

    /////////////////////// CATEGORIES /////////////////////
    // Add a new category if it doesn't exist
    addCategory: (state, action) => {
      const newCategory = action.payload;
      const existingItem = state.categorys.find(
        (item) => item.id === newCategory.id
      );
      if (!existingItem) {
        state.categorys.push({
          id: newCategory.id,
          categoryName: newCategory.categoryName,
          imgCat: newCategory.imgCat,
          descCat: newCategory.descCat,
        });
      }
    },

    // Delete a category by ID
    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categorys = state.categorys.filter((item) => item.id !== id);
    },

    /////////////////////// USER INFOS /////////////////////
    // Update user information
    updateUserInfo: (state, action) => {
      const user = action.payload;
      const userinfos = state.userinfos;

      userinfos.id = user.id || "";
      userinfos.name = user.name || "";
      userinfos.email = user.email || "";
      userinfos.tel = user.tel || "";
      userinfos.address = user.address || "";
      userinfos.country = user.country || "";
      userinfos.city = user.city || "";
      userinfos.password = user.password || "";

      // Initialize card info if undefined
      userinfos.card = {
        idCard: user.card?.idCard || "",
        numberCard: user.card?.numberCard || "",
        last4: user.card?.last4 || "",
        nameOnCard: user.card?.nameOnCard || "",
        cvc: user.card?.cvc || "",
        brand: user.card?.brand || "",
        exp_month: user.card?.exp_month || 0,
        exp_year: user.card?.exp_year || 0,
      };

      // Initialize orders if undefined
      userinfos.orders = Array.isArray(user.orders) ? [...user.orders] : [];
    },
  },
});

// Export actions to call in components
export const {
  addProduct,
  setWish,
  setRating,
  productAddReview,
  deleteProduct,
  addCategory,
  deleteCategory,
  updateUserInfo,
} = dataSlice.actions;

// Export selectors for state
export const dataProducts = (state) => state.data.products;
export const datacategorys = (state) => state.data.categorys;
export const datauser = (state) => state.data.userinfos;

// Export reducer
export default dataSlice;
