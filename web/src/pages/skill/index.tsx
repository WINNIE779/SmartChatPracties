import React, { useEffect } from "react";
import Icon from "@ant-design/icons";
import {
  addSkillIcon,
  skillKnowIcon,
  skillQAIcon,
  skillSearchIcon,
  skillTableIcon,
} from "../icon/skill";

import { Input, Pagination } from "antd";
import { useAction } from "./hook";
import { SkillType, skillTypeOption } from "../../services/dtos/intents";

export const SkilManagement = () => {
  const {
    cardStatus,
    searchText,
    cardIntentDto,
    getSkillIntentsCard,
    setSearchText,
  } = useAction();

  console.log(cardIntentDto.result);

  console.log();

  useEffect(() => {
    getSkillIntentsCard;
  }, []);

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
                className={`flex justify-center items-center rounded-lg w-[5.88rem] h-[2.31rem] text-[0.88rem] mx-1  ${
                  cardIntentDto.CollectionType?.includes(item.value) &&
                  (item.value === SkillType.QuestionAndAnswerType
                    ? "bg-[#FEF6EB] text-[#ED940F] border-[#FEF6EB]"
                    : item.value === SkillType.KnowledgeType
                    ? "bg-[#EEEEFF] text-[#5B53FF] border-[#EEEEFF]"
                    : "bg-[#E9FAF1] text-[#3BC659] border-[#E9FAF1]")
                }`}
              >
                <div className="mr-1">
                  {item.value === SkillType.QuestionAndAnswerType ? (
                    <Icon component={skillQAIcon} />
                  ) : item.value === SkillType.KnowledgeType ? (
                    <Icon component={skillKnowIcon} />
                  ) : (
                    <Icon component={skillTableIcon} />
                  )}
                </div>
                <div>{item.label}</div>
              </div>
            );
          })}

          <Input
            className="w-64 ml-6"
            placeholder="通過名稱/ID搜索技能"
            suffix={<Icon component={skillSearchIcon} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="rounded-lg px-0.5 h-[2.9rem] flex justify-center items-center bg-gradient-to-r from-[#23D2FF] via-[#5B53FF] via-[#AA56FF] to-[#FFCE21] cursor-pointer">
          <div className="bg-[#ffffff] text-[#5B53FF] text-[0.88rem] w-[7.25rem] h-[2.75rem] flex items-center justify-center rounded-lg">
            <Icon component={addSkillIcon} className="px-1" />
            新增技能
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[40rem] overflow-auto overscroll-none min-w-[54rem]">
        {cardIntentDto.result.map((cardItem, cardIndex) => {
          return (
            <div
              key={cardIndex}
              className="rounded-2xl h-[10.63rem] px-4 m-2 border-solid border-[#E7E8EE] border-[0.06rem] bg-[#ffffff] min-w-[12rem]"
            >
              <div className="flex justify-between items-center my-3">
                <div className="font-semibold text-[1rem] text-[#323444]">
                  {cardItem.name}
                </div>
                <div
                  className={`flex justify-center items-center px-2 py-2 rounded-[1.25rem] ${
                    cardItem.collectionType === SkillType.QuestionAndAnswerType
                      ? "bg-[#FEF6EB] text-[#ED940F] border-[#FEF6EB]"
                      : cardItem.collectionType === SkillType.KnowledgeType
                      ? "bg-[#EEEEFF] text-[#5B53FF] border-[#EEEEFF]"
                      : "bg-[#E9FAF1] text-[#3BC659] border-[#E9FAF1]"
                  }`}
                >
                  <div className="px-1">
                    {cardItem.collectionType ===
                    SkillType.QuestionAndAnswerType ? (
                      <Icon component={skillQAIcon} />
                    ) : cardItem.collectionType === SkillType.KnowledgeType ? (
                      <Icon component={skillKnowIcon} />
                    ) : (
                      <Icon component={skillTableIcon} />
                    )}
                  </div>
                  <div className="text-[0.88rem] px-1">
                    {cardItem.collectionType}
                  </div>
                </div>
              </div>
              <div className="text-[#5F6279] text-[0.88rem] my-3">
                技能ID：{cardItem.id}
              </div>
              <div className="text-[#5F6279] text-[0.88rem]">
                創建時間：{cardItem.createdDate}
              </div>
              {/* {skillCardStatus.map((statusItem, statusIndex) => {
                <div
                  className={`flex justify-center items-center w-[4.13rem] rounded-[1.25rem] h-[2rem] text-[0.88rem] my-3 ${
                    statusItem.value === ISkillCardStatus.InTraining
                      ? "text-[#ED940F] bg-[#FEF6EB]"
                      : statusItem.value === ISkillCardStatus.Completed
                      ? "text-[#3BC659] bg-[#E9FAF1]"
                      : statusItem.value === ISkillCardStatus.Pending
                      ? "text-[#50879e] bg-[#57acbb]"
                      : statusItem.value === ISkillCardStatus.Failed
                      ? "text-[#ed5855] bg-[#efa9a9]"
                      : ""
                  }`}
                >
                  {cardItem.status}
                </div>;
              })} */}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center px-2 my-4">
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
          onChange={(page, pageSize) => getSkillIntentsCard(page, pageSize)}
        />
      </div>
    </div>
  );
};
