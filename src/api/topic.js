import request from "@/utils/request";

export function saveSubscribeTopic(params) {
  return request({
    url: "/saveSubscribeTopic",
    method: "get",
    params
  });
}

export function deleteSubscribeTopic(params) {
  return request({
    url: "/deleteSubscribeTopic",
    method: "get",
    params
  });
}

export function getTopicInfo(params) {
  return request({
    url: "/getTopicInfo",
    method: "get",
    params
  });
}

export function queryTopicsByUserId(params) {
  return request({
    url: "/queryTopicsByUserId",
    method: "get",
    params
  });
}

export function queryTopicQuestionInfosByUserId(params) {
  return request({
    url: "/queryTopicQuestionInfosByUserId",
    method: "get",
    params
  });
}
