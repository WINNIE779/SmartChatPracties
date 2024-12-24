import { api } from "../http-client";

export interface IUser {
  userName: string;
  password: string;
}

export const PostLogin = async (data: IUser) => {
  const response = await api.post<string>(`/auth/login`, data);

  return response.data;
};
