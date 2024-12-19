import { useMemoizedFn, useUpdateEffect, useDebounceFn } from "ahooks";
import { clone, equals, isEmpty, isNil } from "ramda";
import { useEffect, useMemo, useRef, useState } from "react";
import { Modal, message } from "antd";

import {
  GetConversationItems,
  GetConversations,
  GetRecords,
  PostConversationAdd,
  PostManualOrder,
} from "@/services/api/conversation";
import {
  IConversationItem,
  IItem,
  IItems,
  IRecordItem,
  Operate,
  phoneOrderRestaurantLabel,
} from "@/services/api/conversation/dto";
import { useNavigate } from "react-router-dom";

export enum AddConversationType {
  First,
  Before,
  After,
  Last,
}

export interface IRecordDto {
  records: IRecordItem[];
  loading: boolean;
}

export interface IConversationDto extends IItems {
  recordId: number | null;
  conversations: IConversationItem[];
  originalConversations: IConversationItem[];
  transcriptionText: string;
  url: string;
  loading: boolean;
}

export interface IOrder {
  manualItems: IItem[];
  aiItems: IItem[];
  manualOrderId: string | null;
}

export interface IChatHistory {
  conversations: IConversationItem[];
  originalConversations: IConversationItem[];
}

const defaultOrder: IOrder = {
  manualItems: [],
  aiItems: [],
  manualOrderId: null,
};

const defaultChatHistory: IChatHistory = {
  conversations: [],
  originalConversations: [],
};

