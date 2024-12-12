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
  useRequest,
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

interface IAccountDto extends IPageDtos, IAccount {
  loading: boolean;
}

const defaultRole: IGetRole = {
  count: 0,
  roles: [],
};

const defaultAccount: IAccountDto = {
  loading: false,
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
  loading: false,
};

const defaultError: IError = {
  same: false,
  empty: false,
};

export const useAction = () => {
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [form] = Form.useForm();

  const [modalDto, setModalDto] = useState<IModalDto>(defaultModal);

  const [roleDto, setRoleDto] = useState<IGetRole>(defaultRole);

  const [accountDto, setAccountDto] = useState<IAccountDto>(defaultAccount);

  const [errorDto, setErrorDto] = useState<IError>(defaultError);

  const [endSearchText, setEndSearchText] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openDeletePopups, setOpenDeletePopups] = useState<boolean>(false);

  const [messageText, setMessageText] = useState<string>("");

  const [messageBgColor, setMessageBgColor] = useState<string>("");

  const [height, setHeight] = useState<number>(0);

  const [paginationDtos, setPaginationDtos] = useState<IPageDtos>({
    pageIndex: 1,
    pageSize: 8,
    userName: "",
  });

  const [copyDto, setCopyDto] = useState<{
    id: number | null;
    loading: boolean;
  }>({
    id: null,
    loading: false,
  });

  const handleChangeModalDto = useMemoizedFn((data: Partial<IModalDto>) => {
    setModalDto((prev) => ({
      ...prev,
      ...data,
    }));
  });

  const handleChangeAccountDto = useMemoizedFn((data: Partial<IAccountDto>) => {
    setAccountDto((prev) => ({
      ...prev,
      ...data,
    }));
  });

  const handleChangeErrorDto = useMemoizedFn((data: Partial<IError>) => {
    setErrorDto((prev) => ({
      ...prev,
      ...data,
    }));
  });

  //删除账号
  const { run: handleDeleteUser } = useDebounceFn(
    useMemoizedFn(() => {
      if (isNil(modalDto.userId)) {
        return;
      }

      handleChangeModalDto({
        loading: true,
      });

      postDeleteUser({
        userId: modalDto.userId!,
        roleId: modalDto.roleId!,
        userName: modalDto.name,
      })
        .then(() => {
          handleChangeModalDto({
            ...defaultModal,
            roleId:
              roleDto?.roles.find((item) => item.name === "User")?.id ?? null,
          });

          getAccountListRequest.run(1, accountDto.pageSize, endSearchText);

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
          handleChangeModalDto({
            loading: false,
          });
        });
    }),
    {
      wait: 500,
    }
  );

  // 复制账号信息
  const { run: handleCopyUser } = useDebounceFn(
    useMemoizedFn(async (id: number) => {
      if (!isNil(id)) {
        setCopyDto({
          id,
          loading: true,
        });

        await getCopyUser({ userId: id })
          .then(async (res) => {
            if (res) {
              try {
                await navigator.clipboard.writeText(
                  `帳號:${res?.userName}，密碼:${res?.passWord}`
                );

                showMessage("已複製！", "bg-green-500");
              } catch {
                showMessage("複製失敗！", "bg-red-500");
              }
            } else {
              showMessage("複製失敗,失敗原因:獲取不到帳號密碼!", "bg-red-500");
            }
          })
          .catch((error) => {
            if (error !== "Unauthorized") {
              isPermissionRevoked(error)
                ? showMessage(`您已無權限進行操作`, "bg-red-500")
                : showMessage(`複製失敗,失敗原因:${error}`, "bg-red-500");
            }
          })
          .finally(() => {
            setCopyDto({
              id: null,
              loading: false,
            });
          });
      }
    }),
    {
      wait: 500,
    }
  );

  const getRoleListRequest = useMemoizedFn(() => {
    getRoleList({
      pageIndex: 1,
      pageSize: 2147483647,
      keyWord: "",
      systemSource: SystemSource.SmartTalk,
    })
      .then((res) => {
        const fliterData = res?.roles
          .reverse()
          .filter((item: any) => item.name !== "SuperAdministrator");

        setRoleDto({
          count: fliterData?.length ?? 0,
          roles: fliterData ?? [],
        });

        handleChangeModalDto({
          roleId:
            fliterData.find((item: any) => item.name === "User")?.id ?? null,
        });
      })
      .catch((error) => {
        if (isPermissionRevoked(error))
          showMessage(`您已無權限進行操作`, "red");

        setRoleDto(defaultRole);
      });
  });

  const { run: handleCreateOrEditUser } = useDebounceFn(
    useMemoizedFn(() => {
      if (modalDto.type === null) {
        return;
      } else if (modalDto.type === "add") {
        if (isEmpty(modalDto.name) || isNil(modalDto.roleId)) {
          handleChangeErrorDto({
            empty: true,
          });

          return;
        }

        handleChangeModalDto({
          loading: true,
        });

        postCreateUser({
          userName: modalDto.name,
          roleId: modalDto.roleId!,
        })
          .then(() => {
            handleChangeModalDto({
              ...defaultModal,
              roleId:
                roleDto?.roles.find((item) => item.name === "User")?.id ?? null,
            });

            getAccountListRequest.run(1, accountDto.pageSize, endSearchText);

            handleChangeErrorDto(defaultError);

            showMessage("角色創建成功!", "green");
          })
          .catch((error) => {
            if (error !== "Unauthorized") {
              const isHaveSameUser = error.includes(
                "An error occurred while saving the entity changes. See the inner exception for details."
              );

              isHaveSameUser
                ? handleChangeErrorDto({
                    same: true,
                  })
                : isPermissionRevoked(error)
                ? showMessage(`您已無權限進行操作`, "red")
                : showMessage(`角色創建失敗,失敗原因:${error}`, "red");
            }
          })
          .finally(() => {
            handleChangeModalDto({
              loading: false,
            });
          });
      } else {
        if (isNil(modalDto.userId)) {
          return;
        }

        handleChangeModalDto({
          loading: true,
        });

        postUpdateUser({
          userId: modalDto.userId!,
          oldRoleId: modalDto.oldRoleId!,
          newRoleId: modalDto.roleId!,
        })
          .then(() => {
            handleChangeModalDto({
              ...defaultModal,
              roleId:
                roleDto?.roles.find((item) => item.name === "User")?.id ?? null,
            });

            getAccountListRequest.run(1, accountDto.pageSize, endSearchText);

            handleChangeErrorDto(defaultError);

            showMessage("角色更改成功!", "green");
          })
          .catch((error) => {
            if (error !== "Unauthorized") {
              const isHasSameUser = (error as string).includes(
                "An error occurred while saving the entity changes. See the inner exception for details."
              );

              if (isHasSameUser) {
                handleChangeErrorDto({
                  same: true,
                });
              } else {
                isPermissionRevoked(error)
                  ? showMessage(`您已無權限進行操作`, "red")
                  : showMessage(`角色更改失敗,失敗原因:${error}`, "red");
              }
            }
          })
          .finally(() => {
            handleChangeModalDto({
              loading: false,
            });
          });
      }
    }),
    {
      wait: 500,
    }
  );

  // 顯示操作提示信息
  const showMessage = (text: string, bgColor: string) => {
    setMessageText(text);
    setMessageBgColor(bgColor);

    setTimeout(() => {
      setMessageText("");
    }, 1500);
  };

  const getAccountListReq = useMemoizedFn(
    async (
      pageIndex: number = 1,
      pageSize: number = 20,
      keyWord: string = ""
    ) => {
      await getAccountList({
        pageIndex,
        pageSize,
        userName: keyWord,
      })
        .then((res) => {
          handleChangeAccountDto({
            pageIndex,
            pageSize,
            count: res?.count ?? 0,
            userAccounts: res?.userAccounts ?? [],
          });
        })
        .catch(() => {
          handleChangeAccountDto({
            pageIndex,
            pageSize,
            count: 0,
            userAccounts: [],
          });
        });
    }
  );

  const getAccountListRequest = useRequest(getAccountListReq, {
    manual: true,
    debounceWait: 1000,
    onBefore: () => {
      handleChangeAccountDto({ loading: true });
    },
    onFinally: () => {
      handleChangeAccountDto({ loading: false });
    },
  });

  useDebounceEffect(
    () => {
      setEndSearchText(accountDto.userName);
    },
    [accountDto.userName],
    {
      wait: 500,
    }
  );

  //获取页面高度
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

    getAccountListRequest.run();

    getRoleListRequest();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useUpdateEffect(() => {
    getAccountListRequest.run(1, accountDto.pageSize, endSearchText);
  }, [endSearchText]);

  return {
    form,
    height,
    copyDto,
    roleDto,
    errorDto,
    modalDto,
    openModal,
    accountDto,
    messageText,
    paginationDtos,
    handleCopyUser,
    tableWrapperRef,
    openDeletePopups,
    handleDeleteUser,
    getAccountListRequest,
    handleCreateOrEditUser,
    setCopyDto,
    setAccountDto,
    getRoleListRequest,
    handleChangeModalDto,
    handleChangeAccountDto,
    handleChangeErrorDto,
  };
};
