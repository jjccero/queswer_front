<template>
  <div>
    <div class="div_input">
      <el-input v-model="content" placeholder="搜索感兴趣的内容吧">
        <el-select v-model="select" slot="prepend" style="width:80px;">
          <el-option label="问题" value="1"></el-option>
          <el-option label="用户" value="2"></el-option>
        </el-select>
        <i
          slot="suffix"
          class="el-input__icon el-icon-search"
          @click="search"
          style="cursor:pointer;"
        ></i>
      </el-input>
    </div>
    <div v-if="searched">
      <el-card :body-style="{ padding: '10px' }" style="text-align:left;">
        <div v-if="select==='1'">
          <div v-for="questionInfo in questionInfoDatas" :key="questionInfo.question.qId">
            <div v-html="redFont(questionInfo.question.question,template)" class="question"></div>
            <div v-html="redFont(questionInfo.question.detail,template)" style="margin-top:10px;"></div>
            <el-divider class="divider"></el-divider>
          </div>
        </div>
        <div v-else-if="select==='2'">
          <div v-for="userInfo in userInfoDatas" :key="userInfo.user.uId">
            <userInfo :userInfo="userInfo"></userInfo>
            <el-divider class="divider"></el-divider>
          </div>
        </div>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total,prev, pager, next, jumper"
          :total="length"
          style="text-align:center;"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>
<script>
import userInfo from "../components/UserInfo";
import { _searchUserInfos, _searchQuestionInfos } from "../js/api";
export default {
  data() {
    return {
      content: "",
      select: "1",
      questionInfos: [],
      userInfos: [],
      searched: false,
      loading: false,
      currentPage: 1,
      pageSize: 10,
      template: ""
    };
  },
  methods: {
    search() {
      this.searched = false;
      this.template = this.content.trim().toLowerCase();
      if (this.template === "") return;
      this.currentPage = 1;
      this.loading = true;
      if (this.select === "1") {
        _searchQuestionInfos({
          question: this.template,
          uId: this.uId
        }).then(res => {
          this.questionInfos = res.data;
          this.searched = true;
          this.loading = false;
        });
      } else {
        _searchUserInfos({
          nickname: this.template,
          uId: this.uId
        }).then(res => {
          this.userInfos = res.data;
          this.searched = true;
          this.loading = false;
        });
      }
    },
    redFont(raw_str, template) {
      if (raw_str == null) return null;
      var str = raw_str.toLowerCase();
      var index_last = 0;
      var index_this = 0;
      var res = "";
      while (true) {
        index_this = str.indexOf(template, index_last);
        if (index_this != -1) {
          res += "<span>" + raw_str.slice(index_last, index_this) + "</span>";
          res +=
            '<span class="font_red">' +
            raw_str.slice(index_this, index_this + template.length) +
            "</span>";
          index_last = index_this + template.length;
        } else {
          res += "<span>" + raw_str.slice(index_last, str.length) + "</span>";
          break;
        }
      }
      return res;
    }
  },
  computed: {
    questionInfoDatas() {
      return this.questionInfos.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    userInfoDatas() {
      return this.userInfos.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    length() {
      if (this.select === "1") return this.questionInfos.length;
      else if (this.select === "2") return this.userInfos.length;
    },
    uId() {
      return this.$store.getters.uId;
    }
  },
  components: {
    userInfo
  }
};
</script>
<style>
.div_input {
  background-color: #ffffff;
  margin: 0 auto;
}
.el-input-group__prepend {
  background-color: #ffffff;
}
.font_red {
  color: red;
}

.div_span_detail {
  font-size: 15px;
}
</style>