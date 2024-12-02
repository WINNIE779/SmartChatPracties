import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Collapse,
  CollapseProps,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
  Select,
  Space,
  Spin,
  Tooltip,
} from "antd";

import dayjs from "dayjs";
import { clone, isEmpty, isNil } from "ramda";
import { useCallback } from "react";

import robotIcon from "@/assets/robot.png";
import {
  IConversationItem,
  IItem,
  Operate,
  phoneOrderRestaurantLabel,
} from "@/services/api/conversation/dto";

import { AddConversationType, useAction } from "./hook";
import { useAuth } from "@/hooks/use-auth";

const { TextArea } = Input;

const allCenter = "flex justify-center items-center";

export enum Type {
  Question,
  Answer,
}

const convertItem = (item: IConversationItem) => {
  const data: {
    content: string;
    type: Type;
    date: string;
    isEdit: boolean;
    operate: Operate | null;
  }[] = [
    {
      content: "",
      type: Type.Question,
      date: "",
      isEdit: false,
      operate: null,
    },
    {
      content: "",
      type: Type.Answer,
      date: "",
      isEdit: false,
      operate: null,
    },
  ];

  Object.keys(item).forEach((i) => {
    if (["question", "answer"].includes(i)) {
      if (i === "question") {
        data[0].content = item.question;
        data[0].date = item?.createdDate ?? "";
        data[0].isEdit = !(isNil(item.isEdit) || !item.isEdit);
        data[0].operate = item?.operate ?? null;
      } else if (i === "answer") {
        data[1].content = item.answer;
        data[1].date = item?.createdDate ?? "";
        data[1].isEdit = !(isNil(item.isEdit) || !item.isEdit);
        data[1].operate = item?.operate ?? null;
      }
    }
  });

  // return data.filter((item) => !isNil(item.content) && !isEmpty(item.content));
  return data;
};

