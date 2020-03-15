<template>
  <div class="userInfo">
    <avater :uid="userInfo.uid" :avater="userInfo.avater" class="icon" />
    <div style="float: left; margin-left: 10px;">
      <div style="height:20px;line-height:20px;">
        <b :class="{'anonymous':userInfo.anonymous}">{{userInfo.nickname}}</b>
      </div>
      <div style="height:20px;line-height:20px;">
        <span style="font-size: 15px;color: gray;">{{userInfo.intro}}</span>
      </div>
    </div>
  </div>
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
  name: "userInfo",
  props: ["userInfo"]
};
</script>
<style>
.userInfo {
  height: 50px;
  float: left;
}
.anonymous {
  color: gray;
}
.icon {
  width: 40px;
  border-radius: 50%;
  float: left;
}
</style>