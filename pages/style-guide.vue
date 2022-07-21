<template>
  <div class="containner">
    <div class="group">
      <h5>Input Field</h5>
       <b-form @submit="onSubmit">
        <InputField
          title="Content Name"
          placeholder="name of content"
          v-model="content"
          :required="true"
        ></InputField>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div class="group">
      <h5>Select Field</h5>
      <SelectField
        title="Channel"
        :options="options"
        v-model="selected"
      ></SelectField>
    </div>
    <div class="group">
      <h5>Button Field</h5>
      <div class="btn-group">
        <Button label="Submit"></Button>
        <Button label="Submit" variant="danger"></Button>
        <Button label="Submit" variant="success"></Button>
        <Button label="Submit" variant="outline-primary"></Button>
      </div>
    </div>

    <div class="group">
      <h5>Checkbox Field</h5>
      <CheckboxField :checkeds="checkeds" v-model="checked"></CheckboxField>
    </div>

    <div class="group">
      <h5>Radio</h5>
      <RadioButton :checkeds="checkeds" v-model="radio"></RadioButton>
    </div>

    <div class="group">
      <h5>Switches</h5>
      <SwitchesField title="Publish On" v-model="switches"></SwitchesField>
      {{ switches }}
    </div>

    <div class="group">
      <h5>Datepicker</h5>
      <Datepicker title="วันที่เริ่มต้น" v-model="startDate"></Datepicker>
      <Datepicker title="วันที่สิ้นสุด" v-model="endDate"></Datepicker>
    </div>

    <div class="group">
      <h5>Table</h5>
      <Table :items="items"></Table>
    </div>

    <div class="group">
      <h5>Editor</h5>
      <editor
        v-model="model"
        :init="tinyMce"
        :apiKey="tinyKey"
      />
    </div>
    {{ model }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InputField from "../components/elements/InputField.vue";
import SelectField from "../components/elements/SelectField.vue";
import Button from "../components/elements/Button.vue";
import CheckboxField from "../components/elements/CheckboxField.vue";
import RadioButton from "../components/elements/RadioButton.vue";
import SwitchesField from "../components/elements/SwitchesField.vue";
import Table from "../components/elements/Table.vue";
import Datepicker from "../components/elements/Datepicker.vue";
import Editor from '@tinymce/tinymce-vue'
import axios from '@nuxtjs/axios'

export default Vue.extend({
  name: "style-guide",
  components: {
    InputField,
    SelectField,
    Button,
    CheckboxField,
    RadioButton,
    SwitchesField,
    Table,
    Datepicker,
    'editor': Editor
  },
  data() {
    return {
      content: "",
      selected: null,
      options: [
        { value: 1, text: "c4c" },
        { value: 2, text: "promstart" },
        { value: 3, text: "go app" },
      ],
      checked: [],
      checkeds: [
        { item: "A", name: "Option A" },
        { item: "B", name: "Option B" },
        { item: "D", name: "Option C", notEnabled: true },
        { item: { d: 1 }, name: "Option D" },
      ],
      radio: null,
      switches: false,
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      startDate: new Date(),
      endDate: new Date(),
      model: '',
      tinyKey: process.env.tinyApiKey,
      tinyMce: {
          height: 500,
          menubar: '',
          plugins: [
              'advlist autolink lists link image charmap',
              'searchreplace visualblocks code fullscreen',
              'print preview anchor insertdatetime media',
              'paste code help wordcount table',
          ],
          toolbar1:
              'bold italic underline strikethrough fontsizeselect formatselect forecolor backcolor link image media table \
              alignleft aligncenter alignright bullist numlist outdent indent undo redo',
          // toolbar2: 'bullist numlist outdent indent | undo redo',
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          default_link_target: '_blank',
          // file_picker_callback: function (cb, value, meta) {
          //     if(meta.filetype == 'image') {
          //         var input = document.createElement('input');
          //         input.setAttribute('type', 'file');
          //         input.setAttribute('accept', 'image/*');
          //         input.onchange = function () {
          //             var file = this.files[0];
          //             var reader = new FileReader();
          //             reader.onload = function () {
          //                 const data = new FormData();
          //                 data.append('image', file);
          //                 axios.post(`${config.api}/uploadfile`, data, {
          //                 headers: {
          //                     'accept': 'application/json',
          //                     'Authorization': localStorage.getItem('token'),
          //                     'Accept-Language': 'en-US,en;q=0.8',
          //                     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          //                 },
          //                 onUploadProgress: function(progressEvent) {
          //                     var percentage = 0
          //                     var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          //                     percentage = percentCompleted
          //                     document.getElementById("percent-box").innerHTML = 'Uploading ' + percentage + ' %';;
          //                     var element = document.getElementById("percent-box");
          //                     element.classList.add("show");
          //                 }
          //                 }).then(res => {
          //                     if(res.data.success) {
          //                         var element = document.getElementById("percent-box");
          //                         element.classList.add("hide");
          //                         cb(`${config.api}/getfile?filename=${res.data.response.image_id.path}`, {text: `${res.data.response.image_id.name}`});
          //                     }
          //                     if(!res.data.success) {
          //                         var element = document.getElementById("percent-box");
          //                         element.classList.add("hide");
          //                         alert(`Failed to upload: ${res.data.response.error_message && res.data.response.error_message}`);    
          //                     }
          //                 }).catch(err => {
          //                     alert(err);
          //                 });
          //             };
          //             reader.readAsDataURL(file);
          //         };
          //         input.click();
          //     }
          // },
      },
    };
  },
  methods: {
    async onSubmit(event : any) {
        event.preventDefault()
        const ip = await this.$axios.$get('http://icanhazip.com')
        console.log('ip=====',ip)
      },
  },
});
</script>

<style scoped>
.containner {
  padding: 20px 50px;
}
.btn-group {
  display: flex;
}
.group {
  margin-top: 2em;
}
</style>
