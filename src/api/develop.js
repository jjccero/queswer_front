import request from "@/utils/request";

export function init() {
  return request({
    url: "/init",
    method: "get"
  });
}