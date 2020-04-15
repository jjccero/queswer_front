<template>
  <div>
    <el-tag
      v-for="topic in topicList"
      :key="topic.tId"
      @close="deleteTopic"
      class="topic_delete_tag"
      closable
    >{{topic.topic_name}}</el-tag>
    <el-input v-model="topic_name"></el-input>
    <el-button type="primary" @click="addTopic">添加</el-button>
  </div>
</template>
<script>
import { _getTopicList, _addTopic } from "../js/api";
export default {
  data() {
    return {
      topicList: [],
      topicName: ""
    };
  },
  created() {
    this.getTopicList();
  },
  methods: {
    getTopicList() {
      _getTopicList().then(res => {
        this.topicList = res.data;
      });
    },
    addTopic() {
      _addTopic({
        topic_name: this.topic_name
      }).then(res => {
        var tId = res;
        if (tId > 0) {
          this.topicList.push({ tId: tId, topicName: this.topicName });
        }
      });
    },
    deleteTopic() {
      alert("deleteTopic");
    }
  }
};
</script>
<style scoped>
.topic_delete_tag {
  margin-right: 10px;
}
</style>