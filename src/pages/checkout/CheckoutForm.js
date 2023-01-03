import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Helmet, Location } from "../../components";
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
import { useEffect } from "react";
import $ from "jquery";


/////////////declare options for card element
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "",
      color: "#0A1930",
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
        let user = {};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          user = {
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
        setUser(user);
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
  const shippingInfo = [];
  // for cartItem
  const cartProducts = useSelector(cartItems);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;
  const totalAmount = cartTotalAmount + Number(shippingCost);

  //functions to pass to component Location (country,region,city):
  const changeCountry = (e) => {
    setEnterCountry(e.target.options[e.target.options.selectedIndex].text);
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
        console.log(" user.id :", user.id);
        if (response.data.success) {
          const docRef = doc(db, "users", user.id);
          await updateDoc(docRef, {
            tel: enterNumber,
            address: enterAddress,
            country: enterCountry,
            region: enterRegion,
            city: enterCity,
            postalCode: postalCode,
            // orders: cartProducts
          })
            .then((docRef) => {})
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

          //for shiping info
          const userShippingAddress = {
            tel: enterNumber,
            address: enterAddress,
            country: enterCountry,
            region: enterRegion,
            city: enterCity,
            postalCode: postalCode,
          };

          shippingInfo.push(userShippingAddress);
          console.log("shippingInfo :", shippingInfo);
          //end shiping info
          //clear cart
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
  ////////////---end---/////////// function to valid payment

  // const execute = async () => {
  //   const docRef = doc(db, "users", user.id);
  //   await updateDoc(docRef, {
  //     tel: enterNumber,
  //     address: enterAddress,
  //     country: enterCountry,
  //     region: enterRegion,
  //     city: enterCity,
  //     postalCode: postalCode,
  //     // orders: cartProducts
  //   })
  //     .then((docRef) => {})
  //     .catch((error) => {
  //       toast.error(error.message);
  //       console.log("error.message :", error.message);
  //     });
  //   await cartProducts.forEach((item) => {
  //     updateDoc(docRef, {
  //       orders: arrayUnion(item),
  //     })
  //       .then((docRef) => {})
  //       .catch((error) => {
  //         toast.error(error.message);
  //       });
  //   });
  // };
 


  return (
    <Helmet title="checkout">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <h2 className="mb-5">Summary</h2>
              <Col lg="12" md="12" className="">
                <Carts />
              </Col>
              <Col lg="12" md="12">
                <div className="checkout__bill">
                  <h5 className="d-flex align-items-center justify-content-between ">
                    Subtotal: <span>${cartTotalAmount}</span>
                  </h5>
                  <h5 className="d-flex align-items-center justify-content-between ">
                    Shipping: <span>${shippingCost}</span>
                  </h5>
                  <div className="checkout__total">
                    <h4 className="d-flex align-items-center justify-content-between">
                      Total: <span>${totalAmount}</span>
                    </h4>
                  </div>
                </div>
              </Col>
            </Col>
            <Col lg="6" md="6">
              <h2 className="mb-4">Payemnt</h2>
              <form  onSubmit={handleSubmit}>
                <div className="form__group">
                  <input className="fontfrm "
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input className="fontfrm"
                    type="text"
                    placeholder="Enter your address"
                    required
                    onChange={(e) => setEnterAddress(e.target.value)}
                  />
                </div>               
                <Location action={[changeCountry, changeRegion, changeCity]} />
                <div className="form__group">
                  <input className="fontfrm"
                    type="number"
                    placeholder="Postal code"
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>

                <fieldset className="FormGroup">
                  <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                  </div>
                </fieldset>
                <Button color="warning" type="submit" className="fs-5">
                  Payment
                </Button>
              </form>
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
