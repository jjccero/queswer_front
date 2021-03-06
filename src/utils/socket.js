import store from "@/store";
const url = "ws://81.70.38.35:8090/chat/";
export function getChatWebSocket(sessionId) {
  const webSocket = new WebSocket(url + sessionId);
  webSocket.onopen = function(ev) {
    console.log("聊天服务开启");
  };
  webSocket.onclose = function(ev) {
    console.log("聊天服务关闭");
  };
  //收到消息
  webSocket.onmessage = function(ev) {
    const data = JSON.parse(ev.data);
    if (data instanceof Array) {
      data.forEach(message => {
        store.commit("receiveMessage", message);
      });
    } else store.commit("receiveMessage", data);
  };
  return webSocket;
}
