import React from "react";
import { Router } from "./router";
import { useAction } from "./AppHook";
import { App as AppWrapper, ConfigProvider } from "antd";
import { AuthProvider } from "./hooks/auth-provider";

export const App = () => {
  const { isLoaded } = useAction();

  return isLoaded ? (
    <ConfigProvider>
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
