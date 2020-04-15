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
    setToken: (state, token) => {
      state.token = token;
    },
    setUser: (state, user) => {
      state.user = user;
    },
    logout() {
      state.user = defaultUser;
    }
  },
  getters: {
    token: state => state.token,
    uId: state => state.user.uId,
    user: state => state.user
  }
});
export default store;
