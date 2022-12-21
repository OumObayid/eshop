import React from "react";
import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { toggle,cartIsVisible } from "../../redux/cartUiSlice";
import { cartItems,totalAmountt } from "../../redux/cartSlice";
import "./Cart.css";
import Helmet from "../../components/Helmet/Helmet";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(cartItems);
  const totalAmount = useSelector(totalAmountt);

  const toggleCart = () => {
    console.log(cartIsVisible)
    dispatch(toggle());
    console.log(cartIsVisible)
  };
  return (
    <Helmet title="cart">
    <div className="cart__container">
    <ListGroup className="cart">
      <div className="cart__close">
        <span onClick={toggleCart}>
          <i className="ri-close-fill"></i>
        </span>
      </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => (             
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>${totalAmount}</span>
          </h6>
          <button>
            <Link to="/checkout" onClick={toggleCart}>
              Checkout
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
    </Helmet>
  );
};

export default Carts;
