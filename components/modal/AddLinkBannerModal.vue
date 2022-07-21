<template>
  <div class="crm-modal">
      <div class="modal-wrapper">
          <div class="modal-container">
              <div class="header">
                <button type="button" class="close-button" @click="$emit('close')">
                  <b-icon icon="x" />
                </button>
              </div>
              <div class="modal-body">
                <h6>Add Banner Link</h6>
                <div class="d-flex">
                <Input
                  placeholder="Link ...."
                  v-model="bannerLink"
                  :required="false">
                </Input>
                <b-button @click="submit()">ADD</b-button>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import Input from '../elements/InputField.vue'
export default {
  components: {
    Input
  },
  data(){
    return {
      bannerLink: ''
    }
  },
  methods: {
    submit(){
      console.log(this.bannerLink)
       this.$emit("link", this.bannerLink);
       this.$emit('close')
    }
  }
}
</script>