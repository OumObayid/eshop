/*
 * eShop Project - Alert Dialog for Wishlist
 * Description: This React component displays a sliding alert dialog
 * whenever a product is added to the user's favorites (wishlist).
 * It allows the user to navigate to the wishlist or continue shopping.
 * It also shows a recommended products section at the bottom.
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
import { Link } from "react-router-dom";
import RatedProducts from "../products/ratedProducts/RatedProducts";
import "./AlertDialogSlide.css";

// Transition component for sliding effect
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlideWich = (props) => {
  // Function to close the dialog
  const closeDialog = () => {
    props.handleClose();
  };

  return (
    <div>
      {/* Material UI Dialog */}
      <Dialog
        open={props.isOpen} // controls visibility
        TransitionComponent={Transition} // slide animation
        keepMounted
        onClose={props.handleClose} // close on backdrop click
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
                style={{ fontSize: "30px" }}
                className="fa fa-shopping-cart me-3 cartAlert"
                aria-hidden="true"
              ></i>
              <p>
                This article has been added to your favorites{" "}
                <span className="fw-bold">My Favorites</span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="d-flex justify-content-start mt-3">
              <Link
                to="/wishlist"
                type="button"
                className="btnAll fs-5 me-4 px-5"
                onClick={closeDialog} // navigate and close dialog
              >
                See My Favorites
              </Link>
              <button
                type="button"
                className="btnAll fs-5 me-4 px-5"
                onClick={closeDialog} // just close dialog
              >
                Continue Shopping
              </button>
            </div>
          </DialogContentText>
        </DialogContent>

        {/* Recommended products section */}
        <DialogActions className="d-flex justify-content-start border pt-1">
          <div className="container">
            <p className="fs-3 h3">Recommended for you</p>
            <RatedProducts />
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialogSlideWich;
