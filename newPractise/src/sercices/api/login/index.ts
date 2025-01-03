import { SystemSource } from "../account/dto";
import { api } from "../http-client";
import { IUser } from "./dtos";

export const PostLogin = async (data: {
  userName: string;
  password: string;
}) => {
  const response = await api.post<string>(`/auth/login`, data);

  return response.data;
};

export const GetUserAcountInfo = async (data: {
  SystemSource: SystemSource;
}) => {
  return (await api.get<IUser>(`/api/Security/mine/roles`, { params: data }))
    .data;
};
