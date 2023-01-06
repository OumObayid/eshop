import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Card, Helmet, Location } from "../../components";
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
  arrayUnion,
} from "firebase/firestore";
import { cartItems, clearCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

/////////////declare options for card element
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "",
      color: "red",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#5a7091" },
    },
    invalid: {
      iconColor: "#f70e0e",
      color: "#f70e0e",
    },
  },
};
////////---end---/////declare options for card element

export default function CheckoutForm() {
  //to animate navbar
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) $(".products").removeClass("fixed");  
  }, []);

  const dispatch = useDispatch();
  ///////////////////first of all check if logged
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/login");
    } else {
      const getUser = async (email) => {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        var userGet = {};
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
  ///////////---end---////////first of all check if logged

  //for card
  const stripe = useStripe();
  const elements = useElements();
  // for shiping info
  const [user, setUser] = useState({});
  const [enterNumber, setEnterNumber] = useState("");
  const [enterAddress, setEnterAddress] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterRegion, setEnterRegion] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
 
  // for cartItem
  const cartProducts = useSelector(cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);

  //functions to get infos (country,region,city) from component Location:

  const changeCountry = (e) => {
    setEnterCountry(e.target.value);
  };
  const changeRegion = (e) => {
    setEnterRegion(e.target.value);
  };
  const changeCity = (e) => {
    setEnterCity(e.target.value);
  };

  /////////////////////// function to valid payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: totalAmount * 100, //total price to paid what we must get from the cart
          id,
        });
        // console.log(" user.id :", user.id);
        if (response.data.success) {
          const docRef = doc(db, "users", user.id);
          await updateDoc(docRef, {
            tel: enterNumber,
            address: enterAddress,
            country: enterCountry,
            region: enterRegion,
            city: enterCity,
            postalCode: postalCode,
            card: {
              brand: paymentMethod.card.brand,
              exp_month: paymentMethod.card.exp_month,
              exp_year: paymentMethod.card.exp_year,
            },
          })
            .then((docRef) => {
              ////any thinks
            })
            .catch((error) => {
              toast.error(error.message);
              console.log("error.message :", error.message);
            });
          await cartProducts.forEach((item) => {
            updateDoc(docRef, {
              orders: arrayUnion(item),
            })
              .then((docRef) => {})
              .catch((error) => {
                toast.error(error.message);
              });
          });

          dispatch(clearCart());
          navigate("/checkoutSuccess");
        }
      } catch (error) {
        console.log("Error", error);
        toast.error(error.message);
      }
    } else {
      console.log(error.message);
      toast.error(error.message);
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
      <section>
        <Container>
          <Row id="container-element">
            <Col lg="7" md="7" className="products ">
              <Card>
                <h2 className="mb-2">Summary</h2>
                <Col lg="12" md="12" className="">
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
                      <h4 className="d-flex align-items-center justify-content-between">
                        Total: <span>${totalAmount.toLocaleString()}</span>
                      </h4>
                    </div>
                  </div>
                </Col>
              </Card>
            </Col>

            <Col lg="5" md="5" className=" products fixed" id="products">
              <div>
                <Card>
                  <div className="d-flex  justify-content-between align-items-center ">
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
                  <div>
                    <hr
                      className="mt-2"
                      style={{ backgroundColor: "#434341", width: "97%" }}
                    />
                  </div>

                  <form onSubmit={handleSubmit}>
                    {addressSaved ? (
                      <>
                        <div className="d-flex justify-content-between">
                          <h4>Delivery address</h4>
                          <span>
                            <Link
                              to="/accountedit"
                              className="fs-4 text-danger"
                            >
                              Change
                            </Link>
                          </span>
                        </div>
                        <p>
                          {user.name}, {user.tel}
                        </p>
                        <p>{user.address}</p>
                        <p>
                          {user.city}, {user.region}, {user.country}, {user.postalCode}
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

                    <fieldset className="FormGroup">
                      <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} />
                      </div>
                    </fieldset>
                    <Button color="warning" type="submit" className="fs-5">
                      Payment
                    </Button>
                    <p className="fs-5">
                      By clicking on "PAYMENT", I confirm that I have read and
                      understood &nbsp;
                      <span>
                        <Link to="/terms" style={{ color: "red" }}>
                          the terms and conditions
                        </Link>
                      </span>
                    </p>
                  </form>
                </Card>
                <Card>
                  <div className="safe-info-text">
                    {logo} keeps your information and payment safe
                  </div>
                  <img
                    className="safe-info-img"
                    src="//ae01.alicdn.com/kf/H5ebd67335c2c4725b0f7e7d501482657Q.png"
                    alt="eshop"
                  />
                </Card>
              </div>{" "}
            </Col>
          </Row>
          {/* <button className="btn btn-warning w-100 h-25" onClick={execute}>
            test firebse
          </button> */}
        </Container>
      </section>
    </Helmet>
  );
}
