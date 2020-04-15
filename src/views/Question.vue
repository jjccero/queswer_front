<template>
  <div style="text-align:left;">
    <div style="float:left;">
      <el-tag
        v-for="topic in questionInfo.topics"
        :key="topic.tId"
        style="margin-right:10px;"
      >{{topic.topic_name}}</el-tag>
    </div>
    <div style="float:right;">
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
    <h1 style="clear:both;">{{questionInfo.question.question}}</h1>
    <div style="color:gray;font-size:10px;margin-top:10px;">问题描述：</div>
    <div v-html="questionInfo.question.detail"></div>
    <el-card
      v-if="questionInfo.defaultAnswer != null||questionInfo.userAnswer!= null"
      style="margin-top:10px;"
      :body-style="{ padding: '10px' }"
    >
      <div v-if="questionInfo.defaultAnswer != null">
        <answer
          :answerInfo="questionInfo.defaultAnswer"
          :uId="uId"
          :answered="false"
          :questioned="questionInfo.questioned"
          @deleteAnswer="deleteAnswer"
        ></answer>
      </div>
      <div v-if="questionInfo.userAnswer!= null">
        <answer
          :answerInfo="questionInfo.userAnswer"
          :answered="true"
          :questioned="questionInfo.questioned"
          @deleteAnswer="deleteAnswer"
          @insertAnswer="showAnswerDrawer=true"
        ></answer>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '10px' }">
      <el-divider
        class="divider"
      >{{answerInfos.length===0?'暂无其他回答':('更多'+answerInfos.length+'个回答')}}</el-divider>
      <template v-for="answerInfo in answerInfos">
        <div :key="answerInfo.answer.aId" style="text-align:left;">
          <answer
            :answerInfo="answerInfo"
            :answered="false"
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
  _insertAnswer,
  _updateAnswer,
  _deleteAnswer
} from "../js/api";
import answer from "../components/Answer";
import userInfo from "../components/UserInfo";
export default {
  data() {
    return {
      questionInfo: {
        qId: this.$route.query.qId,
        question: {
          anonymous: false,
          title: null,
          detail: null,
          gmtCreate: 0,
          gmtModify: null,
          uId: null
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
        uId: null,
        qId: null,
        aId: null,
        ans: null,
        anonymous: false,
        gmtCreate: 0,
        gmtModify: null
      },
      showAnswerDrawer: false
    };
  },
  components: {
    answer,
    userInfo
  },
  created() {
    var qId = this.$route.query.qId;
    if (qId == null) return;
    _getQuestion({
      qId: qId,
      aId: this.$route.query.aId,
      uId: this.uId
    }).then(res => {
      this.questionInfo = res.data;
      if (this.questionInfo.userAnswer != null) {
        this.answer = this.questionInfo.userAnswer.answer;
      }
      _getAnswers({
        qId: this.$route.query.qId,
        uId: this.uId
      }).then(res => {
        var answerInfos = res.data;
        var old_length = this.answerInfos.length;
        for (var i = 0; i < answerInfos.length; ++i) {
          var answerInfo = answerInfos[i];
          if (
            this.questionInfo.defaultAnswer != null &&
            answerInfo.answer.aId === this.questionInfo.defaultAnswer.answer.aId
          ) {
            //若已经是默认回答
            this.questionInfo.defaultAnswer = answerInfo;
          } else if (
            this.questionInfo.userAnswer != null &&
            answerInfo.answer.aId === this.questionInfo.userAnswer.answer.aId
          ) {
            this.questionInfo.userAnswer = answerInfo;
          } else {
            var aIdKey = "" + answerInfo.answer.aId;
            if (this.answerSet.hasOwnProperty(aIdKey)) {
              //set中已存在这个key，应该替换掉旧的
              console.log(answerInfo);
              this.answerInfos[this.answerSet[aIdKey]] = answerInfo;
            } else {
              //不存在这个key
              this.answerInfos.push(answerInfo);
              this.answerSet[aIdKey] = old_length++;
            }
          }
        }
      });
    });
  },
  methods: {
    handleFollow() {
      if (this.uId == null) {
        this.$toLogin(this);
        return;
      }
      var params = {
        qId: this.$route.query.qId,
        uId: this.uId
      };
      if (this.questionInfo.followed == false) {
        _insertFollow(params).then(res => {
          if (res.data === true) {
            this.$message({
              showClose: true,
              message: "关注成功",
              type: "success"
            });
            this.questionInfo.followed = true;
            ++this.questionInfo.followCount;
          } else {
            this.$message({
              showClose: true,
              message: "已关注",
              type: "error"
            });
          }
        });
      } else {
        _deleteFollow(params).then(res => {
          if (res.data) {
            this.$message({
              showClose: true,
              message: "取消关注成功",
              type: "success"
            });
            this.questionInfo.followed = false;
            --this.questionInfo.followCount;
          } else {
            this.$message({
              showClose: true,
              message: "已取消关注",
              type: "error"
            });
          }
        });
      }
    },
    deleteAnswer() {
      var params = {
        uId: this.uId,
        aId: this.answer.aId
      };
      _deleteAnswer(params).then(res => {
        if (res.data === true) {
          this.questionInfo.userAnswer = null;
          this.answer.aId = null;
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        }
      });
    },
    insertAnswer() {
      this.answer.uId = this.uId;
      this.answer.qId = this.questionInfo.question.qId;
      if (this.answer.aId != null) {
        _updateAnswer(this.answer).then(res => {
          if (res.data === true) {
            this.answer.gmtModify = this.$nowTimestamp();
            this.questionInfo.userAnswer.answer = this.answer;
            this.questionInfo.userAnswer.userInfo = this.$userInfo(
              this.answer.anonymous
            );
            this.showAnswerDrawer = false;
          }
        });
      } else {
        _insertAnswer(this.answer).then(res => {
          var aId = Number(res.data);
          if (aId > 0) {
            this.answer.aId = res.data;
            this.answer.gmtCreate = this.$nowTimestamp();
            var answerInfo = {
              answer: this.answer,
              against: 0,
              agree: 0,
              attituded: null,
              userInfo: this.$userInfo(this.answer.anonymous)
            };
            this.questionInfo.userAnswer = answerInfo;
            this.showAnswerDrawer = false;
          }
        });
      }
    }
  },
  computed: {
    uId() {
      return this.$store.getter.uId;
    }
  }
};
</script>

<style>
.title {
  clear: both;
  font-size: 30px;
  font-weight: bold;
}
.follow {
  font-size: 17px;
}
.divider {
  margin: 10px 0 10px 0;
}
</style>
