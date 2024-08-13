import { SetStateAction, useEffect, useState } from "react";
import {
  IPagesDto,
  ISearchDto,
  IntentsDto,
  IntentsParams,
  SkillType,
  skillTypeOption,
} from "../../services/dtos/intents";

import { useDebounce, useDebounceFn, useUpdateEffect } from "ahooks";
import { GetSkillIntentsApi } from "../../services/api/intents";
import { message } from "antd";

interface CombinedDto extends IntentsDto, ISearchDto, IPagesDto {
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

  const [clickResult, setClickResult] = useState<SkillType[]>([
    SkillType.QuestionAndAnswerType,
    if (clickResult.includes(item)) {
      newClickResult = clickResult.filter(
        (isClickItem) => isClickItem !== item
      );
    } else {
      newClickResult = [...clickResult, item];
    }

    setClickResult(newClickResult);

    setCardIntentDto((prevState) => ({
      ...prevState,
      CollectionType: newClickResult,
    }));
  };

  useEffect(() => {}, [cardIntentDto]);

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
          totalCount: res.totalCount,
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
  }, []);

  useUpdateEffect(() => {
    getSkillIntentsCard(
      cardIntentDto.PageIndex,
      cardIntentDto.PageSize,
      cardIntentDto.CollectionType,
      searchValue
    );
  }, [searchValue, cardIntentDto.CollectionType]);

  return {
    searchText,
    searchValue,
    cardIntentDto,
    filteredResults,
    clickResult,
    handleClick,
    setClickResult,
    setFilteredResults,
    getSkillIntentsCard,
    setCardIntentDto,
    setSearchText,
  };
};
