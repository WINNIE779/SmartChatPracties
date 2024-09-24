export enum IResultType {
  Identify,
  Check,
  Request,
  Question,
}

export interface IUploadList {
  id: number;
  url: string;
  type: string;
}
