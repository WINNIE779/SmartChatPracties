import React from "react";
import Icon from "@ant-design/icons";
import {
  addSkillIcon,
  skillKnowIcon,
  skillQAIcon,
  skillSearchIcon,
  skillTableIcon,
} from "../icon/skill";

import { Pagination } from "antd";
import { useAction } from "./hook";

export const SkilManagement = () => {
  const { skillCard, onChange } = useAction();

  const typeSelect = [
    {
      type: "問答類",
      icon: <Icon component={skillQAIcon} />,
      color: "text-[#ED940F]",
      bgColor: "bg-[#FEF6EB]",
    },
    {
      type: "知識類",
      icon: <Icon component={skillKnowIcon} />,
      color: "text-[#5B53FF]",
      bgColor: "bg-[#EEEEFF]",
    },
    {
      type: "表格類",
      icon: <Icon component={skillTableIcon} />,
      color: "text-[#3BC659]",
      bgColor: "bg-[#E9FAF1]",
    },
  ];

  const findCardType = (type) => {
    return typeSelect.find((item) => item.type === type);
  };

  return (
    <div className="bg-[#efeeee] bg-opacity-50 px-4 h-screen overflow-auto overscroll-none md:flex-col">
      <div className="font-semibold px-4 mt-6">技能管理</div>

      <div className="bg-[#ffffff] bg-opacity-80 rounded-2xl flex justify-between my-4 items-center px-6 py-4 min-w-[52rem]">
        <div className="flex justify-center items-center">
          <span className="text-[#323444] min-w-[6rem]">篩選類型：</span>
          {typeSelect.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex justify-center items-center rounded-lg w-[5.88rem] h-[2.31rem] text-[0.88rem] mx-1 ${item.bgColor}`}
              >
                <div>{item.icon}</div>
                <div className={`mx-1 ${item.color}`}>{item.type}</div>
              </div>
            );
          })}
          <div className="rounded-lg border-[0.06rem] border-solid border-[#E7E8EE] w-[17.5rem] h-[2.5rem] flex items-center px-2 mx-4 justify-between text-[#9D9FB0] text-[0.88rem]">
            通過名稱/ID搜索技能
            <Icon component={skillSearchIcon} />
          </div>
        </div>
        <div className="rounded-lg px-0.5 h-[2.9rem] flex justify-center items-center bg-gradient-to-r from-[#23D2FF] via-[#5B53FF] via-[#AA56FF] to-[#FFCE21] cursor-pointer">
          <div className="bg-[#ffffff] text-[#5B53FF] text-[0.88rem] w-[7.25rem] h-[2.75rem] flex items-center justify-center rounded-lg">
            <Icon component={addSkillIcon} className="px-1" />
            新增技能
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[40rem] overflow-auto overscroll-none min-w-[54rem]">
        {skillCard.map((cardItem, cardIndex) => {
          const typeInfo = findCardType(cardItem.type);
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
                  className={`flex justify-center items-center px-2 py-2 rounded-[1.25rem] ${typeInfo?.bgColor} ${typeInfo?.color}`}
                >
                  <div className="px-1"> {typeInfo?.icon}</div>
                  <div className="text-[0.88rem] px-1"> {cardItem.type}</div>
                </div>
              </div>
              <div className="text-[#5F6279] text-[0.88rem] my-3">
                技能ID：{cardItem.skillID}
              </div>
              <div className="text-[#5F6279] text-[0.88rem]">
                創建時間：{cardItem.createTime}
              </div>
              <div
                className={`flex justify-center items-center w-[4.13rem] rounded-[1.25rem] h-[2rem] text-[0.88rem] my-3 ${
                  cardItem.state === "訓練中"
                    ? "text-[#ED940F] bg-[#FEF6EB]"
                    : "text-[#3BC659] bg-[#E9FAF1]"
                }`}
              >
                {cardItem.state}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center px-2 my-4">
        <span>
          共<span className="text-[#5B53FF]">200</span>條
        </span>
        <Pagination
          showQuickJumper
          showSizeChanger
          defaultCurrent={1}
          total={200}
          className="flex justify-end"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
