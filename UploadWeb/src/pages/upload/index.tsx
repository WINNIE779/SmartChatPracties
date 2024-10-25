import uploadBg from "@/asset/uploadBg.png";
import {
  AddIcon,
  UploadIcon,
  deleteIcon,
  enlargeIcon,
  narrowIcon,
} from "@/icon/index";
import { Button, Image, Spin } from "antd";
import { useAction } from "./hook";
import Dropzone from "react-dropzone";
import Icon, { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import React from "react";
import { isNil } from "ramda";
import { RecognitionFileComponent } from "../recognition-file";

export const UploadFile = () => {
  const {
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
  } = useAction();

  const isClickPdf =
    (clickAttachment?.originFileName ?? "").split(".").pop()?.toLowerCase() ===
    "pdf";

  return (
    <div className="flex box-border h-screen px-4 py-4 min-h-[34rem] bg-[#F8F8F8] min-w-[64rem] w-100vw overflow-hidden justify-between">
      <div className="w-3/4 flex flex-col justify-between flex-1">
        {!clickAttachment && isNil(fileType) ? (
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
        ) : (
          <div className="bg-[#031212] h-[5.25rem] w-full relative rounded-xl ">
            <div className="absolute left-[3rem] top-[1rem] p-2 text-white text-[1.5rem] font-semibold">
              {isNil(fileType) ? "" : Document[fileType]}
            </div>
          </div>
        )}

        <div className="bg-[#ffffff] rounded-2xl p-4 flex flex-col h-5/6 mt-4">
          <div className="flex justify-center h-full overflow-auto relative">
            {!clickAttachment ? (
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
            ) : (
              clickAttachment && (
                // 文件预览
                <div className="relative">
                  <div className="bg-[#ffffff] w-full flex justify-center h-full">
                    {isClickPdf ? (
                      <iframe
                        src={clickAttachment?.fileUrl}
                        scrolling="auto"
                        className="border-none overflow-auto"
                        width="500px"
                        height="600px"
                        style={{
                          transform: `scale(${zoom})`,
                        }}
                      />
                    ) : (
                      <img
                        src={clickAttachment?.fileUrl}
                        className="rounded-lg select-none overflow-auto max-w-[50rem]"
                        style={{
                          transform: `scale(${zoom})`,
                        }}
                      />
                    )}
                  </div>

                  <div className="fixed top-40 left-20 bg-[#1f1f398f] rounded-xl h-10 flex justify-center cursor-pointer z-20">
                    <Icon
                      component={enlargeIcon}
                      className="mx-2 flex"
                      onClick={fileToSizeAdd}
                    />
                    <Icon
                      component={narrowIcon}
                      className="mx-2 flex"
                      onClick={fileToSizeReduce}
                    />
                  </div>
                </div>
              )
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
                    {(uploadListItem?.originFileName ?? "")
                      .split(".")
                      .pop()
                      ?.toLowerCase() !== "pdf" ? (
                      <Image
                        width={100}
                        height={100}
                        src={uploadListItem.fileUrl}
                        preview={false}
                        className={`cursor-pointer  w-[6.2rem] rounded-lg absolute`}
                        onClick={() => {
                          if (uploadList.length !== 0) {
                            setClickAttachment(uploadListItem);
                            setClickAttachmentIndex(uploadIndex);
                          }
                        }}
                      />
                    ) : (
                      <div className="relative cursor-pointer flex justify-center items-center rounded-lg overflow-auto">
                        <iframe
                          src={uploadListItem.fileUrl}
                          scrolling="auto"
                          className="border-none overflow-hidden"
                          width="100px"
                          height="100px"
                        />
                        <div
                          onClick={() => {
                            if (uploadList.length !== 0) {
                              setClickAttachment(uploadListItem);
                              setClickAttachmentIndex(uploadIndex);
                            }
                          }}
                          className="cursor-pointer h-[6.2rem] w-[6.2rem] absolute top-0 left-0 bg-transparent z-10"
                        />
                      </div>
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

              {loading ? (
                <div className="h-[6.2rem] w-[6.2rem] border dragger border-dashed flex justify-center items-center border-[#E7E8EE] rounded-lg text-[2rem] cursor-pointer bg-[#ffffff]">
                  <Spin
                    spinning={loading}
                    indicator={<LoadingOutlined spin />}
                    size="large"
                  />
                </div>
              ) : (
                !detectionLoading &&
                uploadList.length < 5 && (
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
                )
              )}
            </div>

            <div className="flex flex-col justify-center">
              <Button
                className="cursor-pointer bg-[white] border h-10 text-[0.88rem] text-[#697FFF] border-[#697FFF] flex justify-center items-center"
                block
                onClick={onUploadExample}
                disabled={detectionLoading}
              >
                上傳示例
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                className="cursor-pointer bg-gradient-to-r text-[#FFFFFF] from-[#44ABFE] to-[#7C67FF] hover:from-[#44ABFE] hover:to-[#7C67FF] mt-4 flex justify-center items-center h-10"
                block
                loading={detectionLoading}
                onClick={handleStartTest}
              >
                開始檢測
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/4 bg-white ml-6 rounded-lg flex flex-col">
        <RecognitionFileComponent
          isCheck={false}
          requestParams={requestParams}
          sectionld={clickRecords?.sectionId}
          recognizedRecordld={clickRecords?.id}
          detectionJson={clickRecords?.detectionJson ?? null}
          recognizedJson={clickRecords?.recognizedJson ?? null}
          fileIDentifyFileDetectStatus={clickRecords?.status ?? null}
          updateRequestParams={updateRequestParams}
        />
      </div>
    </div>
  );
};
