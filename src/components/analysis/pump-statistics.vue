    <!-- 泵站运行统计 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");
</style>


<template>
	<div class="">
        <side-nav></side-nav>
		<i-col span="21">
			<Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
		        <Breadcrumb-item class="black">运行分析</Breadcrumb-item>
		        <Breadcrumb-item class="blue">泵站运行统计</Breadcrumb-item>
		    </Breadcrumb>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline  :label-width="60">
                            <Form-item label="统计周期" prop="statis_interval">
                                 <Select v-model="formInline.statis_interval" clearable style="width:200px;">
                                    <Option v-for="item in time" :value="item.value" :key="item.value">{{ item.cycle }}</Option>
                                </Select>
                            </Form-item>
					        <Form-item label="开始时间" prop="start_time">
                                <Date-picker type="date" placeholder="选择开始日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
                            </Form-item>
                            <Form-item label="结束时间" prop="end_time">
                                <Date-picker type="date" placeholder="选择结束日期" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
                            </Form-item>
					        <Button type="primary" @click="submitSearch('','1')">搜索</Button>
						</Form>
					</template> 
				</Panel>
			</Collapse>
			<div class="center">
				<Table ref="table" :data="pumpStatisticsData[0]" :columns="pumpStatisticsColumns" stripe></Table>
                <Page
                        class="pull-right"
                        :total="waterRecordPage.total"
                        :current="waterRecordPage.current"
                        size="small"
                        show-total
                        @on-change="changePage"
                    ></Page>
			</div>
		</i-col>
	</div>
</template>


<script>
import sideNav from '../analysis/pump-nav.vue';
    export default {
        data () {
            return {
            	urlPumpStatistics:"wtxiqiao/waterresource/statpumprun/list",
                urlPumpNameList:"wtxiqiao/waterresource/bsipumpstation/list",
            	formInline:{
            		stn_name:'',
            		day:'',
                    statis_interval:'',
                    start_time:'',
                    end_time:''
            	},
                value1: '',
                pumpStatisticsData:[],
                stnName:"",
                time:[{
                    cycle:"月",
                    value:"日"
                },{
                    cycle:"日",
                    value:"小时"
                }],
                pumpStatisticsColumns:[{
            		title:'泵站名称',
            		key:'stn_name',
            	},{
            		title:'泵号',
            		key:'pump_no',
            	},{
            		title:"统计时间",
            		key:'statis_interval',
            	},{
                    title: "开始时间",
                    key: "start_time"
                },{
                    title: "结束时间",
                    key: "end_time"
                },{
            		title:'运行时间',
            		key:'runtime',
            	},{
            		title:'开泵次数',
            		key:'opennum',
            	},{
            		title:'引水流量(m³)',
            		key:'discharge_bypump'
            	},{
                    title:'排水流量(m³)',
                    key:'divcharge_bypump'
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
        		params.data.order={"end_time":-1};
        		if(name !== undefined && name !== ""){
                    params.data.searchValue.stn_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                    this.stnName = name;
                }else{
                    params.data.searchValue.stn_name = "|#|like";
                }
                if(this.formInline.statis_interval != ''){

                    params.data.searchValue.statis_interval = this.formInline.statis_interval;
                }
        		if(this.formInline.start_time !=''){
                    if (this.formInline.end_time === '') {
                        this.$Notice.warning({
                            title: '请选择结束时间'
                        });
                        return;
                    }
                    params.data.searchValue.start_time = this.formInline.start_time+" 00:00:00|#|gte";
                }
                if(this.formInline.end_time !=''){
                    if (this.formInline.start_time === '') {
                        this.$Notice.warning({
                            title: '请选择开始时间'
                        });
                        return;
                    }
                    params.data.searchValue.end_time = this.formInline.end_time+" 23:59:59|#|lt";
                }
        		
        		console.log(params.data);
				params.token = this.getKey('token');
				params.url = this.urlPumpStatistics;
				params.success = function(res) {
					that.$Loading.finish();
					that.$store.state.isLoadingShow = false;
					that.pumpStatisticsData.unshift(res.data.result.result);
                    that.waterRecordPage.total = res.data.result.totalSize;
				}
				this.$store.state.isLoadingShow = true;
				this.ajaxPost(params);
        	},
            changePage: function(page) {
                this.submitSearch(this.stnName,'1',page);
            },
        	change: function(data){
        		this.formInline.start_time=data;
        	},
        	change2: function(data){
        		this.formInline.end_time=data;
        	},
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '泵站运行统计数据'
                });
            }
        },
        mounted:function(){
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
