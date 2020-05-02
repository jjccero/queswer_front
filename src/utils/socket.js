import store from "@/store";
const url = "ws://localhost:8080/chat/";
export function getChatWebSocket(token) {
  const webSocket = new WebSocket(url + token);
  webSocket.onopen = function(ev) {
    console.log("聊天服务开启");
  };
  webSocket.onclose = function(ev) {
    console.log("聊天服务关闭");
  };
  //收到消息
  webSocket.onmessage = function(ev) {
    const message = JSON.parse(ev.data);
    store.commit("receiveMessage", message);
  };
  return webSocket;
}
