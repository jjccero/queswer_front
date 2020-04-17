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

export function saveFollow(params) {
  return request({
    url: "/saveFollow",
    method: "get",
    params
  });
}

export function deleteFollow(params) {
  return request({
    url: "/deleteFollow",
    method: "get",
    params
  });
}
