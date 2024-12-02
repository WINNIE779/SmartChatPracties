import { isEmpty, isNil } from "ramda";
import { useAuth } from "./use-auth";
import { Navigate, useLocation } from "react-router-dom";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token } = useAuth();

  if (isNil(token) || isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
