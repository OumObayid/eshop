import { Link } from "react-router-dom";
import { Helmet } from "../../components";

const CheckoutSuccess = () => {

  return (
    <Helmet title="checkout success" >
    <div style={{paddingTop:"40px",paddingBottom:"10px",}} className="container my-5">
      <h2 >Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at <Link to="/order-history" className="fw-bold at_order"> your profile</Link> after about 10mins.</p>
      <p>
        Incase of any inqueries contact the support at <strong>support@eshop.com</strong>
      </p>
    </div>
    </Helmet>
  );
};

export default CheckoutSuccess;



