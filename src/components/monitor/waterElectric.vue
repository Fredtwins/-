 <!-- 水位开度，电流监控 -->
<style lang="less">
@import url("../../../static/less/color.less");
.water-electric-card {
	*{
		font-size: 14px;
	}
	#waterChart{
		width: 750px;
		height: 500px;
	}
	.ivu-card-body {
		padding: 0;
		overflow: hidden;
	}
	.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
		background-color: rgb(230,230,230)!important;
	}

	.ivu-card-head {
		background-color: @navColor;

		.full-screen-btn {
			cursor: pointer;
			float: right;
			font-size: 22px;
			line-height: 28px
		}
		
		img {
			margin-top: 3px;
		}

		 .white {
			color: white;
		} 

		.head-func-btn {
			float: right;
			padding-right: 15px;
		}
	}

	.watch-mode {
		padding: 10px;
	}

	.ivu-table .tableGroup td{
		border: none;
		font-weight: 900;
	}
}

.modal-watch-mode-setting {

	.no-info {
		text-align: center;
	}

	.ivu-col {
		padding: 10px;
	}

	.ivu-date-picker {
		width: 100%;
	}
}

.modal-history-alerm {
	.ivu-page {
		padding-top: 10px;
	}
}

.water-electric-table {
	.ivu-table th{background-color: @navBg;font-weight: 900}
	.ivu-table-fixed-body{
		padding-bottom: 15px;
	}
}

.ivu-table .bg-red td {
	color: rgb(254,67,101);
}


</style>


