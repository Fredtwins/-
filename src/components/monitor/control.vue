<!-- 综合监测 -->
<style lang="less">
@import url("../../../static/less/color.less");
.control-card-group {
	*{
		font-size: 14px;
	}
	.ivu-card-body {
		height: 100%;
		padding: 0;
		overflow: hidden;
	}

	.ivu-table-small td {
		height: 25px;
	}

	.control-content {

	}
	.control-log {
		height: 43%;
		border-bottom: 1px solid #e9eaec;
		background-color: @navColor;
		
		img {
			margin-top: 3px;
		}

		p {
			color: white;
		}

		.ivu-table th{background-color: @navBg;font-weight: 900}

		.ivu-card-body {
			height: calc(~"100% - 37px");
			padding: 0;
		}
	}
	.control-sender-wrap {
		height: 57%;
		overflow: hidden;

		.ivu-card-head {
			background-color: @navColor;
		}
		
		img {
			margin-top: 3px;
		}

		p {
			color: white;
		}

		.ivu-card-body {
			height: calc(~"100% - 37px");
			padding: 10px;
			overflow: auto;
		}
	}
}
</style>


<template>
<Card dis-hover class="control-card-group h100">
	<Card dis-hover class="control-log">
		<p slot="title">
			<img src="../../../static/img/monitor/diaodu.png" height="20" width="20" alt="">
			调度记录
		</p>
		<div class="">
			<Table border stripe size="small" :height="tableSize.height" :columns="controlColumns" :data="controlData"></Table>
		</div>
	</Card>
	<Card dis-hover class="control-sender-wrap">
		<p slot="title">
			<img src="../../../static/img/monitor/send.png" height="20" width="20" alt="">
			发送指令
		</p>
		<control-sender></control-sender>
	</Card>
</Card>
</template>


<script>
	//发送指令
	import controlSender from './control-sender.vue';
    export default {
		components: {
			'control-sender': controlSender
		},
        data () {
            return {
				urlControlList: 'wtxiqiao/waterresource/wdpdispatchrec/list',
				tableSize: {
					width: 1,
					height: 1
				},
				controlColumns: [
					{
						title: '发布时间',
						key: 'send_time',
						width: 60,
						render: (h, params) => {
							var ret = params.row.send_time;
							ret = ret.substring(2);
							ret = ret.substring(0, ret.length - 3);
							return ret;
						},
					}, {
						title: '调度内容',
						key: 'order_content',
						width: 200
					}, {
						title: '执行情况',
						key: 'execu_status',
						width: 60
					}, {
						title: '执行内容',
						key: 'execu_result',
						width: 200
					}, {
						title: '发布单位',
						key: 'send_department',
						width: 150
					}
				],
				controlData: [],
            }
        },
		methods: {
			// 获取调度日志列表
			getControlList: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.pageSize = 10;
				params.data.order = {"send_time":-1};
				params.data.searchValue = {};
				params.token = this.getKey('token');
				params.url = this.urlControlList;
				params.success = function(res) {
					that.$Loading.finish();
					that.controlData = res.data.result.result;
					// console.log(res.data.result.result);
				}
				// 在这里直接调用封装的方法，传要渲染的参数进去
				this.ajaxPost(params);
			},
		},
		watch: {
			'$store.state.monitorMiddleBig': function() {
				this.getTableSize('.control-log', ['.ivu-card-head'], 'tableSize');
			}
		},
		mounted: function() {
			var that = this;
			this.getControlList();
			this.getTableSize('.control-log', ['.ivu-card-head'], 'tableSize');
			$(window).on('resize', function() {
				that.getTableSize('.control-log', ['.ivu-card-head'], 'tableSize');
			});
		},
		created() {
			this.$bus.on('updateControlList', this.getControlList);
		},
		beforeDestroy() {
			this.$bus.off('updateControlList', this.getControlList);
		},
    }
</script>
