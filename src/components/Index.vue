<template>
  <div class="opptunity_div" style="overflow:auto">
    <ul v-infinite-scroll="load" infinite-scroll-disabled="empty" v-loading="loadList">
      <el-card style="height:500px;" v-for="opptunity in opptunityList" :key="opptunity.aid">
        <el-row>
          <h1>{{opptunity.question.question}}</h1>
        </el-row>
        <el-row>
          <span @click="getQuestion(opptunity.question.qid)" v-html="opptunity.answer"></span>
        </el-row>
      </el-card>
    </ul>
    <p v-if="loadList">加载中...</p>
    <p v-if="empty">没有更多了</p>
  </div>
</template>
<script>
import { _getQuestionList, _getOpptunityList } from "../js/api";
export default {
  name: "mainList",
  data() {
    return {
      loadList: false,
      opptunityList: [],
      limit: 2,
      empty: false
    };
  },
  methods: {
    clearList: function() {
      this.questionList = [];
    },
    showSelect: function() {
      alert(this.types[this.select] + "\n" + this.searchContent);
    },
    getQuestion(qid) {
      this.$router.push({
        path: "/question",
        query: {
          qid: qid
        }
      });
    },
    load() {
      if (this.empty || this.loadList) return;
      this.loadList = true;
      var params = {
        offset: this.opptunityList.length,
        limit: this.limit
      };
      _getOpptunityList(params).then(res => {
        this.opptunityList = this.opptunityList.concat(res.data);
        this.empty = res.data.length === 0;
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