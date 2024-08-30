import { api } from "../http-client";
import { IPostLoginType } from "@/services/dtos/login";

export const PostLogin = async (data: IPostLoginType) => {
  const response = await api.post<string>(`/auth/login`, data);

  return response.data;
};
