/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * NotFound component displays a 404 error page when a route
 * does not match any existing page. It provides a link back to home.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="notfound" id="notfound">
      <h1 className="title404 text-center">404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="text-center text-light">
        <h2 className="text-light my-5">We can't find that page</h2>
        <p className="text-center text-light my-5">
          We're fairly sure that page used to be here, but seems to have<br />
          gone missing. We do apologise on its behalf.
        </p>
        <span className="link404 my-5">
          <Link to="/" className="my-5 fs-4">
            Home
          </Link>
        </span>
      </div>
    </section>
  );
};

export default NotFound;
