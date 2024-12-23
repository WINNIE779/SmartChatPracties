import { SystemSource } from "../account/dto";
import { api } from "../http-client";
import { IUser } from "./dto";

export const GetUserAcountInfo = async (data: {
  SystemSource: SystemSource;
}) => {
  return (await api.get<IUser>(`/api/Security/mine/roles`, { params: data }))
    .data;
};
