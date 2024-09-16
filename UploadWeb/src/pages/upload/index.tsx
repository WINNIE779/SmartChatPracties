import uploadBg from "@/asset/uploadBg.png";
import {
  AddIcon,
  UploadIcon,
  abnormalIcon,
  arrowIcon,
  deleteIcon,
  normalIcon,
} from "@/icon/index";
import { Button, Input, Image, Radio, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { IResultType, useAction } from "./hook";
import Dropzone from "react-dropzone";
import Icon from "@ant-design/icons";
import { type } from "os";
import { log } from "console";
import TextArea from "antd/es/input/TextArea";

export const UploadFile = () => {
  const {
    resultTab,
    uploadList,
    selectedValue,
    iframeRef,
    fileReview,
    achParameter,
    isAllNormal,
    filterParams,
    questionFeedback,
    selectQuestionType,
    setSelectQuestionType,
    setQuestionFeedback,
    setShowAbnormal,
    setFileReview,
    setSelectedValue,
    selectItemCss,
    handleUploadFile,
    handleRemoveFile,
    questionType,
  } = useAction();

  useEffect(() => {
    console.log(fileReview);
  }, [fileReview]);

  const fun = (fileUrl: any) => {
    const blob = new Blob([fileUrl], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    return url;
  };

  return (
    <div className="flex box-border h-screen px-4 min-h-[35rem] bg-[#F8F8F8] min-w-[80rem]">
      <div className="w-3/4 flex flex-col justify-between flex-1 py-8">
        {uploadList.length > 0 ? (
          <div className="bg-[#031212] h-[5.25rem] w-full relative rounded-xl min-h-[5rem]">
            <div className="absolute left-[3rem] top-[1rem] p-2 text-white text-[1.5rem] font-semibold">
              ACH Debit授權表識別
            </div>
          </div>
        ) : (
          <div>
            <div className="relative flex flex-col">
              <img
                src={uploadBg}
                className="rounded-lg overflow-hidden aspect-[4/1] object-cover object-center"
              />
              <div className="text-[#ffffff] text-[3rem] absolute top-[2.5rem] left-[3rem] font-semibold">
                ACH Debit授權表識別
              </div>
              <div className="absolute top-[8.5rem] left-[3rem] p-2 text-white">
                <div>多種常用辦公文檔的識別，多種常用辦公文檔的識別，</div>
                <div>目前已接入了這些系統：OA、企業微信。</div>
                <div>受益人數：超過200人使用。</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#ffffff] rounded-2xl p-4 flex flex-col h-5/6 mt-4">
          <div className="flex justify-center h-full overflow-auto relative">
            {fileReview && uploadList.length > 0 ? (
              // 预览
              <div>
                {fileReview.fileType === "application/pdf" ? (
                  <iframe
                    ref={iframeRef}
                    scrolling="auto"
                    className="border-none overflow-hidden"
                    width="500px"
                    height="600px"
                  />
                ) : (
                  <img
                    src={fileReview.fileUrl}
                    className="rounded-lg select-none max-w-[50rem]"
                  />
                )}
              </div>
            ) : (
              <Dropzone
                onDrop={handleUploadFile}
                maxSize={5 * 1024 * 1024}
                accept={{
                  "application/pdf": [],
                  "image/png": [],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  //拖拉上传
                  <div
                    {...getRootProps()}
                    className="bg-[#ffffff] rounded-2xl p-4 w-full border-2 border-[#E7E8EE] border-dashed flex justify-center items-center"
                  >
                    <input {...getInputProps()} />
                    <div>
                      <div className="flex flex-col justify-center items-center">
                        <div className="ant-upload-drag-icon bg-[#F8F8F8] border rounded-full h-[3.75rem] w-[3.75rem] flex justify-center items-center">
                          <UploadIcon />
                        </div>
                        <div className="my-4 text-[#323444]">
                          將文件拖到此處，或
                          <span className="text-[#697FFF] cursor-pointer">
                            點擊上傳
                          </span>
                        </div>
                        <div className="text-[0.75rem] text-[#969DB2]">
                          只能上傳PDF/PNG文件，且不超過5MB，一次鑒別5張
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>
            )}
          </div>

          <div className="bg-[#F8F8F8] rounded-2xl flex justify-between items-center mt-4 p-4">
            <div className="flex">
              {uploadList.map((uploadListItem, uploadIndex) => (
                //简缩图
                <div className="mr-[1rem]" key={uploadIndex}>
                  <div
                    className={`cursor-pointer h-[6.25rem] w-[6.25rem] rounded-lg border-2 border-solid relative border-[#7C67FF]`}
                  >
                    {uploadListItem.type === "application/pdf" ? (
                      <div className="relative cursor-pointer flex justify-center items-center rounded-lg">
                        <iframe
                          src={fun(uploadListItem.url)}
                          scrolling="auto"
                          className="border-none overflow-hidden"
                          width="100px"
                          height="100px"
                        />
                        <div
                          onClick={() => {
                            if (uploadList.length !== 0) {
                              setFileReview({
                                fileUrl: uploadListItem.url,
                                fileType: uploadListItem.type,
                              });
                            }
                          }}
                          className="cursor-pointer h-[6.2rem] w-[6.2rem] absolute top-0 left-0 bg-transparent z-10"
                        />
                      </div>
                    ) : (
                      <Image
                        width={100}
                        height={100}
                        src={uploadListItem.url}
                        preview={false}
                        className={`cursor-pointer h-[6.2rem] w-[6.2rem] rounded-lg absolute`}
                        onClick={() => {
                          if (uploadList.length !== 0) {
                            setFileReview({
                              fileUrl: uploadListItem.url,
                              fileType: uploadListItem.type,
                            });
                          }
                        }}
                      />
                    )}

                    <div className="bg-[#1f1f3987] flex justify-center items-center w-[6.2rem] h-[2rem] absolute bottom-0 z-10 rounded-b-lg">
                      <Icon
                        component={deleteIcon}
                        onClick={() => handleRemoveFile(uploadIndex)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {uploadList.length >= 5 ? (
                <></>
              ) : (
                <Dropzone
                  onDrop={handleUploadFile}
                  maxSize={100 * 1024 * 1024}
                  accept={{
                    "application/pdf": [],
                    "image/png": [],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    //点击上传
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      className="h-[6.5rem] w-[6.5rem] text-[#5F6279] flex flex-col justify-center items-center bg-white cursor-pointer rounded-2xl border-[0.1rem] border-dashed border-[#E7E8EE]"
                    >
                      <input {...getInputProps()} />

                      <AddIcon />
                      <div className="mt-1 text-[#5F6279] text-[0.88rem] font-semibold w-full flex justify-center">
                        點擊上傳
                      </div>
                    </div>
                  )}
                </Dropzone>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <Button
                className="cursor-pointer bg-[white] border h-10 text-[0.88rem] text-[#697FFF] border-[#697FFF] flex justify-center items-center"
                block
              >
                上傳示例
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                className="cursor-pointer bg-gradient-to-r text-[#FFFFFF] from-[#44ABFE] to-[#7C67FF] hover:from-[#44ABFE] hover:to-[#7C67FF] mt-4 flex justify-center items-center h-10"
                block
              >
                開始檢測
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4 bg-white ml-6 my-4 rounded-lg flex flex-col">
        {!questionFeedback ? (
          <div>
            <div className="bg-[#F8F8F8] mx-4 h-[2.5rem] mt-4 rounded-2xl flex min-w-[15rem] justify-between">
              {resultTab.map((topItem, topIndex) => {
                // 顶部参数选择
                return (
                  <div key={topIndex}>
                    {topItem.isCheck === false && (
                      <div
                        className={selectItemCss(
                          selectedValue === topItem.value,
                          topItem.isCheck
                        )}
                        onClick={() => setSelectedValue(topItem.value)}
                      >
                        {topItem.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-[#ffffff] flex m-4">
              {selectedValue === IResultType.Request ? (
                //請求參數
                <div className="flex flex-col overflow-auto h-[52rem]">
                  {achParameter.map((paramter, paramterIndex) => {
                    return (
                      <div
                        key={paramterIndex}
                        className="m-4 text-[#323444] text-[0.88rem]"
                      >
                        {paramter.name}
                        <span>{paramter.remarks}</span>
                        <Radio.Group
                          className="flex flex-row mt-4"
                          defaultValue={"開啟"}
                        >
                          <Radio value={"開啟"} className="flex">
                            開啟
                          </Radio>
                          <Radio value={"關閉"} className="flex">
                            關閉
                          </Radio>
                        </Radio.Group>
                      </div>
                    );
                  })}
                </div>
              ) : selectedValue === IResultType.Check ? (
                // 核對結果
                <div className="flex flex-col overflow-auto h-[52rem] w-full">
                  <div>
                    {isAllNormal ? (
                      <div className="bg-[#EBF9F3] font-semibold text-[1rem] w-full py-2 flex justify-center">
                        核對結果
                        <Icon component={normalIcon} />
                        <span className=" text-[#34A46E]">正常</span>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-[#FFF2F2] font-semibold text-[1rem] w-full py-2 flex justify-center">
                          核對結果
                          <Icon component={abnormalIcon} />
                          <span className=" text-[#F04E4E]">異常</span>
                        </div>

                        <div className="text-[#323444] text-[0.88rem] my-4 flex justify-end">
                          僅顯示異常
                          <Switch
                            className="mx-2"
                            onChange={(checked) => setShowAbnormal(checked)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {filterParams.map((resultItem, resultIndex) => {
                    return (
                      <div
                        key={resultIndex}
                        className="text-[#323444] text-[0.88rem] flex justify-between m-3"
                      >
                        {resultItem.name}
                        <div>
                          {resultItem.status === "正常" ? (
                            <div className="bg-[#EBF9F3] flex justify-center rounded-xl px-5 py-1">
                              <Icon component={normalIcon} />
                              <span className=" text-[#34A46E]">正常</span>
                            </div>
                          ) : resultItem.status === "異常" ? (
                            <div className="bg-[#FFF2F2] flex justify-center rounded-xl px-5 py-1">
                              <Icon component={abnormalIcon} />
                              <span className=" text-[#F04E4E]">異常</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                //識別結果
                <div className="flex flex-col w-full h-[48rem]">
                  {achParameter.map((paramItem, paramIndex) => {
                    return (
                      <div>
                        <div
                          key={paramIndex}
                          className="m-2 text-[#323444] text-[0.88rem] overflow-auto py-2"
                        >
                          {paramItem.name}
                          <span>：{paramItem.item}</span>
                        </div>
                      </div>
                    );
                  })}
                  <div className="font-semibold text-[#323444] flex justify-center py-4">
                    若識別有誤，請
                    <div
                      className="text-[#697FFF]"
                      onClick={() => setQuestionFeedback(true)}
                    >
                      點擊反饋
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="m-6 flex flex-col">
            <div className="flex justify-start items-center text-[#323444] text-[1.13rem] font-semibold">
              <Icon component={arrowIcon} className="mr-1" />
              問題反饋
            </div>

            <div className="text-[red] text-[0.88rem] my-6">
              *<span className="text-[#5F6279] font-semibold">問題類型</span>
            </div>

            <div className="w-full flex flex-wrap justify-center">
              {questionType.map((questionItem, questionIndex) => {
                return (
                  <div
                    key={questionIndex}
                    className={`w-[8rem] flex justify-center py-2 px-4 cursor-pointer m-3 rounded-lg ${
                      selectQuestionType === questionItem.value
                        ? "bg-gradient-to-r from-[#48A7FF] to-[#796DFF] text-white"
                        : "bg-[#F0F4FF] text-[#697FFF]"
                    }`}
                    onClick={() => setSelectQuestionType(questionItem.value)}
                  >
                    {questionItem.value}
                  </div>
                );
              })}
            </div>

            <div className="font-semibold text-[#5F6279] my-4">
              問題描述（選填）
            </div>
            <TextArea
              rows={5}
              placeholder="請詳細描述問題，有助於我們定位問題，不超過200字"
            />
            <div className="bg-[#697FFF] w-full text-[#ffffff] rounded-lg py-3 text-[0.88rem] flex justify-center items-center mt-6">
              提交
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
