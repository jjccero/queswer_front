<template>
  <div v-if="userInfo!=null">
    <div class="user_card" style="width:100%;">
      <div style="background-color: #999999;height:60px;">
        <el-button type="info" style="float:right;margin-top:10px;">私信</el-button>
        <el-button type="info" style="float:right;margin-top:10px;" icon="el-icon-user">关注</el-button>
        <el-button type="info" style="float:right;margin-top:10px;" plain>私信</el-button>
      </div>
      <div>
        <div class="user_avater_border">
          <img :src="avaterUrl" class="user_avater" />
        </div>
        <div class="user_detail">
          <div style="font-size:30px;font-weight:bold;clear:right;">{{userInfo.user.nickname}}</div>
          <div class="user_detail_value">{{userInfo.user.intro}}</div>
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
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: null,
      str: "<p>gg</p>"
    };
  },
  name: "people",
  created() {
    var peopleUId = this.$route.query.uId;
    if (peopleUId != null) {
      getUserInfo({
        peopleUId: peopleUId,
        uId: this.uId
      }).then(res => {
        this.userInfo = res.data;
      });
    }
  },
  computed: {
    avaterUrl() {
      return (
        "api/img/" +
        (this.userInfo.user.avater ? this.userInfo.user.uId : "null") +
        ".png"
      );
    },
    uId() {
      return this.$store.getters.uId;
    }
  }
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
  margin: -30px 0 0 20px;
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
  width: 532px;
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