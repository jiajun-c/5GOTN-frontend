(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ac8f6ab"],{"11e9":function(e,t,i){var a=i("52a7"),l=i("4630"),s=i("6821"),r=i("6a99"),n=i("69a8"),o=i("c69a"),c=Object.getOwnPropertyDescriptor;t.f=i("9e1e")?c:function(e,t){if(e=s(e),t=r(t,!0),o)try{return c(e,t)}catch(i){}if(n(e,t))return l(!a.f.call(e,t),e[t])}},"52a7":function(e,t){t.f={}.propertyIsEnumerable},"5dbc":function(e,t,i){var a=i("d3f4"),l=i("8b97").set;e.exports=function(e,t,i){var s,r=t.constructor;return r!==i&&"function"==typeof r&&(s=r.prototype)!==i.prototype&&a(s)&&l&&l(e,s),e}},"7f7f":function(e,t,i){var a=i("86cc").f,l=Function.prototype,s=/^\s*function ([^ (]*)/,r="name";r in l||i("9e1e")&&a(l,r,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},"82df":function(e,t,i){},"8b97":function(e,t,i){var a=i("d3f4"),l=i("cb7c"),s=function(e,t){if(l(e),!a(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,a){try{a=i("9b43")(Function.call,i("11e9").f(Object.prototype,"__proto__").set,2),a(e,[]),t=!(e instanceof Array)}catch(l){t=!0}return function(e,i){return s(e,i),t?e.__proto__=i:a(e,i),e}}({},!1):void 0),check:s}},9093:function(e,t,i){var a=i("ce10"),l=i("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return a(e,l)}},a21f:function(e,t,i){var a=i("584a"),l=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return l.stringify.apply(l,arguments)}},a2b9:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-lx-cascades"}),e._v(" 设备列表")])],1)],1),i("div",{staticClass:"container"},[i("div",{staticClass:"handle-box"},[i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.select}},[i("el-col",{attrs:{span:24}},[i("el-form-item",{attrs:{label:"设备id"}},[i("el-input",{staticClass:"handle-input",attrs:{placeholder:"请输入设备id"},model:{value:e.select.id,callback:function(t){e.$set(e.select,"id",t)},expression:"select.id"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"search"},on:{click:function(t){e.search()}}},[e._v("搜索")])],1)],1),i("el-col",{attrs:{span:24}},[i("el-form-item",[[i("el-button",{staticClass:"handle-read",attrs:{type:"primary",icon:"read"},on:{click:e.storeData}},[e._v("导出设备")]),i("el-button",{staticClass:"handle-del",attrs:{type:"primary",icon:"delete"},on:{click:e.handleDeleteALL}},[e._v("批量删除")]),i("el-button",{staticClass:"handle-add",attrs:{type:"primary",icon:"add"},on:{click:e.handleAdd}},[e._v("添加设备")])]],2)],1)],1)],1),i("el-table",{ref:"multipleTable",staticClass:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",total:"100","page-size":"8","max-height":"350"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),i("el-table-column",{attrs:{label:"序号",prop:"num",type:"integer",align:"center",width:"100","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"device_id",label:"设备id",align:"center",type:"integer",width:"200","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"device_address",align:"center",label:"所属厂区","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(i){e.handleEdit(t.row)}}},[e._v("编辑")]),i("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(i){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{background:"",small:"","page-sizes":[5,10,15,20,30],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.allData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),i("el-dialog",{attrs:{title:"添加",visible:e.addVisible,width:"40%"},on:{"update:visible":function(t){e.addVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"设备id"}},[i("el-input",{attrs:{type:"integer"},model:{value:e.form.device_id,callback:function(t){e.$set(e.form,"device_id",t)},expression:"form.device_id"}})],1),i("el-form-item",{attrs:{label:"所属厂区"}},[i("el-input",{model:{value:e.form.device_address,callback:function(t){e.$set(e.form,"device_address",t)},expression:"form.device_address"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.saveAdd}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"40%"},on:{"update:visible":function(t){e.editVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"设备id"}},[i("el-input",{attrs:{disabled:!0,type:"integer"},model:{value:e.form.device_id,callback:function(t){e.$set(e.form,"device_id",t)},expression:"form.device_id"}})],1),i("el-form-item",{attrs:{label:"所属厂区"}},[i("el-input",{model:{value:e.form.device_address,callback:function(t){e.$set(e.form,"device_address",t)},expression:"form.device_address"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"搜索结果",visible:e.searchVisible,width:"50%"},on:{"update:visible":function(t){e.searchVisible=t}}},[i("el-table",{attrs:{data:e.searchRes}},[i("el-table-column",{attrs:{prop:"device_id",align:"center",label:"设备id",type:"integer"}}),i("el-table-column",{attrs:{prop:"device_address",align:"center",label:"所属厂区"}})],1)],1),i("el-dialog",{attrs:{title:"提示",visible:e.delVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delVisible=t}}},[i("div",{staticClass:"del-dialog-cnt"},[e._v("删除不可恢复，是否确定删除？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.deleteRow}},[e._v("确 定")])],1)]),i("el-dialog",{attrs:{title:"提示",visible:e.delallVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delallVisible=t}}},[i("div",{staticClass:"del-all-dialog-cnt"},[e._v("批量删除不可恢复，是否确定删除？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.delallVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.delAll}},[e._v("确 定")])],1)])],1)},l=[],s=(i("c5f6"),i("f499")),r=i.n(s),n=(i("7f7f"),i("cadf"),i("551c"),i("097d"),{name:"DeviceList",data:function(){return{get_url:"admin/equip/all",search_url:"admin/equip/one",update_url:"admin/equip/update",insert_url:"admin/equip/insert",delete_url:"admin/equip/delete",allData:[],tableData:[],cur_page:1,page_size:10,multipleSelection:[],select:{id:"",address:""},del_list:[],is_search:!1,editVisible:!1,addVisible:!1,delVisible:!1,delallVisible:!1,searchVisible:!1,form:{num:"",device_id:"",device_address:""},rules:{device_id:[{required:!0,message:"请输入设备id",trigger:"blur"},{type:"number",message:"设备id必须为数字",trigger:"blur"}],device_address:[{required:!0,message:"请输入所属厂区",trigger:"blur"}]},idx:-1,row:[],searchRes:[]}},created:function(){this.getData()},methods:{getData:function(){var e=this;this.$axios.get(this.get_url).then(function(t){console.log("res.data",t.data),console.log("res_len",t.data.length);for(var i=t.data.length,a=0;a<i;a++)e.form={device_id:t.data[a].id,device_address:t.data[a].name},e.allData.push(e.form);console.log("alldata:",e.allData),console.log("getData successfully"),e.getpageData()}).catch(function(e){console.log("error",e),alert("服务器异常")})},storeData:function(){var e=r()(this.allData),t=new Blob([e],{type:"application/json"});saveAs(t,"device.json")},handleSizeChange:function(e){this.page_size=e,this.getpageData()},handleCurrentChange:function(e){this.cur_page=e,this.getpageData()},getpageData:function(){this.tableData.splice(0,this.tableData.length);for(var e=0;e<this.page_size;e++){if(!((this.cur_page-1)*this.page_size+e<this.allData.length))break;this.tableData.push(this.allData[(this.cur_page-1)*this.page_size+e])}for(var t=0;t<this.tableData.length;t++)this.tableData[t].num=(this.cur_page-1)*this.page_size+t+1;console.log("tabledata",this.tableData)},sortData:function(){for(var e=0;e<this.allData.length;e++)this.allData[e].num=e+1},search:function(){var e=this;console.log("select.id",this.select.id);var t=Number(this.select.id);if(console.log("select.id",t),this.searchRes.splice(0,this.searchRes.length),this.select.id){var i=this.search_url;i+="?id=".concat(t),this.$axios.get(i).then(function(t){console.log("res",t);var i={device_id:t.data.id,device_address:t.data.name};i.device_address&&e.searchRes.push(i),console.log("Res",e.searchRes)}).catch(function(e){console.log("error",e),alert("服务器异常")}),this.select.id="",this.searchVisible=!0}else this.$message.error("输入不能为空")},handleAdd:function(){this.form={num:"",device_id:"",device_address:""},this.addVisible=!0},handleEdit:function(e){this.row=e,this.idx=this.allData.indexOf(this.row);var t=this.allData[this.idx];this.form={num:t.num,device_id:t.device_id,device_address:t.device_address},this.editVisible=!0},handleDelete:function(e){this.row=e,this.idx=this.allData.indexOf(this.row);var t=this.allData[this.idx];this.form={num:t.num,device_id:t.device_id,device_address:t.device_address},this.delVisible=!0},handleDeleteALL:function(){0!=this.multipleSelection.length?this.delallVisible=!0:this.$message.error("尚未选中要删除行")},delAll:function(){var e=this,t=this.multipleSelection.length;this.del_list=this.del_list.concat(this.multipleSelection);for(var i=function(t){l=Number(e.multipleSelection[t].device_id),s=e.delete_url,s+="?id=".concat(l),e.$axios.post(s).then(function(i){e.allData=e.allData.filter(function(i){return i.device_id!==e.multipleSelection[t].device_id}),console.log("res",i)}).catch(function(e){console.log("error",e),alert("删除异常")})},a=0;a<t;a++){var l,s;i(a)}this.getpageData(),0==this.tableData.length&&(this.cur_page--,this.getpageData()),this.multipleSelection=[],this.$message.error("批量删除成功"),this.delallVisible=!1},handleSelectionChange:function(e){this.multipleSelection=e},saveEdit:function(){var e=this;if(""!=this.form.device_id&&""!=this.form.device_address){this.$set(this.allData,this.idx,this.form);var t=new FormData;t.append("id",this.form.device_id),t.append("name",this.form.device_address),this.$axios.post(this.update_url,t).then(function(t){console.log("res",t),e.getpageData(),e.editVisible=!1,e.$message.success("修改成功")}).catch(function(e){console.log("error",e),alert("修改异常")})}this.multipleSelection=[],this.form={num:"",device_id:"",device_address:""}},saveAdd:function(){var e=this;if(""!=this.form.device_id&&""!=this.form.device_address){this.allData.push(this.form);var t=new FormData;t.append("id",this.form.device_id),t.append("name",this.form.device_address),this.$axios.post(this.insert_url,t).then(function(t){console.log("res",t),e.getpageData(),e.addVisible=!1,e.$message.success("添加成功")}).catch(function(e){console.log("error",e),alert("插入异常")})}this.multipleSelection=[],this.form={num:"",device_id:"",device_address:""}},deleteRow:function(){var e=this,t=Number(this.form.device_id);console.log("delete_id",t);var i=this.delete_url;i+="?id=".concat(t),console.log("url",i),this.$axios.post(i).then(function(t){e.allData=e.allData.filter(function(t){return t.device_id!==e.row.device_id}),console.log("res",t),e.getpageData(),0==e.tableData.length&&(e.cur_page--,e.getpageData()),e.delVisible=!1,e.$message.error("删除成功")}).catch(function(e){console.log("error",e),alert("删除异常")}),this.multipleSelection=[],this.form={num:"",device_id:"",device_address:""}}}}),o=n,c=(i("fe58"),i("2877")),d=Object(c["a"])(o,a,l,!1,null,"0478f0cc",null);d.options.__file="DeviceList.vue";t["default"]=d.exports},aa77:function(e,t,i){var a=i("5ca1"),l=i("be13"),s=i("79e5"),r=i("fdef"),n="["+r+"]",o="​",c=RegExp("^"+n+n+"*"),d=RegExp(n+n+"*$"),u=function(e,t,i){var l={},n=s(function(){return!!r[e]()||o[e]()!=o}),c=l[e]=n?t(f):r[e];i&&(l[i]=c),a(a.P+a.F*n,"String",l)},f=u.trim=function(e,t){return e=String(l(e)),1&t&&(e=e.replace(c,"")),2&t&&(e=e.replace(d,"")),e};e.exports=u},c5f6:function(e,t,i){"use strict";var a=i("7726"),l=i("69a8"),s=i("2d95"),r=i("5dbc"),n=i("6a99"),o=i("79e5"),c=i("9093").f,d=i("11e9").f,u=i("86cc").f,f=i("aa77").trim,h="Number",p=a[h],g=p,v=p.prototype,m=s(i("2aeb")(v))==h,b="trim"in String.prototype,_=function(e){var t=n(e,!1);if("string"==typeof t&&t.length>2){t=b?t.trim():f(t,3);var i,a,l,s=t.charCodeAt(0);if(43===s||45===s){if(i=t.charCodeAt(2),88===i||120===i)return NaN}else if(48===s){switch(t.charCodeAt(1)){case 66:case 98:a=2,l=49;break;case 79:case 111:a=8,l=55;break;default:return+t}for(var r,o=t.slice(2),c=0,d=o.length;c<d;c++)if(r=o.charCodeAt(c),r<48||r>l)return NaN;return parseInt(o,a)}}return+t};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(e){var t=arguments.length<1?0:e,i=this;return i instanceof p&&(m?o(function(){v.valueOf.call(i)}):s(i)!=h)?r(new g(_(t)),i,p):_(t)};for(var y,D=i("9e1e")?c(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;D.length>w;w++)l(g,y=D[w])&&!l(p,y)&&u(p,y,d(g,y));p.prototype=v,v.constructor=p,i("2aba")(a,h,p)}},f499:function(e,t,i){e.exports=i("a21f")},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},fe58:function(e,t,i){"use strict";var a=i("82df"),l=i.n(a);l.a}}]);