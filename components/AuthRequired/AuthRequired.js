import { useSelector } from "react-redux";

const AuthRequired = (props) => {
  const isLogged = useSelector((state) => state.user.isLogged);

  if (!isLogged) return;

  return props.children;
};

export default AuthRequired;
