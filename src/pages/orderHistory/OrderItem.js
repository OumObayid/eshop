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
      <div className=" gap-4 contain">
        <div className="col-lg-8 col-md-8 d-flex align-items-center gap-4 justify-content-start ">
          <Link to={`/ProductDetail/${item.id} `}>
            <img src={item.img} className=" imgcheckout" alt="product-img" />
          </Link>
          <div>
            <span className="bolderF fs-3  ">{item.title}</span>
            <p className=" d-flex align-items-center gap-5 fs-4 ">
              <span>${item.price.toLocaleString()}</span> x <span>{item.quantity}</span>
            </p>
          </div>
        </div>
        <div className="fs-3 col-lg-2 col-md-2 col-sm-12 col-xs-12 contain2">
          <div className="d-flex ">
            <span className="bolderF  d-flex text-nowrap">
              Total : &nbsp;
              <span style={{ color: "#F49934" }}>
                ${item.totalPrice.toLocaleString()}
              </span>
            </span>
          </div>
          <Button
            className="fs-5  rounded  my-5"
            onClick={addItem}
            color="warning"
          >
            order again
          </Button>
        </div>
      </div>
      <p className="text-center"><span className="fs-5">order placed on : </span> <span className="orderdate fs-4">{item.orderDate}</span></p>
    </ListGroupItem>
  );
};

export default OrderItem;
