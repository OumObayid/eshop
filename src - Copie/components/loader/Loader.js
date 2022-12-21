import React from "react";
import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";
import reactDOM from "react-dom"

const Loader = () => {
  return reactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." width={50}/>
      </div>
    </div>, 
    document.getElementById("loader")
  );
};

export default Loader;