export const Main = () => {
  const { signOut, userName } = useAuth();

  const {
    tipRef,
    navigate,
    containerRef,
    actionRef,
    recordDto,
    conversationDto,
    selectRestaurant,
    isNotEmpty,
    handleChangeRestaurant,
    handleChangeConversation,
    hoverIndex,
    addConversation,
    deleteConversation,
    conversationIsEdit,
    updateConversationDto,
    submitConversation,
    cancelConversation,
    drawerState,
    handleDrawerState,
    submitLoading,
    setHoverIndex,
    bindOrder,
    handleChangeBindOrder,
    handleBindOrderRecord,
    bindSubmitDisabled,
  } = useAction();

  const renderConversationList = useCallback(() => {
    return (
      <div className="w-2/5 lg:w-1/5 lg:min-w-[19rem] shrink-0 h-full overflow-y-auto no-scrollbar box-border border-solid border-[#e7e7e7] border-r-[1.5px]">
        {recordDto.loading ? (
          <div className={`w-full h-full ${allCenter}`}>
            <Spin />
          </div>
        ) : (
          <>
            {recordDto.records.map((item, index) => (
              <div
                key={index}
                className={`w-full px-5 box-border ${
                  index === 0
                    ? "pt-6 pb-3"
                    : index === 14
                    ? "pt-3 pb-6"
                    : "py-3"
                }`}
              >
                <div
                  className={`cursor-pointer flex items-center space-x-2 box-border rounded-lg p-2 ${
                    isNotEmpty(conversationDto?.recordId, "number") &&
                    isNotEmpty(item, "object") &&
                    item?.id === conversationDto?.recordId &&
                    "bg-[#ececec]"
                  }`}
                  onClick={() =>
                    isNotEmpty(item?.id, "number") &&
                    handleChangeConversation(
                      item?.id,
                      item.transcriptionText,
                      item?.url
                    )
                  }
                >
                  <div
                    className={`${
                      item?.lastModifiedBy !== null
                        ? "w-[calc(100%-3rem)]"
                        : "w-full"
                    } truncate grow-0 box-border space-y-1`}
                  >
                    <div className="truncate flex-1 text-base font-medium">
                      {isNotEmpty(item?.createdDate, "string") &&
                        dayjs
                          .utc(item.createdDate)
                          .format("HH:mm A, D MMM YYYY")}
                    </div>
                    <div className="truncate flex-1 text-sm text-[#64748b] min-h-5">
                      {isNotEmpty(item?.tips ?? "", "string") && item.tips}
                    </div>
                  </div>
                  {item?.lastModifiedBy !== null && (
                    <Tooltip
                      title={item?.userAccount?.userName ?? ""}
                      placement="top"
                    >
                      <div className="w-10 h-10 flex justify-center items-center grow-0 rounded-full bg-[#fb923c]">
                        {(item?.userAccount?.userName ?? "").charAt(0)}
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }, [recordDto.loading, recordDto.records, conversationDto.recordId]);

  const renderConversationDetail = useCallback(() => {
    const data = conversationDto.conversations ?? [];

    return (
      <div className="flex-1 box-border border-solid border-r-[1.5px] border-[#e7e7e7] h-full py-5 px-4 relative flex flex-col find-item">
        {/* 不需要悬浮+ */}
        <div
          className={`fixed top-[88px] z-10 box-content py-2 px-4 rounded-full bg-white flex space-x-2 cursor-pointer find-item ${
            conversationDto?.recordId &&
            data.length === 0 &&
            !conversationDto?.loading
              ? "block"
              : "hidden"
          }`}
          ref={tipRef}
          onClick={() =>
            conversationDto?.recordId &&
            addConversation(AddConversationType.First)
          }
        >
          <PlusOutlined className="find-item" />
        </div>

        <div
          // ${
          //   conversationIsEdit ? "h-[calc(100%-50px)]" : "h-full"
          // }
          className={`w-full shrink h-full`}
        >
          {conversationDto.loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Spin />
            </div>
          ) : (
            <>
              <div
                className="flex-1 box-border h-[calc(100%-2rem)] overflow-y-auto no-scrollbar py-5 relative space-y-2"
                ref={containerRef}
                // onScroll={onScroll}
              >
                {isNotEmpty(data, "object") &&
                  isNotEmpty(conversationDto?.recordId, "number") &&
                  (data ?? []).map((item, index) =>
                    itemContent(convertItem(item), index, (data ?? []).length)
                  )}
                {/* <div
              className={`fixed bottom-4 box-content py-2 px-4 rounded-full bg-white flex space-x-2 cursor-pointer ${
                isHaveNewMessage ? "block" : "hidden"
              }`}
              ref={tipRef}
              onClick={() => isHaveNewMessage && scorllBottom()}
            >
              <DoubleRightOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
              <span>有新消息</span>
            </div> */}
              </div>
              {isNotEmpty(conversationDto.recordId, "number") && (
                <div className="h-[50px] w-full flex items-center justify-end box-border px-1 space-x-2">
                  <Button
                    className="rounded-full inline-block cursor-pointer select-none"
                    onClick={() =>
                      conversationIsEdit && submitConversation(true)
                    }
                    loading={submitLoading}
                    disabled={!conversationIsEdit}
                    type="primary"
                  >
                    提交
                  </Button>
                  <Button
                    className="rounded-full inline-block cursor-pointer select-none find-item"
                    onClick={() => cancelConversation()}
                    type="primary"
                  >
                    取消
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }, [
    conversationDto.conversations,
    conversationDto.recordId,
    hoverIndex,
    conversationIsEdit,
    conversationDto.loading,
    submitLoading,

    // clickConversationObj?.detailInformation?.conversations,
    // // isHaveNewMessage,
    // clickConversationObj?.sessionId,
    // conversationIsEdit,
    // hoverIndex,
  ]);

  const itemContent = useCallback(
    (
      data: {
        content: string;
        type: Type;
        date: string;
        isEdit: boolean;
        operate: Operate | null;
      }[],
      index: number,
      maxLength: number
    ) => {
      return (
        // hover:shadow-xl hover:rounded-lg
        <div
          className={`w-full box-border p-1 relative hover:shadow-xl hover:rounded-lg`}
          key={index}
          onMouseEnter={() => setHoverIndex(() => index)}
          onMouseLeave={() => setHoverIndex(() => null)}
        >
          {hoverIndex === index && (
            <div className="absolute right-2 z-10 -top-5 bg-white px-1 space-x-1 border border-solid border-[#e7e7e7] rounded-sm">
              {index === 0 && (
                <Tooltip title="首位添加">
                  <span
                    className="find-item"
                    onClick={() => addConversation(AddConversationType.First)}
                  >
                    首位
                  </span>
                </Tooltip>
              )}

              {index !== 0 && (
                <Tooltip title="往前添加">
                  <span
                    className="find-item"
                    onClick={() =>
                      addConversation(AddConversationType.Before, index)
                    }
                  >
                    往前
                  </span>
                </Tooltip>
              )}

              {maxLength > index && (
                <Tooltip title="往後添加">
                  <span
                    className="find-item"
                    onClick={() =>
                      addConversation(AddConversationType.After, index)
                    }
                  >
                    往後
                  </span>
                </Tooltip>
              )}

              {maxLength === index + 1 && (
                <Tooltip title="末尾添加">
                  <span
                    className="find-item"
                    onClick={() => addConversation(AddConversationType.Last)}
                  >
                    末尾
                  </span>
                </Tooltip>
              )}

              <Tooltip title="刪除">
                <span
                  className="find-item"
                  onClick={() => deleteConversation(index)}
                >
                  刪除
                </span>
              </Tooltip>
            </div>
          )}
          {data.map((item, i) =>
            renderItem(
              item.type === Type.Question,
              index * 2 + i,
              item.content,
              item.date,
              item.isEdit,
              index
              // item.operate
            )
          )}
        </div>
      );
    },
    [conversationDto.conversations, hoverIndex]
  );

  const renderItem = useCallback(
    (
      isQuestion: boolean,
      key: number,
      content: string,
      date: string,
      isEdit: boolean,
      index: number
      // operate: Operate | null
    ) => {
      return (
        <div
          className={`flex items-start ${
            !isQuestion && "flex-row-reverse"
          } space-y-2`}
          key={key}
        >
          {!isQuestion ? (
            <div className="w-10 h-10 shrink-0 mt-4">
              <Avatar className="w-full h-full bg-[#8bdbdb] box-border border border-solid border-[#8cc6c6] bg-opacity-80">
                U
              </Avatar>
            </div>
          ) : (
            <div
              className={`w-10 h-10 mt-4 shrink-0 bg-[#8bdbdb] box-border border border-solid border-[#8cc6c6] bg-opacity-80 rounded-full ${allCenter}`}
            >
              <img
                src={robotIcon}
                className="w-5 h-5 object-contain select-none img-no-darg"
                alt=""
              />
            </div>
          )}

          <div
            className={`relative ${
              !isQuestion ? "mr-[.325rem]" : "ml-[.325rem]"
            }`}
          >
            <div
              className={`text-[.75rem] text-[#AFAFB5] absolute w-20 flex items-center select-none ${
                !isQuestion && "right-0 justify-end"
              }`}
            >
              {isNotEmpty(date, "string") &&
                dayjs.utc(date).local().format("MM-DD HH:mm")}
            </div>
            {isEdit ? (
              <div
                className={`p-[.75rem] ${
                  isQuestion
                    ? "rounded-[.25rem_.75rem_.75rem_.75rem]"
                    : "rounded-[.75rem_.25rem_.75rem_.75rem]"
                } mt-5 lg:w-[22rem] min-w-[100px] shrink bg-[#d1d5db] find-item`}
              >
                <TextArea
                  autoSize={true}
                  value={content}
                  onChange={(e) => {
                    const data = clone(conversationDto);

                    if (data) {
                      const conversations = data?.conversations?.map(
                        (item, i) => {
                          if (index === i) {
                            if (isQuestion) {
                              item.question = e.target.value;
                            } else {
                              item.answer = e.target.value;
                            }
                            item.operate = Operate.Edit;
                          }
                          return item;
                        }
                      );

                      updateConversationDto({
                        conversations,
                      });
                    }
                  }}
                />
              </div>
            ) : (
              <div
                className={`p-[.75rem] ${
                  isQuestion
                    ? "rounded-[.25rem_.75rem_.75rem_.75rem]"
                    : "rounded-[.75rem_.25rem_.75rem_.75rem]"
                } break-words mt-5 lg:max-w-[22rem] max-w-44 md:max-w-60 w-full box-border shrink ${
                  // !isNil(operate)
                  //   ? "bg-[#f5f5f5] text-green-300"
                  //   : // isQuestion
                  //   ? "bg-red-300"
                  //   : "bg-green-300"
                  isQuestion
                    ? "bg-[#5B53FF] text-[#fff]"
                    : "bg-[#F1F1F6] text-[#343436]"
                }`}
                onClick={() => {
                  const data = clone(conversationDto);

                  if (data) {
                    const conversations = data?.conversations?.map(
                      (item, i) => {
                        if (index === i) {
                          item.isEdit = true;
                        }
                        return item;
                      }
                    );

                    updateConversationDto({
                      conversations,
                    });
                  }
                }}
              >
                {content}
              </div>
            )}
          </div>
        </div>
      );
    },
    [conversationDto.conversations]
  );

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "signOut":
        signOut(() => {
          navigate("/login");
        });

        break;

      case "accountManagement":
        navigate("/account");

        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="w-full flex items-center justify-center text-black select-none">
          {userName}
        </div>
      ),
      key: "userName",
      disabled: true,
    },
    {
      label: (
        <div className="w-full flex items-center justify-center text-black select-none">
          账号管理
        </div>
      ),
      key: "accountManagement",
    },
    {
      label: "sign out",
      key: "signOut",
    },
  ];

  const renderShoppingCart = useCallback(() => {
    if (!isNotEmpty(conversationDto?.recordId, "number")) return;

    return (
      // border-b border-solid p-5
      <div className="w-full box-border overflow-hidden space-y-2">
        {/* <div className="text-[#9ca3af] text-lg font-medium select-none">
          人工訂單
        </div> */}

        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="訂單綁定"
            value={bindOrder.number}
            onChange={(e) => {
              !bindOrder.loading &&
                handleChangeBindOrder({
                  number: e.target.value.replace(/[^0-9]/g, ""),
                });
            }}
          />
          <Button
            type="primary"
            onClick={handleBindOrderRecord}
            loading={bindOrder.loading}
            disabled={bindSubmitDisabled}
          >
            bind
          </Button>
        </Space.Compact>

        {!conversationDto?.loading &&
          isNotEmpty(conversationDto?.manualItems, "object") && (
            <div className="w-full box-border border-t border-b border-solid py-2">
              {(conversationDto?.manualItems ?? []).map((item, index) =>
                renderShoppingCartItem(item, index + 1)
              )}
            </div>
          )}
      </div>
    );
  }, [
    conversationDto?.manualItems,
    conversationDto?.recordId,
    conversationDto?.loading,
    bindOrder.number,
    bindSubmitDisabled,
    bindOrder.loading,
  ]);

  const renderAiShoppingCart = useCallback(() => {
    if (!isNotEmpty(conversationDto?.recordId, "number")) return;

    return (
      // border-b border-solid p-5
      <div className="w-full box-border overflow-hidden space-y-2">
        {/* <div className="text-[#9ca3af] text-lg font-medium select-none">
          AI訂單
        </div> */}
        {!conversationDto?.loading &&
          isNotEmpty(conversationDto?.aiItems, "object") && (
            <div className="w-full box-border border-t border-b border-solid py-2">
              {(conversationDto?.aiItems ?? []).map((item, index) =>
                renderShoppingCartItem(item, index + 1)
              )}
            </div>
          )}
      </div>
    );
  }, [
    conversationDto?.aiItems,
    conversationDto?.recordId,
    conversationDto?.loading,
  ]);

  const renderShoppingCartItem = useCallback((item: IItem, index: number) => {
    return (
      <div key={index} className="w-full flex space-x-2">
        <div className="shrink-0 w-10 select-none">{index}</div>
        <div className="flex-1 select-none">
          <div className="text-2xl break-words">
            {item.food_name} x {item.quantity}
          </div>
          {!isNil(item.note) && !isEmpty(item.note) && (
            <div className="break-words text-base">{item.note}</div>
          )}
        </div>
        <div className="shrink-0 w-20 text-right select-none">
          ${item.price}
        </div>
      </div>
    );
  }, []);

  const renderTransliteration = useCallback(() => {
    if (!isNotEmpty(conversationDto.recordId, "number")) return;

    return (
      // border-b border-solid p-5
      <div className="w-full box-border overflow-hidden space-y-2 p-5 break-all">
        {/* <div className="text-[#9ca3af] text-lg font-medium select-none">
          智能轉寫
        </div> */}
        {isNotEmpty(conversationDto.transcriptionText, "string") && (
          <div
            dangerouslySetInnerHTML={{
              __html: conversationDto.transcriptionText.replace(
                /\n/g,
                "<br />"
              ),
            }}
          />
        )}
      </div>
    );
  }, [conversationDto.transcriptionText, conversationDto?.recordId]);

  const renderAudio = useCallback(() => {
    if (!isNotEmpty(conversationDto?.recordId, "number")) return;

    return (
      <div className="w-full box-border flex flex-col justify-between space-y-2 p-5 border-b border-solid">
        <span className="text-lg select-none">Call Record</span>
        <audio
          src={conversationDto?.url}
          controls
          controlsList="nodownload"
          className="w-full"
        ></audio>
      </div>
    );
  }, [conversationDto?.url, conversationDto?.recordId]);

  const collapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: "人工訂單",
      children: renderShoppingCart(),
      showArrow: false,
    },
    {
      key: "2",
      label: "AI訂單",
      children: renderAiShoppingCart(),
      showArrow: false,
    },
    // {
    //   key: "4",
    //   label: "智能轉寫",
    //   children: renderTransliteration(),
    //   showArrow: false,
    // },
  ];

  return (
    <div className="w-screen h-screen bg-[#f9fafb] flex flex-col">
      <header className="p-5 text-2xl font-semibold flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Select
            className="find-item"
            value={selectRestaurant.value}
            style={{ width: 120 }}
            onChange={handleChangeRestaurant}
            options={phoneOrderRestaurantLabel()}
            popupClassName="find-item"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Dropdown menu={{ items, onClick }}>
            <Avatar style={{ backgroundColor: "#f56a00" }}>
              {userName.charAt(0)}
            </Avatar>
          </Dropdown>
          <div
            className="lg:hidden block cursor-pointer"
            onClick={() => conversationDto.recordId && handleDrawerState(true)}
          >
            <SettingOutlined />
          </div>
        </div>
      </header>
      <div className="flex h-[calc(100vh-72px)] box-border border-solid border-t-[1.5px]">
        {renderConversationList()}
        {renderConversationDetail()}

        <div
          className="w-1/4 hidden lg:block overflow-y-auto no-scrollbar"
          ref={actionRef}
        >
          {isNotEmpty(conversationDto?.recordId, "number") && (
            <Collapse
              defaultActiveKey={["1", "2"]}
              bordered={false}
              items={collapseItems}
            />
          )}
          {renderAudio()}
          {renderTransliteration()}
        </div>
      </div>

      <Drawer
        title="Shopping Cart"
        onClose={() => handleDrawerState(false)}
        open={drawerState}
      >
        <div className="w-full overflow-y-auto no-scrollbar">
          {isNotEmpty(conversationDto?.recordId, "number") && (
            <Collapse
              defaultActiveKey={["1", "2"]}
              bordered={false}
              items={collapseItems}
            />
          )}
          {renderAudio()}
          {renderTransliteration()}
        </div>
      </Drawer>
    </div>
  );
};
