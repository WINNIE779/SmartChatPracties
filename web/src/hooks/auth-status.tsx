import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();
  const { tokenKey } = useAuth();

  console.log("TokenKey:", tokenKey);
  console.log("Stored Token:", localStorage.getItem(tokenKey));

  if (!localStorage.getItem(tokenKey)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
