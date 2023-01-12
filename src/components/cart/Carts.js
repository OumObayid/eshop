import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import "./Carts.css";
import Slide from "@mui/material/Slide";
import imgCart from "../../assets/cartitems.svg";
import {  useState } from "react";
const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [slide, setSlide] = useState(true)
  const closeCart = () => {
    setSlide(!slide);    
   const setInterv = setInterval(() => {
    dispatch(cartUiActions.toggle());   
    clearInterval(setInterv);
   }, 1000);  

  };

  const handleCheckout = () => {
    if (cartProducts.length !== 0) {
      dispatch(cartUiActions.toggle());
      navigate("/checkout");
    }
  };

  const handleToshop = () => {
    dispatch(cartUiActions.toggle());
    navigate("/shop");
  };
  return (
    <Slide direction="left" in={slide} mountOnEnter unmountOnExit>
      <div className="cart__container ">
        <div className="cart">
          <div className="cart_close w-100  px-3 my-0">
            <span onClick={closeCart} className="btnclose">
              <i className="ri-close-fill"></i>
            </span>
          </div>
          <h3 className="ms-3   ">Summary</h3>
          <div className="my-0 py-0">
            <div className="cart-icons-list ">
              <span className="w-50">payment method:</span>
              <div className=" mx-3">
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB19TEYdB1D3KVjSZFyXXbuFpXa-53-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB19qM7drus3KVjSZKbXXXqkFXa-39-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img"
                  src="https://img.alicdn.com/tfs/TB18So3dBKw3KVjSZFOXXarDVXa-41-48.png"
                  data-spm-anchor-id="a2g0o.cart.0.i5.606c378dFhfEKO"
                  alt="bank"
                />
              </div>
            </div>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
          </div>

          <div className="cart_item-list_right  me-3 ">
            {cartProducts.length === 0 ? (
              <div className="text-center noitem">
                <p>
                  <img src={imgCart} alt="" />
                </p>
                <span className="text-center mt-5">Your cart is empty!</span>
                <p className="text-center mt-5">
                  Browse our products and discover <br />
                  our best offers!
                </p>
                <button
                  className="btn btn-warning mt-5 fs-5"
                  onClick={handleToshop}
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              <>
                {cartProducts.map((item, index) => (
                  <div key={index}>
                    <CartItem item={item} key={index} />
                    <hr
                      style={{
                        backgroundColor: "#434341",
                        width: "100%",
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="cart_bottom  d-flex align-items-center justify-content-between">
            <p className="my-auto">
              <span className="text-light fs-4">Subtotal :</span>
              <span className="  fw-bold fs-3">
                ${totalAmount.toLocaleString()}
              </span>
            </p>
            <button>
              <span className="fs-5" onClick={handleCheckout}>
                Checkout
              </span>
            </button>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default Carts;
