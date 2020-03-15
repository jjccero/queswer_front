<template>
  <div class="questionInfo">
    <div @click="toQuestion" class="question">{{questionInfo.question.question}}</div>
    <div v-if="questionInfo.defaultAnswer!=null">
      <div style="margin-top:10px;clear: left; ">
        <userInfo :userInfo="questionInfo.defaultAnswer.userInfo"></userInfo>
      </div>
      <div
        style="clear: left;"
        @click="showAll"
        ref="answer"
        class="answer"
        :style="answerStyle"
        v-html="questionInfo.defaultAnswer.answer.answer"
      ></div>
    </div>
    <div v-else>等你回答</div>
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
  data() {
    return {
      isShowAll: false,
      answerStyle: {
        height: "200px"
      }
    };
  },
  methods: {
    showAll() {
      this.isShowAll = !this.isShowAll;
      if (this.isShowAll) {
        var obj = this.$refs.answer;
        this.answerStyle.height = obj.scrollHeight + "px";
      } else {
        this.answerStyle.height = "200px";
      }
    },
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
<style>
.question {
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.questionInfo {
  text-align: left;
  overflow: hidden;
  float: left;
}
</style>