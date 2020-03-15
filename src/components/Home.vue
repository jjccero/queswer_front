<template>
  <div>
    <div class="head_bar">
      <div class="head_queswer">问答社区</div>
      <el-dropdown class="head_user">
        <span v-if="user.uid!=null" style="float: right;">
          <span style="float:right;">{{user.nickname}}</span>
          <avater :uid="user.uid" :avater="user.avater" class="bar_icon"></avater>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="login">个人主页</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </span>
        <span v-else>
          未登录
          <el-dropdown-menu>
            <el-dropdown-item @click.native="login">登陆</el-dropdown-item>
          </el-dropdown-menu>
        </span>
      </el-dropdown>
      <el-menu :default-active="$route.path" mode="horizontal" class="menu" router>
        <!-- 1级菜单 -->
        <template v-for="item in $router.options.routes[0].children">
          <el-menu-item v-if="!item.hidden" :index="item.path" :key="item.path">
            <span>{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="main_view">
      <transition name="fade" mode="out-in">
        <router-view :uid="user.uid"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import avater from "../components/Avater";
export default {
  components: {
    avater
  },
  data() {
    return {
      user: {
        uid: null,
        avater: null
      }
    };
  },
  created() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user != null) this.user = user;
  },
  methods: {
    login() {
      this.$toLogin(this);
    },
    logout() {
      this.user = {
        uid: null
      };
      sessionStorage.removeItem("user");
    }
  }
};
</script>
<style>
.head_user {
  float: right;
  margin-right: 60px;
  line-height: 61px;
}
.head_bar {
  width: 100%;
  float: left;
  background-color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.head_queswer {
  float: left;
  margin-left: 60px;
  line-height: 61px;
  font-weight: bold;
  font-size: 30px;
  color: rgb(0, 132, 255);
}
.menu {
  float: left;
  margin-left: 20px;
}
.main_view {
  margin: 0px 60px 0 60px;
  clear: both;
}
.bar_icon {
  width: 31px;
  margin: 15px 10px 15px 0;
  border-radius: 50%;
  float: right;
}
</style>