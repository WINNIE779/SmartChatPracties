import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IKnowListProps,
  IKnowOptionProps,
  IPagination,
  ISkillDataProps,
  KnowEnum,
  SkillType,
} from "./prop";
import { message } from "antd";

export const useAction = () => {
  const navigate = useNavigate();

  const tableList: IKnowListProps[] = [
    {
      id: 234111,
      name: "採購新鮮蝦需要了解的知識",
      describe: "蝦類知識",
    },
    {
      id: 232222,
      name: "海鮮選購知識",
      describe: "海鮮選購知識",
    },
    {
      id: 233333,
      name: "採購部部門守則",
      describe: "部門知識",
    },
    {
      id: 235555,
      name: "如何採購豬類",
      describe: "豬類選購知識",
    },
    {
      id: 236666,
      name: "如何采購牛類",
      describe: "牛類選購知識",
    },
    {
      id: 232236,
      name: "如何采購羊類",
      describe: "羊類選購知識",
    },
    {
      id: 234117,
      name: "海鮮選購知識",
      describe: "海鮮選購知識",
    },
    {
      id: 2388888,
      name: "採購部部門守則",
      describe: "部門知識",
    },
  ];

  const knowOptions: IKnowOptionProps[] = [
    { label: "通用知識庫", value: KnowEnum.Universal },
    { label: "專有知識庫", value: KnowEnum.Alone },
  ];

  const [addMaterial, setAddMaterial] = useState<boolean>(false);

  const [showAddPop, setShowAddpop] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const [checkedItems, setCheckedItems] = useState<KnowEnum[]>([]);

  const [knowListData, setKnowListData] = useState<IKnowListProps[]>(tableList);

  const [traningKnowList, setTraningKnowList] = useState<IKnowListProps[]>([]);

  const [paginationData, setPaginationData] = useState<IPagination>({
    page: 1,
    pageSize: 20,
    total: 0,
    loading: false,
  });

  const [skillData, setSkillData] = useState<ISkillDataProps>({
    name: "",
    type: SkillType.QAType,
    traningValue: [],
  });

  const [filteredTableList, setFilteredTableList] =
    useState<IKnowListProps[]>(tableList);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const filtered = tableList.filter(
      (item) => item.name.includes(value) || item.describe.includes(value)
    );
    setFilteredTableList(filtered);

    setPaginationData({
      ...paginationData,
      total: filtered.length,
    });
  };

  const onImport = () => {
    if (checkedItems.length === 0) {
      message.error("請選擇知識庫");

      return;
    }

    setAddMaterial(false);

    setSkillData({
      ...skillData,
      traningValue: traningKnowList,
    });
  };

  const onTraning = () => {
    if (
      !skillData.name ||
      (!skillData.type && skillData.type !== SkillType.QAType) ||
      skillData.traningValue.length === 0
    ) {
      message.error("請填寫完整以下信息");

      return;
    }

    setShowAddpop(true);
  };

  return {
    addMaterial,
    traningKnowList,
    searchValue,
    tableList,
    knowListData,
    checkedItems,
    knowOptions,
    paginationData,
    showAddPop,
    skillData,
    filteredTableList,
    handleSearchChange,
    setFilteredTableList,
    onTraning,
    setSkillData,
    setShowAddpop,
    navigate,
    setPaginationData,
    setCheckedItems,
    setKnowListData,
    setSearchValue,
    onImport,
    setTraningKnowList,
    setAddMaterial,
  };
};
