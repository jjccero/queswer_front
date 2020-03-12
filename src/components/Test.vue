<template>
  <div>
    <el-button @click="signup" plain>注册一些账号</el-button>
    <el-button @click="addQuestion" type="primary" plain>神秘功能</el-button>
    <div v-for="question in questions" :key="question.qid" @click="getQuestion(question.qid)">
      <span style="cursor:pointer;">{{question.question}}</span>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>
import {
  _signup,
  _getQuestions,
  _addQuestion,
  _addAttitude,
  _approveReview
} from "../js/api";
export default {
  created() {
    this.getQuestions();
  },
  data() {
    return {
      questions: []
    };
  },
  methods: {
    getQuestion(qid) {
      this.$router.push({
        path: "/question",
        query: {
          qid: qid
        }
      });
    },
    getQuestions() {
      var params = {
        offset: 0,
        limit: 100
      };
      _getQuestions(params).then(res => {
        this.questions = res.data;
      });
    },
    signup() {
      var namestr = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
      for (var i = 31; i < 1100; ++i) {
        // var params = {
        //   // username: "jjc" + i,
        //   // password: "jjc",
        //   // nickname:
        //   //   namestr[Math.floor(Math.random() * 12)] +
        //   //   namestr[Math.floor(Math.random() * 12)],
        //   // sex: 2,
        //   uid: i,
        //   rid: 20
        //   // aid: 9,
        //   // attitude: true
        // };
        // _approveReview(params).then(res => {
        //   console.log(res.data);
        // });
      }
    },
    addQuestion() {
      var param = {
        uid: this.$getUid(),
        question: "hh",
        anonymous: false
      };
      _addQuestion(param).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>