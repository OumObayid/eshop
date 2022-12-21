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
          rating1: newProduct.rating1,
          rating2: newProduct.rating2,
          rating3: newProduct.rating3,
          rating4: newProduct.rating4,
          rating5: newProduct.rating5,
        });
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
