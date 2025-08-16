import { applyActionCode, checkActionCode, getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "../../components";

const Confirmemail = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(true);
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const auth = getAuth();

  useEffect(() => {
    if (!oobCode) return;

    let restoredEmail = null; // use let, pas const

    // Vérifie le code et récupère l'email
    checkActionCode(auth, oobCode)
      .then((info) => {
        restoredEmail = info['data']?.email || null;
        console.log("restoredEmail:", restoredEmail);

        // Applique le code de vérification
        return applyActionCode(auth, oobCode);
      })
      .then(() => {
        setVerified(true);
      })
      .catch((err) => {
        console.error(err);
        setVerified(false);
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
                style={{ backgroundImage: "url(../../../../assets/)" }}
              ></div>
              <div className="login-wrap text-center mt-3 p-4 p-md-5">
                {verified ? (
                  <div className="form-group mb-5">
                    <h3>Your mail has been verified</h3>
                    <p>You can now sign in with your new account</p>
                  </div>
                ) : (
                  <div className="form-group mb-3">
                    <h4>Your mail has not been verified!!!</h4>
                    <p className="text-center mt-5">
                      Please check your email and click on the link to verify your email address.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <p className="formGroup text-center mb-5">
              <span className="fs-5">Go back to?</span>{" "}
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

export default Confirmemail;
