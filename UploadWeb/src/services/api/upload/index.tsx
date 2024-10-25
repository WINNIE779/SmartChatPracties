import {
  AttachmentIds,
  FeedbackAddRequest,
  FeedbackAddResponse,
  GetAttachUrl,
  ParamsSettingUpdateRequest,
  ParamsSettingUpdateResponse,
  RecognizeRequest,
  RecognizeResponse,
  RecordsDto,
} from "@/services/dtos/upload";
import { api } from "../http-client";

export const PostUpload = async (data: FormData) => {
  const response = await api.post<GetAttachUrl>("/api/Attachment/upload", data);

  return response.data;
};

export const PostRecognize = async (data: RecognizeRequest) => {
  const response = await api.post<RecognizeResponse>(
    "/api/IdentifyFile/recognize",
    data
  );

  return response.data;
};

export const GetRecordsList = async (RecognizedRecordIds: number[]) => {
  const params = RecognizedRecordIds.map(
    (id) => `RecognizedRecordIds=${id}`
  ).join("&");
  const response = await api.get<RecordsDto[]>(
    `/api/IdentifyFile/recognize/records?${params}`
  );

  return response.data;
};

export const PostAttachment = async (data: AttachmentIds) => {
  const response = await api.post<GetAttachUrl[]>(
    "/api/Attachment/attachments",
    data
  );
  return response.data;
};

export const PostFeedbackAdd = async (data: FeedbackAddRequest) => {
  const response = await api.post<FeedbackAddResponse>(
    "/api/IdentifyFile/feedback/add",
    data
  );
  return response.data;
};

export const PostParamsSettingUpdate = async (
  data: ParamsSettingUpdateRequest
) => {
  const response = await api.post<ParamsSettingUpdateResponse>(
    "/api/IdentifyFile/params/setting/update",
    data
  );
  return response.data;
};

export const GetParamsSetting = async (FileType: number) => {
  const response = await api.get<ParamsSettingUpdateResponse>(
    `/api/IdentifyFile/params/setting?FileType=${FileType}`
  );

  return response.data;
};
