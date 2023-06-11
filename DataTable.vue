<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"
            v-loading="exportflag"
            element-loading-text="正在导出为CSV文件，请耐心等待……"
            element-loading-spinner="el-icon-loading">
            <div class="handle-box">
                <el-form :inline="true" :model="select" class="demo-form-inline">
                    <el-col :span="24"> 
                        <el-form-item label="网元id">                       
                                <el-input maxlength="40px" v-model="select.id" placeholder="请输入网元id" class="handle-input-id"></el-input>
                        </el-form-item>
                    <!-- </el-col>
                    <el-col :span="8"> -->
                        <el-form-item label="定位信息">
                            <el-input  v-model="select.address" placeholder="请输入定位信息" class="handle-input-address"></el-input>
                        </el-form-item>
                    <!-- </el-col>
                    <el-col :span="4"> -->
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search()">搜索</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <!-- <el-form-item label="告警等级">
                        <el-select  v-model="select.grade" placeholder="请选择告警等级" class="handle-input-grade">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                            <el-option key="3" label="3" value="3"></el-option>
                            <el-option key="4" label="4" value="4"></el-option>
                        </el-select>
                        </el-form-item> -->
                    <!-- </el-col>
                    <el-col :span="24"> -->
                        <el-form-item label="检测时间">
                            <el-date-picker
                                v-model="select.time"
                                type="datetimerange"
                                value-format="yyyy/MM/dd HH:mm"
                                range-separator="至"
                                start-placeholder="请选择开始时间"
                                end-placeholder="请选择结束时间"
                                align="right">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24"> 
                        <el-form-item>
                            <template>
                                <!-- <el-button type="primary" icon="import" class="handle-import" @click="importData">导入数据</el-button> -->
                                <el-button type="primary" icon="read" class="handle-read" @click="exportData">导出数据</el-button>
                                <el-button type="primary" icon="delete" class="handle-del" @click="handleDeleteALL">批量删除</el-button>
                                <el-button type="primary" icon="add" class="handle-add" @click="handleAdd">添加数据</el-button>
                            </template>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <el-table :data="tableData" border style="width:100%"
                class="table" 
                ref="multipleTable" 
                total="100"
                page-size="8"
                max-height="350"
                @selection-change="handleSelectionChange">
                <!-- :default-sort = "{prop: 'num', order: 'ascending'}"> -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="序号" prop="num" type="integer" align="center" width="60">
                </el-table-column>
                <el-table-column prop="warning_id" label="日志编号" type="integer" align="center" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_id" label="网元id" type="integer" align="center" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_port" label="线路端口" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_address" label="定位信息" width="300" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_time" label="告警时间"  width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="warning_time_end" label="告警消除时间"  width="150" align="center" show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column prop="warning_code" label="告警代码"  width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_level" label="告警等级"  width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button> -->
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 分页管理 -->
            <div class="pagination">
                <el-pagination
                background
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15, 20, 30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="allData.length">
                </el-pagination>
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="28%">
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <!-- <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item> -->
                <el-form-item label="日志编号" prop="warning_id">
                    <el-input v-model.number="form.warning_id"></el-input>
                </el-form-item>
                <el-form-item label="网元id" prop="device_id">
                    <el-input v-model.number="form.device_id"></el-input>
                </el-form-item>
                <el-form-item label="线路端口" prop="device_port">
                    <el-input v-model="form.device_port"></el-input>
                </el-form-item>
                <el-form-item label="定位信息" prop="device_address">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>
                <el-form-item label="告警时间" prop="warning_time">
                    <el-date-picker
                        v-model="form.warning_time"
                        type="datetime"
                        value-format="yyyy/MM/dd HH:mm"
                        placeholder="选择日期时间">
                    </el-date-picker>
                    <!-- <el-input v-model="form.warning_time" placeholder="xx/xx/xx xx:xx"></el-input> -->
                </el-form-item>
                <!-- <el-form-item label="告警消除时间" prop="warning_time_end">
                    <el-date-picker
                        v-model="form.warning_time_end"
                        type="datetime"
                        value-format="yyyy/MM/dd HH:mm"
                        placeholder="选择日期时间">
                    </el-date-picker>
                    <el-input v-model="form.warning_time_end" placeholder="xx/xx/xx xx:xx"></el-input>
                </el-form-item> -->
                <el-form-item label="告警代码" prop="warning_code">
                    <el-input v-model.number="form.warning_code"></el-input>
                </el-form-item>
                <el-form-item label="告警等级" prop="warning_level">
                    <el-select  v-model="form.warning_level" placeholder="请选择告警等级">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                            <el-option key="3" label="3" value="3"></el-option>
                            <el-option key="4" label="4" value="4"></el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd('form')">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 搜索弹出框 -->
        <el-dialog title="搜索结果" :visible.sync="searchVisible" width="70%">
            <el-table :data="searchRes">
                <!-- <el-table-column label="页号" prop="page_idx" type="integer" align="center" width="60">
                </el-table-column>
                <el-table-column label="序号" prop="num" type="integer" width="150">
                </el-table-column> -->
                <el-table-column label="日志编号" prop="warning_id" type="integer" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_id" label="网元id" type="integer" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_port" label="线路端口" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_address" label="定位信息" width="300" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_time" label="告警时间" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="warning_time_end" label="告警消除时间" width="150" align="center" show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column prop="warning_code" label="告警代码" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_level" label="告警等级" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 批量删除提示框 -->
        <el-dialog title="提示" :visible.sync="delallVisible" width="300px" center>
            <div class="del-all-dialog-cnt">批量删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delallVisible = false">取 消</el-button>
                <el-button type="primary" @click="delAll">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    // import { ElUpload, ElButton } from 'element-ui';
    export default {
        name: 'DeviceList',
        // components: {
        //     ElUpload,
        //     ElButton
        // },
        data() {
            return {
                token: '',
                get_url: 'admin/record/all',
                search_url: 'admin/record/some',
                insert_url: 'admin/record/insert',
                delete_url: 'admin/record/delete',
                exportflag: false,
                fileList: [],
                allData: [],
                tableData: [],
                cur_page: 1,
                page_size: 10,
                multipleSelection: [],
                select: {
                    id: '',
                    time: '',
                    address: ''
                },
                del_list: [],
                is_search: false,
                editVisible: false,
                // importVisible: false,
                addVisible: false,
                delVisible: false,
                delallVisible: false,
                searchVisible: false,
                form: {
                    // num:'',
                    warning_id:'',
                    device_id:'',
                    device_port:'',
                    device_address:'',
                    warning_time: '',
                    // warning_time_end: '',
                    warning_code: '',
                    warning_level: ''
                },
                rules: {
                    warning_id:[
                        { required: true, message: '请输入日志编号', trigger: 'blur' },
                        { type: 'number', message: '日志编号必须为数字', trigger: 'blur' }
                    ],
                    device_id: [
                        { required: true, message: '请输入网元id', trigger: 'blur' },
                        { type: 'number', message: '网元id必须为数字', trigger: 'blur' }
                    ],
                    device_port: [
                        { required: true, message: '请输入线路端口', trigger: 'blur' }
                    ],
                    device_address: [
                        { required: true, message: '请输入定位信息', trigger: 'blur' }
                    ],
                    warning_time: [
                        { required: true, message: '请输入告警时间', trigger: 'blur' }
                    ],
                    warning_time_end: [
                        { required: true, message: '请输入告警消除时间', trigger: 'blur' }
                    ],
                    warning_code: [
                        { required: true, message: '请输入告警代码', trigger: 'blur' },
                        { type: 'number', message: '告警代码必须为数字', trigger: 'blur' }
                    ],
                    warning_level: [
                        { required: true, message: '请选择告警等级', trigger: 'blur' }
                        // { type: 'number', message: '告警代码必须为数字', trigger: 'blur' }
                    ]
                },
                idx: -1,
                row: [],
                searchRes: []
            }
        },
        created() {
            this.getData();
            this.getpageData();
        },
        computed: {
            filterdata() {
                var filteredData = this.allData.filter((d) => {
                    for (let i = 0; i < this.del_list.length; i++) {//在删除的列表中寻找表项
                        if (d.warning_id === this.del_list[i].warning_id) {
                            return false;
                        }
                    }
                    return true;
                });
                return filteredData;
            }
        },
        methods: {
            getData() {
                this.token = localStorage.getItem('token');
                this.$axios.get(this.get_url).then((res) => {
                    console.log("res.data",res.data);
                    console.log("res_len",res.data.length);
                    let length = res.data.length;
                    for(let i = 0; i < length; i++){
                        this.allData.push(res.data[i]);
                    }
                    console.log("alldata:",this.allData);
                    console.log("getData successfully");
                    this.getpageData();
                })
            },
            // importData(){
            //     this.importVisible = true;
            // },
            exportData(){
                this.exportflag = true;
                const data = this.allData;
                const csv = this.convertToCsv(data); // 转换为 CSV 格式
                const blob = new Blob([csv], { type: 'text/csv' }); // 创建一个 Blob 对象
                saveAs(blob, 'data.csv'); // 保存为 CSV 文件
                this.exportflag = false;
            },
            convertToCsv(data) {
                const header = Object.keys(data[0]).join(',') + '\n'; // 获取表头
                const rows = data.map(obj => Object.values(obj).join(',')).join('\n'); // 获取数据行
                return header + rows;
            },
            refreshData(){
                this.allData = [];
                this.getData();
                this.getpageData();
            },
            // 分页导航
            handleSizeChange(val){
                this.page_size = val;
                this.getpageData();
            },
            handleCurrentChange(val) {
                // console.log("val",val);
                // console.log("allData",this.allData);
                this.cur_page = val;
                this.getpageData();
                
            },
            getpageData(){
                // this.sortData();
                // this.tableData = [];
                this.tableData.splice(0,this.tableData.length);
                for(let i = 0;i < this.page_size; i++){
                    if(this.allData.length == 0) break
                    // console.log("idx",(this.cur_page - 1) * this.page_size + i + 1);
                    if(((this.cur_page - 1) * this.page_size + i) < this.allData.length){
                        // console.log("data",this.allData[(this.cur_page - 1) * this.page_size + i]);
                        this.tableData.push(this.allData[(this.cur_page - 1) * this.page_size + i]);
                    }
                    else break;
                }
                var newArr = this.tableData.map((item, index) => {
                    return {
                        ...item,
                        num: index + 1
                    };
                });
                this.tableData = newArr;
                // for(let i = 0;i < this.tableData.length; i++){
                //     this.tableData[i].num = (this.cur_page - 1) * this.page_size + i + 1;
                // }
                console.log("tabledata",this.tableData);
            },
            search() {
                this.searchRes.splice(0,this.searchRes.length);
                if(this.select.id && this.select.time && this.select.address){
                    console.log("time",this.select.time);
                    let url = this.search_url;
                    url += `?device_id=${Number(this.select.id)}`;
                    url += `&device_address=${this.select.address}`;
                    url += `&warning_time_begin=${this.select.time[0]}`;
                    url += `&warning_time_end=${this.select.time[1]}`;
                    // url += `&warning_level=${Number(this.select.grade)}`;
                    // console.log("url",url);
                    this.$axios.get(url).then((res) => {
                        console.log("res",res);
                        for(let i = 0; i < res.data.length; i++){
                            this.searchRes.push(res.data[i]);
                        }
                        console.log("searchRes",this.searchRes);
                    })
                    this.select={
                        id: '',
                        time: '',
                        address: ''
                    }
                    this.searchVisible = true;
                }
                else{
                    this.$message.error('输入不能为空');
                }
            },
            handleAdd(){
                this.form = {
                    // num:'',
                    warning_id:'',
                    device_id:'',
                    device_port:'',
                    device_address:'',
                    warning_time: '',
                    // warning_time_end: '',
                    warning_code: '',
                    warning_level: ''
                }
                this.addVisible = true;
            },
            handleDelete(row) {
                console.log("Row",row);
                this.row = row;
                this.idx = this.allData.findIndex((item) => item.warning_id === this.row.warning_id);
                console.log("row",this.idx);
                const item = this.allData[this.idx];
                console.log("item",item);
                this.form = {
                    // num: item.num,
                    warning_id: item.warning_id,
                    device_id: item.device_id,
                    device_port: item.device_port,
                    device_address: item.device_address,
                    warning_time: item.warning_time,
                    // warning_time_end: item.warning_time_end,
                    warning_code: item.warning_code,
                    warning_level: item.warning_level
                }
                this.delVisible = true;
            },
            handleDeleteALL() {
                // console.log(this.multipleSelection[0].device_id);
                if(this.multipleSelection.length!=0)this.delallVisible = true;
                else this.$message.error('尚未选中要删除行');
            },
            delAll() {//删除选定项
                var flag = 1;
                const length = this.multipleSelection.length;
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    var delete_id = Number(this.multipleSelection[i].warning_id);
                    console.log("delete_id",delete_id);
                    var url = this.delete_url;
                    url += `?warning_id=${delete_id}`
                    // console.log("url",url);
                    this.$axios.delete(url).then((res) => {
                            console.log("res",res);
                        }).catch(error=>{
                            console.log("error",error);
                            flag = 0;
                            alert("删除异常");
                        });
                }
                this.multipleSelection = [];
                if(flag){
                    this.allData = this.filterdata;//前端删除
                    this.del_list = []; // 清空删除列表
                    this.getpageData();
                    if(this.tableData.length == 0 && this.allData.length){
                        this.cur_page--;
                        this.getpageData();
                    }
                    this.$message.error('批量删除成功');
                }
                this.delallVisible = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            saveAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formdata = new FormData();//后端插入
                        console.log(this.form);
                        formdata.append("warning_id", Number(this.form.warning_id));
                        formdata.append("device_id", Number(this.form.device_id));
                        formdata.append("device_port", this.form.device_port);
                        formdata.append("device_address", this.form.device_address);
                        formdata.append("warning_time", this.form.warning_time);
                        // formdata.append("warning_time_end", this.form.warning_time_end);
                        formdata.append("warning_code", Number(this.form.warning_code));
                        formdata.append("warning_level", Number(this.form.warning_level));
                        this.$axios.post(this.insert_url,formdata).then((res) => {
                            console.log("res",res);
                            this.allData.push(this.form);//前端插入
                            this.getpageData();
                            this.addVisible = false;
                            this.$message.success(`添加成功`);
                        }).catch(error=>{
                                console.log("error",error);
                                alert("插入异常");
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.multipleSelection = [];
            },
            // 确定删除
            deleteRow(){
                console.log("form",this.row);
                this.del_list.push(this.form);
                var delete_id = Number(this.form.warning_id);
                console.log("delete_id",delete_id);
                var url = this.delete_url;
                url += `?warning_id=${delete_id}`
                console.log("url",url);
                this.$axios.delete(url).then((res) => {//后端删除
                        console.log("res",res);
                        var indexToDelete = this.allData.findIndex((item) => item.warning_id === delete_id);//前端删除
                        if (indexToDelete !== -1) {
                            this.allData.splice(indexToDelete, 1);
                        }
                        this.getpageData();
                        if(this.tableData.length == 0 && this.allData.length){
                            this.cur_page--;
                            this.getpageData();
                        }
                        this.delVisible = false;
                        this.$message.error(`删除成功`);
                    }).catch(error=>{
                            console.log("error",error);
                            alert("删除异常");
                        });
                    this.multipleSelection = [];
                    this.form = {
                    // num:'',
                    warning_id:'',
                    device_id:'',
                    device_port:'',
                    device_address:'',
                    warning_time: '',
                    // warning_time_end: '',
                    warning_code: '',
                    warning_level: ''
                }
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .del-all-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .import {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 200px;
        border: 1px dashed #ccc;
        border-radius: 5px;
        overflow: hidden;
        }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
