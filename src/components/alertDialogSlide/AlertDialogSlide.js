import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 const AlertDialogSlide = (props) => {

  const navigate = useNavigate();
 
const handleViewCart = () => {
  
  navigate('/cart');
  props.handleClose();
}
  return (
    <div>
      
      <Dialog
        open={props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          A new Product has been added to your Shopping Cart. You now have {props.cartLenth} type of product in your Shopping Cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Continue Shoping</Button>
          {/* <Link to="/cart"><Button>View Shoping Cart</Button></Link> */}
          <Button onClick={handleViewCart}>View Shoping Cart</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide