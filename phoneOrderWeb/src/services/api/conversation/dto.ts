import enumArray from "enum-array";

export interface IRecordItem {
  id: number;
  sessionId: string;
  restaurant: number;
  tips: string;
  transcriptionText: string;
  url: string;
  createdDate: string;
  lastModifiedBy: number;
  userAccount: IUserAccount;
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
  userAccountProfile: IUserAccountProfile;
}

export interface IUserAccountProfile {
  id: number;
  userAccountId: number;
  createdDate: string;
  displayName: string;
  phone: string;
  email: string;
}

export interface IPermission {
  id: number;
  createdDate: string;
  lastModifiedDate: string;
  name: string;
  displayName: string;
  description: string;
  isSystem: boolean;
}

export interface IRole {
  id: number;
  createdDate: string;
  modifiedDate: string;
  name: string;
  displayName: string;
  systemSource: number;
  description: string;
  isSystem: boolean;
}

export interface IConversationItem {
  id?: number;
  recordId: number;
  question: string;
  answer: string;
  order: number;
  createdDate?: string;
  isEdit?: boolean; // 用來顯示UI
  operate?: Operate;
}

export interface IItems {
  manualItems: IItem[];
  aiItems: IItem[];
  manualOrderId: string | null;
}

export interface IItem {
  id: number;
  recordId: number;
  food_name: string;
  quantity: number;
  price: number;
  note: string;
  orderType: PhoneOrderOrderType;
  createdDate: string;
}

export enum Operate {
  Add,
  Edit,
}

export enum PhoneOrderOrderType {
  AIOrder,
  ManualOrder,
}

// export interface IDetailConversationItem {
//   answer: string;
//   createDate: string;
//   id: number;
//   question: string;
//   sessionId: string;
//   isEdit?: boolean; // 用來顯示UI
//   // isEditSuccess?: boolean; // 用來接口判斷是否需要新增
//   operate?: Operate;
// }

// export interface IShoppingCartItem {
//   foodName: string;
//   id: number;
//   note: string;
//   price: number;
//   quantity: number;
//   sessionId: string;
// }

export enum PhoneOrderRestaurant {
  "福满楼" = 0,
  "江南春" = 1,
  "湘谭人家" = 2,
}

export const phoneOrderRestaurantLabel = () => {
  return enumArray.getEnumArray(PhoneOrderRestaurant);
};
