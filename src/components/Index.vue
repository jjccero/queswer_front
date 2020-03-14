<template>
  <div style="overflow:auto">
    <ul
      v-infinite-scroll="load"
      infinite-scroll-disabled="empty"
      v-loading="loadList"
      style="-webkit-padding-start: 0px;"
    >
      <el-card
        :body-style="{ padding: '10px' }"
        v-for="questionInfo in questionInfos"
        :key="questionInfo.question.qid"
      >
        <questionInfo :questionInfo="questionInfo"></questionInfo>
      </el-card>
    </ul>
    <p v-if="loadList">加载中...</p>
    <p v-if="empty">没有更多了</p>
  </div>
</template>
<script>
import { _getQuestions } from "../js/api";
import questionInfo from "../components/QuestionInfo";
export default {
  data() {
    return {
      loadList: false,
      questionInfos: [],
      limit: 2,
      empty: false
    };
  },
  components: {
    questionInfo
  },
  methods: {
    load() {
      if (this.empty || this.loadList) return;
      this.loadList = true;
      var params = {
        uid: this.uid,
        offset: 0,
        limit: 100
      };
      _getQuestions(params).then(res => {
        this.questionInfos = this.questionInfos.concat(res.data);
        this.empty = true;
        this.loadList = false;
      });
    }
  },
  created() {},
  computed: {
    changePlaceHolder() {
      return "输入感兴趣的" + this.types[this.select] + "吧！";
    }
  }
};
</script>
<style>
</style>