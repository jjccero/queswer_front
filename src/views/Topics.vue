<template>
  <div>
    <el-tag
      v-for="topic in topics"
      :key="topic.topicId"
      @close="deleteTopic"
      class="topic_delete_tag"
      closable
    >{{topic.topicName}}</el-tag>
    <el-input v-model="topicName"></el-input>
    <el-button type="primary" @click="handleSaveTopic">添加</el-button>
  </div>
</template>
<script>
import { queryTopics, saveTopic } from "@/api/topic";
export default {
  data() {
    return {
      topics: [],
      topicName: ""
    };
  },
  created() {
    this.handleQueryTopics();
  },
  methods: {
    handleQueryTopics() {
      queryTopics().then(res => {
        this.topics = res;
      });
    },
    handleSaveTopic() {
      saveTopic({
        topicName: this.topicName
      }).then(res => {
        var topicId = res;
        if (topicId > 0) {
          this.topics.push({ topicId: topicId, topicName: this.topicName });
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