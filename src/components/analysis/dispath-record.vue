<style lang="less" scoped>
	@import url("../../../static/less/color.less");
	.controlEchart {
		height: 400px;
	}
</style>

<template>
	<div class="">
		<i-col span="24">
			<Breadcrumb class="ml32">
				<Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
				<Breadcrumb-item class="black">调度分析</Breadcrumb-item>
				<Breadcrumb-item class="blue">调度统计</Breadcrumb-item>
			</Breadcrumb>
			<Button class="exportBtn" style="margin-left: 5px" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :labelWidth="60">
							<Form-item label="月份" prop="reply_time">
								<Date-picker type="date" placeholder="选择月份" format="yyyy-MM" @on-change="change"></Date-picker>
							</Form-item>
							<Form-item label="开始时间" prop="start_time">
								<Date-picker type="date" placeholder="选择月份" format="yyyy-MM-dd" @on-change="change1"></Date-picker>
							</Form-item>
							<Form-item label="结束时间" prop="end_time">
								<Date-picker type="date" placeholder="选择月份" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
							</Form-item>
							<Form-item>
								<Button type="primary" @click="submitSearch">搜索</Button>
							</Form-item>
						</Form>
					</template>
				</Panel>
			</Collapse>
			<i-col span="12">
				<div class="center">
					<Table ref="table" :data="controlData" :columns="controlColumns" stripe></Table>
					<Page class="pull-right" :total="waterRecordPage.total" :current="waterRecordPage.current" size="small" show-total @on-change="changePage"></Page>
				</div>
			</i-col>
			<i-col span="12">
				<div class="controlEchart"></div>
			</i-col>
		</i-col>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				urlControlList: 'wtxiqiao/waterresource/wdpdispatchrec/stat',
				formInline: {
					reply_time: '',
					start_time: '',
					end_time: ''
				},
				stnName: [],
				value1: "",
				controlData: [],
				controlColumns: [{
					title: '站名',
					key: "station_name"
				}, {
					title: '时间',
					key: 'month'
				}, {
					title: '调度次数',
					key: 'num'
				}],
				waterRecordPage: {
					current: 1,
					pageSize: 10,
					total: 0
				},
			}
		},
		methods: {
			clickFn(name) {
				this.$router.push('/home/analysis/' + name)
			},
			//搜索的方法，参数是页码
			submitSearch: function(page) {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				if(typeof page === "string" || typeof page === "number") {
					params.data.page = parseInt(page);
				} else {
					params.data.page = 1;
				}
				params.data.pageSize = 10;
				params.data.order = {};
				params.data.searchValue = {};
				params.token = this.getKey('token');
				params.url = this.urlControlList;
				if(this.formInline.reply_time !== "") {
					params.data.searchValue.reply_time = this.formInline.reply_time + "-01 00:00:00|#|" + this.formInline.reply_time + "-31 23:59:59";
				}
				// 如果结束时间没选择就提示
				if(this.formInline.start_time !== "") {
					if(this.formInline.end_time === "") {
						this.$Notice.warning({
							title: '请选择结束时间'
						});
						return;
					} else {
						params.data.searchValue.start_time = this.formInline.start_time;
						params.data.searchValue.end_time = this.formInline.end_time;
					}
				} else {
					if(this.formInline.end_time !== "") {
						this.$Notice.warning({
							title: '请选择开始时间'
						});
						return;
					}
				}
				// 成功回调
				params.success = function(res) {
					that.$Loading.finish();
					that.controlData = res.data.result.result;
					that.waterRecordPage.total = res.data.result.totalSize;
					console.log(res.data.result);
					that.mapCreateEchart(res.data.result.result);
				}
				this.ajaxPost(params);
			},
			//分页
			changePage: function(page) {
				this.submitSearch(page);
			},
			//为了使用iview的时间选择器直接获取yyyy-mm-dd格式的方法
			change: function(data) {
				this.formInline.send_time = data;
			},
			//为了使用iview的时间选择器直接获取yyyy-mm-dd格式的方法
			change1: function(data) {
				this.formInline.start_time = data;
			},
			//为了使用iview的时间选择器直接获取yyyy-mm-dd格式的方法
			change2: function(data) {
				this.formInline.end_time = data;
			},
			//柱状图
			mapCreateEchart: function(arr) {
				let option = {};
				let myChart = echarts.init(document.getElementsByClassName("controlEchart")[0]);
				var yDatas = [];
				var xDatas = [];
				arr.map(item => {
					xDatas.push(item.station_name)
					yDatas.push(item.num);
				})
				option = {
					color: ['#3398DB'],
					title: {
						text: '月调度次数统计图',
						left: '5%',
						top: 20
					},
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
						},
						axisLabel: {
							interval: 0
						}
					}],
					yAxis: [{
						type: 'value',
						min: 0,
						max: function(value) {
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
						data: yDatas
					}]
				};
				myChart.setOption(option);
			},
			//导出csv数据的方法
			exportData: function() {
				this.$refs.table.exportCsv({
					filename: '调度统计数据'
				});
			}
		},
		mounted: function() {
			this.submitSearch();
		}
	}
</script>