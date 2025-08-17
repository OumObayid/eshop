/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Scrolltop component displays a "back to top" button when the user scrolls
 * down more than half the screen height. Clicking the button scrolls the page
 * smoothly to the top.
 *
 * Usage:
 * <Scrolltop />
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useState } from "react";
import "./Scrolltop.css";
import imgTop from "../../assets/Top-Button.png";

const Scrolltop = () => {
  // State to show or hide the button
  const [show, setshow] = useState(false);

  // Monitor window scroll
  window.onscroll = function () {
    const res = window.scrollY > window.screen.height / 2; // Show if scrolled more than half screen height
    setshow(res);
  };

  return (
    <>
      {show && (
        <img
          src={imgTop}
          alt="Back to top"
          className="style"
          onClick={() => {
            // Smoothly scroll to top when clicked
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        />
      )}
    </>
  );
};

export default Scrolltop;
