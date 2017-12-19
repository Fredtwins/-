/* 内河涌 弹框 水质情况页 */

<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-left: 5px;
		.qualityTable {
			width: 210px;
			top: 5px;
			bottom: 0;
		}
		.qualityInfo {
			width: 800px;
			top: 5px;
			bottom: 0;
			right: 5px;
			.resultWrite {
				border: 1px solid #e9eaec;
				border-radius: 5px;
				.resultWriteTitle {
					width: 100%;
					height: 25px;
					font-size: 12px;
					padding-left: 10px;
					background-color: #f8f8f9;
					border-bottom: 1px solid #e9eaec;
					color: #495060;
					div:nth-of-type(1) {
						margin-top: 3px;
					}
				}
				.resultWriteSec {
					display: inline-block;
					width: 100%;
					height: 155px;
					padding-right: 5px;
				}
			}
			.resultTable {
				border: 1px solid #e9eaec;
				border-radius: 5px;
				margin-top: 5px;
				.resultTableTitle {
					width: 100%;
					height: 25px;
					font-size: 12px;
					padding-left: 10px;
					background-color: #f8f8f9;
					border-bottom: 1px solid #e9eaec;
					color: #495060;
					.api {
						table {
							font-family: Consolas, Menlo, Courier, monospace;
							font-size: 12px;
							border-collapse: collapse;
							border-spacing: 0;
							empty-cells: show;
							border: 1px solid #e9e9e9;
							width: 100%;
							th,
							td {
								border: 1px solid #e9e9e9;
								padding: 8px 16px;
								text-align: left;
							}
							th {
								background: #f7f7f7;
								white-space: nowrap;
								color: #5c6b77;
								font-weight: 600;
							}
						}
					}
				}
				.resultTableSec {
					padding: 5px;
					padding-bottom: 2px;
				}
			}
		}
	}
</style>

