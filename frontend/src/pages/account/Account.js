/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Account component allows users to view and update their personal information
 * and password. It uses Firebase Authentication to ensure the user is logged in,
 * Redux to fetch user data, and Firestore to update the database.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { AccountMenu, Helmet, Location } from "../../components";
import { auth, db } from "../../firebase/config";
import "./Account.css";
import $ from "jquery";
import { useSelector } from "react-redux";
import { datauser } from "../../redux/dataSlice";

const Account = () => {
  // Local state for user info and password inputs
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");
  const [errorSuccessPassword, setErrorSuccessPassword] = useState([]); // [message, type]

  const navigate = useNavigate();
  const userinfo = useSelector(datauser);

  // Check if user is logged in and load user info
  useEffect(() => {
    setUser(userinfo);
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      else console.log("User logged in:", user);
    });
  }, [navigate, userinfo]);

  // Handle updating user information
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.id);

    try {
      await updateDoc(docRef, {
        name: user.name,
        tel: user.tel,
        address: user.address,
        country: user.country,
        city: user.city,
      });
      setErrorSuccessPassword(["Your information has been updated successfully", 1]);

      // Close modal and refresh account page after 3s
      const interval = setInterval(() => {
        $("[data-bs-dismiss=modal]").trigger({ type: "click" });
        clearInterval(interval);
        navigate("/");
        navigate("/account");
      }, 3000);
    } catch (error) {
      setErrorSuccessPassword([error.message, 0]);
    }
  };

  // Handlers for country and city select
  const changeCountry = (e) => setUser({ ...user, country: e.target.value });
  const changeCity = (e) => setUser({ ...user, city: e.target.value });

  // Handle updating user password
  const handleUpdatePass = async (e) => {
    e.preventDefault();

    if (user.password !== oldPassword) {
      setErrorSuccessPassword(["Wrong old password", 0]);
      return;
    }
    if (user.password === newPassword) {
      setErrorSuccessPassword(["Choose a different password from the old one", 0]);
      return;
    }
    if (newPasswordConf !== newPassword) {
      setErrorSuccessPassword(["Your two new passwords are different", 0]);
      return;
    }

    // Update password in Firestore
    const docRef = doc(db, "users", user.id);
    try {
      await updateDoc(docRef, { password: newPassword });
      setErrorSuccessPassword(["Your password has been changed successfully", 1]);

      const interval = setInterval(() => {
        $("[data-bs-dismiss=modal]").trigger({ type: "click" });
        clearInterval(interval);
        navigate("/");
        navigate("/account");
      }, 3000);
    } catch (error) {
      setErrorSuccessPassword([error.message, 0]);
      console.log("Error updating password:", error.message);
    }
  };

  return (
    <Helmet title="Account">
      <section className="account" id="account">
        <Row>
          {/* Sidebar Menu */}
          <Col lg="3" md="3" sm="12" xs="12">
            <AccountMenu active="account" />
          </Col>

          {/* Account Information */}
          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>Your Account</p>
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
            
            <div className="content__info">
              <Col lg="9" md="9" sm="12" xs="12" className="fs-4 border p-3">
                <Col className="form__group pers">
                  <span className="fs-5">Full Name: </span>
                  <p className="fStyle">{user.name}</p>
                </Col>
                <Col className="form__group pers">
                  <span className="fs-5">Email: </span>
                  <p className="fStyle">{user.email}</p>
                </Col>
                <Col className="form__group pers">
                  <span className="fs-5">Phone: </span>
                  <p className="fStyle">{user.tel}</p>
                </Col>
                <Col className="form__group pers">
                  <span className="fs-5">Address: </span>
                  <p className="fStyle">{user.address}</p>
                </Col>
                <Col className="pers">
                  <span className="fs-5">Location: </span>
                  <p className="fStyle d-flex text-wrap">
                    {user.city && `${user.city}, `}
                    {user.country && user.country}
                  </p>
                </Col>
              </Col>

              {/* Buttons to open modals */}
              <Col lg="3" md="3" sm="12" xs="12" className="btn_style btnInfo ms-3">
                <div className="d-flex" data-bs-target="#mymodalInfo" data-bs-toggle="modal">
                  <i style={{ color: "#F49934", fontSize: "25px", position: "relative", top: "-12px" }}
                     className="ri-edit-2-fill me-1"></i>
                  <p className="h4">Your Informations</p>
                </div>
                <div className="d-flex" data-bs-toggle="modal" data-bs-target="#mymodalPass">
                  <i style={{ color: "#F49934", fontSize: "25px", position: "relative", top: "-12px" }}
                     className="ri-edit-2-fill"></i>
                  <p className="h4">Your Password</p>
                </div>
              </Col>
            </div>
          </Col>
        </Row>

        {/* Modal for Updating Informations */}
        <div className="modal fade" id="mymodalInfo" tabIndex="-1" aria-labelledby="ModalLabelInfos" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="ModalLabelInfos" style={{ color: "#F49934" }}>
                  Update Your Account
                </h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Col lg="12" md="12">
                  <form onSubmit={handleUpdateInfo}>
                    <div className="input_namephone">
                      <Col lg="5" md="5" sm="12" xs="12" className="form__group">
                        <input
                          className="fontfrm"
                          type="text"
                          placeholder="Your name"
                          required
                          value={user.name}
                          onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                      </Col>
                      <Col lg="5" md="5" sm="12" xs="12" className="form__group">
                        <input
                          className="fontfrm"
                          type="number"
                          placeholder="Phone number"
                          required
                          value={user.tel}
                          onChange={(e) => setUser({ ...user, tel: e.target.value })}
                        />
                      </Col>
                    </div>
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="text"
                        placeholder="Enter your address"
                        required
                        value={user.address}
                        onChange={(e) => setUser({ ...user, address: e.target.value })}
                      />
                    </div>
                    <Location action={[changeCountry, changeCity]} selected={[user.country, user.city]} />
                    
                    <div className={`fs-4 text-center text-wrap overflow-hidden ${errorSuccessPassword[1] ? 'text-success' : 'text-danger'}`}>
                      {errorSuccessPassword[0]}
                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-warning fs-5">
                        Update your informations
                      </button>
                    </div>
                  </form>
                </Col>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Updating Password */}
        <div className="modal fade" id="mymodalPass" tabIndex="-1" aria-labelledby="ModalLabelPassword" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="ModalLabelPassword" style={{ color: "#F49934" }}>
                  Update Your Password
                </h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Col lg="12" md="12">
                  <form onSubmit={handleUpdatePass}>
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="password"
                        placeholder="Your old password"
                        required
                        onChange={(e) => { setOldPassword(e.target.value); setErrorSuccessPassword(""); }}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="password"
                        placeholder="Your new password"
                        required
                        onChange={(e) => { setNewPassword(e.target.value); setErrorSuccessPassword(""); }}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="password"
                        placeholder="Confirm Your new password"
                        required
                        onChange={(e) => { setNewPasswordConf(e.target.value); setErrorSuccessPassword(""); }}
                      />
                    </div>

                    <div className={`fs-4 text-center text-wrap overflow-hidden ${errorSuccessPassword[1] ? 'text-success' : 'text-danger'}`}>
                      {errorSuccessPassword[0]}
                    </div>

                    <div>
                      <button type="submit" className="btn btn-warning fs-5">
                        Update Your Password
                      </button>
                    </div>
                  </form>
                </Col>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Helmet>
  );
};

export default Account;
