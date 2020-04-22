<template>
  <div v-if="userInfo!=null">
    <div class="user_card" style="width:100%;">
      <div style="background-color: #999999;height:60px;">
        <el-button type="info" @click="handleFollow" style="float:right;margin-top:10px;">私信</el-button>
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
    <div style="height:600px;margin-top:10px;float:left;" class="activites_div_div">
      <div
        class="activites_div user_card"
        v-infinite-scroll="load"
        infinite-scroll-disabled="loading"
      >
        <div v-for="(activityInfo,index) in activityInfos" :key="index">
          <ActivityInfo :activityInfo="activityInfo"></ActivityInfo>
        </div>
      </div>
      <div class="user_card" style="height:600px; width:290px;margin-left:10px;">关注{{sexStr}}</div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, queryPeopleActivities, saveFollow } from "@/api/user";
import ActivityInfo from "../components/ActivityInfo";
export default {
  name: "people",
  data() {
    return {
      userInfo: {
        user: {
          authority: 0,
          avater: null,
          gmtCreate: 0,
          intro: "",
          nickname: "",
          sex: null,
          userId: null
        },
        followCount: 0,
        followersCount: 0,
        followed: false
      },
      str: "<p>gg</p>",
      loadingg: true,
      loading: false,
      activityInfos: [],
      offset: 0,
      limit: 10
    };
  },
  components: {
    ActivityInfo
  },
  created() {
    var peopleId = this.peopleId;
    if (peopleId != null) {
      getUserInfo({
        peopleId: peopleId,
        userId: this.userId
      }).then(res => {
        this.userInfo = res;
      });
    }
  },
  methods: {
    load() {
      if (this.loading) return;
      this.loading = true;
      var params = {
        peopleId: this.peopleId,
        userId: this.userId,
        offset: this.offset,
        limit: this.limit
      };
      queryPeopleActivities(params).then(res => {
        this.activityInfos = this.activityInfos.concat(res);
        this.offset += res.length;
        if (res.length < this.limit) {
          console.log("暂时没有更多了");
          setTimeout(() => {
            this.loading = false;
            console.log("冷却完成");
          }, 1000);
        } else this.loading = false;
      });
    },
    handleFollow() {}
  },
  computed: {
    avaterUrl() {
      return (
        "api/img/" +
        (this.userInfo.user.avater ? this.userInfo.user.userId : "null") +
        ".png"
      );
    },
    userId() {
      return this.$store.getters.userId;
    },
    sexStr() {
      switch (this.userInfo.user.sex) {
        case 0:
          return "他";
        case 1:
          return "她";
        default:
          return "ta";
      }
    },
    peopleId() {
      return this.$route.query.userId;
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
.activites_div {
  height: 580px;
  width: 480px;
  overflow: auto;
  padding: 10px;
}
.activites_div_div > ::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>