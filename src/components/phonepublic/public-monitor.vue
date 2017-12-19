<!-- 水位开度，电流监控 -->
<style lang="less">
@import url("../../../static/less/color.less");

</style>


<template>
	<Row>
		<Col :xs="24">
			<Menu mode="horizontal" @on-select="clickFn" active-name="1">
				<MenuItem name="phone">
                    <Icon type="ios-navigate"></Icon>
                    综合监测
                </MenuItem>
                <MenuItem name="publicMap">
                    <Icon type="ios-keypad"></Icon>
                    站点地图
                </MenuItem>
            </Menu>    
		</Col>
        <Col :xs="24">
        	<Table border stripe size="small" :columns="tableColumns" :data="tableData"></Table>
        </Col>
    </Row>
</template>


<script>

export default {
	data () {
		return {
			urlLogin: 'wtxiqiao/sys/userinfo/login',
			urlGetTableData: 'wtxiqiao/waterresource/rlddevicerunrec/listcurrent',
			tableColumns: [
				{
					title: '站点名称',
					key: 'stn_name',
					fixed: 'left'
				}, {
					title: '数据时间',
					key: 'data_time',
					render: (h, params) => {
						var ret = params.row.data_time;
						ret = ret.substring(5);
						ret = ret.substring(0, ret.length - 3);
						return ret;
					},
				}, {
					title: '内江水位(m)',
					key: 'water_river_in',
					width: 40
				}, {
					title: '外江水位(m)',
					key: 'water_river_out',
					width: 40
				}, {
					title: '泵状态',
					key: 'pumpstatus',
				}, {
					title: '闸门状态',
					key: 'gatestatus',
				}
			],
			tableData: [],
		}
	},
	methods: {
		clickFn: function(data) {
			this.$router.push('/' + data);
		},
		login: function() {
			var that = this;
			var params = {};
			params.data = {};
			console.log(1111111)
			params.data.username = "public";
			params.data.password = "123456";
			params.data.system_id = parameters.system_id;
			params.url = this.urlLogin;
			params.success = function(res) {
				that.$Loading.finish();
				console.log(res.data);
				if (res.data.code === '0000') {
					console.log(5555555)
					that.setKey('realname', res.data.result.realname);
					that.setKey('department', JSON.stringify(res.data.result.department));
					that.setKey('username', res.data.result.username);
					that.setKey('token',    res.data.result.token);
					that.setKey('userid',   res.data.result.userid);
					that.setKey('roles',    JSON.stringify(res.data.result.roles));
					that.setKey('alermSound', true);
					}
				}
			this.ajaxPost(params);
		},
		getTableData: function() {
			var that = this;
			var params = {};
			params.data = {};
			params.data.system_id = parameters.system_id;
			params.data.page = 1;
			params.data.pageSize = 50;
			params.data.orders = 'data_time';
			params.data.searchValue = {};
			params.token = this.getKey('token');
			params.url = this.urlGetTableData;
			params.success = function(res) {
				that.$Loading.finish();
				that.tableData = res.data.result;
				console.log(that.tableData);
			}
			this.ajaxPost(params);
		},
	},
	mounted: function() {
		var that = this;
		var timer = setInterval(function() {
			if(that.getKey('token')) {
				that.getTableData();
				clearInterval(timer);
			}else{
				that.login();
			}
		}, 200);
		
	},
	created() {
		this.$bus.emit('showTopNav');
	},
}
</script>
