import locale from "antd/locale/zh_CN";

import { App as AppWrapper, ConfigProvider } from "antd";
import { useAction } from "./AppHook";
import React from "react";
import { Router } from "./router";
import { AuthProvider } from "./hooks/auth-provider";

export const App = () => {
  const { isLoaded } = useAction();

  return isLoaded ? (
    <ConfigProvider
      locale={locale}
      theme={{ token: { colorPrimary: "#5B53FF", colorText: "#323444" } }}
    >
      <AppWrapper>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </AppWrapper>
    </ConfigProvider>
  ) : (
    <></>
  );
};
