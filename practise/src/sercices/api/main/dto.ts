import { IPermission, IRole, IUserAccount } from "../account/dto";

export interface IUser {
  count: number;
  rolePermissionData: IRolePermission[];
  userAccount: IUserAccount;
}

export interface IRolePermission {
  role: IRole;
  permissions: IPermission[];
}
