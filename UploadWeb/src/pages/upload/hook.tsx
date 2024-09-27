import { useUpdateEffect } from "ahooks";
import { useRef, useState } from "react";
import { IResultType, IUploadList } from "./prop";

import { PostUpload } from "../../../services/api/upload/index";
import { message } from "antd";

export const useAction = () => {
  const achParameter = [
    {
      name: "授權人",
      remarks: "（必填，僅英文）",
      status: "正常",
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

  const selectItemCss = (isTrue: boolean) => {
    return `${
      isTrue
        ? "bg-gradient-to-r from-[#48A7FF] to-[#796DFF] text-white"
        : "text-[#323444]"
    } 
      flex-1 box-border py-2 rounded-xl text-center cursor-pointer text-sm`;
  };

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

  const [isStartTest, setIsStartTest] = useState<boolean>(false);

  const [selectQuestionType, setSelectQuestionType] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [scale, setScale] = useState(1);

  const isAllNormal = achParameter.every((param) => param.status === "正常");

  const filterParams = showAbnormal
    ? achParameter.filter((param) => param.status === "異常")
    : achParameter;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleUploadFile = (files: File[]) => {
    const uploadFile = (
      file: File,
      fileUrl: string | ArrayBuffer,
      index: number
    ) => {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true); // 上传开始前设置 loading 状态

      // 调用上传接口
      PostUpload(formData)
        .then((res) => {
          setUploadList((prevList) => [
            ...prevList,
            {
              id: prevList.length + 1,
              url: res.fileUrl, // 使用生成的 PDF URL
              type: file.type,
            },
          ]);
          if (index + 1 === files.length) {
            setLoading(false); // 最后一个文件上传完成后关闭 loading
          }
        })
        .catch((err) => {
          message.error(err.msg);
          setLoading(false);
        });
    };
    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (file.type.includes("application/pdf")) {
          const arrayBuffer = reader.result as ArrayBuffer;
          const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);

          uploadFile(file, pdfUrl, index); // 上传 PDF 文件
        } else {
          const imageUrl = reader.result as string;
          uploadFile(file, imageUrl, index); // 上传图片文件
        }
      };

      // 根据文件类型读取文件
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

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 3)); //最大放大3倍
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5)); //最小缩小0.5倍
  };

  const handleBackToParams = () => {
    setQuestionFeedback(false);
  };

  useUpdateEffect(() => {
    if (fileReview?.fileType === "application/pdf") {
      const url = fileReview.fileUrl;

      if (iframeRef.current) {
        iframeRef.current.src = url; // 设置 Blob URL 到 iframe
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

  const pdfFileUrl = (fileUrl: ArrayBuffer) => {
    const blob = new Blob([fileUrl], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    return url;
  };

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
    isStartTest,
    scale,
    loading,
    setLoading,
    handleBackToParams,
    handleZoomOut,
    handleZoomIn,
    setScale,
    setIsStartTest,
    pdfFileUrl,
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
