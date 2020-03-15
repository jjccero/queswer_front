<template>
  <img :src="avaterUrl" />
</template>
<script>
export default {
  name: "avater",
  props: ["uid", "avater"],
  data() {
    return {
      avaterUrl: "api/img/" + (this.avater ? this.uid : "null") + ".png"
    };
  }
};
</script>