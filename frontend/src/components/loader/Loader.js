/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * This file is part of the eShop application.
 *
 * Description:
 * Loader component that displays a loading GIF
 * using a React portal to render it above the main content.
 *
 * Usage:
 * <Loader />
 * Make sure to have an element with the id "loader" in your index.html
 *
 * License:
 * MIT License
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import styles from "./Loader.module.scss"; // Styles for the loader
import loaderImg from "../../assets/loader.gif"; // Loading GIF image
import ReactDOM from "react-dom"; // ReactDOM to create portals

// Loader component
const Loader = () => {
  // Render the loader inside a portal
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." width={50} />
      </div>
    </div>,
    document.getElementById("loader") // Portal target
  );
};

export default Loader; // Export the component
