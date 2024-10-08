import { useEffect, useState } from "react";
import {
  IPagesDto,
  ISearchDto,
  IntentsDto,
  SkillType,
} from "../../services/dtos/intents";

import { useDebounceEffect, useUpdateEffect } from "ahooks";
import { GetSkillIntentsApi } from "../../services/api/intents";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

interface CombinedDto extends IntentsDto, ISearchDto, IPagesDto {}

export const useAction = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>("");

  const [cardIntentDto, setCardIntentDto] = useState<CombinedDto>({
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

  const handleClick = (item: SkillType) => {
    let newClickResult;
    if (cardIntentDto.CollectionType.includes(item)) {
      newClickResult = cardIntentDto.CollectionType.filter(
        (isClickItem) => isClickItem !== item
      );
    } else {
      newClickResult = [...cardIntentDto.CollectionType, item];
    }

    setCardIntentDto((prevState) => ({
      ...prevState,
      CollectionType: newClickResult,
    }));
  };

  useDebounceEffect(
    () => {
      setSearchText(cardIntentDto.Keyword);
    },
    [cardIntentDto.Keyword],
    {
      wait: 1000,
    }
  );

  const updateGetCardIntents = (key: keyof CombinedDto, value: any) => {
    setCardIntentDto((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getSkillIntentsCard = (
    PageIndex: number = cardIntentDto.PageIndex,
    PageSize: number = cardIntentDto.PageSize,
    type: SkillType[],
    searchText: string
  ) => {
    setCardIntentDto((prev) => ({
      ...prev,
    }));

    GetSkillIntentsApi({
      PageIndex,
      PageSize,
      Keyword: searchText ?? "",
      CollectionType: type,
    })
      .then((res) => {
        updateGetCardIntents("totalCount", res.totalCount);
        updateGetCardIntents("result", res.result);
        updateGetCardIntents("PageIndex", PageIndex);
        updateGetCardIntents("PageSize", PageSize);
      })
      .catch(() => {
        message.error("獲取失敗");

        updateGetCardIntents("totalCount", 0);
        updateGetCardIntents("result", []);
        updateGetCardIntents("PageIndex", PageIndex);
        updateGetCardIntents("PageSize", PageSize);
      });
  };

  useEffect(() => {
    getSkillIntentsCard(
      cardIntentDto.PageIndex,
      cardIntentDto.PageSize,
      cardIntentDto.CollectionType,
      cardIntentDto.Keyword
    );
  }, []);

  useUpdateEffect(() => {
    getSkillIntentsCard(
      1,
      cardIntentDto.PageSize,
      cardIntentDto.CollectionType,
      searchText
    );
  }, [cardIntentDto.CollectionType, searchText]);

  return {
    searchText,
    cardIntentDto,
    navigate,
    updateGetCardIntents,
    handleClick,
    getSkillIntentsCard,
    setCardIntentDto,
    setSearchText,
  };
};
