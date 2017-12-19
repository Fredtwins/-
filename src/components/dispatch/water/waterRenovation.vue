/* 内河涌 弹框 整治方案页
 */

<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		.renovationInfo {
			width: 410px;
			top: 5px;
			/*bottom: 0;*/
			left: 5px;
			padding: 5px;
			border: 1px solid #dddee1;
			border-radius: 5px;
		}
		.renovationTable {
			width: 595px;
			top: 5px;
			bottom: 0;
			right: 5px;
		}
		.footer {
			bottom: 10px;
			right: 10px;
		}
	}
</style>

<template>
	<div class="water clear relative">
		<div class="pull-left renovationInfo absolute">
			<Form :model="water" :label-width="115">
				<Form-item label="河涌沿线及周边的截污、治污情况概述">
					<Input v-model="water.staininfo" type="textarea" :rows="3" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="历史整治情况">
					<Input v-model="water.hishandleinfo" type="textarea" :rows="3" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="河涌计划整治的目标及时间">
					<Input v-model="water.planinfo" type="textarea" :rows="3" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="计划整治时间">
					<Date-picker :value="water.plandate" @on-change="dateChange" placement="right" type="date" placeholder="选择日期"></Date-picker>
				</Form-item>
			</Form>
			<Button @click.native="editWater" class="pull-right" type="primary" size="small">保存</Button>
		</div>
		<div class="pull-left renovationTable absolute">
			<loading v-show="!showTable"></loading>
			<Table v-if="showTable" @on-selection-change="selectChange" :columns="table.thead" :data="table.tbody" :height="height" size="small" highlight-row border></Table>
		</div>
		<div class="footer absolute clear">
			<Button @click.native="editWater2" :disabled="canSave" class="pull-right" type="primary" size="small">保存</Button>
		</div>
	</div>
</template>

<script>
	import loading from '../../public/loading';
	export default {
		components: {
			'loading': loading
		},
		mounted: function() {
			this.getWater();
			this.getWater2();
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/ztwaterstrivext/',
				url2: '/sanfang/onepicture/ztwatersthandletemp/',
				url3: '/sanfang/onepicture/ztwaterstrivhandle/',
				data: {
					page: 1,
					pageSize: 1000,
					searchValue: {
						strivid: this.$store.state.mapCount.strivInfo.strivid
					}
				},
				data2: {
					page: 1,
					pageSize: 1000,
					searchValue: {}
				},
				data3: {
					page: 1,
					pageSize: 1000,
					searchValue: {
						strivid: this.$store.state.mapCount.strivInfo.strivid
					}
				},
				water: {
					staininfo: '',
					hishandleinfo: '',
					planinfo: '',
					plandate: ''
				},
				table: {
					thead: [{
						type: 'selection',
						width: 60,
						align: 'center'
					}, {
						title: '治理工程分类',
						key: 'handletype',
						align: 'center'
					}, {
						title: '治理工程名称',
						key: 'handlename',
						align: 'center'
					}],
					tbody: []
				},
				height: '',
				showTable: false,
				canSave: true,
				chosed: []
			}
		},
		methods: {
			dateChange: function(date) {
				this.water.plandate = date;
			},
			selectChange: function(data) {
				let _this = this;
				this.canSave = false;
				data.map(function(item) {
					item.strivid = _this.$store.state.mapCount.strivInfo.strivid;
					delete item._checked;
					delete item._id;
				})
				this.chosed = data;
			},
			getWater: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'list',
					data: _this.data,
					success: function(res) {
						if(res.result.length > 0) {
							_this.water = res.result[0]
						}
					}
				});
			},
			editWater: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'edit',
					data: _this.water,
					success: function(res) {
						_this.successWarn('保存成功');
						_this.getWater();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			},
			getWater2: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url2 + 'list',
					data: _this.data2,
					success: function(res) {
						_this.table.tbody = res.result;
						_this.table.total = res.totalSize;
						_this.tableHeight();
						_this.getWater3();
					}
				});
			},
			editWater2: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url3 + 'edit',
					data: {
						strivid: this.$store.state.mapCount.strivInfo.strivid,
						key: _this.chosed
					},
					success: function(res) {
						_this.successWarn('保存成功');
						_this.showTable = false;
						_this.getWater2();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			},
			getWater3: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url3 + 'list',
					data: _this.data3,
					success: function(res) {
						if (res.result.length > 0) {
							res.result.map(function(item) {
								for(var i = 0; i < _this.table.tbody.length; i++) {
									if(item.sthandletempid === _this.table.tbody[i].sthandletempid) {
										_this.table.tbody[i]['_checked'] = true;
										break;
									}
								}
							})
						}
						_this.showTable = true;
					}
				});
			},
			tableHeight: function() {
				this.table.tbody.length >= 10 ? this.height = 460 : this.height = '';
			}
		}
	}
</script>
