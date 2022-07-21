<template>
  <div class="form">
    <label>{{ title }}</label> <span v-if="required" style="color: red">*</span>
    <b-form-select
      v-model="selected"
      :options="options"
      :state="state"
      aria-describedby="input-live-help input-live-feedback"
      trim
    >
      <template #first> </template
    ></b-form-select>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "options", "required", "state"],
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
<style scoped>
.form {
  padding: 5px;
}
</style>
