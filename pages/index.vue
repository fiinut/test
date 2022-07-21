<template>

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  created () {
    this.$router.push('/login')
  },
})
</script>
