<template>
  <div>
    <div>
      <UserInfo :userInfo="reviewInfo.userInfo"></UserInfo>
      <div class="review_time">
        <span>{{reviewInfo.questioned?"(提问者)":" "}}</span>
        <span>{{reviewInfo.answered?"(回答者)":" "}}</span>
        <span>{{(review.reply_rid!=null?'回复':'评论')+'于 '+review_time}}</span>
      </div>
    </div>
    <div></div>
    <div
      style="margin-top:10px;"
      :class="{'review_deleted':review.review===null}"
    >{{review.review!=null?review.review:'该评论已删除'}}</div>

    <div>
      <el-button
        type="text"
        @click="updateApprove"
        :class="{'approved':!reviewInfo.approved}"
        :loading="approveLoading"
      >赞{{reviewInfo.approveCount}}</el-button>
      <el-button type="text" @click="reply" style="color:gray;" icon="el-icon-chat-dot-round">回复</el-button>
      <el-button
        type="text"
        @click="deleteReview"
        v-if="canDelete"
        style="color:red;"
        icon="el-icon-delete"
      >删除</el-button>
    </div>
    <el-divider
      class="review_divider"
      content-position="right"
    >{{review.rid}}{{review.reply_rid!=null?'->'+review.reply_rid:""}}</el-divider>
  </div>
</template>
<script>
import { _deleteReview, _updateApprove } from "../js/api";
import UserInfo from "../components/UserInfo";
export default {
  name: "review",
  data() {
    return {
      review: this.reviewInfo.review,
      approveLoading: false
    };
  },
  props: ["reviewInfo", "uid", "reply_userInfo"],
  computed: {
    review_time() {
      return this.$getTimeString(this.review.review_time);
    },
    reviewed() {
      return this.uid != null && this.uid == this.review.uid;
    },
    canDelete() {
      return this.reviewed && !this.review.deleted;
    }
  },
  created() {},
  methods: {
    reply() {
      this.$emit("reply", this.review.rid);
    },
    deleteReview() {
      var params = {
        uid: this.uid,
        rid: this.review.rid
      };
      _deleteReview(params).then(res => {
        if (res.data === true) {
          this.review.review = null;
          this.review.deleted = true;
        }
      });
    },
    updateApprove() {
      this.approveLoading = true;
      var approve = !this.reviewInfo.approved;
      var params = {
        uid: this.uid,
        rid: this.review.rid,
        approve: approve
      };
      _updateApprove(params).then(res => {
        if (res.data === true) {
          this.reviewInfo.approved = !this.reviewInfo.approved;
          if (approve) ++this.reviewInfo.approveCount;
          else --this.reviewInfo.approveCount;
        }
        this.approveLoading = false;
      });
    }
  },
  components: {
    UserInfo
  }
};
</script>
<style scoped>
.review_deleted {
  color: red;
}
.approved {
  color: gray;
}
.review_time {
  float: right;
  margin: 0 0;
  text-align: left;
  font-size: 10px;
  color: gray;
}
.review_divider {
  margin: 0 0 10px 0;
}
</style>