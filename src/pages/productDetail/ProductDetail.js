import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Helmet,
  CardProduct,
  Stars,
  AlertDialogSlide,
  SlideProduct,
} from "../../components";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cartSlice";
import { dataProducts, productAddReview } from "../../redux/dataSlice";
import "./ProductDetail.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect } from "react";
import { addWish, dataWishs, deleteWish } from "../../redux/wishSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { id } = useParams();

  // for having a product details
  let products = useSelector(dataProducts);
  const productId = products.filter((item) => item.id === id);
  const product = productId[0];
  // // for dialog box
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartLenth = cartProducts.length;
  const [isOpen, setisOpen] = useState(false);
  // for wishlist
  const [wishCount, setWishCount] = useState(product.wish);
  const [wish, setWish] = useState(false);
  const WishedProd = useSelector(dataWishs).find(
    (item) => item.id === product.id
  );

  useEffect(() => {  
    WishedProd !== undefined ? setWish(true) : setWish(false);  
  }, [WishedProd]);

  //for review
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  // for having relatedProduct
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
    setisOpen(true); //to open dialog box
  };

  //to close dialog box via props
  const closeBox = () => {
    setisOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //firebase
    const docRef = doc(db, "products", product.id);
    await updateDoc(docRef, {
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

  //for slide products
  const setTabRev = () => setTab("rev");

  // wish
  const toggle_wish = async () => {
    const docRef = doc(db, "products", product.id);
    let countwish=0;
    if (wish === true) {
      countwish=wishCount-1;
      setWishCount(countwish)     
      dispatch(deleteWish(product.id));
      
    } else {
      countwish=wishCount+1;
      setWishCount(countwish)   
      dispatch(addWish(product));      
    }
    await updateDoc(docRef, {
      wish: countwish,
    })
      .then((docRef) => {})
      .catch((error) => {
        console.log("error.message :", error.message);
      });
  };

  return (
    <Helmet title="Product-details">
      {isOpen && (
        <AlertDialogSlide
          handleClose={closeBox}
          isOpen={isOpen}
          cartLenth={cartLenth}
        />
      )}

      <section>
        <div>
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
                <span className="price fw-bold fs-2 mb-5">
                  ${Number(product.price).toLocaleString()}
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
                <div className="d-flex">
                  <Button
                    className="fs-5 rounded px-5 me-4"
                    onClick={addItem}
                    color="warning"
                  >
                    Add to Cart
                  </Button>
                  <span
                    className="wish px-3 border rounded d-flex align-items-center"
                    onClick={toggle_wish}
                  >
                    {wish === true ? (
                      <i className="ri-heart-fill fs-2 me-3 text-danger"></i>
                    ) : (
                      <i className="heart1 ri-heart-line fs-2 me-3 "></i>
                    )}
                    <span className="fs-5">{wishCount}</span>
                  </span>
                </div>
              </Col>
            </Row>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 border-bottom">
                <h5
                  className={`allviewlink  fs-4 ${
                    tab === "desc" ? "tab__active" : ""
                  }`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h5>
                <h5
                  className={`allviewlink  fs-4 ${
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
                    ? product.reviews.map((item, index) => (
                        <div key={index} className=" border-bottom w-100 mb-2">
                          <p className="user__name mb-0 fs-4">{item.name}</p>
                          <p className="user__email fs-4">{item.email}</p>
                          <p className="feedback__text fs-4">{item.review}</p>
                        </div>
                      ))
                    : ""}
                  <hr
                    style={{
                      borderColor: "black",
                      height: "1px",
                    }}
                  />
                  <form className="form shadow " onSubmit={submitHandler}>
                    <div className="form__group ">
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

                    <div>
                      <textarea
                        className="w-100"
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
            <div className="container">
              <SlideProduct className="container">
                {relatedProduct.map((item) => (
                  <Col
                    lg="3"
                    md="3"
                    sm="12"
                    xs="12"
                    className="mb-4"
                    key={item.id}
                  >
                    <CardProduct item={item} />
                  </Col>
                ))}
              </SlideProduct>
            </div>
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
