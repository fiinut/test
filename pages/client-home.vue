<template>
  <div>
    <div class="client-header">
      <b-img src="../assets/images/logo-o.png" class="logo"></b-img>
      <b-nav class="client-menu">
        <b-nav-item @click="getContentsList()"
          ><b-icon icon="house-door-fill"
        /></b-nav-item>
        <b-nav-item @click="searchContent('Promotion')">Promotion</b-nav-item>
        <b-nav-item @click="searchContent('News')">ข่าวสาร</b-nav-item>
        <b-nav-item @click="searchContent('Content')"
          >บทความที่น่าสนใจ</b-nav-item
        >
        <b-nav-item @click="searchContent('Annoucement')">ประกาศ</b-nav-item>
        <b-nav-item @click="searchContent('Ads')">โฆษณา</b-nav-item>
      </b-nav>
    </div>
    <div class="home-client my-3 row" v-if="items.length > 0">
      <b-card v-for="(item, index) in items" :key="index" class="m-1">
        <h6>{{ item.title }}</h6>
        <div class="card-content">
          <div class="content-box">
            <p class="label-category">{{ item.category }}</p>
            <b-button
              class="preview-button"
              @click="previewContent(item.contentId)"
              >อ่านรายละเอียด ></b-button
            >
          </div>
          <img
            v-if="item.contentJson.banner"
            :src="item.contentJson.banner"
            width="120px"
          />
          <img
            v-else
            src="../assets/images/No_image.png"
            width="auto"
            height="120px"
          />
        </div>
      </b-card>
    </div>
    <div v-else class="text-center m-5"><span> ยังไม่มีเนื้อหา </span></div>
  </div>
</template>

<script>
import Config from ".././config";
var moment = require("moment");
export default {
  layout: "client-home",
  data() {
    return {
      contentsList: [],
      appId: "PLATFORM001",
      items: [],
    };
  },
  mounted() {
    this.getContentsList();
  },
  methods: {
    async getContentsList() {
      await this.$axios
        .$get(Config.BaseURL + "v1/external/contents?appId=" + this.appId)
        .then((response) => {
          this.contentsList = response.items;
          if (this.contentsList) {
            this.contentsList.forEach((element, index) => {
              element.publishDate = moment(element.publishDate).format(
                "DD/MM/YYYY"
              );
            });
            this.items = this.contentsList;
            this.rows = response.allItems;
            console.log(this.items);
          }
        });
    },
    previewContent(id) {
      this.$router.push({
        name: "client-preview",
        query: { contentId: id },
      });
    },
    searchContent(val) {
      this.$axios
        .$get(
          Config.BaseURL +
            "v1/contents?appId=" +
            this.appId +
            "&category=" +
            val
        )
        .then((response) => {
          console.log("response====", response);
          this.contentsList = response.items;
          if (this.contentsList) {
            this.contentsList.forEach((element, index) => {
              element.publishDate = moment(element.publishDate).format(
                "DD/MM/YYYY"
              );
            });
            this.items = this.contentsList;
            this.rows = response.allItems;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.client-header {
  display: flex;
  .client-menu {
    margin: auto;
  }
  .logo {
    width: 100px !important;
  }
}
a {
  color: #564243;
}
a:hover {
  color: #ffd503;
}
.home-client {
  color: #705f5f;
}
.card-content {
  width: 500px;
  display: flex;
  justify-content: space-between;
  .content-box {
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: space-between;
    .label-category {
      text-align: center;
      background: #705f5f;
      color: #ffd503;
      padding: 10px;
      border-radius: 50px;
      font-size: 12px;
      height: fit-content;
      width: fit-content;
    }
    .preview-button {
      background: #ffd503;
      color: #705f5f;
      border-radius: 50px;
      border: 0;
    }
  }
}
</style>
