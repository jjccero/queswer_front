<template>
  <div>
    <el-tooltip :content="backupStr" placement="bottom" effect="light">
      <el-button @click="handleBackup" plain>备份</el-button>
    </el-tooltip>
    <el-tooltip :content="restoreStr" placement="bottom" effect="light">
      <el-button @click="handleRestore" plain>恢复</el-button>
    </el-tooltip>
    <el-tooltip placement="bottom" effect="light">
      <el-button @click="handleCreateIndex" plain>重新建立索引</el-button>
    </el-tooltip>
    <UserInfoTable :userInfos="userInfos" style="margin-top:10px;" />
  </div>
</template>
<script>
import { restore, backup, createIndex } from "@/api/develop";
import { queryAdminInfos } from "@/api/user";
import UserInfoTable from "../components/UserInfoTable";
export default {
  data() {
    return {
      userInfos: [],
      backupStr:
        "将mysql中的活动备份到各个表中。活动包括用户对回答的赞同、关注用户、关注问题、关注话题。",
      restoreStr:
        "从mysql中恢复问题、回答、评论之间id关系。将mysql中的活动数据恢复到redis。活动包括用户对回答的赞同、关注用户、关注问题、关注话题。"
    };
  },
  components: {
    UserInfoTable
  },
  created() {
    this.handleQueryAdminInfos();
  },
  methods: {
    handleCreateIndex() {
      createIndex().then(res => {
        console.log(res);
      });
    },
    handleRestore() {
      restore().then(res => {
        console.log(res);
      });
    },
    handleBackup() {
      backup().then(res => {
        console.log(res);
      });
    },
    handleQueryAdminInfos() {
      queryAdminInfos().then(res => {
        this.userInfos = res;
      });
    }
  }
};
</script>