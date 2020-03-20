<template>
  <div>
    <div>
      <userInfo :userInfo="answerInfo.userInfo"></userInfo>
    </div>
    <div v-html="answer.answer" class="answer"></div>
    <div
      class="gmt_create"
      style="margin-top:10px;"
    >回答于 {{$getTimeString(answer.gmt_modify!=null?answer.gmt_modify:answer.gmt_create)}}</div>
    <div style="margin:10px 0 10px 0;">
      <attitude :uid="uid" :answerInfo="answerInfo"></attitude>
      <el-button
        type="text"
        @click="updateAnswer"
        v-if="answered"
        icon="el-icon-edit-outline"
        style="color:gray;"
      >修改</el-button>
      <el-button
        type="text"
        @click="deleteAnswer"
        v-if="answered"
        icon="el-icon-delete"
        style="color:red;"
      >删除</el-button>
      <el-button size="small" type="text" icon="el-icon-warning-outline" style="color:gray;">举报</el-button>
    </div>
    <el-divider class="divider"></el-divider>
  </div>
</template>
<script>
import userInfo from "../components/UserInfo";
import attitude from "../components/Attitude";
export default {
  name: "answer",
  components: {
    userInfo,
    attitude
  },
  data() {
    return {
      answer: this.answerInfo.answer
    };
  },
  created() {},
  methods: {
    deleteAnswer() {
      this.$emit("deleteAnswer");
    },
    updateAnswer() {}
  },
  props: ["answerInfo", "uid", "answered", "questioned"]
};
</script>

<style>
.answer {
  clear: both;
  text-align: left;
  min-height: 200px;
  overflow: hidden;
}
</style>