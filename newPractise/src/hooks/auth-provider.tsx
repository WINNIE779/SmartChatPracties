import {
  IPermission,
  IRole,
  IUserAccount,
  SystemSource,
} from "@/sercices/api/account/dto";
import { GetUserAcountInfo } from "@/sercices/api/login";
import { IRolePermission } from "@/sercices/api/login/dtos";

import { useRequest, useUpdateEffect } from "ahooks";
import { isEmpty, isNil } from "ramda";
import React, { useEffect, useMemo } from "react";
import { createContext, useState } from "react";

export interface IUser {
  count: number;
  rolePermissionData: IRolePermission[];
  userAccount: IUserAccount | null;
}

const defaultUserInfo: IUser = {
  count: 0,
  rolePermissionData: [],
  userAccount: null,
};

export interface IAuthContextProps {
  token: string;
  userName: string;
  signIn: (token: string, userName: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
  userInfo: IUser;
  userRoles: "超级管理员" | "管理员" | "操作员" | null;
}

export const AuthContext = createContext<IAuthContextProps>(null!);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>("");

  const [userInfo, setUserInfo] = useState<IUser>(defaultUserInfo);

  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );

  const fetchUserAccountInfo = useRequest(GetUserAcountInfo, {
    manual: true,
    pollingInterval: 3000,

    onSuccess: (res: IUser) => {
      console.log("res", res);

      setUserInfo({
        count: res?.count ?? 0,
        rolePermissionData: res?.rolePermissionData ?? [],
        userAccount: res?.userAccount
          ? {
              ...res.userAccount,
              userName: res.userAccount.userName ?? "",
            }
          : null,
      });
    },
    onError: (error) => {
      setUserInfo(defaultUserInfo);
    },
  });

  const getRole = (roles: IRole[]) => {
    const roleNames = roles.flatMap((item) => item.displayName);

    if (roleNames.includes("超级管理员")) {
      return "超级管理员";
    }

    if (roleNames.includes("管理员")) {
      return "管理员";
    }

    return "操作员";
  };

  const userRoles = useMemo(() => {
    return getRole(userInfo?.rolePermissionData.map((item) => item.role) ?? []);
  }, [userInfo.rolePermissionData]);

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
      value={{
        token,
        signIn,
        signOut,
        userName,
        userInfo,
        userRoles,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
