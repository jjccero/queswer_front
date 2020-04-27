import axios from "axios";
import store from "@/store";


const service = axios.create({
  baseURL: "/api", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
});

//发起请求的拦截器
service.interceptors.request.use(
  config => {
    const token = store.getters.token;
    if (token) {
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
    let code=response.data.code;
    if(code!==0){
      if(code===10000)
        return Promise.reject(new Error("用户的非法请求"))
    }
    else{
      return response.data.data;
    }
  },
  error => {
    console.log(error);
  }
);
export default service;
