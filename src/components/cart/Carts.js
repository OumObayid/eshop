import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";

import "./Carts.css";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };
  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i className="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list me-3">
          <div>
            <h4  className="ms-3">Summary</h4>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
          </div>

          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => (
              <div>
                <CartItem item={item} key={index} />
                <hr
                  style={{
                    backgroundColor: "#434341",
                    width: "100%",
                  }}
                />
              </div>
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <p className="my-auto">
            <span className="text-light fs-5 ">Subtotal :</span>
            <span className="  fw-bold fs-3">${totalAmount}</span>
          </p>
          <button>
            <Link to="/checkout" onClick={toggleCart}>
              Checkout
            </Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;
