import { createSlice } from "@reduxjs/toolkit";

//////////////////////////////////////////////data
const dataSlice = createSlice({
  name: "data", //nom de l'etat
  // contenu de l'etat
  initialState: {
    products: [],
  },

  reducers: {
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
          stars: newProduct.stars,
        });
      }
    },
    setRating: (state, action) => {     
      const {id,stars} = action.payload;     
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct) existingProduct.stars=stars   
    },
    deleteProduct(state, action) {
      const id = action.payload;
      const existingProduct = state.products.find((item) => item.id === id);
      if (existingProduct)
        state.products = state.products.filter((item) => item.id !== id);
    },
  },
});

//exporter les actions a appeler
export const { addProduct, setRating, deleteProduct } = dataSlice.actions;
//select variables od state
export const dataProducts = (state) => state.data.products;

export default dataSlice;
