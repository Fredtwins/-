/* 内河涌 弹框 河涌宣传报道信息页
 /

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
			<span style="font-size: 12px;">河涌相关管理公文编号&nbsp;&nbsp;<Input v-model="search.code" size="small" placeholder="请输入" style="width: 100px;"></Input></span> &nbsp;&nbsp;
			<span style="font-size: 12px;">河涌相关管理公文标题&nbsp;&nbsp;<Input v-model="search.name" size="small" placeholder="请输入" style="width: 100px;"></Input></span>
			<span><Button type="text">查询</Button></span>
		</div>
		<Table :columns="table.thead" :data="table.tbody" :height="height" size="small" highlight-row border></Table>
		<Page :total="100" size="small" show-total class="absolute" style="bottom: 5px;right: 0;margin-top: 5px;"></Page>
	</div>
</template>

<script>
	export default {
		mounted: function() {
			this.$nextTick(function() {
				this.tableHeight();
			})
		},
		data: function() {
			return {
				search: {},
				table: {
					thead: [{
						title: '河涌相关管理公文标题',
						key: 'addresss',
						align: 'center',
						width: 200
					}, {
						title: '河涌相关管理公文内容',
						key: 'addresss',
						align: 'center'
					}, {
						title: '公文报道时间',
						key: 'addresss',
						align: 'center',
						width: 200
					}],
					tbody: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
				},
				height: ''
			}
		},
		methods: {
			tableHeight: function() {
				this.table.tbody.length >= 10 ? this.height = 450 : this.height = '';
			}
		}
	}
</script>
