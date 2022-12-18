
import React from "react";
import { Link } from "react-router-dom";
import { cartActions } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import "./CardProduct.css"

const CardProduct = (props) => {
  const prod = props.item;

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(
      cartActions.addItem(prod)
    );
  };
  return (
    <div className="card m-1  shadow p-1 hoverCard ">
      <Link to={`/ProductDetail/${prod.id}`}  className="justify-content-center row">
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
      <button
        className="btn btn-warning  fs-5  m-0"
        onClick={addToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default CardProduct;
