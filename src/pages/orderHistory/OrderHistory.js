import React from "react";
import { Col, ListGroup, Row } from "reactstrap";
import { AccountMenu, Helmet, RatedProducts } from "../../components";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import OrderItem from "./OrderItem";
import { datauser } from "../../redux/dataSlice";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const userinfo= useSelector(datauser);
  useEffect(() => {
    setOrders(userinfo.orders);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [navigate,userinfo.orders]);
  return (
    <Helmet title="OrderHistory">
      <section className="orders" id="orders">
        <Row>
          <Col lg="3" md="3" sm="12" xs="12">
            <AccountMenu active="orders" />
          </Col>
          {/* -----show informations read only--- */}
          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>
              Your Orders
            </p>
            {/* informations read only */}
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />

            {/* list of orders */}
            <ListGroup>
              <div className="cart__item-list border p-2">
                {orders.length !== 0 ? (
                  orders.map((item, index) => (
                    <div key={index}>
                      <OrderItem item={item} key={index} />
                      <hr
                        style={{
                          backgroundColor: "#434341",
                          width: "97%",
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <>
                    <h4 className="text-center my-5">No Order did by you</h4>
                  </>
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
