<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="" v-html="htmlContent"></div>
  </div>
</template>

<script lang="ts">
import Config from "../config";
import Vue from "vue";

export default Vue.extend({
  layout: "default",
  data() {
    return {
      title: "",
      htmlContent: "",
      contentId: "",
      appId: "PLATFORM001",
    };
  },
  mounted() {
    const contentId = this.$route.query.contentId;
    if (contentId) {
      this.getContentbyId(contentId);
    }
  },
  methods: {
    async getContentbyId(id: any) {
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
});
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  ::v-deep img {
    width: 100%;
    height: 100%;
  }
}
</style>
