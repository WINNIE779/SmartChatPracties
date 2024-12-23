import { api } from "../http-client";
import { IAccount, IGetRole, IPageDtos, SystemSource } from "./dto";

export const getAccountList = async (data: IPageDtos) => {
  return (
    await api.get<IAccount>(
      `/api/Security/get?PageIndex=${data.pageIndex}&PageSize=${data.pageSize}&UserName=${data.userName}`
    )
  ).data;
};

export const getRoleList = async (data: {
  pageIndex: number;
  pageSize: number;
  keyWord: string;
  systemSource: SystemSource;
}) => {
  return (
    await api.get<IGetRole>(
      `/api/Security/get/role?PageIndex=${data.pageIndex}&PageSize=${data.pageSize}&Keyword=${data.keyWord}&SystemSource=${data.systemSource}`
    )
  ).data;
};

//创建
export const postCreateUser = async (data: {
  userName: string;
  roleId: number;
}) => {
  return (await api.post(`/api/Security/create`, data)).data;
};

//修改角色
export const postUpdateUser = async (data: {
  userId: number;
  oldRoleId: number;
  newRoleId: number;
}) => {
  return (await api.post(`/api/Security/update`, data)).data;
};

//删除账号
export const postDeleteUser = async (data: {
  userId: number;
  roleId: number;
  userName: string;
}) => {
  return (await api.post(`/api/Security/delete`, data)).data;
};
