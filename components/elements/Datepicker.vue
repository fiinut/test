<template>
  <div>
    <label class="mt-3" :for="`datepicker-` + date">{{ title }} <span v-if="required" style="color : red;">*</span></label>
    <b-form-datepicker
      :id="`datepicker-` + date"
      :date-format-options="{
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }"
      locale="en"
      reset-button
      v-model="date"
      :state="state"
      :aria-describedby="`datepicker-` + date + `-help datepicker-`+ date + `-feedback`"
        trim
    ></b-form-datepicker>
     <b-form-invalid-feedback :id="`datepicker-` + date + `-feedback`">
        กรุณากรอก {{ title }}
      </b-form-invalid-feedback>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "required", "state"],
  computed: {
    date: {
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
<style lang="scss">
.b-form-btn-label-control.form-control > .form-control {
  font-size: 14px !important;
}
</style>
