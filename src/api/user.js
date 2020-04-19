import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

export function getUserInfo(params) {
  return request({
    url: "/getUserInfo",
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

export function queryUserInfosByFollowerId(params) {
  return request({
    url: "/queryUserInfosByFollowerId",
    method: "get",
    params
  });
}

export function queryFollowerInfosIdsByUId(params) {
  return request({
    url: "/queryFollowerInfosIdsByUId",
    method: "get",
    params
  });
}
