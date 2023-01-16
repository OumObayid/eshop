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
    <div className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-4">
        <div><img src={img} alt="product-img"/></div>
        <div className="cart__product-info w-75 d-flex align-items-center gap-4 justify-content-between ">
          <div>
            <span className="fw-bolder fs-5 ">{title}</span>
            <p className="quantprice d-flex align-items-center gap-5 fs-5 ">
              {quantity} x <span>${Number(totalPrice).toLocaleString()}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between  increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line fw-bolder"></i>
              </span>
              <span className="quantity fw-bolder">{quantity}</span>
              <span className="decrease__btn " onClick={decreaseItem}>
                <i className="ri-subtract-line fw-bolder"></i>
              </span>
            </div>
          </div>

          <span className="delete_btn p-0" onClick={deletItem}>
            <i className="ri-close-line rcl"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
