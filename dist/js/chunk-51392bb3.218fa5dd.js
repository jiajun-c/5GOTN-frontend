(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51392bb3"],{"63bd":function(e,t,i){"use strict";var a=i("e534"),l=i.n(a);l.a},a2b9:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-lx-cascades"}),e._v(" 设备列表")])],1)],1),i("div",{staticClass:"container"},[i("div",{staticClass:"handle-box"},[i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.select}},[i("el-col",{attrs:{span:11}},[i("el-form-item",{attrs:{label:"设备id"}},[i("el-input",{staticClass:"handle-input",attrs:{placeholder:"请输入设备id"},model:{value:e.select.id,callback:function(t){e.$set(e.select,"id",t)},expression:"select.id"}})],1)],1),i("el-col",{attrs:{span:10}},[i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"search"},on:{click:function(t){e.search()}}},[e._v("搜索")])],1)],1),i("el-col",{attrs:{span:24}},[i("el-form-item",[[i("el-button",{staticClass:"handle-read",attrs:{type:"primary",icon:"read"},on:{click:e.getData}},[e._v("导入设备")]),i("el-button",{staticClass:"handle-del",attrs:{type:"primary",icon:"delete"},on:{click:e.handleDeleteALL}},[e._v("批量删除")]),i("el-button",{staticClass:"handle-add",attrs:{type:"primary",icon:"add"},on:{click:e.handleAdd}},[e._v("添加设备")])]],2)],1)],1)],1),i("el-table",{ref:"multipleTable",staticClass:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",total:"100","page-size":"8","max-height":"350"},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),i("el-table-column",{attrs:{label:"序号",prop:"num",type:"integer",align:"center",width:"100","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"device_id",label:"设备id",align:"center",type:"integer",width:"200","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"device_address",align:"center",label:"所属厂区","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(i){e.handleEdit(t.row)}}},[e._v("编辑")]),i("el-button",{staticClass:"red",attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(i){e.handleDelete(t.row)}}},[e._v("删除")])]}}])})],1),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{background:"",small:"","page-sizes":[5,10,15,20,30],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.allData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),i("el-dialog",{attrs:{title:"添加",visible:e.addVisible,width:"40%"},on:{"update:visible":function(t){e.addVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"设备id"}},[i("el-input",{attrs:{type:"integer"},model:{value:e.form.device_id,callback:function(t){e.$set(e.form,"device_id",t)},expression:"form.device_id"}})],1),i("el-form-item",{attrs:{label:"所属厂区"}},[i("el-input",{model:{value:e.form.device_address,callback:function(t){e.$set(e.form,"device_address",t)},expression:"form.device_address"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.addVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.saveAdd}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"40%"},on:{"update:visible":function(t){e.editVisible=t}}},[i("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"设备id"}},[i("el-input",{attrs:{disabled:!0,type:"integer"},model:{value:e.form.device_id,callback:function(t){e.$set(e.form,"device_id",t)},expression:"form.device_id"}})],1),i("el-form-item",{attrs:{label:"所属厂区"}},[i("el-input",{model:{value:e.form.device_address,callback:function(t){e.$set(e.form,"device_address",t)},expression:"form.device_address"}})],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.saveEdit}},[e._v("确 定")])],1)],1),i("el-dialog",{attrs:{title:"搜索结果",visible:e.searchVisible,width:"50%"},on:{"update:visible":function(t){e.searchVisible=t}}},[i("el-table",{attrs:{data:e.searchRes}},[i("el-table-column",{attrs:{prop:"device_id",align:"center",label:"设备id",type:"integer"}}),i("el-table-column",{attrs:{prop:"device_address",align:"center",label:"所属厂区"}})],1)],1),i("el-dialog",{attrs:{title:"提示",visible:e.delVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delVisible=t}}},[i("div",{staticClass:"del-dialog-cnt"},[e._v("删除不可恢复，是否确定删除？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.delVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.deleteRow}},[e._v("确 定")])],1)]),i("el-dialog",{attrs:{title:"提示",visible:e.delallVisible,width:"300px",center:""},on:{"update:visible":function(t){e.delallVisible=t}}},[i("div",{staticClass:"del-all-dialog-cnt"},[e._v("批量删除不可恢复，是否确定删除？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.delallVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.delAll}},[e._v("确 定")])],1)])],1)},l=[],s=(i("c5f6"),i("7f7f"),i("cadf"),i("551c"),i("097d"),{name:"DeviceList",data:function(){return{get_url:"http://core.azw.net.cn:28080/equip/all",search_url:"http://core.azw.net.cn:28080/equip/one",update_url:"http://core.azw.net.cn:28080/equip/update",insert_url:"http://core.azw.net.cn:28080/equip/insert",delete_url:"http://core.azw.net.cn:28080/equip/delete",allData:[],tableData:[],cur_page:1,page_size:10,multipleSelection:[],select:{id:"",address:""},del_list:[],is_search:!1,editVisible:!1,addVisible:!1,delVisible:!1,delallVisible:!1,searchVisible:!1,form:{num:"",device_id:"",device_address:""},rules:{device_id:[{required:!0,message:"请输入设备id",trigger:"blur"},{type:"number",message:"设备id必须为数字",trigger:"blur"}],device_address:[{required:!0,message:"请输入所属厂区",trigger:"blur"}]},idx:-1,row:[],searchRes:[]}},created:function(){this.getData()},computed:{data:function(){var e=this;return this.tableData.filter(function(t){for(var i=!1,a=0;a<e.del_list.length;a++)if(t.device_id===e.del_list[a].device_id){i=!0;break}if(!i&&t.address.indexOf(e.select.id)>-1&&(t.name.indexOf(e.select.address)>-1||t.address.indexOf(e.select.address)>-1))return t})}},methods:{getData:function(){var e=this;console.log("tabledata:",this.allData),this.$axios.get(this.get_url).then(function(t){console.log("res.data",t.data),console.log("res_len",t.data.length);for(var i=t.data.length,a=0;a<i;a++)e.form={num:a+1,device_id:t.data[a].id,device_address:t.data[a].name},e.allData.push(e.form);console.log("alldata:",e.allData),console.log("getData successfully"),e.getpageData()})},handleSizeChange:function(e){this.page_size=e,this.getpageData()},handleCurrentChange:function(e){this.cur_page=e,this.getpageData()},getpageData:function(){this.tableData.splice(0,this.tableData.length);for(var e=0;e<this.page_size;e++){if(!((this.cur_page-1)*this.page_size+e<this.allData.length))break;this.tableData.push(this.allData[(this.cur_page-1)*this.page_size+e])}for(var t=0;t<this.tableData.length;t++)this.tableData[t].num=(this.cur_page-1)*this.page_size+t+1;console.log("tabledata",this.tableData)},sortData:function(){for(var e=0;e<this.allData.length;e++)this.allData[e].num=e+1},search:function(){var e=this;console.log("select.id",this.select.id);var t=Number(this.select.id);if(console.log("select.id",t),this.searchRes.splice(0,this.searchRes.length),this.select.id){var i=this.search_url;i+="?id=".concat(t),this.$axios.get(i).then(function(t){console.log("res",t);var i={device_id:t.data.id,device_address:t.data.name};i.device_address&&e.searchRes.push(i),console.log("Res",e.searchRes)}),this.select.id="",this.searchVisible=!0}else this.$message.error("输入不能为空")},handleAdd:function(){this.form={num:"",device_id:"",device_address:""},this.addVisible=!0},handleEdit:function(e){this.row=e,this.idx=this.allData.indexOf(this.row);var t=this.allData[this.idx];this.form={num:t.num,device_id:t.device_id,device_address:t.device_address},this.editVisible=!0},handleDelete:function(e){this.row=e,this.idx=this.allData.indexOf(this.row);var t=this.allData[this.idx];this.form={num:t.num,device_id:t.device_id,device_address:t.device_address},this.delVisible=!0},handleDeleteALL:function(){0!=this.multipleSelection.length?this.delallVisible=!0:this.$message.error("尚未选中要删除行")},delAll:function(){var e=this,t=this.multipleSelection.length;this.del_list=this.del_list.concat(this.multipleSelection);for(var i=function(t){e.allData=e.allData.filter(function(i){return i.device_id!==e.multipleSelection[t].device_id}),l=Number(e.multipleSelection[t].device_id),console.log("delete_id",l),s=e.delete_url,s+="?id=".concat(l),console.log("url",s),e.$axios.post(s).then(function(e){console.log("res",e)})},a=0;a<t;a++){var l,s;i(a)}this.getpageData(),0==this.tableData.length&&(this.cur_page--,this.getpageData()),this.multipleSelection=[],this.$message.error("批量删除成功"),this.delallVisible=!1},handleSelectionChange:function(e){this.multipleSelection=e},saveEdit:function(){if(""!=this.form.device_id&&""!=this.form.device_address){this.$set(this.allData,this.idx,this.form),this.getpageData();var e=new FormData;e.append("id",this.form.device_id),e.append("name",this.form.device_address),this.$axios.post(this.update_url,e).then(function(e){console.log("res",e)}),this.editVisible=!1,this.$message.success("修改成功")}this.form={num:"",device_id:"",device_address:""}},saveAdd:function(){if(""!=this.form.device_id&&""!=this.form.device_address){this.form.num=this.allData.length+1,this.allData.push(this.form);var e=new FormData;e.append("id",this.form.device_id),e.append("name",this.form.device_address),this.$axios.post(this.insert_url,e).then(function(e){console.log("res",e)}),this.getpageData(),this.addVisible=!1,this.$message.success("添加成功")}this.form={num:"",device_id:"",device_address:""}},deleteRow:function(){var e=this;this.allData=this.allData.filter(function(t){return t.device_id!==e.row.device_id});var t=Number(this.form.device_id);console.log("delete_id",t);var i=this.delete_url;i+="?id=".concat(t),console.log("url",i),this.$axios.post(i).then(function(t){console.log("res",t),e.getpageData(),0==e.tableData.length&&(e.cur_page--,e.getpageData()),e.delVisible=!1,e.$message.error("删除成功")}),this.form={num:"",device_id:"",device_address:""}}}}),d=s,o=(i("63bd"),i("2877")),r=Object(o["a"])(d,a,l,!1,null,"3ea08b36",null);r.options.__file="DeviceList.vue";t["default"]=r.exports},e534:function(e,t,i){}}]);