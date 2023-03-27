<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-row :gutter="20" class="mgb">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '10px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-cpu grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{device_cnt}}</div>
                                    <div>设备数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '10px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-warn grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{warning_cnt}}</div>
                                    <div>报警总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :data="warningdata" type="line" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :data="devicedata" type="bar" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('username'),
                get_device_url: 'admin/equip/all',
                get_data_url: 'admin/record/all',
                search_data_url: 'admin/record/some',
                device_cnt: 0,
                warning_cnt: 0,
                alldeviceData: [],
                allwarningData: [],
                warningdata: [{
                        name: '03/04',
                        value: 0
                    },
                    {
                        name: '03/05',
                        value: 0
                    },
                    {
                        name: '03/06',
                        value: 0
                    },
                    {
                        name: '03/07',
                        value: 0
                    },
                    {
                        name: '03/08',
                        value: 0
                    },
                    {
                        name: '03/09',
                        value: 0
                    },
                    {
                        name: '03/10',
                        value: 0
                    }
                ],
                devicedata: [{
                        name: '01',
                        value: 0
                    },
                    {
                        name: '02',
                        value: 0
                    },
                    {
                        name: '03',
                        value: 0
                    },
                    {
                        name: '04',
                        value: 0
                    },
                    {
                        name: '05',
                        value: 0
                    },
                    {
                        name: '06',
                        value: 0
                    },
                    {
                        name: '07',
                        value: 0
                    }],
                options: {
                    title: '每日报警概览（单位：次）',
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 20,
                    topPadding: 30
                },
                options2: {
                    title: '设备报警概览（单位：次）',
                    contentColor: '#EEEEEE',
                    fillColor: 'rgb(45, 140, 240)',
                    // fillColor: '#FC6FA1',
                    bottomPadding: 20,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart
        },
        created(){
            this.handleListener();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            getData() {
                this.alldeviceData.splice(0,this.alldeviceData.length);
                this.allwarningData.splice(0,this.allwarningData.length);
                this.$axios.get(this.get_device_url).then((res) => {
                    this.device_cnt = res.data.length;
                    for(let i = 0; i < this.device_cnt; i++){
                        this.alldeviceData.push(res.data[i]);
                    }
                });
                this.$axios.get(this.get_data_url).then((res) => {
                    this.warning_cnt = res.data.length;
                    for(let i = 0; i < this.warning_cnt; i++){
                        this.allwarningData.push(res.data[i]);
                    }
                    this.changeData();
                });
            },
            changeData(){
                this.warningdata = [{
                        name: '03/04',
                        value: 0
                    },
                    {
                        name: '03/05',
                        value: 0
                    },
                    {
                        name: '03/06',
                        value: 0
                    },
                    {
                        name: '03/07',
                        value: 0
                    },
                    {
                        name: '03/08',
                        value: 0
                    },
                    {
                        name: '03/09',
                        value: 0
                    },
                    {
                        name: '03/10',
                        value: 0
                    }
                ];
                this.devicedata = [{
                        name: '01',
                        value: 0
                    },
                    {
                        name: '02',
                        value: 0
                    },
                    {
                        name: '03',
                        value: 0
                    },
                    {
                        name: '04',
                        value: 0
                    },
                    {
                        name: '05',
                        value: 0
                    },
                    {
                        name: '06',
                        value: 0
                    },
                    {
                        name: '07',
                        value: 0
                    }];
                const now = new Date().getTime();
                for(let m = 0; m < this.warningdata.length; m++){
                    const date = new Date(now - (6 - m) * 86400000);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    this.warningdata[m].name = year + '/' + month + '/' + strDate;
                    for(let i = 0; i < this.warning_cnt; i++) {
                        if(this.warningdata[m].name === this.allwarningData[i].warning_time.substr(0,10)){
                            this.warningdata[m].value += 1;
                        }
                    }
                    this.warningdata[m].name = month + '/' + strDate;
                }

                var counts = {};
                
                for (let i = 0; i < this.allwarningData.length; i++) {
                    let device_id = this.allwarningData[i].device_id;
                    counts[device_id] = counts[device_id] ? counts[device_id] + 1 : 1;
                }
                let result = Object.keys(counts).map(function(name) {
                    return { name: name, value: counts[name] };
                });
                result.sort(function(a, b) {
                    return b.value - a.value;
                });
                this.devicedata = result.slice(0, 7);
            },
            handleListener(){
                this.getData();
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
                this.$refs.line.renderChart();
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 60px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-2 .grid-num {
        color: rgb(242, 94, 67);
    }

    .mgb {
        margin-bottom: 0px;
    }

    .schart {
        width: 100%;
        height: 250px;
    }

</style>
