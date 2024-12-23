import {
  getAccountList,
  getRoleList,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "@/sercices/api/account";
import {
  IAccount,
  IGetRole,
  IPageDtos,
  SystemSource,
} from "@/sercices/api/account/dto";
import { useDebounceFn } from "ahooks";
import { message } from "antd";
import { useEffect, useState } from "react";
import React from "react";

export const useAction = () => {
  type IAccountDto = IPageDtos & IAccount;

  const defaultAccount: IAccountDto = {
    pageIndex: 1,
    pageSize: 10,
    userName: "",
    count: 0,
    userAccounts: [],
  };

  const defaultRole: IGetRole = {
    count: 0,
    roles: [],
  };

  interface IModalDto {
    userName: string;
    roleId: number | null;
    userId: number | null;
    oldName: string;
    oldRoleId: number | null;
    type: "create" | "edit" | "delete" | null;
    visible: boolean;
  }

  const defaultModal: IModalDto = {
    userName: "",
    userId: null,
    oldName: "",
    roleId: null,
    oldRoleId: null,
    type: null,
    visible: false,
  };

  const [pageSearchText, setPageSearchText] = useState<string>("");

  const [accountDto, setAccountDto] = useState<IAccountDto>(defaultAccount);

  const [loading, setLoading] = useState<boolean>(false);

  const [roleDto, setRoleDto] = useState<IGetRole>(defaultRole);

  const [modalDto, setModal] = useState<IModalDto>(defaultModal);

  //删除账户
  const handleDeleteUser = useDebounceFn(
    () => {
      if (modalDto.userId === null) {
        return;
      }

      setLoading(true);

      postDeleteUser({
        userId: modalDto.userId!,
        roleId: modalDto.roleId!,
        userName: modalDto.userName,
      })
        .then(() => {
          setModal({
            userName: "",
            roleId: null,
            userId: null,
            oldName: "",
            oldRoleId: null,
            type: "delete",
            visible: true,
          });

          fetchAccountList(1, accountDto.pageSize, pageSearchText);

          message.success("成功删除！");
        })
        .catch((error) => {
          message.error("删除失败！");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    { wait: 500 }
  );

  //修改
  const handleEditUser = useDebounceFn(
    () => {
      setLoading(true);

      postUpdateUser({
        userId: modalDto.userId!,
        oldRoleId: modalDto.oldRoleId!,
        newRoleId: modalDto.oldRoleId!,
      })
        .then((res) => {
          setModal({ ...defaultModal });

          fetchAccountList(1, accountDto.pageSize, pageSearchText);
        })
        .catch((error) => {
          message.error("errror");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    { wait: 500 }
  );

  //创建
  const handleCreateUser = useDebounceFn(
    () => {
      setLoading(true);

      postCreateUser({
        userName: modalDto.userName,
        roleId: modalDto.roleId!,
      })
        .then((res) => {
          console.log(res);

          setModal({ ...defaultModal });

          fetchAccountList(1, accountDto.pageSize, pageSearchText);

          message.success("create success");
        })
        .catch((error) => {
          message.error("create error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    { wait: 500 }
  );

  //获取list列表
  const handleGetRoleList = () => {
    setLoading(true);

    const params = {
      pageIndex: 1,
      pageSize: 2147483647,
      keyWord: "",
      systemSource: SystemSource.SmartTalk,
    };

    getRoleList(params)
      .then((res) => {
        const filterData = res?.roles
          .reverse()
          .filter((roleItem: any) => roleItem.name !== "SuperAdministrator");

        setRoleDto({
          count: filterData?.length ?? 0,
          roles: filterData ?? [],
        });
      })
      .catch((error) => {
        setRoleDto(defaultRole);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchAccountList = (pageIndex = 1, pageSize = 10, userName = "") => {
    setLoading(true);

    getAccountList({ pageIndex, pageSize, userName })
      .then((res) => {
        setAccountDto((prev) => ({
          ...prev,
          pageIndex,
          pageSize,
          count: res?.count ?? 0,
          userAccounts: res?.userAccounts ?? [],
        }));
      })
      .catch(() => {
        setAccountDto((prev) => ({
          ...prev,
          pageIndex,
          pageSize,
          count: 0,
          userAccounts: [],
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetRoleList();

    fetchAccountList();

    const handleEvent = () => console.log("Event triggered");

    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("resize", handleEvent);
    };
  }, []);

  useEffect(() => {
    fetchAccountList(
      accountDto.pageIndex,
      accountDto.pageSize,
      accountDto.userName
    );
  }, [accountDto.userName, pageSearchText]);

  return {
    loading,
    roleDto,
    modalDto,
    accountDto,
    defaultModal,
    defaultAccount,
    handleEditUser,
    handleCreateUser,
    handleDeleteUser,
    setModal,
    setRoleDto,
    setLoading,
    setAccountDto,
    fetchAccountList,
  };
};
