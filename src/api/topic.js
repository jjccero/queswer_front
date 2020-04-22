import request from "@/utils/request";

export function queryTopics() {
  return request({
    url: "/queryTopics",
    method: "get"
  });
}

export function saveTopic(data) {
  return request({
    url: "/saveTopic",
    method: "post",
    data
  });
}
