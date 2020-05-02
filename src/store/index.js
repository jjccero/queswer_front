import Vue from "vue";
import Vuex from "vuex";
import { getChatWebSocket } from "@/utils/socket.js";
Vue.use(Vuex);

const defaultLoginResult = {
  token: null, //已经登陆的标志
  user: {
    userId: null,
    nickname: null,
    intro: null,
    avater: null,
    gmtCreate: null,
    authority: null,
    sex: null
  }
};
const store = new Vuex.Store({
  state: {
    loginResult: defaultLoginResult,
    chatWebSocket: null,
    messages: new Map()
  },
  mutations: {
    init(state) {
      const loginResult = JSON.parse(localStorage.getItem("loginResult"));
      if (loginResult != null) {
        localStorage.setItem("loginResult", JSON.stringify(loginResult));
        state.loginResult = loginResult;
        state.chatWebSocket = getChatWebSocket(loginResult.token);
      }
    },
    login(state, loginResult) {
      localStorage.setItem("loginResult", JSON.stringify(loginResult));
      state.loginResult = loginResult;
      state.chatWebSocket = getChatWebSocket(loginResult.token);
    },
    logout(state) {
      localStorage.removeItem("loginResult");
      state.loginResult = defaultLoginResult;
      state.chatWebSocket.close();
      state.chatWebSocket = null;
      state.chatWebSocket = new Map();
    },

    receiveMessage(state, message) {
      let dstId = message.dstId;
      if (dstId === state.loginResult.user.userId) dstId = message.srcId;
      const list = state.messages.get();
      if (list == null) {
        state.messages.set(dstId, [message]);
      } else list.push(message);
    }
  },
  getters: {
    token: state => state.loginResult.token,
    userId: state => state.loginResult.user.userId,
    user: state => state.loginResult.user,
    chatWebSocket: state => state.chatWebSocket
  }
});
export default store;
