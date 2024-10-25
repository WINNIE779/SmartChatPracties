import { IFileType, ISearchParams } from "@/services/dtos/upload";

// export enum IResultType {
//   Identify,
//   Check,
//   Request,
//   Question,
// }

// export interface IUploadList {
//   id: number;
//   url: string;
//   type: string;
// }

export enum IDentifyFileDetectStatus {
  Pending,
  Processing,
  Success,
  Failed,
}

export enum DepartNameEnum {
  Rmc = 1,
  Osc = 2,
  Hrc = 3,
}

export const Department = {
  [DepartNameEnum.Rmc]: "RMC",
  [DepartNameEnum.Osc]: "OSC",
  [DepartNameEnum.Hrc]: "HRC",
};

export const Document = {
  [IFileType.Ach]: "ACH Debit授權表",
  [IFileType.CustomerRegistrationForm]: "客戶登記表",
  [IFileType.CustomerShippingDisclaimer]: "送貨免責聲明",
  [IFileType.CreditFormSingle]: "信用表單店版",
  [IFileType.CreditFormMultiple]: "信用表多店版",
  [IFileType.CustomerBankPaymentApplicationForm]: "銀行卡付款申請表",
};

export interface IRecognitionFileComponentProps {
  isCheck: boolean; // 是否查看 前台 false 后台 true
  requestParams: ISearchParams[]; // 请求参数
  recognizedJson: string | null; // 识别 json
  detectionJson: string | null; // 核对 json
  updateRequestParams?: (key: string, value: boolean) => void; // 更新文件请求参数 前台必传
  question?: string | null; // 问题描述 可空 前台必传
  feedbackTag?: string | null; // 问题类型 可空 前台必传
  recognizedRecordld?: number; // 添加反馈需要 前台必传
  sectionld?: number; // 添加反馈需要 前台必传
  fileIDentifyFileDetectStatus: IDentifyFileDetectStatus | null; // 文件识别状态 根据这个识别状态去控制是否允许请求参数的勾选
  fileType?: IFileType | null; // 文件類型 前台必傳
}

export enum IFunEvent {
  Identify, // 0
  Check, // 1
  Request, // 2
  Question, // 3
}
