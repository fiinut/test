<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <!-- <template #cell(status)="data">
        <span class="status-published" v-if="data.item.status == 'ENABLED'"
          >Published</span
        >
        <span class="status-unpublished" v-if="data.item.status == 'DISABLED'"
          >Unpublished</span
        >
      </template> -->
      <template #cell(expiredDate)="data">
        <span class="status-published" v-if="checkDateAfter(data)">{{
          textDate(data)
        }}</span>
        <span class="status-unpublished" v-if="!checkDateAfter(data)">{{
          textDate(data)
        }}</span>
      </template>
      <template v-if="action" #cell(actions)="row">
        <div class="d-flex">
          <div v-for="(ac, index) of action" :key="index">
            <b-dropdown
              size="sm"
              v-if="ac.nameAction == 'Preview'"
              id="dropdown-1"
              :text="ac.nameAction"
              class="mr-1"
            >
              <b-dropdown-item @click="$emit(ac.action, row, 'Desktop')"
                >Desktop</b-dropdown-item
              >
              <b-dropdown-item @click="$emit(ac.action, row, 'Mobile')"
                >Mobile</b-dropdown-item
              >
            </b-dropdown>
            <b-button
              v-else
              size="sm"
              @click="$emit(ac.action, row, ac.action)"
              class="mr-1"
            >
              {{ ac.nameAction }}
            </b-button>
          </div>
        </div>
      </template>
    </b-table>
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="«"
        prev-text="‹"
        next-text="›"
        last-text="»"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
var moment = require("moment");

export default {
  props: [
    "title",
    "value",
    "items",
    "fields",
    "action",
    "currentPage",
    "rows",
    "perPage",
  ],
  data() {
    return {
      DateAfter: true,
      DateBefore: true,
    };
  },
  watch: {
    currentPage(value) {
      if (value) {
        this.$emit("page-click", value);
      }
    },
  },
  methods: {
    checkDateAfter(data) {
      const st = data.item.expiredDate;
      const ed = new Date();
      return moment(st).isAfter(moment(ed));
    },
    textDate(data){
      return data.item.expiredDate!== null && data.item.expiredDate !== '' ? moment(data.item.expiredDate).format("DD/MM/YYYY" ) : '-';
    }
  },
};
</script>
<style lang="scss">
.status-published {
  color: green;
}
.status-unpublished {
  color: red;
}
</style>
