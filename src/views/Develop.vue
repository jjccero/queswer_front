<template>
  <div>
    <el-button @click="handleInit" plain>初始化redis</el-button>
    <el-button @click="handleCreateIndex" type="primary" plain>重新建立索引</el-button>
  </div>
</template>
<script>
import { init, createIndex } from "@/api/develop";
export default {
  data() {
    return {};
  },
  methods: {
    handleCreateIndex() {
      createIndex().then(res => {
        console.log(res);
      });
    },
    handleInit() {
      init().then(res => {
        console.log(res);
      });
    }
  },
  computed: {
    uId() {
      return this.$store.getters.uId;
    }
  }
};
</script>