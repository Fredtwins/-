<!-- 水位开度，电流监控 -->
<style lang="less">
@import url("../../../static/less/color.less");
.water-electric-card {
	
	.ivu-card-body {
		padding: 0;
		overflow: hidden;
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
	p{
		font-size: 18px;
		font-weight: 600;
	}

	#waterLevelChart{
		margin-top: 100px;
		width: 100%;
		height: 300px;
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
					<Button type="ghost" shape="circle" size="small"><span class="white">监测模式 <Icon type="arrow-down-b"></Icon></span></Button>
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
			<i-col span="12">
				<p>站点名称：{{table_stn_name}}</p>
				<p>数据时间：{{table_data_time}}</p>
				<p>内江水位：{{table_water_river_in}}</p>
				<p>外江水位：{{table_water_river_out}}</p>
				<p>闸门数：{{table_gate_count}}</p>
				<p>总泵数：{{table_pump_count}}</p>
				<p>泵状态：{{table_pumpstatus}}</p>
				<p>闸1：{{table_gate1_kaidu}}</p>
				<p>闸2：{{table_gate2_kaidu}}</p>
				<p>闸3：{{table_gate3_kaidu}}</p>
				<p>闸4：{{table_gate4_kaidu}}</p>
				<p>闸5：{{table_gate5_kaidu}}</p>
				<p>闸6：{{table_gate6_kaidu}}</p>
				<p>闸7：{{table_gate7_kaidu}}</p>
				<p>闸8：{{table_gate8_kaidu}}</p>
				<p>闸9：{{table_gate9_kaidu}}</p>
				<p>闸10：{{table_gate10_kaidu}}</p>
			</i-col>	
			<i-col span="12">
				<p>闸门状态：{{table_gatestatus}}</p>
				<p>内江超限水位：{{table_inner_limit}}</p>
				<p>外江超限水位：{{table_outer_limit}}</p>
				<p>常态内江警戒水位：{{table_normal_alarm_level_in}}</p>
				<p>常态外江警戒水位：{{table_normal_alarm_level_out}}</p>
				<p>内江水位趋势：{{table_innertrend}}</p>
				<p>外江水位趋势：{{table_outertrend}}</p>
				<p>泵1：{{table_pump1_current}}</p>
				<p>泵2：{{table_pump2_current}}</p>
				<p>泵3：{{table_pump3_current}}</p>
				<p>泵4：{{table_pump4_current}}</p>
				<p>泵5：{{table_pump5_current}}</p>
				<p>泵6：{{table_pump6_current}}</p>
				<p>泵7：{{table_pump7_current}}</p>
				<p>泵8：{{table_pump8_current}}</p>
				<p>泵9：{{table_pump9_current}}</p>
				<p>泵10：{{table_pump10_current}}</p>
			</i-col>
			<i-col span="24">
				<div id="waterLevelChart">
					
				</div>
			</i-col>
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
			table_stn_name: "",
			table_data_time: "",
			table_water_river_in: "",
			table_water_river_out: "",
			table_gate_count: "",
			table_pump_count: "",
			table_pumpstatus: "",
			table_gatestatus: "",
			table_inner_limit: "",
			table_outer_limit: "",
			table_normal_alarm_level_in: "",
			table_normal_alarm_level_out: "",
			table_outertrend: "",
			table_innertrend: "",
			table_gate1_kaidu: "",
			table_gate2_kaidu: "",
			table_gate3_kaidu: "",
			table_gate4_kaidu: "",
			table_gate5_kaidu: "",
			table_gate6_kaidu: "",
			table_gate7_kaidu: "",
			table_gate8_kaidu: "",
			table_gate9_kaidu: "",
			table_gate10_kaidu: "",
			table_pump1_current: "",
			table_pump2_current: "",
			table_pump3_current: "",
			table_pump4_current: "",
			table_pump5_current: "",
			table_pump6_current: "",
			table_pump7_current: "",
			table_pump8_current: "",
			table_pump9_current: "",
			table_pump10_current: "",
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
					key: 'confirm_time',
					render: (h, params) => {
						var ret = params.row.confirm_time;
						ret = ret.substring(2);
						ret = ret.substring(0, ret.length - 3);
						return ret;
					},
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
			var stn_name = this.$route.query.searchValue;
			params.data.searchValue = {};
			params.data.searchValue.stn_name = stn_name;
			console.log(params.data.searchValue);
			params.token = this.getKey('token');
			params.url = this.urlGetTableData;
			params.success = function(res) {
				that.$Loading.finish();
				that.table_stn_name = res.data.result.stn_name;
				that.table_data_time = res.data.result.data_time;
				that.table_water_river_in = res.data.result.water_river_in;
				that.table_water_river_out = res.data.result.water_river_out;
				that.table_gate_count = res.data.result.gate_count;
				that.table_pump_count = res.data.result.pump_count;
				that.table_pumpstatus = res.data.result.pumpstatus;
				that.table_gatestatus = res.data.result.gatestatus;
				that.table_inner_limit = res.data.result.inner_limit;
				that.table_outer_limit = res.data.result.outer_limit;
				that.table_normal_alarm_level_in = res.data.result.normal_alarm_level_in;
				that.table_normal_alarm_level_out = res.data.result.normal_alarm_level_out;
				that.table_outertrend = res.data.result.outertrend;
				that.table_innertrend = res.data.result.innertrend;
				that.table_gate1_kaidu = res.data.result.gate1_kaidu;
				that.table_gate2_kaidu = res.data.result.gate2_kaidu;
				that.table_gate3_kaidu = res.data.result.gate3_kaidu;
				that.table_gate4_kaidu = res.data.result.gate4_kaidu;
				that.table_gate5_kaidu = res.data.result.gate5_kaidu;
				that.table_gate6_kaidu = res.data.result.gate6_kaidu;
				that.table_gate7_kaidu = res.data.result.gate7_kaidu;
				that.table_gate8_kaidu = res.data.result.gate8_kaidu;
				that.table_gate9_kaidu = res.data.result.gate9_kaidu;
				that.table_gate10_kaidu = res.data.result.gate10_kaidu;
				that.table_pump1_current = res.data.result.pump1_current;
				that.table_pump2_current = res.data.result.pump2_current;
				that.table_pump3_current = res.data.result.pump3_current;
				that.table_pump4_current = res.data.result.pump4_current;
				that.table_pump5_current = res.data.result.pump5_current;
				that.table_pump6_current = res.data.result.pump6_current;
				that.table_pump7_current = res.data.result.pump7_current;
				that.table_pump8_current = res.data.result.pump8_current;
				that.table_pump9_current = res.data.result.pump9_current;
				that.table_pump10_current = res.data.result.pump10_current;
				console.log(that.tableData);
			}
			this.ajaxPost(params);
		},
		getAlermData: function(page) {
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
		},
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
			if (row.water_river_in > row.inner_limit) {
				return 'bg-red';
			}
			if (row.water_river_out > row.outer_limit) {
				return 'bg-red';
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
		getWaterData: function() {
				// this.getParameter("aa");
				//console.log(123456);
				var stn_name = this.$route.query.searchValue;
				console.log(stn_name);
				var that = this;
                var params = {};
                params.data = {};
                params.data.searchValue={}; 
                params.data.system_id = parameters.system_id;
                params.data.page = 1;
                params.order={"date_time":-1};
                params.token = this.getKey('token');
                params.url = this.urlWaterDataList;
                params.data.stn_name = stn_name;
                params.success = function(res) {
                        that.$Loading.finish();
                        that.$store.state.isLoadingShow = false;
                        //console.log(res.data.result);
                        that.CreateWaterLevlEchart(res.data.result,stn_name);          
                    }
                this.$store.state.isLoadingShow = true;
                this.ajaxPost(params);
		},
		CreateWaterLevlEchart: function(obj, name) {
			let option = {};
			let myChart = echarts.init(document.getElementById("waterLevelChart"));
			//console.log(myChart);
			console.log(obj);
			var todayinnerData = [];
			var todayouterData = [];
			var yesterdayinnerData = [];
			var yesterdayouterData = [];
			var max_tidal_time = [];
			var min_tidal_time = [];
			var chaoweiData = [];
			var xDatas = [];
			var titleData = [];
			if(obj.today) {
				var todayDate = obj.today[0].data_time.substring(5, 10)
				for(var i in obj.today) {
					todayinnerData.push(obj.today[i].water_river_in);
					todayouterData.push(obj.today[i].water_river_out);
					xDatas.push(obj.today[i].data_time.substring(11, 16));
				}
				titleData = [todayDate + "内江", todayDate + "外江"]
			}
			if(obj.yesterday) {
				xDatas = [];
				var yesterdayDate = obj.yesterday[0].data_time.substring(5, 10)
				for(var i in obj.yesterday) {
					yesterdayinnerData.push(obj.yesterday[i].water_river_in);
					yesterdayouterData.push(obj.yesterday[i].water_river_out);
					xDatas.push(obj.yesterday[i].data_time.substring(11, 16));
				}
				var neijiang = yesterdayDate + "内江";
				var waijiang = yesterdayDate + "外江"
				titleData.push(neijiang, waijiang);
			}

			console.log(chaoweiData);
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
					text: name + '24小时水位曲线',
				},
				legend: {
					data: titleData,
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
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: xDatas,
					axisLabel: { interval: 24 }
				}],
				yAxis: [{
					type: 'value',
					axisLabel: {
						formatter: '{value} 米'
					}
				}],
				series: [{
					name: todayDate + '内江',
					type: 'line',
					data: todayinnerData,
					symbol: 'none'

				}, {
					name: todayDate + '外江',
					type: 'line',
					showSymbol: false,
					data: todayouterData,

				}, {
					name: yesterdayDate + '内江',
					type: 'line',
					showSymbol: false,
					data: yesterdayinnerData

				}, {
					name: yesterdayDate + '外江',
					type: 'line',
					showSymbol: false,
					data: yesterdayouterData,
				}]
			};

			myChart.setOption(option);
		},
			
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
		this.getWaterData();
		this.showTime();
		this.watchParameter1 = this.watchParameter;
		this.getTableSize('.water-electric-card', ['.ivu-card-head'], 'tableSize');

		setInterval(function() {
			that.getTableData();
			that.getWaterData();
		}, 60000);

		$(window).on('resize', function() {
			that.getTableSize('.water-electric-card', ['.ivu-card-head'], 'tableSize');
		});
	},
	created() {
		this.$bus.on('setAlermTable', this.setAlerm);
		this.$bus.emit("showTopNav");
	},
	beforeDestroy() {
		this.$bus.off('setAlermTable', this.setAlerm);
	},
}
</script>
