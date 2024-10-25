import { IDentifyFileDetectStatus } from "@/pages/upload/prop";

export interface GetAttachUrl {
  id: number;
  uuid: string;
  createDate: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  filePath: string;
  fileContent?: string;
  originFileName: string;
}

export enum IFileType {
  Ach, // ACH Debit授權表
  CreditFormSingle, // 信用表單店版
  CreditFormMultiple, // 信用表多店版
  CustomerRegistrationForm, // 客戶登記表
  CustomerShippingDisclaimer, // 送貨免責聲明
  CustomerBankPaymentApplicationForm, // 銀行卡付款申請表
}

export interface RecognizeRequest {
  sectionId: number;
  fileType: IFileType;
  attachmentIds: number[];
}

export interface RecordsDto {
  id: number;
  recognizedJson: string;
  detectionJson: string;
  paramsJson: string;
  originalResponse: string;
  sectionId: number;
  correlationId: string;
  attachmentId: number;
  status: IDentifyFileDetectStatus;
  createdBy: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface RecognizeResponse {
  records: RecordsDto[];
}

export interface ParamsSettingUpdateRequest {
  fileType: IFileType;
  paramsSettingJson: string;
}

export interface ParamsSettingUpdateResponse {
  id: number;
  userId: number;
  paramsJson: string;
  fileType: IFileType;
  createdBy: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface ISearchParams {
  value: string;
  open: boolean;
  description: string;
  jsonObjKeyName: string;
}

export interface AttachmentIds {
  attachmentIds: number[];
}

export interface FeedbackAddRequest {
  feedback: {
    id?: number;
    recognizedRecordId: number;
    sectionId: number;
    question: string;
    feedbackTag: string;
    createdBy?: number;
    createdDate?: string;
    lastModifiedDate?: string;
  };
}

export interface FeedbackAddResponse {
  id: number;
  recognizedRecordId: number;
  sectionId: number;
  question: string;
  feedbackTag: string;
  createdBy: number;
  createdDate: string;
  lastModifiedDate: string;
}
