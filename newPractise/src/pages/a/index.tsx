import React from "react";
import { useNavigate } from "react-router";

export const APage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen">
      <div
        onClick={() => navigate("/")}
        className="pb-6 cursor-pointer w-[2rem]"
      >
        返回
      </div>
      <div>只有操作员能进入</div>
    </div>
  );
};
