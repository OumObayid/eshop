import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import "./AlertDialogSlide.css";

//transition
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlideSimple = (props) => {
  const dispatch = useDispatch();
  const toggleCart = () => {
    props.handleClose();
    dispatch(cartUiActions.toggle());
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
            style={{fontSize:"37px"}}
              className="fa fa-shopping-cart me-3 cartAlert"
              aria-hidden="true"
            ></i>
            <p>
              A new Product has been added to your Shopping Cart.
            </p></div>
          </DialogContentText>
          <hr style={{ backgroundColor: "#434341", width: "100%" }} />
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btnCart rounded-1 fs-5 me-4 mb-3"
            onClick={toggleCart}
          >
            View Shoping Cart
          </button>
          <button
            type="button"
            className="btn btnClose rounded-1 fs-5 me-4 mb-3"
            onClick={props.handleClose}
          >
            Continue Shoping
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialogSlideSimple;
