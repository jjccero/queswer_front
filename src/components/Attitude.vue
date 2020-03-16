<template>
  <span style="height: 40px;margin-top:4px;">
    <el-button
      size="small"
      @click="updateAttitude(true)"
      icon="el-icon-caret-top"
      type="primary"
      plain
    >{{getCountString(agree)}} {{attituded?"已赞同":''}}</el-button>
    <el-button
      size="small"
      @click="updateAttitude(false)"
      icon="el-icon-caret-bottom"
      style="margin-left:0px;"
      type="danger"
      plain
    >{{getCountString(against)}} {{attituded===false?"已反对":''}}</el-button>
  </span>
</template>
<script>
import { _updateAttitude, _deleteAttitude } from "../js/api";
export default {
  name: "attitude",
  props: ["answerInfo", "uid"],
  data() {
    return {
      attituded: this.answerInfo.attituded,
      agree: this.answerInfo.agree,
      against: this.answerInfo.against
    };
  },
  methods: {
    getCountString(count) {
      return this.$getCountString(count);
    },
    updateAttitude(attitude) {
      if (this.uid == null) {
        this.$toLogin(this);
        return;
      }
      var params = {
        uid: this.uid,
        aid: this.answerInfo.answer.aid
      };
      if (this.attituded === attitude) {
        _deleteAttitude(params).then(res => {
          if (res.data === true) {
            this.attituded = null;
            if (attitude) {
              --this.agree;
            } else {
              --this.against;
            }
          }
        });
      } else {
        params["attitude"] = attitude;
        _updateAttitude(params).then(res => {
          if (res.data === true) {
            if (attitude) {
              if (this.attituded === false) --this.against;
              ++this.agree;
              this.attituded = true;
            } else {
              if (this.attituded === true) --this.agree;
              ++this.against;
              this.attituded = false;
            }
          }
        });
      }
    }
  }
};
</script>
