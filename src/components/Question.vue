<template>
  <div style="text-align:left;">
    <div>
      <el-tag
        v-for="topic in topics"
        :key="topic.tid"
        style="margin-right:10px;"
      >{{topic.topic_name}}</el-tag>
    </div>
    <div>
      <el-button v-if="followed" type="text" @click="handleFollow" icon="el-icon-star-on"></el-button>
      <el-button v-else type="text" @click="handleFollow" icon="el-icon-star-off"></el-button>
      <el-button type="text" class="follow" style="margin-left:0">{{followCount}}</el-button>
      <el-divider direction="vertical"></el-divider>
      <i class="el-icon-view"></i>
      <span class="viewed">{{viewCount}}</span>
      <el-divider direction="vertical"></el-divider>

      <el-button type="text" @click="showAnswerDrawer=true" icon="el-icon-edit">回答</el-button>
    </div>
    <div class="title">{{question.question}}</div>
    <div style="color:gray;font-size:10px;">问题描述：</div>
    <div v-html="question.detail"></div>
    <div></div>

    <el-card :body-style="{ padding: '10px' }">
      <answer
        v-if="answers.length>0"
        :answerInfo="answers[0]"
        :uid="uid"
        :answered="true"
        :questioned="questioned"
        @deleteAnswer="deleteAnswer"
      ></answer>
      <el-divider>更多回答</el-divider>
      <template v-for="answerInfo in answers">
        <div :key="answerInfo.answer.aid" style="text-align:left;">
          <answer
            :answerInfo="answerInfo"
            :uid="uid"
            :answered="isAnswerer(answerInfo.answer.aid)"
            :questioned="questioned"
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
  _addFollow,
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
      question: {},
      followed: false,
      followCount: 0,
      viewCount: 0,
      topics: [],
      answers: [],
      answer: {
        uid: null,
        qid: null,
        aid: null,
        answer: null,
        anonymous: false
      },
      questioned: false,
      showAnswerDrawer: false
    };
  },
  components: {
    answer,
    UserInfo
  },
  created() {
    this.answer.uid = this.uid;
    this.answer.qid = Number(this.$route.query.qid);
    _getQuestion({
      qid: this.answer.qid,
      uid: this.uid
    }).then(res => {
      if (res.data.answer != null) this.answer = res.data.answer;
      this.question = res.data.question;
      this.topics = res.data.topics;
      this.followed = res.data.followed;
      this.followCount = res.data.followCount;
      this.viewCount = res.data.viewCount;
      this.questioned = res.data.questioned;
      _getAnswers({
        qid: this.answer.qid,
        uid: this.uid
      }).then(res => {
        this.answers = res.data;
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
        _addFollow(params).then(res => {
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
    deleteFromList(aid) {
      for (var i = 0; i < this.answers.length; ++i) {
        var answerInfo = this.answers[i];
        if (answerInfo.answer.aid === aid) {
          this.answers.splice(i, 1);
          return;
        }
      }
    },
    insertAnswer() {
      if (this.answer.aid != null) {
        _updateAnswer(this.answer).then(res => {
          if (res.data === true) {
            if (this.answer != null) {
              this.deleteFromList(this.answer.aid);
            }
            this.answer["aid"] = res.data;
            this.answer["answer_time"] = this.$nowTimestamp();
            var answerInfo = {
              answer: this.answer,
              against: 0,
              agree: 0,
              attituded: null,
              userInfo: this.$userInfo(this.answer.anonymous)
            };
            this.answers.push(answerInfo);
            this.showAnswerDrawer = false;
          }
        });
      } else {
        _insertAnswer(this.answer).then(res => {
          var aid = Number(res.data);
          if (aid > 0) {
            if (this.answer != null) {
              this.deleteFromList(this.answer.aid);
            }
            this.answer["aid"] = res.data;
            this.answer["answer_time"] = this.$nowTimestamp();
            var answerInfo = {
              answer: this.answer,
              against: 0,
              agree: 0,
              attituded: null,
              userInfo: this.$userInfo(this.answer.anonymous)
            };
            this.answers.push(answerInfo);
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
  computed: {
    existAnswer() {
      return this.answer.aid != null;
    }
  }
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
