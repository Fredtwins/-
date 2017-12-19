/* 内河涌 弹框 桩端信息页
 */

<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		overflow: hidden;
		padding-left: 5px;
		.pileTable {
			width: 650px;
			top: 15px;
			bottom: 0;
		}
		.pileInfo {
			width: 360px;
			padding: 5px;
			padding-right: 20px;
			right: 0;
			top: 0;
			bottom: 0;
			overflow-y: auto;
		}
	}
</style>

<template>
	<div class="water clear relative">
		<div class="pileTable pull-left absolute">
			<Table @on-row-click="rowClick" :columns="table.thead" :data="table.tbody" ref="table" :height="height" size="small" highlight-row border></Table>
			<!--<Button class="pull-left" type="text">导出</Button>-->
			<Page :total="table.total" @on-change="pageChange" size="small" show-total class="absolute" style="margin-top: 5px;bottom: 10px;right: 0;"></Page>
		</div>
		<div class="pileInfo pull-left absolute">
			<Form :model="water" :label-width="110">
				<Form-item label="桩号段">
					<Input v-model="water.segcode" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="桩号段名">
					<Input v-model="water.segname" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="河面底宽(m)">
					<Input v-model="water.btmwidth" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="河面断面宽(m)">
					<Input v-model="water.brokenwidth" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="系统排序号">
					<Input v-model="water.segorder" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="左岸堤顶路情况">
					<Input v-model="water.lfttop" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="左岸线,岸坡">
					<Input v-model="water.lftedge" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="左岸堤后地形地貌">
					<Input v-model="water.lftbake" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="右岸堤顶路情况">
					<Input v-model="water.rghtop" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="右岸线,岸坡">
					<Input v-model="water.rghedge" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="右岸堤后地形地貌">
					<Input v-model="water.rghbake" size="small" placeholder="请输入"></Input>
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
	export default {
		mounted: function() {
			this.clearWater();
			this.getWater();
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/ztwaterstrivseg/',
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
						title: '桩号段',
						key: 'segcode',
						align: 'center',
						width: 100
					}, {
						title: '左岸堤顶路情况',
						key: 'lfttop',
						width: 130,
						align: 'center'
					}, {
						title: '左岸线,岸坡',
						key: 'lftedge',
						width: 120,
						align: 'center'
					}, {
						title: '左岸堤后地形地貌',
						key: 'lftbake',
						width: 135,
						align: 'center'
					}, {
						title: '右岸岸堤顶路情况',
						key: 'rghtop',
						width: 135,
						align: 'center'
					}, {
						title: '右岸线,岸坡',
						key: 'rghedge',
						width: 120,
						align: 'center'
					}, {
						title: '右岸堤后地形地貌',
						key: 'rghbake',
						width: 135,
						align: 'center'
					}, {
						title: '河涌底宽(m)',
						key: 'btmwidth',
						width: 110,
						align: 'center'
					}, {
						title: '河涌断面宽(m)',
						key: 'brokenwidth',
						width: 120,
						align: 'center'
					}],
					tbody: [],
					total: null
				},
				height: '',
				canSave: true
			}
		},
		methods: {
			rowClick: function(row) {
				this.water = row;
				this.canSave = false;
			},
			clearWater: function() {
				this.water = {
					segcode: '',
					segname: '',
					segorder: '',
					lfttop: '',
					lftedge: '',
					lftbake: '',
					rghtop: '',
					rghedge: '',
					rghbake: '',
					btmwidth: '',
					brokenwidth: '',
					strivid: this.$store.state.mapCount.strivInfo.strivid
				};
			},
			getWater: function() {
				let _this = this;
				this.waterAjaxPost({
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
				this.waterAjaxPost({
					url: _this.url + 'new',
					data: {
						segcode: '',
						segname: '',
						segorder: '',
						lfttop: '',
						lftedge: '',
						lftbake: '',
						rghtop: '',
						rghedge: '',
						rghbake: '',
						btmwidth: '',
						brokenwidth: '',
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
						strivsegid: row.strivsegid
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
