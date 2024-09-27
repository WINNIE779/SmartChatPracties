import { GetAttachUrl } from "../../dtos/upload";
import { api } from "../http-client";

export const PostUpload = async (data: FormData) => {
  const response = await api.post<GetAttachUrl>("/api/Attachment/upload", data);

  return response.data;
};
