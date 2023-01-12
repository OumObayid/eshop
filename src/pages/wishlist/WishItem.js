import { doc, FieldValue, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ListGroupItem } from "reactstrap";
import { AlertDialogSlide } from "../../components";
import { db } from "../../firebase/config";
import { cartActions } from "../../redux/cartSlice";
import { deleteWish } from "../../redux/wishSlice";
import "./Wish.css";

const WishItem = ({ item }) => {
    const { id, productName, imgUrl, price} = item;


  const cartProducts = useSelector((state) => state.cart.cartItems);
  const cartLenth = cartProducts.length;
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();
  // to add product to cart
  const addTocart = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        productName: productName,
        price: price,
        imgUrl: imgUrl,
      })
    );
    setisOpen(true); //to open dialog box
  };
  //to close dialog box via props
  const closeBox = () => {
    setisOpen(false);
  };
 
  const deletW = async () => {
    dispatch(deleteWish(id));
    const docRef = doc(db, "products", id);         
      await updateDoc(docRef, {
        wish: increment(-1)
      })
        .then((docRef) => {})
        .catch((error) => {
          console.log("error.message :", error.message);
        });
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
          <Link to={`/ProductDetail/${id} `}>
            <img src={imgUrl} className=" imgcheckout" alt="product-img" />
          </Link>
          <div>
            <span className="bolderF fs-3  ">{productName}</span>    
            <p className=" d-flex align-items-center gap-5 fs-4 ">
              <span>${Number(price).toLocaleString()}</span>
              
            </p>       
          </div>
        </div>
        <div className="fs-3 col-lg-2 col-md-2 col-sm-12 col-xs-12 contain2">          
          <Button
            className="fs-5  rounded  my-5"
            onClick={addTocart}
            color="warning"
          >
            Add To Cart
          </Button>
        </div>
        <div className="fs-3 col-lg-2 col-md-2 col-sm-12 col-xs-12 contain2">          
          <Button
            className="fs-5  rounded  my-5"
            onClick={deletW}
            color="warning"
          >
            Delet Wish
          </Button>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default WishItem;
