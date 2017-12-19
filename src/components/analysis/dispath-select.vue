<style lang="less" scoped>
@import url("../../../static/less/color.less");
</style>


<template>
	<div class="">
        <side-nav></side-nav>
		<i-col span="21">
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">调度分析</Breadcrumb-item>
                <Breadcrumb-item class="blue">调度记录查询</Breadcrumb-item>
            </Breadcrumb>
            <Button class="exportBtn" style="margin-left: 5px" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :labelWidth="60">
							        <Form-item label="发布人" prop="dispatcher">
							            <Input v-model="formInline.dispatcher" placeholder="请输入发布人"></Input>
							        </Form-item>
							        <Form-item label="发布时间" prop="send_time">
							            <Date-picker type="date" placeholder="选择发布日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
							        </Form-item>
                                    <Form-item>
							            <Button type="primary" @click="submitSearch('','1')">搜索</Button>
                                    </Form-item>
							    </Form>
					</template> 
				</Panel>
			</Collapse>
			<div class="center">
				<Table ref="table" :data="controlData" :columns="controlColumns" stripe></Table>
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
import sideNav from '../analysis/side-nav.vue';
    export default {
        data () {
            return {
                urlControlList: 'wtxiqiao/waterresource/wdpdispatchrec/list',
            	formInline:{
            		station_name:'',
            		send_time:'',
            		dispatcher:''
            	},
                stnName: "",
                value1: '',
                controlData:[],
            	controlColumns: [{
                        title: '站名',
                        key: "station_name"
                    }, {
                        title: '发布时间',
                        key: 'send_time'
                    }, {
                        title: '调度内容',
                        key: 'order_content'
                    }, {
                        title: '执行情况',
                        key: 'execu_status'
                    }, {
                        title: '执行内容',
                        key: 'execu_result'
                    }, {
                        title: '发布单位',
                        key: 'send_department'
                    }, {
                        title: '发布人',
                        key: "dispatcher"
                    }
                ],
                waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
            }
        },
        methods:{
             clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
             //分页
             changePage: function(page) {
                this.submitSearch(this.stnName,'1',page);
             },
             //搜索的方法   
             submitSearch:function (name,type,page) {
                if(type == "1"){
                   name = this.stnName 
                }else{
                  this.stnName = name  
                }
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
                params.data.pageSize = 10;
                params.data.order = {"send_time":-1};
                params.data.searchValue = {};
                params.token = this.getKey('token');
                params.url = this.urlControlList;
                if(name !== undefined && name !== ""){
                    params.data.searchValue.station_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                    this.stnName = name;
                }else{
                    params.data.searchValue.station_name = "|#|like"; 
                }
                if(this.formInline.dispatcher !== ""){
                    params.data.searchValue.dispatcher = this.formInline.dispatcher + "|#|like";
                }
                if(this.formInline.send_time !== ""){
                    params.data.searchValue.send_time = this.formInline.send_time+" 00:00:00|#|"+this.formInline.send_time+" 23:59:59";
                }
                params.success = function(res) {
                    that.$Loading.finish();
                    that.controlData = res.data.result.result;
                    that.waterRecordPage.total = res.data.result.totalSize;
                    //console.log(that.controlData);
                }
                this.ajaxPost(params);
            },
            change: function(data) {
                this.formInline.send_time = data;
            },
            //导出csv数据的方法
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '调度记录数据'
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
