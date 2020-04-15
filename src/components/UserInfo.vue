<template>
  <div class="userInfo">
    <avater
      style="float:left;"
      :uId="userInfo.user.uId"
      :avater="userInfo.user.avater"
      class="avater"
    />
    <div style="float:left;">
      <div class="userInfo_text">
        <b :class="{'anonymous':userInfo.anonymous}">{{userInfo.user.nickname}}</b>
      </div>
      <div class="userInfo_text">
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
        (this.userInfo.avater ? this.userInfo.uId : "null") +
        ".png"
    };
  },
  name: "userInfo",
  props: ["userInfo"]
};
</script>
<style>
.userInfo {
  height: 40px;
}
.avater {
  width: 40px;
  border-radius: 50%;
}
.userInfo_text {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 10px;
}
</style>