(window.webpackJsonp=window.webpackJsonp||[]).push([[26,5],{571:function(e,t,n){var content=n(591);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(82).default)("60f662a6",content,!0,{sourceMap:!1})},575:function(e,t,n){"use strict";n.r(t);var l={props:["title","value","checkeds"],computed:{checked:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},o=n(67),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("b-form-checkbox-group",{staticClass:"mb-3",attrs:{options:e.checkeds,"value-field":"item","text-field":"name","disabled-field":"notEnabled"},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}})],1)}),[],!1,null,null,null);t.default=component.exports},590:function(e,t,n){"use strict";n(571)},591:function(e,t,n){var l=n(81)(!1);l.push([e.i,".containner[data-v-04a9d21d]{padding:20px 50px}.btn-group[data-v-04a9d21d]{display:flex}.group[data-v-04a9d21d]{margin-top:2em}",""]),e.exports=l},600:function(e,t,n){"use strict";n.r(t);var l=n(52),o=(n(112),n(22)),c=n(404),r=n(557),d=n(556),v=n(575),m=n(564),h=n(565),f=n(555),_=n(554),k=n(576),x=o.default.extend({name:"style-guide",components:{InputField:c.default,SelectField:r.default,Button:d.default,CheckboxField:v.default,RadioButton:m.default,SwitchesField:h.default,Table:f.default,Datepicker:_.default,editor:k.a},data:function(){return{content:"",selected:null,options:[{value:1,text:"c4c"},{value:2,text:"promstart"},{value:3,text:"go app"}],checked:[],checkeds:[{item:"A",name:"Option A"},{item:"B",name:"Option B"},{item:"D",name:"Option C",notEnabled:!0},{item:{d:1},name:"Option D"}],radio:null,switches:!1,items:[{age:40,first_name:"Dickerson",last_name:"Macdonald"},{age:21,first_name:"Larsen",last_name:"Shaw"},{age:89,first_name:"Geneva",last_name:"Wilson"},{age:38,first_name:"Jami",last_name:"Carney"}],startDate:new Date,endDate:new Date,model:"",tinyKey:"sqr6zktjeya5l2ne1oij0b0qmmhnbmuv7exu07t83p51a8k1",tinyMce:{height:500,menubar:"",plugins:["advlist autolink lists link image charmap","searchreplace visualblocks code fullscreen","print preview anchor insertdatetime media","paste code help wordcount table"],toolbar1:"bold italic underline strikethrough fontsizeselect formatselect forecolor backcolor link image media table               alignleft aligncenter alignright bullist numlist outdent indent undo redo",image_title:!0,automatic_uploads:!0,file_picker_types:"image",default_link_target:"_blank"}}},methods:{onSubmit:function(e){var t=this;return Object(l.a)(regeneratorRuntime.mark((function n(){var l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.preventDefault(),n.next=3,t.$axios.$get("http://icanhazip.com");case 3:l=n.sent,console.log("ip=====",l);case 5:case"end":return n.stop()}}),n)})))()}}}),w=(n(590),n(67)),component=Object(w.a)(x,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"containner"},[t("div",{staticClass:"group"},[t("h5",[e._v("Input Field")]),e._v(" "),t("b-form",{on:{submit:e.onSubmit}},[t("InputField",{attrs:{title:"Content Name",placeholder:"name of content",required:!0},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}}),e._v(" "),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Submit")])],1)],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Select Field")]),e._v(" "),t("SelectField",{attrs:{title:"Channel",options:e.options},model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Button Field")]),e._v(" "),t("div",{staticClass:"btn-group"},[t("Button",{attrs:{label:"Submit"}}),e._v(" "),t("Button",{attrs:{label:"Submit",variant:"danger"}}),e._v(" "),t("Button",{attrs:{label:"Submit",variant:"success"}}),e._v(" "),t("Button",{attrs:{label:"Submit",variant:"outline-primary"}})],1)]),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Checkbox Field")]),e._v(" "),t("CheckboxField",{attrs:{checkeds:e.checkeds},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}})],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Radio")]),e._v(" "),t("RadioButton",{attrs:{checkeds:e.checkeds},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}})],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Switches")]),e._v(" "),t("SwitchesField",{attrs:{title:"Publish On"},model:{value:e.switches,callback:function(t){e.switches=t},expression:"switches"}}),e._v("\n      "+e._s(e.switches)+"\n    ")],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Datepicker")]),e._v(" "),t("Datepicker",{attrs:{title:"วันที่เริ่มต้น"},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}}),e._v(" "),t("Datepicker",{attrs:{title:"วันที่สิ้นสุด"},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}})],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Table")]),e._v(" "),t("Table",{attrs:{items:e.items}})],1),e._v(" "),t("div",{staticClass:"group"},[t("h5",[e._v("Editor")]),e._v(" "),t("editor",{attrs:{init:e.tinyMce,apiKey:e.tinyKey},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1),e._v("\n    "+e._s(e.model)+"\n  ")])}),[],!1,null,"04a9d21d",null);t.default=component.exports}}]);