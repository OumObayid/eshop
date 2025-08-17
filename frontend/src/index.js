/*
 * eShop Project
 * index
 *
 * Description:
 * Entry point of the React application.
 * Wraps the App component with Redux Provider for state management.
 * Imports global CSS and icon fonts.
 *
 * License:
 * MIT License
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "remixicon/fonts/remixicon.css";

// Render the main app inside Redux Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
