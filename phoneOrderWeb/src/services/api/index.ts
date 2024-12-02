import { message } from "antd";
import axios from "axios";
// import { isNil } from "ramda";

export const api = axios.create({ baseURL: "" });

api.interceptors.request.use(
  (config) => {
    const appsettings = (window as any).appsettings;

    config.baseURL = appsettings.serverUrl;

    const authorizeToken = localStorage.getItem("token");

    authorizeToken &&
      (config.headers.Authorization = `Bearer ${authorizeToken}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      localStorage.removeItem("token");

      message.error(response.data.msg ?? "登录已过期，请重新登录", 1, () => {
        window.location.href = "";
      });

      return;
    } else {
      // if (!isNil(response.data.msg)) {
      //   return Promise.reject(response.data.msg);
      // } else return response.data;
      if (response.data.code === 200) {
        return response.data;
      } else {
        return Promise.reject(response.data.msg);
      }
    }
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      message.error(
        error.response.data.msg ?? "登录已过期，请重新登录",
        3,
        () => {
          window.location.href = "";
        }
      );
    } else {
      return Promise.reject(error.response.data.msg ?? "Unknown error");
    }
  }
);
