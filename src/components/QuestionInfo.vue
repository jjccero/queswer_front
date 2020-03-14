<template>
  <div style="text-align:left;height:200px;">
    <div>
      {{questionInfo.userInfo.nickname}}回答了问题
      <!-- <userInfo :userInfo="questionInfo.userInfo"></userInfo> -->
    </div>
    <div class="question">{{questionInfo.question.question}}</div>
    <div
      v-html="questionInfo.defaultAnswer.answer.answer"
      style="cursor:pointer;"
      @click="toQuestion"
    ></div>
    <el-divider>.....</el-divider>
  </div>
</template>
<script>
import userInfo from "../components/UserInfo";
export default {
  name: "questionInfo",
  props: ["questionInfo"],
  components: {
    userInfo
  },
  methods: {
    toQuestion() {
      this.$router.push({
        path: "/question",
        query: {
          qid: this.questionInfo.question.qid,
          aid: this.questionInfo.defaultAnswer.answer.aid
        }
      });
    }
  }
};
</script>
<style scoped>
.question {
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
}
</style>