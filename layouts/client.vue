<template>
  <b-container>
    <div class="client-header">
      <b-img src="../assets/images/logo-o.png" class="logo"></b-img>
      <b-nav class="client-menu">
        <b-nav-item href="/client-home"
          ><b-icon icon="house-door-fill"
        /></b-nav-item>
        <b-nav-item>Promotion</b-nav-item>
        <b-nav-item>ข่าวสาร</b-nav-item>
        <b-nav-item>บทความที่น่าสนใจ</b-nav-item>
        <b-nav-item>ประกาศ</b-nav-item>
        <b-nav-item>โฆษณา</b-nav-item>
      </b-nav>
    </div>
    <Nuxt />
  </b-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.client-header {
  display: flex;
  .client-menu {
    margin: auto;
  }
  .logo {
    width: 100px !important;
  }
}
a {
  color: #564243;
}
a:hover {
  color: #ffd503;
}
</style>
