import { IRole, IUserAccount } from "@/sercices/api/account/dto";
import { Button, Form, Input, Modal, Pagination, Radio, Table } from "antd";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router";
import { useAction } from "./hook";
import React from "react";

export const Account = () => {
  const navigate = useNavigate();

  const {
    roleDto,
    modalDto,
    accountDto,
    defaultModal,
    handleUpdateUser,
    handleCreateUser,
    handleDeleteUser,
    setModalDto,
    setAccountDto,
    fetchAccountList,
  } = useAction();

  const columns = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      render: (record: IRole[]) => {
        return <div>{record.flatMap((item) => item.displayName).join("")}</div>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    {
      title: "创建人",
      dataIndex: "lastModifiedByName",
      key: "lastModifiedByName",
    },
    {
      title: "操作",
      dataIndex: "fuction",
      render: (_: any, record: IUserAccount) => (
        <div className="space-x-4 flex">
          <Button
            className="items-center flex justify-center flex-1 cursor-pointer"
            onClick={() => {
              setModalDto({
                type: "edit",
                visible: true,
                userId: record?.id,
                userName: record.userName,
                roleId: record?.roles[0]?.id ?? null,
                oldName: record.userName,
                oldRoleId: record?.roles[0]?.id ?? null,
              });
            }}
          >
            修改角色
          </Button>
          <Button
            className="items-center flex justify-center flex-1 cursor-pointer"
            onClick={() => {
              setModalDto({
                ...defaultModal,
                visible: true,
                type: "delete",
                userId: record?.id,
                userName: record?.userName,
                roleId: record?.roles[0]?.id ?? 0,
              });
            }}
          >
            刪除賬號
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="h-screen p-4 flex flex-col no-scrollbar">
      <div className="p-2 flex justify-center">账户页面</div>
      <div onClick={() => navigate("/")} className="w-[2rem] cursor-pointer">
        返回
      </div>
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
            setModalDto({
              ...defaultModal,
              type: "create",
              visible: true,
            });
          }}
        >
          创建
        </Button>
      </div>
      <div className="h-[650px] overflow-y-auto no-scrollbar">
        <Table
          sticky
          pagination={false}
          rowKey={(record) => record.id}
          dataSource={accountDto.userAccounts}
          columns={columns}
        />
      </div>
      <div className="flex justify-end m-4">
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
      <Modal
        open={modalDto.type !== "delete" && modalDto.visible === true}
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
                setModalDto({
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
                modalDto.type !== "delete" && modalDto.type === "edit"
                  ? handleUpdateUser.run()
                  : handleCreateUser.run()
              }
              className="flex-1 text-center py-3 select-none font-semibold"
            >
              提交
            </div>
          </div>
        }
      >
        <Form
          onFinish={() => {
            modalDto.type !== "delete" &&
              (modalDto.type === "edit"
                ? handleUpdateUser.run()
                : handleCreateUser.run());
          }}
        >
          <Form.Item
            label="用户名"
            name="userName"
            rules={[{ required: true, message: "不能为空" }]}
          >
            <Input
              disabled={modalDto.type === "edit"}
              placeholder={modalDto.type === "create" ? "" : modalDto.userName}
              value={modalDto.userName}
              onChange={(e) =>
                setModalDto((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Radio.Group
              value={modalDto.roleId}
              onChange={(e) =>
                setModalDto((prev) => ({ ...prev, roleId: e.target.value }))
              }
            >
              {roleDto.roles
                .filter((items) => items.displayName !== "超级管理员")
                .map((item) => {
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
        closeIcon={false}
        open={modalDto.type === "delete" && modalDto.visible === true}
        title={<div>确认</div>}
        footer={
          <div className="w-full cursor-pointer flex justify-center items-center flex-row">
            <div
              className="text-center py-3 flex-1"
              onClick={() => {
                setModalDto(defaultModal);
              }}
            >
              取消
            </div>
            <div
              className="text-center py-3 flex-1"
              onClick={() => handleDeleteUser.run()}
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
