<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="" v-html="htmlContent"></div>
  </div>
</template>
<script>
import Config from ".././config";
export default {
  layout: "client",
  data() {
    return {
      title: "",
      htmlContent: "",
      contentId: "",
      appId: "PLATFORM001",
    };
  },
  mounted() {
    this.getContentbyId(this.$route.query.contentId);
  },
  methods: {
    async getContentbyId(id) {
      await this.$axios
        .$get(
          Config.BaseURL +
            "v1/contents?appId=" +
            this.appId +
            "&contentId=" +
            id
        )
        .then((response) => {
          this.title = response.items[0].title;
          this.htmlContent = response.items[0].content;
        });
    },
  },
};
</script>

<style></style>
