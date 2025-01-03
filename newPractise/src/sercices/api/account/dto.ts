export interface IPageDtos {
  pageIndex: number;
  pageSize: number;
  userName: string;
}

export interface IRole {
  id: number;
  createdDate: string;
  modifiedDate: string;
  name: string;
  displayName: string;
  systemSource: SystemSource;
  description: string;
  isSystem: boolean;
}

export interface IGetRole {
  count: number;
  roles: IRole[];
}

export interface IPermission {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  displayName?: string;
  description: string;
  isSystem: boolean;
}

export interface IUserAccount {
  id: number;
  createdOn: string;
  modifiedOn: string;
  uuid: string;
  userName: string;
  isActive: boolean;
  thirdPartyUserId: string;
  issuer: number;
  roles: IRole[];
  permissions: IPermission[];
  userAccountProfile?: IUserAccountProfile;
}

export interface IUserAccountProfile {
  id: number;
  userAccountId: number;
  createdDate: string;
  displayName: string;
  phone: string;
  email: string;
}

export interface IAccount {
  count: number;
  userAccounts: IUserAccount[];
}

export enum SystemSource {
  SmartTalk,
}
