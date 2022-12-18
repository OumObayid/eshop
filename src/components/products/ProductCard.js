import React from "react";

import "./ProductCard.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../redux/cartSlice";

const ProductCard = (props) => {
  const { id, productName, imgUrl, price, category,brand,desc } = props.item;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        productName,
        imgUrl,
        price,
      })
    );
  };

  return (
    <div className="product__item border border-danger">
      <div className="product__img">
        <img src={imgUrl} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${id}`}>{productName}</Link>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">${price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
