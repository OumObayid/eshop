import { useSelector } from "react-redux";
import { stateIsLoggedIn } from "../../redux/authSlice";

const HiddenOnLogin = ({ children }) => {
  const IsLoggedIn = useSelector(stateIsLoggedIn);
  if (!IsLoggedIn) return children;
  return null;
};

export default HiddenOnLogin;
