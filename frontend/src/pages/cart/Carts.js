/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Carts component displays the list of all products in the shopping cart.
 * It uses Redux to fetch the current cart state and renders each CartItem.
 * Shows a message if the cart is empty.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { ListGroup } from "reactstrap";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import "./Carts.css";

const Carts = () => {
  // Get all cart items from Redux store
  const cartProducts = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <ListGroup>
        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            // Display message if cart is empty
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            // Render each item using CartItem component
            cartProducts.map((item, index) => (
              <div key={index}>
                <CartItem item={item} key={index} />
                <hr
                  style={{
                    backgroundColor: "#434341",
                    width: "97%",
                  }}
                />
              </div>
            ))
          )}
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
