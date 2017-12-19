/* 内河涌 弹框 排水口信息页
 */

<style lang="less">
	.waterOutfall {
		.ivu-form-item {
			margin-bottom: 2px;
		}
	}
</style>
<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		padding-left: 5px;
		.outFallTable {
			width: 410px;
			top: 15px;
			bottom: 0;
		}
		.outFallInfo {
			width: 596px;
			padding: 5px;
			right: 0;
			top: 0;
			bottom: 0;
			overflow-y: auto;
		}
	}
</style>

<template>
	<div class="water waterOutfall relative">
		<div class="outFallTable absolute">
			<Table @on-row-click="rowClick" :columns="table.thead" :data="table.tbody" :height="height" size="small" highlight-row border></Table>
			<!--<Button class="pull-left" type="text">导出</Button>-->
			<Page :total="table.total" @on-change="pageChange" size="small" show-total class="absolute" style="margin-top: 5px;bottom: 10px;right: 0;"></Page>
		</div>
		<div class="outFallInfo absolute">
			<Form :model="water" :label-width="110">
				<div class="clear">
					<div class="pull-left" style="width: 245px;">
						<Form-item label="排水口编号">
							<Input v-model="water.pntcode" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="岸别">
							<Select v-model="water.pntdir" size="small" placeholder="请选择">
								<Option value="左岸" key="左岸">左岸</Option>
								<Option value="右岸" key="右岸">右岸</Option>
							</Select>
						</Form-item>
						<Form-item label="排水类别">
							<Input v-model="water.trntype" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="排水来源">
							<Input v-model="water.trnsource" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="排水口尺寸(mm)">
							<Input v-model="water.trnsieze" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="排水口管底高程(m)">
							<Input v-model="water.trnheight" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="地理位置">
							<Input v-model="water.pntplace" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="年均排水量(吨)">
							<Input v-model="water.trntonnage" size="small" placeholder="请输入"></Input>
						</Form-item>
						<Form-item label="整治情况">
							<Select v-model="water.trnhandleway" size="small" placeholder="请选择">
								<Option value="保持现状" key="保持现状">保持现状</Option>
								<Option value="截污" key="截污">截污</Option>
								<Option value="封堵" key="封堵">封堵</Option>
							</Select>
						</Form-item>
						<Form-item label="整治年份">
							<Input v-model="water.trnhandleyear" size="small" placeholder="请输入"></Input>
						</Form-item>
					</div>
					<div class="pull-right relative">
						<loading v-show="loading"></loading>
						<img v-show="water.zoomimgpath !== ''" :src="'http://183.238.82.210:8090/ztwater/fileupdown.viewzoomimage.d?picname=' + water.zoomimgpath" style="width: 320px;height: 330px" />
						<img v-show="water.zoomimgpath === ''" src="../img/aPictureNoPicture.png" style="width: 320px;height: 330px" />
					</div>
				</div>
				<div class="flexBox">
					<Form-item label="建档日期" class="flexOne">
						<Date-picker :value="water.builddate" @on-change="dateChange" @on-open-change="dateKey='builddate'" placement="top" size="small" type="date" placeholder="选择日期" style="width: 135px"></Date-picker>
					</Form-item>
					<Form-item label="建档人" class="flexOne">
						<Input v-model="water.buildman" size="small" style="width: 135px;" placeholder="请输入"></Input>
					</Form-item>
				</div>
				<div class="flexBox">
					<Form-item label="采集日期" class="flexOne">
						<Date-picker :value="water.coldate" @on-change="dateChange" @on-open-change="dateKey='coldate'" placement="top" size="small" type="date" placeholder="选择日期" style="width: 135px"></Date-picker>
					</Form-item>
					<Form-item label="采集人" class="flexOne">
						<Input v-model="water.colman" size="small" style="width: 135px;" placeholder="请输入"></Input>
					</Form-item>
				</div>
				<Form-item label="备注">
					<Input v-model="water.pntcomment" type="textarea" size="small" class="water-textarea" placeholder="请输入"></Input>
				</Form-item>
			</Form>
			<div class="footer clear">
				<Button @click.native="editWater" :disabled="canSave" class="pull-right" type="primary" size="small" style="margin-left: 10px;">保存</Button>
				<Button @click.native="addWater" class="pull-right" type="success" size="small">新增</Button>
				<!--<Button @click.native="clearWater" class="pull-right" type="text" size="small">清空</Button>-->
			</div>
		</div>
	</div>
