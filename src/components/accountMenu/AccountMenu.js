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
    <div className=" list_menu mb-5">
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
          className="fiPackage list-group-item list-group-item-action me-3 rounded-0 d-flex align-items-center"
        >
          <FiPackage
            id="orderIco"
            color="#F49934"
            size="19px"
            className="ri-heart-line  fw-bold my-2 me-3"
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
    </div>
  );
};

export default AccountMenu;
