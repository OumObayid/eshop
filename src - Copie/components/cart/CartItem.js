import React from "react";
import { ListGroupItem } from "reactstrap";

import "./CartItem.css";

import { useDispatch } from "react-redux";
import { addItem ,  deleteItem, removeItem } from "../../redux/cartSlice"
const CartItem = ({ item }) => {
  const { id, title, price, img, quantity, totalPrice } = item;

  const dispatch = useDispatch();

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

  const decreaseItem = () => {
    dispatch(removeItem(id));
  };

  const deletItem = () => {
    dispatch(deleteItem(id));
  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={img} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{title}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>${totalPrice}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={deletItem}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
