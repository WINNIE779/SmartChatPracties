import { Button, Form, Input } from "antd";
import { useAction } from "./hook";
import React from "react";

export const Login = () => {
  const { onLogin, userInfo, setUserInfo } = useAction();

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="p-4">Login</div>
      <Form
        name="login"
        style={{ width: 360 }}
        className="flex flex-col"
        onFinish={onLogin}
      >
        <Form.Item rules={[{ required: true, message: "请填写账户" }]}>
          <Input
            name="userName"
            placeholder="账号"
            value={userInfo.userName}
            onChange={(e) =>
              setUserInfo({ ...userInfo, userName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: "密码！" }]}>
          <Input.Password
            name="password"
            placeholder="密碼"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button className="cursor-pointer" onClick={() => onLogin()}>
            login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
