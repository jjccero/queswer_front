<template>
  <div>
    <el-card :body-style="{ padding: '10px' }" class="chat_card">
      <div style="float:left;width:150px;">hh</div>
      <div style="float:left;width:628px;">
        <!-- <el-input v-model="dstId" placeholder="聊天用户id"></el-input> -->
        <div>
          <el-input v-model="msg" placeholder="聊天内容" style="width:540px;"></el-input>
          <el-button @click="handleSendMessage" style="float:right;">发送</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import userInfoSmall from "../components/UserInfoSmall";
export default {
  data() {
    return {
      dstId: "",
      msg: "hhhhhh"
    };
  },
  components: {
    userInfoSmall
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
<style scoped>
.chat_card {
  height: 600px;
}
</style>