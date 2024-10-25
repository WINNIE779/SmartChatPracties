import React from "react";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Input, Radio, Switch } from "antd";
import { isEmpty, isNil } from "ramda";
import { useCallback } from "react";
import { useAction } from "./hook";
import {
  IDentifyFileDetectStatus,
  IFunEvent,
  IRecognitionFileComponentProps,
} from "../upload/prop";
import { arrowIcon } from "@/icon";
import Icon from "@ant-design/icons";

const selectItemCss = (isTrue: boolean, isCheck: boolean) => {
  return `${
    isTrue
      ? "bg-gradient-to-r from-[#48A7FF] to-[#796DFF] text-white"
      : "text-[#323444]"
  } ${
    !isCheck ? "flex-1" : "w-32 inline-block"
  } box-border py-2 px-3 rounded-2xl text-center cursor-pointer select-none text-sm`;
};

const tab = [
  {
    label: "問題反饋",
    isCheck: true,
    value: IFunEvent.Question,
  },
  {
    label: "識別結果",
    isCheck: false,
    value: IFunEvent.Identify,
  },
  {
    label: "核對結果",
    isCheck: false,
    value: IFunEvent.Check,
  },
  {
    label: "請求參數",
    isCheck: false,
    value: IFunEvent.Request,
  },
];

const selectQuestionType = [
  {
    key: "識別結果錯誤",
    value: "識別結果錯誤",
  },
  {
    key: "核對結果錯誤",
    value: "核對結果錯誤",
  },
  {
    key: "請求參數無效",
    value: "請求參數無效",
  },
  {
    key: "功能咨詢",
    value: "功能咨詢",
  },
  {
    key: "漏識別",
    value: "漏識別",
  },
  {
    key: "其他",
    value: "其他",
  },
];

