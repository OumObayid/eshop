import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";
const NotFound = () => {
  return (
    <section className="notfound" id="notfound">
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/shom">SHop</Link>
      </div>
    </section>
  );
};

export default NotFound;
