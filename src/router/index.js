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
          iconCls: "el-icon-s-home",
          component: () => import("@/views/Index")
        },
        {
          path: "/topics",
          name: "话题",
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
          path: "/people",
          name: "用户",
          component: () => import("@/views/People"),
          hidden: true
        },
        {
          path: "/search",
          iconCls: "el-icon-search",
          component: () => import("@/views/Search")
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
