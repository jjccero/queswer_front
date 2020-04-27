<template>
  <img :src="avaterUrl" @click="toPeople" style="cursor: pointer;" />
</template>
<script>
export default {
  name: "avater",
  props: ["userId", "avater"],
  data() {
    return {
      avaterUrl: "/api/img/" + (this.avater ? this.userId : "null") + ".png"
    };
  },
  methods: {
    toPeople() {
      if (this.userId != null) {
        this.$router.push({
          path: "/people/" + this.userId
        });
      }
    }
  }
};
</script>