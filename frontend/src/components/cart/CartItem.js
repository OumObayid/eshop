/*
 * eShop Project - CartItem Component
 * Description: Represents a single item in the shopping cart. 
 * Provides functionality to increment, decrement, or remove the item 
 * from the cart using Redux actions.
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

import "./CartItem.css";

import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../../redux/cartSlice";

/**
 * CartItem component
 * @param {Object} item - The cart item object
 */
const CartItem = ({ item }) => {
  const { id, title, price, img, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  // Increase item quantity in cart
  const incrementItem = () => {
    dispatch(
      addItem({
        id,
        title,
        price,
        img,
      })
    );
  };

  // Decrease item quantity in cart
  const decreaseItem = () => {
    dispatch(removeItem(id));
  };

  // Remove item completely from cart
  const deletItem = () => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-4">
        {/* Product image */}
        <div>
          <img src={img} alt="product-img" />
        </div>

        {/* Product info and controls */}
        <div className="cart__product-info w-75 d-flex align-items-center gap-4 justify-content-between ">
          <div>
            {/* Product title */}
            <span className="fw-bolder fs-5 ">{title}</span>

            {/* Quantity and total price */}
            <p className="quantprice d-flex align-items-center gap-5 fs-5 ">
              {quantity} x <span>${Number(totalPrice ?? 0).toLocaleString()}</span>
            </p>

            {/* Increase/decrease buttons */}
            <div className="d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line fw-bolder"></i>
              </span>
              <span className="quantity fw-bolder">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i className="ri-subtract-line fw-bolder"></i>
              </span>
            </div>
          </div>

          {/* Delete item button */}
          <span className="delete_btn p-0" onClick={deletItem}>
            <i className="ri-close-line rcl"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
