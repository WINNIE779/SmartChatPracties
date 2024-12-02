import { Route, Routes } from "react-router-dom";

import { Main } from "@/pages/main";
import { Login } from "@/pages/login";
import { AuthStatus } from "@/hooks/auth-status";
import { AccountList } from "@/pages/account";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <AuthStatus>
            <Main />
          </AuthStatus>
        }
      />
      <Route path="/account" element={<AccountList />} />
    </Routes>
  );
};
