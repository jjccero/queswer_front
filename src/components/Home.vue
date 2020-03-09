<template>
  <el-container>
    <el-header class="header" height="50px">
      <el-col :span="4">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="16">问答社区</el-col>
      <el-col :span="4">
        <el-dropdown class="loginInfo">
          <span>{{logined?user.nickname:'请登录'}}</span>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="logout" v-if="logined">注销</el-dropdown-item>
            <el-dropdown-item @click.native="login" v-else>登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-header>
    <el-container>
      <el-collapse value="false">
        <el-collapse-item name="1">
          <el-aside class="aside" width="200px">
            <el-menu :default-active="$route.path" router>
              <!-- 1级菜单 -->
              <template v-for="item1 in $router.options.routes">
                <el-submenu v-if="item1.children" :index="item1.path" :key="item1.path">
                  <template slot="title">
                    <i :class="item1.iconCls"></i>
                    {{item1.name}}
                  </template>
                  <!-- 2级菜单 -->
                  <template v-for="item2 in item1.children">
                    <el-menu-item :index="item2.path" :key="item2.path" v-if="item2.name">
                      <i :class="item2.iconCls"></i>
                      {{item2.name}}
                    </el-menu-item>
                  </template>
                </el-submenu>
                <el-menu-item v-else :index="item1.path" :key="item1.path">
                  <i :class="item1.iconCls"></i>
                  {{item1.name}}
                </el-menu-item>
              </template>
            </el-menu>
          </el-aside>
        </el-collapse-item>
      </el-collapse>
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view :user="user"></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.showUser();
  },
  methods: {
    login() {
      // this.$toLogin(this);
    },
    logout() {
      this.user = null;
      sessionStorage.removeItem("user");
    },
    showUser() {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
  },
  computed: {
    logined() {
      return this.user != null;
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  color: #ffffff;
  background: #000000;
  text-align: center;
  line-height: 50px;
}
.grid-content {
  min-height: 50px;
}

.loginInfo {
  float: right;
  color: #ffffff;
}
</style>