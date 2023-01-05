import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs,  query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "../../components";
import { auth, db } from "../../firebase/config";
import "./Account.css";
const Account = () => {
  const [user, setUser] = useState({});
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
          // console.log("user :", user);
        };
        getUser(user.email);
      }
    });
  }, [navigate]);

  return (
    <Helmet title="Account">
      <section className="account" id="account">
        <h2>Your Account</h2>
        <div className="form__group">
          <div>{user.name}</div>
        </div>
        <div className="form__group"><div>{user.email}</div></div>
        <div className="form__group"><div>{user.tel}</div></div>
        <div className="form__group"><div>{user.address}</div></div>
        <div className="form__group"><div>{user.country}</div></div>
        <div className="form__group"><div>{user.region}</div></div>
        <div className="form__group"><div>{user.city}</div></div>
        <div className="form__group"><div>{user.postalCode}</div></div>
       <Link to="/accountedit"> <i class="ri-edit-2-fill"></i></Link>
   
      </section>
    </Helmet>
  );
};

export default Account;
