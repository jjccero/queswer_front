<template>
  <div>
    <el-button @click="signup" plain>注册一些账号</el-button>
    <el-button @click="insertQuestion" type="primary" plain>添加一个问题</el-button>
    <el-button @click="createIndex" type="primary" plain>重新建立索引</el-button>
  </div>
</template>
<script>
import {
  _signup,
  _insertQuestion,
  _updateAttitude,
  _approveReview,
  _createIndex
} from "../js/api";
export default {
  props: ["uid"],
  data() {
    return {
      questionInfos: []
    };
  },
  methods: {
    createIndex() {
      _createIndex().then(res => {
        console.log(res.data);
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
    insertQuestion() {
      var param = {
        uid: this.$getUid(),
        question: "hh",
        anonymous: false
      };
      _insertQuestion(param).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>