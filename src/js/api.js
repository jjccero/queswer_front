import axios from "axios";

axios.defaults.baseURL = "/api";

export const _getTopicList = () => {
  return axios.get("/getTopicList");
};
export const _addTopic = params => {
  return axios.post("/addTopic", params);
};

export const _signup = params => {
  return axios.post("/signup", params);
};

export const _selectUserInfo = params => {
  return axios.get("selectUserInfo", { params: params });
};

export const _searchQuestionInfos = params => {
  return axios.get("searchQuestionInfos", { params: params });
};

export const _searchUserInfos = params => {
  return axios.get("searchUserInfos", { params: params });
};
export const _createIndex = params => {
  return axios.get("createIndex", { params: params });
};
