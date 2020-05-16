<template>
  <img :src="avaterUrl" @click="toPeople" style="cursor: pointer;" />
</template>
<script>
export default {
  name: "avater",
  props: ["userId", "avater"],
  data() {
    return {
      avaterUrl:
        "http://localhost:8080/img/" +
        (this.avater ? this.userId : "null") +
        ".png"
    };
  },
  methods: {
    toPeople() {
      if (this.userId != null) {
        window.open(
          this.$router.resolve({
            path: "/people/" + this.userId
          }).href,
          "_blank"
        );
      }
    }
  }
};
</script>