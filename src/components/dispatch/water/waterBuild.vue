/* 内河涌 弹框 建筑物信息页
 */

<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		padding: 0 5px;
	}
</style>

<template>
	<div class="water relative">
		<div>
			<span style="font-size: 12px;">堤防桩号&nbsp;&nbsp;<Input v-model="search.pilenum" size="small" placeholder="请输入" style="width: 100px;"></Input></span> &nbsp;&nbsp;
			<span style="font-size: 12px;">建筑物名称&nbsp;&nbsp;<Input v-model="search.building" size="small" placeholder="请输入" style="width: 100px;"></Input></span>
			<span><Button @click.native="searchRiv" type="text">查询</Button></span>
		</div>
		<Table :columns="table.thead" :data="table.tbody" :height="height" size="small" highlight-row border></Table>
		<Page @on-change="pageChange" :total="table.total" size="small" show-total class="absolute" style="bottom: 5px;right: 0;margin-top: 5px;"></Page>
	</div>
</template>

<script>
	export default {
		mounted: function() {
			this.getWater();
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/riverbuilding/',
				search: {},
				table: {
					thead: [{
						title: '所在地(区镇)',
						key: 'town',
						align: 'center',
						width: 120
					}, {
						title: '所属河道',
						key: 'rivname',
						align: 'center',
						width: 120
					}, {
						title: '堤防桩号',
						key: 'pilenum',
						align: 'center',
						width: 120
					}, {
						title: '建筑物名称',
						key: 'building',
						align: 'center',
						width: 120
					}, {
						title: '面积(㎡)',
						key: 'measure',
						align: 'center',
						width: 120
					}, {
						title: '层数',
						key: 'floor',
						align: 'center',
						width: 120
					}, {
						title: '位于',
						key: 'addresss',
						align: 'center',
						width: 120
					}, {
						title: '建设年份',
						key: 'addresss',
						align: 'center',
						width: 120
					}, {
						title: '是否历史建筑物',
						key: 'ishistory',
						align: 'center',
						width: 130
					}, {
						title: '是否办理水利手续',
						key: 'hascert',
						align: 'center',
						width: 140
					}, {
						title: '采集人',
						key: 'addresss',
						align: 'center',
						width: 120
					}, {
						title: '入库时间',
						key: 'addresss',
						align: 'center',
						width: 120
					}, {
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										fontSize: '12px'
									},
									on: {
										click: () => {
											this.delWater(params.row)
										}
									}
								}, '删除')
							]);
						}
					}],
					tbody: [],
					total: null
				},
				height: ''
			}
		},
		methods: {
			searchRiv: function() {
				let _this = this;
				let data = {
					page: 1,
					pageSize: 10,
					searchValue: {
						strivid: _this.$store.state.mapCount.strivInfo.strivid
					}
				}
				if(this.search.pilenum !== '') {
					data.pageSize = 30;
					data.searchValue.pilenum = this.search.pilenum;
				}
				if(this.search.building !== '') {
					data.pageSize = 30;
					data.searchValue.building = this.search.building;
				}
				this.ajaxPost({
					url: _this.url + 'list',
					data: data,
					success: function(res) {
						_this.table.tbody = res.result;
						_this.table.total = res.totalSize;
					}
				})
			},
			getWater: function() {
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'list',
					data: {
						page: 1,
						pageSize: 10,
						searchValue: {
							strivid: _this.$store.state.mapCount.strivInfo.strivid
						}
					},
					success: function(res) {
						_this.table.tbody = res.result;
						_this.table.total = res.totalSize;
						_this.tableHeight();
					}
				});
			},
			delWater: function(row) {
				let _this = this;
				this.ajaxPost({
					url: _this.url + 'delete',
					data: {
						buildid: row.buildid
					},
					success: function(res) {
						_this.successWarn('删除成功');
						_this.getWater();
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
				let _this = this;
				this.waterAjaxPost({
					url: _this.url + 'list',
					data: {
						page: page,
						pageSize: 10,
						searchValue: {
							strivid: _this.$store.state.mapCount.strivInfo.strivid
						}
					},
					success: function(res) {
						_this.table.tbody = res.result;
						_this.table.total = res.totalSize;
					}
				})
			}
		}
	}
</script>
