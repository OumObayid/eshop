import React, { useEffect, useState } from "react";
import Helmet from "../Helmet/Helmet";
import { addProduct,addCategory } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import Category from "./Category";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Row, Col } from "reactstrap";

const CategoryList = () => {
  const [categorys, setCategorys] = useState([]);
const dispatch = useDispatch ();
 
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
    };
    getProducts();
  }, [dispatch]);
 
  return (
    <Helmet title="category">
      <div className="wrap d-flex justify-content-center">   
    
          <h1 className="text-center txtTitre  mb-5">All Categorys</h1> </div>         


      <Row className=" d-flex justify-content-between mb-5">
        {categorys.map((category) => (
          <Col lg="6" md="6" sm="12" xs="12" className="mb-3" key={category.id}>
            <Category category={category} />
          </Col>
        ))}
      </Row>
    </Helmet>
  );
};

export default CategoryList;
