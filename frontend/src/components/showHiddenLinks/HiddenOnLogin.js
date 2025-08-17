/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * HiddenOnLogin component renders its children only if the user is not logged in.
 * It uses Redux to check the authentication state.
 *
 * Props:
 * - children: React elements to render if the user is not logged in
 *
 * Usage:
 * <HiddenOnLogin>
 *    ...content visible only to guests...
 * </HiddenOnLogin>
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useSelector } from "react-redux";
import { stateIsLoggedIn } from "../../redux/authSlice";

const HiddenOnLogin = ({ children }) => {
  // Get authentication state from Redux
  const IsLoggedIn = useSelector(stateIsLoggedIn);

  // Render children only if user is not logged in
  if (!IsLoggedIn) return children;

  return null; // Return nothing if logged in
};

export default HiddenOnLogin;
