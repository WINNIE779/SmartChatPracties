import { FeedbackAddRequest } from "@/services/dtos/upload";
import { App } from "antd";
import { useEffect, useRef, useState } from "react";

import { useDebounceFn, useMemoizedFn, useUpdateEffect } from "ahooks";
import { PostFeedbackAdd } from "@/services/api/upload";
import { isNil } from "ramda";
import React from "react";
import { IFileType, IFunEvent } from "@/services/dtos/public";

export const useAction = ({
  isCheck,
  fileType,
}: {
  isCheck: boolean;
  fileType?: IFileType | null;
}) => {
  const { message } = App.useApp();

  const [selectSee, setSelectSee] = useState<IFunEvent>(
    isCheck ? IFunEvent.Question : IFunEvent.Request
  );

  const [isOnlyDisplayError, setIsOnlyDisplayError] = useState<boolean>(false);

  const [isClickFeedback, setIsClickFeedback] = useState<boolean>(false);

  const [questionTypes, setQuestionType] = useState<string[]>([]);

  const [description, setDescription] = useState<string>("");

  const identifyRef = useRef<HTMLDivElement | null>(null);

  const checkRef = useRef<HTMLDivElement | null>(null);

  const requestRef = useRef<HTMLDivElement | null>(null);

  const tabRef = useRef<HTMLDivElement | null>(null);

  const upadteQuestionType = useMemoizedFn((type: string) => {
    setQuestionType((prev) => {
      const isFind = prev.includes(type);

      if (isFind) {
        return prev.filter((item) => item !== type);
      } else {
        return [...prev, type];
      }
    });
  });

  // 提交问题反馈接口
  const { run: submitQeustionFeedback } = useDebounceFn(
    useMemoizedFn((recognizedRecordId: number, sectionId: number) => {
      if (questionTypes.length > 0) {
        const data: FeedbackAddRequest = {
          feedback: {
            feedbackTag: questionTypes.join("、"),
            question: description,
            recognizedRecordId,
            sectionId,
          },
        };

        PostFeedbackAdd(data)
          .then(() => {
            // 弹出提示提交成功
            setIsClickFeedback(false);
            message.success("提交成功");
          })
          .catch((err) => {
            // 弹出提示提交失败
            message.success(err.msg);
          });
      } else {
        message.success("未选择问题类型");
        // 弹出提示未选择问题类型
      }
    }),
    {
      wait: 200,
    }
  );

  const getHeight = () => {
    // 最外层 div
    const boxHeight = document.getElementById("box-container")?.clientHeight;

    // 切换的 div
    const boxMain = document.getElementById("box-main");

    if (boxHeight && boxMain && tabRef.current) {
      boxMain.style.height =
        boxHeight - tabRef.current?.clientHeight - 48 + "px";
    }
  };

  useEffect(() => {
    getHeight();

    window.addEventListener("resize", getHeight);

    return () => {
      window.removeEventListener("resize", getHeight);
    };
  }, [isClickFeedback]);

  useUpdateEffect(() => {
    if (!isClickFeedback) {
      setQuestionType([]);
      if (identifyRef.current) identifyRef.current.scrollTop = 0;
      if (checkRef.current) checkRef.current.scrollTop = 0;
      if (requestRef.current) requestRef.current.scrollTop = 0;
    }
  }, [isClickFeedback]);

  useUpdateEffect(() => {
    if (!isNil(fileType)) {
      if (identifyRef.current) identifyRef.current.scrollTop = 0;
      if (checkRef.current) checkRef.current.scrollTop = 0;
      if (requestRef.current) requestRef.current.scrollTop = 0;
    }
  }, [fileType]);

  return {
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
  };
};
