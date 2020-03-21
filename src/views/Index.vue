<template>
  <div>
    <el-tabs type="border-card" v-model="tab_index" style="margin-bottom:10px;">
      <el-tab-pane
        label="热榜"
        name="0"
        style="overflow:auto;max-height:1200px;"
        v-infinite-scroll="load"
        infinite-scroll-disabled="loading"
        :style="tab_style"
      >
        <questionInfo
          v-for="questionInfo in questionInfos"
          :key="questionInfo.question.qid"
          :questionInfo="questionInfo"
          :uid="uid"
        ></questionInfo>
      </el-tab-pane>
      <el-tab-pane label="关注">关注。。</el-tab-pane>
      <el-tab-pane label="周围">回答。。</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { _getQuestions } from "../js/api";
import questionInfo from "../components/QuestionInfo";
export default {
  props: ["uid"],
  data() {
    return {
      loadingg: true,
      loading: false,
      questionInfos: [],
      offset: 0,
      count: 10,
      tab_index: "0",
      tab_style: {
        maxHeight: window.innerHeight - 142 + "px"
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
        uid: this.uid,
        offset: this.offset,
        count: this.count
      };
      _getQuestions(params).then(res => {
        this.questionInfos = this.questionInfos.concat(res.data);
        this.offset += res.data.length;
        if (res.data.length < this.count) {
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
  created() {},
  computed: {}
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
</style>