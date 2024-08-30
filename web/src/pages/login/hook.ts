import { PostLogin } from "@/services/api/login";
import { IPostLoginType } from "@/services/dtos/login";
import { useDebounceFn } from "ahooks";
import { App, message } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hook/auth-provider";

export const useAction = () => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { state: historyState } = useLocation();

  // const { signIn } = useAuth();

  const [userName, setUserName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [isRemember, setIsRemember] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { run: onLogin } = useDebounceFn(
    (value: IPostLoginType) => {
      if (!userName || !password) {
        message.info("账号密码不为空！");
        return;
      }

      PostLogin(value)
        .then((res) => {
          message.success("登录成功");

          // signIn(res, value.userName);
        })

        .catch((error) => {
          message.error(error.msg);
        })

        .finally(() => setLoading(false));
    },
    { wait: 300 }
  );

  return {
    userName,
    password,
    isRemember,
    setIsRemember,
    setPassword,
    setUserName,
    onLogin,
  };
};
