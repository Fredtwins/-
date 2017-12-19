<!-- 历史水位曲线对比 -->
<style lang="less">
	@import url("../../../static/less/color.less");
	.waterEchart {
		margin-top: 20px;
		width: 98%;
		height: 350px;
	}
</style>

<template>
	<div class="">
		<side-nav></side-nav>
		<i-col span="21">
			<Breadcrumb class="ml32">
				<Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
				<Breadcrumb-item class="black">运行分析</Breadcrumb-item>
				<Breadcrumb-item class="blue">历史水位曲线对比</Breadcrumb-item>
			</Breadcrumb>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
							<Form-item label="日期对比1" prop="start_time">
								<Date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
							</Form-item>
							<Form-item label="日期对比2" prop="end_time">
								<Date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
							</Form-item>
							<Button type="primary" @click="getData('','1')">搜索</Button>
						</Form>
					</template>
				</Panel>
			</Collapse>
			<Form :model="levelItem" :label-width="80">
            	<FormItem label="水位上限" style="width: 40%;display: inline-block;">
		            <Input v-model="maxLevel" placeholder="设置水位上限参考值"></Input>
		        </FormItem>
		        <FormItem label="水位下限" style="width: 40%;display: inline-block;">
		            <Input v-model="minLevel" placeholder="设置水位下限参考值"></Input>
		        </FormItem>
		        <Button type="info" @click="change_max_min" style="margin-left: 15px">确定</Button>
            </Form>
			<div class="waterEchart"></div>
			<div class="waterEchart"></div>
		</i-col>
	</div>
</template>

<script>
	import sideNav from '../analysis/side-nav.vue';
	export default {
		data() {
			return {

				urlWaterHistoryList: "wtxiqiao/waterresource/rlddevicerunrec/list",
				urlWaterDataList: "wtxiqiao/waterresource/rlddevicerunrec/waterlevel",
				formInline: {
					stn_name: [],
					start_time: '',
					end_time: ''
				},
				stn_name: "",
				stnName: "",
				value1: '',
				waterHistoryData2: [],
				waterRecordPage: {
					current: 1,
					pageSize: 10,
					total: 0
				},
				levelItem: {},
				maxLevel: "",
				minLevel: "",
			}
		},
		methods: {
			clickFn(name) {
				this.$router.push('/home/analysis/' + name)
			},
			change: function(data) {
				this.formInline.start_time = data;
			},
			change2: function(data) {
				this.formInline.end_time = data;
			},
			getData: function(name, type) {
				if(type == "1") {
					name = this.stnName
				} else {
					this.stnName = name
				}
				this.waterHistoryData2 = [];
				var that = this;
				var params = {};
				var MyDate = new Date();
				var todayTime = MyDate.format('yyyy-MM-dd');
				var yesterdayTime = new Date(MyDate.getTime() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
				params.data = {};
				params.data.searchValue = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.order = {
					"date_time": -1
				};
				if(name === undefined || name === "") {
					params.data.stn_name = "太平船闸";
				} else {
					params.data.stn_name = name;
					this.stn_name = name;
				}
				params.token = this.getKey('token');
				params.url = this.urlWaterDataList;
				console.log(params.data);
				this.$store.state.isLoadingShow = true;
				if(this.formInline.start_time === "" && this.formInline.end_time === "") {
					params.data.searchValue.data_time = [todayTime];
					params.success = function(res) {
						that.$Loading.finish();
						that.waterHistoryData2 = res.data.result;
						that.CreateWaterLevlEchart(that.waterHistoryData2, 0);
					}
					this.ajaxPost(params);
					setTimeout(function() {
						params.success = function(res) {
							that.$Loading.finish();
							that.waterHistoryData2 = res.data.result;
							that.CreateWaterLevlEchart(that.waterHistoryData2, 1);
						}
						params.data.searchValue.data_time = [yesterdayTime];
						that.ajaxPost(params);
					}, 300)
				} else {
					if(this.formInline.start_time !== "") {
						params.data.searchValue.data_time = [this.formInline.start_time];
						params.success = function(res) {
							that.$Loading.finish();
							that.waterHistoryData2 = res.data.result;
							that.CreateWaterLevlEchart(that.waterHistoryData2, 0);
						}
						this.ajaxPost(params);

						if(this.formInline.end_time !== "") {
							setTimeout(function() {
								params.success = function(res) {
									that.$Loading.finish();
									that.waterHistoryData2 = res.data.result;
									that.CreateWaterLevlEchart(that.waterHistoryData2, 1);
								}
								params.data.searchValue.data_time = [that.formInline.end_time];
								that.ajaxPost(params);
							}, 300)
						} else {
							var stime = new Date(new Date(this.formInline.start_time).getTime() - 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
							setTimeout(function() {
								params.success = function(res) {
									that.$Loading.finish();
									that.$store.state.isLoadingShow = false;
									that.waterHistoryData2 = res.data.result;
									that.CreateWaterLevlEchart(that.waterHistoryData2, 1);
								}
								params.data.searchValue.data_time = [stime];
								that.ajaxPost(params);
							}, 300)
						}
					} else {
						var etime = new Date(new Date(this.formInline.end_time).getTime() + 24 * 60 * 60 * 1000).format('yyyy-MM-dd');
						params.data.searchValue.data_time = [etime];
						params.success = function(res) {
							that.$Loading.finish();
							that.$store.state.isLoadingShow = false;
							that.waterHistoryData2 = res.data.result;
							that.CreateWaterLevlEchart(that.waterHistoryData2, 0);
						}
						this.ajaxPost(params);

						setTimeout(function() {
							params.success = function(res) {
								that.$Loading.finish();
								that.$store.state.isLoadingShow = false;
								that.waterHistoryData2 = res.data.result;
								that.CreateWaterLevlEchart(that.waterHistoryData2, 1);
							}
							params.data.searchValue.data_time = [that.formInline.end_time];
							that.ajaxPost(params);
						}, 300)
					}
				}

			},
			CreateWaterLevlEchart: function(obj, j) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("waterEchart")[j]);

				var todayinnerData = [];
				var todayouterData = [];
				var yesterdayinnerData = [];
				var yesterdayouterData = [];
				var maxLevel;
				var minLevel;
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
						text: this.stn_name + '24小时水位趋势',
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
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: xDatas,
						axisLabel: {
							interval: 11
						}
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
			exportData: function() {
				this.$refs.table.exportCsv({
					filename: '历史水位曲线数据'
				});
			},
			change_max_min() {
				var that = this;
				if(this.maxLevel === "") {
					this.$Message.warning('请输入参考水位上限值');
					return
				} else {
					this.setKey('maxLevel', that.maxLevel);
				}
				if(this.minLevel === "") {
					this.$Message.warning('请输入参考水位下限值');
					return
				} else {
					this.setKey('minLevel', that.minLevel);
				}
				this.maxLevel = "";
				this.minLevel = "";
				this.getData(this.stnName);
			}
		},
		mounted: function() {
			this.getData("太平船闸", '');
		},
		created() {
			this.$bus.on("stnName", this.getData);
		},
		beforeDestroy() {
			this.$bus.off("stnName", this.getData);
		},
		components: {
			'side-nav': sideNav
		}
	}
</script>