<template>
  <div class="form">
       <label for="input-1" class="fieldset"> {{title}}<span v-if="required" style="color : red;">*</span></label>
       <b-form-input id="input-live"
        :placeholder="placeholder"
        :required="required"
        v-model="inputVal"
        :state="state"
        aria-describedby="input-live-help input-live-feedback"
        trim></b-form-input>
      <!-- <b-form-input
        id="input-live"
        :placeholder="placeholder"
        :required="required"
        v-model="inputVal"
        :state="state"
        aria-describedby="input-live-help input-live-feedback"
        trim
      ></b-form-input> -->
      <b-form-invalid-feedback id="input-live-feedback">
        กรุณากรอก {{ placeholder }}
      </b-form-invalid-feedback>
  </div>
</template>

<script>
export default {
  props: ["title", "placeholder", "value", "required", "state"],
  computed: {
    inputVal: {
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
.form {
  padding: 5px;
  .fieldset {
    display: flex;
  }
}
</style>
