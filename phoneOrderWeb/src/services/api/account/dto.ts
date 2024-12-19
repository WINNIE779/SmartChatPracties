import { IPermission, IRole, IUserAccount } from "../conversation/dto";

export enum SystemSource {
  SmartTalk,
}

export interface IRolePermission {
  role: IRole;
  permissions: IPermission[];
}

export interface IUserInfo {
  count: number;
  rolePermissionData: IRolePermission[];
  userAccount: IUserAccount[] | null;
}

export interface IPageDtos {
  pageIndex: number;
  pageSize: number;
  userName: string;
}

export interface IAccount {
  count: number;
  userAccounts: IUserAccount[];
}

export interface ICopyUserInfo {
  userId: number;
  userName: string;
  passWord: string;
}

export interface IGetRole {
  count: number;
  roles: IRole[];
}
