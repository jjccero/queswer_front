<template>
  <div style="text-align:left;">
    <div>
      <el-tag
        v-for="topic in questionInfo.topics"
        :key="topic.tid"
        style="margin-right:10px;"
      >{{topic.topic_name}}</el-tag>
    </div>
    <div>
      <el-button
        v-if="questionInfo.followed"
        type="text"
        @click="handleFollow"
        icon="el-icon-star-on"
      ></el-button>
      <el-button v-else type="text" @click="handleFollow" icon="el-icon-star-off"></el-button>
      <el-button type="text" class="follow" style="margin-left:0">{{questionInfo.followCount}}</el-button>
      <el-divider direction="vertical"></el-divider>
      <i class="el-icon-view"></i>
      <span class="viewed">{{questionInfo.viewCount}}</span>
      <el-divider direction="vertical"></el-divider>

      <el-button type="text" @click="showAnswerDrawer=true" icon="el-icon-edit">回答</el-button>
    </div>
    <div class="title">{{questionInfo.question.question}}</div>
    <div style="color:gray;font-size:10px;">问题描述：</div>
    <div v-html="questionInfo.question.detail"></div>
    <el-card :body-style="{ padding: '10px' }">
      <div
        v-if="questionInfo.defaultAnswer != null&&questionInfo.defaultAnswer != questionInfo.userAnswer"
      >
        <answer
          :answerInfo="questionInfo.defaultAnswer"
          :uid="uid"
          :answered="false"
          :questioned="questionInfo.questioned"
          @deleteAnswer="deleteAnswer"
        ></answer>
      </div>
      <div v-if="questionInfo.userAnswer!= null">
        <el-divider>我的回答</el-divider>
        <answer
          :answerInfo="questionInfo.defaultAnswer"
          :uid="uid"
          :answered="true"
          :questioned="questionInfo.questioned"
          @deleteAnswer="deleteAnswer"
        ></answer>
      </div>
      <el-divider>更多回答</el-divider>
      <template v-for="answerInfo in answerInfos">
        <div :key="answerInfo.answer.aid" style="text-align:left;">
          <answer
            :answerInfo="answerInfo"
            :uid="uid"
            :answered="isAnswerer(answerInfo.answer.aid)"
            :questioned="questionInfo.questioned"
            @deleteAnswer="deleteAnswer"
          ></answer>
        </div>
      </template>
    </el-card>

    <el-drawer
      :visible.sync="showAnswerDrawer"
      size="70%"
      :direction="'btt'"
      style="text-align:center;"
    >
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-input
            type="textarea"
            v-model="answer.answer"
            placeholder="请输入回答"
            :autosize="{ minRows: 8, maxRows:10}"
          ></el-input>
        </el-col>
      </el-row>
      <el-checkbox v-model="answer.anonymous">开启匿名</el-checkbox>
      <el-button type="primary" @click="insertAnswer">提交</el-button>
    </el-drawer>
  </div>
</template>
<script>
import {
  _getQuestion,
  _insertFollow,
  _getAnswers,
  _deleteFollow,
  _getUserInfo,
  _insertAnswer,
  _updateAnswer,
  _deleteAnswer
} from "../js/api";
import answer from "../components/Answer";
import UserInfo from "../components/UserInfo";
export default {
  data() {
    return {
      questionInfo: {
        question: {
          anonymous: false,
          question: null,
          detail: null,
          question_time: 0,
          uid: null
        },
        follow: false,
        followed: false,
        followCount: 0,
        viewCount: 0,
        topics: [],
        questioned: false,
        defaultAnswer: null,
        userAnswer: null
      },
      answerSet: {},
      answerInfos: [],
      answer: {
        uid: null,
        qid: null,
        aid: null,
        answer: null,
        anonymous: false,
        answer_time: null
      },
      showAnswerDrawer: false
    };
  },
  components: {
    answer,
    UserInfo
  },
  created() {
    _getQuestion({
      qid: this.$route.query.qid,
      aid: this.$route.query.aid,
      uid: this.uid
    }).then(res => {
      this.questionInfo = res.data;
      _getAnswers({
        qid: this.$route.query.qid,
        uid: this.uid
      }).then(res => {
        var answerInfos = res.data;
        var old_length = this.answerInfos.length;
        for (var i = 0; i < answerInfos.length; ++i) {
          var answerInfo = answerInfos[i];
          if (
            this.questionInfo.defaultAnswer != null &&
            answerInfo.answer.aid === this.questionInfo.defaultAnswer.answer.aid
          ) {
            //若已经是默认回答
            this.questionInfo.defaultAnswer = answerInfo;
          } else if (
            this.questionInfo.userAnswer != null &&
            answerInfo.answer.aid === this.questionInfo.userAnswer.answer.aid
          ) {
            this.questionInfo.userAnswer = answerInfo;
          } else {
            var aid_key = "" + answerInfo.answer.aid;
            if (this.answerSet.hasOwnProperty(aid_key)) {
              //set中已存在这个key，应该替换掉旧的
              console.log(answerInfo);
              this.answerInfos[this.answerSet[aid_key]] = answerInfo;
            } else {
              //不存在这个key

              this.answerInfos.push(answerInfo);
              this.answerSet[aid_key] = old_length++;
            }
          }
        }
      });
    });
  },
  methods: {
    handleFollow() {
      if (this.uid == null) {
        this.$toLogin(this);
        return;
      }
      var params = {
        qid: this.$route.query.qid,
        uid: this.uid
      };
      if (this.followed == false) {
        _insertFollow(params).then(res => {
          switch (res.data) {
            case 1:
              this.$message({
                showClose: true,
                message: "关注成功",
                type: "success"
              });
              this.followed = true;
              ++this.followCount;
              break;
            default:
              this.$message({
                showClose: true,
                message: "已关注",
                type: "error"
              });
              break;
          }
        });
      } else {
        _deleteFollow(params).then(res => {
          switch (res.data) {
            case 1:
              this.$message({
                showClose: true,
                message: "取消关注成功",
                type: "success"
              });
              this.followed = false;
              --this.followCount;
              break;
            default:
              this.$message({
                showClose: true,
                message: "已取消关注",
                type: "error"
              });
              break;
          }
        });
      }
    },
    deleteAnswer() {
      var params = {
        uid: this.uid,
        aid: this.answer.aid
      };
      _deleteAnswer(params).then(res => {
        if (res.data === true) {
          this.deleteFromList(this.answer.aid);
          this.answer.aid = null;
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        }
      });
    },
    insertAnswer() {
      if (this.answer.aid != null) {
        _updateAnswer(this.answer).then(res => {
          if (res.data === true) {
            this.answer.answer_time = this.$nowTimestamp();
            this.userAnswer.answer = this.answer;
            this.showAnswerDrawer = false;
          }
        });
      } else {
        _insertAnswer(this.answer).then(res => {
          var aid = Number(res.data);
          if (aid > 0) {
            this.answer.aid = res.data;
            this.answer.answer_time = this.$nowTimestamp();
            var answerInfo = {
              answer: this.answer,
              against: 0,
              agree: 0,
              attituded: null,
              userInfo: this.$userInfo(this.answer.anonymous)
            };
            this.answerInfo = answerInfo;
            this.showAnswerDrawer = false;
          }
        });
      }
    },
    isAnswerer(aid) {
      return this.answer.aid === aid;
    }
  },
  props: ["uid"],
  computed: {}
};
</script>

<style>
.title {
  font-size: 30px;
  font-weight: bold;
}
.follow {
  font-size: 17px;
}
</style>
