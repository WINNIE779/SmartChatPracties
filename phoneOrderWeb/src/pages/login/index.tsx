import { Button, Input } from "antd";
import { useAction } from "./hook";

export const Login = () => {
  const { userInfo, handleChangeUserInfo, handleLoginChange } = useAction();

  return (
    <div className="w-full h-screen bg-[#f5f5f5] flex justify-center items-center">
      <div className="w-96 bg-[#f7f7f7] bg-opacity-80 flex flex-col space-y-4 items-center justify-center box-border pt-4 py-8 px-6 rounded-2xl shadow-2xl">
        <p className="select-none">登錄</p>
        <div className="w-full">
          <Input
            className="w-full"
            placeholder="帳號"
            autoComplete="username"
            value={userInfo.userName}
            onChange={(e) =>
              handleChangeUserInfo({
                userName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <Input
            type="password"
            className="w-full"
            placeholder="密碼"
            autoComplete="current-password"
            value={userInfo.passWord}
            onChange={(e) =>
              handleChangeUserInfo({
                passWord: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <Button
            disabled={userInfo.loading}
            loading={userInfo.loading}
            className="w-full"
            onClick={() => !userInfo.loading && handleLoginChange()}
          >
            登錄
          </Button>
        </div>
      </div>
    </div>
  );
};
