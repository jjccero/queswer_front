<template>
  <div>
    <div style="height:30px;">
      <userInfoSmall style="float:left;" :userInfo="reviewInfo.userInfo"></userInfoSmall>
      <span v-if="reply_userInfo!=null" style="float:left;">
        <i class="el-icon-arrow-right reply_i"></i>
        <userInfoSmall style="margin-left:20px;" :userInfo="reply_userInfo"></userInfoSmall>
      </span>
      <div class="gmt_create review_time">
        <span>{{reviewInfo.questioned?"(提问者)":" "}}</span>
        <span>{{reviewInfo.answered?"(回答者)":" "}}</span>
        <span>{{(review.reply_rid!=null?'回复':'评论')+'于 '+$getTimeString(this.review.gmt_create)}}</span>
      </div>
    </div>
    <div
      style="clear:left;margin-top:10px;"
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
    <el-divider class="review_divider" content-position="right"></el-divider>
  </div>
</template>
<script>
import { _deleteReview, _updateApprove } from "../js/api";
import userInfoSmall from "../components/UserInfoSmall";
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
    userInfoSmall
  }
};
</script>
<style scoped>
.review_deleted {
  color: gray;
}
.approved {
  color: gray;
}
.review_time {
  float: right;
  text-align: left;
  line-height: 30px;
}
.review_divider {
  margin: 0 0 10px 0;
}
.reply_i {
  float: left;
  margin-left: 20px;
  line-height: 30px;
  font-weight: bold;
}
</style>