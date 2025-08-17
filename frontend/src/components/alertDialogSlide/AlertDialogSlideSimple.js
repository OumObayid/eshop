/*
 * eShop Project - Alert Dialog Slide Component
 * Description: This React component displays a sliding alert dialog
 * whenever a new product is added to the shopping cart. It allows
 * the user to either view the shopping cart or continue shopping.
 *
 * Copyright (c) 2025 Oumaima El Obayid
 * This file is part of the eShop application.
 * Licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import "./AlertDialogSlide.css";

// Transition component for sliding effect
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlideSimple = (props) => {
  const dispatch = useDispatch();

  // Function to close dialog and open cart
  const toggleCart = () => {
    props.handleClose(); // close the dialog
    dispatch(cartUiActions.toggle()); // toggle cart visibility
  };

  return (
    <div>
      {/* Material UI Dialog */}
      <Dialog
        open={props.isOpen} // controls visibility
        TransitionComponent={Transition} // slide up animation
        keepMounted
        onClose={props.handleClose} // closes on backdrop click
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="fs-4"
          >
            {/* Message and cart icon */}
            <div className="d-flex justify-content-start">
              <i
                style={{ fontSize: "37px" }}
                className="fa fa-shopping-cart me-3 cartAlert"
                aria-hidden="true"
              ></i>
              <p>
                A new Product has been added to your Shopping Cart.
              </p>
            </div>
          </DialogContentText>
          <hr style={{ backgroundColor: "#434341", width: "100%" }} />
        </DialogContent>

        {/* Action buttons */}
        <DialogActions>
          <button
            type="button"
            className="btn btnCart rounded-1 fs-5 me-4 mb-3"
            onClick={toggleCart} // open cart
          >
            View Shopping Cart
          </button>
          <button
            type="button"
            className="btn btnClose rounded-1 fs-5 me-4 mb-3"
            onClick={props.handleClose} // just close dialog
          >
            Continue Shopping
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialogSlideSimple;
