import locale from "antd/locale/zh_CN";

import { App as AppWrapper, ConfigProvider } from "antd";
import { useAction } from "./AppHook";
import React from "react";
import { Router } from "./router";

export const App = () => {
  const { isLoaded } = useAction();

  return isLoaded ? (
    <ConfigProvider
      locale={locale}
      theme={{ token: { colorPrimary: "#5B53FF", colorText: "#323444" } }}
    >
      <AppWrapper>
        <Router />
      </AppWrapper>
    </ConfigProvider>
  ) : (
    <></>
  );
};
