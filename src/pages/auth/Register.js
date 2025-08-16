import React, { useState } from "react";
import styles from "./Auth.module.scss";
import registerImg from "../../assets/register.webp";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { Loader, Helmet, Card } from "../../components";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersRef = collection(db, "users");
      await addDoc(usersRef, {
        name: fullName,
        email: email,
        password: password,
        tel: "",
        address: "",
        country: "",
        region: "",
        city: "",
        postalCode: "",
        orders: [],
        card: {
          idCard: "",
          numberCard: "",
          last4: "",
          nameOnCard: "",
          cvc: "",
          brand: "",
          exp_month: 0,
          exp_year: 0,
        },
      });

      // Send verification email
      await sendEmailVerification(user);
      await signOut(auth);

      toast.success("Registration successful! Please check your email to verify your account.");
      navigate("/verifiemail");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <button type="submit" className="--btn --btn-block btn-warning">
                Register
              </button>
              <span className={styles.register}>
                <p>
                  Already have an account?
                  <Link to="/login" className="fw-bolder">
                    &nbsp;&nbsp;Login
                  </Link>
                </p>
              </span>
            </form>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="register" width={403} />
        </div>
      </section>
    </Helmet>
  );
};

export default Register;
