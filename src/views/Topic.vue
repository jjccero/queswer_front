<template>
  <div>
    <span>{{topicInfo.subscribeCount}}</span>
    <el-button @click="handleChangeSubscribe">{{topicInfo.subscribed?"取消订阅":"订阅话题"}}</el-button>
  </div>
</template>
<script>
import {
  saveSubscribeTopic,
  deleteSubscribeTopic,
  getTopicInfo
} from "@/api/topic";
export default {
  name: "Topic",
  data() {
    return {
      topicInfo: { subscribeCount: 0, subscribed: false }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getTopicInfo({ topic: this.topic }).then(res => {
        this.topicInfo = res;
      });
    },
    handleChangeSubscribe() {
      const params = { topic: this.topic };
      if (this.topicInfo.subscribed) {
        deleteSubscribeTopic(params).then(res => {
          if (res === true) {
            this.topicInfo.subscribed = false;
            --this.topicInfo.subscribeCount;
          }
        });
      } else {
        saveSubscribeTopic(params).then(res => {
          if (res === true) {
            this.topicInfo.subscribed = true;
            ++this.topicInfo.subscribeCount;
          }
        });
      }
    }
  },
  computed: {
    topic() {
      return this.$route.params.topic;
    }
  },
  watch: {
    topic(val) {
      this.init();
    }
  }
};
</script>
<style scoped>
</style>