import React, { useEffect, useState } from "react";
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
import { useDebounceEffect, useDebounceFn, useUpdateEffect } from "ahooks";
import { isEmpty, isNil } from "ramda";
import { message } from "antd";

interface IModalDto {
  userName: string;
  roleId: number | null;
  userId: number | null;
  oldName: string;
  oldRoleId: number | null;
  type: "create" | "edit" | "delete" | null;
  visible: boolean;
}

export const useAction = () => {
  type IAccountDto = IAccount & IPageDtos;

  const defaultAccount: IAccountDto = {
    count: 0,
    userAccounts: [],
    pageIndex: 1,
    pageSize: 10,
    userName: "",
  };

  const defaultModal: IModalDto = {
    userName: "",
    userId: null,
    oldName: "",
    roleId: null,
    oldRoleId: null,
    type: null,
    visible: false,
  };

  const defaultRole: IGetRole = {
    count: 0,
    roles: [],
  };

  const [searchText, setSearchText] = useState<string>("");

  const [accountDto, setAccountDto] = useState<IAccountDto>(defaultAccount);

  const [modalDto, setModalDto] = useState<IModalDto>(defaultModal);

  const [loading, setLoading] = useState<boolean>(false);

  const [roleDto, setRoleDto] = useState<IGetRole>(defaultRole);

  const handleCreateUser = useDebounceFn(
    () => {
      if (isEmpty(modalDto.userName) || isNil(modalDto.roleId)) {
        return;
      }

      setLoading(true);

      postCreateUser({
        userName: modalDto.userName,
        roleId: modalDto.roleId!,
      })
        .then((res) => {
          setModalDto({ ...defaultModal });

          message.success("创建成功");

          fetchAccountList(1, accountDto.pageSize, searchText);
        })
        .catch((error) => {
          message.error("error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    { wait: 500 }
  );

  const handleUpdateUser = useDebounceFn(
    () => {
      setLoading(true);

      postUpdateUser({
        userId: modalDto.userId!,
        oldRoleId: modalDto.oldRoleId!,
        newRoleId: modalDto.roleId!,
      })
        .then((res) => {
          setModalDto({ ...defaultModal });

          message.success("已修改");

          fetchAccountList(1, accountDto.pageSize, searchText);
        })
        .catch((error) => {
          message.error("error");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    { wait: 500 }
  );

  const handleDeleteUser = useDebounceFn(
    () => {
      if (modalDto.userId === null) {
        return;
      }

      setLoading(true);

      postDeleteUser({
        userName: modalDto.userName,
        userId: modalDto.userId!,
        roleId: modalDto.roleId!,
      })
        .then(() => {
          setModalDto({
            ...defaultModal,
          });

          message.success("成功删除！");

          fetchAccountList(1, accountDto.pageSize, searchText);
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

  const fetchRoleList = () => {
    setLoading(true);

    const param = {
      pageIndex: 1,
      pageSize: 2147483647,
      keyWord: "",
      systemSource: SystemSource.SmartTalk,
    };

    getRoleList(param)
      .then((res) => {
        setRoleDto({
          count: res?.roles?.length ?? 0,
          roles:
            res?.roles
              .reverse()
              .filter((roleItem: any) => roleItem.name !== "超级管理员") ?? [],
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

  useDebounceEffect(
    () => {
      setSearchText(accountDto.userName);
    },
    [accountDto.userName],
    { wait: 500 }
  );

  useEffect(() => {
    fetchAccountList();
    fetchRoleList();
  }, []);

  useUpdateEffect(() => {
    fetchAccountList(
      accountDto.pageIndex,
      accountDto.pageSize,
      accountDto.userName
    );
  }, [accountDto.userName]);

  return {
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
  };
};
