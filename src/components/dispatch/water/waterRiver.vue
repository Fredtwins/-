/* 内河涌 弹框 河长信息页
 */
<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		.profileTable {
			width: 510px;
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
			<div class="absolute" style="font-size: 12px;">
				河长职务：XXX&nbsp;&nbsp;河长姓名：XXX&nbsp;&nbsp;联系电话：13659521478
			</div>
			<Table :columns="table.thead" :data="table.tbody" :height="height" size="small" class="absolute" style="top: 24px;left: 0;right: 0;" highlight-row border></Table>
			<Page :total="100" size="small" show-total class="absolute" style="bottom: 5px;right: 0;margin-top: 5px;"></Page>
		</div>
		<div class="absolute profileImg">
			<div style="font-size: 12px;padding: 3px 0;">河涌景观图片</div>
			<!--<Button type="text" size="small" class="pull-right" style="font-size: 12px;">添加图片</Button>-->
			<img src="../img/aPictureNoPicture.png" />
		</div>
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
				table: {
					thead: [{
						title: '河涌名字',
						key: 'addresss',
						align: 'center'
					}, {
						title: '河涌位置',
						key: 'addresss',
						align: 'center'
					}, {
						title: '拍摄时间',
						key: 'addresss',
						align: 'center'
					}],
					tbody: [{},{},{},{},{},{},{},{},{},{},{},{}],
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
