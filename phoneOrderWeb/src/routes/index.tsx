import { Route, Routes } from "react-router-dom";

import { Main } from "@/pages/main";
import { Login } from "@/pages/login";
import { AuthStatus } from "@/hooks/auth-status";
import { AccountList } from "@/pages/account";
import { ReactElement } from "react";

export interface IRoute {
  path: string;
  element: ReactElement;
  children?: IRoute[];
}

export const routerList: IRoute[] = [
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/account",
    element: <AccountList />,
  },
];

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {routerList.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          element={<AuthStatus>{item.element}</AuthStatus>}
        />
      ))}
    </Routes>
  );
};
