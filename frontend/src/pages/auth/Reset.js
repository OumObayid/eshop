/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Reset component allows users to reset their password by sending a password
 * reset email via Firebase Authentication. Displays success or error messages
 * using react-toastify.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useState } from "react";
import styles from "./Auth.module.scss";
import resetImg from "../../assets/reset.webp";
import { Link, useNavigate } from "react-router-dom";
import { Card, Loader } from "../../components";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reset = () => {
  const [email, setEmail] = useState(""); // State to store email input
  const [isLoading, setIsLoading] = useState(false); // State to show loader

  const navigate = useNavigate();

  // Function to handle password reset
  const resetPassWord = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!"); // Success message
        setIsLoading(false);
        navigate("/"); // Redirect to home or login page
      })
      .catch((error) => {
        toast.error(error.message); // Show error message
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />} {/* Show loader while processing */}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="reset password" width={280} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset password</h2>
            <form onSubmit={resetPassWord}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="--btn --btn-block --btn-primary"
              >
                Reset password
              </button>

              <span className={`--flex-between ${styles.login}`}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </span>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
