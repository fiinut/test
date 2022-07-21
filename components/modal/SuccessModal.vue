<template>
  <div class="crm-modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="header"></div>
        <div class="modal-body">
          <h6>บันทึกสำเร็จ</h6>
        </div>
        <b-button @click="backToHome()">กลับสู่หน้าหลัก</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import Input from "../elements/InputField.vue";
export default {
  components: {
    Input,
  },
  data() {
    return {
      bannerLink: "",
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/home");
      this.$emit("close");
    },
  },
};
</script>
