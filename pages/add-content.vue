<template>
  <div class="add-content-page">
    <b-form @submit.stop.prevent="onSubmitAdd">
      <b-tabs content-class="my-3">
        <b-tab title="Content Setting">
          <!-- <div class="language-section d-flex">
          <h6 class="mr-3">Language</h6>
          <RadioButton
            :checkeds="languageList"
            v-model="languageSelected"
          ></RadioButton>
        </div> -->
          <div class="category-section d-flex">
            <SelectField
              title="Category"
              :options="optionsCategory"
              v-model="selectedCategory"
            ></SelectField>
          </div>
          <!-- <hr /> -->
          <!-- <div class="banner-section">
          <h6 class="mr-3">Banner</h6>
          <div class="banner-show d-flex">
            <span class="m-auto" v-if="bannerUrl == ''">Preview Banner</span>
            <b-img v-else :src="bannerUrl" alt="Responsive image"></b-img>
          </div>
          <div class="banner-actions my-3">
            <b-button @click="showUploadModal = true">Upload Banner</b-button>
            <b-button @click="showAddlinkModal = true"
              >Add Link Banner</b-button
            >
          </div>
          link: {{ bannerLink }}
        </div> -->
          <hr />
          <InputField title="Title" placeholder="Title" v-model="title">
          </InputField>
          <hr />
          <InputField title="Alias" placeholder="Alias" v-model="alias">
          </InputField>
          <hr />
          <h6 class="mr-3">Body</h6>
          <p id="percent-box">Uploading 0 %</p>
          <Editor v-model="content" :init="tinyMce" :apiKey="tinyKey"></Editor>
          <div class="text-right my-3">
            <Button
              label="Preview"
              variant="primary"
              @click="previewContent()"
            ></Button>
          </div>
        </b-tab>
        <b-tab title="Content Json">
          <div
            class="form-row"
            v-for="(item, index) of contentJsons"
            :key="index"
          >
            <div class="form-group col-md-5">
              <label>Key</label>
              <input
                v-model="item.key"
                :name="item.key"
                type="text"
                class="form-control"
                placeholder="key"
              />
            </div>
            <div class="form-group col-md-5">
              <label>Value</label>
              <input
                v-model="item.value"
                :name="item.value"
                type="text"
                class="form-control"
                placeholder="value"
              />
            </div>
            <div class="form-group col-md-2" style="margin-top: 30px">
              <button
                v-if="index != 0"
                @click="DeleteContentJson(item, index)"
                type="button"
                class="btn btn-danger"
              >
                -
              </button>
            </div>
          </div>
          <div class="form-group-btn">
            <button
              @click="addContentJson"
              type="button"
              class="btn btn-success"
            >
              +
            </button>
          </div>
        </b-tab>
        <b-tab title="Publish Setting">
          <div class="text-right">
            <Button
              type="submit"
              label="บันทึก"
              variant="success"
              style="width: 20%"
            ></Button>
          </div>
          <b-container>
            <b-row>
              <b-col>
                <Datepicker
                  class="mr-3"
                  title="วันที่เริ่มต้น"
                  :required="true"
                  v-model="$v.form.startDate.$model"
                  :state="validateState('startDate')"
                  :disabledDateBefore="new Date()"
                ></Datepicker>
              </b-col>
              <b-col>
                <Datepicker
                  class="mr-3"
                  title="วันที่สิ้นสุด"
                  v-model="endDate"
                  :disabledDateBefore="$v.form.startDate.$model"
                ></Datepicker>
              </b-col>
              <b-col align-self="center">
                <SwitchesField
                  class="m-auto"
                  title="Active"
                  v-model="published"
                ></SwitchesField>
              </b-col>
            </b-row>
          </b-container>
          <hr />
          <!-- <Table :items="items"></Table> -->
        </b-tab>
      </b-tabs>
    </b-form>
    <UploadBanner
      v-if="showUploadModal"
      @close="showUploadModal = false"
      :files="fileLists"
      @bannerUrl="getBannerUrl"
    />
    <AddLinkModal
      v-if="showAddlinkModal"
      @close="showAddlinkModal = false"
      @link="getBannerLink"
    />
    <PreviewContent
      v-if="showPreviewModal"
      @close="showPreviewModal = false"
      :data="dataPreview"
      :id="contentId"
    />
    <SuccessModal
      v-if="showSuccessModal"
      @close="showSuccessModal = false"
      :text="textSuccessShow"
    />
  </div>
</template>

