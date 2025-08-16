import { Link } from "react-router-dom";
import { Helmet } from "../../components";

const Verifiemail = () => {
 
  return (
    <Helmet title="verify email">
    <div style={{marginTop:"100px"}} class="container bg-white shadow w-75 ">
  <div class="row justify-content-center bg-white  ">
    <div class="col-md-12 col-lg-10">
      <div class="d-md-flex">
       
        <div class="login-wrap mt-3 p-4 p-md-5">
          <div class="form-group mb-5">
            <h4 class="text-center">We have sent you a confirmation email.</h4>
            <p class="text-center mt-5">
              Please check your email and click on the link to verfiy your email
              address.
            </p>
          </div>
          <p class="formGroup text-center mb-5">
            Go back to? <Link to="/login" class="redirect" >Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    </Helmet>
  );
};

export default Verifiemail;
