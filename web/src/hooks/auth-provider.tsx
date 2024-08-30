import { GetSkillIntentsApi } from "@/services/api/intents";
import { useMemoizedFn, useUpdateEffect } from "ahooks";
import { App } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IProps {
  tokenKey: string;
  userName: string;
  signIn: (token: string, userName: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

export const AuthContext = createContext<IProps>(null!);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { message } = App.useApp();

  const tokenKey = (window as any).appsettings?.tokenKey;

  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );

  const signIn = (token: string, userName: string, callback?: VoidFunction) => {
    if (token) {
      setUserName(userName);

      localStorage.setItem(userName, userName);

      localStorage.setItem(tokenKey, token);

      callback && callback();
    }
  };

  const signOut = (callback?: VoidFunction) => {
    localStorage.setItem(userName, "");

    localStorage.setItem(tokenKey, "");

    callback && callback();
  };

  return (
    <AuthContext.Provider value={{ tokenKey, signIn, signOut, userName }}>
      {props.children}
    </AuthContext.Provider>
  );
};
