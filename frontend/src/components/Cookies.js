import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Helmet from "./Helmet/Helmet";

const Cookies = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [cookies, setCookie] = useCookies(["user"]);

  const handle = () => {
    setCookie("Name", name, { path: "/" });
    setCookie("Password", pwd, { path: "/" });
  };
  return (
    <Helmet >
      <h1>Name of the user:</h1>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1>Password of the user:</h1>
      <input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />
      <div>
        <button onClick={handle}>Set Cookie</button>{" "}
      </div>
      <br />
      {cookies.Name && (
        <div>
          Name: <p>{cookies.Name}</p>
        </div>
      )}
      {cookies.Password && (
        <div>
          Password: <p>{cookies.Password}</p>
        </div>
      )}
    </Helmet>
  );
};
export default Cookies;
