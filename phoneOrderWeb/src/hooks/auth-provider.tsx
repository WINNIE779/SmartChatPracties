import { IUserInfo } from "@/services/api/account/dto";
import { getUserInfo } from "@/services/api/account";
import { SystemSource } from "@/services/api/account/dto";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateEffect } from "ahooks";
import { isEmpty, isNil } from "ramda";
import { getRolePermission } from "@/components/custom-message";

export enum signInType {
  SignIn,
  Cache,
}

export interface IAuthContextProps {
  token: string;
  userName: string;
  signIn: (token: string, userName: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
  userInfo: IUserInfo;
  isCanEnterAccountList: boolean;
  role: "SuperAdministrator" | "Administrator" | "User" | null;
}

export const defaultUserInfo: IUserInfo = {
  count: 0,
  rolePermissionData: [],
  userAccount: null,
};

export const AuthContext = createContext<IAuthContextProps>(null!);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string>("");

  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );

  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo);

  const handleGetUserInfo = () => {
    getUserInfo(SystemSource.SmartTalk)
      .then((res) => {
        setUserInfo({
          count: res?.count ?? 0,
          rolePermissionData: res?.rolePermissionData ?? [],
          userAccount: res?.userAccount ?? null,
        });
      })
      .catch(() => {
        setUserInfo(defaultUserInfo);
      });
  };

  // 判断是否满足rolename为这两个role
  const isCanEnterAccountList = useMemo(() => {
    return userInfo.rolePermissionData.some(
      (item) =>
        item.role.name === "SuperAdministrator" ||
        item.role.name === "Administrator"
    );
  }, [userInfo]);

  const role = useMemo(() => {
    return getRolePermission(
      userInfo?.rolePermissionData.map((item) => item.role) ?? []
    );
  }, [userInfo.rolePermissionData]);

  const signIn = async (
    token: string,
    userName: string,
    callback?: VoidFunction
  ) => {
    localStorage.setItem("token", token);

    setToken(token);

    setUserName(userName);

    localStorage.setItem("userName", userName);

    // type === signInType.SignIn &&
    //   (await GetUserInfo()
    //     .then((res) => {
    //       changeUserInfo(
    //         RequestType.Success,
    //         res?.smartChatUser ?? {
    //           name: "Success",
    //           userId: "",
    //         },
    //         res?.permissions ?? []
    //       );
    //     })
    //     .catch(() => {
    //       changeUserInfo(
    //         RequestType.Error,
    //         {
    //           name: "Error",
    //           userId: "",
    //         },
    //         []
    //       );
    //     }));

    callback && callback();
  };

  const signOut = (callback?: VoidFunction) => {
    setToken("");
    localStorage.setItem("token", "");
    setUserName("");
    localStorage.setItem("userName", "");
    callback && callback();
  };

  const localStorageToken = localStorage.getItem("token") as string;

  useEffect(() => {
    if (!localStorageToken) {
      navigate("login", {
        replace: true,
      });
    } else {
      handleGetUserInfo();
    }
  }, [localStorageToken]);

  useUpdateEffect(() => {
    if (isNil(token) || isEmpty(token)) {
      handleGetUserInfo();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        signIn,
        signOut,
        userInfo,
        isCanEnterAccountList,
        role,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
