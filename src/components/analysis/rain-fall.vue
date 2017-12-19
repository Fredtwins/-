<style lang="less" scoped>
@import url("../../../static/less/color.less");
.rainFallEchart{
    width: 590px;
    height: 400px;
}
</style>


<template>
	<div class="">
        <i-col span="3">
            <Menu ref="stnMenu" width="auto" @on-select="selectStn">
                <template v-for="v in stnName">
                    <MenuItem :name="v">{{v}}</MenuItem>
                </template>
            </Menu>
        </i-col>
		<i-col span="21">
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">运行分析</Breadcrumb-item>
                <Breadcrumb-item class="blue">雨量统计</Breadcrumb-item>
            </Breadcrumb>
		 	<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
                                    <Form-item label="统计周期" prop="data_interval">
                                         <Select v-model="formInline.data_interval" clearable style="width:200px;">
                                            <Option v-for="item in time" :value="item.value" :key="item.value">{{ item.cycle }}</Option>
                                        </Select>
                                    </Form-item>
							        <Form-item label="日期" prop="data_time">
							            <Date-picker type="date" placeholder="日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
							        </Form-item>   
							        <Form-item>
							            <Button type="primary" @click="submitSearch('','1')">搜索</Button>
							        </Form-item>
							    </Form>
					</template> 
				</Panel>
			</Collapse>		
           <i-col span="12"><div class="center">
                <Table ref="table" :data="rainFallData" :columns="rainFallColumns" style="text-align:center" stripe></Table>
                <Page
                        class="pull-right"
                        :total="waterRecordPage.total"
                        :current="waterRecordPage.current"
                        size="small"
                        show-total
                        @on-change="changePage"
                    ></Page>
           </div></i-col>
           <i-col span="12"><div class="rainFallEchart"></div></i-col>
         </i-col>
	</div>
</template>


