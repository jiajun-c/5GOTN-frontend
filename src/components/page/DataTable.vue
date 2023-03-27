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
                    <el-col :span="24"> 
                        <el-form-item label="设备id">                       
                                <el-input maxlength="40px" v-model="select.id" placeholder="请输入设备id" class="handle-input-id"></el-input>
                        </el-form-item>
                    <!-- </el-col>
                    <el-col :span="8"> -->
                        <el-form-item label="所属厂区">
                            <el-input  v-model="select.address" placeholder="请输入所属厂区" class="handle-input-address"></el-input>
                        </el-form-item>
                    <!-- </el-col>
                    <el-col :span="4"> -->
                        <el-form-item>
                            <el-button type="primary" icon="search" @click="search()">搜索</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="告警等级">
                        <el-select  v-model="select.grade" placeholder="请选择告警等级" class="handle-input-grade">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                            <el-option key="3" label="3" value="3"></el-option>
                            <el-option key="4" label="4" value="4"></el-option>
                        </el-select>
                        </el-form-item>
                    <!-- </el-col>
                    <el-col :span="24"> -->
                        <el-form-item label="检测时间">
                            <el-date-picker
                                v-model="select.time"
                                type="datetimerange"
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
                                <el-button type="primary" icon="read" class="handle-read" @click="storeData">导出数据</el-button>
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
                <el-table-column prop="warning_id" label="告警编号" type="integer" align="center" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_id" label="设备id" type="integer" align="center" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_port" label="设备端口" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_address" label="所属厂区" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_time" label="告警时间"  width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_code" label="告警代码"  width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_grade" label="告警等级"  width="100" align="center" show-overflow-tooltip>
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
        <el-dialog title="添加" :visible.sync="addVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <!-- <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item> -->
                <el-form-item label="告警编号">
                    <el-input v-model="form.warning_id" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="设备id">
                    <el-input v-model="form.device_id" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="设备端口">
                    <el-input v-model="form.device_port" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="所属厂区">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>
                <el-form-item label="告警时间">
                    <el-input v-model="form.warning_time" placeholder="xx/xx/xx xx:xx" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="告警代码">
                    <el-input v-model="form.warning_code" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="告警等级">
                    <el-select  v-model="form.warning_grade" placeholder="请选择告警等级">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                            <el-option key="3" label="3" value="3"></el-option>
                            <el-option key="4" label="4" value="4"></el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="序号">
                    <el-input v-model="form.num" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="告警编号">
                    <el-input v-model="form.warning_id" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="设备id">
                    <el-input v-model="form.device_id" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="设备端口">
                    <el-input v-model="form.device_port" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="所属厂区">
                    <el-input v-model="form.device_address"></el-input>
                </el-form-item>
                <el-form-item label="告警时间">
                    <el-input v-model="form.warning_time" placeholder="xx/xx/xx xx:xx" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="告警代码">
                    <el-input v-model="form.warning_code" type="integer"></el-input>
                </el-form-item>
                <el-form-item label="告警等级">
                    <el-select  v-model="form.warning_grade" placeholder="请选择告警等级">
                            <el-option key="1" label="1" value="1"></el-option>
                            <el-option key="2" label="2" value="2"></el-option>
                            <el-option key="3" label="3" value="3"></el-option>
                            <el-option key="4" label="4" value="4"></el-option>
                        </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
        
        <!-- 搜索弹出框 -->
        <el-dialog title="搜索结果" :visible.sync="searchVisible" width="60%">
            <el-table :data="searchRes">
                <!-- <el-table-column label="页号" prop="page_idx" type="integer" align="center" width="60">
                </el-table-column>
                <el-table-column label="序号" prop="num" type="integer" width="150">
                </el-table-column> -->
                <el-table-column label="告警编号" prop="warning_id" type="integer" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_id" label="设备id" type="integer" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_port" label="设备端口" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="device_address" label="所属厂区" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_time" label="告警时间" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_code" label="告警代码" width="150" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="warning_grade" label="告警等级" type="integer" width="150" align="center" show-overflow-tooltip>
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
                get_url: 'admin/record/all',
                search_url: 'admin/record/some',
                insert_url: 'admin/record/insert',
                delete_url: 'admin/record/delete',
                allData: [
                ],
                tableData: [
                ],
                cur_page: 1,
                page_size: 10,
                multipleSelection: [],
                select: {
                    id: '',
                    time: '',
                    address: '',
                    grade: ''
                },
                del_list: [],
                is_search: false,
                editVisible: false,
                addVisible: false,
                delVisible: false,
                delallVisible: false,
                searchVisible: false,
                form: {
                    num:'',
                    warning_id:'',
                    device_id:'',
                    device_port:'',
                    device_address:'',
                    warning_time: '',
                    warning_code: '',
                    warning_grade: ''
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
            // console.log("page",this.cur_page);
            // console.log("pagesize",this.page_size);
            this.getData();
            this.getpageData();
            // console.log("tableData",this.tableData);
        },
        // computed: {
        //     data() {
        //         return this.tableData.filter((d) => {
        //             let is_del = false;
        //             for (let i = 0; i < this.del_list.length; i++) {//在删除的列表中寻找表项
        //                 if (d.device_id === this.del_list[i].device_id) {
        //                     is_del = true;
        //                     break;
        //                 }
        //             }
        //             if (!is_del) {//删除列表没找到需要的表项
        //                 if (d.address.indexOf(this.select.id) > -1 &&
        //                     (d.name.indexOf(this.select_address) > -1 ||
        //                         d.address.indexOf(this.select_address) > -1)
        //                 ) {
        //                     return d;
        //                 }
        //             }
        //         })
        //     }
        // },
        methods: {
            getData() {
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
            storeData(){
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
            sortData(){
                for(let i = 0;i < this.allData.length; i++){
                    // console.log("alldataidx",i+1);
                    this.allData[i].num = i + 1;
                }
            },
            search() {
                this.searchRes.splice(0,this.searchRes.length);
                if(this.select.id && this.select.time && this.select.address && this.select.grade){
                    var year = this.select.time[0].getFullYear();
                    var month = this.select.time[0].getMonth() + 1;
                    var strDate = this.select.time[0].getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var currentdate = year + '/' + month + '/' + strDate;
                    
                    let begin = currentdate
                                + '%20' 
                                + this.select.time[0].toLocaleTimeString();
                    begin = begin.substring(0, begin.length - 3);

                    year = this.select.time[1].getFullYear();
                    month = this.select.time[1].getMonth() + 1;
                    strDate = this.select.time[1].getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    currentdate = year + '/' + month + '/' + strDate;

                    let end = currentdate
                                + '%20' 
                                + this.select.time[1].toLocaleTimeString();
                    end = end.substring(0, end.length - 3);
                    // console.log("begin",begin);
                    // console.log("end",end);
                    let url = this.search_url;
                    url += `?device_id=${Number(this.select.id)}`;
                    url += `&device_address=${this.select.address}`;
                    url += `&warning_time_begin=${begin}`;
                    url += `&warning_time_end=${end}`;
                    url += `&warning_grade=${Number(this.select.grade)}`;
                    // console.log("url",url);
                    this.$axios.get(url).then((res) => {
                        console.log("res",res);
                        for(let i = 0; i < res.data.length; i++){
                            res.data[i].warning_time = res.data[i].warning_time.substring(0, end.length - 2);
                            this.searchRes.push(res.data[i]);
                        }
                        console.log("searchRes",this.searchRes);
                    })
                    this.select={
                        id: '',
                        time: '',
                        address: '',
                        grade: ''
                    }
                    this.searchVisible = true;
                }
                else{
                    this.$message.error('输入不能为空');
                }
            },
            handleAdd(){
                this.form = {
                    num:'',
                    warning_id:'',
                    device_id:'',
                    device_port:'',
                    device_address:'',
                    warning_time: '',
                    warning_code: '',
                    warning_grade: ''
                }
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
                    warning_id: item.warning_id,
                    device_id: item.device_id,
                    device_port: item.device_port,
                    device_address: item.device_address,
                    warning_time: item.warning_time,
                    warning_code: item.warning_code,
                    warning_grade: item.warning_grade
                }
                // console.log("form",this.form);
                this.editVisible = true;
            },
            handleDelete(row) {
                this.row = row;
                this.idx = this.allData.indexOf(this.row);
                // console.log("row",this.idx);
                const item = this.allData[this.idx];
                // console.log("item",item);
                this.form = {
                    num: item.num,
                    warning_id: item.warning_id,
                    device_id: item.device_id,
                    device_port: item.device_port,
                    device_address: item.device_address,
                    warning_time: item.warning_time,
                    warning_code: item.warning_code,
                    warning_grade: item.warning_grade
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
                    var delete_id = Number(this.multipleSelection[i].warning_id);
                    console.log("delete_id",delete_id);
                    var url = this.delete_url;
                    url += `?warning_id=${delete_id}`
                    // console.log("url",url);
                    this.$axios.delete(url).then((res) => {
                            this.allData = this.allData.filter((item) => item.warning_id !== this.multipleSelection[i].warning_id);
                            console.log("res",res);
                        }).catch(error=>{
                            console.log("error",error);
                            alert("删除异常");
                        });
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
            // saveEdit() {
            //     if(this.form.warning_id !=''
            //         && this.form.device_id !=''
            //         && this.form.device_port !=''
            //         && this.form.device_address !=''
            //         && this.form.warning_time !=''
            //         && this.form.warning_code !=''
            //         && this.form.warning_grade !=''){

            //         this.$set(this.allData, this.idx, this.form);//前端修改
            //         let formdata = new FormData();//后端插入
            //         formdata.append("warning_id", Number(this.form.warning_id));
            //         formdata.append("device_id", Number(this.form.device_id));
            //         formdata.append("device_port", this.form.device_port);
            //         formdata.append("device_address", this.form.device_address);
            //         formdata.append("warning_time", this.form.warning_time);
            //         formdata.append("warning_code", Number(this.form.warning_code));
            //         formdata.append("warning_grade", Number(this.form.warning_grade));
            //         this.$axios.post(this.insert_url,formdata).then((res) => {
            //             console.log("res",res);
            //         })
            //         this.getpageData();
            //         // console.log("forms",this.form);
            //         this.editVisible = false;
            //         this.$message.success(`修改成功`);
            //     }
            // },
            saveAdd() {
                if(this.form.warning_id !=''
                    && this.form.device_id !=''
                    && this.form.device_port !=''
                    && this.form.device_address !=''
                    && this.form.warning_time !=''
                    && this.form.warning_code !=''
                    && this.form.warning_grade !=''){   
                    // this.form.num = this.allData.length + 1;
                    let formdata = new FormData();//后端插入
                    formdata.append("warning_id", Number(this.form.warning_id));
                    formdata.append("device_id", Number(this.form.device_id));
                    formdata.append("device_port", this.form.device_port);
                    formdata.append("device_address", this.form.device_address);
                    formdata.append("warning_time", this.form.warning_time);
                    formdata.append("warning_code", Number(this.form.warning_code));
                    formdata.append("warning_grade", Number(this.form.warning_grade));
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
                    this.multipleSelection = [];
                }
            },
            // 确定删除
            deleteRow(){
                console.log("form",this.row);
                var delete_id = Number(this.form.warning_id);
                console.log("delete_id",delete_id);
                var url = this.delete_url;
                url += `?warning_id=${delete_id}`
                console.log("url",url);
                this.$axios.delete(url).then((res) => {//后端删除
                        console.log("res",res);
                        this.allData = this.allData.filter((item) => item.warning_id !== this.row.warning_id);//前端删除
                        this.getpageData();
                        if(this.tableData.length == 0){
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
                    num:'',
                    warning_id:'',
                    device_id:'',
                    device_port:'',
                    device_address:'',
                    warning_time: '',
                    warning_code: '',
                    warning_grade: ''
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
