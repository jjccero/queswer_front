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
            <ActivityInfo :activityInfo="questionInfo2ActvityInfo(questionInfo)"></ActivityInfo>
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
      <el-tab-pane label="周围">回答。。</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { queryFollowActivities } from "@/api/user";
import { queryQuestions } from "@/api/question";
import questionInfo from "../components/QuestionInfo";
import ActivityInfo from "../components/ActivityInfo";
export default {
  data() {
    return {
      offset: 0,
      limit: 10,
      tabIndex: "0",
      tabStyle: {
        maxHeight: window.innerHeight - 131 + "px"
      },
      loading0: false,
      loading1: false,
      questionInfos: [],
      activityInfos: [],
      page1: 0,
      show1: false
    };
  },
  components: {
    questionInfo,
    ActivityInfo
  },
  methods: {
    load0() {
      if (this.loading0) return;
      this.loading0 = true;
      var params = {
        userId: this.userId,
        offset: this.offset,
        limit: this.limit
      };
      queryQuestions(params).then(res => {
        this.questionInfos = this.questionInfos.concat(res);
        this.offset += res.length;
        if (res.length < this.limit) {
          console.log("暂时没有更多了");
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
        userId: this.userId,
        page: this.page1
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
    questionInfo2ActvityInfo(questionInfo) {
      if (questionInfo.defaultAnswer != null) {
        const answer = questionInfo.defaultAnswer.answer;
        return {
          info: questionInfo,
          activity: {
            act: 4,
            userId: answer.userId,
            id: answer.answerId,
            gmtCreate: answer.gmtCreate
          },
          userInfo: questionInfo.defaultAnswer.userInfo
        };
      } else {
        return {
          info: questionInfo,
          activity: {
            act: 1,
            userId: questionInfo.question.userId,
            id: questionInfo.question.questionId,
            gmtCreate: questionInfo.question.gmtCreate
          },
          userInfo: questionInfo.userInfo
        };
      }
    }
  },
  watch: {
    tabIndex(val) {
      if (val === "1") this.show1 = true;
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