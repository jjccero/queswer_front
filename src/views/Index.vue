<template>
  <div>
    <el-tabs
      type="border-card"
      v-model="tab_index"
      v-infinite-scroll="load"
      infinite-scroll-disabled="loading"
      style="overflow:auto;height:1000px;-webkit-padding-start: 0px;"
    >
      <el-tab-pane label="热榜" name="0">
        <questionInfo
          v-for="questionInfo in questionInfos"
          :key="questionInfo.question.qid"
          :questionInfo="questionInfo"
          :uid="uid"
        ></questionInfo>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </el-tab-pane>
      <el-tab-pane label="关注">关注。。</el-tab-pane>
      <el-tab-pane label="周围">回答。。</el-tab-pane>
    </el-tabs>

    <div>
      <el-card v-if="loading||noMore" :body-style="{ padding: '0px' }"></el-card>
    </div>
  </div>
</template>
<script>
import { _getQuestions } from "../js/api";
import questionInfo from "../components/QuestionInfo";
export default {
  props: ["uid"],
  data() {
    return {
      loading: false,
      questionInfos: [],
      offset: 0,
      count: 5,
      noMore: false,
      tab_index: "0"
    };
  },
  components: {
    questionInfo
  },
  methods: {
    load() {
      console.log("load");
      if (this.noMore) return;
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
          this.noMore = true;
        }
        this.loading = false;
      });
    }
  },
  created() {},
  computed: {}
};
</script>
<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 10px;
}
</style>