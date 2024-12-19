import { useAuth } from "@/hooks/use-auth";
import { PostLogin } from "@/services/api/conversation";
import { useDebounceFn, useMemoizedFn } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface IUserInfo {
  userName: string;
  passWord: string;
  loading: boolean;
}

export const useAction = () => {
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const [userInfo, setuserInfo] = useState<IUserInfo>({
    userName: "",
    passWord: "",
    loading: false,
  });

  const handleChangeUserInfo = useMemoizedFn((data: Partial<IUserInfo>) => {
    setuserInfo((prev) => ({
      ...prev,
      ...data,
    }));
  });

  const { run: handleLoginChange } = useDebounceFn(
    useMemoizedFn(async () => {
      if (userInfo.userName && userInfo.passWord) {
        handleChangeUserInfo({ loading: true });

        PostLogin({
          userName: userInfo.userName,
          password: userInfo.passWord,
        })
          .then((res) => {
            if (res) {
              handleChangeUserInfo({ loading: false });

              signIn(res, userInfo.userName, () => {
                navigate("/");
              });
            } else {
              throw new Error("帳戶或密碼不正確，請重試！");
            }
          })
          .catch(() => {
            message.error("帳戶或密碼不正確，請重試！");
            handleChangeUserInfo({ loading: false });
          });
      }
    }),
    {
      wait: 300,
    }
  );

  const historyState = useLocation().state;

  const historyCallback = () => {
    historyState?.from?.pathname
      ? navigate(historyState?.from?.pathname + historyState?.from?.search, {
          replace: true,
        })
      : navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      signIn(
        token,
        localStorage.getItem("userName") ?? "",
        // signInType.Cache,
        historyCallback
      );
    }
  }, []);

  return { userInfo, handleLoginChange, handleChangeUserInfo };
};
