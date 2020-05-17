<template>
  <div>
    <div
      v-for="userInfot in userInfos"
      :key="userInfot.user.userId"
      style="float:left;width:150px;"
    >
      <el-button @click="userInfo=userInfot">{{userInfot.user.userId}}</el-button>
    </div>
    <el-card v-if="userInfo" :body-style="{ padding: '10px' }" class="chat_card">
      <div slot="header">
        <!-- <userInfoSmall :userInfo="userInfo"></userInfoSmall> -->
        <span>{{userInfo.user.nickname}}</span>
      </div>
      <div class="message_div">
        <div v-for="(message,index) in messages" :key="index">
          <div
            :style="messageStyle(message.dstId===userId)"
            style="text-align:left;margin-top:10px;"
          >
            <div>{{message.dstId===userId?nickname:userInfo.user.nickname}} {{$getTimeString(message.gmtCreate)}}</div>
            <div>{{message.msg}}</div>
          </div>
        </div>
      </div>
      <div style="margin-top:10px;">
        <el-input v-model="msg" placeholder="聊天内容" style="float:left;width:540px;"></el-input>
        <el-button @click="handleSendMessage" style="float:right;">发送</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import userInfoSmall from "../components/UserInfoSmall";
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      msg: "",
      userInfo: null,
      userInfos: []
    };
  },
  components: {
    userInfoSmall
  },
  methods: {
    handleSendMessage() {
      const message = {
        dstId: this.dstId,
        msg: this.msg
      };
      this.chatWebSocket.send(JSON.stringify(message));
    },
    messageStyle(val) {
      return {
        color: val ? "blue" : "green"
      };
    }
  },
  created() {
    const messageGroup = this.$store.getters.messageGroup;
    const userInfos = [];
    for (const [userId, messages] of messageGroup) {
      getUserInfo({
        peopleId: userId
      }).then(res => {
        userInfos.push(res);
      });
    }
    this.userInfos = userInfos;
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    chatWebSocket() {
      return this.$store.getters.chatWebSocket;
    },
    dstId() {
      return this.userInfo.user.userId;
    },
    messages() {
      return this.$store.getters.messageGroup.get(this.dstId);
    },
    nickname() {
      return this.$store.getters.user.nickname;
    }
  }
};
</script>
<style scoped>
.chat_card {
  width: 648px;
  height: 600px;
  float: left;
}
.message_div {
  height: 470px;
  overflow: auto;
}
</style>