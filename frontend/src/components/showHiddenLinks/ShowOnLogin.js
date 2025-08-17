/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * ShowOnLogin component renders its children only if the user is logged in.
 * It uses Redux to check the authentication state.
 *
 * Props:
 * - children: React elements to render if the user is logged in
 *
 * Usage:
 * <ShowOnLogin>
 *    ...content visible only to logged-in users...
 * </ShowOnLogin>
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useSelector } from "react-redux";
import { stateIsLoggedIn } from "../../redux/authSlice";

const ShowOnLogin = ({ children }) => {
  // Get authentication state from Redux
  const IsLoggedIn = useSelector(stateIsLoggedIn);

  // Render children only if user is logged in
  if (IsLoggedIn) return children;

  return null; // Return nothing if not logged in
};

export default ShowOnLogin;
