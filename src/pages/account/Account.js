import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { AccountMenu, Helmet, Location } from "../../components";
import { auth, db } from "../../firebase/config";
import "./Account.css";
import $ from "jquery";

const Account = () => {
  const [user, setUser] = useState({});
  const [userTemp, setUserTemp] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");
  // for stocking the message error or success and number for color
  const [errorSuccessPassword, setErrorSuccessPassword] = useState([]);
  ///////////////////first of all check if logged
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        const getUser = async (email) => {
          const q = query(collection(db, "users"), where("email", "==", email));
          const querySnapshot = await getDocs(q);
          let user = {};
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            user = {
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              password: doc.data().password,
              tel: doc.data().tel,
              address: doc.data().address,
              country: doc.data().country,
              region: doc.data().region,
              city: doc.data().city,
              postalCode: doc.data().postalCode,
              orders: doc.data().orders,
            };
          });
          //call function
          setUser(user);
          setUserTemp(user);
          console.log("user :", user);
        };
        getUser(user.email);
      }
    });
    
  }, [navigate]);

  //  //handle for changing user informations
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, {
      name: userTemp.name,
      tel: userTemp.tel,
      address: userTemp.address,
      country: userTemp.country,
      region: userTemp.region,
      city: userTemp.city,
      postalCode: userTemp.postalCode,
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
    setUserTemp({ ...userTemp, country: e.target.value });
  };
  const changeRegion = (e) => {
    setUserTemp({ ...userTemp, region: e.target.value });
  };
  const changeCity = (e) => {
    setUserTemp({ ...userTemp, city: e.target.value });
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
        <Row className=" ">
          <AccountMenu active="account" />
          {/* -----show informations read only--- */}
          <Col lg="9" md="9" sm="12" xs="12" >
            <p className="h2" style={{ color: "#F49934" }}>
              Your Account
            </p>
            {/* informations read only */}
            <hr style={{ backgroundColor: "#434341", width: "100%" }} />
            <div className="d-flex justify-content-around align-items-center">
              <div className="fs-4 border p-3">
                <div className="d-flex">
                  <div className="form__group pers  row">
                    <span>Full Name: </span>
                    <p className="fStyle">{user.name}</p>
                  </div>
                  <div className="form__group pers row">
                    <span>Email: </span>
                    <p className="fStyle">{user.email}</p>
                  </div>
                  <div className="form__group pers row">
                    <span>Phone: </span>
                    <p className="fStyle">{user.tel}</p>
                  </div>
                </div>

                <div className="form__group pers row">
                  <span>Address: </span>
                  <p className="fStyle">{user.address}</p>
                </div>
                <div className="form__group pers row">
                  <span>Location: </span>
                  <p className="fStyle d-flex">
                    <div>{user.postalCode}, &nbsp;&nbsp; </div>
                    <div>{user.city}, &nbsp; &nbsp; </div>
                    <div>{user.region}, &nbsp; &nbsp; </div>
                    <div>{user.country}</div>
                  </p>
                </div>
              </div>
              {/*button update info or password */}
              <div className="btn_style ">
                <div
                  className="d-flex btnInfo"
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
                  className="d-flex btnInfo "
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
              </div>
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
                    <div className="d-flex justify-content-between">
                      <div className="form__group col-5">
                        <input
                          className="fontfrm "
                          type="text"
                          placeholder="Your name"
                          required
                          value={userTemp.name}
                          onChange={(e) =>
                            setUserTemp({
                              ...userTemp,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form__group col-5">
                        <input
                          className="fontfrm "
                          type="number"
                          placeholder="Phone number"
                          required
                          value={userTemp.tel}
                          onChange={(e) =>
                            setUserTemp({
                              ...userTemp,
                              tel: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="text"
                        placeholder="Enter your address"
                        required
                        value={userTemp.address}
                        onChange={(e) =>
                          setUserTemp({
                            ...userTemp,
                            address: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Location
                      action={[changeCountry, changeRegion, changeCity]}
                      selected={[
                        userTemp.country,
                        userTemp.region,
                        userTemp.city,
                      ]}
                    />
                    <div className="form__group">
                      <input
                        className="fontfrm"
                        type="number"
                        placeholder="Postal code"
                        required
                        value={userTemp.postalCode}
                        onChange={(e) =>
                          setUserTemp({
                            ...userTemp,
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
        {/* --end-- Modal Password--*/}
      </section>
    </Helmet>
  );
};

export default Account;
