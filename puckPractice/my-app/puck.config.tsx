import type { Config } from "@measured/puck";
import Dropzone from "react-dropzone";

type Props = {
  HeadingBlock: { title: string };
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Heading",
      },
      render: () => (
        <div>
          <h1>upload</h1>
          <div>
            <Dropzone
              // onDrop={handleUploadFile}
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
                    <div className="flex flex-col justify-center items-center bg-[#ffffff]">
                      <div className="ant-upload-drag-icon bg-[#F8F8F8] border rounded-full h-[3.75rem] w-[3.75rem] flex justify-center items-center">
                        {/* <UploadIcon /> */}
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
          </div>
        </div>
      ),
    },
  },
};

export default config;
