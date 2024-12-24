import { SystemSource } from "@/sercices/api/account/dto";

import { GetUserAcountInfo } from "@/sercices/api/main";
import { IUser } from "@/sercices/api/main/dto";
import { useDebounceFn, useRequest, useUpdateEffect } from "ahooks";
import { isEmpty, isNil } from "ramda";
import React, { useEffect, useMemo } from "react";
import { createContext, useState } from "react";

export interface IUserInfo {
  userName: string;
  roleName: string;
  permission: string[];
}

const defaultUserInfo: IUserInfo = {
  userName: "",
  roleName: "",
  permission: [],
};

export interface IAuthContextProps {
  token: string;
  userName: string;
  userInfo: IUserInfo;
  signIn: (token: string, userName: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContextProps>(null!);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("");

  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);

  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );

  const fetchUserAccountInfo = useRequest(GetUserAcountInfo, {
    pollingInterval: 3000,
    manual: true,
    onSuccess: (res: IUser) => {
      setUserInfo({
        userName: res?.userAccount?.userName,
        roleName: res?.rolePermissionData?.[0].role?.displayName,
        permission: res?.rolePermissionData
          ?.flatMap((item) => item.permissions)
          .map((items) => items.name),
      });
    },
    onError: (error) => {
      setUserInfo(defaultUserInfo);
    },
  });

  const signIn = async (
    token: string,
    userName: string,
    callback?: VoidFunction
  ) => {
    if (token) {
      setUserName(userName);

      setToken(token);

      localStorage.setItem("userName", userName);

      localStorage.setItem("token", token);

      callback && callback();
    }
  };

  const signOut = (callback?: VoidFunction) => {
    localStorage.setItem("userName", "");

    localStorage.setItem("token", "");

    setUserName("");

    callback && callback();
  };

  useEffect(() => {
    fetchUserAccountInfo.run({ SystemSource: SystemSource.SmartTalk });
  }, []);

  useUpdateEffect(() => {
    if (isNil(token) || isEmpty(token)) {
      fetchUserAccountInfo.cancel();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, signIn, signOut, userName, userInfo }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
