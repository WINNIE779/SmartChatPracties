import { Button } from "antd";
import { useNavigate } from "react-router";
import React from "react";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-center p-5">主页面</div>
      <Button className="w-[8rem] mb-2" onClick={() => navigate("/main")}>
        我的页面
      </Button>
      <Button className="w-[8rem] mb-2" onClick={() => navigate("/account")}>
        账户页面
      </Button>
      <Button className="w-[8rem] mb-2" onClick={() => navigate("/a")}>
        A Page
      </Button>
      <Button className="w-[8rem] mb-2" onClick={() => navigate("/b")}>
        B Page
      </Button>
    </div>
  );
};
