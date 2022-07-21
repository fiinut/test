<template>
  <div class="crm-modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="header">
          <button type="button" class="close-button" @click="$emit('close')">
            <b-icon icon="x" />
          </button>
        </div>
        <div class="modal-body d-block">
          <!-- <div v-if="files.length != 0">
            <div v-for="(item, index) in files.items" :key="index">
              <b-img :src="item.url"></b-img>
            </div>
          </div> -->
          <!-- <b-form-file id="form-image"  accept="image/*"></b-form-file>
                  <b-button @click="uploadBanner()">Upload</b-button> -->
          <!-- <b-img :src="item.url" fluid alt="Responsive image"></b-img> -->
          <input
            type="file"
            accept=".jpeg,.jpg,.png,image/jpeg,image/png"
            aria-label="upload image button"
            @change="selectFile"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Config from "../../config.js";
export default {
  props: ["files"],
  data() {
    return {
      imgUrl: "",
    };
  },
  mounted() {
    // this.getFileList()
  },
  methods: {
    async selectFile(e) {
      let img = e.target.files[0];
      let data = new FormData();
      data.append("appId", "PLATFORM001");
      data.append("image", img, data.name);

      this.$axios
        .$post(Config.BaseURL + "v1/files/upload", data)
        .then((resp) => {
          this.imgUrl = resp.url;
          this.$emit("bannerUrl", this.imgUrl);
          this.$emit("close");
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
