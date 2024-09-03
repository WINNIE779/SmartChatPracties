import React from "react";

import login from "../../asset/pic/login.png";
import loginIcon from "../../asset/pic/login-Icon.png";
import nameIcon from "../../asset/pic/name.png";
import passwordIcon from "../../asset/pic/password.png";
import { Button, Checkbox, Form, Input } from "antd";
import { useAction } from "./hook";

export const LoginPage = () => {
  const {
    userName,
    password,
    loading,
    onLogin,
    setIsRemember,
    setPassword,
    setUserName,
  } = useAction();

  return (
    <div
      className="bg-[#ffffff] flex justify-end md:justify-normal overflow-hidden bg-current h-screen w-screen"
      style={{ zIndex: 1 }}
    >
      <div className="h-full hidden lg:flex w-1/2 relative">
        <img src={login} className="w-full h-full bg-cover" />

        <div className="absolute top-[3.06rem] left-[6.06rem] text-[#FFFFFF] text-[1.44rem] font-semibold">
          AI智能對話平台
        </div>
        <div className="absolute bottom-[11.94rem] text-[#ffffff99] text-[2rem] font-bold ml-[6.06rem] h-[3rem]">
          AI智能對話
        </div>
        <div className="absolute text-[#FFFFFF] text-[3rem] bottom-[6.88rem] font-bold ml-[6.06rem] h-[4.5rem]">
          助力對話革新，定義互聯未來。
        </div>
      </div>

      <div className="bg-[#FFFFFF] flex flex-col items-center justify-center w-full lg:px-5 lg:w-1/2">
        <div className="flex">
          <div className="text-[#323444] font-semibold lg:text-[2.5rem] text-[1.4rem]">
            Hey,hello
          </div>
          <img
            src={loginIcon}
            className="lg:w-[2.5rem] lg:h-[2.75rem] w-[2rem] h-[2rem]"
          />
        </div>

        <div>
          <Form
            name="login"
            onFinish={onLogin}
            className="flex flex-col box-content lg:box-border lg:p-0 lg:rounded-none"
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "請輸入OA帳號" }]}
            >
              <Input
                placeholder="OA帳號"
                prefix={
                  <img
                    src={nameIcon}
                    className="lg:h-[2.07rem] lg:w-[2.1rem] h-[1.6rem] w-[1.6rem] ml-[1rem] mr-[1rem] flex items-start"
                  />
                }
                className="p-1 lg:p-5 lg:w-[31.88rem] mt-2 rounded-[1rem] bg-[#FAFAFB] border-none text-[1.05rem]"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "密碼錯誤，請重新輸入" }]}
            >
              <Input.Password
                placeholder="密碼"
                prefix={
                  <img
                    src={passwordIcon}
                    className="lg:h-[2.07rem] lg:w-[2.1rem] h-[1.6rem] w-[1.6rem] ml-[1rem] mr-[1rem]"
                  />
                }
                className="p-1 lg:p-5 lg:w-[31.88rem] rounded-[1rem] bg-[#FAFAFB] border-none text-[1.05rem]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Checkbox
                className="lg:mt-6 lg:mb-6 text-[0.88rem]"
                onChange={() => setIsRemember(true)}
              >
                記住密碼
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="bg-gradient-to-r from-[#8053ff] to-[#5b53ff] rounded-[1rem] flex items-center justify-center w-[17.5rem] lg:p-8 lg:w-[31.88rem] cursor-pointer"
                onClick={onLogin}
                loading={loading}
              >
                <span className="text-[1rem] lg:text-[1.25rem] text-white">
                  登錄
                </span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
