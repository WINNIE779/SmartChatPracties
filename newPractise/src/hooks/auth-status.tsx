import React, { useEffect, useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./use-auth";
import { isNil, isEmpty } from "ramda";

export const AuthStatus = (props: { children: JSX.Element }) => {
  const location = useLocation();

  const { token } = useAuth();

  if (isNil(token) || isEmpty(token)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  // if (!canVisitAccount) {
  //   return <Navigate to="/" state={{ from: location }} replace={true} />;
  // }

  // if (!canVisitAPage) {
  //   return <Navigate to="/" state={{ from: location }} replace={true} />;
  // }

  // if (!canVisitBPage) {
  //   return <Navigate to="/" state={{ from: location }} replace={true} />;
  // }

  return props.children;
};
