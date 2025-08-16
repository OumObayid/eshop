import React from "react";

const Helmet = (props) => {
  document.title = "eShop ordering app - " + props.title;
  return <div style={{marginTop: "5rem"}} className="container w-100">{props.children}</div>;
};

export default Helmet;
