import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { PostLogin } from "@/sercices/api/login";
import { useDebounceFn } from "ahooks";

interface ILoginDto {
  userName: string;
  password: string;
}

export const useAction = () => {
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [isLoad, setIsLoad] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<ILoginDto>({
    userName: "",
    password: "",
  });

  const { run: onLogin } = useDebounceFn(
    () => {
      if (!userInfo.userName || !userInfo.password) {
        return;
      }

      setIsLoad(true);

      PostLogin({ userName: userInfo.userName, password: userInfo.password })
        .then((res) => {
          signIn(res, userInfo.userName, () => {
            navigate("/");
          });

          message.success("登录成功");
        })
        .catch((error) => {
          message.error("无法登陆，请重试");
        })
        .finally(() => setIsLoad(false));
    },
    { wait: 600 }
  );

  return { onLogin, userInfo, setUserInfo };
};