</template>

<script>
	import loading from '../../public/loading.vue';
	export default {
		components: {
			'loading': loading
		},
		mounted: function() {
			this.clearWater();
			this.getWater();
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/ztwaterstrivkeypnt/',
				data: {
					page: 1,
					pageSize: 10,
					searchValue: {
						strivid: this.$store.state.mapCount.strivInfo.strivid
					}
				},
				water: {},
				search: {},
				table: {
					thead: [{
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
						title: '地理位置',
						key: 'pntplace',
						width: 250
					}, {
						title: '排水口编号',
						key: 'pntcode',
						width: 130,
						align: 'center'
					}, {
						title: '岸别',
						key: 'pntdir',
						width: 120,
						align: 'center'
					}, {
						title: '取水口尺寸(mm)',
						key: 'trnsieze',
						width: 135,
						align: 'center'
					}, {
						title: '排水类别',
						key: 'trntype',
						width: 135,
						align: 'center'
					}, {
						title: '排水来源',
						key: 'trnsource',
						width: 120,
						align: 'center'
					}, {
						title: '排水口管底高度(m)',
						key: 'trnheight',
						width: 110,
						align: 'center'
					}, {
						title: '年均排水量(吨)',
						key: 'trntonnage',
						width: 120,
						align: 'center'
					}, {
						title: '整治情况',
						key: 'trnhandleway',
						width: 135,
						align: 'center'
					}, {
						title: '整治年份',
						key: 'trnhandleyear',
						width: 135,
						align: 'center'
					}, {
						title: '建档日期',
						key: 'builddate',
						width: 135,
						align: 'center'
					}, {
						title: '建档人',
						key: 'buildman',
						width: 135,
						align: 'center'
					}, {
						title: '采集人',
						key: 'colman',
						width: 135,
						align: 'center'
					}, {
						title: '采集日期',
						key: 'coldate',
						width: 135,
						align: 'center'
					}, {
						title: '备注',
						key: 'pntcomment',
						width: 250
					}],
					tbody: [],
					total: null
				},
				height: '',
				loading: false,
				dateKey: '',
				canSave: true
			}
		},
		methods: {
			dateChange: function(time) {
				this.water[this.dateKey] = time;
			},
			rowClick: function(row) {
				this.loading = true;
				this.water = row;
				let _this = this;
				let img = document.createElement('img');
				img.src = 'http://183.238.82.210:8090/ztwater/fileupdown.viewzoomimage.d?picname=' + row.zoomimgpath;
				img.onload = function() {
					_this.loading = false;
					_this.canSave = false;
				}
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
			},
			getWater: function() {
				let _this = this;
				this.ajaxPost({
					url: _this.url + 'list',
					data: this.data,
					success: function(res) {
						_this.table.tbody = res.result;
						_this.table.total = res.totalSize;
						_this.tableHeight();
					}
				});
			},
			addWater: function() {
				let _this = this;
				this.ajaxPost({
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
				this.ajaxPost({
					url: _this.url + 'edit',
					data: _this.water,
					success: function(res) {
						_this.successWarn('保存成功');
						_this.getWater();
						_this.clearWater();
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			},
			delWater: function(row) {
				let _this = this;
				this.ajaxPost({
					url: _this.url + 'delete',
					data: {
						strivkeypntid: row.strivkeypntid
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
				this.table.tbody.length >= 10 ? this.height = 450 : this.height = '';
			},
			pageChange: function(page) {
				this.data.page = page;
				this.getWater();
			}
		}
	}
</script>
