/* 首页 ph值趋势图echarts 的配置文件
 * @ 劳兆城
 * @ 2017-07-21 */

module.exports = {
	title: [{
		left: 'center',
		text: 'PH值趋势图',
		top: 20
	}],	
	color: [ '#303f9f'],
	tooltip: {
		trigger: 'axis'
	},
	grid: {
		left: '3%',
		right: '5%',
		bottom: '3%',
		top: '13%',
		containLabel: true
	},
	xAxis: {
		type: 'category',
		axisTick: {
			show: false
		},
		splitLine: { //网格线
			show: true,
			lineStyle: {
				color: ['#23303f'],
				type: 'solid'
			}
		},
		data: ['2000-06-05', '2000-06-06', '2000-06-07', '2000-06-08', '2000-06-09', '2000-06-10', '2000-06-11']
	},
	yAxis: {
		name: '值',
		min: 5,
		splitNumber: 20,
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		},
		splitLine: { //网格线
			show: true,
			lineStyle: {
				color: ['#23303f'],
				type: 'solid'
			}
		}
	},
	series: [{
		name: 'ph值',
		type: 'line',
		smooth: true,
		symbolSize: 12,
		data: ['6.2', '6.1', '6.5','7.3', '6.4', '7', '7.2'],
		label: {
			normal: {
				show: false,
				position: 'top' //值显示
			}
		}
	}]
}