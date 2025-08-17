/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Confirmemail component allows users to verify their email address.
 * It uses Firebase Authentication to check the verification code and 
 * apply the email confirmation. Displays success or failure messages.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { applyActionCode, checkActionCode, getAuth } from "firebase/auth"; // Firebase Auth functions
import { useEffect, useState } from "react"; // React hooks
import { Link, useNavigate } from "react-router-dom"; // navigation and links
import { useSearchParams } from "react-router-dom"; // get URL parameters
import { Helmet } from "../../components"; // for page title

const Confirmemail = () => {
  const navigate = useNavigate(); // navigation hook
  const [verified, setVerified] = useState(true); // email verification state
  const [searchParams] = useSearchParams(); // hook to read URL parameters
  const oobCode = searchParams.get("oobCode"); // Firebase verification code
  const auth = getAuth(); // Firebase Auth instance

  useEffect(() => {
    if (!oobCode) return; // do nothing if code is missing

    let restoredEmail = null; // store the email associated with the code

    // check the code and retrieve the email
    checkActionCode(auth, oobCode)
      .then((info) => {
        restoredEmail = info['data']?.email || null;
        console.log("restoredEmail:", restoredEmail);

        // apply the code to confirm the email
        return applyActionCode(auth, oobCode);
      })
      .then(() => {
        setVerified(true); // success
      })
      .catch((err) => {
        console.error(err);
        setVerified(false); // failure
      });
  }, [auth, oobCode]);

  return (
    <Helmet title="Verify Email">
      <div style={{marginTop:"100px"}} className="container bg-white shadow w-75 ">
        <div className="row justify-content-center bg-white ">
          <div className="col-md-12 col-lg-10 w-100 ">
            <div className="d-md-flex justify-content-center">
              <div
                className="img"
                style={{ backgroundImage: "url(../../../../assets/)" }} // decorative image
              ></div>
              <div className="login-wrap text-center mt-3 p-4 p-md-5">
                {verified ? (
                  // email verified
                  <div className="form-group mb-5">
                    <h3>Your mail has been verified</h3>
                    <p>You can now sign in with your new account</p>
                  </div>
                ) : (
                  // email not verified
                  <div className="form-group mb-3">
                    <h4>Your mail has not been verified!!!</h4>
                    <p className="text-center mt-5">
                      Please check your email and click on the link to verify your email address.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* Link back to login */}
            <p className="formGroup text-center mb-5">
              <span className="fs-4">Go back to?</span>{" "}
              <Link to="/login" className="redirect">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Confirmemail; // export component
