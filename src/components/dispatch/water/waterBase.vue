/* 内河涌 弹框 基础信息页*/

<style lang="less">
	.water-textarea {
		textarea {
			height: 52px;
		}
	}
</style>
<style scoped lang="less">
	.water {
		width: 100%;
		height: 100%;
		padding-right: 5px;
	}
</style>

<template>
	<div class="water">
		<Form :model="water">
			<div class="flexBox">
				<Form-item label="河涌类别" :label-width="70" class="flexOne">
					<Select v-model="water.rivprop" size="small" label="河涌类别">
						<Option value="A">外江</Option>
						<Option value="F">主干涌</Option>
						<Option value="B">支干涌</Option>
						<Option value="C">支涌</Option>
						<Option value="D">毛涌</Option>
						<Option value="E">水库</Option>
					</Select>
				</Form-item>
				<Form-item label="河涌名字" :label-width="70" class="flexOne">
					<Input v-model="water.rivname" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="河涌代码" :label-width="70" class="flexOne">
					<Input v-model="water.rivcode" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="控制集雨面积(km2)" :label-width="125" class="flexOne">
					<Input v-model="water.ctlarea" size="small" placeholder="请输入"></Input>
				</Form-item>
			</div>
			<Form-item label="地貌描述" :label-width="70">
				<Input v-model="water.geodesc" size="small" type="textarea" class="water-textarea" placeholder="请输入"></Input>
			</Form-item>
			<div class="flexBox">
				<Form-item label="起点位置" :label-width="70" class="flexOne">
					<Input v-model="water.startplace" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="起点接涌" :label-width="70" class="flexOne">
					<Poptip v-model="showStartRiver" placement="bottom-start" width="500">
						<Input v-model="water.startstrivname" size="small" placeholder="请选择"></Input>
						<div slot="content" style="overflow: hidden;">
							<div>
								<span>河涌代码&nbsp;&nbsp;<Input v-model="search.rivcode" size="small" placeholder="请输入" style="width: 100px;"></Input></span> &nbsp;&nbsp;
								<span>河涌名字&nbsp;&nbsp;<Input v-model="search.rivname" size="small" placeholder="请输入" style="width: 100px;"></Input></span>
								<span><Button @click.native="searchRiv" type="text">查询</Button></span>
							</div>
							<div v-if="showStartRiver" style="margin-top: 5px;">
								<Table @on-row-click="startClick" :columns="table.thead" :data="table.tbody" height="200" size="small" border></Table>
								<Page :total="table.total" @on-change="pageChange" size="small" show-total class="pull-right" style="margin-top: 5px;"></Page>
							</div>
						</div>
					</Poptip>
				</Form-item>
				<Form-item label="起点桩号段" :label-width="80" class="flexOne">
					<Input v-model="water.startsegcode" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="起点经度" :label-width="70" class="flexOne">
					<Input v-model="water.mstartlng" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="起点纬度" :label-width="70" class="flexOne">
					<Input v-model="water.mstartlat" size="small" placeholder="请输入"></Input>
				</Form-item>
			</div>
			<div class="flexBox">
				<Form-item label="起点宽度(m)" :label-width="70" class="flexOne">
					<Input-number v-model="water.width" size="small" placeholder="请输入"></Input-number>
				</Form-item>
				<Form-item label="起点涌底高程(km2)" :label-width="90" class="flexOne">
					<Input-number v-model="water.height" size="small" placeholder="请输入"></Input-number>
				</Form-item>
				<Form-item label="起点水船闸" :label-width="80" class="flexOne">
					<Select v-model="water.startShip" size="small" filterable>
						<!--<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>-->
					</Select>
				</Form-item>
				<Form-item label="起点排灌泵站" :label-width="90" class="flexOne">
					<Select v-model="water.startpPumping" size="small" filterable>
						<!--<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>-->
					</Select>
				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
			</div>
			<div class="flexBox">
				<Form-item label="终点位置" :label-width="70" class="flexOne">
					<Input v-model="water.endplace" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="终点接涌" :label-width="70" class="flexOne">
					<Poptip v-model="showEndRiver" placement="bottom-start" width="500">
						<Input v-model="water.endstrivname" size="small" placeholder="请选择"></Input>
						<div slot="content" style="overflow: hidden;">
							<div>
								<span>河涌代码&nbsp;&nbsp;<Input v-model="search.rivcode" size="small" placeholder="请输入" style="width: 100px;"></Input></span> &nbsp;&nbsp;
								<span>河涌名字&nbsp;&nbsp;<Input v-model="search.rivname" size="small" placeholder="请输入" style="width: 100px;"></Input></span>
								<span><Button @click.native="searchRiv" type="text">查询</Button></span>
							</div>
							<div v-if="showEndRiver" style="margin-top: 5px;">
								<Table @on-row-click="endClick" :columns="table.thead" :data="table.tbody" height="200" size="small" border></Table>
								<Page :total="table.total" size="small" show-total class="pull-right" style="margin-top: 5px;"></Page>
							</div>
						</div>
					</Poptip>
				</Form-item>
				<Form-item label="终点桩号段" :label-width="80" class="flexOne">
					<Input v-model="water.endsegcode" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="终点经度" :label-width="70" class="flexOne">
					<Input v-model="water.mendlng" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="终点纬度" :label-width="70" class="flexOne">
					<Input v-model="water.mendlat" size="small" placeholder="请输入"></Input>
				</Form-item>
			</div>
			<div class="flexBox">
				<Form-item label="终点宽度(m)" :label-width="70" class="flexOne">
					<Input-number v-model="water.endWidth" size="small" placeholder="请输入"></Input-number>
				</Form-item>
				<Form-item label="终点涌底高程(km2)" :label-width="90" class="flexOne">
					<Input-number v-model="water.endHeight" size="small" placeholder="请输入"></Input-number>
				</Form-item>
				<Form-item label="终点水船闸" :label-width="80" class="flexOne">
					<Select v-model="water.endShip" size="small" filterable>
						<!--<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>-->
					</Select>
				</Form-item>
				<Form-item label="终点排灌泵站" :label-width="90" class="flexOne">
					<Select v-model="water.endPumping" size="small" filterable>
						<!--<Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>-->
					</Select>
				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
			</div>
			<div class="flexBox">
				<Form-item label="河涌长(m)" :label-width="70" class="flexOne">
					<Input v-model="water.rivlength" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="流经街道(m)" :label-width="90" class="flexOne">
					<Input v-model="water.byvilliage" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="属地管理权属描述" :label-width="115" class="flexOne">
					<Input v-model="water.chargevil" size="small" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="行政区划" :label-width="90" class="flexOne">
					<Select v-model="water.unitcode" size="small" placement="top" filterable>
						<Option value="南海区" key="南海区"></Option>
						<Option value="里水镇" key="里水镇"></Option>
						<Option value="罗村街道" key="罗村街道"></Option>
						<Option value="九江镇" key="九江镇"></Option>
						<Option value="桂城街道" key="桂城街道"></Option>
						<Option value="东风水库" key="东风水库"></Option>
						<Option value="大沥镇" key="大沥镇"></Option>
						<Option value="西樵镇" key="西樵镇"></Option>
						<Option value="丹灶镇" key="丹灶镇"></Option>
						<Option value="狮山镇" key="狮山镇"></Option>
					</Select>
				</Form-item>
			</div>
			<div class="flexBox">
				<Form-item label="已作废" :label-width="70" class="flexOne">
					<Checkbox v-model="water.invalidated"></Checkbox>
				</Form-item>
				<Form-item label="上锁" :label-width="70" class="flexOne">
					<Checkbox v-model="water.lockedriv"></Checkbox>
				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
				<Form-item label="" :label-width="100" class="flexOne">

				</Form-item>
			</div>
			<Form-item label="河涌备注" :label-width="70">
				<Input v-model="water.remake" size="small" type="textarea" class="water-textarea"  placeholder="请输入"></Input>
			</Form-item>
			<Form-item label="河涌概括" :label-width="70">
				<Input v-model="water.rivdesc" size="small" type="textarea" class="water-textarea"  placeholder="请输入"></Input>
			</Form-item>
		</Form>
		<div class="footer clear">
			<Button @click.native="saveClick" class="pull-right" type="primary" size="small">保存</Button>
		</div>
	</div>
