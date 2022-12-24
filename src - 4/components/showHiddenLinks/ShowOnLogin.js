import { useSelector } from "react-redux";
import { stateIsLoggedIn } from "../../redux/authSlice";

const ShowOnLogin = ({ children }) => {
  const IsLoggedIn = useSelector(stateIsLoggedIn);
  if (IsLoggedIn) return children;
  return null;
};

export default ShowOnLogin;
