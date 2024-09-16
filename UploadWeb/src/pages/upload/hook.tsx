import { useUpdateEffect } from "ahooks";
import { useRef, useState } from "react";

export enum IResultType {
  Identify,
  Check,
  Request,
  Question,
}

export interface IUploadList {
  id: number;
  url: string;
  type: string;
}

export const useAction = () => {
  const achParameter = [
    {
      name: "授權人",
      remarks: "（必填，僅英文）",
      status: "異常",
      item: "Herry.w",
    },
    {
      name: "公司名字",
      remarks: "（必填）",
      status: "正常",
      item: "Chinese Restaurant",
    },
    {
      name: "餐館名字",
      remarks: "（必填）",
      status: "正常",
      item: "中餐廳",
    },
    {
      name: "公司名字和餐館名字",
      remarks: "（其中一個名字需要和SAP餐館的英文名一致）",
      status: "正常",
      item: "XXXXXXXXXX123",
    },
    {
      name: "賬單地址",
      remarks: "（必填）",
      status: "正常",
      item: "ZZZZZZ中餐廳",
    },
    {
      name: "電話",
      remarks: "（必填）",
      status: "正常",
      item: "11111112212",
    },
    {
      name: "城市，州，郵編",
      remarks: "（必填）",
      status: "正常",
      item: "XX.0000.233256",
    },
    {
      name: "郵箱",
      remarks: "（必填）",
      status: "正常",
      item: "22222@djkf.com",
    },
    {
      name: "賬戶名稱",
      remarks: "（必填，和支票一致）",
      status: "正常",
      item: "dsadsds",
    },
    {
      name: "銀行名稱",
      remarks: "（必填，和支票一致）",
      status: "正常",
      item: "02232WWWWWW",
    },
    {
      name: "賬號",
      remarks: "（必填，和支票一致）",
      status: "正常",
      item: "99999999",
    },
    {
      name: "銀行代碼",
      remarks: "（必填，和支票一致）",
      status: "正常",
      item: "8888888",
    },
    {
      name: "銀行所在城市、州",
      remarks: "（必填）",
      status: "正常",
      item: "99999999",
    },
    {
      name: "簽名",
      remarks: "（必填，需要和授權人一致）",
      status: "正常",
      item: "8888888",
    },
  ];

  const selectItemCss = (isTrue: boolean, isCheck: boolean) => {
    return `${
      isTrue
        ? "bg-gradient-to-r from-[#48A7FF] to-[#796DFF] text-white "
        : "text-[#323444]"
    } ${
      !isCheck ? "flex-1" : "w-32 inline-block"
    } box-border py-2 px-8 rounded-2xl text-center cursor-pointer select-none text-sm`;
  };

  const resultTab = [
    {
      label: "識別結果",
      value: IResultType.Identify,
      isCheck: false,
    },
    {
      label: "核對結果",
      value: IResultType.Check,
      isCheck: false,
    },
    {
      label: "請求參數",
      value: IResultType.Request,
      isCheck: false,
    },
    {
      label: "問題反饋",
      value: IResultType.Question,
      isCheck: true,
    },
  ];

  const questionType = [
    {
      label: "識別結果錯誤",
      value: "識別結果錯誤",
    },
    {
      label: "核對結果錯誤",
      value: "核對結果錯誤",
    },
    {
      label: "請求參數無效",
      value: "請求參數無效",
    },
    {
      label: "功能咨詢",
      value: "功能咨詢",
    },
    {
      label: "漏識別",
      value: "漏識別",
    },
    {
      label: "其他",
      value: "其他",
    },
  ];

  const [selectedValue, setSelectedValue] = useState<IResultType>(
    IResultType.Identify
  );

  const [uploadList, setUploadList] = useState<IUploadList[]>([]);

  const [currentPreview, setCurrentPreview] = useState<number | null>(null);

  const [fileReview, setFileReview] = useState<{
    fileUrl: string;
    fileType: String;
  } | null>(null);

  const [showAbnormal, setShowAbnormal] = useState<boolean>(false);

  const [questionFeedback, setQuestionFeedback] = useState<boolean>(false);

  const [selectQuestionType, setSelectQuestionType] = useState<string | null>(
    null
  );

  const isAllNormal = achParameter.every((param) => param.status === "正常");

  const filterParams = showAbnormal
    ? achParameter.filter((param) => param.status === "異常")
    : achParameter;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleUploadFile = (files: File[]) => {
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        // PDF 文件
        if (file.type.includes("application/pdf")) {
          const arrayBuffer = reader.result as ArrayBuffer; // 使用 ArrayBuffer 读取 PDF 文件
          const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          setUploadList((prevList) => [
            ...prevList,
            {
              id: prevList.length + 1,
              url: reader.result as string,
              type: file.type,
            },
          ]);
        }
        // 图片文件
        else {
          setUploadList((prevList) => [
            ...prevList,
            {
              id: prevList.length + 1,
              url: reader.result as string,
              type: file.type,
            },
          ]);
        }
      };

      if (file.type.includes("application/pdf")) {
        reader.readAsArrayBuffer(file); // PDF 文件使用 ArrayBuffer
      } else {
        reader.readAsDataURL(file); // 图片文件使用 Base64 Data URL
      }
    });
  };

  const handleRemoveFile = (deleteIndex: number) => {
    setUploadList((prev) => prev.filter((_, index) => index !== deleteIndex));
  };

  const handleReviewFile = (file: { fileUrl: string; fileType: string }) => {
    setFileReview({
      fileUrl: file.fileUrl,
      fileType: file.fileType,
    });
  };

  useUpdateEffect(() => {
    if (fileReview?.fileType === "application/pdf") {
      // 将 ArrayBuffer 转换为 Blob
      const blob = new Blob([fileReview.fileUrl], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (iframeRef.current) {
        iframeRef.current.src = url; // 设置 Blob URL 到 iframe
        console.log(fileReview);
      }

      return () => {
        URL.revokeObjectURL(url); // 清理 Blob URL
      };
    }
  }, [fileReview]);

  useUpdateEffect(() => {
    uploadList.length === 0 && setFileReview(null);

    setFileReview({
      fileUrl: uploadList[0]?.url,
      fileType: uploadList[0]?.type,
    });
  }, [uploadList]);

  return {
    resultTab,
    achParameter,
    uploadList,
    selectedValue,
    currentPreview,
    iframeRef,
    fileReview,
    isAllNormal,
    showAbnormal,
    filterParams,
    questionFeedback,
    questionType,
    selectQuestionType,
    setSelectQuestionType,
    setQuestionFeedback,
    setShowAbnormal,
    handleReviewFile,
    setFileReview,
    setCurrentPreview,
    setSelectedValue,
    setUploadList,
    handleUploadFile,
    selectItemCss,
    handleRemoveFile,
  };
};
