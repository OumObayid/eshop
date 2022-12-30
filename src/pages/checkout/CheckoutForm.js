import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import { Helmet } from "../../components";
import "./Checkout.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function CheckoutForm() {
  //for card
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // for shiping info
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [enterCity, setEnterCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 30;

  const totalAmount = cartTotalAmount + Number(shippingCost);
  /////////////////end shiping info
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
          amount: totalAmount*100, //total price to paid what we must get from the cart
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          //for shiping info
          const userShippingAddress = {
            name: enterName,
            email: enterEmail,
            phone: enterNumber,
            country: enterCountry,
            city: enterCity,
            postalCode: postalCode,
          };

          shippingInfo.push(userShippingAddress);
          console.log(shippingInfo);
          //end shiping info
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <Helmet title="checkout"> 
    <section>
      <Container>
        <Row>
          <Col lg="8" md="6">
            <h2 className="mb-4">Shipping Address</h2>
            {!success ? (
            <form className="checkout__form" onSubmit={handleSubmit}>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setEnterName(e.target.value)}
                />
              </div>

              <div className="form__group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEnterEmail(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="number"
                  placeholder="Phone number"
                  required
                  onChange={(e) => setEnterNumber(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Country"
                  required
                  onChange={(e) => setEnterCountry(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="City"
                  required
                  onChange={(e) => setEnterCity(e.target.value)}
                />
              </div>
              <div className="form__group">
                <input
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
            ) : (
              <div>
                <h2>
                  You just bought a sweet spatula congrats this is the best
                  decision of you're life
                </h2>
              </div>
            )}
          </Col>

          <Col lg="4" md="6">
            <div className="checkout__bill">
              <h5 className="d-flex align-items-center justify-content-between mb-3">
                Subtotal: <span>${cartTotalAmount}</span>
              </h5>
              <h5 className="d-flex align-items-center justify-content-between mb-3">
                Shipping: <span>${shippingCost}</span>
              </h5>
              <div className="checkout__total">
                <h4 className="d-flex align-items-center justify-content-between">
                  Total: <span>${totalAmount}</span>
                </h4>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </Helmet>
  );
}
