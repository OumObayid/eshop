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
  //check if user is connected
  onAuthStateChanged(auth, (user) => {   
    if (user) {
      navigate("/");
    } 
  })
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //login
 

  const loginUser = (e) => {    
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setIsLoading(false);
        if (user.emailVerified) navigate("/account");
        else navigate("/verifiemail");
       
      })
      .catch((error) => {
        toast.error("email or password is wrong");
        setIsLoading(false);
      });
  };

  //login with google
  const provider = new GoogleAuthProvider();
  const loginWithG = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        //const user = result.user;

        navigate("/");
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  return (
    <Helmet title="login">
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>z
        <div className={styles.img}>
          <img  src={loginImg} alt="login" width={384} />
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
              <button   type="submit" className="--btn --btn-block btn-warning">
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
