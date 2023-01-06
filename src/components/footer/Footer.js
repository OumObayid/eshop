import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {AiOutlineInstagram} from "react-icons/ai"
import {TbBrandSnapchat} from "react-icons/tb"
import {TbBrandTwitter} from "react-icons/tb"
import {FiFacebook} from "react-icons/fi"
import {HashLink} from "react-router-hash-link"
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="footer-basic">
    <footer>
      <div className="social">
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
      <p className="copyright">Eshop &copy; {year} All rights Reserved</p>
      </footer>
      </div>
  );
};

export default Footer;
 