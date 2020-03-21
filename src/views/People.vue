<template>
  <div>
    <div class="user_card" style="width:100%;">
      <div style="background-color: #1e50b3;height:100px;">
        <el-button type="info" style="float:right;margin-top:30px;">私信</el-button>
        <el-button type="info" style="float:right;margin-top:30px;" icon="el-icon-user">关注</el-button>
        <el-button type="info" style="float:right;margin-top:30px;" plain>私信</el-button>
      </div>
      <div>
        <div class="user_avater_border">
          <img :src="avaterUrl" class="user_avater" alt="hhh" />
        </div>
        <div class="user_detail">
          <div style="font-size:30px;font-weight:bold;">百慕拉</div>
          <div class="user_detail_value">我不是吉田</div>

          <div>
            <span class="user_detail_field">坐标</span>
            <span class="user_detail_value">M78</span>
          </div>
          <div>
            <span class="user_detail_field">所在行业</span>
            <span class="user_detail_value">体育</span>
          </div>
          <div>
            <span class="user_detail_field">职业经历</span>
            <span class="user_detail_value">地球</span>
            <b>·</b>
            <span class="user_detail_value">少年健身教练</span>
          </div>
        </div>
      </div>
    </div>
    <div style="height:600px;margin-top:10px;float:left;">
      <div class="user_card" style="height:600px; width:500px;" v-html="str"></div>
      <div class="user_card" style="height:600px; width:290px;margin-left:10px;"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avaterUrl: "api/img/null.png",
      str: "<p>gg</p>"
    };
  },
  props: ["uid"],
  name: "people",
  created() {}
};
</script>
<style>
.user_avater {
  width: 160px;
  padding: 4px;
  height: 160px;
  border-radius: 5%;
}
.user_avater_border {
  margin: -50px 0 0 20px;
  background-color: #ffffff;
  width: 168px;
  height: 168px;
  border-radius: 5%;
  float: left;
}
.user_card {
  background-color: #ffffff;
  float: left;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.user_detail {
  float: left;
  margin: 0 40px 10px;
  text-align: left;
}
.user_detail > * {
  float: left;
  clear: left;
  margin-top: 10px;
}
.user_detail_field {
  width: 100px;
  margin-right: 20px;
  font-size: 15px;
  float: left;
  font-weight: bold;
}
.user_detail_value {
  font-size: 15px;
}
</style>