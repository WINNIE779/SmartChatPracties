import { useEffect, useState } from "react";
import {
  IntentsDto,
  IntentsParams,
  SkillType,
} from "../../services/dtos/intents";

import { useDebounce } from "ahooks";
import { GetSkillIntentsApi } from "../../services/api/intents";
import { message } from "antd";

interface CombinedDto extends IntentsDto, IntentsParams {
  loading: boolean;
}

export const useAction = () => {
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
    searchValue: string
  ) => {
    setSearchText(() => searchValue ?? []);

    setCardIntentDto((prev) => ({
      ...prev,
      page: PageIndex,
      pageSize: PageSize,
      loading: true,
    }));

    GetSkillIntentsApi({
      PageIndex,
      PageSize,
      Keyword: searchValue ?? "",
      CollectionType: type,
    })
      .then((res) => {
        setCardIntentDto((prev) => ({
          ...prev,
          total: res.totalCount,
          result: res.result,
          PageIndex: PageIndex,
          PageSize: PageSize,
        }));
      })
      .catch(() => {
        message.error("獲取失敗");

        setCardIntentDto((prev) => ({
          ...prev,
          totalCount: 0,
          PageIndex: PageIndex,
          PageSize: PageSize,
          result: [],
        }));
      })
      .finally(() => {
        setCardIntentDto((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  useEffect(() => {
    getSkillIntentsCard(
      cardIntentDto.PageIndex,
      cardIntentDto.PageSize,
      cardIntentDto.CollectionType,
      searchValue
    );
  }, [
    cardIntentDto.PageIndex,
    cardIntentDto.PageSize,
    searchValue,
    cardIntentDto.CollectionType,
  ]);

  return {
    searchText,
    searchValue,
    cardIntentDto,
    getSkillIntentsCard,
    setCardIntentDto,
    setSearchText,
  };
};
