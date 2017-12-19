<!-- 水位记录查询 -->
<style lang="less">
@import url("../../../static/less/color.less");
.aa{
    margin-left: 5px;
    .ivu-collapse-content{overflow: visible;}
    .ivu-collapse-header{background-color: @navColor;color:white!important;}
}
.center{
    margin: 0 5px 5px;
    .ivu-table{
        td{text-align: center;}
        th{text-align: center;}
    }
    .ivu-table th{background-color: @navBg;font-weight: 900}
}
.ml32{
    background-color: @navBg;
    line-height: 40px;
    height: 40px;
    padding-left: 32px;
    font-size: 16px !important;

    .black{color: #111111;font-weight: 900;}
    .blue{color: @navColor!important;}
}
</style>


<template>
    <div class="">
      <side-nav></side-nav>  
      <i-col span="21">
        <Breadcrumb class="ml32">
            <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
            <Breadcrumb-item class="black">运行记录</Breadcrumb-item>
            <Breadcrumb-item class="blue">水位记录查询</Breadcrumb-item>
        </Breadcrumb>
        <Button class="exportBtn" style="margin-left: 5px" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>  
        <Collapse v-model="value1" class="aa">
            <Panel name="1">
                条件筛选
                <template slot="content">
                    <Form ref="formInline" :model="formInline" inline :labelWidth="60">
                        <Form-item label="开始时间" prop="start_time">
                            <Date-picker type="date" placeholder="选择开始日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
                        </Form-item>
                        <Form-item label="结束时间" prop="end_time">
                            <Date-picker type="date" placeholder="选择结束日期" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
                        </Form-item>
                        <Form-item label="查询间隔" prop="statis_interval">
                             <Select v-model="formInline.statis_interval" clearable style="width:200px;">
                                <Option v-for="item in time" :value="item.value" :key="item.value">{{ item.interval }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="submitSearch('','1')">搜索</Button>
                        </Form-item>
                    </Form>
                </template> 
            </Panel>
            <Modal
                v-model="downloadModal"
                title="导出水位数据"
                @on-cancel="cancel">
                <iframe :src="downloadSrc"></iframe>
                <p>正在下载，请稍等</p>
            </Modal>
        </Collapse>
        <div class="center">
            <Table ref="table" border stripe :data="waterRecordData" :columns="waterRecordColumns"></Table>
            <div class="clear">
                    <Page
                        class="pull-right"
                        :total="waterRecordPage.total"
                        :current="waterRecordPage.current"
                        size="small"
                        show-total
                        @on-change="changePage"
                    ></Page>
            </div>
        </div>
        </i-col>
    </div>
</template>


<script>
import sideNav from '../analysis/side-nav.vue';
    export default {
        data () {
            return {
                urlWaterRecordsList: "wtxiqiao/waterresource/rlddevicerunrec/find",
                urlData: "wtxiqiao/export/exportExcel",
                formInline:{
                    id:'',
                    stn_name:'',
                    start_time:'',
                    end_time:'',
                    statis_interval:''
                },
                downloadSrc: "",
                downloadModal: false,
                idArr:[],
                stnName:"",
                waterRecordData:[],
                value1: '',
                time:[{
                    interval:"5分钟",
                    value:5
                },{
                    interval:"10分钟",
                    value:10
                },{
                    interval:"30分钟",
                    value:30
                },{
                    interval:"1小时",
                    value:60
                }],
                waterRecordColumns:[{
                    title:'站名',
                    key:'stn_name',
                },{
                    title:'时间',
                    key:'data_time',
                },{
                    title:'内江(m)',
                    key:'water_river_in',
                },{
                    title:'外江(m)',
                    key:'water_river_out',
                },{
                    title:'闸门状态',
                    key:'gatestatus',
                },{
                    title:'泵站状态',
                    key:'pumpstatus',
                }],
                waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
            }
        },
        methods: {
            clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
            submitSearch: function(name,type,page){
                if(type == "1"){
                   name = this.stnName 
                }else{
                  this.stnName = name  
                }
                var that=this;
                var params={};
                params.data = {};
                params.data.searchValue={}; 
                params.data.system_id = parameters.system_id;
                if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
                params.data.pageSize = 10;
                params.data.order={"data_time":-1};
                if(name !== undefined && name !== ""){
                    params.data.searchValue.stn_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                    this.stnName = name;
                }else{
                    params.data.searchValue.stn_name = "|#|like";
                }
                
                if(this.formInline.start_time !=''){
                    if (this.formInline.end_time === '') {
                        this.$Notice.warning({
                            title: '请选择结束时间'
                        });
                        return;
                    }
                    params.data.searchValue.data_time=this.formInline.start_time+" 00:00:00|#|"+this.formInline.end_time+" 23:59:59";
                }
                if(this.formInline.end_time !=''){
                    if (this.formInline.start_time === '') {
                        this.$Notice.warning({
                            title: '请选择开始时间'
                        });
                        return;
                    }
                    params.data.searchValue.data_time=this.formInline.start_time+" 00:00:00|#|"+this.formInline.end_time+" 23:59:59";
                }
                if(this.formInline.statis_interval !=''){
                    params.data.section=this.formInline.statis_interval;
                }
                console.log(params);
                params.token = this.getKey('token');
                params.url = this.urlWaterRecordsList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.$store.state.isLoadingShow = false;
                    that.waterRecordData = res.data.result.result;
                    that.waterRecordPage.total = res.data.result.totalSize;
                }
                this.$store.state.isLoadingShow = true;
                this.ajaxPost(params);
            },
            changePage: function(page) {
                this.submitSearch(this.stnName,'',page);
            },
            change: function(data){
                this.formInline.start_time=data;
            },
            change2: function(data){
                this.formInline.end_time=data;
            },
            exportData: function() {
                var token = this.getKey('token');
                this.downloadModal = true;
                this.downloadSrc = "http://"+systemIp+"/wtxiqiao/export/exportExcel?system_id=3000000&token="+token+"&stn_name="+this.formInline.stn_name+"&start_time="+this.formInline.start_time+"&end_time="+this.formInline.end_time;
            },
            cancel: function() {
                this.downloadModal = false;
            }
        },
        mounted: function() {
            this.submitSearch();
        },
        created() {
            this.$bus.on("stnName",this.submitSearch);
        },
        beforeDestroy() {
            this.$bus.off("stnName",this.submitSearch);
        },
        components: {
            'side-nav': sideNav
        }
    }    
</script>
