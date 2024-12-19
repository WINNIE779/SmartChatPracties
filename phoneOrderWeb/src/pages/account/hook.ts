import { Form } from "antd";
import { useEffect, useRef, useState } from "react";
import { IError, IModalDto } from "./props";
import {
  IAccount,
  IGetRole,
  IPageDtos,
  SystemSource,
} from "@/services/api/account/dto";
import {
  useDebounceEffect,
  useDebounceFn,
  useMemoizedFn,
  useUpdateEffect,
} from "ahooks";
import {
  getAccountList,
  getCopyUser,
  getRoleList,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
} from "@/services/api/account";
import { isEmpty, isNil } from "ramda";
import { isPermissionRevoked } from "@/components/custom-message";

type IAccountDto = IPageDtos & IAccount;

const defaultRole: IGetRole = {
  count: 0,
  roles: [],
};

const defaultAccount: IAccountDto = {
  count: 0,
  userAccounts: [],
  pageIndex: 1,
  pageSize: 20,
  userName: "",
};

const defaultModal: IModalDto = {
  type: null,
  visible: false,
  name: "",
  roleId: null,
  oldName: "",
  oldRoleId: null,
  userId: null,
};

const defaultError: IError = {
  same: false,
  empty: false,
};

export const useAction = () => {
  const [form] = Form.useForm();

  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [roleDto, setRoleDto] = useState<IGetRole>(defaultRole);

  const [modalDto, setModalDto] = useState<IModalDto>(defaultModal);

  const [accountDto, setAccountDto] = useState<IAccountDto>(defaultAccount);

  const [messageText, setMessageText] = useState<string>("");

  const [messageBgColor, setMessageBgColor] = useState<string>("");

  const [errorDto, setErrorDto] = useState<IError>(defaultError);

  const [endSearchText, setEndSearchText] = useState<string>("");

  const [height, setHeight] = useState<number>(0);

  const [copyDto, setCopyDto] = useState<{
    id: number | null;
    loading: boolean;
  }>({
    id: null,
    loading: false,
  });

  const showMessage = (text: string, bgColor: string) => {
    setMessageText(text);
    setMessageBgColor(bgColor);

    setTimeout(() => {
      setMessageText("");
    }, 1500);
  };

  //删除账号
  const { run: handleDeleteAccount } = useDebounceFn(
    useMemoizedFn(() => {
      if (isNil(modalDto.userId)) {
        return;
      }

      setLoading(true);

      postDeleteUser({
        userId: modalDto.userId!,
        roleId: modalDto.roleId!,
        userName: modalDto.name,
      })
        .then(() => {
          setModalDto({
            ...defaultModal,
            roleId:
              roleDto?.roles.find((item) => item.name === "User")?.id ?? null,
          });

          fetchAccountList(1, accountDto.pageSize, endSearchText);

          showMessage("角色刪除成功!", "green");
        })
        .catch((error) => {
          if (error !== "Unauthorized") {
            isPermissionRevoked(error)
              ? showMessage(`您已無權限進行操作`, "red")
              : showMessage(`角色刪除失敗,失敗原因:${error}`, "red");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }),
    {
      wait: 500,
    }
  );

  //复制账号
  const { run: handleCopyUser } = useDebounceFn(
    useMemoizedFn(async (id: number) => {
      if (!isNil(id)) {
        setCopyDto({
          id,
          loading: true,
        });
      }

      await getCopyUser({ userId: id })
        .then(async (res) => {
          if (!res) {
            showMessage("複製失敗,失敗原因:獲取不到帳號密碼!", "bg-red-500");
            return;
          }

          const copyContent = `帳號:${res?.userName}，密碼:${res?.passWord}`;

          await navigator.clipboard
            .writeText(copyContent)
            .then(() => {
              showMessage("已複製！", "bg-green-500");
            })
            .catch(() => {
              showMessage("複製失敗！", "bg-red-500");
            });
        })
        .catch((error) => {
          if (error !== "Unauthorized") {
            isPermissionRevoked(error)
              ? showMessage(`您已無權限進行操作`, "red")
              : showMessage(`複製失敗,失敗原因:${error}`, "red");
          }
        })
        .finally(() => {
          setCopyDto({
            id: null,
            loading: false,
          });
        });
    }),
    {
      wait: 500,
    }
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

        if (isPermissionRevoked(error))
          showMessage(`您已無權限進行操作`, "red");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //获取account分页
  const fetchAccountList = (pageIndex = 1, pageSize = 20, userName = "") => {
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

  //创建账号
  const handleCreateUser = useDebounceFn(
    () => {
      if (isEmpty(modalDto.name) && isNil(modalDto.roleId)) {
        setErrorDto({ ...defaultError, empty: true });
        return;
      }

      setLoading(true);

      postCreateUser({
        userName: modalDto.name,
        roleId: modalDto.roleId!,
      })
        .then(() => {
          setModalDto({
            ...defaultModal,
            roleId:
              roleDto?.roles.find((item) => item.name === "User")?.id ?? null,
          });

          fetchAccountList(1, accountDto.pageSize, endSearchText);
          setModalDto(defaultModal);
          setErrorDto(defaultError);

          showMessage("角色创建成功!", "green");
        })
        .catch((error) => {
          if (error !== "Unauthorized") {
            const isHaveSameUser = error.includes(
              "An error occurred while saving the entity changes. See the inner exception for details."
            );

            isHaveSameUser
              ? setErrorDto({
                  same: true,
                  empty: false,
                })
              : isPermissionRevoked(error)
              ? showMessage(`您已無權限進行操作`, "red")
              : showMessage(`角色創建失敗,失敗原因:${error}`, "red");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    { wait: 500 }
  );

  //修改角色
  const handleEditUser = useDebounceFn(
    () => {
      if (isNil(modalDto.userId)) {
        return;
      }

      setLoading(true);

      postUpdateUser({
        userId: modalDto.userId!,
        oldRoleId: modalDto.oldRoleId!,
        newRoleId: modalDto.oldRoleId!,
      })
        .then(() => {
          setModalDto({
            ...defaultModal,
            roleId:
              roleDto?.roles.find((item) => item.name === "User")?.id ?? null,
          });

          fetchAccountList(1, accountDto.pageSize, endSearchText);
          setErrorDto(defaultError);
          showMessage("角色更改成功!", "green");
        })
        .catch((error) => {
          if (error !== "Unauthorized") {
            const isHaveSameUser = error.includes(
              "An error occurred while saving the entity changes. See the inner exception for details."
            );

            isHaveSameUser
              ? setErrorDto({
                  same: true,
                  empty: false,
                })
              : isPermissionRevoked(error)
              ? showMessage(`您已無權限進行操作`, "red")
              : showMessage(`角色修改失敗,失敗原因:${error}`, "red");
          }
        });
    },
    { wait: 500 }
  );

  useDebounceEffect(
    () => {
      setEndSearchText(accountDto.userName);
    },
    [accountDto.userName],
    {
      wait: 1000,
    }
  );

  useEffect(() => {
    const handleResize = () => {
      //  ant-table-header 的高度
      const tableHeaderElement = document.querySelector(".ant-table-header");

      if (tableWrapperRef.current && tableHeaderElement) {
        setHeight(
          tableWrapperRef.current.offsetHeight -
            tableHeaderElement.clientHeight -
            2
        );
      }
    };

    handleResize();

    fetchAccountList(); //获取account分页

    handleGetRoleList(); //放在useEffect里渲染 list列表

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useUpdateEffect(() => {
    fetchAccountList(1, accountDto.pageSize, endSearchText);
  }, [endSearchText]);

  return {
    form,
    height,
    copyDto,
    roleDto,
    errorDto,
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
    setLoading,
    setModalDto,
    setCopyDto,
    setAccountDto,
    fetchAccountList,
    handleGetRoleList,
  };
};
