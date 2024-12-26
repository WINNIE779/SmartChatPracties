import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";

export const Main = () => {
  const navigate = useNavigate();

  const { userInfo, userRoles } = useAuth();

  return (
    <div className="h-screen p-4 flex flex-col">
      <div className="p-2 flex justify-center items-center">我的页面</div>
      <div
        onClick={() => navigate("/")}
        className="pb-6 cursor-pointer w-[2rem]"
      >
        返回
      </div>
      <div className="flex justify-center items-center flex-col">
        我的信息
        <div>{userInfo.userAccount?.userName}</div>
      </div>
      <div className="flex flex-col justify-center items-center p-6">
        角色
        <div>{userRoles}</div>
      </div>
      {/* <div className="flex flex-col justify-center items-center p-6">
        角色权限
        {userInfo.permission.map((permissionItem, index) => (
          <div key={index}>{permissionItem}</div>
        ))}
      </div> */}
    </div>
  );
};
