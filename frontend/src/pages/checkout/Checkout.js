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
import "./checkout.css";
import Carts from "../cart/Carts";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { cartItems, clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import $ from "jquery";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Checkout() {
  const [user, setUser] = useState({
    card: {
      idCard: "",
      numberCard: "",
      last4: "",
      nameOnCard: "",
      cvc: "",
      brand: "",
      exp_month: 0,
      exp_year: 0,
    },
  });
  const [enterNumber, setEnterNumber] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector(cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);

  const changeCountry = (e) => setEnterCountry(e.target.value);
  const changeCity = (e) => setEnterCity(e.target.value);

  // 🔹 Charger les infos utilisateur en temps réel
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        const q = query(
          collection(db, "users"),
          where("email", "==", currentUser.email)
        );

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          let userGet = {};
          querySnapshot.forEach((docSnap) => {
            userGet = {
              id: docSnap.id,
              ...docSnap.data(),
            };
          });
          setUser(userGet);
          if (userGet.address) setAddressSaved(true);
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) $(".products").removeClass("fixed");
  }, []);

  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      const s = window.document.createElement("script");
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
        async (status, response) => {
          if (status === 200) {
            try {
              const res = await axios.post("stripe-payment", {
                token: response,
                email: user.email,
                amount: totalAmount,
              });

              const orderlist = cartProducts.map((item) => ({
                id: item.id,
                title: item.title,
                img: item.img,
                price: item.price,
                quantity: item.quantity,
                orderDate: new Date().toDateString(),
                totalPrice: item.totalPrice,
              }));

              const docRef = doc(db, "users", user.id);

              // 🔹 Ajouter la commande sans écraser les anciennes
              await updateDoc(docRef, {
                tel: enterNumber || user.tel,
                address: enterAddress || user.address,
                country: enterCountry || user.country,
                city: enterCity || user.city,
                orders: arrayUnion({
                  id: Date.now(),
                  items: orderlist,
                  total: totalAmount,
                  createdAt: new Date().toISOString(),
                }),
                card: {
                  idCard: res.data.payment_method || user.card?.idCard || "",
                  numberCard: values.numberCard || user.card?.numberCard || "",
                  brand:
                    res.data.payment_method_details?.card?.brand ||
                    user.card?.brand ||
                    "",
                  nameOnCard: values.nameOnCard || user.card?.nameOnCard || "",
                  exp_month:
                    res.data.payment_method_details?.card?.exp_month ||
                    user.card?.exp_month ||
                    0,
                  exp_year:
                    res.data.payment_method_details?.card?.exp_year ||
                    user.card?.exp_year ||
                    0,
                  cvc: values.cvc || user.card?.cvc || "",
                  last4:
                    res.data.payment_method_details?.card?.last4 ||
                    user.card?.last4 ||
                    "",
                },
              });

              setIsLoading(false);
              dispatch(clearCart());
              navigate("/checkoutSuccess");
            } catch (error) {
              setIsLoading(false);
              toast.error(error.message);
              console.log(error.message);
            }
          } else {
            setIsLoading(false);
            toast.error(response.error.message);
          }
        }
      );
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log("Stripe error:", error.message);
    }
  };

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
      {isLoading && <Loader />}
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
                    Subtotal:{" "}
                    <span>
                      ${Number(cartTotalAmount || 0).toLocaleString()}
                    </span>
                  </h5>
                  <h5 className="d-flex align-items-center justify-content-between ">
                    Shipping:{" "}
                    <span>${Number(shippingCost || 0).toLocaleString()}</span>
                  </h5>
                  <div className="checkout__total">
                    <h4 className="d-flex align-items-center justify-content-between my-2">
                      Total:{" "}
                      <span>${Number(totalAmount || 0).toLocaleString()}</span>
                    </h4>
                  </div>
                </div>
              </Col>
            </div>
          </Col>
          <Col lg="5" md="5" className="products fixed" id="products">
            <div className="Payemnt">
              <h2>Payment</h2>
              <div className="cart-icons-list">
                <span className="ms-3">method </span>
                <div className="mx-5 d-flex">
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
                }) => (
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
                          {user.city && `${user.city}, `} {user.country && user.country}
                         
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="form__group">
                          <input
                            className="fontfrm"
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
                          action={[changeCountry, changeCity]}
                          selected={null}
                        />
                       
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
                )}
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
