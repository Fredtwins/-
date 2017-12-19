<!-- 首页统计 -->
<style lang="less">
	@import url("../../../static/less/color.less");
	*{
		margin: 0;
		padding: 0;
	}
	.statistics_chart{
		.ivu-card-body{
				padding: 7px;
			}
		.ivu-card{
			background-color: rgb(228,246,255);
		}
		.card1{
			.ivu-card-body{
				padding: 16px;
			}
			margin: 10px 8px 10px 10px;
		}
		.card2{
			.ivu-card-body{
				padding: 16px;
			}
			margin: 10px 10px 10px 0; 
		}
		.card3{
			margin: 0 8px 10px 10px;
		}
		.card4{
			margin: 0 8px 10px 0px;
		}
		.card5{
			margin: 0 8px 10px 0px;
		}
		.card6{
			margin: 0 10px 10px 0px;
		}
		.card7{
			margin: 0 8px 10px 10px;
		}
		.card8{
			margin: 0 8px 10px 0px;
		}
		.card9{
			margin: 0 10px 10px 0px;
		}
		.ivu-card-head p{
			height: 32px!important;
			line-height: 32px;
		}
		.dataNone {
			width: 100%;
			height: calc(~"(100vh - 108px)/3");
			text-align: center;
			font-size: 18px;
			line-height: calc(~"(100vh - 108px)/3");
		}
		.staticChart {
			width: 100%;
			height: calc(~"(100vh - 108px)/3");
			overflow: hidden;
			padding: -8px;
		}
		
		.smallshow {
			float: left;
			width: 79px;
			text-align: center;
		}
		//渐变色的添加
		.bgchange{
			background: -webkit-linear-gradient(left, @gradientColor, @gradientColor2); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor, @gradientColor2); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor, @gradientColor2); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor , @gradientColor2); /* 标准的语法 */
		}
		.bgchange2{
			background: -webkit-linear-gradient(left, @gradientColor2, @gradientColor); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor2, @gradientColor); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor2, @gradientColor); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor2 , @gradientColor); /* 标准的语法 */
		}
		.bgchange3{
			background: -webkit-linear-gradient(left, @gradientColor3, @gradientColor4); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor3, @gradientColor4); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor3, @gradientColor4); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor3 , @gradientColor4); /* 标准的语法 */
		}
		.bgchange4{
			background: -webkit-linear-gradient(left, @gradientColor4, @gradientColor3); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor4, @gradientColor3); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor4, @gradientColor3); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor4, @gradientColor3); /* 标准的语法 */
		}
		.bgchange5{
			background: -webkit-linear-gradient(left, @gradientColor4, @gradientColor5); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor4, @gradientColor5); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor4, @gradientColor5); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor4, @gradientColor5); /* 标准的语法 */
		}
		.bgchange6{
			background: -webkit-linear-gradient(left, @gradientColor5, @gradientColor4); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor5, @gradientColor4); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor5, @gradientColor4); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor5, @gradientColor4); /* 标准的语法 */
		}
		.bgchange7{
			background: -webkit-linear-gradient(left, @gradientColor2, @gradientColor3); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor2, @gradientColor3); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor2, @gradientColor3); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor2, @gradientColor3); /* 标准的语法 */
		}
		.bgchange8{
			background: -webkit-linear-gradient(left, @gradientColor3, @gradientColor2); /* Safari 5.1 - 6.0 */
		    background: -o-linear-gradient(right, @gradientColor3, @gradientColor2); /* Opera 11.1 - 12.0 */
		    background: -moz-linear-gradient(right, @gradientColor3, @gradientColor2); /* Firefox 3.6 - 15 */
		    background: linear-gradient(to right, @gradientColor3, @gradientColor2); /* 标准的语法 */
		}
		.top-block{
			display: inline-block;
			margin-left: 8px;
			width: 23.6%;
			height: 100px;
			border-radius: 15px;
			border: 1px solid #cccccc;
			text-align: center;

			span{
				font-size: 40px;
				color: white;
			}
			p{
				font-size: 14px;
				color: white;
			} 
		}
		.span24 {
			width: 100%!important;
		}
		.spanblue{
			font-size: 18px;
			color: @navColor;
		}
	}
	
	
</style>

