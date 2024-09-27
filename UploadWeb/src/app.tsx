import React from "react";
import { Router } from "./router";
import { useAction } from "./AppHook";
import { ConfigProvider } from "antd";
import locale from "antd/locale/zh_CN";

export const App = () => {
  const { isLoaded } = useAction();

  return (
    <ConfigProvider
      locale={locale}
      theme={{ token: { colorPrimary: "#5B53FF", colorText: "#323444" } }}
    >
      <Router />
    </ConfigProvider>
  );
};
