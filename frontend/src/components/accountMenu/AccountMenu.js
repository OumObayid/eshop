/*
 * eShop Project - Account Menu Component
 * Description: This React component renders the account menu sidebar for the eShop application.
 * It allows users to navigate between their account details, order history, and wishlist.
 * The active menu item is highlighted dynamically based on the current section.
 *
 * Copyright (c) 2025 Oumaima El Obayid
 * This file is part of the eShop application.
 * Licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { useState, useEffect } from "react";
import { FiPackage } from "react-icons/fi"; // icon for orders
import { Link } from "react-router-dom"; // navigation links
import $ from "jquery"; // for DOM manipulation
import "./AccountMenu.css"; // styles for the account menu

const AccountMenu = ({ active }) => {
  // State to manage icon colors for active/inactive menu items
  const [color1, setColor1] = useState("#F49934"); // Account icon color
  const [color2, setColor2] = useState("#F49934"); // Orders icon color
  const [color3, setColor3] = useState("#F49934"); // Wishlist icon color

  // Effect to highlight the active menu item based on the "active" prop
  useEffect(() => {
    if (active === "account") {
      $("#account_link").addClass("bg"); // add background class
      setColor1("#fff"); // highlight Account icon
      setColor2("#F49934");
      setColor3("#F49934");
    }
    if (active === "orders") {
      $("#orders_link").addClass("bg"); // add background class
      setColor1("#F49934");
      setColor2("#fff"); // highlight Orders icon
      setColor3("#F49934");
    }
    if (active === "wishlist") {
      $("#wishlist_link").addClass("bg"); // add background class
      setColor1("#F49934");
      setColor2("#F49934");
      setColor3("#fff"); // highlight Wishlist icon
    }
  }, [active]); // re-run effect when "active" prop changes

  return (
    <div className="list_menu mb-5">
      {/* Account Link */}
      <Link to="/account">
        <button
          id="account_link"
          className="list-group-item itemlist list-group-item-action me-3 rounded-0 d-flex align-items-center"
        >
          <i style={{ color: color1 }} className="ri-user-line fs-1 me-3"></i>
          <span className="fs-3 me-3">Account</span>
        </button>
      </Link>

      {/* Orders Link */}
      <Link to="/order-history">
        <button
          id="orders_link"
          className="fiPackage list-group-item itemlist list-group-item-action me-3 rounded-0 d-flex align-items-center"
        >
          <FiPackage
            id="orderIco"
            color={color2} // dynamic color
            size="19px"
            className="ri-heart-line fw-bold my-2 me-3"
          />
          <span className="fs-3 me-3">Orders</span>
        </button>
      </Link>

      {/* Wishlist Link */}
      <Link to="/wishlist">
        <button
          id="wishlist_link"
          className="list-group-item itemlist list-group-item-action me-3 rounded-0 d-flex align-items-center"
        >
          <i style={{ color: color3 }} className="ri-heart-line fs-1 me-3"></i>
          <span className="fs-3 me-3">Wishlist</span>
        </button>
      </Link>
    </div>
  );
};

export default AccountMenu;
