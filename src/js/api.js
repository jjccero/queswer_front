import axios from "axios";

axios.defaults.baseURL = "/api";

export const _login = params => {
  return axios.post("/login", params);
};

export const _getQuestions = params => {
  return axios.get("/getQuestions", { params: params });
};

export const _getQuestion = params => {
  return axios.get("/getQuestion", { params: params });
};

export const _insertFollow = params => {
  return axios.get("/insertFollow", { params: params });
};

export const _deleteFollow = params => {
  return axios.get("/deleteFollow", { params: params });
};

export const _getAnswers = params => {
  return axios.get("/getAnswers", { params: params });
};

export const _updateAttitude = params => {
  return axios.post("updateAttitude", params);
};

export const _deleteAttitude = params => {
  return axios.get("/deleteAttitude", { params: params });
};

export const _getReviews = params => {
  return axios.get("/getReviews", { params: params });
};

export const _deleteReview = params => {
  return axios.get("/deleteReview", { params: params });
};

export const _deleteAnswer = params => {
  return axios.get("/deleteAnswer", { params: params });
};

export const _insertReview = params => {
  return axios.post("/insertReview", params);
};

export const _insertAnswer = params => {
  return axios.post("insertAnswer", params);
};

export const _updateAnswer = params => {
  return axios.post("updateAnswer", params);
};
export const _getUserInfo = params => {
  return axios.post("/getUserInfo", params);
};

export const _getTopicList = () => {
  return axios.get("/getTopicList");
};
export const _addTopic = params => {
  return axios.post("/addTopic", params);
};

export const _getOpptunityList = params => {
  return axios.get("/getOpptunityList", { params: params });
};

export const _signup = params => {
  return axios.post("/signup", params);
};

export const _insertQuestion = params => {
  return axios.post("insertQuestion", params);
};

export const _updateApprove = params => {
  return axios.get("updateApprove", { params: params });
};
