import { LeftOutlined } from "@ant-design/icons";
import { Button, Table, Form, Radio, Input, Pagination } from "antd";
import Search from "antd/es/input/Search";
import Modal from "antd/es/modal/Modal";
import { useAction } from "./hook";
import { CustomMessage } from "@/components/custom-message";
import { IRole, IUserAccount } from "@/services/api/conversation/dto";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const AccountList = () => {
  const navigate = useNavigate();

  const { role, userInfo } = useAuth();

  const {
    form,
    height,
    roleDto,
    modalDto,
    loading,
    messageText,
    accountDto,
    defaultModal,
    handleEditUser,
    handleCreateUser,
    handleCopyUser,
    tableWrapperRef,
    handleDeleteAccount,
    setModalDto,
    setAccountDto,
    fetchAccountList,
  } = useAction();

  const columns = [
    {
      title: "賬號名稱",
      dataIndex: "userName",
      key: "userName",
      width: 150,
    },
    {
      title: "角色",
      dataIndex: "roles",
      key: "roles",
      width: 200,
      render: (record: IRole[]) => {
        return (
          <div className="truncate">
            {record.map((item) => item.displayName).join(" ")}
          </div>
        );
      },
    },
    {
      title: "創建時間",
      dataIndex: "createdOn",
      key: "createdOn",
      width: 200,
      render: (record: string) => {
        return dayjs.utc(record).format("MM/DD/YYYY HH:mm:ss");
      },
    },
    {
      title: "創建人",
      dataIndex: "lastModifiedByName",
      key: "lastModifiedByName",
      width: 200,
    },
    {
      title: "操作",
      dataIndex: "fuction",
      width: 400,
      render: (_: any, record: IUserAccount) => (
        <div className="flex space-x-4">
          <Button
            className={`flex-1 cursor-pointer p-2 rounded-lg items-center flex justify-center border-gray-400 border border-solid`}
            onClick={() => {
              setModalDto({
                type: "delete",
                visible: true,
                name: record.userName,
                roleId: record?.roles[0]?.id ?? null,
                userId: record?.id,
                oldName: "",
                oldRoleId: null,
              });
            }}
            disabled={
              role === "User" ||
              (role === "Administrator" &&
                (record?.roles[0]?.name === "Administrator" ||
                  record?.roles[0]?.name === "SuperAdministrator"))
            }
          >
            刪除賬號
          </Button>

          <Button
            className={`flex-1 cursor-pointer p-2 rounded-lg items-center flex justify-center border-gray-400 border border-solid`}
            onClick={() => {
              setModalDto({
                type: "edit",
                name: record.userName,
                roleId: record?.roles[0]?.id ?? null,
                oldName: record.userName,
                oldRoleId: record?.roles[0]?.id ?? null,
                userId: record?.id,
                visible: true,
              });
            }}
            disabled={
              role !== "SuperAdministrator" || record?.id === userInfo.count
            }
          >
            修改角色
          </Button>

          <Button
            className={`flex-1 cursor-pointer p-2 rounded-lg items-center flex justify-center border-gray-400 border border-solid`}
            onClick={() => handleCopyUser(record.id)}
            disabled={
              role !== "SuperAdministrator" &&
              role === "Administrator" &&
              (record?.roles[0]?.name === "Administrator" ||
                record?.id !== userInfo.count)
            }
          >
            複製信息
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-screen h-screen p-4 bg-[#f9fafb] flex flex-col no-scrollbar">
      <div
        className="flex items-center w-[3.4rem] cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <LeftOutlined style={{ fontSize: "1.25rem" }} />
        返回
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center p-6">
          <div className="pr-3">账号管理列表</div>
          <Search
            placeholder="搜索"
            style={{ width: "12.5rem" }}
            value={accountDto.userName}
            onChange={(e) => {
              setAccountDto((prev) => ({ ...prev, userName: e.target.value }));
            }}
          />
        </div>

        <Button
          onClick={() => {
            setModalDto({
              type: "add",
              name: "",
              roleId: null,
              oldName: "",
              oldRoleId: null,
              userId: null,
              visible: true,
            });
          }}
        >
          创建账号
        </Button>
      </div>

      <div
        className="h-[calc(100%-140px)] border border-solid border-gray-400 rounded-lg overflow-y-auto no-scrollbar"
        ref={tableWrapperRef}
      >
        <Table
          loading={loading}
          dataSource={accountDto.userAccounts}
          columns={columns}
          scroll={{ y: height, x: 1200 }}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </div>

      <div className="h-[50px] flex justify-end items-center">
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

      {messageText && (
        <CustomMessage text={messageText} bgColor="bg-[#00ab60]" />
      )}

      <Modal
        // 创建or修改modal
        open={modalDto.visible && modalDto.type !== "delete"}
        destroyOnClose
        centered
        title={
          modalDto.type !== "delete" && modalDto.type === "add" ? (
            <div className="p-4">創建賬號</div>
          ) : (
            <div className="p-4">修改角色"</div>
          )
        }
        footer={
          <div className="w-full flex cursor-pointer border-t border-solid border-gray-400">
            <div
              className="flex-1 text-center py-3 select-none font-semibold"
              onClick={() => {
                setModalDto({
                  ...defaultModal,
                  visible: false,
                  roleId:
                    roleDto.roles.find((item) => item.name === "User")?.id ??
                    null,
                });
              }}
            >
              取消
            </div>
            <div className="w-[1px] h-[46px] py-3 bg-gray-400"></div>
            <div
              className="flex-1 text-center py-3 select-none font-semibold"
              onClick={() =>
                modalDto.type === "add"
                  ? handleCreateUser.run()
                  : handleEditUser.run()
              }
            >
              {modalDto.type === "add" ? "創建" : "保存"}
            </div>
          </div>
        }
        closeIcon={false}
        styles={{
          body: {
            padding: "5px 30px",
          },
          content: {
            padding: "0px",
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={() => {
            modalDto.type === "add"
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
              placeholder={modalDto.type === "add" ? "" : modalDto.name}
              value={modalDto.name}
              disabled={modalDto.type === "edit"}
              onChange={(e) =>
                setModalDto((prev) => ({ ...prev, name: e.target.value }))
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
              {roleDto.roles.map((item) => {
                return (
                  <Radio
                    key={item.id}
                    value={item.id}
                    disabled={modalDto.name === "Administrator"}
                  >
                    {item.displayName}
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        // 删除modal
        open={modalDto.visible && modalDto.type === "delete"}
        centered
        closeIcon={false}
        title={<div className="select-none p-3">確認提示</div>}
        footer={
          <div className="w-full flex cursor-pointer border-t border-solid border-gray-400">
            <div
              className="flex-1 text-center py-3 select-none font-semibold"
              onClick={() =>
                setModalDto({
                  ...defaultModal,
                  roleId:
                    roleDto.roles.find((item) => item.name === "User")?.id ??
                    null,
                })
              }
            >
              取消
            </div>
            <div className="w-[1px] h-[46px] py-3 bg-gray-400"></div>
            <div
              className="flex-1 text-center py-3 select-none font-semibold"
              onClick={handleDeleteAccount}
            >
              <div>確認</div>
            </div>
          </div>
        }
        styles={{
          body: {
            padding: "5px 30px",
          },
          content: {
            padding: "0px",
          },
        }}
      >
        您確認要刪除此賬號嗎？
      </Modal>
    </div>
  );
};
