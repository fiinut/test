<template>
  <div class="preview-modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="header">
          <button type="button" class="close-button" @click="$emit('close')">
            <b-icon icon="x" />
          </button>
        </div>
        <div class="modal-body d-block">
          <h2>{{ title }}</h2>
          <div class="" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from "../../config";
export default {
  props: ["data", "id"],
  data() {
    return {
      dataContent: {},
      appId: "PLATFORM001",
      title: "",
      content: "",
    };
  },
  mounted() {
    if (this.id) {
      this.getContentbyId();
    }
  },
  methods: {
    async getContentbyId() {
      this.contentId = this.id;
      await this.$axios
        .$get(
          Config.BaseURL +
            "v1/contents?appId=" +
            this.appId +
            "&contentId=" +
            this.contentId
        )
        .then((response) => {
          this.title = response.items[0].title;
          this.content = response.items[0].content;
        });
    },
  },
};
</script>
