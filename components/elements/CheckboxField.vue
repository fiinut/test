<template>
  <div>
    <b-form-checkbox-group
      v-model="checked"
      :options="checkeds"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
    ></b-form-checkbox-group>
  </div>
</template>

<script>
  export default {
  props: ['title', 'value', 'checkeds'],
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  }
</script>