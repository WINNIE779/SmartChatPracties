import { useEffect, useMemo, useRef, useState } from "react";
import { useMemoizedFn, useUpdateEffect } from "ahooks";
import {
  GetParamsSetting,
  GetRecordsList,
  PostAttachment,
  PostParamsSettingUpdate,
  PostRecognize,
  PostUpload,
} from "@/services/api/upload";
import {
  GetAttachUrl,
  IFileType,
  ISearchParams,
  RecognizeRequest,
  RecordsDto,
} from "@/services/dtos/upload";
import { Document } from "../upload/prop";
import {
  AchSearchParams,
  CreditFormMultipleParams,
  CreditFormSingleParams,
  CustomerBankPaymentApplicationFormParams,
  CustomerRegistrationFormParams,
  CustomerShippingDisclaimerParams,
} from "@/services/dtos/public";
import { clone, isEmpty, isNil } from "ramda";
import { routerState } from "@/models";
import { App } from "antd";
import { IDentifyFileDetectStatus } from "./prop";
import { useRecoilValue } from "recoil";
import { replaceWithLatest } from "@/utils";

export const useAction = () => {
  const { message } = App.useApp();

  const routerMsg = useRecoilValue(routerState);

  const [uploadList, setUploadList] = useState<GetAttachUrl[]>([]);

  const [requestParams, setRequestParams] = useState<ISearchParams[]>([]);

  const [requestParamsJson, setRequestParamsJson] = useState<string>("");

  const initBannerInfo = {
    banner: "",
    title: "",
    description: "string",
  };

  const [bannerInfo, setBannerInfo] = useState<{
    banner: string;
    title: string;
    description: string;
  }>(initBannerInfo);

  const [sectionId, setSectionId] = useState<number | null>(null);

  const [records, setRecords] = useState<RecordsDto[]>([]);

  const [clickAttachment, setClickAttachment] = useState<GetAttachUrl>();

  const [clickAttachmentIndex, setClickAttachmentIndex] = useState<
    number | undefined
  >(undefined);

  const [detectionLoading, setDetectionLoading] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [fileHeightZoom, setFileHeightZoom] = useState(100);

  const [fileWidthZoom, setFileWidthZoom] = useState(50);
  const [zoom, setZoom] = useState(1);

  const container = useRef(null);

  const continueExecution = useRef<boolean>(false);

  const recordsId = useRef<number[]>([]);

  const attachmentIds = useMemo(() => {
    return uploadList.map((item) => item.id);
  }, [uploadList]);

  const clickRecords = useMemo(() => {
    return records.find((x) => x.attachmentId === clickAttachment?.id);
  }, [clickAttachment, records]);

  const requestParamsMemo = useMemo(() => {
    if (isEmpty(requestParams) || isNil(requestParams)) {
      return;
    } else {
      return requestParams.reduce((acc: { [key: string]: boolean }, item) => {
        acc[item.jsonObjKeyName] = item.open;

        return acc;
      }, {});
    }
  }, [requestParams]);

  const fileToSizeAdd = () => {
    // setFileHeightZoom((prevZoom) => prevZoom + 2);
    // setFileWidthZoom((prevZoom) => prevZoom + 2);
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const fileToSizeReduce = () => {
    // setFileHeightZoom((prevZoom) => (prevZoom > 4 ? prevZoom - 4 : prevZoom));
    // setFileWidthZoom((prevZoom) => (prevZoom > 4 ? prevZoom - 4 : prevZoom));
    setZoom((prevZoom) => (prevZoom > 0.2 ? prevZoom - 0.1 : prevZoom));
  };

  const findEnumValueByName = (name: string): IFileType => {
    // 根據文件類型名找對應的IFileType
    for (const key in Document) {
      if (Document.hasOwnProperty(key)) {
        if (Document[key as unknown as keyof typeof Document] === name) {
          return parseInt(key) as IFileType;
        }
      }
    }
    return IFileType.Ach;
  };

  const fileType = useMemo(() => {
    if (!!routerMsg.section) {
      return findEnumValueByName(routerMsg.section.name);
    }
  }, [routerMsg]);

  const defaultParams = useMemo(() => {
    let type: ISearchParams[] = [];
    switch (fileType as IFileType) {
      case IFileType.Ach:
        type = AchSearchParams;
        break;
      case IFileType.CreditFormMultiple:
        type = CreditFormMultipleParams;
        break;
      case IFileType.CreditFormSingle:
        type = CreditFormSingleParams;
        break;
      case IFileType.CustomerBankPaymentApplicationForm:
        type = CustomerBankPaymentApplicationFormParams;
        break;
      case IFileType.CustomerRegistrationForm:
        type = CustomerRegistrationFormParams;
        break;
      case IFileType.CustomerShippingDisclaimer:
        type = CustomerShippingDisclaimerParams;
        break;
    }
    return type;
  }, [fileType]);

  const uploadExample = (value: IFileType) => {
    // 示例文件
    switch (value) {
      case IFileType.Ach:
        return 10743;
      case IFileType.CreditFormMultiple:
        return 10878;
      case IFileType.CreditFormSingle:
        return 10737;
      case IFileType.CustomerBankPaymentApplicationForm:
        return 10739;
      case IFileType.CustomerRegistrationForm:
        return 10734;
      case IFileType.CustomerShippingDisclaimer:
        return 10736;
    }
  };

  const updateRequestParams = useMemoizedFn((key: string, value: boolean) => {
    const data = clone(requestParams);

    const index = data.findIndex((item) => item.jsonObjKeyName === key);

    if (index >= 0) {
      data[index].open = value;
    }
    setRequestParams(() => data);
  });

  const handleRemoveFile = (RemoveIndex: number) => {
    if (detectionLoading) {
      return;
    }
    setUploadList(uploadList.filter((_, index) => index !== RemoveIndex));
  };

  const handleUploadFile = (file: File[]) => {
    if (file.find((x) => x.size > 5 * 1024 * 1024)) {
      message.error("請上傳小於 5m 的文件");
      return;
    }
    if (uploadList.length + file.length > 5) {
      message.error("一次最多上傳五張");
      return;
    }

    file.forEach((item, index) => {
      const formData = new FormData();
      formData.append("file", item);
      setLoading(true);
      PostUpload(formData)
        .then((res) => {
          setUploadList((prev) => [...prev, res]);
          if (index + 1 === file.length) {
            setLoading(false);
          }
        })
        .catch((err) => {
          message.error(err.msg);
          setLoading(false);
        });
    });
  };

  const onUploadExample = () => {
    if (isNil(fileType)) return;
    if (uploadList.length >= 5) {
      message.error("最多上傳 5 個文件");
      return;
    }
    const attachmentId = uploadExample(fileType);
    setLoading(true);
    PostAttachment({ attachmentIds: [attachmentId] })
      .then((res) => {
        setUploadList((prev) => [...prev, res[0]]);
      })
      .catch((err) => message.error(err.msg))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStartTest = () => {
    if (uploadList.length > 0) {
      setDetectionLoading(true);

      if (requestParams.length > 0) {
        if (isNil(fileType)) return;
        const paramsData = {
          fileType: fileType,
          paramsSettingJson: JSON.stringify(requestParamsMemo),
        };
        // 如果有請求參數則 update 請求參數再開始檢測
        PostParamsSettingUpdate(paramsData)
          .then((res) => {
            handleStartDetection();
            setRequestParamsJson(res.paramsJson);
          })
          .catch((err) => message.error(err.msg));
        return;
      }
      handleStartDetection();
    } else {
      message.error("請上傳至少一個文件再進行檢測");
    }
  };

  const handleStartDetection = () => {
    if (isNil(fileType) || isNil(sectionId)) return;
    continueExecution.current = true;
    const data: RecognizeRequest = {
      sectionId: sectionId,
      fileType: fileType,
      attachmentIds: attachmentIds,
    };
    PostRecognize(data)
      .then((res) => {
        recordsId.current = res.records.map((x) => x.id);
        handleTestResults();
      })
      .catch((err) => {
        message.error(err.msg);
        recordsId.current = [];
      });
  };

  const handleTestResults = () => {
    // 輪詢
    if (!continueExecution.current) return;
    GetRecordsList(recordsId.current)
      .then((res) => {
        if (
          res.every(
            (x) =>
              x.status !== IDentifyFileDetectStatus.Pending &&
              x.status !== IDentifyFileDetectStatus.Processing
          )
        ) {
          setRecords(res);
          setDetectionLoading(false);
          continueExecution.current = false;
        }
      })
      .finally(() => {
        // 等待1秒钟后再次执行
        setTimeout(() => {
          handleTestResults(); // 递归调用自己
        }, 5000);
      });
  };

  useEffect(() => {
    setBannerInfo(
      isNil(routerMsg.section)
        ? initBannerInfo
        : {
            banner: routerMsg.section.banner,
            title: routerMsg.section.title,
            description: routerMsg.section.description,
          }
    );
    setSectionId(isNil(routerMsg?.section) ? null : routerMsg.section.id);
  }, [routerMsg]);

  useEffect(() => {
    if (!isNil(fileType)) {
      GetParamsSetting(fileType)
        .then((res) => {
          setRequestParams(
            replaceWithLatest(JSON.parse(res.paramsJson), defaultParams)
          );
        })
        .catch((err) => {
          message.error(err.msg);
          setRequestParams(defaultParams);
        });
    }
  }, [fileType]);

  useUpdateEffect(() => {
    if (!isEmpty(requestParamsJson) && !isNil(requestParamsJson)) {
      setRequestParams(
        replaceWithLatest(JSON.parse(requestParamsJson), defaultParams)
      );
    }
  }, [requestParamsJson]);

  useUpdateEffect(() => {
    if (uploadList.length === 0) {
      setClickAttachment(undefined);
      setClickAttachmentIndex(undefined);
    }
    if (!clickAttachment && uploadList.length > 0) {
      setClickAttachment(uploadList[0]);
      setClickAttachmentIndex(0);
    }
  }, [uploadList]);

  useUpdateEffect(() => {
    setUploadList([]);

    continueExecution.current = false;
    setDetectionLoading(false);
  }, [fileType]);

  return {
    fileType,
    loading,
    bannerInfo,
    uploadList,
    clickRecords,
    requestParams,
    clickAttachment,
    detectionLoading,
    fileHeightZoom,
    fileWidthZoom,
    fileToSizeAdd,
    fileToSizeReduce,
    setFileWidthZoom,
    setFileHeightZoom,
    handleStartTest,
    handleUploadFile,
    handleRemoveFile,
    onUploadExample,
    setClickAttachment,
    updateRequestParams,
    Document,
    clickAttachmentIndex,
    setClickAttachmentIndex,
    zoom,
  };
};
