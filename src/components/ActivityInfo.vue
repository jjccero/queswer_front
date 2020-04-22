<template>
  <div style="text-align:left;">
    <div style="height:30px;line-height:30px;">
      <b style="float:left;clear:left;">{{actionStr}}</b>
      <span
        class="gmt_create"
        style="float:right;"
      >{{$getTimeString(activityInfo.activity.gmtCreate)}}</span>
    </div>
    <div v-if="hasPeople||hasAnswer||hasQuestion" style="height:30px;">
      <userInfoSmall v-if="hasPeople" :userInfo="activityInfo.info"></userInfoSmall>
      <userInfoSmall v-else-if="hasAnswer" :userInfo="activityInfo.info.defaultAnswer.userInfo"></userInfoSmall>
      <userInfoSmall v-else :userInfo="activityInfo.info.userInfo"></userInfoSmall>
    </div>
    <div
      v-if="hasQuestion"
      @click="toQuestion"
      class="question"
      style="margin-top:10px;"
    >{{activityInfo.info.question.title}}</div>
    <AnswerInfo
      v-if="hasAnswer"
      style="margin-top:10px;"
      :answerInfo="activityInfo.info.defaultAnswer"
    />
    <el-divider class="divider"></el-divider>
  </div>
</template>
<script>
import userInfoSmall from "../components/UserInfoSmall";
import AnswerInfo from "../components/AnswerInfo";
export default {
  name: "ActivityInfo",
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
  props: ["activityInfo"],
  methods: {
    toQuestion() {
      window.open(
        this.$router.resolve({
          path: "/question",
          query: {
            questionId: this.activityInfo.info.question.questionId,
            answerId: this.answerId
          }
        }).href,
        "_blank"
      );
    }
  },
  computed: {
    actionStr() {
      return this.actionStrs[this.activityInfo.activity.act];
    },
    hasQuestion() {
      return [1, 2, 4, 5].indexOf(this.activityInfo.activity.act) != -1;
    },
    hasAnswer() {
      return [4, 5].indexOf(this.activityInfo.activity.act) != -1;
    },
    hasPeople() {
      return this.activityInfo.activity.act === 0;
    }
  }
};
</script>