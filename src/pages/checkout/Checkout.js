import React, { useEffect, useState } from "react";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { Helmet, Loader, Location } from "../../components";
import "./Checkout.css";
import Carts from "../cart/Carts";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { cartItems, clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import $ from "jquery";

// axios.defaults.baseURL = "/api";
axios.defaults.baseURL = "http://localhost:4000/api/";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Checkout() {
  const [user, setUser] = useState({});
  const [enterNumber, setEnterNumber] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterRegion, setEnterRegion] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        const getUser = async (email) => {
          const q = query(collection(db, "users"), where("email", "==", email));
          const querySnapshot = await getDocs(q);
          let userGet = {};
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            userGet = {
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              password: doc.data().password,
              tel: doc.data().tel,
              address: doc.data().address,
              country: doc.data().country,
              region: doc.data().region,
              city: doc.data().city,
              postalCode: doc.data().postalCode,
              orders: doc.data().orders,
            };
          });
          //call function
          setUser(userGet);
          if (userGet.address !== "") setAddressSaved(true);
          // console.log("user :", user);
        };
        getUser(user.email);
      }
    });
  }, [navigate]);

  ///////////---end---////////first of all check if logged

  // for cartItem
  const cartProducts = useSelector(cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);
  const changeCountry = (e) => {
    setEnterCountry(e.target.value);
  };
  const changeRegion = (e) => {
    setEnterRegion(e.target.value);
  };
  const changeCity = (e) => {
    setEnterCity(e.target.value);
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) $(".products").removeClass("fixed");
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51MKIp3KSFdzmNXFyn788JoITCaC8eeCxcjr3voWx0nyc6CTtaY4vvNVRAvdTrhuphTzY0GzeQSfrBTlipjLNUHDK00hq6cTLL7"
        );
      };
      window.document.body.appendChild(s);
    }
  }, []);

  const onSubmit = async (values) => {
    setIsLoading(true);
    await sleep(300);
    try {
      window.Stripe.card.createToken(
        {
          number: values.numberCard,
          exp_month: values.expiry.split("/")[0],
          exp_year: values.expiry.split("/")[1],
          cvc: values.cvc,
          name: values.nameOnCard,
        },
        (status, response) => {
          if (status === 200) {
            axios
              .post("stripe-payment", {
                token: response,
                email: user.email,
                amount: totalAmount,
              })
              .then(async (res) => {  
                let orderlist = [];
                await cartProducts.forEach((item) => {
                  let order = {
                    id: item.id,
                    title: item.title,
                    img: item.img,
                    price: item.price,
                    quantity: item.quantity,
                    orderDate: new Date().toDateString(),
                    totalPrice: item.totalPrice,
                  };
                  orderlist.push(order);
                });
                const docRef = doc(db, "users", user.id);
                //check is user infos are seized
                if (enterNumber !== "")
                  //add additional information
                  await updateDoc(docRef, {
                    tel: enterNumber,
                    address: enterAddress,
                    country: enterCountry,
                    region: enterRegion,
                    city: enterCity,
                    postalCode: postalCode,
                    orders: orderlist,
                    card: {
                      idCard: res.data.payment_method,
                      numberCard: values.numberCard,
                      brand: res.data.payment_method_details.card.brand,
                      nameOnCard: values.nameOnCard,
                      exp_month: res.data.payment_method_details.card.exp_month,
                      exp_year: res.data.payment_method_details.card.exp_year,
                      cvc: values.cvc,
                      last4: res.data.payment_method_details.card.last4,
                    },
                  });
                else
                  await updateDoc(docRef, {
                    orders: orderlist,
                    card: {
                      idCard: res.data.payment_method,
                      numberCard: values.numberCard,
                      brand: res.data.payment_method_details.card.brand,
                      nameOnCard: values.nameOnCard,
                      exp_month: res.data.payment_method_details.card.exp_month,
                      exp_year: res.data.payment_method_details.card.exp_year,
                      cvc: values.cvc,
                      last4: res.data.payment_method_details.card.last4,
                    },
                  })
                    .then((docRef) => {
                      setIsLoading(false);
                      dispatch(clearCart());                      
                      navigate("/checkoutSuccess");
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      toast.error(error.message);
                      console.log("error.message :", error.message);
                    });
              })
              .catch((err) =>{
                setIsLoading(false);
                 console.log(err)
                 toast.error(err.message);               

              });
          } else {
            setIsLoading(false);
            toast.error(response.error.message);  
            console.log(response.error.message);
          }
        }
      );
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);  
      console.log("error catch", error.message);
    }
  };
  //logo
  const logo = (
    <div className="logo" style={{ marginTop: "8px" }}>
      <Link to="/">
        <h3>
          e<span>Shop</span>.
        </h3>
      </Link>
    </div>
  );
  return (
    <Helmet title="checkout">
      {isLoading && <Loader/>}
      <section>
        <Row id="container-element">
          <Col lg="6" md="6">
            <div>
              <h2>Summary</h2>
              <Col lg="12" md="12" className="border undersummary">
                <Carts />
              </Col>
              <Col lg="12" md="12">
                <div className="checkout__bill">
                  <h5 className="d-flex align-items-center justify-content-between ">
                    Subtotal: <span>${cartTotalAmount.toLocaleString()}</span>
                  </h5>
                  <h5 className="d-flex align-items-center justify-content-between ">
                    Shipping: <span>${shippingCost.toLocaleString()}</span>
                  </h5>
                  <div className="checkout__total">
                    <h4 className="d-flex align-items-center justify-content-between my-2">
                      Total: <span>${totalAmount.toLocaleString()}</span>
                    </h4>
                  </div>
                </div>
              </Col>
            </div>
          </Col>
          <Col lg="5" md="5" className="  products fixed" id="products">
            <div className="Payemnt  ">
              <h2>Payemnt</h2>
              <div className="cart-icons-list ">
                <span className="ms-3">method </span>
                <div className=" mx-5 d-flex">
                  <img
                    className="cart-icons-img mx-2"
                    src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                    alt="bank"
                  />
                  <img
                    className="cart-icons-img mx-2"
                    src="https://img.alicdn.com/tfs/TB19TEYdB1D3KVjSZFyXXbuFpXa-53-48.png"
                    alt="bank"
                  />
                  <img
                    className="cart-icons-img mx-2"
                    src="https://img.alicdn.com/tfs/TB19qM7drus3KVjSZKbXXXqkFXa-39-48.png"
                    alt="bank"
                  />
                  <img
                    className="cart-icons-img mx-2"
                    src="https://img.alicdn.com/tfs/TB18So3dBKw3KVjSZFOXXarDVXa-41-48.png"
                    data-spm-anchor-id="a2g0o.cart.0.i5.606c378dFhfEKO"
                    alt="bank"
                  />
                </div>
              </div>
            </div>
            <Styles>
              <Form
                onSubmit={onSubmit}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                  active,
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      {addressSaved ? (
                        <>
                          <div className="d-flex justify-content-between p-0">
                            <h4>Delivery address</h4>
                            <span>
                              <Link to="/account" className="fs-4 change">
                                Change
                              </Link>
                            </span>
                          </div>
                          <p>
                            {user.name}, {user.tel}
                          </p>
                          <p>{user.address}</p>
                          <p>
                            {user.city}, {user.region}, {user.country},{" "}
                            {user.postalCode}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="form__group">
                            <input
                              className="fontfrm "
                              type="number"
                              placeholder="Phone number"
                              required
                              onChange={(e) => setEnterNumber(e.target.value)}
                            />
                          </div>
                          <div className="form__group">
                            <input
                              className="fontfrm"
                              type="text"
                              placeholder="Enter your address"
                              required
                              onChange={(e) => setEnterAddress(e.target.value)}
                            />
                          </div>
                          <Location 
                            action={[changeCountry, changeRegion, changeCity]}
                            selected={null}
                          />
                          <div className="form__group">
                            <input
                              className="fontfrm"
                              type="number"
                              placeholder="Postal code"
                              required
                              onChange={(e) => setPostalCode(e.target.value)}
                            />
                          </div>
                        </>
                      )}
                      <hr
                        className="mt-2"
                        style={{ backgroundColor: "#434341", width: "97%" }}
                      />
                      <Card
                        style={{ cardRatio: "1.1" }}
                        number={values.numberCard || ""}
                        name={values.nameOnCard || ""}
                        expiry={values.expiry || ""}
                        cvc={values.cvc || ""}
                        focused={active}
                      />

                      <div>
                        <Field
                          className="fs-4  w-100 mx-2"
                          name="numberCard"
                          component="input"
                          type="text"
                          pattern="[\d| ]{16,22}"
                          placeholder="Card Number"
                          format={formatCreditCardNumber}
                        />
                      </div>
                      <div>
                        <Field
                          className="fs-4 w-100 mx-2"
                          name="nameOnCard"
                          component="input"
                          type="text"
                          placeholder="Your name as it appears on the card"
                        />
                      </div>
                      <div>
                        <Field
                          className="fs-4 w-50 mx-2"
                          name="expiry"
                          component="input"
                          type="text"
                          pattern="\d\d/\d\d"
                          placeholder="Valid Thru"
                          format={formatExpirationDate}
                        />
                        <Field
                          className="fs-4 w-50 mx-2"
                          name="cvc"
                          component="input"
                          type="text"
                          pattern="\d{3,4}"
                          placeholder="CVC"
                          format={formatCVC}
                        />
                      </div>
                      <div>
                        <button
                          className="w-50 mx-2"
                          type="submit"
                          disabled={submitting}
                        >
                          Paid
                        </button>
                        <button
                          className="w-50 mx-2"
                          type="button"
                          onClick={form.reset}
                          disabled={submitting || pristine}
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  );
                }}
              />
              <div className="undersummary py-2">
                {logo}
                <p className="fs-4 text-start">
                  keeps your information and payment safe
                </p>
                <div className="text-start">
                  <img
                    className="safe-info-img"
                    src="//ae01.alicdn.com/kf/H5ebd67335c2c4725b0f7e7d501482657Q.png"
                    alt="eshop"
                  />
                </div>
              </div>
            </Styles>
          </Col>
        </Row>
      </section>
    </Helmet>
  );
}

export default Checkout;
