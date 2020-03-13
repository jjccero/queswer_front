import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "发现",
      component: () => import("@/components/Home"),
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "主页",
          iconCls: "el-icon-setting",
          component: () => import("@/components/Index")
        },
        {
          path: "/topics",
          name: "话题",
          iconCls: "el-icon-chat-dot-round",
          component: () => import("@/components/TopicList")
        },
        {
          path: "/question",
          name: "问题",
          component: () => import("@/components/Question")
        },
        {
          path: "/test",
          name: "开发者接口",
          component: () => import("@/components/Test")
        }
      ]
    },
    {
      path: "/login",
      name: "登陆",
      component: () => import("@/components/Login"),
      hidden: true
    }
  ]
});
