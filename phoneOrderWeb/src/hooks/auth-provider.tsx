import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export enum signInType {
  SignIn,
  Cache,
}

export interface IAuthContextProps {
  token: string;
  userName: string;
  signIn: (token: string, userName: string, callback?: VoidFunction) => void;
  signOut: (callback?: VoidFunction) => void;
}

export const AuthContext = createContext<IAuthContextProps>(null!);

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string>("");

  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") ?? ""
  );

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
    localStorage.setItem("token", "");
    setUserName("");
    localStorage.setItem("userName", "");
    callback && callback();
  };

  useEffect(() => {
    const token = localStorage.getItem("token") as string;

    if (!token)
      navigate("login", {
        replace: true,
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userName,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
