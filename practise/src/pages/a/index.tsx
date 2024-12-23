import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router";

export const A = () => {
  const navigate = useNavigate();

  const handleBacktrack = () => {
    navigate("/");
  };

  return (
    <div className="h-screen p-4 bg-[#bbbfff] flex flex-col">
      <div onClick={handleBacktrack} className="pb-6 cursor-pointer w-[2rem]">
        返回
      </div>
      <div>只有操作员能进入</div>
    </div>
  );
};
