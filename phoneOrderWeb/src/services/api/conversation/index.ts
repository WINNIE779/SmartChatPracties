import { api } from "..";
import {
  IRecordItem as IRecordResponse,
  IConversationItem as IConversationResponse,
  IItems as IItemsResponse,
} from "./dto";

export const PostLogin = async (data: {
  userName: string;
  password: string;
}) => {
  return (
    await api.post<string>("/auth/login", {
      ...data,
      verificationType: 0,
    })
  ).data;
};

export const GetRecords = async (restaurant: number) => {
  return (
    await api.get<IRecordResponse[]>(
      `/api/PhoneOrder/records?Restaurant=${restaurant}`
    )
  ).data;
};

export const GetConversations = async (recordId: number) => {
  return (
    await api.get<IConversationResponse[]>(
      `/api/PhoneOrder/conversations?RecordId=${recordId}`
    )
  ).data;
};

export const GetConversationItems = async (recordId: number) => {
  return (
    await api.get<IItemsResponse>(`/api/PhoneOrder/items?RecordId=${recordId}`)
  ).data;
};

export const PostConversationAdd = async (data: {
  conversations: IConversationResponse[];
}) => {
  return (await api.post("/api/PhoneOrder/conversation/add", data)).data;
};

export const PostManualOrder = async (data: {
  orderId: string;
  recordId: number;
  restaurant: number;
}) => {
  return (await api.post("/api/PhoneOrder/manual/order", data)).data;
};
