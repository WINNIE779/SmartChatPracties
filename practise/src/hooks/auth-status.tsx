import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { isNil, isEmpty } from "ramda";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token, userInfo } = useAuth();

  if (isNil(token) || isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (userInfo.roleName === "操作員" && location.pathname === "/account") {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  if (
    userInfo.roleName === "超級管理員" &&
    (location.pathname === "/a" || location.pathname === "/b")
  ) {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  if (userInfo.roleName === "管理员" && location.pathname === "/a") {
    return <Navigate to="/" state={{ from: location }} replace={true} />;
  }

  return props.children;
};
