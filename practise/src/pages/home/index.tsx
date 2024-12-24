import { useAuth } from "@/hooks/use-auth";
import { Button, message } from "antd";
import React from "react";
import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();

  const { userInfo } = useAuth();

  const handleNavigate = (path: string, allowedRoles: string[]) => {
    if (allowedRoles.includes(userInfo.roleName)) {
      navigate(path);
    } else {
      message.error("您没有权限访问此页面");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center p-8">主页面</div>
      <Button
        className="cursor-pointer w-[6rem] m-2"
        onClick={() => navigate("/main")}
      >
        我的页面
      </Button>
      <Button
        className="cursor-pointer w-[6rem] m-2"
        onClick={() => handleNavigate("/account", ["管理员", "超级管理员"])}
      >
        账户页面
      </Button>

      <Button
        className="cursor-pointer w-[6rem] m-2"
        onClick={() => handleNavigate("/a", ["操作员"])}
      >
        A Page
      </Button>
      <Button
        className="cursor-pointer w-[6rem] m-2"
        onClick={() => handleNavigate("/b", ["管理员"])}
      >
        B Page
      </Button>
    </div>
  );
};
