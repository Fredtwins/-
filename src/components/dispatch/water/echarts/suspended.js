/* 首页 悬浮物趋势图echarts 的配置文件
 * @ 劳兆城
 * @ 2017-07-21 */

module.exports = {
	title: [{
		left: 'center',
		text: '悬浮物趋势图',
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
		min: 0,
		splitNumber: 10,
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
		name: '悬浮物',
		type: 'line',
		smooth: true,
		symbolSize: 12,
		data: [0.9, 0.4, 1, '', 0.4, 0.7, 0.6],
		label: {
			normal: {
				show: false,
				position: 'top' //值显示
			}
		}
	}]
};