import request from "@/utils/request";

export function saveQuestion(data) {
  return request({
    url: "/saveQuestion",
    method: "post",
    data
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
    url: "/saveSubscribe",
    method: "get",
    params
  });
}

export function deleteSubscribe(params) {
  return request({
    url: "/deleteSubscribe",
    method: "get",
    params
  });
}
