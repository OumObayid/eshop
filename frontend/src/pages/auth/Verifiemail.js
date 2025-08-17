/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Verifiemail component informs users that a confirmation email has been sent.
 * It provides instructions to check their inbox and a link to go back to login.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { Link } from "react-router-dom";
import { Helmet } from "../../components";

const Verifiemail = () => {
  return (
    <Helmet title="Verify Email">
      <div style={{ marginTop: "100px" }} className="container bg-white shadow w-75">
        <div className="row justify-content-center bg-white">
          <div className="col-md-12 col-lg-10">
            <div className="d-md-flex">
              <div className="login-wrap mt-3 p-4 p-md-5">
                {/* Message to inform user that verification email was sent */}
                <div className="form-group mb-5">
                  <h4 className="text-center">
                    We have sent you a confirmation email.
                  </h4>
                  <p className="text-center mt-5">
                    Please check your email and click on the link to verify your email
                    address.
                  </p>
                </div>

                {/* Link to go back to login */}
                <p className="formGroup text-center mb-5">
                  Go back to?{" "}
                  <Link to="/login" className="redirect">
                    Sign in
                  </Link>
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
