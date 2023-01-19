import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
// import $ from "jquery";
// import logoEshop from "../../assets/logo.png";

import { FaTimes } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgShoppingCart } from "react-icons/cg";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../redux/cartUiSlice";
import {
  addCategory,
  addProduct,
  datacategorys,
   updateUserInfo,
} from "../../redux/dataSlice";
import { removeActiveUser, setActiveUser } from "../../redux/authSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ShowOnLogin from "../showHiddenLinks/ShowOnLogin";
import HiddenOnLogin from "../showHiddenLinks/HiddenOnLogin";


const logo = (
  <div className={styles.logo} style={{ marginTop: "8px" }}>
    <Link to="/">
      <h3>
        e<span>Shop</span>.
      </h3>
    </Link>
  </div>
);

const Header = () => {
  const dispatch = useDispatch();
  //to navigate
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //if user is logged
        
        const fetchUser = async () => {
          let userinfos = {};
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );

          const querySnapshot = await getDocs(q);        
          querySnapshot.forEach((doc) => {
            userinfos = {
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
              card: doc.data().card,
              orders: doc.data().orders,
            };
          });  
          console.log('userinfos :', userinfos);
          dispatch(updateUserInfo(userinfos));          
        };
        fetchUser()
        
       
       
        //to memorize active user in redux store
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

  useEffect(() => {
    
    //get all categorys from firebase
    const getCategorys = async () => {
      //////////////// get data from firebase
      const ref = collection(db, "categorys");
      const querySnapshot = await getDocs(ref);
      const list = [];
      querySnapshot.forEach((doc) => {
        let fullDoc = { id: doc.id, ...doc.data() }; //concate id to document
        list.push(fullDoc); //put data in array list
        dispatch(addCategory(fullDoc)); // put doc in store redux
      });
    };
    getCategorys(); // call to function

    //get all products from firebase
    const getProducts = async () => {
      //////////////// get data from firebase
      const ref = collection(db, "products");
      const querySnapshot = await getDocs(ref);
      const list = [];
      querySnapshot.forEach((doc) => {
        let fullDoc = { id: doc.id, ...doc.data() }; //concate id to document
        list.push(fullDoc); //put data in array list
        dispatch(addProduct(fullDoc)); // put doc in store redux
      });
    };
    getProducts();
    // get User data from firebase
  }, [dispatch]);

  //Code to show or hide menu in mobile
  const [showMenu, setShowMenu] = useState(false);
  //for active link
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");
  //redux

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);



  //display or hide menu
  const toggleMenu = (even) => {
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

  //to get gategory list
  const categorylist = useSelector(datacategorys);

  return (
    <header id="navbar">
      <Link to="/">
        <div className={` ${styles.header}`}>{logo}</div>
        {/* <img src={logoEshop} alt="logo" style={{ width: "110px" }} /> */}
      </Link>
      <nav
        className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}
      >
        <div
          className={
            showMenu
              ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
              : `${styles["nav-wrapper"]}`
          }
          onClick={hideMenu}
        ></div>
        <ul className="mb-0">
          <li className={styles["logo-mobile"]} onClick={toggleMenu}>
            {logo}
            <FaTimes size={19} color="#fff" />
          </li>
          <li>
            <NavLink to="/" className={activeLink} onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={activeLink} onClick={toggleMenu}>
              Shop
            </NavLink>
          </li>
          <li
            className="nav-item dropdown "
            id="dropdown"            
          >
            <Link
              to="/"
              className=" dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              All Categorys
            </Link>
            <ul
              className="dropdown-menu"
              id="dropdown-menu1"
              aria-labelledby="navbarDropdown"
            >
              {categorylist.map((itemcat, index) => {
                return (
                  <li key={index} onClick={toggleMenu}>
                    <Link
                      to={`/categoryDetail/${itemcat.id}`}
                      className="dropdown-item"
                    >
                      {itemcat.categoryName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>

        <div className={styles["header-right"]}>
          <HiddenOnLogin>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink} onClick={toggleMenu}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={activeLink}
                onClick={toggleMenu}
              >
                Register
              </NavLink>
            </span>
          </HiddenOnLogin>
          <ShowOnLogin>
            <div
              className={` ${styles.spanaccount}  ms-0 me-4 `}
              id="dropdown"
            >
              <Link
                to="/"
                className={`dropdown-toggle mt-5 ${styles.account} `}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My Account
              </Link>
              <ul
                className="dropdown-menu"
                id="dropdown-menu2"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link
                    to="/account"
                    className=" dropdown-item"
                    onClick={toggleMenu}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/order-history"
                    className=" dropdown-item"
                    onClick={toggleMenu}
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className=" dropdown-item"
                    onClick={toggleMenu}
                  >
                    my favourites
                  </Link>
                </li>
                <li>
                  <Link to="/" className=" dropdown-item" onClick={LogoutUser}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </ShowOnLogin>          
          <div className="d-flex align-items-center">
            <Link
              to="/wishlist"
              className={styles.cartHidden}
            >
              <span className="ms-0 me-1 ">Wishlist</span>
              <i className="ri-heart-line fs-2"></i>
            </Link>

            <div className={styles.cartHidden} onClick={toggleCart}>
              <span className="me-1 ">Cart</span>
              <CgShoppingCart size={24} className="mb-2" />

              <p
                className="align-middle"
                style={{
                  paddingTop: "1px",
                  background: "#F89B34",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  zIndex: 40,
                  fontSize: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#0A1930",
                  marginBottom:"10px"
                }}
              >
                {totalQuantity}
              </p>
            </div>
          </div>
        </div>
      </nav>
      <div className={styles["menu-icon"]}>
        <span className=" d-flex align-item-center ">
          <Link to="/wishlist" className={styles.wish}>
            <span className="me-1">Wishlist</span>
            <i className="ri-heart-line fs-1 "></i>
          </Link>
          <span className={styles.cartbask} to="/cart" onClick={toggleCart}>
            Cart
            <CgShoppingCart size={20} />
            <p
              className="align-middle"
              style={{
                paddingTop: "1px",
                background: "#F89B34",
                width: "17px",
                height: "17px",
                borderRadius: "50%",
                zIndex: 40,
                fontSize: "12px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#0A1930",
              }}
            >
              {totalQuantity}
            </p>
          </span>
        </span>
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
