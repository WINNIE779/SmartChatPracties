import { useEffect, useState } from "react";
import {
  ISkillCardStatus,
  IntentsDto,
  IntentsResultProps,
  SkillType,
} from "../../services/dtos/intents";

import { useDebounce } from "ahooks";
import { GetSkillIntentsApi } from "../../services/api/intents";
import { message } from "antd";

export interface CombinedDto {
  Keyword: string;
  CollectionType: SkillType[];
  result: IntentsResultProps[];
  totalCount: number;
  PageSize: number;
  PageIndex: number;
  loading: boolean;
}

export const useAction = () => {
  const [cardStatus, setCardStatus] = useState<ISkillCardStatus>();

  const [searchText, setSearchText] = useState<string>("");

  const [cardIntentDto, setCardIntentDto] = useState<CombinedDto>({
    loading: false,
    PageIndex: 1,
    PageSize: 18,
    Keyword: "",
    result: [],
    totalCount: 0,
    CollectionType: [
      SkillType.QuestionAndAnswerType,
      SkillType.KnowledgeType,
      SkillType.TableType,
    ],
  });

  const searchValue = useDebounce(searchText, { wait: 500 });

  const getSkillIntentsCard = (
    PageIndex: number = cardIntentDto.PageIndex,
    PageSize: number = cardIntentDto.PageSize,
    type: SkillType[],
    searchText: string
  ) => {
    setCardIntentDto((prev) => ({
      ...prev,
      page: PageIndex,
      pageSize: PageSize,
      loading: true,
    }));

    GetSkillIntentsApi({
      PageIndex,
      PageSize,
      Keyword: searchText ?? "",
      CollectionType: type,
    })
      .then((res) => {
        setCardIntentDto((prev) => ({
          ...prev,
          total: res.totalCount,
          type: res.collectionType,
          result: res.result,
        }));
      })
      .catch(() => {
        message.error("獲取失敗");
      })
      .finally(() => {
        setCardIntentDto((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  useEffect(() => {
    if (cardIntentDto.result.length >= 0) {
      console.log("获取成功", cardIntentDto.result);
    }
  }, [cardIntentDto.result]);

  return {
    cardStatus,
    searchText,
    searchValue,
    cardIntentDto,
    getSkillIntentsCard,
    setCardIntentDto,
    setSearchText,
    setCardStatus,
  };
};
