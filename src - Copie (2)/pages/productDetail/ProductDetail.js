import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cartSlice";
import { dataProducts, productAddReview } from "../../redux/dataSlice";
import "./ProductDetail.css";
import CardProduct from "../../components/products/cardProduct/CardProduct";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Stars from "../../components/stars/Stars";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

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
    //firebase
    const docRef = doc(db, "products", product.id);
    updateDoc(docRef, {
      reviews: arrayUnion({
        name: enteredName,
        email: enteredEmail,
        review: reviewMsg,
      }),
    })
      .then((docRef) => {
        //redux
        dispatch(
          productAddReview({
            id: id,
            review: {
              name: enteredName,
              email: enteredEmail,
              review: reviewMsg,
            },
          })
        );
        //scroll to review
        setTabRev();
        window.scrollTo(0, 410);
        setEnteredEmail("");
        setEnteredName("");
        setReviewMsg("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setTabRev = () => setTab("rev");

  return (
    <Helmet title="Product-details">
      <section>
        <Container>
          <div className="mb-4">
            <h2>Product Details</h2>
            <Link to="/shop">
              <FaLongArrowAltLeft />{" "}
              <span className="back"> back to products</span>
            </Link>
          </div>
          <Row>
            <Row>
              <Col lg="4" md="4" sm="12" xs="12" className=" mb-5 border">
                <figure>
                  <img src={product.imgUrl} alt="" className="w-100" />
                </figure>
              </Col>
              <Col lg="8" md="8" sm="12" xs="12" className=" mb-5 ps-5">
                <h2 className=" mb-3 border-2 border-bottom">
                  {product.productName}
                </h2>
                <span className="price fw-bold fs-4 mb-5">
                  ${product.price}
                </span>
                <Stars actions={[product, setTabRev]} />
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
              <div className="tabs d-flex align-items-center gap-5 border-bottom">
                <h5
                  className={`cursor fs-4 ${
                    tab === "desc" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h5>
                <h5
                  className={` cursor fs-4 ${
                    tab === "rev" ? "tab__active" : ""
                  }`}
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
                <div className="tab__form my-3">
                  {product.reviews
                    ? product.reviews.map((item) => (
                        <div className="review border-bottom w-25 mb-2">
                          <p className="user__name mb-0 ">{item.name}</p>
                          <p className="user__email">{item.email}</p>
                          <p className="feedback__text">{item.review}</p>
                        </div>
                      ))
                    : ""}
                  <hr
                    style={{
                      borderColor: "black",
                      height: "1px",
                    }}
                  />
                  <form className="form shadow" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={enteredName}
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        value={enteredEmail}
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        value={reviewMsg}
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="fs-5" color="warning">
                      Add Review
                    </Button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">
                <span className="border-bottom"> You might also like</span>
              </h2>
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
