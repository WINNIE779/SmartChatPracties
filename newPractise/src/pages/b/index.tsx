import React from "react";
import { useNavigate } from "react-router";

export const BPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div
        onClick={() => navigate("/")}
        className="pb-6 cursor-pointer w-[2rem]"
      >
        返回
      </div>
      <div>只有管理员能进入</div>
    </div>
  );
};
