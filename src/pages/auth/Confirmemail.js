import { applyActionCode, checkActionCode, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "../../components";

const Confirmemail = () => {
  const navigate = useNavigate();
  const [verified, setverified] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");
    const auth = getAuth()
  useEffect(() => {
    const restoredEmail = null;
    checkActionCode(auth, oobCode).then((info) => {
        // Get the restored email address.
        restoredEmail = info['data']['email'];
        console.log('restoredEmail :', restoredEmail);
    
      })
      if (oobCode !== null) {
        applyActionCode(auth, oobCode)
          .then(() => {
            setverified(true);
          })
          .catch((err) => {
            setverified(false);
          });
      }
    
  });

  return (
    <Helmet title="verify email">
      <div class="container bg-white shadow w-75 mt-5">
        <div class="row justify-content-center bg-white  mt-5">
          <div class="col-md-12 col-lg-10 w-100">
            <div class="d-md-flex">
              <div
                class="img"
                style={{ backgroundImage: "url(../../../../assets/)" }}
              ></div>
              <div class="login-wrap mt-3 p-4 p-md-5">
                {verified ? (
                  <div class="form-group mb-5">
                    <h3>Your mail has been verified</h3>
                    <p>You can now sign in with your new account</p>
                  </div>
                ) : (
                  <div class="form-group mb-5">
                    <h3>Your mail has not been verified!!!</h3>
                    <p class="text-center mt-5">
                      Please check your email and click on the link to verfiy
                      your email address.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div class="formGroup text-center mb-5">
              <span className="fs-5"> Go back to?</span>{" "}
              <Link to="/login" class="redirect">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Confirmemail;
