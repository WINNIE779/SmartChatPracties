import { Button } from "antd";
import { useNavigate } from "react-router";
import React from "react";
import { useAuth } from "@/hooks/use-auth";

export const HomePage = () => {
  const navigate = useNavigate();

  const { getUserRole } = useAuth();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center p-5">主页面</div>
      <Button className="w-[8rem] mb-2" onClick={() => navigate("/main")}>
        我的页面
      </Button>
      <Button
        className="w-[8rem] mb-2"
        onClick={() => navigate("/account")}
        disabled={getUserRole.includes("操作员")}
      >
        账户页面
      </Button>
      <Button
        className="w-[8rem] mb-2"
        onClick={() => navigate("/a")}
        disabled={
          getUserRole.includes("管理员") || getUserRole.includes("超级管理员")
        }
      >
        A Page
      </Button>
      <Button
        className="w-[8rem] mb-2"
        onClick={() => navigate("/b")}
        disabled={
          getUserRole.includes("操作员") || getUserRole.includes("超级管理员")
        }
      >
        B Page
      </Button>
    </div>
  );
};
