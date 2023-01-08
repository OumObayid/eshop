import React from "react";
import { Col, ListGroup, Row } from "reactstrap";
import { AccountMenu, Helmet } from "../../components";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import OrderItem from "./OrderItem";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
          setOrders(user.orders);
        };
        getUser(user.email);
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
          {/* -----show informations read only--- */}
          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>
              Your Orders
            </p>
            {/* informations read only */}
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />

            {/* list of orders */}
            <ListGroup>
              <div className="cart__item-list border">
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
          </Col>
        </Row>
      </section>
    </Helmet>
  );
};

export default OrderHistory;