</template>

<script>
	export default {
		mounted: function() {
			let _this = this;
			this.water = this.$store.state.mapCount.strivInfo;
			this.ajaxPost({
				url: _this.url + 'list',
				data: {
					page: 1,
					pageSize: 10,
					searchValue: {}
				},
				success: function(res) {
					_this.table.tbody = res.result;
					_this.table.total = res.totalSize;
				}
			});
		},
		data: function() {
			return {
				url: '/sanfang/onepicture/ztwaterstriv/',
				water: {},
				search: {
					rivname: '',
					rivcode: ''
				},
				showStartRiver: false,
				showEndRiver: false,
				table: {
					thead: [{
						title: '已采集',
						key: 'beencol',
						width: 80,
						align: 'center',
						render: (h, params) => {
							let str = 'close-round';
							if(params.row.beencol === '1') {
								str = 'checkmark-round';
							}
							return h('Icon', {
								props: {
									type: str
								}
							});
						}
					}, {
						title: '河涌代码',
						key: 'rivcode',
						width: 90,
						align: 'center'
					}, {
						title: '河涌名称',
						key: 'rivname'
					}, {
						title: '河涌类别',
						key: 'rivprop',
						width: 90,
						align: 'center'
					}],
					tbody: [],
					total: null
				}
			}
		},
		methods: {
			startClick: function(row) {
				this.water.startstrivname = row.rivname;
				this.showStartRiver = false;
			},
			endClick: function(row) {
				this.water.endstrivname = row.rivname;
				this.showEndRiver = false;
			},
			searchRiv: function() {
				let _this = this;
				let data = {
					page: 1,
					pageSize: 10,
					searchValue: {}
				}
				if(this.search.rivcode !== '') {
					data.pageSize = 30;
					data.searchValue.rivcode = this.search.rivcode;
				}
				if(this.search.rivname !== '') {
					data.pageSize = 30;
					data.searchValue.rivname = this.search.rivname;
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
			pageChange: function(page) {
				let _this = this;
				this.ajaxPost({
					url: _this.url + 'list',
					data: {
						page: page,
						pageSize: 10,
						searchValue: {}
					},
					success: function(res) {
						_this.table.tbody = res.result;
						_this.table.total = res.totalSize;
					}
				})
			},
			saveClick: function() {
				let _this = this;
				this.ajaxPost({
					url: _this.url  + 'edit',
					data: _this.water,
					success: function(res) {
						_this.successWarn('保存成功');
					},
					error: function(res) {
						_this.errorWarn();
					}
				})
			}
		}
	}
</script>
