import React , {useState} from "react";
import styles from "./Auth.module.scss";
import resetImg from "../../assets/reset.webp";
import { Link,useNavigate } from "react-router-dom";
import { Card,Loader } from "../../components";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reset = () => {
  //state for email
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  //handle for reset password
  const navigate = useNavigate();
  const resetPassWord = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {       
        toast.success("Password reset email sent!");
        setIsLoading(false);
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false)  
      });
  };

  return (
    <> {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="reset password" width={280} />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset password</h2>
          <form onSubmit={resetPassWord}>
            <input type="text" placeholder="Email" value={email}  required onChange={(e) => setEmail(e.target.value)} />
            <button type="submit"
              className="--btn --btn-block --btn-primary"              
            >
              reset password
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
