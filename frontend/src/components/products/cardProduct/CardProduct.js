/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * CardProduct component displays a product card with image, name, and price.
 * Allows adding the product to the cart using Redux and shows a confirmation dialog.
 *
 * Props:
 * - item: product object containing { id, productName, price, imgUrl, ... }
 *
 * Usage:
 * <CardProduct item={product} />
 *
 * License:
 * MIT License
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/cartSlice";
import "./CardProduct.css";
import { AlertDialogSlideSimple } from "../../../components";

const CardProduct = ({ item }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // state to control dialog visibility

  // Add product to cart and open confirmation dialog
  const addToCart = () => {
    dispatch(cartActions.addItem(item));
    setIsOpen(true);
  };

  // Close the confirmation dialog
  const closeBox = () => {
    setIsOpen(false);
  };

  return (
    <div className="card m-1 shadow p-1">
      {isOpen && <AlertDialogSlideSimple handleClose={closeBox} isOpen={isOpen} />}

      {/* Link to product detail page */}
      <Link to={`/productDetail/${item.id}`} className="justify-content-center row">
        {/* Product image */}
        <img src={item.imgUrl} className="card-img-top h-75 img-card" alt={item.productName} />

        <div className="card-body justify-content-center row">
          {/* Product price */}
          <h5 className="card-title text-danger text-center pt-4 h-25">
            ${Number(item.price ?? 0).toLocaleString()}
          </h5>

          {/* Product name */}
          <p className="card-text text-center fs-5 h-25 m-0 text-truncate">
            {item.productName}
          </p>
        </div>
      </Link>

      {/* Add to cart button */}
      <button className="btn btnAll fs-5 m-0 w-100" onClick={addToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default CardProduct;
