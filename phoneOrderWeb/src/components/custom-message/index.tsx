import { IRole } from "@/services/api/conversation/dto";
import { isNil } from "ramda";

export const CustomMessage = ({
  text,
  bgColor,
}: {
  text: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[1rem] px-6 py-4 rounded-lg z-50 ${bgColor}`}
    >
      {text}
    </div>
  );
};

//角色权限
export const getRolePermission = (roles: IRole[]) => {
  if (roles.length === 0) return null;

  if (roles.some((item) => item.name === "SuperAdministrator")) {
    return "SuperAdministrator";
  }

  if (roles.some((item) => item.name === "Administrator")) {
    return "Administrator";
  }

  return "User";
};

export const isCanExecute = (
  type: "edit" | "delete" | "copy",
  currentRole: "SuperAdministrator" | "Administrator" | "User" | null,
  recordRole: "SuperAdministrator" | "Administrator" | "User" | null,
  isSame: boolean // 判断是否为同个账号
) => {
  if (isNil(currentRole)) return false;

  switch (type) {
    //修改限制
    case "edit":
      if (currentRole === "SuperAdministrator") {
        if (recordRole === "SuperAdministrator") {
          return false;
        }

        return !isSame;
      }

      return false;

    //删除限制
    case "delete":
      if (currentRole === "SuperAdministrator") {
        if (recordRole === "SuperAdministrator") {
          return false;
        }

        return !isSame;
      } else {
        if (recordRole === "User") {
          return true;
        }

        return false;
      }

    //复制限制
    case "copy":
      if (currentRole === "SuperAdministrator") {
        return true;
      } else {
        if (recordRole === "User" || isSame) {
          return true;
        }

        return false;
      }
  }
};

export const isPermissionRevoked = (error: string) => {
  if (
    error.includes(
      "Exception of type 'SmartTalk.Core.Middlewares.Authorization.ForbiddenAccessException' was thrown."
    )
  ) {
    return true;
  } else return false;
};
