import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Button } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cartSlice";
import { dataProducts } from "../../redux/dataSlice";
import "./ProductDetail.css";
import CardProduct from "../../components/products/cardProduct/CardProduct";
import {FaLongArrowAltLeft} from "react-icons/fa"
import Stars from "../../components/stars/Stars";

const ProductDetails = () => {
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");


  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector(dataProducts);

  const productId = products.filter((item) => item.id === id);

  const product = productId[0];

  const relatedProduct = products.filter(
    (item) => item.category === product.category
  );

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        productName: product.productName,
        price: product.price,
        imgUrl: product.imgUrl,
      })
    );
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [product]);

  const submitHandler = (e) => {
    e.preventDefault();    
  };




  return (
    <Helmet title="Product-details">
      <section>
        <Container>
          <div className="mb-4">
          <h2>Product Details</h2>
          <Link to="/shop"><FaLongArrowAltLeft/> <span className="back"> back to products</span></Link>
          </div>
          <Row>
            <Row >
              <Col lg="4" md="4" sm="12" xs="12" className=" mb-5 border">
                  <img src={product.imgUrl} alt="" className="w-100" />
              </Col>
              <Col lg="8" md="8" sm="12" xs="12" className=" mb-5 ps-5">                
                  <h2 className=" mb-3 border-2 border-bottom">{product.productName}</h2>
                  <span className="price fw-bold fs-4 mb-5">${product.price}</span>
                  <Stars   id= {id} stars= {product.rating} vote= {product.vote} />
                  <p className="my-5 ">
                    <span className="fw-bold me-3">Category: </span>
                    <span className="fs-4">{product.category}</span>
                  </p>
                  <p className=" mb-5">
                    <span className="fw-bold me-3">Brand: </span>
                    <span className="fs-4">{product.brand}</span>
                  </p>
                  <Button className="fs-5" onClick={addItem} color="warning">
                    Add to Cart
                  </Button>                
              </Col>
            </Row>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 ">
                <h5
                  className={`fs-4 ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h5>
                <h5
                  className={`fs-4 ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h5>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p className="fs-4">{product.desc}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <CardProduct item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
