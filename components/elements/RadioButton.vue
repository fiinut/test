<template>
  <div>
    <b-form-group :label="label" v-slot="{ ariaDescribedby }">
      <b-form-radio
      v-for="(checked, index) of checkeds" :key="index"
        v-model="selected"
        :aria-describedby="ariaDescribedby"
        name="some-radios"
        :value="checked.item"
        >{{checked.name}}</b-form-radio
      >
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "checkeds"],
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
