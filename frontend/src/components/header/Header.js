/*
 * eShop Project - Header Component
 * Description: Navigation header including logo, menu, categories, user account links, and cart.
 *
 * Copyright (c) 2025 Oumaima El Obayid
 * This file is part of the eShop application.
 * Licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

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

// Logo component
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
  const navigate = useNavigate();

  // State to show/hide mobile menu
  const [showMenu, setShowMenu] = useState(false);

  // Get total quantity from Redux cart
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  // Get category list from Redux store
  const categorylist = useSelector(datacategorys);

  // Handle active link styling
  const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

  // Show or hide cart
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  // Show/hide menu in mobile
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  // Logout function
  const LogoutUser = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => toast.error(error.message));
  };

  // Monitor authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          let userinfos = {};
          const q = query(collection(db, "users"), where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            userinfos = { id: doc.id, ...doc.data() };
          });
          dispatch(updateUserInfo(userinfos));
        };
        fetchUser();

        dispatch(setActiveUser({ email: user.email, uid: user.uid }));
      } else {
        dispatch(removeActiveUser());
      }
    });
  }, [dispatch]);

  // Fetch categories and products from Firebase
  useEffect(() => {
    const getCategorys = async () => {
      const ref = collection(db, "categorys");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const fullDoc = { id: doc.id, ...doc.data() };
        dispatch(addCategory(fullDoc));
      });
    };
    getCategorys();

    const getProducts = async () => {
      const ref = collection(db, "products");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const fullDoc = { id: doc.id, ...doc.data() };
        dispatch(addProduct(fullDoc));
      });
    };
    getProducts();
  }, [dispatch]);

  return (
    <header id="navbar" className="px-5">
      {/* Logo */}
      <Link to="/">
        <div className={` ${styles.header}`}>{logo}</div>
      </Link>

      {/* Navigation */}
      <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
        <div
          className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}
          onClick={hideMenu}
        ></div>

        {/* Menu items */}
        <ul className="mb-0">
          <li className={styles["logo-mobile"]} onClick={toggleMenu}>
            {logo}
            <FaTimes size={19} color="#fff" />
          </li>
          <li>
            <NavLink to="/" className={activeLink} onClick={toggleMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={activeLink} onClick={toggleMenu}>Shop</NavLink>
          </li>

          {/* Dropdown for all categories */}
          <li className="nav-item dropdown" id="dropdown">
            <Link to="/" className="dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              All Categorys
            </Link>
            <ul className="dropdown-menu" id="dropdown-menu1" aria-labelledby="navbarDropdown">
              {categorylist.map((itemcat, index) => (
                <li key={index} onClick={toggleMenu}>
                  <Link to={`/categoryDetail/${itemcat.id}`} className="dropdown-item">{itemcat.categoryName}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Right side: login/register or account & cart */}
        <div className={styles["header-right"]}>
          <HiddenOnLogin>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink} onClick={toggleMenu}>Login</NavLink>
              <NavLink to="/register" className={activeLink} onClick={toggleMenu}>Register</NavLink>
            </span>
          </HiddenOnLogin>

          <ShowOnLogin>
            <div className={` ${styles.spanaccount}  ms-0 me-4`} id="dropdown">
              <Link to="/" className={`dropdown-toggle mt-5 ${styles.account}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
              </Link>
              <ul className="dropdown-menu" id="dropdown-menu2" aria-labelledby="navbarDropdown">
                <li><Link to="/account" className="dropdown-item" onClick={toggleMenu}>My Account</Link></li>
                <li><Link to="/order-history" className="dropdown-item" onClick={toggleMenu}>My Orders</Link></li>
                <li><Link to="/wishlist" className="dropdown-item" onClick={toggleMenu}>My Favourites</Link></li>
                <li><Link to="/" className="dropdown-item" onClick={LogoutUser}>Logout</Link></li>
              </ul>
            </div>
          </ShowOnLogin>

          {/* Wishlist & cart icons */}
          <div className="d-flex align-items-center">
            <Link to="/wishlist" className={styles.cartHidden}><i className="ri-heart-line fs-2"></i></Link>
            <div className={styles.cartHidden} onClick={toggleCart}>
              <CgShoppingCart size={24} className="mb-2" />
              <p style={{
                paddingTop: "1px",
                background: "#ef5c2fff",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                fontSize: "10px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#0A1930",
                marginBottom: "20px"
              }}>{totalQuantity}</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu icon */}
      <div className={styles["menu-icon"]}>
        <span className="d-flex align-item-center">
          <Link to="/wishlist" className={styles.wish}><i className="ri-heart-line fs-1"></i></Link>
          <span className={styles.cartbask} onClick={toggleCart}>
            <CgShoppingCart size={20} />
            <p style={{
              paddingTop: "1px",
              background: "var(--color-danger)",
              width: "17px",
              height: "17px",
              borderRadius: "50%",
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              color: "#0A1930"
            }}>{totalQuantity}</p>
          </span>
        </span>
        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
