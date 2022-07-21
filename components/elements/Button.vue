<template>
      <b-button class="btn" :variant="variant" @click="$emit('click')" :style="style">{{label}}</b-button>
</template>

<script>
export default {
  props: ['label', 'value', 'variant', 'style'],
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
.btn{
  width: 100%;
  /* padding: 5px; */
}
</style>
