import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";
import { AlertDialogSlideSimple } from "../../components";
import { cartActions } from "../../redux/cartSlice";
import "./OrderItem.css";

const OrderItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

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
    setIsOpen(true);
  };

  const closeBox = () => setIsOpen(false);

  console.log("OrderItem mounted with item:", item);

  return (
    <ListGroupItem className="my-0 border-0 cart__item">
      {isOpen && (
        <AlertDialogSlideSimple handleClose={closeBox} isOpen={isOpen} />
      )}

      {item.items.map((product, index) => (
        <div key={product.id}>
          <div className="gap-4 contain">
            {/* Image et titre du produit */}
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
                  <span style={{ color: "#1abc9c" , fontWeight: "bold" }}>
                    ${Number(product.price || 0).toLocaleString()}
                  </span>
                  x <span>{product.quantity}</span>
                </p>

                {/* Date de la commande pour ce produit */}
                <p className="text-center mt-2">
                  <span className="fs-5">Order placed on: </span>
                  <span className="orderdate fs-4">
                    {new Date(product.orderDate).toDateString()}
                  </span>
                </p>
              </div>
            </div>

            {/* Total et bouton "order again" */}
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

          {/* séparateur stylisé sauf après le dernier produit */}
          {index < item.items.length - 1 && (
            <hr style={{ border: "1px solid #F49934", margin: "20px 0" }} />
          )}
        </div>
      ))}
    </ListGroupItem>
  );
};

export default OrderItem;
