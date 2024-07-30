import { api } from "../http-client";
import { IntentsDto, IntentsParams } from "../../dtos/intents";

export const GetSkillIntentsApi = async (data: IntentsParams) => {
  const response = await api.get<IntentsDto>("/api/SmartChat/intents", {
    params: data,
  });

  return response.data;
};
