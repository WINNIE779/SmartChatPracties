import React from "react";
import Icon from "@ant-design/icons";
import {
  addSkillIcon,
  SkillKnowIcon,
  SkillQAIcon,
  skillSearchIcon,
  SkillTableIcon,
} from "../icon/skill";

import { Input, Pagination } from "antd";
import { useAction } from "./hook";
import {
  SkillTextType,
  SkillType,
  skillTypeOption,
} from "../../services/dtos/intents";

export const SkilManagement = () => {
  const {
    cardIntentDto,
    getSkillIntentsCard,
    updateGetCardIntents,
    handleClick,
    searchText,
  } = useAction();

  return (
    <div className="bg-[#efeeee] bg-opacity-50 px-4 h-screen overflow-auto overscroll-none md:flex-col">
      <div className="font-semibold px-4 mt-6">技能管理</div>

      <div className="bg-[#ffffff] bg-opacity-80 rounded-2xl flex justify-between my-4 items-center px-6 py-4 min-w-[52rem]">
        <div className="flex justify-center items-center">
          <span className="text-[#323444] min-w-[6rem]">篩選類型：</span>
          {skillTypeOption.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-[5.5rem] border border-solid border-[#E7E8EE] rounded-lg flex items-center justify-center space-x-1 py-1 ml-2 cursor-pointer 
                ${
                  cardIntentDto.CollectionType?.includes(item.value)
                    ? item.value === SkillType.QuestionAndAnswerType
                      ? "bg-[#FEF6EB] text-[#ED940F] border-[#FEF6EB]"
                      : item.value === SkillType.KnowledgeType
                      ? "bg-[#EEEEFF] text-[#5B53FF] border-[#EEEEFF]"
                      : "bg-[#E9FAF1] text-[#3BC659] border-[#E9FAF1]"
                    : ""
                }`}
                onClick={() => {
                  handleClick(item.value);
                }}
              >
                {item.value === SkillType.QuestionAndAnswerType ? (
                  <SkillQAIcon
                    color={`${
                      cardIntentDto.CollectionType.includes(item.value)
                        ? "#ED940F"
                        : "#5F6279"
                    }`}
                  />
                ) : item.value === SkillType.KnowledgeType ? (
                  <SkillKnowIcon
                    color={`${
                      cardIntentDto.CollectionType.includes(item.value)
                        ? "#5B53FF"
                        : "#5F6279"
                    }`}
                  />
                ) : (
                  <SkillTableIcon
                    color={`${
                      cardIntentDto.CollectionType.includes(item.value)
                        ? "#3BC659"
                        : "#5F6279"
                    }`}
                  />
                )}

                <div>{item.label}</div>
              </div>
            );
          })}

          <Input
            className="w-64 ml-6"
            placeholder="通過名稱/ID搜索技能"
            suffix={<Icon component={skillSearchIcon} />}
            value={cardIntentDto.Keyword}
            onChange={(e) => updateGetCardIntents("Keyword", e.target.value)}
          />
        </div>

        <div className="rounded-lg px-0.5 h-[2.9rem] flex justify-center items-center bg-gradient-to-r from-[#23D2FF] via-[#5B53FF] via-[#AA56FF] to-[#FFCE21] cursor-pointer">
          <div className="bg-[#ffffff] text-[#5B53FF] text-[0.88rem] w-[7.25rem] h-[2.75rem] flex items-center justify-center rounded-lg">
            <Icon component={addSkillIcon} className="px-1" />
            新增技能
          </div>
        </div>
      </div>

      <div className="h-[68vh] overflow-auto p-4">
        <div className="grid md:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {cardIntentDto.result
            .filter((cardItem) =>
              cardIntentDto.CollectionType.includes(cardItem.collectionType)
            )
            .map((cardItem, cardIndex) => {
              return (
                <div
                  key={cardIndex}
                  className="bg-[#FFFFFF] rounded-xl p-3 pt-5 border border-solid border-[#E7E8EEFF] h-[8rem] cursor-pointer"
                >
                  <div className="flex justify-between space-x-2 h-8 items-center">
                    <div className="font-semibold text-[1rem] text-[#323444]">
                      {cardItem.name}
                    </div>
                    <div
                      className={`flex justify-center items-center px-2 py-2 ml-1 rounded-[1.25rem] min-w-[5rem] ${
                        cardItem.collectionType ===
                        SkillType.QuestionAndAnswerType
                          ? "bg-[#FEF6EB] text-[#ED940F] border-[#FEF6EB]"
                          : cardItem.collectionType === SkillType.KnowledgeType
                          ? "bg-[#EEEEFF] text-[#5B53FF] border-[#EEEEFF]"
                          : "bg-[#E9FAF1] text-[#3BC659] border-[#E9FAF1]"
                      }`}
                    >
                      <div className="px-1">
                        {cardItem.collectionType ===
                        SkillType.QuestionAndAnswerType ? (
                          <SkillQAIcon color={"#ED940F"} />
                        ) : cardItem.collectionType ===
                          SkillType.KnowledgeType ? (
                          <SkillKnowIcon />
                        ) : (
                          <SkillTableIcon />
                        )}
                      </div>

                      <div className="text-[0.88rem] px-1">
                        {cardItem.collectionType ===
                        SkillType.QuestionAndAnswerType
                          ? SkillTextType[SkillType.QuestionAndAnswerType]
                          : cardItem.collectionType === SkillType.KnowledgeType
                          ? SkillTextType[SkillType.KnowledgeType]
                          : SkillTextType[SkillType.TableType]}
                      </div>
                    </div>
                  </div>

                  <div className="text-[#5F6279] text-[0.88rem] pt-6">
                    技能ID：{cardItem.id}
                  </div>
                  <div className="text-[#5F6279] text-[0.88rem] pt-2">
                    創建時間：{cardItem.createdDate}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex justify-between items-center px-2">
        <span>
          共<span className="text-[#5B53FF]">{cardIntentDto.totalCount}</span>條
        </span>
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={1}
          current={cardIntentDto.PageIndex}
          pageSize={cardIntentDto.PageSize}
          total={cardIntentDto.totalCount}
          className="flex justify-end"
          onChange={(page, pageSize) =>
            getSkillIntentsCard(
              page,
              pageSize,
              cardIntentDto.CollectionType,
              searchText
            )
          }
        />
      </div>
    </div>
  );
};
