import { IRole } from "@/services/api/conversation/dto";

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

export const isPermissionRevoked = (error: string) =>
  error.includes(
    "Exception of type 'SmartTalk.Core.Middlewares.Authorization.ForbiddenAccessException' was thrown."
  )
    ? true
    : false;

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
