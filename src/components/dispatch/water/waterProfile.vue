/* 内河涌 弹框 河涌概貌页
 */
<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		.profileTable {
			width: 500px;
			top: 5px;
			left: 5px;
			bottom: 0;
		}
		.profileImg {
			width: 490px;
			top: 5px;
			bottom: 0;
			right: 5px;
			img {
				width: 100%;
				height: e("calc(100% - 24px)");
			}
		}
	}
</style>

<template>
	<div class="water clear relative">
		<div class="profileTable absolute">
			<div class="absolute" style="font-size: 12px;top: 2px;">河涌列表</div>
			<Table @on-row-click="rowClick" :columns="table.thead" :data="table.tbody" :height="height" size="small" class="absolute" style="top: 24px;left: 0;right: 0;" highlight-row border></Table>
			<Page @on-change="pageChange" :total="table.total" size="small" show-total class="absolute" style="bottom: 5px;right: 0;margin-top: 5px;"></Page>
		</div>
		<div class="absolute profileImg">
			<Button type="text" size="small" class="pull-right" style="font-size: 12px;">添加图片</Button>
			<loading v-show="loading"></loading>
			<img v-show="water.oriimgpath !== undefined" :src="'http://183.238.82.210:8090/ztwater/fileupdown.viewzoomimage.d?picname=' + water.oriimgpath" />
			<img v-show="water.oriimgpath === undefined" src="../img/aPictureNoPicture.png" />
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
			this.getWater();
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/ztwaterstrivpic/',
				water: {},
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
						title: '概貌描述',
						key: 'picname',
						align: 'center'
					}],
					tbody: [],
					total: null
				},
				height: '',
				loading: false
			}
		},
		methods: {
			rowClick: function(row) {
				this.loading = true;
				this.water = row;
				let _this = this;
				let img = document.createElement('img');
				img.src = 'http://183.238.82.210:8090/ztwater/fileupdown.viewzoomimage.d?picname=' + row.oriimgpath;
				img.onload = function() {
					_this.loading = false;
				}
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
				this.waterAjaxPost({
					url: _this.url + 'delete',
					data: {
						strivpicid: row.strivpicid
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
