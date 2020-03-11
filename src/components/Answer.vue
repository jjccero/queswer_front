<template>
  <div style="width:100%;">
    <div>
      <userInfo :userInfo="answerInfo.userInfo"></userInfo>
    </div>
    <div v-html="answer.answer" class="answer"></div>
    <div class="answer_time">回答于 {{answer_time}}</div>
    <div>
      <el-button
        size="small"
        @click="addAttitude(true)"
        icon="el-icon-caret-top"
        type="primary"
        plain
      >{{getCountString(agree)}} {{attituded?"已赞同":''}}</el-button>
      <el-button
        size="small"
        @click="addAttitude(false)"
        icon="el-icon-caret-bottom"
        style="margin-left:0px;"
        type="danger"
        plain
      >{{getCountString(against)}} {{attituded===false?"已反对":''}}</el-button>
      <el-button
        type="text"
        :loading="reviewLoading"
        @click="getReviews"
        icon="el-icon-chat-round"
        style="color:gray;"
      >{{showReview?'收起':'评论'}}</el-button>
      <el-button
        type="text"
        @click="deleteAnswer"
        v-if="answered"
        icon="el-icon-delete"
        style="color:red;"
      >删除</el-button>
      <el-button type="text" icon="el-icon-warning-outline" style="color:gray;">举报</el-button>
    </div>
    <el-card :body-style="{ padding: '10px' }" v-if="showReview" style="margin:10px 0 0 0;">
      <el-row>
        <template v-for="reviewInfo in reviews">
          <div :key="reviewInfo.review.rid">
            <review
              :reviewInfo="reviewInfo"
              :uid="uid"
              :reply_userInfo="getUserInfo(reviewInfo.review.reply_rid)"
              @reply="reply"
            ></review>
          </div>
        </template>
        <el-row v-show="reviews.length==0">暂无评论</el-row>
      </el-row>
      <el-row>
        <el-col :span="12">{{ReplyInfo}}</el-col>
        <el-col :span="12">
          <el-button type="primary" @click="reply_rid=null" v-show="reply_rid!=null">取消</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-input v-model="review"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addReview">添加评论</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-divider direction="horizontal" class="answer_divider">{{answer.aid}}</el-divider>
  </div>
</template>
<script>
import {
  _getAttitude,
  _addAttitude,
  _deleteAttitude,
  _getReviews,
  _addReview
} from "../js/api";
import review from "../components/Review";
import UserInfo from "../components/UserInfo";
export default {
  name: "answer",
  components: {
    review,
    UserInfo
  },
  data() {
    return {
      attituded: this.answerInfo.attituded,
      agree: this.answerInfo.agree,
      against: this.answerInfo.against,
      showReview: false,
      reviews: [],
      review: "",
      reply_rid: null,
      reviewLoading: false,
      answer: this.answerInfo.answer
    };
  },
  created() {
    var params = {
      uid: this.uid,
      aid: this.answer.aid
    };
  },
  methods: {
    addAttitude(attitude) {
      if (this.uid == null) {
        this.$toLogin(this);
        return;
      }
      var params = {
        uid: this.uid,
        aid: this.answer.aid
      };
      if (this.attituded === attitude) {
        _deleteAttitude(params).then(res => {
          if (res.data === true) {
            this.attituded = null;
            if (attitude) {
              --this.agree;
            } else {
              --this.against;
            }
          }
        });
      } else {
        params["attitude"] = attitude;
        _addAttitude(params).then(res => {
          if (res.data === true) {
            if (attitude) {
              if (this.attituded === false) --this.against;
              ++this.agree;
              this.attituded = true;
            } else {
              if (this.attituded === true) --this.agree;
              ++this.against;
              this.attituded = false;
            }
          }
        });
      }
    },
    getReviews() {
      this.showReview = !this.showReview;
      if (this.showReview === false) return;
      this.reviewLoading = true;
      _getReviews({ aid: this.answer.aid, uid: this.uid }).then(res => {
        this.reviews = res.data;
        this.reviewLoading = false;
      });
    },
    addReview() {
      var reviewForm = {
        uid: this.uid,
        aid: this.answer.aid,
        reply_rid: this.reply_rid,
        review: this.review
      };
      _addReview(reviewForm).then(res => {
        var rid = Number(res.data);
        if (rid > 0) {
          this.review = "";
          reviewForm["rid"] = rid;
          reviewForm["review_time"] = this.$nowTimestamp();
          var reviewInfo = {
            review: reviewForm,
            userInfo: this.$userInfo(false),
            anonymous: true,
            approved: false,
            approveCount: 0,
            questioned: this.questioned && !this.answered,
            answered: this.answered
          };
          console.log(reviewInfo);

          this.reviews.push(reviewInfo);
        }
      });
    },
    reply(reply_rid) {
      this.reply_rid = reply_rid;
    },
    getCountString(count) {
      return this.$getCountString(count);
    },
    getUserInfo(rid) {
      if (rid != null) return this.reviewSet[rid];
      else return null;
    },
    deleteAnswer() {
      this.$emit("deleteAnswer");
    }
  },
  props: ["answerInfo", "uid", "answered", "questioned"],
  computed: {
    answer_time() {
      return this.$getTimeString(this.answer.answer_time);
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
        set[element.rid] = element.userInfo;
      });
      return set;
    }
  }
};
</script>

<style>
.answer_time {
  font-size: 10px;
  color: gray;
}
.answer_divider {
  margin: 10px 0 10px 0;
}
.answer {
  margin-top: 10px;
  text-align: left;
  min-height: 200px;
}
</style>