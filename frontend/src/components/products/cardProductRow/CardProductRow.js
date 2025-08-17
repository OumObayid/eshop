/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid

 * Description:
 * CardProductRow component displays a product in a row format with image, name, price, and description.
 * It allows adding the product to the cart using Redux and shows a confirmation dialog.
 *
 * Props:
 * - item: product object containing { id, productName, price, imgUrl, desc, ... }
 *
 * Usage:
 * <CardProductRow item={product} />
 *
 * License:
 * MIT License
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { useState } from "react"; // React hook for local state
import { Link } from "react-router-dom"; // Routing for product detail link
import { cartActions } from "../../../redux/cartSlice"; // Redux actions for cart
import { useDispatch } from "react-redux"; // Redux hook to dispatch actions
import "./CardProductRow.css"; // CSS specific for this component
import Card from "../../card/Card"; // Wrapper Card component
import { Row, Col } from "reactstrap"; // Bootstrap row/column layout
import { AlertDialogSlideSimple } from "../../../components"; // Dialog for add-to-cart confirmation

const CardProduct = (props) => {
  const prod = props.item; // Extract product from props
  const dispatch = useDispatch(); // Initialize Redux dispatch

  // State to control the visibility of the confirmation dialog
  const [isOpen, setisOpen] = useState(false);

  // Function to add product to cart and show confirmation dialog
  const addToCart = () => {
    dispatch(cartActions.addItem(prod));
    setisOpen(true);
  };

  // Function to close the dialog
  const closeBox = () => {
    setisOpen(false);
  };

  return (
    <Card>
      {/* Show dialog if isOpen is true */}
      {isOpen && (
        <AlertDialogSlideSimple handleClose={closeBox} isOpen={isOpen} />
      )}

      <Row>
        {/* Product image column */}
        <Col lg="4" md="4" sm="12" xs="12" className="border-2 border-end">
          <Link
            to={`/productDetail/${prod.id}`}
            className="justify-content-center row"
          >
            <img src={prod.imgUrl} alt="product" />
          </Link>
        </Col>

        {/* Product details column */}
        <Col lg="8" md="8" sm="12" xs="12">
          <Col
            lg="12"
            md="12"
            sm="12"
            xs="12"
            className="card-body justify-content-center row px-0"
          >
            {/* Product price */}
            <h5 className="card-title text-danger text-left ">
              ${Number(prod.price || 0).toLocaleString()}
            </h5>
            {/* Product name */}
            <p className="card-text text-left fs-4 text-truncate fw-bold">
              {prod.productName}
            </p>
          </Col>

          {/* Product description and add-to-cart button */}
          <Col lg="12" md="12" sm="12" xs="12" className="mb-auto">
            <Col lg="12" md="12" sm="12" xs="12">
              <p>{prod.desc}</p>
            </Col>
            <Col
              lg="12"
              md="12"
              sm="12"
              xs="12"
              className="d-flex align-items-end "
            >
              <button
                className="btn btn-warning fs-5 mb-2 d-flex"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </Col>
          </Col>
        </Col>
      </Row>
    </Card>
  );
};

export default CardProduct;