<template>
	<div class="water clear relative">
		<div class="qualityTable absolute">
			<!--<div class="absolute" style="font-size: 12px;top: 7px;left: 0;">取样列表</div>-->
			<!--<Button  class="absolute" type="text" style="top: 0;right: 0;">添加取样</Button>-->
			<Table @on-row-click="rowClick" :columns="table.thead1" :data="table.tbody1" :height="height" size="small" class="absolute" style="top:0px;left: 0;right: 0;" highlight-row border></Table>
			<Page @on-change="pageChange1" :total="table.total1" size="small" show-total class="absolute" style="margin-top: 5px;bottom: 10px;right: 0;"></Page>
		</div>
		<div class="qualityInfo absolute">
			<div class="resultWrite">
				<header class="resultWriteTitle clear">
					<div class="pull-left">检验结果录入</div>
					<div class="pull-right">
						<!--<Button @click.native="clearWater" type="text" size="small" style="font-size: 12px;">清空</Button>-->
						<Button @click.native="addWater" type="text" size="small" style="font-size: 12px;">新增检验</Button>
						<Button @click.native="editWater" :disabled="canSave" type="text" size="small" style="font-size: 12px;">保存</Button>
					</div>
				</header>
				<section class="resultWriteSec">
					<Form :model="water">
						<div class="flexBox">
							<Form-item label="水质分类" class="flexOne" :label-width="80">
								<Select v-model="water.watertype" size="small" placeholder="请选择" style="width: 90px;">
									<Option value="10" key="10">I类</Option>
									<Option value="20" key="20">II类</Option>
									<Option value="30" key="30">III类</Option>
									<Option value="40" key="40">IV类</Option>
									<Option value="50" key="50">V类</Option>
									<Option value="60" key="60">劣V类</Option>
								</Select>
							</Form-item>
							<Form-item label="取样日期" class="flexOne" :label-width="70">
								<Date-picker :value="water.pntdate" @on-change="dateChange" size="small" type="date" placeholder="选择日期" style="display: inline-block;width: 100px"></Date-picker>
							</Form-item>
							<Form-item label="检测员" class="flexOne" :label-width="60">
								<Input v-model="water.handleman" placeholder="请输入" size="small" style="width: 80px;"></Input>
							</Form-item>
							<Form-item label="登记员" class="flexOne" :label-width="60">
								<Input v-model="water.bookman" placeholder="请输入" size="small" style="width: 80px;"></Input>
							</Form-item>
						</div>
						<Form-item label="水质总体评价" :label-width="100">
							<Input v-model="water.waterdesc" size="small" type="textarea" class="water-textarea" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="检验备注" :label-width="100">
							<Input v-model="water.pntcomment" size="small" type="textarea" class="water-textarea" placeholder="请输入"></Input>
						</Form-item>
					</Form>
				</section>
			</div>
			<div class="resultTable">
				<header class="resultTableTitle clear">
					<div class="pull-left" style="margin-top: 3px;">取样结果列表</div>
					<div class="pull-right">
						<!--<Poptip trigger="hover" placement="left" width="800">
							<Button @click.native="showWater" type="text" size="small" style="font-size: 12px;">水质标准图</Button>
							<div class="api" slot="content">
								<table>
									<thead>
										<tr>
											<th>信息项</th>
											<th>I类标准</th>
											<th>II类标准</th>
											<th>III类标准</th>
											<th>IV类标准</th>
											<th>V类标准</th>
											<th>劣V类标准</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>ph值</td>
											<td>6~9</td>
											<td>6~9</td>
											<td>6~9</td>
											<td>6~9</td>
											<td>6~9</td>
											<td>劣V</td>
										</tr>
										<tr>
											<td>悬浮物(mg/L)</td>
											<td>无标准</td>
											<td>无标准</td>
											<td>无标准</td>
											<td>无标准</td>
											<td>无标准</td>
											<td>无标准</td>
										</tr>
										<tr>
											<td>化学需氧量(mg/L)</td>
											<td>15</td>
											<td>15</td>
											<td>20</td>
											<td>30</td>
											<td>40</td>
											<td>劣V</td>
										</tr>
										<tr>
											<td>生物需氧量BOD(mg/L)</td>
											<td>3</td>
											<td>3</td>
											<td>4</td>
											<td>6</td>
											<td>10</td>
											<td>劣V</td>
										</tr>
										<tr>
											<td>氨氮(mg/L)</td>
											<td>0.15</td>
											<td>0.5</td>
											<td>1.0</td>
											<td>1.5</td>
											<td>2.0</td>
											<td>劣V</td>
										</tr>
										<tr>
											<td>总磷(mg/L)</td>
											<td>0.02</td>
											<td>0.1</td>
											<td>0.2</td>
											<td>0.3</td>
											<td>0.4</td>
											<td>劣V</td>
										</tr>
									</tbody>
								</table>
							</div>
						</Poptip>-->
						<Button @click.native="addWater2" :disabled="canSave" type="text" size="small" style="font-size: 12px;">添加取样</Button>
						<!--<Button @click.native="editWater2" type="text" size="small" style="font-size: 12px;">保存</Button>-->
					</div>
				</header>
				<section class="resultTableSec clear">
					<Table :columns="table.thead2" :data="table.tbody2" height="280" size="small" highlight-row border></Table>
					<!--<Page @on-change="pageChange2" :total="table.total2" size="small" show-total class="pull-right" style="margin-top: 5px;"></Page>-->
				</section>
			</div>
		</div>
		<Modal v-model="showAdd" :styles="{width:'420px',height:'420px'}" title="新增取样结果" class="modalSecActionSmall">
			<section class="content" style="padding: 10px 10px 10px 10px;">
				<Form :model="waterAdd" :label-width="80">
					<Form-item label="取样位置">
						<Input v-model="waterAdd.local" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="ph值">
						<Input v-model="waterAdd.ph" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="悬浮物(mg/L)">
						<Input v-model="waterAdd.suspended" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="化学需氧量(mg/L)">
						<Input v-model="waterAdd.chemistry" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="生物需氧量BOD(mg/L)">
						<Input v-model="waterAdd.biology" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="氨氮(mg/L)">
						<Input v-model="waterAdd.ammonia" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="总磷(mg/L)">
						<Input v-model="waterAdd.total" placeholder="请输入"></Input>
					</Form-item>
					<Form-item label="其他">
						<Input v-model="waterAdd.other" placeholder="请输入"></Input>
					</Form-item>
				</Form>
			</section>
			<div slot="footer">
				<Button type="primary" @click="addWaterCommti2">提交</Button>
			</div>
		</Modal>
		<Modal v-model="showEdit" :styles="{width:'420px',height:'250px',position: 'absolute',left: 0,right: 0,top: 0,bottom: 0,margin: 'auto'}" title="编辑取样结果" class="modalSecActionSmall">
			<section class="content" style="padding: 10px 10px 10px 10px;">
				<Form :model="waterEdit" :label-width="80">
					<Form-item :label="waterEdit.waterkey">
						<Input v-model="waterEdit.leftvalue" placeholder="请输入"></Input>
					</Form-item>
				</Form>
			</section>
			<div slot="footer">
				<Button type="primary" @click="editWaterCommti2">提交</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		mounted: function() {
			this.clearWater();
			this.getWater();
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/ztwaterwtwaterpnt/',
				url2: '/sanfang/onepicture/ztwaterwtwaterresult/',
				data: {
					page: 1,
					pageSize: 10,
					searchValue: {
						strivid: this.$store.state.mapCount.strivInfo.strivid
					}
				},
				data2: {
					page: 1,
					pageSize: 1000,
					searchValue: {
						strivid: this.$store.state.mapCount.strivInfo.strivid
					},
					order: {
						pntorder: 1,
						showorder: 1
					}
				},
				water: {},
				waterAdd: {},
				waterEdit: {},
				showAdd: false,
				showEdit: false,
				search: {},
				table: {
					thead1: [{
						title: '操作',
						align: 'center',
						width: 90,
						render: (h, params) => {
							return h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.delWater(params.row)
									}
								},
								style: {
									fontSize: '12px'
								}
							}, '删除')
						}
					}, {
						title: '取样时间',
						key: 'pntdate',
						align: 'center'
					}],
					tbody1: [],
					total1: null,
					thead2: [{
						title: '操作',
						align: 'center',
						width: 150,
						render: (h, params) => {
							if(params.row.waterkey === '取样位置') {
								return h('div', [
									h('Button', {
										props: {
											type: 'primary',
											size: 'small'
										},
										style: {
											marginRight: '5px',
											fontSize: '12px'
										},
										on: {
											click: () => {
												this.editClick2(params.row)
											}
										}
									}, '编辑'),
									h('Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										on: {
											click: () => {
												this.delWater2(params.index)
											}
										},
										style: {
											fontSize: '12px'
										},
									}, '删除')
								]);
							} else {
								return h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										fontSize: '12px'
									},
									on: {
										click: () => {
											this.editClick2(params.row)
										}
									}
								}, '编辑')
							}
						}
					}, {
						title: '信息项',
						key: 'waterkey',
						align: 'center',
						width: 90
					}, {
						title: '内容',
						key: 'leftvalue',
						align: 'center',
						width: 90
					}, {
						title: 'I类标准',
						key: 'I',
						align: 'center',
						width: 90
					}, {
						title: 'II类标准',
						key: 'II',
						align: 'center',
						width: 90
					}, {
						title: 'III类标准',
						key: 'III',
						align: 'center',
						width: 90
					}, {
						title: 'IV类标准',
						key: 'IV',
						align: 'center',
						width: 90
					}, {
						title: 'V类标准',
						key: 'V',
						align: 'center',
						width: 90
					}, {
						title: '劣V类标准',
						key: 'lV',
						align: 'center',
						width: 90
					}],
					tbody2: [],
					total2: null,
				},
				height: '',
				canSave: true
			}
		},
		methods: {
			dateChange: function(time) {
				this.water.pntdate = time;
			},
			rowClick: function(row) {
				let _this = this;
				this.water = row;
				this.data2.searchValue.wtwaterpntid = row.wtwaterpntid;
				this.canSave = false;
				this.getWater2();
			},
			clearWater: function() {
				this.water = {
					pntcode: '',
					pntdir: '',
					trntype: '',
					trnsource: '',
					trnsieze: '',
					trnheight: '',
					pntplace: '',
					trntonnage: '',
					trnhandleway: '',
					trnhandleyear: '',
					builddate: '',
					buildman: '',
					coldate: '',
					colman: '',
					pntcomment: '',
					zoomimgpath: '',
					strivid: this.$store.state.mapCount.strivInfo.strivid
				};
				this.table.tbody2 = [];
				this.canSave = true;
			},
			getWater: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'list',
					data: _this.data,
					success: function(res) {
						_this.table.tbody1 = res.result;
						_this.table.total1 = res.totalSize;
						_this.tableHeight();
					}
				});
			},
			addWater: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'new',
					data: {
						pntcode: '',
						pntdir: '',
						trntype: '',
						trnsource: '',
						trnsieze: '',
						trnheight: '',
						pntplace: '',
						trntonnage: '',
						trnhandleway: '',
						trnhandleyear: '',
						builddate: '',
						buildman: '',
						coldate: '',
						colman: '',
						pntcomment: '',
						zoomimgpath: '',
						strivid: this.$store.state.mapCount.strivInfo.strivid
					},
					success: function(res) {
						_this.successWarn('新增成功');
						_this.getWater();
						_this.clearWater();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
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
			delWater: function(row) {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'delete',
					data: {
						wtwaterpntid: row.wtwaterpntid
					},
					success: function(res) {
						_this.successWarn('删除成功');
						_this.getWater();
						_this.clearWater();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			},
			editClick2: function(row) {
				this.waterEdit = row;
				this.showEdit = true;
			},
			editWaterCommti2: function() {
				let _this = this;
				let obj = {
					_id: _this.waterEdit._id,
					_index: _this.waterEdit._index,
					leftvalue: _this.waterEdit.leftvalue,
					pntorder: _this.waterEdit.pntorder,
					pntplace: _this.waterEdit.pntplace,
					rightvalue: _this.waterEdit.rightvalue,
					showorder: _this.waterEdit.showorder,
					strivid: _this.waterEdit.strivid,
					stwatertempid: _this.waterEdit.stwatertempid,
					waterkey: _this.waterEdit.waterkey,
					wtwaterpntid: _this.waterEdit.wtwaterpntid,
					wtwaterresultid: _this.waterEdit.wtwaterresultid
				}
				this.waterAjaxPost({
					url: _this.url2 + 'edit',
					data: obj,
					success: function(res) {
						_this.successWarn('保存成功');
						_this.showEdit = false;
						_this.getWater2();
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
						res.result.map(function(item,index) {
							if (index % 8 === 1) {
								item['I'] = '6~9';
								item['II'] = '6~9';
								item['III'] = '6~9';
								item['IV'] = '6~9';
								item['V'] = '6~9';
								item['lV'] = '劣V';
							}else if(index % 8 === 2) {
								item['I'] = '无标准';
								item['II'] = '无标准';
								item['III'] = '无标准';
								item['IV'] = '无标准';
								item['V'] = '无标准';
								item['lV'] = '无标准';
							}else if(index % 8 === 3) {
								item['I'] = '15';
								item['II'] = '15';
								item['III'] = '20';
								item['IV'] = '30';
								item['V'] = '40';
								item['lV'] = '劣V';
							}else if(index % 8 === 4) {
								item['I'] = '3';
								item['II'] = '3';
								item['III'] = '4';
								item['IV'] = '6';
								item['V'] = '10';
								item['lV'] = '劣V';
							}else if(index % 8 === 5) {
								item['I'] = '0.15';
								item['II'] = '0.5';
								item['III'] = '1.0';
								item['IV'] = '1.5';
								item['V'] = '2.0';
								item['lV'] = '劣V';
							}else if(index % 8 === 6) {
								item['I'] = '0.02';
								item['II'] = '0.1';
								item['III'] = '0.2';
								item['IV'] = '0.3';
								item['V'] = '0.4';
								item['lV'] = '劣V';
							}else if(index % 8 === 7) {
								item['I'] = '无标准';
								item['II'] = '无标准';
								item['III'] = '无标准';
								item['IV'] = '无标准';
								item['V'] = '无标准';
								item['lV'] = '无标准';
							}
						})
						_this.table.tbody2 = res.result;
						console.log(res)
					}
				});
			},
			addWater2: function() {
				this.waterAdd = {
					local: '',
					ph: '',
					suspended: '',
					chemistry: '',
					biology: '',
					ammonia: '',
					total: '',
					other: '',
					wtwaterpntid: this.water.wtwaterpntid,
					strivid: this.$store.state.mapCount.strivInfo.strivid
				};
				this.showAdd = true;
			},
			addWaterCommti2: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url2 + 'new',
					data: _this.waterAdd,
					success: function(res) {
						_this.successWarn('保存成功');
						_this.showAdd = false;
						_this.getWater2();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			},
			delWater2: function(index) {
				let _this = this;
				let arr = [];
				for (var i = 0;i < 8;i++) {
					arr.push(this.table.tbody2[index + 1]._id);
				}
				this.waterAjaxPost({
					url: _this.url2 + 'delete',
					data: {
						_ids: arr.join(',')
					},
					success: function(res) {
						_this.successWarn('删除成功');
						_this.getWater();
						_this.clearWater();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			},
			tableHeight: function() {
				this.table.tbody1.length >= 10 ? this.height = 440 : this.height = '';
			},
			pageChange1: function(page) {
				this.data.page = page;
				this.getWater();
			}
		}
	}
</script>
