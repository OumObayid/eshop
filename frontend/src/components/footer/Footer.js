/*
 * eShop Project - Footer Component
 * Description: Displays the footer section with social media links, navigation links, and copyright info.
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

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./Footer.css";

// Social media icons
import { AiOutlineInstagram } from "react-icons/ai";
import { TbBrandSnapchat, TbBrandTwitter } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";

// Get current year dynamically
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="footer-basic">
      <footer>
        {/* Social media links */}
        <div className="social">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <AiOutlineInstagram />
          </a>
          <a href="https://web.snapchat.com/" target="_blank" rel="noreferrer">
            <TbBrandSnapchat />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <TbBrandTwitter />
          </a>
          <a href="https://web.facebook.com/" target="_blank" rel="noreferrer">
            <FiFacebook />
          </a>
        </div>

        {/* Footer navigation links */}
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link to="/">Home</Link>
          </li>
          <li className="list-inline-item">
            <HashLink to="/#about">About</HashLink>
          </li>
          <li className="list-inline-item">
            <Link to="/terms">Terms</Link>
          </li>
          <li className="list-inline-item">
            <HashLink to="/#contact">Contact us</HashLink>
          </li>
          <li className="list-inline-item">
            <Link to="/policy">Privacy Policy</Link>
          </li>
        </ul>

        {/* Copyright */}
        <p className="copyright">Eshop &copy; {year} All rights Reserved</p>
      </footer>
    </div>
  );
};

export default Footer;
