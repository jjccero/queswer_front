<template>
  <span class="userInfoSmall">
    <avater :uid="userInfo.user.uid" :avater="userInfo.user.avater" class="userInfoSmall_avater" />
    <b
      class="userInfoSmall_text"
      :class="{'anonymous':userInfo.anonymous}"
    >{{userInfo.user.nickname}}</b>
  </span>
</template>
<script>
import avater from "../components/Avater";
export default {
  components: {
    avater
  },
  data() {
    return {
      avaterUrl:
        "api/img/" +
        (this.userInfo.avater ? this.userInfo.uid : "null") +
        ".png"
    };
  },
  name: "userInfoSmall",
  props: ["userInfo"]
};
</script>
<style>
.userInfoSmall {
  height: 30px;
  float: left;
}
.userInfoSmall_text {
  height: 30px;
  line-height: 30px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
  margin-left: 10px;
}
.userInfoSmall_avater {
  width: 30px;
  border-radius: 50%;
  float: left;
}
</style>