import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";
import "./checkout.css";

const Checkout = () => {
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

  const submitHandler = (e) => {
    e.preventDefault();
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
  };

  return (
    <Helmet title="checkout"> 
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h2 className="mb-4">Shipping Address</h2>
              <form className="checkout__form" onSubmit={submitHandler}>
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
                <Button color="warning" type="submit" className="fs-5">
                  Payment
                </Button>
              </form>
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
};

export default Checkout;
