<!--发送指令-->
<style lang="less">
.control-sender {
	.control-sender-block {
    font-size: 14px;
    color: rgb(49,49,49);
		.ivu-select-dropdown {
			max-height: 150px;
		}
    .ivu-select-selection{
      height: 40px;
    }
	}
	.submitBtn {
		text-align: right;
	}
}
</style>

<template>
	<div class="control-sender">
				<div class="control-sender-block">
					调度方向
					<Select v-model="directionSelect" clearable style="width: 300px">
						<Option v-for="item in direction" :value="item.value" :key="item">{{ item.name }}</Option>
					</Select>
				</div>
				<div class="control-sender-block">
					选择片区
					<Select v-model="stationAreaSelect" clearable style="width: 300px">
						<Option v-for="item in stationArea" :value="item">{{ item }}</Option>
					</Select>
				</div>
		<div class="control-sender-block">
			选择站点
			<Select v-model="stationSelect" multiple clearable style="width: 300px">
				<Option-group label="引水">
					<template v-if="directionSelect === '' || directionSelect === 'diversion'" v-for="i in station.diversion">
						<Option v-if="stationAreaSelect === '' || i.area_name === stationAreaSelect"  v-for="item in i.stn_name" :value="item" :key="item">{{ item }}</Option>
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
			<Select v-model="orderSelect" clearable style="width: 300px">
				<Option v-for="item in orderList" :value="item.content_template" :key="item">{{ item.order_name }}</Option>
			</Select>
		</div>
		<div class="control-sender-block">
			<span style="display: block;margin-bottom: 5px">调度内容</span>
			<Input v-model="submitContent" type="textarea" placeholder="" :autosize="{minRows: 2,maxRows: 5}"></Input>
			<div class="submitBtn">
				<Button type="primary" style="width: 80px" @click="submitControl">发送</Button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
    components: {
    },
		data () {
			return {
				urlStationList: 'wtxiqiao/waterresource/wdpdispatchrec/listsite',
				urlOrderList: 'wtxiqiao/waterresource/wdpordertemplate/list',
				urlOrderSubmit: 'wtxiqiao/waterresource/wdpdispatchrec/new',
        isFistLoad: true,
				directionSelect: '',
				direction: [
					{name: '引水', value: 'diversion'},
					{name: '排水', value: 'drainage'}
				],
				stationAreaSelect: '',
        stationArea: ['大栅片', '桑园片', '西岸片', '其他片区'],
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
      initialControlSender: function () {
        if(this.isFistLoad){
          this.isFistLoad = false;
          this.getStationList();
          this.getOrderList();
        }

      },
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
				params.data.station_name = this.stationSelect;
				params.url = this.urlOrderSubmit;
				//console.log(params);
				params.success = function(res) {
					that.$Loading.finish();
					if (res.data.code === '0000') {
						that.$Message.success('添加成功');
            if(that.orderJson.order_name==='关闸'||that.orderJson.order_name==='关泵'){
             // that.$refs.leftRead.loadreadContent[0][3].selected=false;

            }else{
              //that.$refs.leftRead.loadreadContent[0][3].selected=true;
            }
            //刷新地图
            //that.$refs.leftRead.refreshPointOverLayer();
					} else {
						that.$Message.error('添加失败' + res.data.message);
					}
					console.log(res.data.result);
				}
				this.$store.state.isLoadingShow = true;
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
    created () {
        this.$bus.on('initialControlSender',this.initialControlSender);
    },
    beforeDestroy () {
        this.$bus.off('initialControlSender',this.initialControlSender);
    },
		mounted: function() {

		}
	}
</script>
