<template>
  <img :src="avaterUrl" @click="toPeople" style="cursor: pointer;" />
</template>
<script>
export default {
  name: "avater",
  props: ["uid", "avater"],
  data() {
    return {
      avaterUrl: "api/img/" + (this.avater ? this.uid : "null") + ".png"
    };
  },
  methods: {
    toPeople() {
      if (this.uid != null) {
        this.$router.push({
          path: "/people",
          query: {
            uid: this.uid
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