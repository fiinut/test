<template>
  <div class="crm-modal">
      <div class="modal-wrapper">
          <div class="modal-container">
              <div class="header">
                <div>ยืนยันการลบ</div>
                <button type="button" class="close-button" @click="$emit('close')">
                  <b-icon icon="x" />
                </button>
              </div>
              <div class="modal-body">
                  <span>{{body}}</span>
              </div>
              <div  class="modal-footer">
                <b-button variant="success" @click="$emit('delete', contentId)">ยืนยัน</b-button>
                <b-button variant="secondary" @click="$emit('close')">ยกเลิก</b-button>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'body', 'contentId'],
}
</script>