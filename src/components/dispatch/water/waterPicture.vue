/* 内河涌 弹框 水质趋势图*/

<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		.waterMenu {
			width: 150px;
		}
		.waterEchart {
			position: absolute;
			left: 150px;
			right: 0;
			bottom: 0;
			top: 40px;
			#waterEchart {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>

<template>
	<div class="water clear">
		<div class="pull-left waterMenu">
			<Menu @on-select="menuClick" active-name="ph" width="150">
				<Menu-item name="ph" style="font-size: 12px;">
					PH值 趋势图
				</Menu-item>
				<Menu-item name="suspended" style="font-size: 12px;">
					悬浮物 趋势图
				</Menu-item>
				<Menu-item name="chemistry" style="font-size: 12px;">
					化学需氧量 趋势图
				</Menu-item>
				<Menu-item name="biology" style="font-size: 12px;">
					生化需氧量 趋势图
				</Menu-item>
				<Menu-item name="ammonia" style="font-size: 12px;">
					氨氮 趋势图
				</Menu-item>
				<Menu-item name="total" style="font-size: 12px;">
					总磷 趋势图
				</Menu-item>
			</Menu>
		</div>
		<div class="pull-left waterEchart">
			<div ref="myChart" id="waterEchart"></div>
		</div>
	</div>
</template>

<script>
	import ph from './echarts/ph.js';
	import suspended from './echarts/suspended.js';
	import chemistry from './echarts/chemistry.js';
	import biology from './echarts/biology.js';
	import ammonia from './echarts/ammonia.js';
	import total from './echarts/total.js';
	export default {
		mounted: function() {
			this.$nextTick(function() {
				this.myChart = echarts.init(this.$refs.myChart);
				this.getData();
			})
		},
		data: function() {
			return {
				menuActive: 'ph',
				myChart: null,
				echartData: {}
			}
		},
		methods: {
			menuClick: function(name) {
				this.menuActive = name;
				this.getEcharts();
			},
			getData: function() {
				let _this = this;
				this.waterAjaxPost({
					url: '/sanfang/onepicture/ztwaterresultgraph/list',
					data: {
						page: 1,
						pageSize: 10,
						strivid: this.$store.state.mapCount.strivInfo.strivid
					},
					success: function(res) {
						if (res === undefined) {
							_this.echartData = {};
						}else {
							_this.echartData = res;
						}
						_this.getEcharts();
					}
				})
			},
			getEcharts: function() {
				switch(this.menuActive) {
					case 'ph':
						ph.series[0].data = this.echartData.ph;
						ph.xAxis.data = this.echartData.time;
						this.myChart.setOption(ph);
						break;
					case 'suspended':
						suspended.series[0].data = this.echartData.suspended;
						suspended.xAxis.data = this.echartData.time;
						this.myChart.setOption(suspended);
						break;
					case 'chemistry':
						chemistry.series[0].data = this.echartData.chemistry;
						chemistry.xAxis.data = this.echartData.time;
						this.myChart.setOption(chemistry);
						break;
					case 'biology':
						biology.series[0].data = this.echartData.biology;
						biology.xAxis.data = this.echartData.time;
						this.myChart.setOption(biology);
						break;
					case 'ammonia':
						ammonia.series[0].data = this.echartData.ammonia;
						ammonia.xAxis.data = this.echartData.time;
						this.myChart.setOption(ammonia);
						break;
					case 'total':
						total.series[0].data = this.echartData.total;
						total.xAxis.data = this.echartData.time;
						this.myChart.setOption(total);
						break;
				}
			}
		}
	}
</script>
