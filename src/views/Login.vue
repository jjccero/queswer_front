<template>
  <div>
    <el-card v-if="showLogin" class="form_card">
      <el-form :model="loginForm" ref="loginForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleLogin">登陆</el-button>
        <el-button @click="showLogin=false">注册</el-button>
      </el-form>
    </el-card>
    <el-card v-else class="form_card">
      <el-form
        :rules="signupRules"
        label-position="left"
        :model="signupForm"
        ref="signupForm"
        label-width="100px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="signupForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="signupForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordConfirm">
          <el-input type="password" v-model="signupForm.passwordConfirm"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleSignup">注册</el-button>
        <el-button @click="showLogin=true">返回登陆</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { login, signup } from "@/api/user";
export default {
  data() {
    return {
      loginForm: {
        username: "jjc",
        password: "jjc"
      },
      signupForm: {
        username: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
        sex: 0,
        intro: ""
      },
      signupRules: {
        username: [
          {
            required: true,
            message: "用户名不能为空"
          },
          { min: 3, max: 15, message: "长度在3到15个字符" }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空"
          },
          { min: 3, max: 15, message: "长度在3到15个字符" }
        ],
        passwordConfirm: [
          {
            required: true,
            message: "请确认密码"
          },
          {
            validator: (rule, value, callback) => {
              if (value !== this.signupForm.password)
                callback(new Error("密码输入不一致"));
              callback();
            },
            trigger: "change"
          }
        ]
      },
      showLogin: true
    };
  },
  methods: {
    handleLogin() {
      const data = JSON.parse(JSON.stringify(this.loginForm));
      login(data).then(res => {
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
    },
    handleSignup() {
      this.$refs.signupForm.validate(vaild => {
        if (vaild) {
          const data = {
            username: this.signupForm.username,
            password: this.signupForm.password
          };
          signup(data).then(res => {
            if (res > 0) {
              this.loginForm.username = data.username;
              this.loginForm.password = data.password;
              this.showLogin = true;
              this.$message({
                showClose: true,
                message: "注册成功",
                type: "success"
              });
            }
          });
          console.log(data);
        }
      });
    }
  },
  created() {}
};
</script>
<style lang="less">
.form_card {
  width: 600px;
  margin: 50px auto;
}
</style>