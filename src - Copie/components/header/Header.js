import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";

import { collection, getDocs, where, query } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeActiveUser, setActiveUser } from "../../redux/authSlice";
import ShowOnLogin from "../showHiddenLinks/ShowOnLogin";
import HiddenOnLogin from "../showHiddenLinks/HiddenOnLogin";
import { cartUiActions } from "../../redux/cartUiSlice";
import logoEshop from "../../assets/logo.gif";

import { HashLink } from "react-router-hash-link";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const Header = () => {
  //to animate navbar
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (currentScrollPos < 100 || currentScrollPos > 400) {
          document.getElementById("navbar").style.top = "0";
        } else {
          document.getElementById("navbar").style.top = "-100px";
        }
      };
    }
  }, []);
  //Code to show or hide menu in mobile
  const [showMenu, setShowMenu] = useState(false);
  //for active link
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
  //redux
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  //to navigate
  const navigate = useNavigate();
  //to recupere user if he is online
  const [userName, setUserName] = useState("");

  //display or hide menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  //hide show cart
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  //hide menu
  const hideMenu = () => {
    setShowMenu(false);
  };

  //deconexion
  const LogoutUser = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //if user is logged
        const fetchUser = async () => {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUserName(doc.data().name);
          });
        };
        fetchUser();
        //to memorize active user in redux
        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.email,
            uid: user.uid,
          })
        );
      } else {
        //if user is logged out
        //to memorize inactive user in redux
        dispatch(removeActiveUser());
      }
    });
  });


  const showList1=()=>{
      document.getElementById("dropdown-menu1").classList.add("show");  
  }
  const hideList1=()=>{
    document.getElementById("dropdown-menu1").classList.remove("show"); 

  }
    const showList2=()=>{
      document.getElementById("dropdown-menu2").classList.add("show");   
  }
  const hideList2=()=>{
    document.getElementById("dropdown-menu2").classList.remove("show"); 
 }
 
  return (
    <header id="navbar">
      {/* <div className={` ${styles.header}`}>{logo}</div> */}
      <Link to="/">
        <img src={logoEshop} alt="logo" style={{ width: "90px" }} />
      </Link>
      <nav
        className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}
        onClick={toggleMenu}
      >
        <div
          className={
            showMenu
              ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
              : `${styles["nav-wrapper"]}`
          }
          onClick={hideMenu}
        >
          {" "}
        </div>
        <ul className="pt-3">
          <li className={styles["logo-mobile"]}>
            {logo}
            <FaTimes size={22} color="#fff" />
          </li>
          <li>
            <NavLink to="/" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={activeLink}>
              Shop
            </NavLink>
          </li>
          <li className="nav-item dropdown" id="dropdown" onMouseEnter={showList1} onMouseLeave={hideList1}>
            <Link
              to="/"
              className=" dropdown-toggle cat"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              All Categorys
            </Link>
            <ul className="dropdown-menu" id="dropdown-menu1" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/" className="dropdown-item">
                  Action
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Another action
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Something else here
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <HashLink to="/#contact" className={activeLink}>
              Contact Us
            </HashLink>
          </li>
        </ul>
        <div className={styles["header-right"]}>
          <span>
            <HiddenOnLogin>
              <span className={styles.links}>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
                <NavLink to="/register" className={activeLink}>
                  Register
                </NavLink>
              </span>
            </HiddenOnLogin>
            <ShowOnLogin>
             
              <div className="nav-item dropdown d-flex justify-content-between pt-3" onMouseEnter={showList2} onMouseLeave={hideList2}>
                <div
                  className="nav-link dropdown-toggle align-middle mb-3 "                  
                  style={{ color: "#F89B34" }}
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false" 
                  
                >
                  <FaUserCircle size={24} />
                </div>
                <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="navbarDropdown" 
                style={{position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate3d(0px, 40px, 0px)"}}>
                  <li>
                    <Link to="/order-history" className=" dropdown-item">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className=" dropdown-item"
                      onClick={LogoutUser}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </ShowOnLogin>
          </span>
          <span role="button" className={styles.cart}>
            <div
              className="d-flex justify-content-center  "
              onClick={toggleCart}
            >
              <span className="mr-2 mt-2 fs-4 ">Cart</span>
              <i className="ri-shopping-basket-line fs-2"></i>
              <p
                className="align-middle"
                style={{
                  paddingTop: "1px",
                  background: "#F89B34",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  zIndex: 40,
                  fontSize: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {totalQuantity}
              </p>
            </div>
          </span>
        </div>
      </nav>

      <div className={styles["menu-icon"]}>
        <span className={styles.cart}>
          <Link to="/cart">
            Cart
            <FaShoppingCart size={20} />
            <p>{totalQuantity}</p>
          </Link>
        </span>
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
