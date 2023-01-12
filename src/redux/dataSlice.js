import { createSlice } from "@reduxjs/toolkit";

//////////////////////////////////////////////data
const dataSlice = createSlice({
  name: "data", //nom de l'etat
  // contenu de l'etat
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
      region: "",
      city: "",
      postalCode: "",
      password: "",
      card: {
        brand: "",
        exp_month: "",
        exp_year: "",
      },
      orders: [],
    },
  },

  reducers: {
    ///////////////////////PRODUCTS/////////////////////
    //add products
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
    //delete product
    deleteProduct: (state, action) => {
      const id = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct)
        state.products = state.products.filter((item) => item.id !== id);
    },
    //add review to product
    productAddReview: (state, action) => {
      const id = action.payload.id;
      const itemReview = action.payload.review;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) {
        existingProduct.reviews.push({
          name: itemReview.name,
          email: itemReview.email,
          review: itemReview.review,
        });
      }
    },
    setWish : (state,action) => {
    // const id = action.payload.id;
    // const val = action.payload.val;
    // const existingProduct = state.products.find((item) => item.id === id);
    // if (existingProduct) {
    //   existingProduct.wish= existingProduct.wish + val;
    // }
    },
    //add rating to product
    setRating: (state, action) => {
      const { id, numRat } = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) {
        switch (numRat) {
          case 1:
            existingProduct.rating1 += 1;
            break;
          case 2:
            existingProduct.rating2 += 1;
            break;
          case 3:
            existingProduct.rating3 += 1;
            break;
          case 4:
            existingProduct.rating4 += 1;
            break;
          case 5:
            existingProduct.rating5 += 1;
            break;
          default:
            break;
        }
      }
    },
    /////////////////////////CATEGORYS/////////////////////
    //add category
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
    //delect category
    deleteCategory: (state, action) => {
      const id = action.payload;
      const existingCategory = state.categorys.find((item) => item.id === id);
      if (existingCategory)
        state.categorys = state.categorys.filter((item) => item.id !== id);
    },
    /////////////////////////USERINFOS/////////////////////
    //update user infos
    updateUserInfo: (state, action) => {
      const user = action.payload;
      const userinfos = state.userinfos;

      userinfos.id = user.id;
      userinfos.name = user.name;
      userinfos.email = user.email;
      userinfos.tel = user.tel;
      userinfos.address = user.address;
      userinfos.country = user.country;
      userinfos.region = user.region;
      userinfos.city = user.city;
      userinfos.postalCode = user.postalCode;
      userinfos.password = user.password;
      userinfos.card ={
        brand : user.card.brand,
        exp_month : user.card.exp_month,
        exp_year : user.card.exp_year,
      }     
      userinfos.orders=[];
      user.orders.forEach((element) => {
        userinfos.orders.push(element);
      });
     
    },
  },
});

//exporter les actions a appeler
export const {
  addProduct,
  setWish,
  setRating,
  productAddReview,
  deleteProduct,
  addCategory,
  deleteCategory,
  updateUserInfo
} = dataSlice.actions;
//select variables od state
export const dataProducts = (state) => state.data.products;
export const datacategorys = (state) => state.data.categorys;
export const datauser = (state) => state.data.userinfos;


export default dataSlice;
