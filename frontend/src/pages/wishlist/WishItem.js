/*
 * eShop Project
 * WishItem Component
 *
 * Description:
 * Displays a single item in the wishlist.
 * Allows user to add the product to cart and remove it from the wishlist.
 * Syncs the wishlist count in Firebase Firestore.
 *
 * License:
 * MIT License
 */

import { doc, increment, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";
import { AlertDialogSlideSimple } from "../../components";
import { db } from "../../firebase/config";
import { cartActions } from "../../redux/cartSlice";
import { deleteWish } from "../../redux/wishSlice";
import "./Wish.css";

// Component for individual wishlist item
const WishItem = ({ item }) => {
  const { id, productName, imgUrl, price, category, brand } = item;

  // State to control alert dialog
  const [isOpen, setisOpen] = useState(false);
  const dispatch = useDispatch();

  // Add product to cart
  const addTocart = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        productName: productName,
        price: price,
        imgUrl: imgUrl,
      })
    );
    setisOpen(true); // open confirmation dialog
  };

  // Close dialog
  const closeBox = () => {
    setisOpen(false);
  };

  // Remove product from wishlist
  const deletW = async () => {
    dispatch(deleteWish(id));
    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      wish: increment(-1), // decrement wishlist count in Firestore
    })
      .then(() => {})
      .catch((error) => {
        console.log("error.message :", error.message);
      });
  };

  return (
    <ListGroupItem className="my-0 border-0 cart__item">
      {/* Dialog box */}
      {isOpen && (
        <AlertDialogSlideSimple handleClose={closeBox} isOpen={isOpen} />
      )}

      <div className="gap-4 contain">
        {/* Product image and info */}
        <div className="col-lg-8 col-md-8 d-flex align-items-center gap-4 justify-content-start">
          <Link to={`/ProductDetail/${id}`}>
            <img src={imgUrl} className="imgcheckout" alt="product-img" />
          </Link>
          <div>
            <span className="bolderF fs-2">{productName}</span>
            <p className="d-flex align-items-center gap-5 fs-3">
              <span>${Number(price || 0).toLocaleString()}</span>
            </p>
            <p>
              <span className="fwbld">Category: </span>
              {category}
            </p>
            <p>
              <span className="fwbld">Brand: </span>
              {brand}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
          <div className="fs-3 contain2">
            <button
              className="fs-5 btnwish my-5"
              onClick={addTocart}
              color="warning"
            >
              Add To Cart
            </button>
          </div>
          <div className="fs-3 contain2">
            <button
              className="fs-5 btnwish my-5"
              onClick={deletW}
              color="warning"
            >
              Delete Wish
            </button>
          </div>
        </div>
      </div>
    </ListGroupItem>
  );
};

// Export WishItem component
export default WishItem;
