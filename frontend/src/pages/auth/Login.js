/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Login component allows users to log in using email/password or Google.
 * It uses Firebase Authentication to verify credentials and handle email verification.
 * Displays success or error messages using react-toastify. Redirects logged-in users.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useState } from "react";
import styles from "./Auth.module.scss";
import loginImg from "../../assets/login.webp";
import { CgGoogle } from "react-icons/cg";
import { Card, Helmet, Loader } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  // Check if user is already connected and redirect to home
  onAuthStateChanged(auth, (user) => {   
    if (user) {
      navigate("/"); // Redirect to home if user is logged in
    } 
  });

  // States for email, password, and loading indicator
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to login user with email and password
  const loginUser = (e) => {    
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setIsLoading(false);
        if (user.emailVerified) navigate("/account"); // Redirect to account if email verified
        else navigate("/verifiemail"); // Otherwise redirect to email verification
       
      })
      .catch((error) => {
        toast.error("email or password is wrong"); // Show error message
        setIsLoading(false);
      });
  };

  // Google provider for authentication
  const provider = new GoogleAuthProvider();

  // Function to login with Google
  const loginWithG = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/"); // Redirect after successful Google login
      })
      .catch((error) => {
        toast.success(error.message); // Display any error message
      });
  };

  return (
    <Helmet title="login">
      {isLoading && <Loader />} {/* Show loader when loading */}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="login" width={384} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>              
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
              <button type="submit" className="--btn --btn-block btn-warning">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>

              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-block btn-warning"
              onClick={loginWithG}
            >
              <CgGoogle color="#fff" /> &ensp;Login With Google
            </button>
            <span className={styles.register}>
              <p>
                Don't have an account?
                <Link to="/register" className="fw-bolder">
                  &nbsp;&nbsp;Register
                </Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </Helmet>
  );
};

export default Login;
