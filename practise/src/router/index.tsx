import { Route, Routes } from "react-router-dom";
import { Login } from "@/pages/login";
import React, { ReactElement } from "react";
import { Main } from "@/pages/main";
import { Account } from "@/pages/account";
import { AuthStatus } from "@/hooks/auth-status";
import { A } from "@/pages/a";
import { B } from "@/pages/b";
import { HomePage } from "@/pages/home";
import { useAuth } from "@/hooks/use-auth";

export interface IRoute {
  path: string;
  element: ReactElement;
  children?: IRoute[];
  name?: string;
}

export const routes: IRoute[] = [
  {
    path: "/",
    element: <HomePage />,
    name: "主页面",
  },
  {
    path: "/main",
    element: <Main />,
    name: "我的页面",
  },
  {
    path: "/account",
    element: <Account />,
    name: "账户页面",
  },
  {
    path: "/a",
    element: <A />,
    name: "A页面",
  },
  {
    path: "/b",
    element: <B />,
    name: "B页面",
  },
];

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {routes.map((item) => {
        return (
          <Route
            key={item.path}
            path={item.path}
            element={<AuthStatus>{item.element}</AuthStatus>}
          />
        );
      })}
    </Routes>
  );
};
