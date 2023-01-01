import { createSlice } from "@reduxjs/toolkit";

//////////////////////////////////////////////data
const dataSlice = createSlice({
  name: "data", //nom de l'etat
  // contenu de l'etat
  initialState: {
    products: [],
    categorys: [],   
  },

  reducers: {
    //products
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
          reviews: newProduct.reviews
        });
      }
    },
    deleteProduct:(state, action) => {
      const id = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct)
        state.products = state.products.filter((item) => item.id !== id);
    },
    productAddReview:(state,action) => {
      const id = action.payload.id;
      const itemReview = action.payload.review;
      const existingProduct = state.products.find((item) => item.id === id);
       if (existingProduct) {
         existingProduct.reviews.push({
           name: itemReview.name,
           email: itemReview.email,
           review: itemReview.review
         })
       }
     },     
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
    ////categorys
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
    deleteCategory:(state, action) => {
      const id = action.payload;
      const existingCategory = state.categorys.find((item) => item.id === id);
      if (existingCategory)
        state.categorys = state.categorys.filter((item) => item.id !== id);
    },
   

   
  },
});

//exporter les actions a appeler
export const { addProduct, setRating,productAddReview, deleteProduct,addCategory,deleteCategory } = dataSlice.actions;
//select variables od state
export const dataProducts = (state) => state.data.products;
export const datacategorys = (state) => state.data.categorys;

export default dataSlice;
