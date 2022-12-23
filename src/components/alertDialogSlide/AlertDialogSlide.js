import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import "./AlertDialogSlide.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
  const dispatch = useDispatch();
  const toggleCart = () => {
    props.handleClose();
    dispatch(cartUiActions.toggle());
  };
  // const handleViewCart = () => {
  //   props.handleClose();
  //   setInterval(()=>{})
  //   navigate("/cart");
  // };
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
              id="alert-dialog-slide-description"
              className="fs-4"
            >
              <p>
                <i
                  className="fa fa-shopping-cart me-3 cartAlert fs-1"
                  aria-hidden="true"
                ></i>
                A new Product has been added to your Shopping Cart. You now have{" "}
                {props.cartLenth} type(s) of product in your Shopping Cart.
              </p>
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

export default AlertDialogSlide;
