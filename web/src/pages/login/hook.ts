import { useAuth } from "@/hooks/use-auth";
import { PostLogin } from "@/services/api/login";
import { IPostLoginType } from "@/services/dtos/login";
import { useDebounceFn } from "ahooks";
import { App } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAction = () => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const { state: historyState } = useLocation();

  const { signIn } = useAuth();

  const [userName, setUserName] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const [isRemember, setIsRemember] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const historyCallback = () => {
    historyState?.from?.pathname
      ? navigate(historyState.from.pathname, { replace: true })
      : navigate("/skill", { replace: true });
  };

  const { run: onLogin } = useDebounceFn(
    () => {
      if (!userName || !password) {
        message.info("帳號密碼不能為空");
        return;
      }
      setLoading(true);

      PostLogin({ userName: userName, password: password })
        .then((res) => {
          message.success("登录成功");

          signIn(res, userName, historyCallback);
        })

        .catch((err) => {
          message.error(err.msg);
        })

        .finally(() => setLoading(false));
    },
    { wait: 300 }
  );

  useEffect(() => {
    const tokenKey = (window as any).appsettings.tokenKey ?? "";

    const token = localStorage.getItem(tokenKey);

    if (token) {
      signIn(token, localStorage.getItem("userName") ?? "", historyCallback);
    }
  }, []);

  return {
    message,
    userName,
    password,
    isRemember,
    loading,
    onLogin,
    historyState,
    signIn,
    navigate,
    setLoading,
    setIsRemember,
    setPassword,
    setUserName,
  };
};
