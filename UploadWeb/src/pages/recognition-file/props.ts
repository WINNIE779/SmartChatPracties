import {
  IDentifyFileDetectStatus,
  IFileType,
  ISearchParams,
} from "@/services/dtos/public";

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
  originalResponse: string | null; // 識別失敗原因 message
}
