(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{402:function(t,n,e){"use strict";n.a={BaseURL:"https://api.qa.channel.buk0.com/zm5/"}},560:function(t,n,e){"use strict";e.r(n);var o=e(52),c=(e(112),e(402)),r={props:["data","id"],data:function(){return{dataContent:{},appId:"PLATFORM001",title:"",content:""}},mounted:function(){this.id&&this.getContentbyId()},methods:{getContentbyId:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t.contentId=t.id,n.next=3,t.$axios.$get(c.a.BaseURL+"v1/contents?appId="+t.appId+"&contentId="+t.contentId).then((function(n){t.title=n.items[0].title,t.content=n.items[0].content}));case 3:case"end":return n.stop()}}),n)})))()}}},d=e(67),component=Object(d.a)(r,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"preview-modal"},[n("div",{staticClass:"modal-wrapper"},[n("div",{staticClass:"modal-container"},[n("div",{staticClass:"header"},[n("button",{staticClass:"close-button",attrs:{type:"button"},on:{click:function(n){return t.$emit("close")}}},[n("b-icon",{attrs:{icon:"x"}})],1)]),t._v(" "),n("div",{staticClass:"modal-body d-block"},[n("h2",[t._v(t._s(t.title))]),t._v(" "),n("div",{domProps:{innerHTML:t._s(t.content)}})])])])])}),[],!1,null,null,null);n.default=component.exports}}]);