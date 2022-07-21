<template>
  <div>
    <b-form-checkbox
      switch
      size="lg"
      v-model="switches"
      :class="[
        'status-content',
        title === 'Active',
        value ? 'enable' : 'disable',
      ]"
      >{{ value == true ? "Active" : "Inactive" }}</b-form-checkbox
    >
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  data() {
    return {
      contentStatus: "",
    };
  },
  computed: {
    switches: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    if (this.title == "Active") {
    }
  },
};
</script>
<style lang="scss">
.status-content .enable {
  .custom-control-label::before {
    border-color: green !important;
    background-color: green !important;
  }
}

.status-content .disable {
  .custom-switch .custom-control-label::after {
    border-color: red !important;
    background-color: red !important;
  }
}
</style>
