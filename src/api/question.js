import request from "@/utils/request";

export function saveQuestion(data) {
  return request({
    url: "/saveQuestion",
    method: "post",
    data
  });
}

export function updateQuestion(data) {
  return request({
    url: "/updateQuestion",
    method: "post",
    data
  });
}

export function deleteQuestion(params) {
  return request({
    url: "/deleteQuestion",
    method: "get",
    params
  });
}

export function queryQuestions(params) {
  return request({
    url: "/queryQuestions",
    method: "get",
    params
  });
}

export function getQuestion(params) {
  return request({
    url: "/getQuestion",
    method: "get",
    params
  });
}

export function saveSubscribe(params) {
  return request({
    url: "/saveSubscribeQuestion",
    method: "get",
    params
  });
}

export function deleteSubscribe(params) {
  return request({
    url: "/deleteSubscribeQuestion",
    method: "get",
    params
  });
}
