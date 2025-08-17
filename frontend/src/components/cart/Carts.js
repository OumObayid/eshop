/*
 * eShop Project - Carts Component
 * Description: Displays the shopping cart sidebar with a list of added products.
 * Allows users to view cart items, see subtotal, and navigate to checkout or shop pages.
 * Shows an empty cart message with a call-to-action if no products are added.
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

import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import "./Carts.css";
import Slide from "@mui/material/Slide";
import imgCart from "../../assets/cartitems.svg";
import { useState } from "react";

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select cart items and total amount from Redux store
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  // Slide state for animation
  const [slide, setSlide] = useState(true);

  // Close the cart with slide animation
  const closeCart = () => {
    setSlide(!slide);
    const setInterv = setInterval(() => {
      dispatch(cartUiActions.toggle());
      clearInterval(setInterv);
    }, 1000);
  };

  // Navigate to checkout page if cart is not empty
  const handleCheckout = () => {
    if (cartProducts.length !== 0) {
      dispatch(cartUiActions.toggle());
      navigate("/checkout");
    }
  };

  // Navigate to shop page
  const handleToshop = () => {
    dispatch(cartUiActions.toggle());
    navigate("/shop");
  };

  return (
    <Slide direction="left" in={slide} mountOnEnter unmountOnExit>
      <div className="cart__container">
        <div className="cart">
          {/* Close button */}
          <div className="cart_close w-100 px-3 my-0">
            <span onClick={closeCart} className="btnclose">
              <i className="ri-close-fill"></i>
            </span>
          </div>

          {/* Cart header */}
          <h3 className="ms-3">Summary</h3>

          {/* Payment method icons */}
          <div className="my-0 py-0">
            <div className="cart-icons-list">
              <span className="w-50">payment method:</span>
              <div className="mx-3">
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB19TEYdB1D3KVjSZFyXXbuFpXa-53-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB19qM7drus3KVjSZKbXXXqkFXa-39-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB18So3dBKw3KVjSZFOXXarDVXa-41-48.png"
                  alt="bank"
                />
              </div>
            </div>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
          </div>

          {/* Cart items */}
          <div className="cart_item-list_right mx-3">
            {cartProducts.length === 0 ? (
              // Show empty cart message
              <div className="text-center noitem">
                <p>
                  <img src={imgCart} alt="empty cart" />
                </p>
                <span className="text-center mt-5">Your cart is empty!</span>
                <p className="text-center mt-5">
                  Browse our products and discover <br />
                  our best offers!
                </p>
                <button
                  className="btn btn-warning mt-5 fs-5"
                  onClick={handleToshop}
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              // Show list of cart items
              <>
                {cartProducts.map((item, index) => (
                  <div key={index}>
                    <CartItem item={item} key={index} />
                    <hr style={{ backgroundColor: "#434341", width: "100%" }} />
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Cart subtotal and checkout button */}
          <div className="cart_bottom d-flex align-items-center justify-content-between">
            <p className="my-auto">
              <span className="text-light fs-4">Subtotal :</span>
              <span className="fw-bold fs-3">
                ${Number(totalAmount ?? 0).toLocaleString()}
              </span>
            </p>
            <button>
              <span className="fs-5" onClick={handleCheckout}>
                Checkout
              </span>
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Carts;
