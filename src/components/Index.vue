<template>
  <div class="opptunity_div" style="overflow:auto">
    <ul v-infinite-scroll="load" infinite-scroll-disabled="empty" v-loading="loadList">
      <el-card v-for="questionInfo in questionInfos" :key="questionInfo.question.qid">
        <div style="cursor:pointer;text-align:left;height:500px;" @click="toQuestion(questionInfo)">
          <div>{{questionInfo.question.question}}</div>
          <div v-html="questionInfo.defaultAnswer.answer.answer"></div>
          <el-divider>.....</el-divider>
        </div>
      </el-card>
    </ul>
    <p v-if="loadList">加载中...</p>
    <p v-if="empty">没有更多了</p>
  </div>
</template>
<script>
import { _getQuestions } from "../js/api";
export default {
  data() {
    return {
      loadList: false,
      questionInfos: [],
      limit: 2,
      empty: false
    };
  },
  methods: {
    toQuestion(questionInfo) {
      this.$router.push({
        path: "/question",
        query: {
          qid: questionInfo.question.qid,
          aid: questionInfo.defaultAnswer.answer.aid
        }
      });
    },
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
<style lang="less">
.opptunity_div {
  height: 1000px;
}
</style>