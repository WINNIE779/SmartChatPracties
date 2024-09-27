import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: "" });

//这里的通过用刚刚配置的appsetting来请求到接口的token、url
api.interceptors.request.use(
  (config) => {
    const appsettings = (window as any).appsettings;

    config.baseURL = appsettings.serverUrl;

    const authorizeToken = localStorage.getItem(appsettings.tokenKey);

    authorizeToken
      ? (config.headers.Authorization = `Bearer ${authorizeToken}`)
      : "";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//这里是请求后返回的code不同执行不一样的操作：
api.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    }
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem((window as any).appsettings?.tokenKey);

      message.error(error.response.data.msg ?? "登陸已過期，請重新登錄");
    } else {
      return Promise.reject(error.response.data.msg ?? "Unknown error");
    }
  }
);
