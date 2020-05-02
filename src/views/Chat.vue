<template>
  <div>
    <el-input v-model="dstId" placeholder="聊天用户id"></el-input>
    <el-input v-model="msg" placeholder="聊天内容"></el-input>
    <el-button @click="handleSendMessage">发送</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dstId: "",
      msg: "hhhhhh"
    };
  },
  methods: {
    handleSendMessage() {
      const message = {
        dstId: Number(this.dstId),
        msg: this.msg
      };
      this.chatWebSocket.send(JSON.stringify(message));
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    chatWebSocket() {
      return this.$store.getters.chatWebSocket;
    }
  }
};
</script>