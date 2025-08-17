/*
 * eShop Project
 * OrderItem Component
 *
 * Description:
 * Displays individual items from a user's order.
 * Allows re-ordering of a specific product and shows order details
 * like product image, title, price, quantity, total, and order date.
 *
 * License:
 * MIT License
 */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";
import { AlertDialogSlideSimple } from "../../components";
import { cartActions } from "../../redux/cartSlice";
import "./OrderItem.css";

const OrderItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const dispatch = useDispatch();

  // 🔹 Handle "Order again" click
  const addItem = (product) => {
    console.log("Order again clicked for:", product);
    dispatch(
      cartActions.addItem({
        id: product.id,
        productName: product.title,
        price: product.price,
        imgUrl: product.img,
      })
    );
    setIsOpen(true); // Show confirmation modal
  };

  const closeBox = () => setIsOpen(false);

  console.log("OrderItem mounted with item:", item);

  return (
    <ListGroupItem className="my-0 border-0 cart__item">
      {/* Alert dialog for confirmation */}
      {isOpen && (
        <AlertDialogSlideSimple handleClose={closeBox} isOpen={isOpen} />
      )}

      {/* Map through each product in this order */}
      {item.items.map((product, index) => (
        <div key={product.id}>
          <div className="gap-4 contain">
            {/* Product image and title */}
            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 containt1">
              <Link to={`/ProductDetail/${product.id}`}>
                <img
                  src={product.img}
                  className="imgcheckout"
                  alt={product.title}
                />
              </Link>
              <div>
                <span className="bolderF fs-3">{product.title}</span>
                <p className="d-flex align-items-center gap-5 fs-4">
                  <span style={{ color: "#1abc9c", fontWeight: "bold" }}>
                    ${Number(product.price || 0).toLocaleString()}
                  </span>
                  x <span>{product.quantity}</span>
                </p>

                {/* Order date */}
                <p className="text-center mt-2">
                  <span className="fs-5">Order placed on: </span>
                  <span className="orderdate fs-4">
                    {new Date(product.orderDate).toDateString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Total price and "Order again" button */}
            <div className="fs-3 col-lg-2 col-md-2 col-sm-12 col-xs-12 row">
              <span className="bolderF d-flex justify-content-center text-wrap">
                <span>Total : &nbsp;</span>
                <span style={{ color: "#F49934" }}>
                  ${Number(product.totalPrice || 0).toLocaleString()}
                </span>
              </span>

              <button
                className="btnAll fs-4 my-5"
                onClick={() => addItem(product)}
                color="warning"
              >
                order again
              </button>
            </div>
          </div>

          {/* Styled separator except after last product */}
          {index < item.items.length - 1 && (
            <hr style={{ border: "1px solid #F49934", margin: "20px 0" }} />
          )}
        </div>
      ))}
    </ListGroupItem>
  );
};

export default OrderItem;
