import axios from "axios";
import store from "@/store";

const service = axios.create({
  baseURL: "/api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

//发起请求的拦截器
service.interceptors.request.use(
  config => {
    const token = store.getters.token;
    if (token) {
      config.headers["token"] = token;
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
    return response.data;
  },
  error => {
    console.log(error);
  }
);
export default service;
