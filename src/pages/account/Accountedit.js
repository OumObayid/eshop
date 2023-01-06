import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col } from "reactstrap";
import { Helmet, Location } from "../../components";
import { auth, db } from "../../firebase/config";
import "./Account.css";


const Accountedit = () => {

  
  const [user, setUser] = useState({});
  const [userTemp, setUserTemp] = useState({});

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
            console.log(doc.id, " => ", doc.data());
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
          // console.log("user :", user);
        };
        getUser(user.email);
      }
    });
  }, [navigate]);

  //to update all user informations 
  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, {
      // name: enterName,
      // tel: enterNumber,
      // address: enterAddress,
      // country: enterCountry,
      // region: enterRegion,
      // city: enterCity,
      // postalCode: postalCode,
    })
      .then((docRef) => {})
      .catch((error) => {
        toast.error(error.message);
        console.log("error.message :", error.message);
      });
  };
const changeCountry = (e) => {
  setUserTemp({...userTemp,country:e.target.value})  
}
const changeRegion = (e) => {
  setUserTemp({...userTemp,region:e.target.value})  
}
const changeCity = (e) => {
  setUserTemp({...userTemp,city:e.target.value})  
}
  return (
    <Helmet title="Account">
      <section className="account" id="account">
        <h2>Your Account</h2>
        <Col lg="6" md="6">
          <form onSubmit={handleUpdate}>
          <div className="form__group">
              <input
                className="fontfrm "
                type="text"
                placeholder="Your name"
                required
                
                value={userTemp.name}
                onChange={(e) => setUserTemp({...userTemp,name:e.target.value})}
              />
            </div>
            <div className="form__group">
              <input
                className="fontfrm "
                type="number"
                placeholder="Phone number"
                required
                value={userTemp.tel}
                onChange={(e) => setUserTemp({...userTemp,tel:e.target.value})}
              />
            </div>
            <div className="form__group">
              <input
                className="fontfrm"
                type="text"
                placeholder="Enter your address"
                required
                value={userTemp.address}
                onChange={(e) => setUserTemp({...userTemp,address:e.target.value})}
              />
            </div>
            <Location action={[changeCountry, changeRegion, changeCity]} selected={[userTemp.country,userTemp.region,userTemp.city]} />
            <div className="form__group">
              <input
                className="fontfrm"
                type="number"
                placeholder="Postal code"
                required
                value={userTemp.postalCode}
                onChange={(e) => setUserTemp({...userTemp,postalCode:e.target.value})}
              />
            </div>
            <button type="submit" color="warning"  className="fs-5">
                  Update your informations
                </button>
          </form>
        </Col>
      </section>
    </Helmet>
  );
};

export default Accountedit;
