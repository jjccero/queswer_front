<template>
  <div>
    <el-card :body-style="{ padding: '10px' }">
      <div v-for="userInfo in userInfoDatas" :key="userInfo.user.userId">
        <userInfo :userInfo="userInfo"></userInfo>
        <el-divider class="divider"></el-divider>
      </div>
      <el-pagination
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :page-sizes="[5,10,20,50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userInfos.length"
        style="text-align:center;"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import UserInfo from "../components/UserInfo";
import { getUserInfo } from "@/api/user";
export default {
  name: "UserInfoTable",
  props: ["userInfos"],
  data() {
    return {
      pageSize: 10,
      currentPage: 1
    };
  },
  computed: {
    userInfoDatas() {
      const currentPage = this.currentPage;
      const pageSize = this.pageSize;
      return this.userInfos.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    }
  },
  components: {
    UserInfo
  }
};
</script>
<style scoped>
</style>