<!--发送指令-->
<style lang="less">
.control-sender {
	.control-sender-block {
		padding-bottom: 10px;

		.ivu-select-dropdown {
			max-height: 170px;
		}
	}
	.submitBtn {
		margin-top: 10px;
		text-align: center;
	}
}
</style>

<template>
	<div class="control-sender">
		<Row>
			<Col span="12" style="padding: 0 5px 0 0;">
				<div class="control-sender-block">
					调度方向
					<Select v-model="directionSelect" clearable>
						<Option v-for="item in direction" :value="item.value" :key="item">{{ item.name }}</Option>
					</Select>
				</div>
			</Col>
			<Col span="12" style="padding: 0 0 0 5px;">
				<div class="control-sender-block">
					选择片区
					<Select v-model="stationAreaSelect" clearable>
						<Option v-for="item in stationArea" :value="item">{{ item }}</Option>
					</Select>
				</div>
			</Col>
		</Row>
		<div class="control-sender-block">
			选择站点
			<Select v-model="stationSelect" clearable style="width:200px">
				<Option-group label="引水">
					<template v-if="directionSelect === '' || directionSelect === 'diversion'" v-for="i in station.diversion">
						<Option v-if="stationAreaSelect === '' || i.area_name === stationAreaSelect" v-for="item in i.stn_name" :value="item" :key="item">{{ item }}</Option>
					</template>
				</Option-group>
				<Option-group label="排水">
					<template v-if="directionSelect === '' || directionSelect === 'drainage'" v-for="i in station.drainage">
						<Option v-if="stationAreaSelect === '' || i.area_name === stationAreaSelect" v-for="item in i.stn_name" :value="item" :key="item">{{ item }}</Option>
					</template>
				</Option-group>
			</Select>
		</div>
		<div class="control-sender-block">
			选择指令
			<Select v-model="orderSelect" clearable style="width:200px">
				<Option v-for="item in orderList" :value="item.content_template" :key="item">{{ item.order_name }}</Option>
			</Select>
		</div>
		<div class="control-sender-block">
			<p>调度内容</p>
			<Input v-model="submitContent" type="textarea" placeholder="" :rows="3"></Input>
			<div class="submitBtn">
				<Button type="primary" @click="submitControl">发送</Button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				urlStationList: 'wtxiqiao/waterresource/wdpdispatchrec/listsite',
				urlOrderList: 'wtxiqiao/waterresource/wdpordertemplate/list',
				urlOrderSubmit: 'wtxiqiao/waterresource/wdpdispatchrec/new',
				directionSelect: '',
				direction: [
					{name: '引水', value: 'diversion'},
					{name: '排水', value: 'drainage'}
				],
				stationAreaSelect: '',
				stationArea: ['大栅片', '桑园片', '其他片区'],
				stationSelect: [],
				station: {
					// 引水
					diversion: [{stn_name: ['加载中...']}],
					// 排水
					drainage: [],
				},
				orderSelect: '',
				orderList: [{
                    content_template: '',
                    order_name: '加载中...'
                }],
				submitContent: ''
			}
		},
		methods: {
			// 指令提交
			submitControl: function () {
				if (this.stationSelect.length === 0) {
					this.$Notice.warning({
						title: '请选择站点'
					});
					return;
				}
				if (this.orderSelect === '') {
					this.$Notice.warning({
						title: '请选择指令'
					});
					return;
				}

				var orderJson = null;
				for(var i in this.orderList) {
					if (this.orderList[i].content_template === this.orderSelect) {
						orderJson = this.orderList[i];
						break;
					}
				}

				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.data.order_code = orderJson.order_code;
				params.data.order_content = this.submitContent;
				params.data.order_name = orderJson.order_name;
				params.data.order_type = orderJson.order_type;
				params.data.station_name = [this.stationSelect];
				console.log(this.stationSelect);
				params.url = this.urlOrderSubmit;
				params.success = function(res) {
					that.$Loading.finish();
					if (res.data.code === '0000') {
						that.$Message.success('添加成功');
						// 更新调度记录列表
						that.$bus.emit('updateControlList');
					} else {
						that.$Message.error('添加失败' + res.data.message);
					}
					console.log(res.data.result);
					//this.$store.state.isLoadingShow = false;
				}
				//this.$store.state.isLoadingShow = true;
				this.ajaxPost(params);
			},
			// 获取站点名列表
			getStationList: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlStationList;
				params.success = function(res) {
					that.$Loading.finish();
					that.station = res.data.result;
					// console.log(res.data.result);
				}
				this.ajaxPost(params);
			},
			// 获取‘选择指令’内容
			getOrderList: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.pageSize = 50;
				params.data.searchValue = {};
				params.token = this.getKey('token');
				params.url = this.urlOrderList;
				params.success = function(res) {
					that.$Loading.finish();
					that.orderList = res.data.result.result;
					// console.log(res.data.result.result);
				}
				this.ajaxPost(params);
			},
		},
		watch: {
			orderSelect: function() {
				this.submitContent = this.orderSelect;
			},
		},
		mounted: function() {
			this.getStationList();
			this.getOrderList();
		}
	}
</script>