<template>
	<div class="statistics_chart">

		<Row>
			<i-col span="24" class="topCallapse">
				<Row >
					<i-col span="24">
						<Row>
							<i-col span="12">
								<Card :bordered="false" dis-hover class="card1">
					                <p slot="title">
					                	总体运行情况
					                	<Select v-model="stn_name" style="width:200px;float: right;margin-right: 15px">
		                                    <Option v-for="item in stnName" :value="item" :key="item">{{ item }}</Option>
		                                </Select>
					                </p>
					                <div class="top-block bgchange">
					                	<span>{{alldivDay}}</span>
										<p class="inline">{{stn_name}}一小时内江最高水位</p>
					                </div>
					                <div class="top-block bgchange2">
					                	<span>{{alldivMonth}}</span>
					                	<p class="inline">{{stn_name}}一小时内江最低水位</p>
					                </div>
					                <div class="top-block bgchange3">
					                	<span>{{alldraDay}}</span>	
					                	<p class="inline">{{stn_name}}一小时外江最高水位</p>
					                </div>
					                <div class="top-block bgchange4">
					                	<span>{{alldraMonth}}</span>
					                	<p class="inline">{{stn_name}}一小时外江最高水位</p>
					                </div>
					               
					            </Card>
							</i-col>
							<i-col span="12">
								<Card :bordered="false" dis-hover class="card2">
					                <p slot="title">
					                	<Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
					                	当前运行情况
					                </p>
					                <div class="top-block bgchange5">
					                	<span>{{pump_open}}</span>
										<p class="inline">泵站开机总数</p>
					                </div>
					                <div class="top-block bgchange6">
					                	<span>{{pump_close}}</span>
										<p class="inline">泵站停机总数</p>
					                </div>
					                <div class="top-block bgchange7">
					                	<span>{{gate_open}}</span>
										<p class="inline">闸站开机总数</p>
					                </div>
					                <div class="top-block bgchange8">
					                	<span>{{gate_close}}</span>
										<p class="inline">闸站停机总数</p>
					                </div>
					                
					            </Card>
							</i-col>
						</Row>
					</i-col>
					<i-col span="24">
						<Row>
							<i-col span="12">
								<Card :bordered="false" class="card3" dis-hover>
									<p slot="title">{{stn_name}}当日水位曲线</p>
									<div class="staticChart staticChart5"></div>
								</Card>	
							</i-col>
							<i-col span="6">
								<Card :bordered="false" class="card5" dis-hover>
									<p slot="title">30天内泵站运行时间</p>
									<div class="staticChart staticChart3"></div>
								</Card>
							</i-col>
							<i-col span="6">
								<Card :bordered="false" class="card6" dis-hover>
									<p slot="title">30天内闸站运行时间</p>
									<div class="staticChart staticChart4"></div>
								</Card>
							</i-col>
						</Row>
					</i-col>
					<i-col span="24">
						<Row>
							<i-col span="12">
								<Card :bordered="false" class="card7" dis-hover>
									<p slot="title">{{stn_name}}昨日水位曲线
									</p>
									<div class="staticChart staticChart5"></div>
								</Card>
								
							</i-col>
							<i-col span="6">
								<Card :bordered="false" class="card8" dis-hover>
									<p slot="title">
										当月雨量统计
										<Select v-model="stn_name2" style="width:160px;float: right">
                                               <Option v-for="item in stnName2" :value="item" :key="item">{{ item }}</Option>
                                        </Select>
									</p>
									<div class="staticChart staticChart6"></div>
								</Card>
							</i-col>
							<i-col span="6">
								<Card :bordered="false" class="card9" dis-hover>
									<p slot="title">当月调度次数</p>
									<div class="staticChart staticChart7"></div>
								</Card>
							</i-col>
						</Row>
					</i-col>	
				</Row>		
			</i-col>
		</Row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				urlWaterDataList: "wtxiqiao/waterresource/rlddevicerunrec/waterlevel",
				urlRainFallList: "wtxiqiao/waterresource/rldrainhis/list",
				urlControlList: 'wtxiqiao/waterresource/wdpdispatchrec/stat',
				urlWaterStnameList: "wtxiqiao/waterresource/rlddevicerunrec/distinct",
				urlPumpDataList: "wtxiqiao/waterresource/restat/restat",
				urlRunNumList: "wtxiqiao/waterresource/rlddevicerunrec/num",
				urlRainNameList:"wtxiqiao/waterresource/rldrainhis/distinct",
				urlWaterExtremumList:"wtxiqiao/waterresource/statwaterlevel/list",
				waterHistoryData2: [],
				rainData: [],
				dispathData: [],
				small: false,
				stnName: [],
				stnName2: [],
				stn_name: "太平船闸",
				stn_name2: "南海西樵新田小学",
				allData: [],
				PumpData: [],
				GateData: [],
				value1: '1',
				value2: '2',
				value3: '3',
				alldraDay: "",
				alldivDay: "",
				alldraMonth: "",
				alldivMonth: "",
				pump_open: "",
				pump_close: "",
				gate_close: "",
				gate_open: "",
			}
		},
		methods: {
			clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
			//水位曲线的站名	
			getWaterStnameList: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.pageSize = 50;
				params.data.type = 'String';
				params.data.fieldName = 'stn_name';
				params.data.searchValue = {};
				params.data.searchValue.town = "西樵";
				params.token = this.getKey('token');
				params.url = this.urlWaterStnameList;
				//console.log(params);
				params.success = function(res) {
					that.$Loading.finish();
					that.stnName = res.data.result;
					//console.log(res.data.result);
				}
				this.ajaxPost(params);
			},
			//水位曲线的数据
			getData: function(name) {
				this.waterHistoryData2 = [];
				var that = this;
				var params = {};
				var myDate = new Date();
				params.data = {};
				params.data.searchValue = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.order = { "date_time": -1 };
				params.data.searchValue.data_time = [myDate.format("yyyy-MM-dd")];
				params.data.stn_name = name;
				params.token = this.getKey('token');
				params.url = this.urlWaterDataList;
				params.success = function(res) {
					that.$Loading.finish();
					that.waterHistoryData2.unshift(res.data.result);
					that.CreateWaterLevlEchart(that.waterHistoryData2, name ,0);
				}
				this.ajaxPost(params);
				setTimeout(function(){
					params.data.searchValue.data_time = [new Date(myDate.getTime()-24*3600*1000).format('yyyy-MM-dd')]
					params.success = function(res) {
						that.waterHistoryData2.unshift(res.data.result);
						that.CreateWaterLevlEchart(that.waterHistoryData2, name ,1);
					}
					that.ajaxPost(params);
				},300)
				
			},
			//水位曲线的画图方法
			CreateWaterLevlEchart: function(obj, name ,j) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("staticChart5")[j]);

				var todayinnerData = [];
				var todayouterData = [];
				var yesterdayinnerData = [];
				var yesterdayouterData = [];
				var maxLevel;
				var minLevel;
				var chaoweiData = [];
				var xDatas = [];
				var titleData = [];
				obj = obj[0];
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
						axisLabel: { interval: 23 }
					}],
					yAxis: [{
						type: 'value',
						min: minLevel,
						max: maxLevel,
						axisLabel: {
							formatter: '{value} 米'
						}
					}],
					series: [{
						name: todayDate + '内江',
						type: 'line',
						data: todayinnerData,
						symbol: 'none',

					}, {
						name: todayDate + '外江',
						type: 'line',
						showSymbol: false,
						data: todayouterData,

					}, {
						name: yesterdayDate + '内江',
						type: 'line',
						showSymbol: false,
						data: yesterdayinnerData,
					}, {
						name: yesterdayDate + '外江',
						type: 'line',
						showSymbol: false,
						data: yesterdayouterData,
					}]
				};

				myChart.setOption(option);
			},
			//获取雨量数据
			getRainFallData: function(name) {

				var that = this;
				var params = {};
				var myDate = new Date();
				params.data = {};
				params.data.searchValue = {};
				params.data.page = 1;
				params.data.pageSize = 50;
				params.order = { "data_time": -1 };
				params.token = this.getKey('token');
				params.url = this.urlRainFallList;
				params.data.searchValue.stn_name = name;
				params.data.searchValue.data_interval = "D1";
				params.data.searchValue.data_time = myDate.format("yyyy-MM") + "-01 00:00:00|#|" + myDate.format("yyyy-MM") + "-31 23:59:59";
				params.data.system_id = parameters.system_id;
				params.success = function(res) {
					that.$Loading.finish();
					that.$store.state.isLoadingShow = false;
					that.rainData = res.data.result;
					that.mapCreateEchart(that.rainData);
				}
				this.$store.state.isLoadingShow = true;
				this.ajaxPost(params);
			},
			//雨量柱状图
			mapCreateEchart: function(obj) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("staticChart6")[0]);
				if(obj.result.length == 0){
					var yDatas = [];
					var xDatas = [];
					option = {
							color: ['#3398DB'],
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: [{
								type: 'category',
								data: xDatas,
								axisTick: {
									alignWithLabel: true
								}
							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
									formatter: '{value} ml'
								}
							}],
							series: [{
								name: '累计雨量',
								type: 'bar',
								barWidth: 20,
								data: yDatas,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                            offset: 0,
					                            color: 'rgb(79,206,176)'
					                        }, {
					                            offset: 1,
					                            color: 'rgb(64,176,255)'
					                        }]),
									}
								}
							}]
						};
					myChart.setOption(option);	
				}
				switch(obj.result[0].data_interval) {
					case "D1":
						var yDatas = [];
						var xDatas = ["1号", "2号", "3号", "4号", "5号", "6号", "7号", "8号", "9号", "10号", "11号", "12号", "13号", "14号", "15号", "16号", "17号", "18号", "19号", "20号", "21号", "22号", "23号", "24号", "25号", "26号", "27号", "28号", "29号", "30号", "31号"];
						obj.result.map(item => {
							yDatas.push(item.rainfull);
						})
						//console.log(yDatas);
						//console.log(xDatas);
						option = {
							color: ['#3398DB'],
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: [{
								type: 'category',
								data: xDatas,
								axisTick: {
									alignWithLabel: true
								}
							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
									formatter: '{value} ml'
								}
							}],
							series: [{
								name: '累计雨量',
								type: 'bar',
								barWidth: 20,
								data: yDatas,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                            offset: 0,
					                            color: 'rgb(79,206,176)'
					                        }, {
					                            offset: 1,
					                            color: 'rgb(64,176,255)'
					                        }]),
									}
								}
							}]
						};
						break;
				} 
				myChart.setOption(option);
			},
			//获取调度次数的数据
			getDIspathData: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.order = {};
				params.data.searchValue = {};
				params.token = this.getKey('token');
				params.url = this.urlControlList;
				params.success = function(res) {
					that.$Loading.finish();
					that.dispathData = res.data.result.result;
					that.mapCreateDispathEchart(that.dispathData);
				}
				this.ajaxPost(params);
			},
			//调度次数的柱状图
			mapCreateDispathEchart: function(arr) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("staticChart7")[0]);
				var yDatas = [];
				var xDatas = [];
				arr.map(item => {
					xDatas.push(item.station_name)
					yDatas.push(item.num);
				})
				option = {
					color: ['#3398DB'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: xDatas,
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							rotate: -15,
							interval: 0
						}
					}],
					yAxis: [{
						type: 'value',
						min: 0,
						max: function(value){
							return value.max + 3;
						},
						axisLabel: {
									formatter: '{value} 次'
								},

					}],
					series: [{
						name: '累计次数',
						type: 'bar',
						barWidth: 20,
						data: yDatas,
						itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                            offset: 0,
					                            color: 'rgb(255,159,81)'
					                        }, {
					                            offset: 1,
					                            color: 'rgb(216,71,71)'
					                        }]),
									}
						}
					}]
				};
				myChart.setOption(option);
			},
			//获取泵，闸运行时间和排水引水情况
			getAllData: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.order = {};
				params.data.searchValue = {};
				params.token = this.getKey('token');
				params.url = this.urlPumpDataList;
				params.success = function(res) {
					that.$Loading.finish();
					that.GateData = res.data.result.gate;
					that.PumpData = res.data.result.pump;
					setTimeout(function(){
						that.CreatePumpRunTimeEchart(that.PumpData);
						that.CreateGateRunTimeEchart(that.GateData);
					},200);
				}
				this.ajaxPost(params);
			},
			//泵站运行时间
			CreatePumpRunTimeEchart: function(arr) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("staticChart3")[0]);
				var yDatas = [];
				var xDatas = [];
				if(arr.length === 0){
					return
				}
				for(var j =0;j < arr.length;j++){
					xDatas.push(arr[j]._id)
					yDatas.push(arr[j].runtime);
				}
				option = {
							color: ['#3398DB'],
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							grid: {
								left: '3%',
								right: '4%',
								containLabel: true
							},
							xAxis: [{
								type: 'category',
								data: xDatas,
								axisLabel: {
									rotate: -15,
									interval: 0
								},
								axisTick: {
									alignWithLabel: true
								}
							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
									formatter: '{value} 小时'
								}
							}],
							series: [{
								name: '泵站运行时间',
								type: 'bar',
								barWidth: 20,
								data: yDatas,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                            offset: 0,
					                            color: 'rgb(202,58,255)'
					                        }, {
					                            offset: 1,
					                            color: 'rgb(64,176,255)'
					                        }]),
									}
								}
							}]
						};
				myChart.setOption(option);		
			},
			//闸站运行时间
			CreateGateRunTimeEchart: function(arr) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("staticChart4")[0]);
				var yDatas = [];
				var xDatas = [];
				if(arr.length === 0){
					return
				}
				for(var j =0;j < arr.length;j++){
					xDatas.push(arr[j]._id)
					yDatas.push(arr[j].runtime);
				}
				option = {
							color: ['#3398DB'],
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							grid: {
								left: '3%',
								right: '4%',
								containLabel: true
							},
							xAxis: [{
								type: 'category',
								data: xDatas,
								axisLabel: {
									rotate: -15,
									interval: 0
								},
								axisTick: {
									alignWithLabel: true
								}
							}],
							yAxis: [{
								type: 'value',
								axisLabel: {
									formatter: '{value} 小时'
								}
							}],
							series: [{
								name: '闸站运行时间',
								type: 'bar',
								barWidth: 20,
								data: yDatas,
								itemStyle: {
									normal: {
										color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                            offset: 0,
					                            color: 'rgb(255,159,81)'
					                        }, {
					                            offset: 1,
					                            color: 'rgb(202,58,255)'
					                        }]),
									}
								}
							}]
						};
				myChart.setOption(option);		
			},
			//获取运行情况
			getRunNum: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.order = {};
				params.data.searchValue = {};
				params.token = this.getKey('token');
				params.url = this.urlRunNumList;
				params.success = function(res) {
					that.pump_close = res.data.result.pump_close;
					that.pump_open = res.data.result.pump_open;
					that.gate_close = res.data.result.gate_close;
					that.gate_open = res.data.result.gate_open;
				}
				this.ajaxPost(params);
			},
			//获取雨量统计的站名
			getRainName: function() {
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
                params.url = this.urlRainNameList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.stnName2 = res.data.result;
                }
                this.ajaxPost(params);
            },
            //获取水位极值的方法
            getWaterMax: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.data.page = 1;
                params.data.pageSize = 1;
                params.data.order = {"end_time":-1};
                params.data.searchValue = {
                	statis_interval : "小时",
                	level_type : "外江水位",
                	stn_name : this.stn_name
                };
                params.token = this.getKey('token');
                params.url = this.urlWaterExtremumList;
                params.success = function(res) {
                	//console.log(res)
                	that.alldraDay = res.data.result.result[0].max_level;
                	that.alldraMonth = res.data.result.result[0].min_level;
                }
                this.ajaxPost(params);
                setTimeout(function(){
                	params.data.searchValue = {
	                	statis_interval : "小时",
	                	level_type : "内江水位",
	                	stn_name : that.stn_name
	                };
	                params.success = function(res) {
	                	console.log(res)
	                	that.alldivDay = res.data.result.result[0].max_level;
	                	that.alldivMonth = res.data.result.result[0].min_level;
	                }
	                that.ajaxPost(params);
                },200)
            },
		},
		mounted: function() {
			var that = this;
			that.getWaterStnameList();
			that.getRainName();
			this.getWaterMax();
			setTimeout(function(){
				that.getAllData();
				that.getData("太平船闸");
				that.getRainFallData("南海西樵新田小学");
				that.getDIspathData();
			},100)
			
			this.getRunNum();
		},
		watch:  {
			'stn_name': function(data) {
				this.getData(data);
				this.getWaterMax();
			},
			'stn_name2': function(data) {
				this.getRainFallData(data);
			}
		}
	}
</script>