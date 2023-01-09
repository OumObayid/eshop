import { ListGroup } from "reactstrap";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import "./Carts.css";

const Carts = () => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  return (
    <div>
      <ListGroup >
        <div className="cart__item-list ">
          <div>
            <hr style={{ backgroundColor: "#434341", width: "97%" }} />
          </div>
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
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
