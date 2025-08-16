import React, { useState } from "react";
import "./Scrolltop.css";
import imgTop from "../../assets/Top-Button.png";

const Scrolltop = () => {
  const [show, setshow] = useState(false)
 
  window.onscroll = function () {
    const res =  window.scrollY>(window.screen.height)/2 ? true : false;
    setshow(res)  
  };
  return (
    <>
      {show &&
        <img
          src={imgTop}
          alt="top"
          className="style"
          onScroll={() => {}}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        />
      }
    </>
  );
};

export default Scrolltop;
