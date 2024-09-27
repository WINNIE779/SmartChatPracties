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