<template>
	<Card dis-hover class="water-electric-card h100">
		<p slot="title" class="jiance">
			<img src="../../../static/img/monitor/shi.png" height="20" width="20" alt="">
			<span class="white">实时监测</span>
			<span class="white">{{time}}</span>
			<span class="white">
				<i
					class="full-screen-btn ivu-icon"
					:class="$store.state.monitorMiddleBig ? 'ivu-icon-arrow-shrink' : 'ivu-icon-arrow-expand'"
					href="javascript:;"
					@click="$store.state.monitorMiddleBig = !$store.state.monitorMiddleBig"
				></i>
			</span>
			
			<span class="head-func-btn" >
				<span class="white">声音报警</span> <i-switch v-model="alermSound" style="margin-right: 5px"></i-switch>
				<audio v-if="alermSound && hasAlerm" autoplay loop src="static/sound/alerm.mp3"></audio>
				<Dropdown trigger="click">
					<!-- <a href="javascript:;">
					监测模式
					<Icon type="arrow-down-b"></Icon>
					</a> -->
					<Button type="ghost" shape="circle" size="small"><span class="white">监测模式 <Icon type="arrow-down-b"></Icon></span> </Button>
					<Dropdown-menu slot="list">
						<Checkbox-group v-model="watchModeSelect" class="watch-mode" @on-change="setWatchMode">
							<template v-for="i in watchMode">
								<Checkbox :label="i"></Checkbox><br>
							</template>
					    </Checkbox-group>
					</Dropdown-menu>
				</Dropdown>
				<Button type="ghost" shape="circle" size="small" @click="modalHistoryAlerm = true"><span class="white">报警信息</span></Button>
		    </span>
		</p>
		<div class="water-electric-table">
			<Table border stripe size="small" :row-class-name="rowClassName" :height="tableSize.height" :columns="tableColumns" :data="tableData" @on-row-click="showWaterChart"></Table>
		</div>

		<Modal
	        v-model="modalWatchModeSetting"
	        title="监测模式参数设置"
			:loading="true"
			class-name="modal-watch-mode-setting"
			@on-ok="setWatchParameter"
        >
			<Row>
				<Col span="12">
					外江高潮位时间1<br><Time-picker format="HH:mm" :value="watchParameter.tide_high_1" @on-change="function(time){watchParameter.tide_high_1 = time;}" placeholder="外江高潮位时间1"></Time-picker>
				</Col>
				<Col span="12">
					外江高潮位时间2<br><Time-picker format="HH:mm" :value="watchParameter.tide_high_2" @on-change="function(time){watchParameter.tide_high_2 = time;}" placeholder="外江高潮位时间2"></Time-picker>
				</Col>
				<Col span="12">
					外江低潮位时间1<br><Time-picker format="HH:mm" :value="watchParameter.tide_low_1" @on-change="function(time){watchParameter.tide_low_1 = time;}" placeholder="外江低潮位时间1"></Time-picker>
				</Col>
				<Col span="12">
					外江低潮位时间2<br><Time-picker format="HH:mm" :value="watchParameter.tide_low_2" @on-change="function(time){watchParameter.tide_low_2 = time;}" placeholder="外江低潮位时间2"></Time-picker>
				</Col>
				<Col span="12">
					水位急上涨时间（分钟）<br><Input v-model="watchParameter.level_interval" placeholder="水位急上涨时间（分钟）"></Input>
				</Col>
				<Col span="12">
					水位急上涨高度（米）<br><Input v-model="watchParameter.level_val" placeholder="水位急上涨高度（米）"></Input>
				</Col>
				<Col span="12">
					内江水位上限<br><Input v-model="watchParameter.alarm_level_in" placeholder="内江水位上限"></Input>
				</Col>
				<Col span="12">
					外江警戒水位<br><Input v-model="watchParameter.alarm_level_out" placeholder="外江警戒水位"></Input>
				</Col>
				<Col span="12">
					关闸时间<br><Time-picker format="HH:mm" :value="watchParameter.gate_close_time" @on-change="function(time){watchParameter.gate_close_time = time;}" placeholder="关闸时间"></Time-picker>
				</Col>
			</Row>
	    </Modal>

		<Modal
			class="modal-history-alerm"
	        v-model="modalHistoryAlerm"
	        title="报警信息"
			width="750"
			:loading="true"
			ok-text="当前页全部确认"
			@on-ok="alermConfirm"
        >
			<template v-if="alermListData.length > 0">
				<Table size="small" :columns="alermListColumns" :data="alermListData"></Table>
				<div class="clear">
					<Page
						class="pull-right"
						:total="alermListPage.total"
						:page-size="alermListPage.pageSize"
						:current="alermListPage.current"
						size="small"
						show-total
						@on-change="getAlermData"
					></Page>
				</div>
			</template>
			<p v-else class="textCenter">暂无数据</p>
	    </Modal>
	    <Modal v-model="waterModal" width="1000">
	    	<p slot="header">
	            {{stn_name}}  
	        </p>
			<div class="waterEchart" style="width:1000px;height:300px;">
				
			</div>
			<div class="waterEchart" style="width:1000px;height:300px;">
				
			</div>
	    </Modal>
	</Card>
</template>


<script>

