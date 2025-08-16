import { Col, ListGroup, Row } from "reactstrap";
import { AccountMenu, Helmet, RatedProducts } from "../../components";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import OrderItem from "./OrderItem";
import { datauser } from "../../redux/dataSlice";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const navigate = useNavigate();
  const userinfo = useSelector(datauser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  
  }, [navigate]);
  return (
    <Helmet title="OrderHistory">
      <section className="orders" id="orders">
        <Row>
          <Col lg="3" md="3" sm="12" xs="12">
            <AccountMenu active="orders" />
          </Col>

          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>
              Your Orders
            </p>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />

            <ListGroup>
              <div className="cart__item-list border p-2">
                {userinfo.orders.length > 0 ? (
                  userinfo.orders.map((item, index) => (
                    <div key={index}>
                      <OrderItem item={item} />
                      <hr
                        style={{
                          backgroundColor: "#434341",
                          width: "97%",
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <h4 className="text-center my-5">No Order did by you</h4>
                )}
              </div>
            </ListGroup>

            <RatedProducts />
          </Col>
        </Row>
      </section>
    </Helmet>
  );
};

export default OrderHistory;
