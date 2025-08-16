import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";
const NotFound = () => {
  return (
    <section className="notfound " id="notfound">
      <h1 className="title404 text-center">404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="text-center text-light">
        <h2 className="text-light my-5">We can't find that page</h2>
        <p className="text-center  text-light my-5">
          We're fairly sure that page used to be here, but seems to have<br/> gone
          missing. We do apologise on it's behalf.
        </p>
        <br/>
        <span className="link404 my-5">
        <Link to="/" className="my-5 fs-4">
          Home
        </Link>
        
        </span>

      </div>
      <br/>
        <br/><br/>
        <br/>
    </section>
  );
};

export default NotFound;