export default {
	data () {
		return {
			urlGetTableData: 'wtxiqiao/waterresource/rlddevicerunrec/listcurrent',
			urlAlermConfirm: 'wtxiqiao/waterresource/rldalertrealtime/editarray',
			urlGetWatchMode: 'wtxiqiao/waterresource/wdpschedulemode/mode',
			urlSetWatchMode: 'wtxiqiao/waterresource/wdpschedulemode/editmode',
			urlGetWatchParameter: 'wtxiqiao/waterresource/wdpgatemonitor/list',
			urlSetWatchParameter: 'wtxiqiao/waterresource/wdpgatemonitor/edit',
			urlGetAlermData: 'wtxiqiao/waterresource/rldalertrealtime/list',
			urlWaterDataList:"wtxiqiao/waterresource/rlddevicerunrec/waterlevel",
			alermSound: JSON.parse(this.getKey('alermSound')),
			modalHistoryAlerm: false,
			modalWatchModeSetting: false,
			watchModeSelect: [],
			watchMode: [],
			time: "",
			watchParameter: {
				tide_high_1: '',
				tide_high_2: '',
				tide_low_1: '',
				tide_low_2: '',
				level_interval: '',
				level_val: '',
				gate_close_time: '',
				alarm_level_in: '',
				alarm_level_out: '',
			},
			// 复制一份出来用于重制
			watchParameter1: {},
			tableSize: {
				width: 1,
				height: 1
			},
			tableColumns: [
				{
					title: '站点名称',
					key: 'stn_name',
					width: 100,
					fixed: 'left'
				}, {
					title: '数据时间',
					key: 'data_time',
					width: 150
				}, {
					title: '内江水位(m)',
					key: 'water_river_in',
					width: 40
				}, {
					title: '外江水位(m)',
					key: 'water_river_out',
					width: 40
				}, {
					title: '闸门数',
					key: 'gate_count',
					width: 50
				}, {
					title: '总泵数',
					key: 'pump_count',
					width: 50
				}, {
					title: '泵状态',
					key: 'pumpstatus',
					width: 80
				}, {
					title: '闸门状态',
					key: 'gatestatus',
					width: 80
				}, {
					title: '内江超限水位(m)',
					key: 'inner_limit',
					width: 60
				}, {
					title: '外江超限水位(m)',
					key: 'outer_limit',
					width: 60
				}, {
					title: '常态内江警戒水位(m)',
					key: 'normal_alarm_level_in',
					width: 60
				}, {
					title: '常态外江警戒水位(m)',
					key: 'normal_alarm_level_out',
					width: 60
				}, {
					title: '外江水位趋势',
					key: 'outertrend',
					width: 60
				}, {
					title: '内江水位趋势',
					key: 'innertrend',
					width: 60
				}, {
					title: '闸1',
					key: 'gate1_kaidu',
					width: 40
				}, {
					title: '闸2',
					key: 'gate2_kaidu',
					width: 40
				}, {
					title: '闸3',
					key: 'gate3_kaidu',
					width: 40
				}, {
					title: '闸4',
					key: 'gate4_kaidu',
					width: 40
				}, {
					title: '闸5',
					key: 'gate5_kaidu',
					width: 40
				}, {
					title: '闸6',
					key: 'gate6_kaidu',
					width: 40
				}, {
					title: '闸7',
					key: 'gate7_kaidu',
					width: 40
				}, {
					title: '闸8',
					key: 'gate8_kaidu',
					width: 40
				}, {
					title: '闸9',
					key: 'gate9_kaidu',
					width: 40
				}, {
					title: '闸10',
					key: 'gate10_kaidu',
					width: 50
				}, {
					title: '泵1',
					key: 'pump1_current',
					width: 40
				}, {
					title: '泵2',
					key: 'pump2_current',
					width: 40
				}, {
					title: '泵3',
					key: 'pump3_current',
					width: 40
				}, {
					title: '泵4',
					key: 'pump4_current',
					width: 40
				}, {
					title: '泵5',
					key: 'pump5_current',
					width: 40
				}, {
					title: '泵6',
					key: 'pump6_current',
					width: 40
				}, {
					title: '泵7',
					key: 'pump7_current',
					width: 40
				}, {
					title: '泵8',
					key: 'pump8_current',
					width: 40
				}, {
					title: '泵9',
					key: 'pump9_current',
					width: 40
				}, {
					title: '泵10',
					key: 'pump10_current',
					width: 50
				}, {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                    	if(params.row.water_river_out !== undefined){
                    		return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small'
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
											this.modalWatchModeSetting = true;
											this.watchParameter = this.watchParameter1;
											this.getWatchParameter(params.row.stn_name);
	                                    }
	                                }
	                            }, '监测参数')
	                   		]);
                    	}else{
                    		return null;
                    	}
                        
                    }
                }
			],
			tableData: [],
			alermListData: [],
			alermListColumns: [
				{
					title: '站点名称',
					key: 'stn_name',
				}, {
					title: '报警描述',
					key: 'alert_desc',
				}, {
					title: '报警时间',
					key: 'alert_time',
					render: (h, params) => {
						var ret = params.row.alert_time;
						ret = ret.substring(2);
						ret = ret.substring(0, ret.length - 3);
						return ret;
					},
				}, {
					title: '确认人',
					key: 'confirm_person',
				}, {
					title: '确认时间',
					key: 'confirm_time'
				}, {
                    title: '操作',
                    key: 'action',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
						if (!params.row.is_confirmed) {
	                        return h('div', [
	                            h('Button', {
	                                props: {
	                                    type: 'primary',
	                                    size: 'small',
	                                },
	                                style: {
	                                    marginRight: '5px'
	                                },
	                                on: {
	                                    click: () => {
	                                        this.alermConfirm(params);
	                                    }
	                                }
	                            }, '确认')
	                        ]);
						} else {
							return '';
						}
                    }
                }
			],
			alermListPage: {
				pageSize: 10,
				current: 1,
				total: 1000
			},
			waterModal: false,
			waterHistoryData2: [],
			stn_name: "",
		}
	},
	methods: {
		// 获取表格数据
		getTableData: function() {
			var that = this;
			var params = {};
			params.data = {};
			params.data.system_id = parameters.system_id;
			params.data.page = 1;
			params.data.pageSize = 50;
			params.data.orders = 'data_time';
			params.data.searchValue = {};
			params.token = this.getKey('token');
			params.url = this.urlGetTableData;
			params.success = function(res) {
				that.$Loading.finish();
				that.tableData = res.data.result;
			}
			this.ajaxPost(params);
		},
		/*getAlermData: function(page) {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = page;
				params.data.pageSize = 10;
				params.data.order = {
					is_confirmed: 1,
					alert_time: -1
				};
				var myDate = new Date();
				params.data.searchValue = {};
				params.data.searchValue.active_time = myDate.format("yyyy-MM-dd hh:mm:ss")+"|#|gte";
				params.token = this.getKey('token');
				params.url = this.urlGetAlermData;
				params.success = function(res) {
					that.$Loading.finish();
					// console.log(res.data.result);
					if (res.data.code === '0000') {
						that.alermListData = res.data.result.result;
						that.$bus.emit('setAlermTable', res.data.result);
					}
				}
				this.ajaxPost(params);
		},*/
		// 设置报警换页信息
		setAlerm: function(data) {
			this.alermListData = data.result;
			this.alermListPage.current = data.page;
			this.alermListPage.total = data.totalSize;
		},
		// 报警列表换页
		getAlermData: function(page) {
			this.$bus.emit('getAlermData', page);
		},
		// 报警确认
		alermConfirm: function(data) {
			var _id_array = [];
			if (data) {
				// 如果传data 单个确认
				_id_array.push(data.row._id);
			} else {
				// 如果不data 全部确认
				for (var i in this.alermListData) {
					if (!this.alermListData[i].is_confirmed) {
						_id_array.push(this.alermListData[i]._id);
					}
				}
			}

			var that = this;
			var params = {};
			params.data = {};
			params.data.system_id = parameters.system_id;
			params.data._id_array = _id_array;
			params.token = this.getKey('token');
			params.url = this.urlAlermConfirm;
			params.success = function(res) {
				that.$Loading.finish();
				if (res.data.code === '0000') {
					that.$Message.success('确认成功');
					// 如果不data 全部确认
					if (!data) {
						that.modalHistoryAlerm = false;
					}
					that.getAlermData(that.alermListPage.current);
				} else {
					that.$Message.error('确认失败');
				}
			}
			this.ajaxPost(params);
		},
		// 获取监测模式
		getWatchMode: function() {
			var that = this;
			var params = {};
			params.data = {};
			params.data.system_id = parameters.system_id;
			params.token = this.getKey('token');
			params.url = this.urlGetWatchMode;
			params.success = function(res) {
				that.$Loading.finish();
				if (res.data.code === '0000') {
					//console.log(res.data.result);

					that.watchMode = [];
					that.watchModeSelect = [];
					for (var i in res.data.result) {
						that.watchMode.push(res.data.result[i].mode_name);

						if (res.data.result[i].opening === 1) {
							that.watchModeSelect.push(res.data.result[i].mode_name);
						}
					}
				}
				console.log(that.watchMode);
			}
			this.ajaxPost(params);
		},
		// 设置监测模式
		setWatchMode: function() {
			var that = this;
			var params = {};
			params.data = {};
			params.data.system_id = parameters.system_id;
			params.data.mode = this.watchModeSelect;
			params.token = this.getKey('token');
			params.url = this.urlSetWatchMode;
			params.success = function(res) {
				that.$Loading.finish();
				if (res.data.code === '0000') {
					that.$Message.success('设置成功');
				} else {
					that.$Message.error('设置失败');
				}
			}
			this.ajaxPost(params);
		},
		// 获取监测模式参数
		getWatchParameter: function(stationName) {
			var that = this;
			var params = {};
			params.data = {};
			params.data.system_id = parameters.system_id;
			params.data.page = 1;
			params.data.pageSize = 10;
			params.data.searchValue = {gate_name: stationName};
			params.token = this.getKey('token');
			params.url = this.urlGetWatchParameter;
			params.success = function(res) {
				that.$Loading.finish();
				if (res.data.code === '0000') {
					if (res.data.result.result.length > 0) {
						that.watchParameter = res.data.result.result[0];
					} else {
						that.modalWatchModeSetting = false;
						that.$Message.warning('此站点无法设置监测参数');
					}
				} else {
					that.$Message.error('获取监测参数失败');
				}
			}
			this.$store.state.isLoadingShow = true;
			this.ajaxPost(params);
		},
		// 设置监测模式参数
		setWatchParameter: function() {
			var that = this;
			var params = {};
			params.data = this.watchParameter;
			params.data.system_id = parameters.system_id;
			params.token = this.getKey('token');
			params.url = this.urlSetWatchParameter;
			params.success = function(res) {
				that.$Loading.finish();
				if (res.data.code === '0000') {
					that.$Message.success('设置成功');
					that.watchParameter = that.watchParameter1;
					that.modalWatchModeSetting = false;
				} else {
					that.$Message.error('设置失败');
				}
			}
			this.ajaxPost(params);
		},
		//对超限的行添加背景为红色的样式名
		rowClassName: function(row,index) {
			//console.log(row);
			if (row.water_river_in > row.normal_alarm_level_in) {
				return 'bg-red';
			}
			if (row.water_river_out > row.normal_alarm_level_out) {
				return 'bg-red';
			}
			if (row.water_river_out === undefined) {
				return 'tableGroup'
			}
		},
		//在标题上显示一个时间
		showTime: function() {
			var that = this;		
			setInterval(function(){
				var myDate = new Date();
				that.time = myDate.format("yyyy-MM-dd hh:mm:ss");
			},1000)
		},
		//获取水位数据
		getData (name) {
            this.waterHistoryData2=[];
            var that=this;
            var params={};
            var MyDate = new Date();
            var todayTime = MyDate.format('yyyy-MM-dd');
            var yesterdayTime = new Date(MyDate.getTime() - 24*60*60*1000).format('yyyy-MM-dd');
            params.data = {};
            params.data.searchValue={}; 
            params.data.system_id = parameters.system_id;
            params.data.page = 1;
            params.data.stn_name = name;
            this.stn_name = name;
            params.order={"date_time":-1};    
            params.token = this.getKey('token');
            params.url = this.urlWaterDataList;
            console.log(params.data);
            params.data.searchValue.data_time = [todayTime];
            params.success = function(res) {
                    that.$Loading.finish();
                    that.$store.state.isLoadingShow = false;
                    that.waterHistoryData2 = res.data.result;
                    console.log(res);
                    that.CreateWaterLevlEchart(that.waterHistoryData2,0);            
            }
            this.ajaxPost(params);
            setTimeout(function(){
            	params.data.searchValue.data_time = [yesterdayTime];
            	params.success = function(res) {
                    that.$Loading.finish();
                    that.$store.state.isLoadingShow = false;
                    that.waterHistoryData2 = res.data.result;
                    that.CreateWaterLevlEchart(that.waterHistoryData2,1);            
                }
                
                that.ajaxPost(params);
            },400)
              
        },
        CreateWaterLevlEchart: function (obj,j) {
            let option = {};
            console.log(obj);
            let myChart = echarts.init(document.getElementsByClassName("waterEchart")[j]);
            var todayinnerData = [];
            var todayouterData = [];
            var yesterdayinnerData = [];
            var yesterdayouterData = [];
            var max_tidal_time = [];
            var min_tidal_time = [];
            var chaoweiData = [];
            var xDatas = [];
            var titleData = [];
            var maxLevel;
            var minLevel;
            if(obj.today){
                var todayDate=obj.today[0].data_time.substring(5,10)
                for(var i in obj.today){
                   todayinnerData.push(obj.today[i].water_river_in);
                   todayouterData.push(obj.today[i].water_river_out);
                   xDatas.push(obj.today[i].data_time.substring(11,16));
                 }
                titleData = [todayDate+"内江",todayDate+"外江"]
            }
            if(obj.yesterday){
               	xDatas = [];
                var yesterdayDate=obj.yesterday[0].data_time.substring(5,10)
                for(var i in obj.yesterday){
                   yesterdayinnerData.push(obj.yesterday[i].water_river_in);
                   yesterdayouterData.push(obj.yesterday[i].water_river_out);
                   xDatas.push(obj.yesterday[i].data_time.substring(11,16));
                }
                var neijiang = yesterdayDate+"内江";
                var waijiang = yesterdayDate+"外江"
                titleData.push(neijiang,waijiang);
           	}
           	if(this.getKey('maxLevel') !== null){
           		maxLevel = this.getKey('maxLevel')
           	}else{
           		maxLevel = 4
           	}
           	if(this.getKey('minLevel') !== null){
           		minLevel = this.getKey('minLevel')
           	}else{
           		minLevel = -2
           	}
                option = {
                  color: [
	                '#c23531',
	                "#1e90ff",
	                "#ff7f10",
	                "#00fa9a",
	                '#749f83',
	                '#61a0a8',
	                '#d48265',
	                '#91c7ae',
	              ],
                  title: {
                    text: this.stn_name +'24小时水位趋势',
                  },
                  legend: {
                    data:titleData,
                    right: 30,
                    padding: 3,
                  },
                  grid: {
                    left: 0,
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  calculable : true,
                  xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: xDatas,
                    axisLabel:{interval:11}
                  }],
                  yAxis: [{
                    type: 'value',
                    max: maxLevel,
                    min: minLevel,
                    axisLabel: {
                      formatter: '{value} 米'
                    }
                  }],
                  series: [{
                    name: todayDate+'内江',
                    type: 'line',
                    data: todayinnerData,
                    symbol: 'none',
                  }, {
                    name: todayDate+'外江',
                    type: 'line',
                    showSymbol: false,
                    data: todayouterData,

                  }, {
                    name: yesterdayDate+'内江',
                    type: 'line',
                    showSymbol: false,
                    data: yesterdayinnerData,

                  }, {
                    name: yesterdayDate+'外江',
                    type: 'line',
                    showSymbol: false,
                    data: yesterdayouterData,
                  }]
                };


            myChart.setOption(option);
        },
		showWaterChart: function(data) {
			if(data.water_river_in === undefined && data.water_river_out === undefined){
				return;
			}
			this.waterModal = true;
			this.getData(data.stn_name);
		}
	},
	watch: {
		'$store.state.monitorMiddleBig': function() {
			this.getTableSize('.water-electric-card', ['.ivu-card-head'], 'tableSize');
		},
		alermSound: function() {
			this.setKey('alermSound', this.alermSound);
		}
	},
	computed: {
		hasAlerm: function() {
			if (this.alermListData.length > 0) {
				for (var i in this.alermListData) {
					if (!this.alermListData[i].is_confirmed) {
						return true;
					}
				}
				return false;
			} else {
				return false;
			}
		}
	},
	mounted: function() {
		var that = this;
		this.getTableData();
		this.getWatchMode();
		this.getAlermData();
		this.showTime();
		this.watchParameter1 = this.watchParameter;
		this.getTableSize('.water-electric-card', ['.ivu-card-head'], 'tableSize');

		setInterval(function() {
			that.getTableData();
		}, 15000);

		$(window).on('resize', function() {
			that.getTableSize('.water-electric-card', ['.ivu-card-head'], 'tableSize');
		});
	},
	created() {
		this.$bus.on('setAlermTable', this.setAlerm);
	},
	beforeDestroy() {
		this.$bus.off('setAlermTable', this.setAlerm);
	},
}
</script>
