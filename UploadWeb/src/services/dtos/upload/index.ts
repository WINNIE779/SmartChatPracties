import { IDentifyFileDetectStatus, IFileType } from "../public";

export interface RecognizeRequest {
  sectionId?: number;
  fileType: IFileType;
  attachmentIds: number[];
}

export interface RecordsDto {
  id: number;
  recognizedJson: string;
  detectionJson: string;
  paramsJson: string;
  originalResponse: string;
  sectionId?: number;
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

export interface AttachmentIds {
  attachmentIds: number[];
}

export interface FeedbackAddRequest {
  feedback: {
    id?: number;
    recognizedRecordId: number;
    sectionId?: number;
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
  sectionId?: number;
  question: string;
  feedbackTag: string;
  createdBy: number;
  createdDate: string;
  lastModifiedDate: string;
}