<script>
    export default {
        data () {
            return {
                urlRainFallList:"wtxiqiao/waterresource/rldrainhis/list",
                urlNameList:"wtxiqiao/waterresource/rldrainhis/distinct",
                rainFallData:[],
                stnName:[],
                value1: '',
            	formInline:{
            		stn_name:'',
            		data_time:'',
            		data_interval:''
            	},
            	time:[{
            		cycle:"年",
            		value:"M1"
            	},{
            		cycle:"月",
            		value:"D1"
            	},{
            		cycle:"日",
            		value:"R1"
            	}],
            	rainFallColumns:[{
            		title:'站名',
            		key:'stn_name',
            	},{
            		title:'统计时段',
            		key:'data_time',
            	},{
            		title:'累计雨量(mm)',
            		key:'rainfull',
            	}],
                waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
                saveName: ""
            }
        },
        methods:{
            clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
            selectStn (name) {
                this.submitSearch(name,1,"")
            },
            submitSearch: function(name,page,type) {
                if(type == "1"){
                   name = this.saveName 
                }else{
                  this.saveName = name  
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
                if(name !== undefined && name != ""){
                    params.data.searchValue.stn_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                }else{
                    params.data.searchValue.stn_name = "|#|like";
                }
                if(this.formInline.data_interval !=''){
                    params.data.searchValue.data_interval=this.formInline.data_interval;
                    if(this.formInline.data_time !=''){
                        if(this.formInline.data_interval =='M1'){
                            params.data.searchValue.data_time=this.formInline.data_time.substring(0,5)+"01-01 00:00:00|#|"+this.formInline.data_time.substring(0,5)+"12-31 23:59:59";
                        }
                        if(this.formInline.data_interval=='D1'){
                            params.data.searchValue.data_time=this.formInline.data_time.substring(0,8) + "01 00:00:00|#|"+this.formInline.data_time.substring(0,8) + "31 23:59:59";
                        }
                        if(this.formInline.data_interval=='R1'){
                            params.data.searchValue.data_time = this.formInline.data_time+" 00:00:00|#|"+this.formInline.data_time+" 23:59:59";
                        }
                    }else{
                        var myDate=new Date();
                        var today=myDate.format('yyyy-MM-dd');
                        this.formInline.data_time=today;
                        if(this.formInline.data_interval =='M1'){
                            params.data.searchValue.data_time=this.formInline.data_time.substring(0,5)+"01-01 00:00:00|#|"+this.formInline.data_time.substring(0,5)+"12-31 23:59:59";
                        }
                        if(this.formInline.data_interval=='D1'){
                            params.data.searchValue.data_time=this.formInline.data_time.substring(0,8)+"01 00:00:00|#|"+this.formInline.data_time.substring(0,8)+"31 23:59:59";
                        }
                        if(this.formInline.data_interval=='R1'){
                            params.data.searchValue.data_time=this.formInline.data_time+" 00:00:00|#|"+this.formInline.data_time+" 23:59:59";
                        }
                    }
                }else{
                    this.formInline.data_interval = 'D1';
                    params.data.searchValue.data_interval = this.formInline.data_interval;
                    if(this.formInline.data_time !=''){
                        params.data.searchValue.data_time=this.formInline.data_time.substring(0,8)+"01 00:00:00|#|"+this.formInline.data_time.substring(0,8)+"31 23:59:59";
                    }else{
                        var myDate=new Date();
                        var today=myDate.format('yyyy-MM-dd');
                        this.formInline.data_time = today
                         params.data.searchValue.data_time = this.formInline.data_time.substring(0,8)+"01 00:00:00|#|"+this.formInline.data_time.substring(0,8)+"31 23:59:59";
                    }
                }
                console.log(params.data.searchValue);
                params.token = this.getKey('token');
                params.url = this.urlRainFallList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.$store.state.isLoadingShow = false;
                        //根据周期显示对应的年月日时
                        if(res.data.result.length > 0){
                            if(res.data.result.result[0].data_interval =='D1'){
                                for(var i=0;i<res.data.result.result.length;i++){
                                    res.data.result.result[i].data_time=res.data.result.result[i].data_time.substring(0,10);
                                }
                            }
                            if(res.data.result.result[0].data_interval =='M1'){
                                for(var i=0;i<res.data.result.result.length;i++){
                                    res.data.result.result[i].data_time=res.data.result.result[i].data_time.substring(0,7);
                                }
                            }
                        }        
                    that.rainFallData = res.data.result.result;
                    that.waterRecordPage.total = res.data.result.totalSize;    
                    that.mapCreateEchart(res.data.result);
                }
                this.$store.state.isLoadingShow = true;
                this.ajaxPost(params);
            },
            changePage: function(page) {
                this.submitSearch(this.saveName,page,'1');
            },
            change: function(data) {
                this.formInline.data_time = data;
            },
            getName: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.data.page = 1;
                params.data.pageSize = 50;
                params.data.fieldName = 'stn_name';
                params.data.type = "String";
                params.data.searchValue = {};
                params.token = this.getKey('token');
                params.url = this.urlNameList;
                console.log(params.data);
                params.success = function(res) {
                    that.$Loading.finish();
                    that.stnName = res.data.result;
                    that.$nextTick(function() {
                            that.$refs.stnMenu.updateOpened();
                            that.$refs.stnMenu.updateActiveName();
                          })
                }
                this.ajaxPost(params);
            }
            ,
            mapCreateEchart: function(obj) {
                let option = {};
                let myChart = echarts.init(document.getElementsByClassName("rainFallEchart")[0]);
                console.log(obj);
                if(obj.result.length == 0){
                    console.log(123)
                    var yDatas = [];
                    var xDatas = [];
                    option={
                        color: ['#3398DB'],
                        title: {
                                text: '日雨量统计图',
                                left: '5%',
                                top: 20
                            },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {   
                                type : 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                         xAxis : [
                            {
                                type : 'category',
                                data : xDatas,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'累计雨量',
                                type:'bar',
                                barWidth: 20,
                                data:yDatas
                            }
                        ]
                    };
                    myChart.setOption(option);  
                }

                //console.log(obj.result[0].data_interval);
                switch(obj.result[0].data_interval){
                    case "R1":
                    var yDatas = [];
                    var xDatas = ["1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点","12点","13点","14点","15点","16点","17点","18点","19点","20点","21点","22点","23点","24点"];
                    obj.result.map(item => {
                            yDatas.push(item.rainfull);
                        })
                    //console.log(yDatas);
                    //console.log(xDatas);
                    option={
                        color: ['#3398DB'],
                        title: {
                                text: '日雨量统计图',
                                left: '5%',
                                top: 20
                            },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {   
                                type : 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                         xAxis : [
                            {
                                type : 'category',
                                data : xDatas,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'累计雨量',
                                type:'bar',
                                barWidth: '60%',
                                data:yDatas
                            }
                        ]
                    };
                    break;
                    case "D1":
                    var yDatas = [];
                    var xDatas = ["1号","2号","3号","4号","5号","6号","7号","8号","9号","10号","11号","12号","13号","14号","15号","16号","17号","18号","19号","20号","21号","22号","23号","24号","25号","26号","27号","28号","29号","30号","31号"];
                    obj.result.map(item => {
                            yDatas.push(item.rainfull);
                        })
                    //console.log(yDatas);
                    //console.log(xDatas);
                    option={
                        color: ['#3398DB'],
                        title: {
                                text: '月雨量统计图',
                                left: '5%',
                                top: 20
                            },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {   
                                type : 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                         xAxis : [
                            {
                                type : 'category',
                                data : xDatas,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'累计雨量',
                                type:'bar',
                                barWidth: '60%',
                                data:yDatas
                            }
                        ]
                    };
                    break;
                    case "M1":
                    var yDatas = [];
                    var xDatas = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
                    obj.result.map(item => {
                            yDatas.push(item.rainfull);
                        })
                    //console.log(yDatas);
                    //console.log(xDatas);
                    option={
                        color: ['#3398DB'],
                        title: {
                                text: '年雨量统计图',
                                left: '5%',
                                top: 20
                            },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {   
                                type : 'shadow'        
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                         xAxis : [
                            {
                                type : 'category',
                                data : xDatas,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'累计雨量',
                                type:'bar',
                                barWidth: '60%',
                                data:yDatas
                            }
                        ]
                    };
                }
                myChart.setOption(option);
            },
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '雨量统计数据'
                });
            }
        },
        mounted:function(){
            this.submitSearch();
            this.getName();
        }
    }
</script>
