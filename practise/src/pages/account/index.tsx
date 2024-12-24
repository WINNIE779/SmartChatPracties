import { IRole, IUserAccount } from "@/sercices/api/account/dto";
import { Button, Form, Input, Modal, Pagination, Radio, Table } from "antd";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router";
import { useAction } from "./hook";
import React from "react";

export const Account = () => {
  const [form] = Form.useForm();

  const {
    loading,
    roleDto,
    modalDto,
    accountDto,
    defaultModal,
    handleEditUser,
    handleCreateUser,
    handleDeleteUser,
    setModal,
    setAccountDto,
    fetchAccountList,
  } = useAction();

  const navigate = useNavigate();

  const columns = [
    {
      title: "賬號名稱",
      dataIndex: "userName",
      key: "userName",
      width: 200,
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      width: 200,
      render: (record: IRole[]) => {
        return (
          <div>{record.flatMap((item) => item.displayName).join(" ")}</div>
        );
      },
    },
    {
      title: "創建時間",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    {
      title: "創建人",
      dataIndex: "lastModifiedByName",
      key: "lastModifiedByName",
    },
    {
      title: "操作",
      dataIndex: "fuction",
      width: 400,
      render: (_: any, record: IUserAccount) => (
        <div className="flex space-x-4">
          <Button
            className="flex-1 cursor-pointer p-2 items-center flex justify-center"
            onClick={() => {
              setModal({
                visible: true,
                type: "delete",
                userId: record?.id,
                userName: record?.userName,
                roleId: record?.roles[0]?.id ?? 0,
                oldName: "",
                oldRoleId: null,
              });
            }}
          >
            刪除賬號
          </Button>

          <Button
            className="flex-1 cursor-pointer p-2 items-center flex justify-center"
            onClick={() => {
              setModal({
                type: "edit",
                userName: record.userName,
                roleId: record?.roles[0]?.id ?? null,
                oldName: record.userName,
                oldRoleId: record?.roles[0]?.id ?? null,
                userId: record?.id,
                visible: true,
              });
            }}
          >
            修改角色
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen p-4 flex flex-col no-scrollbar">
      <div className="p-2 flex justify-center">账户页面</div>
      <div
        onClick={() => navigate("/")}
        className="pb-6 cursor-pointer w-[2rem]"
      >
        返回
      </div>

      <div className="p-2">
        <div className="flex justify-between p-4">
          <Search
            placeholder="搜索"
            style={{ width: "13rem" }}
            value={accountDto.userName}
            onChange={(e) => {
              setAccountDto((prev) => ({
                ...prev,
                userName: e.target.value,
              }));
            }}
          />

          <Button
            onClick={() => {
              setModal({
                ...defaultModal,
                type: "create",
                visible: true,
              });
            }}
          >
            添加新账号
          </Button>
        </div>

        <div className="h-[650px] overflow-y-auto no-scrollbar">
          <Table
            loading={loading}
            rowKey={(record) => record.id}
            dataSource={accountDto.userAccounts}
            columns={columns}
            sticky
            pagination={false}
          />
        </div>

        <div className="flex justify-end items-center h-[42px] ">
          <Pagination
            showQuickJumper
            showSizeChanger
            total={accountDto.count}
            current={accountDto.pageIndex}
            pageSize={accountDto.pageSize}
            onChange={(pageIndex, pageSize) => {
              fetchAccountList(pageIndex, pageSize, accountDto.userName);
            }}
          />
        </div>
      </div>

      <Modal
        open={modalDto.visible && modalDto.type !== "delete"}
        centered
        closeIcon={false}
        title={
          modalDto.type !== "delete" && modalDto.type === "create" ? (
            <div>創建賬號</div>
          ) : (
            <div>修改角色"</div>
          )
        }
        footer={
          <div className="flex flex-row justify-center items-center w-full cursor-pointer">
            <div
              onClick={() => {
                setModal({
                  ...defaultModal,
                  visible: false,
                });
              }}
              className="flex-1 text-center py-3 select-none font-semibold"
            >
              取消
            </div>
            <div
              onClick={() =>
                modalDto.type === "create"
                  ? handleCreateUser.run()
                  : handleEditUser.run()
              }
              className="flex-1 text-center py-3 select-none font-semibold"
            >
              提交
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={() => {
            modalDto.type === "create"
              ? handleCreateUser.run()
              : handleEditUser.run();
          }}
        >
          <Form.Item
            label="賬號名稱"
            name="userName"
            rules={[{ required: true, message: "賬號名稱不能为空" }]}
          >
            <Input
              placeholder={modalDto.type === "create" ? "" : modalDto.userName}
              value={modalDto.userName}
              disabled={modalDto.type === "edit"}
              onChange={(e) =>
                setModal((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Radio.Group
              value={modalDto.roleId}
              onChange={(e) =>
                setModal((prev) => ({ ...prev, roleId: e.target.value }))
              }
            >
              {roleDto.roles.map((item) => {
                return (
                  <Radio key={item.id} value={item.id}>
                    {item.displayName}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={modalDto.type === "delete" && modalDto.visible === true}
        centered
        closeIcon={false}
        title={<div>操作确认</div>}
        footer={
          <div className="flex flex-row justify-center items-center w-full cursor-pointer">
            <div
              onClick={() => {
                setModal(defaultModal);
              }}
              className="flex-1 text-center py-3 select-none font-semibold"
            >
              取消
            </div>
            <div
              onClick={() => handleDeleteUser.run()}
              className="flex-1 text-center py-3 select-none font-semibold"
            >
              删除
            </div>
          </div>
        }
      >
        <div>确认是否删除？</div>
      </Modal>
    </div>
  );
};
