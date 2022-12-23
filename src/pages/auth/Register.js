import React, { useState } from "react";
import styles from "./Auth.module.scss";
import registerImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import {Loader,Helmet,Card} from "../../components";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("passwords do not muatch");
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //const user = userCredential.user;
          //toast.success("Registration SucessFul ...");
          try {
            const docRef = addDoc(collection(db, "users"), {
              name: fullName,
              email: email,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            toast.error(`Error adding document: ${e.message}`);
          }
          setIsLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <Helmet title="register">
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Full Name"
                required
                // obligatory: value  from useState et onChange to useState
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                //
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-block --btn-primary">
                Register
              </button>
              <span className={styles.register}>
                <p>Already have an account? 
                <Link to="/login" className="fw-bolder">&nbsp;&nbsp;Login</Link></p>
              </span>
            </form>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width={300} />
        </div>
      </section>
    </Helmet>
  );
};

export default Register;
