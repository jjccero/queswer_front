<template>
  <div class="userInfo">
    <avater :uid="userInfo.user.uid" :avater="userInfo.user.avater" class="avater" />
    <div>
      <div class="text_hidden">
        <b :class="{'anonymous':userInfo.anonymous}">{{userInfo.user.nickname}}</b>
      </div>
      <div class="text_hidden">
        <span style="font-size: 15px;color: gray;">{{userInfo.user.intro}}</span>
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

.text_hidden {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
  margin-left: 10px;
}
.avater {
  width: 40px;
  border-radius: 50%;
  float: left;
}
</style>