<template>
  <div>
    <div>
      <UserInfo :userInfo="review.userInfo"></UserInfo>
      <span class="review_time">{{(review.reply_rid!=null?'回复':'评论')+'于 '+review_time}}</span>
    </div>
    <div>
      <span>{{review.questioner?"(提问者)":" "}}</span>
      <span>{{review.answerer?"(回答者)":" "}}</span>
    </div>
    <div
      style="margin-top:10px;"
      :class="{'review_deleted':review.review===null}"
    >{{review.review!=null?review.review:'该评论已删除'}}</div>

    <div>
      <el-button type="text" @click="reply" style="color:gray;">赞0</el-button>
      <el-button type="text" @click="reply" style="color:gray;" icon="el-icon-chat-dot-round">回复</el-button>
      <el-button
        type="text"
        @click="deleteReview"
        v-if="canDeleteReview()"
        style="color:red;"
        icon="el-icon-delete"
      >删除</el-button>
    </div>
    <el-divider class="review_divider">{{review.rid}}</el-divider>
  </div>
</template>
<script>
import { _deleteReview } from "../js/api";
import UserInfo from "../components/UserInfo";
export default {
  name: "review",
  props: ["review", "uid", "reply_userInfo", "answerd"],
  computed: {
    review_time() {
      return this.$getTimeString(this.review.review_time);
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
        if (res.data === 1) {
          this.review.review = null;
        }
      });
    },
    canDeleteReview() {
      if (this.review.uid != null)
        return this.uid === this.review.uid && this.review.review != null;
      return false;
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