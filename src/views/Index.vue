<template>
  <div>
    <el-tabs type="border-card" v-model="tabIndex" style="margin-bottom:10px;">
      <el-tab-pane label="热榜" name="0">
        <div
          style="overflow:auto;"
          v-infinite-scroll="load0"
          infinite-scroll-disabled="loading0"
          :style="tabStyle"
        >
          <div v-for="questionInfo in questionInfos" :key="questionInfo.question.questionId">
            <ActivityInfo :activityInfo="$questionInfo2ActvityInfo(questionInfo)"></ActivityInfo>
            <el-divider class="divider"></el-divider>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关注" name="1">
        <div
          v-if="show1"
          style="overflow:auto;"
          v-infinite-scroll="load1"
          infinite-scroll-disabled="loading1"
          :style="tabStyle"
        >
          <div v-for="(activityInfo,index) in activityInfos" :key="index">
            <ActivityInfo :activityInfo="activityInfo"></ActivityInfo>
            <el-divider class="divider"></el-divider>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="话题" name="2">
        <div>
          <TopicTag v-for="topic in topics" :key="topic" :topic="topic" />
        </div>
        <div style="margin-top:10px;">
          <el-button @click="handleQueryTopicQuestionInfosByUserId">没看到满意的？换一批</el-button>
          <div v-for="questionInfo in topicQuestionInfos" :key="questionInfo.question.questionId">
            <ActivityInfo :activityInfo="$questionInfo2ActvityInfo(questionInfo)"></ActivityInfo>
            <el-divider class="divider"></el-divider>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { queryFollowActivities } from "@/api/user";
import { queryQuestions } from "@/api/question";
import {
  queryTopicsByUserId,
  queryTopicQuestionInfosByUserId
} from "@/api/topic";
import ActivityInfo from "../components/ActivityInfo";
import TopicTag from "../components/TopicTag";
export default {
  data() {
    return {
      limit: 10,
      tabIndex: "0",
      tabStyle: {
        maxHeight: window.innerHeight - 131 + "px"
      },
      loading0: false,
      loading1: false,
      questionInfos: [],
      activityInfos: [],
      topicQuestionInfos: [],
      page0: 0,
      page1: 0,
      show1: false,
      topics: []
    };
  },
  components: {
    ActivityInfo,
    TopicTag
  },
  methods: {
    load0() {
      if (this.loading0) return;
      this.loading0 = true;
      var params = {
        page: this.page0,
        limit: this.limit
      };
      queryQuestions(params).then(res => {
        this.questionInfos = this.questionInfos.concat(res);
        ++this.page0;
        if (res.length < this.limit) {
          this.$message({
            message: "暂时没有更多了"
          });
          setTimeout(() => {
            this.loading0 = false;
            console.log("冷却完成");
          }, 1000);
        } else this.loading0 = false;
      });
    },
    load1() {
      if (this.loading1) return;
      this.loading1 = true;
      var params = {
        page: this.page1,
        limit: this.limit
      };
      queryFollowActivities(params).then(res => {
        this.activityInfos = this.activityInfos.concat(res);
        ++this.page1;
        if (res.length < this.limit) {
          console.log("暂时没有更多了");
          setTimeout(() => {
            this.loading1 = false;
            console.log("冷却完成");
          }, 1000);
        } else this.loading1 = false;
      });
    },
    handleQueryTopicQuestionInfosByUserId() {
      queryTopicQuestionInfosByUserId().then(res => {
        this.topicQuestionInfos = res;
      });
    }
  },
  watch: {
    tabIndex(val) {
      if (val === "1") this.show1 = true;
      else if (val === "2") {
        queryTopicsByUserId().then(res => {
          this.topics = res;
        });
        if (this.topicQuestionInfos.length === 0) {
          this.handleQueryTopicQuestionInfosByUserId();
        }
      }
    }
  },
  mounted() {
    window.onresize = () => {
      this.tabStyle.maxHeight = window.innerHeight - 131 + "px";
    };
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    authority() {
      return this.$store.getters.authority;
    }
  }
};
</script>
<style>
.el-tabs--border-card > .el-tabs__content > * ::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 10px;
}
.el-tabs--border-card > .el-tabs__header {
  background-color: #ffffff;
}
</style>