export const useAction = () => {
  const navigate = useNavigate();

  const isLeavePage = useRef<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const actionRef = useRef<HTMLDivElement>(null);

  const tipRef = useRef<HTMLDivElement>(null);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // 餐馆聊天列表
  const [recordDto, setRecordDto] = useState<IRecordDto>({
    loading: false,
    records: [],
  });

  // 选择的餐馆
  const [selectRestaurant, setSelectRestaurant] = useState<{
    key: number;
    value: string;
  }>(phoneOrderRestaurantLabel()[0]);

  // 上次选择的餐馆
  const lastClickRestaurant = useRef<{
    key: number;
    value: string;
  }>(phoneOrderRestaurantLabel()[0]);

  // 选中的聊天信息
  const [conversationDto, setConversationDto] = useState<IConversationDto>({
    recordId: null,
    conversations: [],
    originalConversations: [],
    manualItems: [],
    aiItems: [],
    manualOrderId: null,
    url: "",
    transcriptionText: "",
    loading: false,
  });

  const [drawerState, setDrawerState] = useState<boolean>(false);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const lastConversationRecordId = useRef<number | null>(null);

  const [bindOrder, setBindOrder] = useState<{
    number: string;
    loading: boolean;
  }>({
    number: "",
    loading: false,
  });

  // 公共方法
  const isNotEmpty = useMemoizedFn(
    (data: any, type: "string" | "number" | "object") => {
      switch (type) {
        case "object":
        case "string":
          return !isNil(data) && !isEmpty(data);
        case "number":
          return !isNil(data);
      }
    }
  );

  const bindSubmitDisabled = useMemo(() => {
    return (
      !isNotEmpty(bindOrder.number, "string") ||
      (isNotEmpty(conversationDto?.manualOrderId, "number") &&
        bindOrder?.number === conversationDto.manualOrderId?.toString())
    );
  }, [bindOrder.number, conversationDto.manualOrderId]);

  const handleChangeBindOrder = useMemoizedFn(
    (data: Partial<{ number: string; loading: boolean }>) => {
      setBindOrder((prev) => ({
        ...prev,
        ...data,
      }));
    }
  );

  const { run: handleBindOrderRecord } = useDebounceFn(
    useMemoizedFn(() => {
      let isDoneLoading = false;

      if (
        isNotEmpty(selectRestaurant.key, "number") &&
        isNotEmpty(conversationDto.recordId, "number") &&
        isNotEmpty(bindOrder.number, "string")
      ) {
        handleChangeBindOrder({ loading: true });

        PostManualOrder({
          orderId: bindOrder.number,
          recordId: conversationDto.recordId!,
          restaurant: selectRestaurant.key,
        })
          .then(() => {
            promiseLoadConversationData(conversationDto.recordId!, "Order");
          })
          .catch(() => {
            message.error("綁定訂單失敗，請重試");
            isDoneLoading = true;
          })
          .finally(() => {
            isDoneLoading && handleChangeBindOrder({ loading: false });
          });
      } else {
        message.warning("请输入订单号");
      }
    }),
    {
      wait: 100,
    }
  );

  const handleDrawerState = (state: boolean) => {
    setDrawerState(() => state);
  };

  // 获取餐馆聊天列表
  const loadRecords = useMemoizedFn(
    (recordId: number, isFirst: boolean = false) => {
      if (isLeavePage.current) return;

      if (lastClickRestaurant.current.key !== recordId) return;

      isFirst && updateRecordDto({ loading: true });

      GetRecords(recordId)
        .then((res) => {
          updateRecordDto({ records: res ?? [] });
        })
        .catch(() => {
          updateRecordDto({ records: [] });
        })
        .finally(() => {
          isFirst && updateRecordDto({ loading: false });

          setTimeout(() => {
            loadRecords(recordId);
          }, 4000);
        });
    }
  );

  // 更新餐馆聊天列表方法
  const updateRecordDto = useMemoizedFn((data: Partial<IRecordDto>) => {
    setRecordDto((prev) => ({
      ...prev,
      ...data,
    }));
  });

  // 切换餐馆
  const handleChangeRestaurant = useMemoizedFn((_, option: any) => {
    setSelectRestaurant(() => option);

    lastClickRestaurant.current = option;
  });

  // 获取聊天记录
  const loadConversations = useMemoizedFn(async (recordId: number) => {
    let data: IChatHistory = defaultChatHistory;

    await GetConversations(recordId)
      .then((res) => {
        data = {
          conversations: res ?? [],
          originalConversations: res ?? [],
        };
      })
      .catch(() => (data = defaultChatHistory));

    return data;
  });

  // 获取订单信息
  const loadItems = useMemoizedFn(async (recordId: number) => {
    let data: IOrder = defaultOrder;

    handleChangeBindOrder({ loading: true });

    await GetConversationItems(recordId)
      .then(
        (res) =>
          (data = {
            manualItems: res?.manualItems ?? [],
            aiItems: res?.aiItems ?? [],
            manualOrderId: res?.manualOrderId ?? null,
          })
      )
      .catch(() => (data = defaultOrder))
      .finally(() => {
        handleChangeBindOrder({ loading: false });
      });

    return data;
  });

  const promiseLoadConversationData = useMemoizedFn(
    (recordId: number, type: "Order" | "ChatHistory" | "All") => {
      lastConversationRecordId.current === recordId &&
        updateConversationDto({
          loading: true,
        });

      let requests = [];

      if (type === "ChatHistory" || type === "All") {
        requests.push(loadConversations(recordId!));
      }
      if (type === "Order" || type === "All") {
        requests.push(loadItems(recordId!));
      }

      Promise.all(requests)
        .then((results) => {
          if (lastConversationRecordId.current === recordId) {
            let conversationsRes: IChatHistory = defaultChatHistory;

            let itemsRes: IOrder = defaultOrder;

            // 根据请求的数量来处理返回值
            if (type === "ChatHistory" || type === "All") {
              conversationsRes = results[0] as IChatHistory;
            }

            if (type === "Order" || type === "All") {
              itemsRes = results[results.length - 1] as IOrder;
            }

            switch (type) {
              case "Order":
                updateConversationDto({
                  manualItems: itemsRes?.manualItems ?? [],
                  aiItems: itemsRes?.aiItems ?? [],
                  manualOrderId: itemsRes?.manualOrderId ?? null,
                });
                break;
              case "ChatHistory":
                updateConversationDto({
                  conversations: conversationsRes?.conversations ?? [],
                  originalConversations:
                    conversationsRes?.originalConversations ?? [],
                });
                break;
              case "All":
                updateConversationDto({
                  conversations: conversationsRes?.conversations ?? [],
                  originalConversations:
                    conversationsRes?.originalConversations ?? [],
                  manualItems: itemsRes?.manualItems ?? [],
                  aiItems: itemsRes?.aiItems ?? [],
                  manualOrderId: itemsRes?.manualOrderId ?? null,
                });
                break;
            }
          }
        })
        .catch(() => {
          lastConversationRecordId.current === recordId &&
            updateConversationDto({
              conversations: [],
              originalConversations: [],
              manualItems: [],
              aiItems: [],
              manualOrderId: null,
            });
        })
        .finally(() => {
          updateConversationDto({
            loading: false,
          });
        });
    }
  );

  // 添加聊天 Item
  const addConversation = useMemoizedFn(
    (type: AddConversationType, index?: number) => {
      if (conversationDto.recordId && conversationDto.conversations) {
        const data = clone(conversationDto.conversations);

        switch (type) {
          case AddConversationType.First:
            data.unshift({
              recordId: conversationDto.recordId,
              question: "",
              answer: "",
              order: 0,
              isEdit: true,
              operate: Operate.Add,
            });

            break;

          case AddConversationType.Before:
            data.splice(index!, 0, {
              recordId: conversationDto.recordId,
              question: "",
              answer: "",
              order: 0,
              isEdit: true,
              operate: Operate.Add,
            });

            break;

          case AddConversationType.After:
            data.splice(index! + 1, 0, {
              recordId: conversationDto.recordId,
              question: "",
              answer: "",
              order: 0,
              isEdit: true,
              operate: Operate.Add,
            });

            break;

          case AddConversationType.Last:
            data.push({
              recordId: conversationDto.recordId,
              question: "",
              answer: "",
              order: 0,
              isEdit: true,
              operate: Operate.Add,
            });

            break;
        }

        updateConversationDto({
          conversations: data,
        });
      }
    }
  );

  // 删除聊天 Item
  const deleteConversation = useMemoizedFn((index: number) => {
    if (conversationDto.recordId && conversationDto.conversations) {
      let data = clone(conversationDto.conversations);

      data = data.filter((_, i) => i !== index);

      updateConversationDto({
        conversations: data,
      });
    }
  });

  const { run: submitConversation } = useDebounceFn(
    useMemoizedFn(
      (
        isLoad: boolean = false,
        recordId: number = conversationDto.recordId!,
        conversations: IConversationItem[] = conversationDto.conversations!
      ) => {
        if (recordId && conversations) {
          const newConversations = clone(conversations).map((item, index) => ({
            ...item,
            order: index,
          }));

          isLoad && setSubmitLoading(() => true);

          PostConversationAdd({
            conversations: newConversations,
          })
            .then(() => {
              isLoad &&
                (() => {
                  message.success("提交成功");
                  recordId && promiseLoadConversationData(recordId!, "All");
                })();
            })
            .catch(() => {
              isLoad && message.error("提交失敗");
            })
            .finally(() => {
              isLoad && setSubmitLoading(() => false);
            });
        }
      }
    ),
    {
      wait: 100,
    }
  );

  const { run: cancelConversation } = useDebounceFn(
    useMemoizedFn(() => {
      const cloneData = clone(conversationDto);

      updateConversationDto({
        conversations: cloneData?.originalConversations,
      });
    }),
    {
      wait: 100,
    }
  );

  // 更新聊天信息
  const updateConversationDto = useMemoizedFn(
    (data: Partial<IConversationDto>) => {
      setConversationDto((prev) => ({
        ...prev,
        ...data,
      }));
    }
  );

  // 切换聊天记录
  const handleChangeConversation = useMemoizedFn(
    (recordId: number, transcriptionText: string, url: string) => {
      const cloneData = clone(conversationDto.recordId);

      conversationIsEdit
        ? Modal.confirm({
            title: "是否離開當前聊天?",
            content: "當前修改數據未保留,是否保留?",
            okText: "保留",
            cancelText: "不保留",
            async onOk() {
              try {
                await submitConversation(
                  false,
                  conversationDto.recordId,
                  conversationDto.conversations
                );

                message.success("保存成功");

                lastConversationRecordId.current = !equals(cloneData, recordId)
                  ? recordId
                  : null;

                updateConversationDto({
                  ...(!equals(cloneData, recordId)
                    ? {
                        recordId,
                        transcriptionText,
                        url,
                      }
                    : {
                        recordId: null,
                        transcriptionText: "",
                        url: "",
                      }),
                  ...{
                    conversations: [],
                    originalConversations: [],
                    manualItems: [],
                    aiItems: [],
                    loading: false,
                    manualOrderId: null,
                  },
                });
              } catch {
                message.error("保存失败");
              }
            },
            onCancel() {
              lastConversationRecordId.current = !equals(cloneData, recordId)
                ? recordId
                : null;

              updateConversationDto({
                ...(!equals(cloneData, recordId)
                  ? {
                      recordId,
                      transcriptionText,
                      url,
                    }
                  : {
                      recordId: null,
                      transcriptionText: "",
                      url: "",
                    }),
                ...{
                  conversations: [],
                  originalConversations: [],
                  manualItems: [],
                  aiItems: [],
                  loading: false,
                  manualOrderId: null,
                },
              });
            },
          })
        : (() => {
            lastConversationRecordId.current = !equals(cloneData, recordId)
              ? recordId
              : null;

            updateConversationDto({
              ...(!equals(cloneData, recordId)
                ? {
                    recordId,
                    transcriptionText,
                    url,
                  }
                : {
                    recordId: null,
                    transcriptionText: "",
                    url: "",
                  }),
              ...{
                conversations: [],
                originalConversations: [],
                manualItems: [],
                aiItems: [],
                loading: false,
                manualOrderId: null,
              },
            });
          })();
    }
  );

  const conversationIsEdit = useMemo(() => {
    if (conversationDto.recordId && conversationDto.conversations) {
      if (
        conversationDto?.conversations.some(
          (item) => !isNil(item?.operate) && item.operate === Operate.Edit
        ) ||
        (conversationDto?.conversations ?? []).filter(
          (item) => item.operate !== Operate.Add
        ).length !== conversationDto?.originalConversations?.length
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }, [conversationDto.recordId, conversationDto.conversations]);

  useEffect(() => {
    if (isNotEmpty(selectRestaurant.key, "number")) {
      loadRecords(selectRestaurant.key, true);
      updateConversationDto({
        recordId: null,
        conversations: [],
        originalConversations: [],
        manualItems: [],
        aiItems: [],
        url: "",
        transcriptionText: "",
        loading: false,
        manualOrderId: null,
      });
    }
  }, [selectRestaurant.key]);

  useUpdateEffect(() => {
    if (isNotEmpty(conversationDto.recordId, "number")) {
      promiseLoadConversationData(conversationDto.recordId!, "All");
    }
  }, [conversationDto.recordId]);

  useUpdateEffect(() => {
    if (isNotEmpty(conversationDto.recordId, "number")) {
      handleChangeBindOrder({
        number: isNotEmpty(conversationDto.manualOrderId, "string")
          ? conversationDto.manualOrderId?.toString()
          : "",
      });
    }
  }, [conversationDto.recordId, conversationDto.manualOrderId]);

  // 移除為Add類型的item
  const handleClick = useMemoizedFn((event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const clickItems = document.querySelectorAll(".find-item");

    const isClickItemOrChild = Array.from(clickItems).some((item) =>
      item.contains(target)
    );

    if (!isClickItemOrChild && !target.classList.contains("find-item")) {
      if (conversationDto.recordId && conversationDto.conversations) {
        const data = clone(conversationDto);

        const conversations = data?.conversations
          ?.filter(
            (item) =>
              !item.isEdit ||
              (item.isEdit &&
                (isNotEmpty(item.question, "string") ||
                  isNotEmpty(item.answer, "string")))
          )
          .map((item) => {
            if (
              isNotEmpty(item.answer, "string") &&
              isNotEmpty(item.question, "string")
            )
              item.isEdit = false;

            return item;
          });

        updateConversationDto({
          conversations,
        });
      }
    }
  });

  const updateFixedDivPosition = () => {
    if (tipRef.current && actionRef.current) {
      const fixedDiv = tipRef.current;

      fixedDiv.style.left = `${
        window.innerWidth - (actionRef.current?.offsetWidth ?? 0) - 64
      }px`;
    }
  };

  useEffect(() => {
    updateFixedDivPosition();

    window.addEventListener("resize", updateFixedDivPosition);
    document.addEventListener("click", handleClick);

    return () => {
      isLeavePage.current = true;
      window.removeEventListener("resize", updateFixedDivPosition);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return {
    navigate,
    tipRef,
    containerRef,
    actionRef,
    recordDto,
    conversationDto,
    selectRestaurant,
    isNotEmpty,
    handleChangeRestaurant,
    handleChangeConversation,
    hoverIndex,
    setHoverIndex,
    addConversation,
    deleteConversation,
    conversationIsEdit,
    updateConversationDto,
    submitConversation,
    cancelConversation,
    drawerState,
    handleDrawerState,
    submitLoading,
    bindOrder,
    handleChangeBindOrder,
    handleBindOrderRecord,
    bindSubmitDisabled,
  };
};
