import React from "react";
import { FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import $ from "jquery";
import { useEffect } from "react";
import "./AccountMenu.css"
const AccountMenu = ({ active }) => {
  useEffect(() => {
    if (active === "account") $("#account_link").addClass("bg");
    if (active === "orders") $("#orders_link").addClass("bg");
    if (active === "wishlist") $("#wishlist_link").addClass("bg");
  }, [active]);


  return (
    <Col lg="3" md="3" sm="12" xs="12" className="list-group mb-5">
      <Link to="/account">        
        <button
          id="account_link"
          className="list-group-item list-group-item-action me-3 rounded-0 d-flex align-items-center "
        >
          <i
            style={{ color: "#F49934" }}
            className="ri-user-line fs-1 me-3"
          ></i>
          <span className="fs-3 me-3">Account</span>
        </button>
      </Link>
      <Link to="/order-history">
        <button
          id="orders_link"
          className="list-group-item list-group-item-action me-3 rounded-0 d-flex align-items-center py-3 "
        >
          <FiPackage
            id="orderIco"
            color="#F49934"
            size="24px"
            className="ri-heart-line  fw-bold  me-3"
          />
          <span className="fs-3 me-3">Orders</span>
        </button>
      </Link>
      <Link to="/wishlist">        
        <button
          id="wishlist_link"
          className="list-group-item list-group-item-action me-3 rounded-0 d-flex align-items-center "
        >
          <i
            style={{ color: "#F49934" }}
            className="ri-heart-line fs-1 me-3"
          ></i>
          <span className="fs-3 me-3">Wishlist</span>
        </button>
      </Link>
    </Col>
  );
};

export default AccountMenu;
