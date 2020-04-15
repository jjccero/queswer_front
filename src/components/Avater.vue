<template>
  <img :src="avaterUrl" @click="toPeople" style="cursor: pointer;" />
</template>
<script>
export default {
  name: "avater",
  props: ["uId", "avater"],
  data() {
    return {
      avaterUrl: "api/img/" + (this.avater ? this.uId : "null") + ".png"
    };
  },
  methods: {
    toPeople() {
      if (this.uId != null) {
        this.$router.push({
          path: "/people",
          query: {
            uId: this.uId
          }
        });
        if (this.$route.path === "/people") {
          location.reload();
        }
      }
    }
  }
};
</script>