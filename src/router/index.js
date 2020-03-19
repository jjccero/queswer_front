import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      redirect: "/index",
      children: [
        {
          path: "/index",
          name: "主页",
          iconCls: "el-icon-setting",
          component: () => import("@/views/Index")
        },
        {
          path: "/topics",
          name: "话题",
          iconCls: "el-icon-chat-dot-round",
          component: () => import("@/views/TopicList")
        },
        {
          path: "/developApi",
          name: "开发者接口",
          component: () => import("@/views/DevelopApi")
        },
        {
          path: "/question",
          name: "问题",
          component: () => import("@/views/Question"),
          hidden: true
        },
        {
          path: "/user",
          name: "用户",
          component: () => import("@/views/UserDetail")
        }
      ]
    },

    {
      path: "/login",
      name: "登陆",
      component: () => import("@/views/Login"),
      hidden: true
    }
  ]
});
