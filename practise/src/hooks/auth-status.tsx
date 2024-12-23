import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { isNil, isEmpty } from "ramda";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token } = useAuth();

  if (isNil(token) || isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
