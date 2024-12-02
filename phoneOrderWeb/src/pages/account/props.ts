export interface IAccountDataProps {
  key: string;
  accountName: string;
  role: RoleEnum;
  creatTime: string;
  creator: string;
}

export enum RoleEnum {
  Operator, // 操作员
  Admin, // 管理员
  SuperAdmin, // 超级管理员
}

export const RoleMap = {
  [RoleEnum.Operator]: "操作员",
  [RoleEnum.Admin]: "管理员",
  [RoleEnum.SuperAdmin]: "超级管理员",
};

export interface IPaginationProps {
  pageIndex: number;
  pageSize: number;
  keyWord: string;
}

export enum ModalTypeEnum {
  Create,
  Modify,
}
