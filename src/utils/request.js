import axios from "axios";
import store from "@/store";
import { Message } from "element-ui";
import router from "../router";

const service = axios.create({
  baseURL: "" // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
});

//发起请求的拦截器
service.interceptors.request.use(
  config => {
    const sessionId = store.getters.sessionId;
    if (sessionId) {
      config.headers["sessionId"] = sessionId;
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    let code = response.data.code;
    if (code !== 0) {
      let message = response.data.data;
      if (code === 10001) router.push("/login");
      Message({
        message: message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(message));
    } else {
      return response.data.data;
    }
  },
  error => {
    console.log(error);
    Message({
      message: error,
      type: "error",
      duration: 5 * 1000
    });
  }
);
export default service;
