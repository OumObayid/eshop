import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import CardProduct from "../products/cardProduct/CardProduct";
import RatedProducts from "../products/ratedProducts/RatedProducts";
import "./AlertDialogSlide.css";

//transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlideWich = (props) => {
  const closeDialog = () => {
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description "
            className="fs-4"
          >
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
            <div className="d-flex  justify-content-start mt-3">
              <Link
                to="/wishlist"
                type="button"
                className="btnAll fs-5 me-4 px-5"
                onClick={closeDialog}
              >
                See My Favorites
              </Link>
              <button
                type="button"
                className="btnAll fs-5 me-4 px-5"
                onClick={closeDialog}
              >
                Continue Shoping
              </button>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex  justify-content-start border pt-1">
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
