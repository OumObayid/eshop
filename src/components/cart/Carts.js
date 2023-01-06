import { ListGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import "./Carts.css";
import Slide from "@mui/material/Slide";
import imgCart from "../../assets/cartitems.svg";
const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
    if (cartProducts.length !== 0) {
      navigate("/checkout");
    }
  };

  const handleToshop = () => {
    dispatch(cartUiActions.toggle());
    navigate("/shop");
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <div className="cart__container">
        <ListGroup className="cart">
          <div className="cart__close w-100">
            <span onClick={toggleCart} className="">
              <i className="ri-close-fill "></i>
            </span>                      
          </div>
          <h3 className="ms-3 ">Summary</h3> 
          <div className="my-0 py-0">
            <div className="cart-icons-list ">
              <span >payment method :</span>
              <div className=" mx-5">
                <img
                  className="cart-icons-img mx-2"
                  src="https://img.alicdn.com/tfs/TB1xcMWdEKF3KVjSZFEXXXExFXa-68-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img mx-2"
                  src="https://img.alicdn.com/tfs/TB19TEYdB1D3KVjSZFyXXbuFpXa-53-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img mx-2"
                  src="https://img.alicdn.com/tfs/TB19qM7drus3KVjSZKbXXXqkFXa-39-48.png"
                  alt="bank"
                />
                <img
                  className="cart-icons-img mx-2"
                  src="https://img.alicdn.com/tfs/TB18So3dBKw3KVjSZFOXXarDVXa-41-48.png"
                  data-spm-anchor-id="a2g0o.cart.0.i5.606c378dFhfEKO"
                  alt="bank"
                />
              </div>
            </div>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
          </div>

          <div className="cart__item-list_right  me-3 ">
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

          <div className="cart__bottom  d-flex align-items-center justify-content-between">
            <p className="my-auto">
              <span className="text-light fs-4">Subtotal :</span>
              <span className="  fw-bold fs-3">
                ${totalAmount.toLocaleString()}
              </span>
            </p>
            <button>
              <span className="fs-5" onClick={toggleCart}>
                Checkout
              </span>
            </button>
          </div>
        </ListGroup>
      </div>
    </Slide>
  );
};

export default Carts;
