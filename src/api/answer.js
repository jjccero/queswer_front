import request from "@/utils/request";

export function saveAnswer(data) {
  return request({
    url: "/saveAnswer",
    method: "post",
    data
  });
}

export function updateAnswer(data) {
  return request({
    url: "/updateAnswer",
    method: "post",
    data
  });
}

export function deleteAnswer(params) {
  return request({
    url: "/deleteAnswer",
    method: "get",
    params
  });
}

export function queryAnswers(params) {
  return request({
    url: "/queryAnswers",
    method: "get",
    params
  });
}
export function updateAttitude(data) {
  return request({
    url: "/updateAttitude",
    method: "post",
    data
  });
}

export function deleteAttitude(params) {
  return request({
    url: "/deleteAttitude",
    method: "get",
    params
  });
}
