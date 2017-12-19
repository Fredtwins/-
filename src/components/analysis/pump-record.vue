<!-- 泵站运行记录查询 -->
<style lang="less">
@import url("../../../static/less/color.less");
</style>


<template>
	<div class="">
        <side-nav></side-nav>
		<i-col span="21">
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">运行记录</Breadcrumb-item>
                <Breadcrumb-item class="blue">泵站运行记录查询</Breadcrumb-item>
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
					        <Form-item label="泵号" prop="pumpno">
					             <Select v-model="formInline.pumpno" clearable style="width:200px;">
							        <Option v-for="item in pumpno" :value="item.value" :key="item.value">{{ item.no }}</Option>
							    </Select>
					        </Form-item>
					        <Form-item label="泵站状态" prop="current">
					            <Select v-model="formInline.current" clearable style="width:200px;">
							        <Option v-for="item in current" :value="item.value" :key="item.value">{{ item.status }}</Option>
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
				<Table ref="table" :data="pumpRecordData[0]" :columns="pumpRecordColumns" stripe></Table>
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
                urlpumpRecordsList:"wtxiqiao/waterresource/rldpumprunrec/list",
                downloadModal: false,
                formInline:{
                    stn_name:'',
                    start_time:'',
                    end_time:'',
                    pumpno:'',
                    pumpstatus:''
                },
                aa: 'aa',
                value1: "",
                stnName:"",
                pumpRecordData:[],
            	pumpno:[{
            		no:"1号机",
            		value:1
            	},{
            		no:"2号机",
            		value:2
            	},{
            		no:"3号机",
            		value:3
            	},{
            		no:"4号机",
            		value:4
            	},{
            		no:"5号机",
            		value:5
            	}],
            	current:[{
            		status:"开启中",
            		value:0+"|#|gt",
            	},{
            		status:"关闭",
            		value:0,
            	}],
            	pumpRecordColumns:[{
            		title:'泵站名称',
            		key:'stn_name',
                    width:180
            	},{
            		title:'泵号',
            		key:'pump_no',
            	},{
            		title:'泵站状态',
            		key:'current',
            	},{
            		title:'开机时间',
            		key:'open_time',
                    width:180,
            	},{
            		title:'开泵内江(m)',
            		key:'open_innerriver',
            	},{
            		title:'开泵外江(m)',
            		key:'open_outerriver',
            	},{
            		title:'关机时间',
            		key:'close_time',
                    width:180,
            	},{
            		title:'关泵内江(m)',
            		key:'close_innerriver',
            	},{
            		title:'关泵外江(m)',
            		key:'close_outerriver',
            	},{
            		title:'开启时长',
            		key:'runtime',
            	}],
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
            //搜索的方法
            submitSearch: function(name,type,page){
                if(type == "1"){
                   name = this.stnName 
                }else{
                  this.stnName = name  
                }
                var that = this;
                var params = {};
                params.data = {};
                params.data.searchValue={}; 
                params.data.system_id = parameters.system_id;
                if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
                params.data.pageSize = 10;
                params.data.order={"close_time":-1};
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
                    params.data.searchValue.datetime=this.formInline.start_time+" 00:00:00|#|"+this.formInline.end_time+" 23:59:59";
                }
                if(this.formInline.end_time !=''){
                    if (this.formInline.start_time === '') {
                        this.$Notice.warning({
                            title: '请选择开始时间'
                        });
                        return;
                    }
                    params.data.searchValue.datetime=this.formInline.start_time+" 00:00:00|#|"+this.formInline.end_time+" 23:59:59";
                }
                if(this.formInline.pumpno !=''){
                    params.data.searchValue.pumpno=this.formInline.pumpno;
                }
                if(this.formInline.current !=''||this.formInline.current==0){
                    params.data.searchValue.current=this.formInline.current;
                }
                console.log(this.formInline.current);
                params.token = this.getKey('token');
                params.url = this.urlpumpRecordsList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.$store.state.isLoadingShow = false;
                    console.log(res.data.result.result);    
                    for(let i=0;i<res.data.result.result.length;i++){
                        if(res.data.result.result[i].current==0){
                            res.data.result.result[i].current="关闭";
                        }else{
                            res.data.result.result[i].current="开启";
                        }
                        
                    }
                    that.pumpRecordData.unshift(res.data.result.result);
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
                this.downloadSrc = "http://"+systemIp+"/wtxiqiao/export/RldPumpExcel?system_id=3000000&token="+token+"&stn_name="+this.formInline.stn_name+"&start_time="+this.formInline.start_time+"&end_time="+this.formInline.end_time;
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
