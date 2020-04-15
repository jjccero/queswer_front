<template>
  <span style="height: 40px;margin-top:4px;">
    <el-button
      size="small"
      @click="updateAttitude(true)"
      icon="el-icon-caret-top"
      type="primary"
      plain
    >{{getCountString(agree)}} {{attituded?"已赞同":''}}</el-button>
    <el-button
      size="small"
      @click="updateAttitude(false)"
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
      style="color:gray;margin-left:10px;"
    >{{reviewCount}}</el-button>
    <el-dialog :visible.sync="showReview">
      <div slot="title" class="review_title">
        <b>共{{reviewCount}}条评论</b>
      </div>
      <el-card :body-style="{ padding: '10px' }" v-if="showReview">
        <div style="height:600px;overflow:auto;">
          <template v-for="reviewInfo in reviews">
            <div :key="reviewInfo.review.rId">
              <review
                :reviewInfo="reviewInfo"
                :reply_userInfo="getUserInfo(reviewInfo.review.replyRId)"
                @reply="reply"
              ></review>
            </div>
          </template>
        </div>
        <div style="margin-top:10px;">
          <el-input style="width:420px;" v-model="review" :placeholder="ReplyInfo"></el-input>
          <el-button
            style="float:right;margin-bottom:10px;"
            type="primary"
            @click="insertReview"
            plain
          >评论</el-button>
          <el-button
            type="danger"
            @click="replyRId=null"
            v-show="replyRId!=null"
            style="float:right;margin:0 10px 0 0;"
            plain
          >取消</el-button>
        </div>
      </el-card>
    </el-dialog>
  </span>
</template>
<script>
import review from "../components/Review";
import {
  _updateAttitude,
  _deleteAttitude,
  _getReviews,
  _insertReview
} from "../js/api";
export default {
  name: "attitude",
  components: {
    review
  },
  computed: {
    ReplyInfo() {
      var notReply = this.replyRId === null;
      return (
        (notReply ? "评论" : "回复") +
        "给" +
        (notReply
          ? this.answerInfo.userInfo.user.nickname
          : this.getUserInfo(this.replyRId).user.nickname)
      );
    },
    reviewSet() {
      var set = {};
      this.reviews.forEach(element => {
        set[element.review.rId] = element.userInfo;
      });
      return set;
    },
    uId() {
      return this.$store.getter.uId;
    }
  },

  props: ["answerInfo"],
  data() {
    return {
      attituded: this.answerInfo.attituded,
      agree: this.answerInfo.agree,
      against: this.answerInfo.against,
      showReview: false,
      reviews: [],
      review: "",
      replyRId: null,
      reviewLoading: false,
      reviewCount: this.answerInfo.reviewCount,
      center: true
    };
  },
  methods: {
    getReviews() {
      this.showReview = !this.showReview;
      if (this.showReview === false) return;
      this.reviewLoading = true;
      _getReviews({ aId: this.answerInfo.answer.aId, uId: this.uId }).then(
        res => {
          this.reviews = res.data;
          this.reviewLoading = false;
        }
      );
    },
    insertReview() {
      var reviewForm = {
        uId: this.uId,
        aId: this.answerInfo.answer.aId,
        replyRId: this.replyRId,
        review: this.review
      };
      _insertReview(reviewForm).then(res => {
        var rId = Number(res);
        if (rId > 0) {
          this.review = "";
          reviewForm["rId"] = rId;
          reviewForm["gmtCreate"] = this.$nowTimestamp();
          var reviewInfo = {
            review: reviewForm,
            userInfo: this.$userInfo(false),
            anonymous: true,
            approved: false,
            approveCount: 0,
            questioned: this.questioned && !this.answered,
            answered: this.answered
          };
          this.reviews.push(reviewInfo);
        }
      });
    },
    reply(replyRId) {
      this.replyRId = replyRId;
    },

    getUserInfo(rId) {
      if (rId != null) return this.reviewSet[rId];
      else return null;
    },
    getCountString(count) {
      return this.$getCountString(count);
    },
    updateAttitude(attitude) {
      var params = {
        uId: this.uId,
        aId: this.answerInfo.answer.aId
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
        _updateAttitude(params).then(res => {
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
    }
  }
};
</script>
<style>
.el-dialog {
  width: 600px;
}
.el-dialog > * {
  padding: 0;
}
.el-card__body > ::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.review_title {
  height: 56px;
  line-height: 56px;
  text-align: center;
}
.el-dialog__header {
  height: 56px;
}
</style>