<script>
import Vue from "vue";
import RadioButton from "../components/elements/RadioButton.vue";
import InputField from "../components/elements/InputField.vue";
import UploadBanner from "../components/modal/UploadImgModal.vue";
import AddLinkModal from "../components/modal/AddLinkBannerModal.vue";
import PreviewContent from "../components/modal/PreviewContentModal.vue";
import Editor from "@tinymce/tinymce-vue";
import Datepicker from "../components/elements/Datepicker.vue";
import SwitchesField from "../components/elements/SwitchesField.vue";
import Table from "../components/elements/Table.vue";
import Button from "../components/elements/Button.vue";
import SelectField from "../components/elements/SelectField.vue";
import SuccessModal from "../components/modal/SuccessModal.vue";

var moment = require("moment");
import axios from "axios";
import Config from ".././config";

import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default Vue.extend({
  mixins: [validationMixin],
  layout: "default",
  name: "LoginPage",
  components: {
    RadioButton,
    InputField,
    UploadBanner,
    AddLinkModal,
    Editor,
    Datepicker,
    SwitchesField,
    Table,
    Button,
    SelectField,
    PreviewContent,
    SuccessModal,
  },
  data() {
    return {
      languageSelected: "",
      languageList: [
        { item: "TH", name: "TH" },
        { item: "EN", name: "EN" },
      ],
      showUploadModal: false,
      showAddlinkModal: false,
      showPreviewModal: false,
      showSuccessModal: false,
      textSuccessShow: "",
      bannerLink: "",
      bannerUrl: "",
      tinyKey: process.env.tinyApiKey,
      content: "",
      files: [],
      tinyMce: {
        height: 500,
        menubar: "",
        plugins: [
          "advlist autolink lists link image charmap",
          "searchreplace visualblocks code fullscreen",
          "print preview anchor insertdatetime media",
          "paste code help wordcount table code",
        ],
        toolbar1:
          "bold italic underline strikethrough fontsizeselect formatselect forecolor backcolor link image media table \
                    alignleft aligncenter alignright bullist numlist outdent indent undo redo code",
        // toolbar1:
        //   "bold italic underline strikethrough fontsizeselect formatselect forecolor backcolor link image media table \
        //             alignleft aligncenter alignright bullist numlist outdent indent undo redo",
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const data = new FormData();
            data.append("appId", "PLATFORM001");
            data.append("image", file, file.name);
            const reader = new FileReader();
            axios
              .post(Config.BaseURL + "v1/files/upload", data, {
                onUploadProgress: function (progressEvent) {
                  var percentage = 0;
                  var percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  percentage = percentCompleted;
                  const loaddingBox = document.getElementById("percent-box");
                  loaddingBox.innerHTML = "Uploading " + percentage + " %";
                  var element = document.getElementById("percent-box");
                  element.classList.add("show");
                },
              })
              .then((resp) => {
                if (resp.status == 200) {
                  var element = document.getElementById("percent-box");
                  element.classList.add("hide");
                  cb(resp.data.url, { title: file.name });
                } else {
                  var element = document.getElementById("percent-box");
                  element.classList.add("hide");
                  alert(`Failed to upload: ${resp.statusText}`);
                }
              })
              .catch((err) => {
                alert(err);
                var element = document.getElementById("percent-box");
                element.classList.add("hide");
              });
            reader.readAsDataURL(file);
          });
          input.click();
        },
      },
      startDate: "",
      endDate: "",
      published: false,
      alias: "",
      optionsCategory: [
        { value: "Content", text: "Content" },
        { value: "Campaign", text: "Campaign" },
        { value: "Promotion", text: "Promotion" },
        { value: "News", text: "News" },
        { value: "Announcement", text: "Announcement" },
        { value: "Ads", text: "Ads" },
      ],
      selectedCategory: "",
      contentJsons: [{ key: "", value: "" }],
      dataJsons: {},
      title: "",
      fileLists: [],
      appId: "PLATFORM001",
      contentId: "",
      dataDetails: [],
      dataPreview: {},
      mode: "",
      form: {
        startDate: null,
      },
    };
  },
  validations: {
    form: {
      startDate: {
        required,
      },
    },
  },
  mounted() {
    const contentId = this.$route.query.contentId;
    const mode = this.$route.query.mode;

    if (contentId) {
      this.getContentDetails(contentId, mode);
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      console.log($dirty, $error);
      return $dirty ? !$error : null;
    },
    getBannerLink(value) {
      this.bannerLink = value;
    },
    getBannerUrl(value) {
      this.bannerUrl = value;
      console.log(this.bannerUrl);
    },
    async getFileList() {
      this.fileLists = await this.$axios.$get(
        Config.BaseURL + "v1/files?appId=" + this.appId + "&itemsPerPage=1"
      );
      console.log(this.fileLists);
    },
    async onSubmitAdd() {
      console.log("startDate", this.$v.form, this.form.startDate);
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
      }

      let dataJsons = {};

      for (var i = 0; i < this.contentJsons.length; i++) {
        dataJsons[this.contentJsons[i].key] = this.contentJsons[i].value;
      }

      this.dataJsons =
        this.contentJsons.length > 0 && this.contentJsons[0].key !== ""
          ? JSON.parse(JSON.stringify(dataJsons))
          : {};

      let data = {};

      if (this.contentId && this.mode !== "duplicate") {
        data = {
          appId: "PLATFORM001",
          content: this.content,
          contentJson: this.dataJsons,
          publishDate: this.form.startDate
            ? moment(this.form.startDate).format("YYYY-MM-DD[T]HH:mm:ss")
            : "",
          expiredDate: this.endDate
            ? moment(this.endDate).format("YYYY-MM-DD[T]HH:mm:ss")
            : "",
          status: this.published ? "ENABLED" : "DISABLED",
          alias: this.alias,
          title: this.title,
          orderBy: "1",
          category: this.selectedCategory,
          updateBy: "70007696",
        };
      } else {
        data = {
          appId: "PLATFORM001",
          content: this.content,
          contentJson: this.dataJsons,
          publishDate: this.form.startDate
            ? moment(this.form.startDate).format("YYYY-MM-DDTHH:MM:SS")
            : "",
          expiredDate: this.endDate
            ? moment(this.endDate).format("YYYY-MM-DDTHH:MM:SS")
            : "",
          status: this.published ? "ENABLED" : "DISABLED",
          alias: this.alias,
          title: this.title,
          orderBy: "1",
          category: this.selectedCategory,
          createBy: "70007696",
        };
      }

      console.log("data======", data);
      if (this.contentId && this.mode !== "duplicate") {
        await this.$axios
          .$patch(Config.BaseURL + "v1/contents/" + this.contentId, data)
          .then((response) => {
            this.showSuccessModal = true;
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        await this.$axios
          .$post(Config.BaseURL + "/v1/contents/create", data)
          .then((response) => {
            if (response.contentId) {
              this.showSuccessModal = true;
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
    addContentJson() {
      this.contentJsons.push({ key: "", value: "" });
    },
    DeleteContentJson(item, index) {
      console.log("item", item, index);
      const fileIndex = this.contentJsons.indexOf(item);
      if (fileIndex > -1) this.contentJsons.splice(fileIndex, 1);
    },
    async getContentDetails(contentId, mode) {
      this.contentId = contentId;
      this.mode = mode;
      await this.$axios
        .$get(
          Config.BaseURL +
            "v1/contents?appId=" +
            this.appId +
            "&contentId=" +
            contentId
        )
        .then((response) => {
          this.languageSelected = response.items[0].languageSelected;
          this.bannerLink = response.items[0].bannerLink;
          this.bannerUrl = response.items[0].bannerUrl;
          this.title = response.items[0].title;
          this.selectedCategory = response.items[0].category;
          this.content = response.items[0].content;
          this.form.startDate = new Date(response.items[0].publishDate);
          this.endDate = new Date(response.items[0].expiredDate);
          this.published =
            response.items[0].status === "DISABLED" ? false : true;
          this.alias = response.items[0].alias;

          let dataJsons = [];
          for (let i in response.items[0].contentJson) {
            dataJsons.push({
              key: i,
              value: response.items[0].contentJson[i],
            });
          }
          console.log("dataJsons", dataJsons, this.contentJsons);
          this.contentJsons = dataJsons;
        });
    },
    previewContent() {
      if (this.contentId) {
        this.showPreviewModal = true;
      } else {
        this.dataPreview = {
          title: this.title,
          content: this.content,
        };
        if (this.dataPreview != {}) {
          this.showPreviewModal = true;
        }
      }

      //   this.$router.push({ name: "preview", params: { content: this.content } });
    },
  },
});
</script>
<style lang="scss">
.add-content-page {
  padding: 20px 48px;
  .banner-section {
    .banner-show {
      width: auto;
      height: auto;
      margin: auto;
    }
  }
  #percent-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999999999999;
    display: none;
    background-color: #e4eef9;
    padding: 1rem;
  }
  .show {
    display: block !important;
  }
  .hide {
    display: none !important;
  }
  .publish-section {
    display: flex;
    .switch-publish {
      align-self: center !important;
    }
  }
  .form-group-btn {
    margin-bottom: 1rem;
    text-align: right;
  }
}
</style>
