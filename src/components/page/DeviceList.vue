<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 设备列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-form :inline="true" :model="select" class="demo-form-inline">
                    <el-col :span="11"> 
                        <el-form-item label="设备id">  
                            <el-input v-model="select.id" placeholder="请输入设备id" class="handle-input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search()">搜索</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24"> 
                        <el-form-item>
                            <template>
                                <el-button type="primary" icon="read" class="handle-read" @click="getData">导入设备</el-button>
                                <el-button type="primary" icon="delete" class="handle-del" @click="handleDeleteALL">批量删除</el-button>
                                <el-button type="primary" icon="add" class="handle-add" @click="handleAdd">添加设备</el-button>
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
                <el-table-column label="序号" prop="num" type="integer" align="center" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_id" label="设备id" align="center" type="integer" width="200" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_address" align="center" label="所属厂区" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
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

            <!-- 分页管理 -->
            <!-- <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" 
                    layout="prev, pager, next" 
                    :pager-count="10"
                    :total="this.page_num">
                </el-pagination>
            </div> -->
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <!-- <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item> -->
                <el-form-item label="设备id">
                    <el-input v-model="form.device_id" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="所属厂区">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <!-- <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item> -->
                <el-form-item label="设备id">
                    <el-input v-model="form.device_id" :disabled="true" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="所属厂区">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        
        <!-- 搜索弹出框 -->
        <el-dialog title="搜索结果" :visible.sync="searchVisible" width="50%">
            <el-table :data="searchRes">
                <!-- <el-table-column label="页号" prop="page_idx" type="integer" width="100">
                </el-table-column>
                <el-table-column label="序号" prop="num" type="integer" width="100">
                </el-table-column> -->
                <el-table-column prop="device_id" align="center" label="设备id" type="integer">
                </el-table-column>
                <el-table-column prop="device_address" align="center" label="所属厂区">
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
    export default {
        name: 'DeviceList',
        data() {
            return {
                get_url: 'http://core.azw.net.cn:28080/equip/all',
                search_url: 'http://core.azw.net.cn:28080/equip/one',
                update_url: 'http://core.azw.net.cn:28080/equip/update',
                insert_url: 'http://core.azw.net.cn:28080/equip/insert',
                delete_url: 'http://core.azw.net.cn:28080/equip/delete',
                allData: [],
                tableData: [],
                cur_page: 1,
                page_size: 10,
                multipleSelection: [],
                select: {
                    id: '',
                    address: ''
                },
                del_list: [],
                is_search: false,
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
                rules: {//还没搞明白怎么限制
                    device_id: [
                        { required: true, message: '请输入设备id', trigger: 'blur' },
                        { type: 'number', message: '设备id必须为数字', trigger: 'blur' }
                    ],
                    device_address: [
                        { required: true, message: '请输入所属厂区', trigger: 'blur' }
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
                },
                idx: -1,
                row: [],
                searchRes: []
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {//在删除的列表中寻找表项
                        if (d.device_id === this.del_list[i].device_id) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {//删除列表没找到需要的表项
                        if (d.address.indexOf(this.select.id) > -1 &&
                            (d.name.indexOf(this.select.address) > -1 ||
                                d.address.indexOf(this.select.address) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            getData() {
                console.log("tabledata:",this.allData);
                this.$axios.get(this.get_url).then((res) => {
                    console.log("res.data",res.data);
                    console.log("res_len",res.data.length);
                    let length = res.data.length;
                    for(let i = 0;i < length; i++){
                        this.form = {
                            num: i + 1,
                            device_id: res.data[i].id,
                            device_address: res.data[i].name
                        }
                        this.allData.push(this.form);
                    }
                    // this.sortData();
                    console.log("alldata:",this.allData);
                    console.log("getData successfully");
                    this.getpageData();
                })
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
                    })
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
                const length = this.multipleSelection.length;
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    this.allData = this.allData.filter((item) => item.device_id !== this.multipleSelection[i].device_id);
                    var delete_id = Number(this.multipleSelection[i].device_id);
                    console.log("delete_id",delete_id);
                    var url = this.delete_url;
                    url += `?id=${delete_id}`
                    console.log("url",url);
                    this.$axios.post(url).then((res) => {
                            console.log("res",res);
                        })
                }
                this.getpageData();
                if(this.tableData.length == 0){
                    this.cur_page--;
                    this.getpageData();
                }
                this.multipleSelection = [];
                this.$message.error('批量删除成功');
                this.delallVisible = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                if(this.form.device_id !=''
                    && this.form.device_address !=''){
                    this.$set(this.allData, this.idx, this.form);//前端修改
                    this.getpageData();

                    let formdata = new FormData();//后端修改
                    formdata.append("id", this.form.device_id);
                    formdata.append("name", this.form.device_address);
                    this.$axios.post(this.update_url,formdata).then((res) => {
                        console.log("res",res);
                    })
                    this.editVisible = false;
                    this.$message.success(`修改成功`);
                }
                this.form = {
                    num: '',
                    device_id: '',
                    device_address: ''
                };
            },
            saveAdd() {
                if(this.form.device_id !='' 
                    && this.form.device_address !=''){
                    this.form.num = this.allData.length + 1;
                    this.allData.push(this.form);//前端插入

                    let formdata = new FormData();//后端插入
                    formdata.append("id", this.form.device_id);
                    formdata.append("name", this.form.device_address);
                    this.$axios.post(this.insert_url,formdata).then((res) => {
                        console.log("res",res);
                    })
                    this.getpageData();
                    // console.log("forms",this.form);
                    this.addVisible = false;
                    this.$message.success(`添加成功`);
                }
                this.form = {
                    num: '',
                    device_id: '',
                    device_address: ''
                };
            },
            // 确定删除
            deleteRow(){
                this.allData = this.allData.filter((item) => item.device_id !== this.row.device_id);
                var delete_id = Number(this.form.device_id);
                console.log("delete_id",delete_id);
                var url = this.delete_url;
                url += `?id=${delete_id}`
                console.log("url",url);
                this.$axios.post(url).then((res) => {
                        console.log("res",res);
                        this.getpageData();
                        if(this.tableData.length == 0){
                            this.cur_page--;
                            this.getpageData();
                        }
                        this.delVisible = false;
                        this.$message.error(`删除成功`);
                    })
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .del-all-dialog-cnt{
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
