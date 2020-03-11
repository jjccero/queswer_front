<template>
  <div style="height: 40px;">
    <img :src="'api/img/31.png'" class="icon" />
    <span style="float: left; margin-left: 10px;">
      <b :class="{'anonymous':userInfo.anonymous}">{{userInfo.nickname}}</b>
      <div></div>
      <span style="font-size: 15px;color: gray;">{{userInfo.intro}}</span>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  name: "userInfo",
  props: ["userInfo"]
};
</script>
<style>
.anonymous {
  color: gray;
}
.icon {
  width: 40px;
  border-radius: 50%;
  float: left;
}
</style>