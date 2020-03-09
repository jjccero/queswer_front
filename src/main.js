// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);

import "./js/api";
import {
  getTimeString,
  getUid,
  toLogin,
  getCountString,
  nowTimestamp,
  userInfo
} from "./js/utils";
Vue.prototype.$getTimeString = getTimeString;
Vue.prototype.$getUid = getUid;
Vue.prototype.$toLogin = toLogin;
Vue.prototype.$getCountString = getCountString;
Vue.prototype.$nowTimestamp = nowTimestamp;
Vue.prototype.$userInfo = userInfo;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
