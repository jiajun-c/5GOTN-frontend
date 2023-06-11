<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 告警模拟</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"
            v-loading="predictflag"
            element-loading-text="正在模拟中，请耐心等待……"
            element-loading-spinner="el-icon-loading">
            <div class="handle-box">
                <el-form :inline="true" class="demo-form-inline">
                    <el-col :span="24"> 
                        <el-form-item label="定位信息">
                            <el-input  v-model="predict_address" placeholder="请输入定位信息" class="handle-input-address"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="predict" @click="predict()">告警模拟</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </div>
            <el-table :data="tableData" border style="width:100%"
                class="table" 
                ref="multipleTable" 
                total="100"
                page-size="8"
                max-height="350">
                <!-- :default-sort = "{prop: 'num', order: 'ascending'}"> -->
                <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                <el-table-column label="序号" prop="num" type="integer" align="center" width="60">
                </el-table-column>
                <!-- <el-table-column prop="warning_id" label="日志编号" type="integer" align="center" width="150" show-overflow-tooltip>
                </el-table-column> -->
                <!-- <el-table-column prop="device_id" label="网元id" type="integer" align="center" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_port" label="线路端口" width="175" align="center" show-overflow-tooltip>
                </el-table-column> -->
                <el-table-column prop="device_address" label="预测定位信息"  align="center" show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column prop="warning_time" label="告警时间"  width="150" align="center" show-overflow-tooltip>
                </el-table-column> -->
                <!-- <el-table-column prop="warning_time_end" label="告警消除时间"  width="150" align="center" show-overflow-tooltip>
                </el-table-column> -->
                <!-- <el-table-column prop="warning_code" label="告警代码"  width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_grade" label="告警等级"  width="150" align="center" show-overflow-tooltip>
                </el-table-column> -->
                <!-- <el-table-column fixed="right" label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
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
                predict_url: 'admin/train/alert',
                fileList: [],
                allData: [],
                tableData: [],
                cur_page: 1,
                page_size: 10,
                multipleSelection: [],
                predict_address: '',
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
                    warning_grade: [
                        { required: true, message: '请选择告警等级', trigger: 'blur' }
                        // { type: 'number', message: '告警代码必须为数字', trigger: 'blur' }
                    ]
                },
                idx: -1,
                row: [],
                searchRes: [],
                predictflag: false
            }
        },
        created() {
            // this.getData();
            // this.getpageData();
        },
        methods: {
            getData() {
                this.token = localStorage.getItem('token');
                this.$axios.get(this.get_url).then((res) => {
                    console.log("res.data",res.data);
                    console.log("res_len",res.data.length);
                    let length = res.data.length;
                    for(let i = 0; i < length; i++){
                        // res.data[i].num = i + 1;
                        this.allData.push(res.data[i]);
                    }
                    console.log("alldata:",this.allData);
                    console.log("getData successfully");
                    this.getpageData();
                })
            },
            exportData(){
                const data = JSON.stringify(this.allData); // 将数据转为 JSON 格式
                const blob = new Blob([data], { type: 'application/json' }); // 创建一个 Blob 对象
                saveAs(blob, 'data.json'); // 使用 file-saver 库将 Blob 对象保存为文件
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
                this.tableData.splice(0,this.tableData.length);
                for(let i = 0;i < this.page_size; i++){
                    // console.log("idx",(this.cur_page - 1) * this.page_size + i + 1);
                    if(((this.cur_page - 1) * this.page_size + i) < this.allData.length){
                        // console.log("data",this.allData[(this.cur_page - 1) * this.page_size + i]);
                        this.tableData.push(this.allData[(this.cur_page - 1) * this.page_size + i]);
                    }
                    else break;
                }
                for(let i = 0;i < this.tableData.length; i++){
                    this.tableData[i].num = (this.cur_page - 1) * this.page_size + i + 1;
                }
            },
            // handleSelectionChange(val) {
            //     this.multipleSelection = val;
            // },
            predict() {
                if(this.predict_address){
                    this.predictflag = true;
                    this.allData = [];
                    let url = this.predict_url;
                    url += `?&locate=${this.predict_address}`;
                    // console.log("url",url);
                    this.$axios.post(url).then((res) => {
                        console.log("res",res);
                        for(let i = 0; i < res.data.length; i++){
                            this.allData.push(res.data[i]);
                        }
                        console.log("alldata:",this.allData);
                        console.log("predict successfully");
                        this.getpageData();
                        this.$message.success(`模拟成功`);
                        this.predictflag = false;
                    }).catch(error=>{
                            console.log("error",error);
                            alert("模拟异常");
                        });
                }
                else{
                    this.$message.error('输入不能为空');
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
    .container {
        position: relative;
        background-color: #ffffff;
        /* width: 100%; */
        height: 100%;
        overflow: auto;
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
