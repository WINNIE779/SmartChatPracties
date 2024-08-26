import React from "react";

import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Select,
  Table,
  TableProps,
  Tooltip,
} from "antd";

import { useAction } from "./hook";
import { IKnowListProps, IKnowOptionsProps, skillTypeOption } from "./prop";
import { AddMaterialIcon, AddSucessIcon } from "../../icon/skill-add";

const tableColumns: TableProps<IKnowListProps>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    filters: [],
  },
  {
    title: "知識集名稱",
    dataIndex: "name",
    filters: [],
  },
  {
    title: "知識集描述",
    dataIndex: "describe",
    filters: [],
    render: (category) => {
      return (
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
          {category}
        </div>
      );
    },
  },
];

export const AddSkillPage = () => {
  const {
    addMaterial,
    searchValue,
    checkedItems,
    knowOptions,
    paginationData,
    showAddPop,
    skillData,
    filteredTableList,
    handleSearchChange,
    onTraning,
    setSkillData,
    setShowAddpop,
    navigate,
    setPaginationData,
    setCheckedItems,
    onImport,
    setTraningKnowList,
    setAddMaterial,
  } = useAction();

  return (
    <div className="h-[100vh] overflow-hidden text-[0.875rem]">
      <div className="p-4 bg-[#5cb1d3] pb-0">
        <div className="text-[#323444] pt-1 pl-6 font-bold pb-6 text-[1.13rem]">
          <ArrowLeftOutlined className="mx-2" />
          <span>新增技能</span>
        </div>
        <div className="mx-5 bg-[#ffffff] rounded-lg py-8 pr-6 pl-20 h-[80vh] overflow-auto">
          <div className="flex space-x-3 my-4 mb-6">
            <span className="py-1 text-sm min-w-[4rem]">
              <span className="text-[#F04E4E]">*</span>技能名稱
            </span>
            <Input
              className="w-[17.5rem] h-[2.5rem]"
              placeholder="請輸入"
              value={skillData.name}
              onChange={(e) => {
                setSkillData({ ...skillData, name: e.target.value });
              }}
            />
          </div>

          <div className="flex space-x-3 my-4 mb-6">
            <span className="py-1 text-sm min-w-[4rem]">
              <span className="text-[#F04E4E]">*</span>技能類型
            </span>
            <Select
              className="w-[17.5rem] h-[2.5rem]"
              placeholder="請選擇"
              allowClear
              options={skillTypeOption}
              value={skillData.type}
              onChange={(e) => {
                setSkillData({ ...skillData, type: e });
              }}
            />
          </div>

          <div className="flex space-x-3 my-4 mb-6">
            <span className="py-1 text-sm min-w-[4rem]">
              <span className="text-[#F04E4E]">*</span>訓練素材
            </span>
            <div className="flex flex-col">
              {skillData.traningValue.length > 0 && (
                <Table
                  className="mb-2 w-[50vw] traningTable"
                  scroll={{ y: 320 }}
                  rowKey={(record) => record.id}
                  columns={tableColumns}
                  dataSource={skillData.traningValue}
                />
              )}

              <div
                className="flex justify-center items-center border-dashed border-[#E7E8EE] border-[0.06rem] py-1 rounded-sm  min-w-[40vw] cursor-pointer mb-40"
                onClick={() => setAddMaterial(true)}
              >
                <AddMaterialIcon />
                <span className="text-[#9D9FB0] text-[0.75rem] min-w-[4rem]">
                  訓練素材
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full text-center gap-6 flex justify-center h-[6.5rem] items-center bg-[#F8FAFD] z-50">
        <div
          className="w-24 h-11 border border-solid border-[#5B53FF] flex justify-center items-center rounded-lg text-[#5B53FF] select-none mx-4"
          onClick={() => navigate("/skill")}
        >
          取消
        </div>
        <div
          className="w-24 h-11 border border-solid border-[#5B53FF] flex justify-center items-center rounded-lg bg-[#5B53FF] text-[white] select-none"
          onClick={onTraning}
        >
          訓練
        </div>
      </div>

      <Modal
        width={700}
        title={
          <div className="text-[#16103D] text-[1.25rem] font-semibold flex justify-between items-center">
            <span className="text-[#323444] font-bolder">選擇訓練素材</span>
            <CloseOutlined
              onClick={() => {
                setAddMaterial(false);
              }}
              className="text-[#5F6279] text-[1rem]"
            />
          </div>
        }
        closeIcon={null}
        closable={false}
        open={addMaterial}
        onCancel={() => setAddMaterial(false)}
        onOk={onImport}
        okText="導入"
        cancelText="取消"
      >
        <div className="px-[1.25rem] pt-[0.5rem]">
          <div className="flex">
            <div className="text-[#F04E4E] mt-0.5">*</div>選擇知識庫
          </div>
          <div className="flex flex-wrap gap-x-4">
            {knowOptions.map((item: IKnowOptionsProps, index: number) => {
              return (
                <Checkbox
                  checked={checkedItems.includes(item.value)}
                  onChange={(e) => {
                    setCheckedItems(
                      e.target.checked
                        ? [...checkedItems, item.value]
                        : checkedItems.filter(
                            (checkedItem) => checkedItem !== item.value
                          )
                    );
                  }}
                  key={index}
                  className="my-5"
                >
                  {item.label}
                </Checkbox>
              );
            })}
          </div>

          <Input
            className="w-[20rem]"
            placeholder="通過名稱/ID搜索技能"
            value={searchValue}
            onChange={handleSearchChange}
            suffix={
              <Tooltip title="搜索">
                <SearchOutlined />
              </Tooltip>
            }
          />

          <div className="flex flex-1 w-full">
            <Table
              rowSelection={{
                type: "checkbox",
                onChange: (_, selectedRow: IKnowListProps[]) => {
                  setTraningKnowList(selectedRow);
                },
              }}
              className="mt-4"
              scroll={{ y: 400 }}
              rowKey={(record) => record.id}
              columns={tableColumns}
              dataSource={filteredTableList}
              loading={paginationData.loading}
              pagination={{
                position: ["bottomRight"],
                current: paginationData.page,
                pageSize: paginationData.pageSize,
                pageSizeOptions: [5, 10, 20, 50],
                total: paginationData.total,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: (page, pageSize) =>
                  setPaginationData({
                    page: page,
                    pageSize: pageSize,
                  }),
                locale: {
                  jump_to: "跳至",
                  items_per_page: "条/页",
                  page: "页",
                },
                showTotal: (total) => (
                  <div>
                    共<span className="text-[#5B53FF]">{total}</span>條
                  </div>
                ),
              }}
            />
          </div>

          <div>
            找不到想要的知識集 ?
            <span
              className="text-[#5B53FF] font-bold cursor-pointer"
              onClick={() => {
                navigate("/skillAdd");
              }}
            >
              馬上添加
            </span>
          </div>
        </div>
      </Modal>

      <Modal
        className="customModal"
        width={500}
        open={showAddPop}
        centered
        closeIcon={false}
        footer={
          <div className="items-center flex justify-center bg-[#FEFBFE] py-4 rounded-b-md">
            <Button
              type="primary"
              className="h-[2.5rem] mr-[1rem] bg-[#5B53FF]"
              onClick={() => {
                setShowAddpop(false);
                navigate("/skill");
              }}
            >
              我知道了
            </Button>
          </div>
        }
      >
        <div className="bg-[#FAFEFE] px-[3.5rem] py-[1.5rem] rounded-t-md">
          <div className="flex flex-col justify-center items-center text-[#323444]">
            <AddSucessIcon />
            <div className="text-[1.25rem] font-semibold my-4">
              技能添加成功！
            </div>
          </div>
          <div>技能添加成功，開始訓練</div>
        </div>
      </Modal>
    </div>
  );
};
