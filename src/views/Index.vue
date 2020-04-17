<template>
  <div>
    <el-tabs type="border-card" v-model="tabIndex" style="margin-bottom:10px;">
      <el-tab-pane
        label="热榜"
        name="0"
        style="overflow:auto;"
        v-infinite-scroll="load"
        infinite-scroll-disabled="loading"
        :style="tabStyle"
      >
        <questionInfo
          v-for="questionInfo in questionInfos"
          :key="questionInfo.question.qId"
          :questionInfo="questionInfo"
        ></questionInfo>
      </el-tab-pane>
      <el-tab-pane label="关注">关注。。</el-tab-pane>
      <el-tab-pane label="周围">回答。。</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { queryQuestions } from "@/api/question";
import questionInfo from "../components/QuestionInfo";
export default {
  data() {
    return {
      loadingg: true,
      loading: false,
      questionInfos: [],
      offset: 0,
      count: 10,
      tabIndex: "0",
      tabStyle: {
        maxHeight: window.innerHeight - 131 + "px"
      }
    };
  },
  components: {
    questionInfo
  },
  methods: {
    load() {
      if (this.loading) return;
      this.loading = true;
      var params = {
        uId: this.uId,
        offset: this.offset,
        count: this.count
      };
      queryQuestions(params).then(res => {
        this.questionInfos = this.questionInfos.concat(res);
        this.offset += res.length;
        if (res.length < this.count) {
          this.$message({
            message: "暂时没有更多了",
            type: "warning"
          });
          setTimeout(() => {
            this.loading = false;
            console.log("冷却完成");
          }, 1000);
        } else this.loading = false;
      });
    }
  },
  mounted() {
    window.onresize = () => {
      this.tabStyle.maxHeight = window.innerHeight - 131 + "px";
    };
  },
  computed: {
    uId() {
      return this.$store.getters.uId;
    }
  }
};
</script>
<style>
.el-tabs--border-card > .el-tabs__content > ::-webkit-scrollbar {
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