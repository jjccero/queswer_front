import axios from "axios";

axios.defaults.baseURL = "/api";

export const _getTopicList = () => {
  return axios.get("/queryTopics");
};
export const _addTopic = params => {
  return axios.post("/sabeTopic", params);
};

export const _signup = params => {
  return axios.post("/signup", params);
};
