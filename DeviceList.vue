<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 网元列表</el-breadcrumb-item>
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
                            <el-input v-model="select.id" placeholder="请输入网元id" class="handle-input"></el-input>
                        </el-form-item>
                    <!-- </el-col> -->
                    <!-- <el-col :span="10"> -->
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search()">搜索</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24"> 
                        <el-form-item>
                            <template>
                                <!-- <el-button type="primary" icon="import" class="handle-import" @click="importData">导入网元</el-button> -->
                                <el-button type="primary" icon="read" class="handle-read" @click="exportData">导出网元</el-button>
                                <el-button type="primary" icon="delete" class="handle-del" @click="handleDeleteALL">批量删除</el-button>
                                <el-button type="primary" icon="add" class="handle-add" @click="handleAdd">添加网元</el-button>
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
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column label="序号" prop="num" type="integer" align="center" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_id" label="网元id" align="center" type="integer" width="200" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_address" align="center" label="定位信息" width="400" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
        <el-dialog title="添加" :visible.sync="addVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <!-- <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item> -->
                <el-form-item label="网元id" prop="device_id">
                    <el-input v-model.number="form.device_id"></el-input>
                </el-form-item>
                <el-form-item label="定位信息" prop="device_address">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd('form')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <!-- <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item> -->
                <el-form-item label="网元id" prop="device_id">
                    <el-input v-model="form.device_id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="定位信息" prop="device_address">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('form')">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 导入文件弹出框 -->
        <!-- <el-dialog title="导入网元" :visible.sync="importVisible" width="35%">
            <el-upload
                class="upload-demo"
                drag
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
                :file-list="fileList"
                action="http://core.azw.net.cn:28080/admin/train/input"
                multiple
                :limit="3"
                :headers="{'Authorization': 'Bearer ' + token}">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传JSON文件</div>
            </el-upload>
        </el-dialog> -->

        <!-- 搜索弹出框 -->
        <el-dialog title="搜索结果" :visible.sync="searchVisible" width="50%">
            <el-table :data="searchRes">
                <!-- <el-table-column label="页号" prop="page_idx" type="integer" width="100">
                </el-table-column>
                <el-table-column label="序号" prop="num" type="integer" width="100">
                </el-table-column> -->
                <el-table-column prop="device_id" align="center" label="网元id" type="integer">
                </el-table-column>
                <el-table-column prop="device_address" align="center" label="定位信息">
                </el-table-column>
            </el-table>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 批量删除提示框 -->
        <el-dialog title="提示" :visible.sync="delallVisible" width="300px" center>
            <div class="del-all-dialog">批量删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delallVisible = false">取 消</el-button>
                <el-button type="primary" @click="delAll">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { saveAs } from 'file-saver';
    export default {
        name: 'DeviceList',
        data() {
            return {
                get_url: 'admin/equip/all',
                search_url: 'admin/equip/one',
                update_url: 'admin/equip/update',
                insert_url: 'admin/equip/insert',
                delete_url: 'admin/equip/delete',
                exportflag: false,
                allData: [],
                tableData: [],
                cur_page: 1,
                page_size: 10,
                multipleSelection: [],
                select: {
                    id: ''
                },
                del_list: [],
                is_search: false,
                // importVisible: false,
                editVisible: false,
                addVisible: false,
                delVisible: false,
                delallVisible: false,
                searchVisible: false,
                form: {
                    num: '',
                    device_id: '',
                    device_address: ''
                },
                rules: {
                    device_id: [
                        { required: true, message: '请输入网元id', trigger: 'blur' },
                        { type: 'number', message: '网元id必须为数字', trigger: 'blur' }
                    ],
                    device_address: [
                        { required: true, message: '请输入定位信息', trigger: 'blur' }
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                },
                idx: -1,
                row: [],
                searchRes: [],
                // selectAllFlag: false
            }
        },
        created() {
            this.getData();
        },
        computed: {
            filterdata() {
                var filteredData = this.allData.filter((d) => {
                    for (let i = 0; i < this.del_list.length; i++) {//在删除的列表中寻找表项
                        if (d.device_id === this.del_list[i].device_id) {
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
                // console.log("tabledata:",this.allData);
                this.$axios.get(this.get_url).then((res) => {
                    console.log("res.data",res.data);
                    console.log("res_len",res.data.length);
                    let length = res.data.length;
                    for(let i = 0; i < length; i++){
                        this.form = {
                            // num: i + 1,
                            device_id: res.data[i].id,
                            device_address: res.data[i].name
                        }
                        this.allData.push(this.form);
                    }
                    // this.sortData();
                    console.log("alldata:",this.allData);
                    console.log("getData successfully");
                    this.getpageData();
                }).catch(error=>{
                            console.log("error",error);
                            alert("服务器异常");
                        });
            },
            // importData(){
            //     this.importVisible = true;
            // },
            exportData(){
                this.exportflag = true;
                const data = this.allData;
                const csv = this.convertToCsv(data); // 转换为 CSV 格式
                const blob = new Blob([csv], { type: 'text/csv' }); // 创建一个 Blob 对象
                saveAs(blob, 'device.csv'); // 保存为 CSV 文件
                this.exportflag = false;
            },
            convertToCsv(data) {
                const header = Object.keys(data[0]).join(',') + '\n'; // 获取表头
                const rows = data.map(obj => Object.values(obj).join(',')).join('\n'); // 获取数据行
                return header + rows;
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
            sortData(){
                for(let i = 0;i < this.allData.length; i++){
                    // console.log("alldataidx",i+1);
                    this.allData[i].num = i + 1;
                }
            },
            search() {
                console.log("select.id",this.select.id);
                var searchid = Number(this.select.id);
                console.log("select.id",searchid);
                this.searchRes.splice(0,this.searchRes.length); //清空原结果
                if(this.select.id){
                    var url = this.search_url;
                    url += `?id=${searchid}`
                    this.$axios.get(url).then((res) => {
                        console.log("res",res);
                        let tmp = {
                            device_id: res.data.id,
                            device_address: res.data.name
                        };
                        if(tmp.device_address) this.searchRes.push(tmp);
                        console.log("Res",this.searchRes);
                    }).catch(error=>{
                            console.log("error",error);
                            alert("服务器异常");
                        });
                    this.select.id = '';
                    this.searchVisible = true;
                }
                else{
                    this.$message.error('输入不能为空');
                }
            },
            handleAdd(){
                this.form = {
                    num: '',
                    device_id: '',
                    device_address: ''
                };
                this.addVisible = true;
            },
            handleEdit(row) {
                this.row = row;
                this.idx = this.allData.indexOf(this.row);
                // console.log("row",this.idx);
                const item = this.allData[this.idx];
                // console.log("item",item);
                this.form = {
                    num: item.num,
                    device_id: item.device_id,
                    device_address: item.device_address
                }
                // console.log("form",this.form);
                this.editVisible = true;
            },
            handleDelete(row) {
                this.row = row;
                this.idx = this.allData.indexOf(this.row);const item = this.allData[this.idx];
                // console.log("item",item);
                this.form = {
                    num: item.num,
                    device_id: item.device_id,
                    device_address: item.device_address
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
                    var delete_id = Number(this.multipleSelection[i].device_id);
                    // console.log("delete_id",delete_id);
                    var url = this.delete_url;
                    url += `?id=${delete_id}`
                    // console.log("url",url);
                    this.$axios.post(url).then((res) => {//后端删除
                            // this.allData = this.allData.filter((item) => item.device_id !== this.multipleSelection[i].device_id);//前端删除
                            console.log("res",res);
                        }).catch(error=>{
                            console.log("error",error);
                            flag = 0;
                            alert("删除异常");
                        });
                }
                // this.getpageData();
                // if(this.tableData.length == 0){
                //     this.cur_page--;
                //     this.getpageData();
                // }
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
                if(flag)this.$message.error('批量删除成功');
                this.delallVisible = false;
            },
            // handleSelectAll(val){
            //     if (this.selectAllFlag) {
            //         this.selectAllFlag = true;
            //         this.multipleSelection = [];
            //         return; // 如果已经执行过全选操作，直接返回
            //     }
            //     // if(this.multipleSelection.length !== 0) {
            //     //     console.log("clear");
            //     //     this.$refs.multipleTable.clearSelection();
            //     //     // this.$refs.multipleTable.toggleAllSelection();
            //     //     this.multipleSelection = [];
            //     //     this.selectAllFlag = false;
            //     // }
            //     else {
            //         console.log("all");
            //         // this.$refs.multipleTable.toggleAllSelection();
            //         this.multipleSelection = this.allData;
            //         this.selectAllFlag = true;
            //     }
            //     console.log("multipleSelectionAll",this.multipleSelection);
            // },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // this.selectAllFlag = false;
                console.log("multipleSelection",this.multipleSelection);
            },
            // 保存编辑
            saveEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$set(this.allData, this.idx, this.form);//前端修改

                        let formdata = new FormData();//后端修改
                        formdata.append("id", this.form.device_id);
                        formdata.append("name", this.form.device_address);
                        this.$axios.post(this.update_url,formdata).then((res) => {
                            console.log("res",res);
                            this.getpageData();
                            this.editVisible = false;
                            this.$message.success(`修改成功`);
                            this.form = {
                                num: '',
                                device_id: '',
                                device_address: ''
                            };
                        }).catch(error=>{
                                console.log("error",error);
                                alert("修改异常");
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.multipleSelection = [];
            },
            saveAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.allData.push(this.form);//前端插入

                        let formdata = new FormData();//后端插入
                        formdata.append("id", this.form.device_id);
                        formdata.append("name", this.form.device_address);
                        this.$axios.post(this.insert_url,formdata).then((res) => {
                            console.log("res",res);
                            this.getpageData();
                            // console.log("forms",this.form);
                            this.addVisible = false;
                            this.$message.success(`添加成功`);
                            this.form = {
                                num: '',
                                device_id: '',
                                device_address: ''
                            };
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
                var delete_id = Number(this.form.device_id);
                console.log("delete_id",delete_id);
                var url = this.delete_url;
                url += `?id=${delete_id}`
                console.log("url",url);
                this.$axios.post(url).then((res) => {//后端删除
                        console.log("res",res);
                        var indexToDelete = this.allData.findIndex((item) => item.device_id === delete_id);//前端删除
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
                    num: '',
                    device_id: '',
                    device_address: ''
                };
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
    .del-dialog{
        font-size: 16px;
        text-align: center
    }
    .del-all-dialog{
        font-size: 16px;
        text-align: center
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
