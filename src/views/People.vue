<template>
  <div v-if="userInfo!=null" style="text-align: left;">
    <div class="user_card" style="font-size:15px;">
      <div class="user_avater_border">
        <img :src="avaterUrl" class="user_avater" />
      </div>
      <div style="width:612px;float:left;padding: 10px 0 10px;">
        <el-dropdown :show-timeout="0" trigger="click" style="float: right;margin-right:20px;">
          <span>
            <i class="el-icon-more" style="color:gray;cursor: pointer;line-height:50px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleFollow">{{userInfo.followed?'已':''}}关注</el-dropdown-item>
            <el-dropdown-item>发消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div>
          <div style="float:right;text-align:center;width:200px;">
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
          <b style="line-height:50px;height:50px;font-size:30px;">{{userInfo.user.nickname}}</b>
          <div class="user_detail">
            <div class="user_detail_value">{{userInfo.user.intro}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="activities_div_div user_card">
      <div style="text-align:center;border-bottom: 1px solid #ebebeb;">
        <el-menu :default-active="tabindex" mode="horizontal" @select="handleSelect">
          <el-menu-item v-for="(item,index) in menu" :key="index" :index="''+index">
            <span>{{item}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div
        class="activities_div"
        v-show="tabindex==='0'"
        v-infinite-scroll="load"
        infinite-scroll-disabled="loading"
      >
        <div v-for="(activityInfo,index) in activityInfos" :key="index">
          <ActivityInfo :activityInfo="activityInfo" />
          <el-divider class="divider"></el-divider>
        </div>
      </div>
      <div v-if="tabindex==='3'" class="activities_div">
        <div v-for="(activityInfo,index) in activityInfos" :key="index">
          <ActivityInfo :activityInfo="activityInfo" />
          <el-divider class="divider"></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getUserInfo,
  queryPeopleActivities,
  saveFollow,
  deleteFollow,
  queryUserInfosByFollowerId,
  queryFollowerInfosByPeopleId,
  queryAnswersByUserId,
  queryQuestionsByUserId,
} from "@/api/user";
import ActivityInfo from "../components/ActivityInfo"
export default {
  name: "people",
  data() {
    return {
      userInfo: null,
      loading: false,
      activityInfos: [],
      page: 0,
      limit: 10,
      colors: ["#DD0000", "brown", "#0000DD", "#48B753", "#DDA522", "green"],
      menu: ["动态", "回答", "提问", "订阅"],
      tabindex: "0",
      
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
        page: this.page,
        limit: this.limit
      };
      queryPeopleActivities(params).then(res => {
        this.activityInfos = this.activityInfos.concat(res);
        ++this.page;
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
    },
    handleSelect(key, keyPath) {
      this.tabindex = key;
    }
  },
  computed: {
    avaterUrl() {
      return (
        "/api/img/" +
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
      return Number(this.$route.params.peopleId);
    },
    isMe() {
      return this.peopleId === this.userId;
    }
  },
  watch: {
    peopleId(val) {
      this.userInfo = null;
      this.activityInfos = [];
      this.page = 0;
      getUserInfo({
        peopleId: this.peopleId,
        userId: this.userId
      }).then(res => {
        this.userInfo = res;
      });
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
  margin: 10px;
  background-color: gray;
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
  text-align: left;
  width: 532px;
}
.user_detail > * {
  float: left;
  clear: left;
  margin-top: 10px;
}
.activities_div {
  height: 600px;
  overflow: auto;
  padding: 10px;
}
.activities_div_div {
  width: 800px;
  margin-top: 10px;
  float: left;
}
.activities_div_div > ::-webkit-scrollbar {
  width: 0;
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
