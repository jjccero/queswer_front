<template>
  <div class="questionInfo" style="width:100%;">
    <div style="line-height:30px;" v-if="!activity.userId">
      <div v-if="questionInfo.defaultAnswer!=null">
        <userInfoSmall style :userInfo="questionInfo.defaultAnswer.userInfo"></userInfoSmall>
        <b style="margin-left:10px;">{{actionStr}}</b>
        <span
          class="gmt_create"
          style="float:right;"
        >{{$getTimeString(questionInfo.defaultAnswer.answer.gmtCreate)}}</span>
      </div>
      <div v-else>
        <userInfoSmall style :userInfo="questionInfo.userInfo"></userInfoSmall>
        <b style="margin-left:10px;">{{actionStr}}</b>
        <span
          class="gmt_create"
          style="float:right;"
        >{{$getTimeString(questionInfo.question.gmtCreate)}}</span>
      </div>
    </div>
    <div v-else>
      <b>{{actionStr}}</b>
      <span class="gmt_create" style="float:right;">{{$getTimeString(activity.gmtCreate)}}</span>
    </div>
    <div
      @click="toQuestion"
      class="question"
      style="margin-top:10px;"
    >{{questionInfo.question.title}}</div>
    <div style="margin-top:10px;">
      <div v-if="questionInfo.defaultAnswer!=null">
        <AnswerInfo :answerInfo="questionInfo.defaultAnswer" />
      </div>
      <div v-else>
        <div v-html="questionInfo.question.detail"></div>
      </div>
    </div>
    <el-divider class="divider"></el-divider>
  </div>
</template>
<script>
import userInfoSmall from "../components/UserInfoSmall";
import AnswerInfo from "../components/AnswerInfo";
export default {
  name: "questionInfo",
  props: ["questionInfo", "activity"],
  components: {
    AnswerInfo,
    userInfoSmall
  },
  data() {
    return {
      actionStrs: [
        "关注了用户",
        "添加了问题",
        "关注了问题",
        "关注了话题",
        "回答了问题",
        "赞同了回答"
      ]
    };
  },
  methods: {
    toQuestion() {
      window.open(
        this.$router.resolve({
          path: "/question",
          query: {
            questionId: this.questionInfo.question.questionId,
            answerId: this.answerId
          }
        }).href,
        "_blank"
      );
    }
  },
  computed: {
    answerId() {
      return this.questionInfo.defaultAnswer != null
        ? this.questionInfo.defaultAnswer.answer.answerId
        : null;
    },
    actionStr() {
      return this.activity ? this.actionStrs[this.activity.act] : "";
    }
  }
};
</script>
<style>
.questionInfo {
  width: 100%;
  text-align: left;
  clear: both;
}
</style>