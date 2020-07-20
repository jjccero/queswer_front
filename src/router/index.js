import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home"),
      redirect: "/index",
      children: [
        {
          path: "/index",
          iconCls: "el-icon-house",
          component: () => import("@/views/Index")
        },
        {
          path: "/search",
          iconCls: "el-icon-search",
          component: () => import("@/views/Search")
        },
        {
          path: "/develop",
          iconCls: "el-icon-setting",
          component: () => import("@/views/Develop"),
          authority: 2
        },
        {
          path: "/question",
          name: "问题",
          component: () => import("@/views/Question"),
          hidden: true
        },
        {
          path: "/people/:peopleId",
          name: "用户",
          component: () => import("@/views/People"),
          hidden: true
        },
        {
          path: "/topic/:topic",
          name: "话题",
          component: () => import("@/views/Topic"),
          hidden: true
        },
        {
          path: "/setting",
          name: "设置",
          component: () => import("@/views/Setting"),
          hidden: true
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
