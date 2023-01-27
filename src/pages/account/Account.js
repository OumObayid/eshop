import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  updateDoc, 
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { AccountMenu, Helmet, Location } from "../../components";
import { auth, db } from "../../firebase/config";
import "./Account.css";
import $ from "jquery";
import { useSelector } from "react-redux";
import { datauser } from "../../redux/dataSlice";

const Account = () => {
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");
  // for stocking the message error or success and number for color
  const [errorSuccessPassword, setErrorSuccessPassword] = useState([]);
  ///////////////////first of all check if logged
  const navigate = useNavigate();
  const userinfo= useSelector(datauser);
  
  useEffect(() => {
    setUser(userinfo);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    // console.log('userinforedux :', userinfo);

  }, [navigate,userinfo]);
 
  //  //handle for changing user informations
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, {
      name: user.name,
      tel: user.tel,
      address: user.address,
      country: user.country,
      region: user.region,
      city: user.city,
      postalCode: user.postalCode,
    })
      //if all pass good
      .then((docRef) => {
        setErrorSuccessPassword([
          "Your informations has been changed successfully",
          1,
        ]);

        const interval = setInterval(() => {
          // close the modal
          $("[data-bs-dismiss=modal]").trigger({ type: "click" });
          //stop interval
          clearInterval(interval);
          // refresh the component
          navigate("/");
          navigate("/account");
        }, 3000);
      })
      .catch((error) => {
        setErrorSuccessPassword([error.message, 0]);
        // console.log("error.message :", error.message);
      });
  };

  const changeCountry = (e) => {
    setUser({ ...user, country: e.target.value });
  };
  const changeRegion = (e) => {
    setUser({ ...user, region: e.target.value });
  };
  const changeCity = (e) => {
    setUser({ ...user, city: e.target.value });
  };

  //handle for changing user password
  const handleUpdatePass = async (e) => {
    e.preventDefault();
    //test if the old password is correct
    if (user.password !== oldPassword) {
      setErrorSuccessPassword(["wrong old password", 0]);
    }
    //test if the newpassword is different from the old one
    else if (user.password === newPassword) {
      setErrorSuccessPassword([
        "choose a different password from the old one",
        0,
      ]);
    } else if (newPasswordConf !== newPassword) {
      setErrorSuccessPassword(["your two new passwords are different", 0]);
    } else {
      // update the password
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, {
        password: newPassword,
      })
        // if all pass good
        .then((docRef) => {
          setErrorSuccessPassword([
            "Your Password has been changed successfully",
            1,
          ]);

          const interval = setInterval(() => {
            // close the modal
            $("[data-bs-dismiss=modal]").trigger({ type: "click" });
            //stop interval
            clearInterval(interval);
            // refresh the component
            navigate("/");
            navigate("/account");
          }, 3000);
        })
        .catch((error) => {
          setErrorSuccessPassword([error.message, 0]);
          console.log("error.message :", error.message);
        });
    }
  };
  return (
    <Helmet title="Account">
      <section className="account" id="account">
        <Row>
          <Col lg="3" md="3" sm="12" xs="12">
            <AccountMenu active="account" />
          </Col>
          {/* -----show informations read only--- */}
          <Col lg="9" md="9" sm="12" xs="12">
            <p className="h2" style={{ color: "#F49934" }}>
              Your Account
            </p>
            {/* informations read only */}
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
            <div className="content__info ">
              <Col lg="9" md="9" sm="12" xs="12" className="fs-4 border p-3">
                <Col className="form__group pers  row">
                  <span className="fs-5">Full Name: </span>
                  <p className="fStyle">{user.name}</p>
                </Col>
                <Col className="flex_email_tel">
                  <Col className="form__group pers row">
                    <span className="fs-5">Email: </span>
                    <p className="fStyle">{user.email}</p>
                  </Col>
                  <Col className="form__group pers row">
                    <span className="fs-5">Phone: </span>
                    <p className="fStyle">{user.tel}</p>
                  </Col>
                </Col>

                <Col className="form__group pers row">
                  <span className="fs-5">Address: </span>
                  <p className="fStyle">{user.address}</p>
                </Col>
                <Col className="pers row">
                  <span className="fs-5">Location: </span>
                  <p className="fStyle d-flex text-wrap">
                    {user.postalCode}, &nbsp;
                    {user.city}, &nbsp;
                    {user.region}, &nbsp;
                    {user.country}
                  </p>
                </Col>
              </Col>
              {/*button update info or password */}
              <Col
                lg="3"
                md="3"
                sm="12"
                xs="12"
                className="btn_style btnInfo  ms-3 "
              >
                <div
                  className="d-flex"
                  data-bs-target="#mymodalInfo"
                  data-bs-toggle="modal"
                >
                  {/* -- Button close for modal informations-- */}
                  <i
                    style={{
                      color: "#F49934",
                      fontSize: "25px",
                      position: "relative",
                      top: "-12px",
                    }}
                    className="ri-edit-2-fill  me-1"
                  ></i>
                  <p className="h4 ">Your Informations</p>
                </div>
                <div
                  className="d-flex "
                  data-bs-toggle="modal"
                  data-bs-target="#mymodalPass"
                >
                  {/* --  Button close for modal password -- */}
                  <i
                    style={{
                      color: "#F49934",
                      fontSize: "25px",
                      position: "relative",
                      top: "-12px",
                    }}
                    className="ri-edit-2-fill  "
                  ></i>
                  <p className="h4">Your Password</p>
                </div>
              </Col>
            </div>
          </Col>
        </Row>

        {/* -- Modal Informations--*/}
        <div
          className="modal fade"
          id="mymodalInfo"
          tabindex="-1"
          aria-labelledby="ModalLabelInfos"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header ">
                <h4
                  className="modal-title"
                  id="ModalLabelInfos"
                  style={{ color: "#F49934" }}
                >
                  Update Your Account
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* ---content modal--- */}
                <Col lg="12" md="12">
                  <form onSubmit={handleUpdateInfo}>
                    <div className="input_namephone">
                      <Col
                        lg="5"
                        md="5"
                        sm="12"
                        xs="12"
                        className="form__group "
                      >
                        <input
                          className="fontfrm "
                          type="text"
                          placeholder="Your name"
                          required
                          value={user.name}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              name: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col
                        lg="5"
                        md="5"
                        sm="12"
                        xs="12"
                        className="form__group "
                      >
                        <input
                          className="fontfrm "
                          type="number"
                          placeholder="Phone number"
                          required
                          value={user.tel}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              tel: e.target.value,
                            })
                          }
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
                        onChange={(e) =>
                          setUser({
                            ...user,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Location
                      action={[changeCountry, changeRegion, changeCity]}
                      selected={[
                        user.country,
                        user.region,
                        user.city,
                      ]}
                    />
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="number"
                        placeholder="Postal code"
                        required
                        value={user.postalCode}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </div>
                    {errorSuccessPassword[1] ? (
                      <div className="fs-4 text-center text-success text-wrap overflow-hidden">
                        {errorSuccessPassword[0]}
                      </div>
                    ) : (
                      <div className="fs-4 text-center text-danger text-wrap overflow-hidden">
                        {errorSuccessPassword[0]}
                      </div>
                    )}
                    <div className="modal-footer ">
                      <button type="submit" className="btn btn-warning fs-5">
                        Update your informations
                      </button>
                    </div>
                  </form>
                </Col>
                {/* --end-content modal--- */}
              </div>
            </div>
          </div>
        </div>
        {/* --end-- Modal Informations--*/}

        {/* -- Modal Password--*/}
        <div
          className="modal fade "
          id="mymodalPass"
          tabindex="-1"
          aria-labelledby="ModalLabelPassword"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h4
                  className="modal-title"
                  id="ModalLabelPassword"
                  style={{ color: "#F49934" }}
                >
                  Update Your Password
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* ---content modal--- */}
                <Col lg="12" md="12">
                  <form onSubmit={handleUpdatePass}>
                    <div className="">
                      <div className="form__group ">
                        <input
                          className="fontfrm"
                          type="password"
                          placeholder="Your old password"
                          required
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                            setErrorSuccessPassword("");
                          }}
                        />
                      </div>
                      <div className="form__group ">
                        <input
                          className="fontfrm"
                          type="password"
                          placeholder="Your new password"
                          required
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setErrorSuccessPassword("");
                          }}
                        />
                      </div>
                      <div className="form__group ">
                        <input
                          className="fontfrm"
                          type="password"
                          placeholder="Confirm Your new password"
                          required
                          onChange={(e) => {
                            setNewPasswordConf(e.target.value);
                            setErrorSuccessPassword("");
                          }}
                        />
                      </div>
                    </div>
                    {errorSuccessPassword[1] ? (
                      <div className="fs-4 text-center text-success text-wrap overflow-hidden">
                        {errorSuccessPassword[0]}
                      </div>
                    ) : (
                      <div className="fs-4 text-center text-danger text-wrap overflow-hidden">
                        {errorSuccessPassword[0]}
                      </div>
                    )}
                    <div>
                      <button type="submit" className="btn btn-warning fs-5">
                        Update Your Informations
                      </button>
                    </div>
                  </form>
                </Col>
                {/* --end-content modal--- */}
              </div>
            </div>
          </div>
        </div>
        {/* --end-- Modal Password--*/}
      </section>
    </Helmet>
  );
};

export default Account;