export const RecognitionFileComponent = (
  props: IRecognitionFileComponentProps
) => {
  const {
    isCheck,
    requestParams,
    recognizedJson,
    detectionJson,
    updateRequestParams,
    question,
    feedbackTag,
    recognizedRecordld,
    sectionld,
    fileIDentifyFileDetectStatus,
    fileType,
  } = props;

  const {
    selectSee,
    tabRef,
    identifyRef,
    checkRef,
    requestRef,
    description,
    questionTypes,
    isClickFeedback,
    isOnlyDisplayError,
    setSelectSee,
    setDescription,
    setIsClickFeedback,
    upadteQuestionType,
    setIsOnlyDisplayError,
    submitQeustionFeedback,
  } = useAction({ isCheck, fileType });

  const renderRecognizedItem = useCallback(
    (key: string, value: any, index: number) => {
      const dataType = typeof value;

      switch (dataType) {
        case "object":
          if (!isNil(value)) {
            if (Array.isArray(value)) {
              return (
                <div key={index} className="space-y-2">
                  {(value as any[]).map((item, subIndex) => {
                    const data = Object.entries(item);

                    return data.map(([key, value], idx) =>
                      renderRecognizedItem(
                        key,
                        value,
                        subIndex * data.length + idx
                      )
                    );
                  })}
                </div>
              );
            } else {
              const data = Object.entries(value);

              return (
                <div key={index} className="space-y-2">
                  <span className="text-sm">{key}</span>
                  {data.map(([key, value], idx) =>
                    renderRecognizedItem(key, value, idx)
                  )}
                </div>
              );
            }
          } else return <div key={index} />;
        case "string":
          return (
            <div key={index} className="text-sm w-full break-words">
              {key} : {value}
            </div>
          );
        case "boolean":
          return (
            <div key={index} className="flex space-x-2">
              <div className="flex-1 text-sm flex items-center break-words">
                {key}
              </div>
              {renderDetectionrResult(value)}
            </div>
          );
      }
    },
    []
  );

  // 識別
  const renderRecognizedJson = useCallback(() => {
    if (
      (isNil(recognizedJson) || isEmpty(recognizedJson)) &&
      fileIDentifyFileDetectStatus !== IDentifyFileDetectStatus.Failed &&
      fileIDentifyFileDetectStatus !== IDentifyFileDetectStatus.Success
    )
      return null;

    let ObjConvertList: [key: string, value: any][] = [];

    try {
      ObjConvertList = recognizedJson
        ? Object.entries(JSON.parse(recognizedJson) as { [key: string]: any })
        : [];
    } catch {
      ObjConvertList = [];
    }

    return (
      <div
        className={`${
          isCheck && "max-w-96"
        } flex h-[calc(100%-0rem)] flex-col space-y-2`}
      >
        <div
          className={`h-full box-border pr-2 ${
            isCheck ? "overflow-y-auto" : "overflow-y-scroll"
          } space-y-2`}
          ref={identifyRef}
        >
          {fileIDentifyFileDetectStatus === IDentifyFileDetectStatus.Failed ? (
            <div>本次識別失敗，請重試</div>
          ) : (
            (ObjConvertList ?? []).map(([key, value], index) => {
              return renderRecognizedItem(key, value, index);
            })
          )}
        </div>
        {!isCheck &&
          (fileIDentifyFileDetectStatus === IDentifyFileDetectStatus.Success ||
            fileIDentifyFileDetectStatus ===
              IDentifyFileDetectStatus.Failed) && (
            <div className="text-sm font-medium text-center py-1">
              若識別有誤，請
              <span
                className="text-[#697FFF] cursor-pointer"
                onClick={() => setIsClickFeedback(true)}
              >
                點擊反饋
              </span>
            </div>
          )}
      </div>
    );
  }, [recognizedJson, fileIDentifyFileDetectStatus, isCheck]);

  const renderDetectionrResult = useCallback((isSuccess: boolean) => {
    return (
      <div
        className={`${
          isSuccess
            ? "text-[#34A46E] bg-[#EBF9F3]"
            : "text-[#F04E4E] bg-[#FFF2F2]"
        } text-sm font-medium space-x-1 py-1 px-3 rounded-3xl shrink-0 max-h-7`}
      >
        {isSuccess ? (
          <>
            <CheckCircleOutlined />
            <span>正常</span>
          </>
        ) : (
          <>
            <CloseCircleOutlined />
            <span>異常</span>
          </>
        )}
      </div>
    );
  }, []);

  // 核對
  const renderDetectionJson = useCallback(() => {
    if (
      (isNil(recognizedJson) || isEmpty(recognizedJson)) &&
      fileIDentifyFileDetectStatus !== IDentifyFileDetectStatus.Failed &&
      fileIDentifyFileDetectStatus !== IDentifyFileDetectStatus.Success
    )
      return null;

    let ObjConvertList: [key: string, value: boolean][] = [];

    try {
      ObjConvertList = detectionJson
        ? Object.entries(
            JSON.parse(detectionJson) as { [key: string]: boolean }
          )
        : [];
    } catch {
      ObjConvertList = [];
    }

    const isSuccess = ObjConvertList.every(([_, value]) => value);

    const data =
      isSuccess || (!isSuccess && !isOnlyDisplayError)
        ? ObjConvertList
        : ObjConvertList.filter(([_, value]) => !value);

    return (
      <div
        className={`${
          isCheck && "max-w-96"
        } h-[calc(100%-0rem)] flex-col flex pr-2 mb-6 box-border space-y-2 ${
          isCheck ? "overflow-y-auto" : "overflow-y-scroll"
        }`}
        ref={checkRef}
      >
        {fileIDentifyFileDetectStatus === IDentifyFileDetectStatus.Failed ? (
          <div>本次識別失敗，請重試</div>
        ) : (
          <>
            {ObjConvertList.length > 0 && (
              <div
                className={`w-full ${
                  isSuccess ? "bg-[#EBF9F3]" : "bg-[#FFF2F2]"
                } px-2 py-1 box-border flex justify-center items-center space-x-0 mb-2`}
              >
                <span className="text-base text-[#323444] font-medium">
                  核對結果
                </span>
                {renderDetectionrResult(isSuccess)}
              </div>
            )}

            {!isCheck && !isSuccess && (
              <div className="flex justify-end space-x-2 items-center">
                <span className="text-xs">僅顯示異常</span>
                <Switch
                  checked={isOnlyDisplayError}
                  onChange={(e) => setIsOnlyDisplayError(e)}
                />
              </div>
            )}

            {(data ?? []).map(([key, value], index) => {
              return renderRecognizedItem(key, value, index);
            })}
          </>
        )}
      </div>
    );
  }, [
    detectionJson,
    isCheck,
    isOnlyDisplayError,
    fileIDentifyFileDetectStatus,
  ]);

  const renderParams = useCallback(() => {
    return (
      <div
        className={`flex h-full flex-col ${
          isCheck ? "overflow-y-auto max-w-96" : "overflow-y-scroll"
        } pr-2`}
        ref={requestRef}
      >
        {requestParams.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col space-y-2 ${
              index !== requestParams.length - 1
                ? !isCheck
                  ? "pb-4 border-b border-[#E7E8EE] border-t-0 border-l-0 border-r-0 border-solid"
                  : "mb-4"
                : ""
            }
        ${index > 0 && "mt-4"}`}
          >
            <span className="text-sm text-[#323444]">
              {item.value} ({item.description})
            </span>
            <div className="">
              <Radio.Group
                onChange={(e) =>
                  updateRequestParams &&
                  updateRequestParams(item.jsonObjKeyName, e.target.value)
                }
                disabled={
                  isCheck ||
                  (!isNil(fileIDentifyFileDetectStatus) &&
                    fileIDentifyFileDetectStatus !==
                      IDentifyFileDetectStatus.Failed &&
                    fileIDentifyFileDetectStatus !==
                      IDentifyFileDetectStatus.Success)
                }
                className="w-full flex justify-between"
                value={item.open}
              >
                <Radio value={true}>開啟</Radio>
                <Radio value={false}>關閉</Radio>
              </Radio.Group>
            </div>
          </div>
        ))}
      </div>
    );
  }, [requestParams, isCheck, fileIDentifyFileDetectStatus]);

  const renderQuestionFeedback = useCallback(() => {
    return (
      <div className="w-full space-y-6 text-sm break-words">
        <div>問題類型 : {feedbackTag ?? ""}</div>
        <div>問題描述 : {question ?? ""}</div>
      </div>
    );
  }, [question, feedbackTag]);

  const endShowTab = isCheck ? tab : tab.filter((item) => !item.isCheck);

  return (
    <div
      className={`w-full h-[calc(100%-0rem)] bg-[#FFFFFF] box-border rounded-2xl space-y-4 px-6 py-4 ${
        isCheck ? "" : "flex flex-col"
      }`}
      id="box-container"
    >
      {isClickFeedback ? (
        <div className="flex flex-col overflow-y-auto no-scrollbar">
          {/*問題反饋ui */}
          <div className="flex justify-start items-center text-[#323444] text-[1.13rem] font-semibold">
            <Icon
              component={arrowIcon}
              className="mr-1"
              onClick={() => setIsClickFeedback(false)}
            />
            問題反饋
          </div>
          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <div className="text-[red] text-[0.88rem] my-6">
                *<span className="text-[#5F6279] font-semibold">問題類型</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectQuestionType.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      questionTypes.includes(item.value)
                        ? "bg-gradient-to-r from-[#48A7FF] to-[#796DFF] text-white"
                        : "bg-[#F0F4FF] text-[#697FFF]"
                    } rounded-lg p-2 text-center shrink-0 cursor-pointer`}
                    onClick={() => upadteQuestionType(item.value)}
                  >
                    {item.key}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[#5F6279]">問題描述（選填）</div>
              <Input.TextArea
                autoSize={{
                  minRows: 4,
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="請詳細描述問題，有助於我們定位問題，不超過200字"
                maxLength={200}
              />
            </div>

            <div
              className="flex justify-center w-full text-sm py-3 bg-[#697FFF] rounded-lg text-white cursor-pointer"
              onClick={() => {
                submitQeustionFeedback(recognizedRecordld, sectionld);
              }}
            >
              提交
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`${
              !isCheck ? "flex-nowrap flex" : "inline-flex"
            } bg-[#F8F8F8] p-1 box-border rounded-2xl`}
            ref={tabRef}
          >
            {endShowTab.map((item, index) => (
              <div
                key={index}
                className={`${selectItemCss(
                  selectSee === item.value,
                  isCheck
                )}`}
                onClick={() => {
                  if (selectSee !== item.value) {
                    setSelectSee(() => item.value);
                    if (identifyRef.current) identifyRef.current.scrollTop = 0;
                    if (checkRef.current) checkRef.current.scrollTop = 0;
                    if (requestRef.current) requestRef.current.scrollTop = 0;
                  }
                }}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div className="box-border" id="box-main">
            {selectSee === IFunEvent.Identify ? (
              <>{renderRecognizedJson()}</>
            ) : selectSee === IFunEvent.Check ? (
              <>{renderDetectionJson()}</>
            ) : selectSee === IFunEvent.Request ? (
              <>{renderParams()}</>
            ) : selectSee === IFunEvent.Question ? (
              <>{renderQuestionFeedback()}</>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
