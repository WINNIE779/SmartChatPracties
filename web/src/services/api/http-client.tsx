import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: "" });

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

api.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    }
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem((window as any).appsettings?.tokenKey);

      message.error(
        error.response.data.msg ?? "登陸已過期，請重新登錄",
        1,
        () => {
          window.location.href = "";
        }
      );
    } else {
      return Promise.reject(error.response.data.msg ?? "Unknown error");
    }
  }
);
