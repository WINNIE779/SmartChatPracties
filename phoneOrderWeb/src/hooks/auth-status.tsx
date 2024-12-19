import { isEmpty, isNil } from "ramda";
import { useAuth } from "./use-auth";
import { Navigate, useLocation } from "react-router-dom";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token, role } = useAuth();

  if (isNil(token) || isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (isNil(role)) {
    return null;
  }

  if (role === "User" && location.pathname === "/account") {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
