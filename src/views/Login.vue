<template>
  <div>
    <el-row type="flex" justify="center">
      <el-card>
        <el-row>
          <el-form :model="loginForm" ref="loginForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleLogin">登陆</el-button>
            <el-button type="primary" @click="handleLogin">注册</el-button>
          </el-form>
        </el-row>
        <el-row></el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { login } from "@/api/user";
export default {
  data() {
    return {
      loginForm: {
        username: "jjc",
        password: "jjc"
      },
      showSignin: false
    };
  },
  methods: {
    handleLogin() {
      login(this.loginForm).then(res => {
        const user = res.user;
        switch (user.authority) {
          case -2:
            this.$message({
              showClose: true,
              message: "用户名不存在！",
              type: "error"
            });
            break;
          case -1:
            this.$message({
              showClose: true,
              message: "用户名或密码错误！",
              type: "error"
            });
            break;
          default: {
            this.$message({
              showClose: true,
              message: "登陆成功",
              type: "success"
            });
            localStorage.setItem("loginResult", JSON.stringify(res));
            this.$router.back();
          }
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="less">
</style>