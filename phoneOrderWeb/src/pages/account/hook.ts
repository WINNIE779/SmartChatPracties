import { Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IAccountDataProps,
  IPaginationProps,
  ModalTypeEnum,
  RoleEnum,
} from "./props";

export const useAction = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [modalType, setModalType] = useState<ModalTypeEnum | null>(null);

  const [openDeletePopups, setOpenDeletePopups] = useState<boolean>(false);

  const [selectedAccount, setSelectedAccount] =
    useState<IAccountDataProps | null>(null);

  const [messageText, setMessageText] = useState<string>("");

  const [height, setHeight] = useState<number>(0);

  const [dataSource, setDataSource] = useState<IAccountDataProps[]>([
    {
      key: "1",
      accountName: "Synthia",
      role: RoleEnum.Operator,
      creatTime: "10/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "2",
      accountName: "LuHan",
      role: RoleEnum.Admin,
      creatTime: "12/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "4",
      accountName: "Minmin",
      role: RoleEnum.SuperAdmin,
      creatTime: "12/29/2023 01:57:11",
      creator: "/",
    },
    {
      key: "5",
      accountName: "Synthia",
      role: RoleEnum.Operator,
      creatTime: "10/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "6",
      accountName: "LuHan",
      role: RoleEnum.Admin,
      creatTime: "12/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "7",
      accountName: "Minmin",
      role: RoleEnum.SuperAdmin,
      creatTime: "12/29/2023 01:57:11",
      creator: "/",
    },
    {
      key: "8",
      accountName: "Synthia",
      role: RoleEnum.Operator,
      creatTime: "10/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "9",
      accountName: "LuHan",
      role: RoleEnum.Admin,
      creatTime: "12/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "10",
      accountName: "Minmin",
      role: RoleEnum.SuperAdmin,
      creatTime: "12/29/2023 01:57:11",
      creator: "/",
    },
    {
      key: "1",
      accountName: "Synthia",
      role: RoleEnum.Operator,
      creatTime: "10/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "2",
      accountName: "LuHan",
      role: RoleEnum.Admin,
      creatTime: "12/29/2024 01:57:11",
      creator: "Minmin",
    },
    {
      key: "4",
      accountName: "Minmin",
      role: RoleEnum.SuperAdmin,
      creatTime: "12/29/2023 01:57:11",
      creator: "/",
    },
    {
      key: "5",
      accountName: "Synthia",
      role: RoleEnum.Operator,
      creatTime: "10/29/2024 01:57:11",
      creator: "Minmin",
    },
  ]);

  const [paginationDtos, setPaginationDtos] = useState<IPaginationProps>({
    pageIndex: 1,
    pageSize: 8,
    keyWord: "",
  });

  // 假设当前登陆的角色
  const currentUserRole = RoleEnum.SuperAdmin;

  // 假设当前登陆的账号名
  const currentUserAccountName = "LuHan";

  //创建账号
  const handleCreateAccount = () => {
    setOpenModal(true);
    form.resetFields();
    setModalType(ModalTypeEnum.Create);
  };

  //账号创建or修改角色成功
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (modalType === ModalTypeEnum.Create) {
        const newAccount: IAccountDataProps = {
          key: `${dataSource.length + 1}`,
          ...values,
        };
        setDataSource([...dataSource, newAccount]); // 添加到表格数据中
        showMessage("成功创建账号！");
      } else if (modalType === ModalTypeEnum.Modify && selectedAccount) {
        const updatedDataSource = dataSource.map((item) =>
          item.key === selectedAccount.key ? { ...item, ...values } : item
        );
        setDataSource(updatedDataSource);
        setSelectedAccount(null);
        showMessage("成功修改角色！");
      }

      setOpenModal(false); // 关闭模态框
    } catch (error) {
      console.error("表单验证失败:", error);
    }
  };

  //角色修改
  const handleModifyRole = (record: IAccountDataProps) => {
    setSelectedAccount(record);

    form.setFieldsValue({
      accountName: record.accountName,
      role: record.role,
    });

    setOpenModal(true);

    setModalType(ModalTypeEnum.Modify);
  };

  //角色修改权限
  const canModifyRole = (record: IAccountDataProps) => {
    if (record.role === currentUserRole) {
      return record.accountName !== currentUserAccountName;
    } else if (record.role === RoleEnum.Admin) {
      return;
    }
    return false;
  };

  //删除账号完成
  const handleDeleteAccount = () => {
    if (selectedAccount) {
      const updatedDataSource = dataSource.filter(
        (item) => item.key !== selectedAccount.key
      );

      if (selectedAccount.accountName === currentUserAccountName) {
        navigate("/");
      }

      setDataSource(updatedDataSource);

      setOpenDeletePopups(false);

      showMessage("成功刪除帳號！");
    }
  };

  //刪除權限
  const canDelete = (record: IAccountDataProps) => {
    if (record.role === currentUserRole) {
      return record.accountName !== currentUserAccountName;
    } else if (record.role) {
      return;
    }

    return false;
  };

  //删除賬號
  const handleOpenDeleteOk = (record: IAccountDataProps) => {
    setSelectedAccount(record);
    setOpenDeletePopups(true);
  };

  //取消
  const handleCancel = () => {
    setOpenModal(false);
    setOpenDeletePopups(false);
  };

  // 顯示操作提示信息
  const showMessage = (text: string) => {
    setMessageText(text);

    setTimeout(() => {
      setMessageText("");
    }, 1000);
  };

  //複製賬號信息
  const handleCopy = (accountName: string, password: string) => {
    const content = `账号: ${accountName}, 密码: ${password}`;

    navigator.clipboard.writeText(content).then(() => {
      showMessage("已複製！");
    });
  };

  const getHeight = () => {
    const bodyHeight = document.body.clientHeight; // 获取页面的可视高度
    const headerHeight =
      document.getElementsByClassName("header-top")[0]?.getBoundingClientRect()
        ?.height || 0; // 获取头部高度
    const tableHeadHeight =
      document
        .getElementsByClassName("ant-table-thead")[0]
        ?.getBoundingClientRect()?.height || 0; // 获取表格头部高度

    const h = bodyHeight - headerHeight - 64 - 64 - 48 - tableHeadHeight; // 动态计算剩余的可用高度
    setHeight(h > 0 ? h : 0); // 如果高度计算结果为负数，设置为0；否则更新高度状态
  };

  useEffect(() => {
    getHeight(); // 页面加载完成后计算表格高度

    window.addEventListener("resize", getHeight); // 监听窗口大小变化，动态更新表格高度

    return () => {
      window.removeEventListener("resize", getHeight); // 在组件卸载时移除事件监听，防止内存泄漏
    };
  }, []);

  return {
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
  };
};
