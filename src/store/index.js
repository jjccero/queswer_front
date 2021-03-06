import Vue from "vue";
import Vuex from "vuex";
import { getChatWebSocket } from "@/utils/socket.js";
Vue.use(Vuex);

const defaultLoginResult = {
  sessionId: null, //已经登陆的标志
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
    messageGroup: new Map(),
    messageCount: 0,
    isChat: false,
    valueChange: new Date()
  },
  mutations: {
    init(state) {
      const loginResult = JSON.parse(localStorage.getItem("loginResult"));
      state.messageCount = 0;
      if (loginResult != null) {
        state.loginResult = loginResult;
        const messageGroup = JSON.parse(localStorage.getItem("messageGroup"));
        if (messageGroup != null) {
          messageGroup.forEach(element => {
            state.messageGroup.set(element[0], element[1]);
            element[1].forEach(message => {
              if (
                message.unread === true &&
                message.dstId === state.loginResult.user.userId
              )
                ++state.messageCount;
            });
          });
        }
        state.chatWebSocket = getChatWebSocket(loginResult.sessionId);
      }
    },
    logout(state) {
      localStorage.removeItem("loginResult");
      localStorage.removeItem("messageGroup");
      state.loginResult = defaultLoginResult;
      state.messageGroup = new Map();
      state.chatWebSocket.close();
      state.chatWebSocket = null;
    },
    receiveMessage(state, message) {
      const messageGroup = state.messageGroup;
      let srcId = message.srcId;
      const saveFlag = srcId === state.loginResult.user.userId;
      if (saveFlag) srcId = message.dstId;
      else if (state.isChat) message.unread = false;
      else ++state.messageCount;
      const list = messageGroup.get(srcId);
      if (list == null) {
        messageGroup.set(srcId, [message]);
        state.valueChange = new Date();
      } else list.push(message);
      localStorage.setItem("messageGroup", JSON.stringify(messageGroup));
    },
    readMessage(state) {
      state.isChat = true;
      state.messageCount = 0;
      const messageGroup = state.messageGroup;
      for (const [userId, messages] of messageGroup) {
        messages.forEach(message => {
          message.unread = false;
        });
      }
      localStorage.setItem("messageGroup", JSON.stringify(messageGroup));
    },
    closeMessage(state) {
      state.isChat = false;
    },
    setUser(state, user) {
      state.loginResult.user = user;
      localStorage.setItem("loginResult", JSON.stringify(state.loginResult));
    },
    setInfo(state, info) {
      const user = state.loginResult.user;
      user.nickname = info.nickname;
      user.sex = info.sex;
      user.intro = info.intro;
      user.email = info.email;
      localStorage.setItem("loginResult", JSON.stringify(state.loginResult));
    },
    setAvater(state) {
      const user = state.loginResult.user;
      user.avater = 1;
      localStorage.setItem("loginResult", JSON.stringify(state.loginResult));
    }
  },
  actions: {},
  getters: {
    sessionId: state => state.loginResult.sessionId,
    userId: state => state.loginResult.user.userId,
    authority: state => state.loginResult.user.authority,
    user: state => state.loginResult.user,
    chatWebSocket: state => state.chatWebSocket,
    messageGroup: state => state.messageGroup,
    messageCount: state => state.messageCount,
    isChat: state => state.isChat,
    valueChange: state => state.valueChange
  }
});
export default store;
