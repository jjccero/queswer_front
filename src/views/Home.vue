<template>
  <div>
    <div class="home_header">
      <div class="home_main">
        <div class="home_queswer">问答社区</div>
        <el-dropdown class="home_user">
          <span v-if="user.uid!=null" style="float: right;">
            <span style="float:right;">{{user.nickname}}</span>
            <avater :uid="user.uid" :avater="user.avater" class="home_avater"></avater>
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
        <el-menu :default-active="$route.path" mode="horizontal" class="home_menu" router>
          <!-- 1级菜单 -->
          <template v-for="item in $router.options.routes[0].children">
            <el-menu-item v-if="!item.hidden" :index="item.path" :key="item.path">
              <span>{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
    <div class="home_main">
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
.home_user {
  float: right;
  line-height: 61px;
}
.home_header {
  width: 100%;
  float: left;
  background-color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.home_queswer {
  float: left;
  line-height: 61px;
  font-weight: bold;
  font-size: 30px;
  color: rgb(0, 132, 255);
}
.home_menu {
  float: left;
  margin-left: 20px;
}
.home_main {
  width: 800px;
  margin: 0 auto;
  clear: both;
}
.home_avater {
  width: 31px;
  margin: 15px 10px 15px 0;
  border-radius: 50%;
  float: right;
}
.answer_time {
  font-size: 10px;
  color: gray;
}
.anonymous {
  color: gray;
}
</style>