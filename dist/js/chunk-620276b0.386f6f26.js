(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-620276b0"],{"11e9":function(e,t,a){var i=a("52a7"),l=a("4630"),r=a("6821"),n=a("6a99"),s=a("69a8"),o=a("c69a"),c=Object.getOwnPropertyDescriptor;t.f=a("9e1e")?c:function(e,t){if(e=r(e),t=n(t,!0),o)try{return c(e,t)}catch(a){}if(s(e,t))return l(!i.f.call(e,t),e[t])}},"52a7":function(e,t){t.f={}.propertyIsEnumerable},"5dbc":function(e,t,a){var i=a("d3f4"),l=a("8b97").set;e.exports=function(e,t,a){var r,n=t.constructor;return n!==a&&"function"==typeof n&&(r=n.prototype)!==a.prototype&&i(r)&&l&&l(e,r),e}},"6de1":function(e,t,a){},"8b97":function(e,t,a){var i=a("d3f4"),l=a("cb7c"),r=function(e,t){if(l(e),!i(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,i){try{i=a("9b43")(Function.call,a("11e9").f(Object.prototype,"__proto__").set,2),i(e,[]),t=!(e instanceof Array)}catch(l){t=!0}return function(e,a){return r(e,a),t?e.__proto__=a:i(e,a),e}}({},!1):void 0),check:r}},9093:function(e,t,a){var i=a("ce10"),l=a("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,l)}},a21f:function(e,t,a){var i=a("584a"),l=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return l.stringify.apply(l,arguments)}},aa77:function(e,t,a){var i=a("5ca1"),l=a("be13"),r=a("79e5"),n=a("fdef"),s="["+n+"]",o="​",c=RegExp("^"+s+s+"*"),d=RegExp(s+s+"*$"),g=function(e,t,a){var l={},s=r(function(){return!!n[e]()||o[e]()!=o}),c=l[e]=s?t(p):n[e];a&&(l[a]=c),i(i.P+i.F*s,"String",l)},p=g.trim=function(e,t){return e=String(l(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(d,"")),e};e.exports=g},ac46:function(e,t,a){"use strict";var i=a("6de1"),l=a.n(i);l.a},c04e:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-cascades"}),e._v(" 设备列表")])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.select}},[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"设备id"}},[a("el-input",{staticClass:"handle-input-id",attrs:{maxlength:"40px",placeholder:"请输入设备id"},model:{value:e.select.id,callback:function(t){e.$set(e.select,"id",t)},expression:"select.id"}})],1),a("el-form-item",{attrs:{label:"所属厂区"}},[a("el-input",{staticClass:"handle-input-address",attrs:{placeholder:"请输入所属厂区"},model:{value:e.select.address,callback:function(t){e.$set(e.select,"address",t)},expression:"select.address"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"search"},on:{click:function(t){e.search()}}},[e._v("搜索")])],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"告警等级"}},[a("el-select",{staticClass:"handle-input-grade",attrs:{placeholder:"请选择告警等级"},model:{value:e.select.grade,callback:function(t){e.$set(e.select,"grade",t)},expression:"select.grade"}},[a("el-option",{key:"1",attrs:{label:"1",value:"1"}}),a("el-option",{key:"2",attrs:{label:"2",value:"2"}}),a("el-option",{key:"3",attrs:{label:"3",value:"3"}}),a("el-option",{key:"4",attrs:{label:"4",value:"4"}})],1)],1),a("el-form-item",{attrs:{label:"检测时间"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"请选择开始时间","end-placeholder":"请选择结束时间",align:"right"},model:{value:e.select.time,callback:function(t){e.$set(e.select,"time",t)},expression:"select.time"}})],1)],1),a("el-col",{attrs:{span:24}},[a("el-form-item",[[a("el-button",{staticClass:"handle-read",attrs:{type:"primary",icon:"read"},on:{click:e.storeData}},[e._v("导出数据")]),a("el-button",{staticClass:"handle-del",attrs:{type:"primary",icon:"delete"},on:{click:e.handleDeleteALL}},[e._v("批量删除")]),a("el-button",{staticClass:"handle-add",attrs:{type:"primary",icon:"add"},on:{click:e.handleAdd}},[e._v("添加数据")])]],2)],1)],1)],1),a("el-table",{ref:"multipleTable",staticClass:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",total:"100","page-size":"8","max-height":"350"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{label:"序号",prop:"num",type:"integer",align:"center",width:"60"}}),a("el-table-column",{attrs:{prop:"warning_id",label:"告警编号",type:"integer",align:"center",width:"150","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"device_id",label:"设备id",type:"integer",align:"center",width:"150","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"device_port",label:"设备端口",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"device_address",label:"所属厂区",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"warning_time",label:"告警时间",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"warning_code",label:"告警代码",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"warning_grade",label:"告警等级",width:"100",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(a){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",small:"","page-sizes":[5,10,15,20,30],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.allData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"添加",visible:e.addVisible,width:"40%"},on:{"update:visible":function(t){e.addVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"告警编号"}},[a("el-input",{attrs:{type:"integer"},model:{value:e.form.warning_id,callback:function(t){e.$set(e.form,"warning_id",t)},expression:"form.warning_id"}})],1),a("el-form-item",{attrs:{label:"设备id"}},[a("el-input",{attrs:{type:"integer"},model:{value:e.form.device_id,callback:function(t){e.$set(e.form,"device_id",t)},expression:"form.device_id"}})],1),a("el-form-item",{attrs:{label:"设备端口"}},[a("el-input",{attrs:{type:"integer"},model:{value:e.form.device_port,callback:function(t){e.$set(e.form,"device_port",t)},expression:"form.device_port"}})],1),a("el-form-item",{attrs:{label:"所属厂区"}},[a("el-input",{model:{value:e.form.device_address,callback:function(t){e.$set(e.form,"device_address",t)},expression:"form.device_address"}})],1),a("el-form-item",{attrs:{label:"告警时间"}},[a("el-input",{attrs:{placeholder:"xx/xx/xx xx:xx",type:"integer"},model:{value:e.form.warning_time,callback:function(t){e.$set(e.form,"warning_time",t)},expression:"form.warning_time"}})],1),a("el-form-item",{attrs:{label:"告警代码"}},[a("el-input",{attrs:{type:"integer"},model:{value:e.form.warning_code,callback:function(t){e.$set(e.form,"warning_code",t)},expression:"form.warning_code"}})],1),a("el-form-item",{attrs:{label:"告警等级"}},[a("el-select",{attrs:{placeholder:"请选择告警等级"},model:{value:e.form.warning_grade,callback:function(t){e.$set(e.form,"warning_grade",t)},expression:"form.warning_grade"}},[a("el-option",{key:"1",attrs:{label:"1",value:"1"}}),a("el-option",{key:"2",attrs:{label:"2",value:"2"}}),a("el-option",{key:"3",attrs:{label:"3",value:"3"}}),a("el-option",{key:"4",attrs:{label:"4",value:"4"}})],1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.saveAdd}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"搜索结果",visible:e.searchVisible,width:"60%"},on:{"update:visible":function(t){e.searchVisible=t}}},[a("el-table",{attrs:{data:e.searchRes}},[a("el-table-column",{attrs:{label:"告警编号",prop:"warning_id",type:"integer",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"device_id",label:"设备id",type:"integer",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"device_port",label:"设备端口",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"device_address",label:"所属厂区",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"warning_time",label:"告警时间",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"warning_code",label:"告警代码",width:"150",align:"center","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{prop:"warning_grade",label:"告警等级",type:"integer",width:"150",align:"center","show-overflow-tooltip":""}})],1)],1),a("el-dialog",{attrs:{title:"提示",visible:e.delVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delVisible=t}}},[a("div",{staticClass:"del-dialog-cnt"},[e._v("删除不可恢复，是否确定删除？")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.deleteRow}},[e._v("确 定")])],1)]),a("el-dialog",{attrs:{title:"提示",visible:e.delallVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delallVisible=t}}},[a("div",{staticClass:"del-all-dialog-cnt"},[e._v("批量删除不可恢复，是否确定删除？")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.delallVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.delAll}},[e._v("确 定")])],1)])],1)},l=[],r=(a("c5f6"),a("f499")),n=a.n(r),s=(a("cadf"),a("551c"),a("097d"),{name:"DeviceList",data:function(){return{get_url:"admin/record/all",search_url:"admin/record/some",insert_url:"admin/record/insert",delete_url:"admin/record/delete",allData:[],tableData:[],cur_page:1,page_size:10,multipleSelection:[],select:{id:"",time:"",address:"",grade:""},del_list:[],is_search:!1,editVisible:!1,addVisible:!1,delVisible:!1,delallVisible:!1,searchVisible:!1,form:{num:"",warning_id:"",device_id:"",device_port:"",device_address:"",warning_time:"",warning_code:"",warning_grade:""},rules:{device_id:[{required:!0,message:"请输入设备id",trigger:"blur"},{type:"number",message:"设备id必须为数字",trigger:"blur"}],device_address:[{required:!0,message:"请输入所属厂区",trigger:"blur"}]},idx:-1,row:[],searchRes:[]}},created:function(){this.getData(),this.getpageData()},methods:{getData:function(){var e=this;this.$axios.get(this.get_url).then(function(t){console.log("res.data",t.data),console.log("res_len",t.data.length);for(var a=t.data.length,i=0;i<a;i++)e.allData.push(t.data[i]);console.log("alldata:",e.allData),console.log("getData successfully"),e.getpageData()})},storeData:function(){var e=n()(this.allData),t=new Blob([e],{type:"application/json"});saveAs(t,"data.json")},handleSizeChange:function(e){this.page_size=e,this.getpageData()},handleCurrentChange:function(e){this.cur_page=e,this.getpageData()},getpageData:function(){this.tableData.splice(0,this.tableData.length);for(var e=0;e<this.page_size;e++){if(!((this.cur_page-1)*this.page_size+e<this.allData.length))break;this.tableData.push(this.allData[(this.cur_page-1)*this.page_size+e])}for(var t=0;t<this.tableData.length;t++)this.tableData[t].num=(this.cur_page-1)*this.page_size+t+1},sortData:function(){for(var e=0;e<this.allData.length;e++)this.allData[e].num=e+1},search:function(){var e=this;if(this.searchRes.splice(0,this.searchRes.length),this.select.id&&this.select.time&&this.select.address&&this.select.grade){var t=this.select.time[0].getFullYear(),a=this.select.time[0].getMonth()+1,i=this.select.time[0].getDate();a>=1&&a<=9&&(a="0"+a),i>=0&&i<=9&&(i="0"+i);var l=t+"/"+a+"/"+i,r=l+"%20"+this.select.time[0].toLocaleTimeString();r=r.substring(0,r.length-3),t=this.select.time[1].getFullYear(),a=this.select.time[1].getMonth()+1,i=this.select.time[1].getDate(),a>=1&&a<=9&&(a="0"+a),i>=0&&i<=9&&(i="0"+i),l=t+"/"+a+"/"+i;var n=l+"%20"+this.select.time[1].toLocaleTimeString();n=n.substring(0,n.length-3);var s=this.search_url;s+="?device_id=".concat(Number(this.select.id)),s+="&device_address=".concat(this.select.address),s+="&warning_time_begin=".concat(r),s+="&warning_time_end=".concat(n),s+="&warning_grade=".concat(Number(this.select.grade)),this.$axios.get(s).then(function(t){console.log("res",t);for(var a=0;a<t.data.length;a++)t.data[a].warning_time=t.data[a].warning_time.substring(0,n.length-2),e.searchRes.push(t.data[a]);console.log("searchRes",e.searchRes)}),this.select={id:"",time:"",address:"",grade:""},this.searchVisible=!0}else this.$message.error("输入不能为空")},handleAdd:function(){this.form={num:"",warning_id:"",device_id:"",device_port:"",device_address:"",warning_time:"",warning_code:"",warning_grade:""},this.addVisible=!0},handleEdit:function(e){this.row=e,this.idx=this.allData.indexOf(this.row);var t=this.allData[this.idx];this.form={num:t.num,warning_id:t.warning_id,device_id:t.device_id,device_port:t.device_port,device_address:t.device_address,warning_time:t.warning_time,warning_code:t.warning_code,warning_grade:t.warning_grade},this.editVisible=!0},handleDelete:function(e){this.row=e,this.idx=this.allData.indexOf(this.row);var t=this.allData[this.idx];this.form={num:t.num,warning_id:t.warning_id,device_id:t.device_id,device_port:t.device_port,device_address:t.device_address,warning_time:t.warning_time,warning_code:t.warning_code,warning_grade:t.warning_grade},this.delVisible=!0},handleDeleteALL:function(){0!=this.multipleSelection.length?this.delallVisible=!0:this.$message.error("尚未选中要删除行")},delAll:function(){var e=this,t=this.multipleSelection.length;this.del_list=this.del_list.concat(this.multipleSelection);for(var a=function(t){e.allData=e.allData.filter(function(a){return a.warning_id!==e.multipleSelection[t].warning_id}),l=Number(e.multipleSelection[t].warning),console.log("delete_id",l),r=e.delete_url,r+="?warning_id=".concat(l),e.$axios.post(r).then(function(e){console.log("res",e)})},i=0;i<t;i++){var l,r;a(i)}this.getpageData(),0==this.tableData.length&&(this.cur_page--,this.getpageData()),this.multipleSelection=[],this.$message.error("批量删除成功"),this.delallVisible=!1},handleSelectionChange:function(e){this.multipleSelection=e},saveAdd:function(){if(""!=this.form.warning_id&&""!=this.form.device_id&&""!=this.form.device_port&&""!=this.form.device_address&&""!=this.form.warning_time&&""!=this.form.warning_code&&""!=this.form.warning_grade){this.allData.push(this.form);var e=new FormData;e.append("warning_id",Number(this.form.warning_id)),e.append("device_id",Number(this.form.device_id)),e.append("device_port",this.form.device_port),e.append("device_address",this.form.device_address),e.append("warning_time",this.form.warning_time),e.append("warning_code",Number(this.form.warning_code)),e.append("warning_grade",Number(this.form.warning_grade)),this.$axios.post(this.insert_url,e).then(function(e){console.log("res",e)}),this.getpageData(),this.addVisible=!1,this.$message.success("添加成功")}},deleteRow:function(){var e=this;console.log("form",this.row),this.allData=this.allData.filter(function(t){return t.warning_id!==e.row.warning_id});var t=Number(this.form.warning_id);console.log("delete_id",t);var a=this.delete_url;a+="?warning_id=".concat(t),console.log("url",a),this.$axios.delete(a).then(function(t){console.log("res",t),e.getpageData(),0==e.tableData.length&&(e.cur_page--,e.getpageData()),e.delVisible=!1,e.$message.error("删除成功")}),this.form={num:"",warning_id:"",device_id:"",device_port:"",device_address:"",warning_time:"",warning_code:"",warning_grade:""}}}}),o=s,c=(a("ac46"),a("2877")),d=Object(c["a"])(o,i,l,!1,null,"b034c68c",null);d.options.__file="Prediction.vue";t["default"]=d.exports},c5f6:function(e,t,a){"use strict";var i=a("7726"),l=a("69a8"),r=a("2d95"),n=a("5dbc"),s=a("6a99"),o=a("79e5"),c=a("9093").f,d=a("11e9").f,g=a("86cc").f,p=a("aa77").trim,h="Number",u=i[h],f=u,m=u.prototype,_=r(a("2aeb")(m))==h,b="trim"in String.prototype,v=function(e){var t=s(e,!1);if("string"==typeof t&&t.length>2){t=b?t.trim():p(t,3);var a,i,l,r=t.charCodeAt(0);if(43===r||45===r){if(a=t.charCodeAt(2),88===a||120===a)return NaN}else if(48===r){switch(t.charCodeAt(1)){case 66:case 98:i=2,l=49;break;case 79:case 111:i=8,l=55;break;default:return+t}for(var n,o=t.slice(2),c=0,d=o.length;c<d;c++)if(n=o.charCodeAt(c),n<48||n>l)return NaN;return parseInt(o,i)}}return+t};if(!u(" 0o1")||!u("0b1")||u("+0x1")){u=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof u&&(_?o(function(){m.valueOf.call(a)}):r(a)!=h)?n(new f(v(t)),a,u):v(t)};for(var w,y=a("9e1e")?c(f):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;y.length>x;x++)l(f,w=y[x])&&!l(u,w)&&g(u,w,d(f,w));u.prototype=m,m.constructor=u,a("2aba")(i,h,u)}},f499:function(e,t,a){e.exports=a("a21f")},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);