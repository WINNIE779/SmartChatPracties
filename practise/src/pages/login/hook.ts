import { useAuth } from "@/hooks/use-auth";
import { IUser, PostLogin } from "@/sercices/api/login";
import { useDebounceFn } from "ahooks";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const useAction = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<IUser>({
    userName: "",
    password: "",
  });

  const { run: onLogin } = useDebounceFn(
    () => {
      if (!userInfo.userName || !userInfo.password) {
        message.info("帳號密碼不能為空");
        return;
      }

      setLoading(true);

      PostLogin({ userName: userInfo.userName, password: userInfo.password })
        .then((res) => {
          signIn(res, userInfo.userName, () => {
            navigate("/");
          });

          message.success("登录成功");
        })
        .catch((error) => {
          message.error("帳戶或密碼不正確，請重試！");
        })
        .finally(() => setLoading(false));
    },
    { wait: 500 }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
  }, []);

  return { onLogin, loading, userInfo, setUserInfo, setLoading };
};
