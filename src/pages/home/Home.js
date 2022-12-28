import { Helmet, Slider, Scrolltop, CategoryList, RatedProducts } from "../../components";
import { Contact, About } from "../../components";
import React, { useEffect, useState } from "react";
import { addProduct,addCategory } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

const Home = () => {

  //get data products and data categorys from firebase and pass to diffrent component
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategorys = async () => {
      //////////////// get data from firebase
      const ref = collection(db, "categorys");
      const querySnapshot = await getDocs(ref);
      const list = [];
      querySnapshot.forEach((doc) => {
        let fullDoc = { id: doc.id, ...doc.data() }; //concate id to document
        list.push(fullDoc); //put data in array list
        dispatch(addCategory(fullDoc)); // put doc in store redux
      });
      setCategorys(list);
    };
    getCategorys(); // call to function
    const getProducts = async () => {
      //////////////// get data from firebase
      const ref = collection(db, "products");
      const querySnapshot = await getDocs(ref);
      const list = [];
      querySnapshot.forEach((doc) => {
        let fullDoc = { id: doc.id, ...doc.data() }; //concate id to document
        list.push(fullDoc); //put data in array list
        dispatch(addProduct(fullDoc)); // put doc in store redux
      });
      setProducts(list);
    };
    getProducts();
  }, [dispatch]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  return (
    <div>
      <Slider />
      <Helmet title="Home">
        <CategoryList categorys={categorys}/>
        <RatedProducts products={products}/>
        <About />
        <Contact />
        <Scrolltop />
      </Helmet>
    </div>
  );
};

export default Home;
