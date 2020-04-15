<template>
  <div class="questionInfo" style="width:100%;">
    <div style="line-height:30px;">
      <div v-if="questionInfo.defaultAnswer!=null">
        <userInfoSmall style :userInfo="questionInfo.defaultAnswer.userInfo"></userInfoSmall>
        <b style="margin-left:10px;">回答了问题</b>
        <span
          class="gmt_create"
          style="float:right;"
        >{{$getTimeString(questionInfo.defaultAnswer.answer.gmtCreate)}}</span>
      </div>
      <div v-else>
        <userInfoSmall style :userInfo="questionInfo.userInfo"></userInfoSmall>
        <b style="margin-left:10px;">提出了问题</b>
        <span
          class="gmt_create"
          style="float:right;"
        >{{$getTimeString(questionInfo.question.gmtCreate)}}</span>
      </div>
    </div>
    <div
      @click="toQuestion"
      class="question"
      style="margin-top:10px;"
    >{{questionInfo.question.question}}</div>
    <div style="margin-top:10px;">
      <div v-if="questionInfo.defaultAnswer!=null">
        <div
          ref="answer"
          class="questionInfo_answer"
          :style="answerStyle"
          v-html="questionInfo.defaultAnswer.answer.answer"
        ></div>
        <div v-show="!isShowAll" class="hide_all">
          <el-button @click="showAll" type="text" class="showAll_btn" icon="el-icon-arrow-down">查看全文</el-button>
        </div>
        <div style="margin-top:10px;">
          <attitude :answerInfo="questionInfo.defaultAnswer"></attitude>
        </div>
      </div>
      <div v-else>
        <div
          ref="answer"
          class="questionInfo_answer"
          :style="answerStyle"
          v-html="questionInfo.question.detail"
        ></div>
      </div>
    </div>
    <el-divider class="divider"></el-divider>
  </div>
</template>
<script>
import userInfoSmall from "../components/UserInfoSmall";
import attitude from "../components/Attitude";
export default {
  name: "questionInfo",
  props: ["questionInfo"],
  components: {
    attitude,
    userInfoSmall
  },
  data() {
    return {
      isShowAll: false,
      answerStyle: {
        maxHeight: "200px"
      }
    };
  },
  mounted() {
    if (this.questionInfo.defaultAnswer != null) {
      var obj = this.$refs.answer;
      if (obj.scrollHeight < 200) {
        this.isShowAll = true;
      }
    }
  },
  methods: {
    showAll() {
      this.isShowAll = true;
      var obj = this.$refs.answer;
      this.answerStyle.maxHeight = obj.scrollHeight + "px";
    },
    toQuestion() {
      window.open(
        this.$router.resolve({
          path: "/question",
          query: {
            qid: this.questionInfo.question.qid,
            aid: this.aid
          }
        }).href,
        "_blank"
      );
    }
  },
  computed: {
    aid() {
      return this.questionInfo.defaultAnswer != null
        ? this.questionInfo.defaultAnswer.answer.aid
        : null;
    },
    ReplyInfo() {
      var notReply = this.reply_rid === null;
      return (
        (notReply ? "评论" : "回复") +
        "给" +
        (notReply
          ? this.answerInfo.userInfo.nickname
          : this.getUserInfo(this.reply_rid).nickname)
      );
    },
    reviewSet() {
      var set = {};
      this.reviews.forEach(element => {
        set[element.review.rid] = element.userInfo;
      });
      return set;
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
.questionInfo_answer {
  clear: both;
  overflow: hidden;
  text-overflow: ellipsis;
}
.showAll_btn {
  width: 100%;
  color: black;
  text-align: center;
}

.hide_all {
  position: relative;
  height: 40px;
  width: 100%;
  margin-top: -40px;
  margin-left: -10px;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 255, 255, 0) 0%,
    #fff 70%
  );
}
</style>