<template>
  <div>
    <div class="head_bar">
      <div class="head_queswer">问答社区</div>
      <el-dropdown class="head_user">
        <span>
          {{user.uid!=null?user.nickname:'请登录'}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="logout" v-if="user.uid!=null">注销</el-dropdown-item>
          <el-dropdown-item @click.native="login" v-else>登陆</el-dropdown-item>
        </el-dropdown-menu>
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
export default {
  data() {
    return {
      user: {
        uid: null
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
  font-size: 30px;
  font-weight: bold;
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
</style>