import { api } from "..";
import {
  IAccount,
  ICopyUserInfo,
  IPageDtos,
  IUserInfo,
  SystemSource,
} from "./dto";

export const getUserInfo = async (SystemSource: SystemSource) => {
  return (
    await api.get<IUserInfo>(
      `/api/Security/mine/roles?SystemSource=${SystemSource}`
    )
  ).data;
};

export const getAccountList = async (data: IPageDtos) => {
  return (
    await api.get<IAccount>(
      `/api/Security/get?PageIndex=${data.pageIndex}&PageSize=${data.pageSize}&UserName=${data.userName}`
    )
  ).data;
};

export const postCreateUser = async (data: {
  userName: string;
  roleId: number;
}) => {
  return (await api.post(`/api/Security/create`, data)).data;
};

export const postUpdateUser = async (data: {
  userId: number;
  oldRoleId: number;
  newRoleId: number;
}) => {
  return (await api.post(`/api/Security/update`, data)).data;
};

export const postDeleteUser = async (data: {
  userId: number;
  roleId: number;
  userName: string;
}) => {
  return (await api.post(`/api/Security/delete`, data)).data;
};

export const getCopyUser = async (data: { userId: number }) => {
  return (
    await api.get<ICopyUserInfo>(`/api/Security/copy?UserId=${data.userId}`)
  ).data;
};

export const getRoleList = async (data: {
  pageIndex: number;
  pageSize: number;
  keyWord: string;
  systemSource: SystemSource;
}) => {
  return (
    await api.get(
      `/api/Security/get/role?PageIndex=${data.pageIndex}&PageSize=${data.pageSize}&Keyword=${data.keyWord}&SystemSource=${data.systemSource}`
    )
  ).data;
};
