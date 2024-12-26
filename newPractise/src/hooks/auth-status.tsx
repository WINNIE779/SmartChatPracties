import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";
import { isNil, isEmpty } from "ramda";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token, getUserRole } = useAuth();

  if (isNil(token) || isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (getUserRole.includes("操作员") && location.pathname === "/account") {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  if (
    (getUserRole.includes("超级管理员") || getUserRole.includes("管理员")) &&
    location.pathname === "/a"
  ) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  if (
    (getUserRole.includes("超级管理员") || getUserRole.includes("操作员")) &&
    location.pathname === "/b"
  ) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
