import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {AiOutlineInstagram} from "react-icons/ai"
import {TbBrandSnapchat} from "react-icons/tb"
import {TbBrandTwitter} from "react-icons/tb"
import {FiFacebook} from "react-icons/fi"

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div class="footer-basic">
    <footer>
      <div class="social">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
        <AiOutlineInstagram />
        </a>
        <a href="https://web.snapchat.com/" target="_blank" rel="noreferrer">
        <TbBrandSnapchat/>        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
       <TbBrandTwitter/>        </a>
        <a href="https://web.facebook.com/" target="_blank" rel="noreferrer">
          <FiFacebook />
        </a>
      </div>
      <ul class="list-inline">
        <li class="list-inline-item">
          <Link to="/">Home</Link>
        </li>
        <li class="list-inline-item">
          <Link to="/services">Services</Link>
        </li>
        <li class="list-inline-item">
          <Link to="/about">About</Link>
        </li>
        <li class="list-inline-item">
          <Link to="/terms">Terms</Link>
        </li>
        <li class="list-inline-item">
          <Link to="/policy">Privacy Policy</Link>
        </li>
      </ul>
      <p class="copyright">Eshop &copy; {year} All rights Reserved</p>
      </footer>
      </div>
  );
};

export default Footer;
 