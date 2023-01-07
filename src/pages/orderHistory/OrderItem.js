import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ListGroupItem } from "reactstrap";
import { AlertDialogSlide } from "../../components";
import { cartActions } from "../../redux/cartSlice";
import "./OrderItem.css";
const OrderItem = ({ item }) => {
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartLenth = cartProducts.length;
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();
  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.title,
        price: item.price,
        imgUrl: item.img,
      })
    );
    setisOpen(true); //to open dialog box
  };
  //to close dialog box via props
  const closeBox = () => {
    setisOpen(false);
  };
  return (
    <ListGroupItem className="my-0  border-0 cart__item">
      {isOpen && (
        <AlertDialogSlide
          handleClose={closeBox}
          isOpen={isOpen}
          cartLenth={cartLenth}
        />
      )}
      <div className="cart__item-info d-flex gap-4">
        <Link to={ `/ProductDetail/${item.id} `}>
          <img src={item.img} className=" imgcheckout" alt="product-img" />
        </Link>
        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between ">
          <div>
            <span className="bolderF fs-3  ">{item.title}</span>
            <p className=" d-flex align-items-center gap-5 fs-3 ">
              <span>${item.price}</span> x <span>{item.quantity}</span>
            </p>
          </div>
          <div className="fs-3 col-3">
            <div >
              <span className="bolderF">Total : </span>
              <span style={{ color: "#F49934" }}>
                ${item.totalPrice.toLocaleString()}
              </span>
            </div>
            <Button
              className="fs-4 rounded w-100 my-5"
              onClick={addItem}
              color="warning"
            >
              order again
            </Button>
          </div>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default OrderItem;
