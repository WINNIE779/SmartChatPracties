import { api } from "..";
import {
  IAccount,
  ICopyUserInfo,
  IGetRole,
  IPageDtos,
  IUserInfo,
  SystemSource,
} from "./dto";

//获取list列表
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

//获取当前user
export const getUserInfo = async (SystemSource: SystemSource) => {
  return (
    await api.get<IUserInfo>(
      `/api/Security/mine/roles?SystemSource=${SystemSource}`
    )
  ).data;
};

//获取分页
export const getAccountList = async (data: IPageDtos) => {
  return (
    await api.get<IAccount>(
      `/api/Security/get?PageIndex=${data.pageIndex}&PageSize=${data.pageSize}&UserName=${data.userName}`
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

//复制接口
export const getCopyUser = async (data: { userId: number }) => {
  return (
    await api.get<ICopyUserInfo>(`/api/Security/copy?UserId=${data.userId}`)
  ).data;
};
