<template>
  <div class="content">
    <div class="form-search">
      <!-- <b-form> -->
      <b-container class="bv-example-row">
        <b-row align-v="baseline">
          <b-col>
            <InputField
              title="Content Name"
              v-model="content"
              :required="false"
            ></InputField>
          </b-col>
          <b-col>
            <Datepicker title="วันที่เริ่มต้น" v-model="startDate"></Datepicker>
          </b-col>
          <b-col>
            <Datepicker title="วันที่สิ้นสุด" v-model="endDate"></Datepicker>
          </b-col>
          <b-col>
            <SelectField
              title="Status"
              :options="optionsStatus"
              v-model="selectedStatus"
            ></SelectField>
          </b-col>
          <b-col>
            <div class="button-search">
              <Button
                label="ค้นหา"
                variant="warning"
                @click="onSearch()"
              ></Button>
              <!-- <Button label="เพิ่ม" variant="success" @click="onAdd()"></Button> -->
            </div>
          </b-col>
        </b-row>
      </b-container>
      <!-- </b-form> -->
    </div>
    <Table
      :items="items"
      :fields="fieldsTable"
      :action="actionTable"
      @clickPreview="clickPreview"
      @clickDuplicate="clickDuplicate"
      @clickDetail="clickDetail"
      @clickDelete="clickDelete"
      :currentPage="currentPage"
      :rows="rows"
      :perPage="perPage"
      @page-click="handleClick"
    >
    </Table>
    <ModalConfirm
      title="ยืนยันการลบ"
      :body="contentConfirm"
      :contentId="contentId"
      v-if="isShowConfirm"
      @close="isShowConfirm = false"
      @delete="deleteContent"
    ></ModalConfirm>
    <PreviewContent
      v-if="showPreviewModal"
      @close="showPreviewModal = false"
      :id="contentId"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InputField from "../components/elements/InputField.vue";
import SelectField from "../components/elements/SelectField.vue";
import Button from "../components/elements/Button.vue";
import Datepicker from "../components/elements/Datepicker.vue";
import Table from "../components/elements/Table.vue";
import ModalConfirm from "../components/modal/ModalConfirm.vue";
import PreviewContent from "../components/modal/PreviewContentModal.vue";
import Config from ".././config";
var moment = require("moment");

export default Vue.extend({
  layout: "default",
  name: "LoginPage",
  components: {
    InputField,
    SelectField,
    Button,
    Datepicker,
    Table,
    PreviewContent,
  },
  data() {
    return {
      fieldsTable: [
        // {
        //   key: "Picture",
        // },
        {
          key: "title",
          sortable: true,
        },
        {
          key: "publishDate",
          sortable: true,
        },
        {
          key: "expiredDate",
          sortable: true,
        },
        {
          key: "status",
          sortable: true,
        },
        { key: "actions", label: "Actions" },
      ],
      items: [],
      actionTable: [
        {
          action: "clickPreview",
          nameAction: "Preview",
        },
        {
          action: "clickDuplicate",
          nameAction: "Duplicate",
        },
        {
          action: "clickDetail",
          nameAction: "Detail",
        },
        {
          action: "clickDelete",
          nameAction: "Delete",
        },
      ],
      contentsList: [],
      appId: "PLATFORM001",
      content: "",
      startDate: "",
      endDate: "",
      optionsStatus: [
        { value: "ENABLED", text: "ENABLED" },
        { value: "DISABLED", text: "DISABLED" },
        // { value: "Publish", text: "Publish" },
        // { value: "Draft", text: "Draft" },
        // { value: "Expired", text: "Expired" },
        // { value: "Inactive", text: "Inactive" },
      ],
      selectedStatus: "",
      isShowConfirm: false,
      contentConfirm: "",
      contentId: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      showPreviewModal: false,
    };
  },                
  mounted() {
    this.getContentsList();
  },
  methods: {
    clickPage() {
      console.log(123456, this.currentPage);
    },
    async getContentsList() {
      await this.$axios
        .$get(Config.BaseURL + "v1/contents?appId=" + this.appId)
        .then((response: any) => {
          console.log("response====", response);
          this.contentsList = response.items;
          if (this.contentsList) {
            this.contentsList.forEach((element: any, index: number) => {
              element.publishDate = moment(element.publishDate).format(
                "DD/MM/YYYY"
              );
              // element.expiredDate = element.expiredDate !== null && element.expiredDate !== '' ? moment(element.expiredDate).format("DD/MM/YYYY" ) : '-';
            });
            this.items = this.contentsList;
            this.rows = response.allItems;
          }
        });
    },
    async onSearch() {
      const startDate = this.startDate
        ? moment(this.startDate).format("YYYY-MM-DDTHH:MM:SS")
        : "";
      const endDate = this.endDate
        ? moment(this.endDate).format("YYYY-MM-DDTHH:MM:SS")
        : "";

      console.log("content", this.content);
      console.log("startDate", startDate);
      console.log("endDate", endDate);
      console.log("selectedStatus", this.selectedStatus);

      await this.$axios
        .$get(
          Config.BaseURL +
            "v1/contents?appId=" +
            this.appId +
            "&title=" +
            this.content +
            "&publishDate=" +
            startDate +
            "&expiredDate=" +
            endDate +
            "&status=" +
            this.selectedStatus +
            "&page=" +
            this.currentPage +
            "&itemsPerPage=" +
            this.perPage
        )
        .then((response: any) => {
          console.log("response====", response);
          this.contentsList = response.items;
          if (this.contentsList) {
            this.contentsList.forEach((element: any, index: number) => {
              element.publishDate = moment(element.publishDate).format(
                "DD/MM/YYYY"
              );
            });
            this.items = this.contentsList;
            this.rows = response.allItems;
          }
        });
    },
    onAdd() {
      this.$router.push("/add-content");
    },
    clickPreview(row: any, preview: any) {
      this.contentId = row.item.contentId;
      if (preview == "Desktop") {
        let routeData = this.$router.resolve({
          name: "preview",
          query: { contentId: this.contentId },
        });
        window.open(routeData.href, "_blank");
      } else if (preview == "Mobile") {
        this.showPreviewModal = true;
      }
    },
    clickDuplicate(row: any) {
      const contentId = row.item.contentId;
      this.$router.push({
        name: "add-content",
        query: { contentId: contentId, mode: "duplicate" },
      });
    },
    clickDetail(row: any) {
      const contentId = row.item.contentId;
      this.$router.push({
        name: "add-content",
        query: { contentId: contentId },
      });
    },
    clickDelete(row: any) {
      this.contentConfirm = "ต้องการลบ " + row.item.title + " ?";
      this.contentId = row.item.contentId;
      this.isShowConfirm = true;
    },
    async deleteContent(contentId: any) {
      console.log("row===", contentId);

      await this.$axios
        .$delete(
          Config.BaseURL + "v1/contents/" + contentId + "?appId=" + this.appId
        )
        .then((response: any) => {
          console.log("response===", response);
          this.getContentsList();
          this.isShowConfirm = false;
          // alert('ลบรายการสำเร็จ');
        });
    },
    handleClick(currentPage: any) {
      console.log(currentPage);
      this.currentPage = currentPage;
      this.onSearch();
    },
  },
});
</script>

<style lang="scss">
.content {
  overflow: auto;
  padding: 20px;

  .row {
    align-items: baseline !important;
  }
  .button-search {
    position: absolute;
    margin-top: 10px;
    width: 100%;
    display: flex;
  }

  .crm-modal .modal-wrapper .modal-container .header {
    justify-content: space-between !important;
  }
}
</style>
