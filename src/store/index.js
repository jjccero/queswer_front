import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const defaultUser = {
  uId: null,
  nickname: null,
  intro: null,
  avater: null,
  gmtCreate: null,
  authority: null,
  sex: null
};
const store = new Vuex.Store({
  state: {
    token: null,
    user: defaultUser
  },
  mutations: {
    init: state => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user != null) {
        localStorage.setItem("user", JSON.stringify(user));
        state.user = user;
      }
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setUser: (state, user) => {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.user = defaultUser;
      localStorage.removeItem("user");
      state.token = null;
    }
  },
  getters: {
    token: state => state.token,
    uId: state => state.user.uId,
    user: state => state.user
  }
});
export default store;
