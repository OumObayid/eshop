import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartActions } from "../../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./CardProduct.css";
import { AlertDialogSlide } from "../../../components";

const CardProduct = (props) => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartLenth = cartProducts.length;
  const prod = props.item; 

  const dispatch = useDispatch();
  // for dialog box
  const [isOpen, setisOpen] = useState(false);

  const addToCart = () => {
    dispatch(cartActions.addItem(prod));
    setisOpen(true);
  };

  const closeBox = () => {
    setisOpen(false);
  };

  return (
    <div className="card m-1  shadow p-1 hoverCard ">
      {isOpen && (
        <AlertDialogSlide
          handleClose={closeBox}
          isOpen={isOpen}
          cartLenth={cartLenth}
        />
      )}

      <Link
        to={ `/ProductDetail/${prod.id} `}
        className="justify-content-center row"
      >
        <img
          src={prod.imgUrl}
          className="card-img-top h-75 img-card"
          alt="imagee"
        />

        <div className="card-body justify-content-center row">
          <h5 className="card-title text-danger text-center pt-4 h-25">
            ${prod.price}
          </h5>
          <p className="card-text text-center fs-5 h-25 m-0 text-truncate ">
            {prod.productName}
          </p>
        </div>
      </Link>
      <button className="btn btn-warning  fs-5  m-0" onClick={addToCart}>
           Add to cart
      </button>
    </div>
  );
};

export default CardProduct;
