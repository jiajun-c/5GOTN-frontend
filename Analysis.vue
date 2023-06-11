<template>
    <div class="wrapper">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 告警模拟</el-breadcrumb-item>
                <el-breadcrumb-item>告警分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container"
            v-loading="trainingflag"
            element-loading-text="正在训练中，请耐心等待……"
            element-loading-spinner="el-icon-loading">
            <el-col :span="11">
                <el-button type="primary" icon="train" @click="importData()">导入数据</el-button>
            </el-col>
            <!-- <div class="content-title">输入训练数据</div>
            <el-upload
                class="upload-demo"
                drag
                :on-success="handleSuccess"
                :on-error="handleError"
                :before-upload="beforeUpload"
                :on-exceed="handleExceed"
                :file-list="fileList"
                action="http://localhost:28080/admin/train/input"
                multiple
                :limit="3"
                :headers="{'Authorization': 'Bearer ' + token}">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传CSV文件</div>
            </el-upload> -->
                
            <el-col :span="11">
                <el-button type="primary" icon="train" @click="handleTraining()">开始训练</el-button>
            </el-col>
            <el-col :span="11" style="margin-top: 20px;">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="warninglevel" type="bar" :options="options1"></schart>
                </el-card>
            </el-col>
            <el-col :span="11" style="margin-top: 20px;">
                <el-card shadow="hover">
                    <schart ref="pie" class="schart" canvasId="pie" :data="warninglevel" type="pie" :options="options2"></schart>
                </el-card>
            </el-col>
            <el-dialog class="content-title" title="输入训练数据" :visible.sync="importVisible" :close-on-click-modal="false" :show-close="true" :lock-scroll="false" :center="true">
                <div class="upload-container">
                    <el-upload
                        class="upload-demo"
                        drag
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :before-upload="beforeUpload"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        action="http://localhost:28080/admin/train/input"
                        multiple
                        :limit="3"
                        :headers="{'Authorization': 'Bearer ' + token}">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传CSV文件</div>
                    </el-upload>
                </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="traningVisible" width="40%" center>
                <div class="training-overlay">训练时间可能很长，是否开始训练？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="traningVisible = false">取 消</el-button>
                <el-button type="primary" @click="training">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        name: 'Analysis',
        components: {
            Schart
        },
        created(){
            this.token = localStorage.getItem('token');
            this.getData();
            this.handleListener();
        },
        activated(){
            if (!this.dataLoaded) {
                this.dataLoaded = true;
            }
            else this.getData();
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        data: function(){
            return {
                train_url: 'admin/train/start',
                get_data_url: 'admin/record/all',
                importVisible: false, 
                traningVisible: false, 
                trainingflag: false,
                message: '正在训练中，请耐心等待……',
                token: '',
                dataLoaded: false,
                allwarningData: [],
                warninglevel: [{
                        name: '提示',
                        value: 0
                    },
                    {
                        name: '次要',
                        value: 0
                    },
                    {
                        name: '主要',
                        value: 0
                    },
                    {
                        name: '紧急',
                        value: 0
                    }],
                options1: {
                    title: '告警等级分布',
                    contentColor: '#EEEEEE',
                    fillColor: 'rgb(45, 140, 240)',
                    // fillColor: '#FC6FA1',
                    bottomPadding: 20,
                    topPadding: 20
                },
                options2: {
                    title: '告警等级分布',
                    contentColor: '#EEEEEE',
                    fillColor: 'rgb(45, 140, 240)',
                    // fillColor: '#FC6FA1',
                    bottomPadding: 20,
                    topPadding: 20,
                    radius: 80,
                    labels: ['提示', '次要', '主要', '紧急'],
                    datasets: this.warninglevel
                },
                fileList: []
            }
        },
        methods:{
            getData() {
                this.allwarningData.splice(0,this.allwarningData.length);
                this.$axios.get(this.get_data_url).then((res) => {
                    this.warning_cnt = res.data.length;
                    for(let i = 0; i < this.warning_cnt; i++){
                        this.allwarningData.push(res.data[i]);
                    }
                    this.handleData();
                }).catch(error=>{
                            console.log("error",error);
                            alert("数据获取异常");
                        });
            },
            handleData(){
                this.warninglevel = [{
                        name: '提示',
                        value: 0
                    },
                    {
                        name: '次要',
                        value: 0
                    },
                    {
                        name: '主要',
                        value: 0
                    },
                    {
                        name: '紧急',
                        value: 0
                    }];
                for (let i = 0; i < this.allwarningData.length; i++) {
                    var level = this.allwarningData[i].warning_level;
                    if (level === 1) {
                        this.warninglevel[0].value++;
                    } else if (level === 2) {
                        this.warninglevel[1].value++;
                    } else if (level === 3) {
                        this.warninglevel[2].value++;
                    } else if (level === 4) {
                        this.warninglevel[3].value++;
                    }
                }
            },
            handleSuccess(response, file, fileList) {
            // 上传成功后的处理
                console.log("res",response);
                console.log("filelist",fileList);
                this.$message.success(`文件上传成功`);
            },
            handleError(error, file, fileList) {
            // 上传失败后的处理
                console.log("err",error);
                this.$message.error('文件上传失败');
            },
            beforeUpload(file) {
            // 文件上传前的处理
                const isCSV = file.type === 'text/csv';
                // const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isCSV) {
                    this.$message.error('只能上传csv文件');
                }
                // if (!isLt2M) {
                //     this.$message.error('上传文件不能超过 2MB');
                // }
                return isCSV;

            },
            handleExceed(files, fileList) {
            // 文件超出限制的处理
                this.$message.error('一次最多上传3个文件');
            },
            importData(){
                this.importVisible = true;
            },
            handleTraining(){
                this.traningVisible = true;
            },
            training(){
                this.traningVisible = false;
                this.trainingflag = true;
                console.log("train");
                var url = this.train_url;
                this.$axios.post(url).then((res) => {//开始训练
                        console.log("res",res);
                        this.trainingflag = false;
                        this.$message.success(`训练成功`);
                    }).catch(error=>{
                            console.log("error",error);
                            alert("训练异常");
                        });
            },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderCharts()
                }, 300);
            },
            renderCharts(){
                this.$refs.bar.renderChart();
                this.$refs.pie.renderChart();
            }
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .wrapper {
        height: 100%;
    }
    /* .schart{
        width: 100%;
        height: 100%;
    } */
    .container {
        position: relative;
        background-color: #ffffff;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .upload-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }    
    .training-overlay {
        font-size: 16px;
        text-align: center;
        /* position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(224, 218, 218, 0.5);
        display: flex;
        justify-content: center;
        align-items: center; */
    }

    .training-dialog {
        border-radius: 0;
        padding: 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .training-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }
</style>