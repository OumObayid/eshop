import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cartActions } from "../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import "./CardProductRow.css";
import Card from "../../card/Card";
import { Row, Col } from "reactstrap";
import {AlertDialogSlideSimple} from "../../../components";


const CardProduct = (props) => {
  
  const prod = props.item;
  const dispatch = useDispatch();
  // for dialog box
  const [isOpen, setisOpen] = useState(false)

  const addToCart = () => {
    dispatch(cartActions.addItem(prod));
    setisOpen(true)
  };

 const closeBox = () => {
    setisOpen(false)
  }
  
  return (
    <Card>
       {isOpen && (<AlertDialogSlideSimple handleClose={closeBox} isOpen={isOpen}/>)}
      <Row>
        <Col lg="4" md="4" sm="12" xs="12" className="border-2 border-end">
          <Link
            to={`/productDetail/${prod.id}`}
            className="justify-content-center row"
          > <img src={prod.imgUrl} alt="imagee"/>
          </Link>
        </Col>
        <Col lg="8" md="8" sm="12" xs="12">
          <Col
            lg="12"
            md="12"
            sm="12"
            xs="12"
            className="card-body justify-content-center row px-0"
          >
            <h5 className="card-title text-danger text-left ">${prod.price.toLocaleString()}</h5>
            <p className="card-text text-left fs-4 text-truncate fw-bold">
              {prod.productName}
            </p>
          </Col>
          <Col lg="12" md="12" sm="12" xs="12" className="mb-auto">
            <Col lg="12" md="12" sm="12" xs="12">
              <p>{prod.desc}</p>
            </Col>
            <Col
              lg="12"
              md="12"
              sm="12"
              xs="12"
              className="d-flex align-items-end "
            >
              <button
                className="btn btn-warning  fs-5 mb-2 d-flex "
                onClick={addToCart}
              >
                Add to cart
              </button>
            </Col>
          </Col>
        </Col>
      </Row>
    </Card>
  );
};

export default CardProduct;
