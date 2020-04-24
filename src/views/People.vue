<template>
  <div v-if="userInfo!=null" style="text-align: left;font-size:15px;">
    <div class="user_card">
      <div style="background-color: #999999;height:50px;">
        <el-dropdown :show-timeout="0" trigger="click" style="float: right;margin-right:20px;">
          <span>
            <i
              class="el-icon-more"
              style="color:white;font-size:20px;cursor: pointer;line-height:50px;"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleFollow">{{userInfo.followed?'已':''}}关注</el-dropdown-item>
            <el-dropdown-item>发消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <div class="user_avater_border">
          <img :src="avaterUrl" class="user_avater" />
        </div>
        <div class="user_detail">
          <div style="font-size:30px;font-weight:bold;clear:right;">{{userInfo.user.nickname}}</div>
          <div class="user_detail_value">{{userInfo.user.intro}}</div>
        </div>
      </div>
    </div>
    <div class="activities_div_div">
      <div class="user_card" style="text-align:center;width:200px;padding: 10px 0 10px;">
        <div class="follow_div" style="width:99px;border-right: 1px solid #ebebeb;">
          <div>关注{{sexStr}}</div>
          <el-tooltip :content="''+userInfo.followersCount" placement="left-start">
            <b class="follow_div_b">{{userInfo.followersCount}}</b>
          </el-tooltip>
        </div>
        <div class="follow_div" style="width:100px;">
          <div>{{sexStr}}关注</div>
          <el-tooltip :content="''+userInfo.followCount" placement="right-start">
            <b class="follow_div_b">{{userInfo.followCount}}</b>
          </el-tooltip>
        </div>
      </div>
      <div class="activities_div" v-infinite-scroll="load" infinite-scroll-disabled="loading">
        <el-timeline style="font-size: 16px;">
          <el-timeline-item
            v-for="(activityInfo,index) in activityInfos"
            :key="index"
            :timestamp="$getTimeString(activityInfo.activity.gmtCreate)"
            :color="colors[activityInfo.activity.act]"
            size="large"
            placement="top"
          >
            <el-card :body-style="{ padding: '10px' }">
              <ActivityInfo :activityInfo="activityInfo" />
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getUserInfo,
  queryPeopleActivities,
  saveFollow,
  deleteFollow
} from "@/api/user";
import ActivityInfo from "../components/ActivityInfo";
export default {
  name: "people",
  data() {
    return {
      userInfo: null,
      loading: false,
      activityInfos: [],
      offset: 0,
      limit: 10,
      colors: ["#DD0000", "brown", "#0000DD", "#48B753", "#DDA522", "green"]
    };
  },
  components: {
    ActivityInfo
  },
  created() {
    if (this.peopleId != null) {
      getUserInfo({
        peopleId: this.peopleId,
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
    handleFollow() {
      const params = {
        peopleId: this.peopleId,
        userId: this.userId
      };
      if (this.userInfo.followed) {
        deleteFollow(params).then(res => {
          if (res === true) {
            --this.userInfo.followersCount;
            this.userInfo.followed = false;
          }
        });
      } else {
        saveFollow(params).then(res => {
          if (res === true) {
            ++this.userInfo.followersCount;
            this.userInfo.followed = true;
          }
        });
      }
    }
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
      if (this.isMe) return "我";
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
      return Number(this.$route.query.userId);
    },
    isMe() {
      return this.peopleId === this.userId;
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
  float: left;
  font-weight: bold;
}
.activities_div {
  height: 580px;
  width: 580px;
  overflow: auto;
  padding: 10px;
}
.activities_div_div {
  width: 800px;
  margin-top: 10px;
  float: left;
}
.activities_div_div > ::-webkit-scrollbar {
  background-color: transparent;
}
.follow_div {
  float: left;
  height: 50px;
}
.follow_div_b {
  cursor: pointer;
  font-size: 20px;
  height: 30px;
  line-height: 30px;
}
</style>
