import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import { SkillManagement } from "../pages/skill";
import { AddSkillPage } from "../pages/skill/skill-add";
import { LoginPage } from "../pages/login";
import { AuthStatus } from "@/hooks/auth-status";
import { useAuth } from "@/hooks/use-auth";

export interface IRouterList {
  path: string;
  element: JSX.Element;
  name?: string;
  children?: IRouterList[];
}

export const routerList: IRouterList[] = [
  {
    path: "/login",
    element: <LoginPage />,
    name: "登陸",
  },
  {
    path: "/skill",
    element: <SkillManagement />,
    name: "技能管理",
    children: [
      {
        path: "",
        element: <SkillManagement />,
      },
      {
        name: "增加技能管理",
        path: "/skillAdd",
        element: <AddSkillPage />,
      },
    ],
  },
];

export const Router = () => {
  const recursionChildren = (routes: IRouterList[]) => {
    return routes.map((item, index) => {
      return (
        <Route key={index} path={item.path} element={item.element}>
          {item.children &&
            item.children?.length > 0 &&
            recursionChildren(item.children)}
        </Route>
      );
    });
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<SkillManagement />}>
        <>
          <Route path="/skill" element={<Navigate to="/skill" />} />
          {routerList.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                element={<AuthStatus>{item.element}</AuthStatus>}
              >
                {item.children && recursionChildren(item.children)}
              </Route>
            );
          })}
        </>
      </Route>
    </Routes>
  );
};
