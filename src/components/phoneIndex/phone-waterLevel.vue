
<style lang="less">
#phoneChart{
	width: 100%;
	height: 100vh;
}
</style>

<template>
	<div id="phoneChart">
		   
	</div>
</template>

<script>
	export default {
		data () {
			return {
				urlWaterDataList:"wtxiqiao/waterresource/rlddevicerunrec/waterlevel",
			}
		},
		methods: {
			getWaterData: function() {
				// this.getParameter("aa");
				//console.log(123456);
				var stn_name = this.$route.query.stn_name;
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
				let myChart = echarts.init(document.getElementById("phoneChart"));
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
				for(var i in obj.todayTidal.max_tidal_time) {
					chaoweiData.push({ name: "高潮位", xAxis: obj.todayTidal.max_tidal_time[i].substring(11, 15) + "4" })
				}
				for(var i in obj.todayTidal.min_tidal_time) {
					chaoweiData.push({ name: "低潮位", xAxis: obj.todayTidal.min_tidal_time[i].substring(11, 15) + "4" })
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
						min: -2,
						max: 4,
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
			
		},
		mounted: function() {
			this.getWaterData();
		},
		created() {
			this.$bus.emit("showTopNav");
		}	
	}
</script>
