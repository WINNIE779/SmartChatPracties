import { LeftOutlined } from "@ant-design/icons";
import { Button, Table, Form, Radio, Input } from "antd";
import Search from "antd/es/input/Search";
import Modal from "antd/es/modal/Modal";
import type { ColumnsType } from "antd/es/table";
import { useAction } from "./hook";
import { IAccountDataProps, ModalTypeEnum, RoleEnum, RoleMap } from "./props";
import { CustomMessage } from "@/components/custom-message";

export const AccountList = () => {
  const {
    form,
    openDeletePopups,
    messageText,
    dataSource,
    paginationDtos,
    openModal,
    modalType,
    height,
    handleModalOk,
    handleCopy,
    handleReturn,
    canDelete,
    canModifyRole,
    handleDeleteAccount,
    handleOpenDeleteOk,
    handleModifyRole,
    handleCancel,
    handleCreateAccount,
  } = useAction();

  const columns: ColumnsType<IAccountDataProps> = [
    {
      title: "賬號名稱",
      dataIndex: "accountName",
      key: "accountName",
      width: 150,
      align: "center",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      width: 200,
      align: "center",
      render: (role: RoleEnum) => RoleMap[role],
    },
    {
      title: "創建時間",
      dataIndex: "creatTime",
      key: "creatTime",
      width: 200,
      align: "center",
    },
    {
      title: "創建人",
      dataIndex: "creator",
      key: "creator",
      width: 200,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      width: 200,
      align: "center",
      render: (_, record) => (
        <div className="flex justify-evenly flex-wrap">
          <Button
            onClick={() => handleOpenDeleteOk(record)}
            disabled={canDelete(record)}
          >
            刪除賬號
          </Button>

          <Button
            onClick={() => handleModifyRole(record)}
            disabled={canModifyRole(record)}
          >
            修改角色
          </Button>

          <Button onClick={() => handleCopy(record.accountName, record.key)}>
            複製信息
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 h-screen">
      <div
        className="flex items-center w-[3.4rem] cursor-pointer"
        onClick={handleReturn}
      >
        <LeftOutlined style={{ fontSize: "1.25rem" }} />
        返回
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center p-6">
          <div className="pr-3">账号管理列表</div>
          <Search placeholder="搜索" style={{ width: "12.5rem" }} />
        </div>

        <Button onClick={() => handleCreateAccount()}>创建账号</Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: height }}
        pagination={{
          total: dataSource.length,
          pageSize: paginationDtos.pageSize,
          defaultCurrent: paginationDtos.pageIndex,
          showQuickJumper: true,
          showSizeChanger: true,
          className: "flex fixed bottom-20 right-6",
          onChange: (pageIndex, pageSize) => {
            console.log(pageIndex, pageSize);
          },
        }}
      />

      {messageText && (
        <CustomMessage text={messageText} bgColor="bg-[#00ab60]" />
      )}

      <Modal
        open={openModal}
        onOk={handleModalOk}
        onCancel={handleCancel}
        title={modalType === ModalTypeEnum.Create ? "創建賬號" : "修改角色"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="賬號名稱"
            name="accountName"
            rules={[{ required: true, message: "賬號名稱不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="角色">
            <Radio.Group defaultValue="操作員">
              <Radio value="操作員">{RoleMap[0]}</Radio>
              <Radio value="管理員">{RoleMap[1]}</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={openDeletePopups}
        onOk={handleDeleteAccount}
        onCancel={handleCancel}
        title="確認提示"
      >
        <div>您確認要刪除此賬號嗎？</div>
      </Modal>
    </div>
  );
};
