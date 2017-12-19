<!-- 天气预报 值班信息 雨量信息 -->
<style lang="less">
@import url("../../../static/less/color.less");
.other-card-group {
	*{
		font-size: 14px;
	}
	overflow: hidden;

	.ivu-card-body {
		height: 100%;
		padding: 0;
	}

	.ivu-table-small td {
		height: 25px;
	}

	.weather {
		height: 40%;
		border-bottom: 1px solid #e9eaec;
		
		.ivu-card-head {
			background-color: @navColor;
			
			img {
				margin-top: 3px;
			}

			p {
				color: white;
			}

			a {
				float: right;
				color: white;
			}
		}

		.ivu-card-body {
			height: calc(~"100% - 37px");
		}

		ul {
			height: 100%;
			overflow: hidden;

			li {
				border-top: 1px solid #e9eaec;
				padding: 1% 3%;
				overflow: hidden;
				font-size: 12px;
				line-height: 14px;

				&.item-0 {
					height: 40%;
					border-top: 0;
				}
				&.item-1 {
					overflow-x: auto;
					white-space: nowrap;
					height: 33.3%;

					img {
						vertical-align: middle;
						height: 74%;
						margin: 3% 3px;
					}
				}
				&.item-2 {
					height: 26.7%;
				}
			}
		}
	}

	.shift {
		height: 30%;
		border-bottom: 1px solid #e9eaec;
		
		.ivu-card-head {
			background-color: @navColor;
			
			img {
				margin-top: 3px;
			}

			p {
				color: white;
			}
		}

		.ivu-btn-group {
			margin-top: 4px;
		}
	}

	.rain {
		height: 30%;

		.ivu-card-head {
			background-color: @navColor;
			
			img {
				margin-top: 3px;
			}

			p {
				color: white;
			}
		}
	}

	.title-btn {
		float: right;
		height: 20px;

		.ivu-btn {
			padding: 0 7px;

			span {
				line-height: 18px;
			}
		}
	}
}

.modal-sign-in {

	.sub-title {
		padding: 5px 0;
		font-size: 14px;
	}

	.no-info {
		text-align: center;
	}
}
</style>


<template>
	<Card dis-hover class="other-card-group h100">

		<Card dis-hover class="weather">
			<p slot="title">
				<img src="../../../static/img/monitor/tianqi.png" height="20" width="20" alt="">
				天气预报
				<a href="https://tf.istrongcloud.com/release/index-id.html?id=1260216490&from=groupmessage&isappinstalled=0#route" target="_blank" title=""><img style="margin-top:-3px" src="../../../static/img/monitor/tf.png" height="30" width="30" alt="">台风</a>
				<!-- <a href="http://www.gd3f.gov.cn:9001/ImageView/View.aspx?m=cloud" target="_blank" title=""><img style="margin-top:-3px" src="../../../static/img/monitor/yt.png" height="30" width="30" alt="">云图</a>
				<a href="http://www.fs121.com/Radar.aspx" target="_blank" title=""><img style="margin-top:-3px" src="../../../static/img/monitor/ldt.png" height="30" width="30" alt="">雷达</a> -->
			</p>
			<ul>
				<template v-if="weatherData.length > 0">
					<li class='item-0'>
						<div v-for="(v, k) in weatherData">
							<p>{{v.efdate}}</p>
							<p>温度：{{v.tmax}}~{{v.tmin}}℃<template v-if="v.hmax && v.hmin"> 湿度：{{v.hmax}}~{{v.hmin}}%</template></p>
							<p>{{v.ws}}</p>
							<p>{{v.wind}}</p>
						</div>
					</li>	
				</template>
				<template v-else>
					<li class="item-0">
						<div v-for="(v, k) in weatherData2">
							<p>{{v.efdate}}</p>
							<p>温度：{{v.tmax}}~{{v.tmin}}℃<template v-if="v.hmax && v.hmin"> 湿度：{{v.hmax}}~{{v.hmin}}%</template></p>
							<p>{{v.ws}}</p>
							<p>{{v.wind}}</p>
						</div>
					</li>
				</template>
				<li class="item-1">
					<template v-if="weatherWarnData.length > 0">
						<img v-for="i in weatherWarnData" :src="'static/img/weatherAlerm/' + i.code + '.png'" alt="" :title="i.name">
					</template>
					<template v-else>
						<img src="static/img/weatherAlerm/no-alerm.gif" alt="" title="无预警">
					</template>
				</li>
				<li class="item-2">
					<p>高潮位时间:<span v-for="item in tide.max_tidal_time">{{item}} </span></p>
					<p>低潮位时间:<span v-for="item in tide.min_tidal_time">{{item}} </span></p>
				</li>
			</ul>
		</Card>
		<Card dis-hover class="shift">
			<p slot="title">
				<img src="../../../static/img/monitor/duty.png" height="20" width="20" alt="">
				值班信息
				<!-- <Button-group class="title-btn">
				   <Button :type="'primary'" @click="modalSignIn = true">
					   签到
				   </Button>
				   <Button :type="'primary'" @click="modalSignOut = true">
					   交班
				   </Button>
							   </Button-group> -->
			</p>
			<div class="">
				<Table border stripe size="small" :height="shiftTableSize.height" :columns="shiftTableColumns" :data="DutyUser"></Table>
			</div>
		</Card>
		<Card dis-hover class="rain">
			<p slot="title">
				<img src="../../../static/img/monitor/rain.png" height="20" width="20" alt="">
				雨量信息
			</p>
			<div class="" v-if="rainTableData.length > 0">
				<Table border stripe size="small" :height="rainTableSize.height" :columns="rainTableColumns" :data="rainTableData"></Table>
			</div>
			<div v-else>
				<Table border stripe size="small" :height="rainTableSize.height" :columns="rainTableColumns" :data="rainTableData2"></Table>
			</div>
		</Card>
		<Modal
			v-model="modalSignIn"
			title="输入密码"
			@on-ok="submitShiftSignIn"
			okText="提交"
			loding="true"
		>
			<Input v-model="passWord" type="password" placeholder="请输入您的登录密码"></Input>
		</Modal>
		<!-- <Modal
			v-model="modalSignIn"
			title="签到"
			class-name="modal-sign-in"
		>
			<p class="sub-title">人员列表</p>
			<template v-if="shiftUserSignIn.allUser.length > 0">
				<Button  v-for=" i in shiftUserSignIn.allUser" size="large" style="margin: 0 3px 3px 0;" @click="submitShiftSignIn(i)">{{ i }}</Button>
			</template>
			<template v-else>
				<p class="no-info">暂无人员</p>
			</template>
			<p class="sub-title">已签到</p>
			<template v-if="shiftUserSignIn.isSign.length > 0">
				<div v-for="i in shiftUserSignIn.isSign">
					<p class="clear" style="font-size: 14px;">
						<b class="pull-left" style="margin-left: 20px;">{{i.duty_person}}</b>
						<span class="pull-right" style="margin-right: 100px">{{i.signed_time}}</span>
					</p>
				</div>
			</template>
			<template v-else>
				<p class="no-info">暂无人员</p>
			</template>
			<div slot="footer"></div>
		</Modal> -->
		
	</Card>

</template>


<script>
    export default {
        data () {
            return {
				urlWeather: 'wtxiqiao/waterresource/frcweatherinfo/listcurrent',
				urlWeatherWarn: 'wtxiqiao/waterresource/fscurrentwaring/listcurrent',
				urlRain: 'wtxiqiao/waterresource/rldrain/listcurrent',
				urlSubmitSignIn: 'wtxiqiao/waterresource/dutdutyrecord/checkin',
				urlSubmitSignOut: 'wtxiqiao/waterresource/dutdutyrecord/checkout',
				urlGetHasSignInUser: 'wtxiqiao/waterresource/dutdutyrecord/checkinpersion',
				urlGetUserList: 'wtxiqiao/waterresource/dutdutyrecord/todaydutyrec',
				urlGetShiftList: 'wtxiqiao/waterresource/dutdutyrecord/personrecord',
				urlTideList: "wtxiqiao/waterresource/tidal/listcurrent",
				checkIndex: "",
				modalSignIn: false,
				modalSignOut: false,
				tide: "",
				passWord: "",   
				DutyUser: [],
				shiftUserSignIn: {
					isSign: [
						// '张三'
					],
					allUser: [
						// '李四'
					]
				},
				shiftUserSignOutSelect: '',
				shiftUserSignOut: [
					// {value: '张三'}
                ],
				shiftSignOutInfo: '',
				rainTableSize: {
					width: 1,
					height: 1
				},
				rainTableData2: [
					{
						hourrain: 1,
						stn_name: "南海西樵简村小学",
						stn_no: "G6820",
						todayRain: 1,
						yestRain: 1
					}, {
						hourrain: 0,
						stn_name: "南海西樵儒溪鱼苗场",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}, {
						hourrain: 0,
						stn_name: "南海西樵官山大泵站",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}, {
						hourrain: 0,
						stn_name: "南海西樵山山顶",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}, {
						hourrain: 0,
						stn_name: "南海西樵平沙村委",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}, {
						hourrain: 0,
						stn_name: "南海西樵水务所(崇南)",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}, {
						hourrain: 0,
						stn_name: "南海西樵新田小学",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}, {
						hourrain: 0,
						stn_name: "南海西樵西岸学校",
						stn_no: "G6820",
						todayRain: 0,
						yestRain: 0
					}
				],
				weatherData2: [
					{
						city_name: "佛山",
						content: "预计今天夜间（有效时间：20日20时至21日08时） 最高温度:30 最低温度:26 相对湿度最高:95 相对湿度最低:75 多云 东南风2级",
						create_time: "2017-07-21 06:59:10",
						createdt: "2017-07-21 17:00:43",
						data_time: "2017-07-21 16:00:00",
						efdate: "预计今天夜间（有效时间：20日20时至21日08时）",
						flag: 0,
						forecast_period: "12",
						hmax: 95,
						hmin: 75,
						source: "南海气象局",
						tmax: 30,
						tmin: 26,
						wind: "东南风2级",
						ws: "多云",
						_id: "5971c2bbb9042036aa4cffb5"
					}
				],
				rainTableColumns: [
					{
						title: '站点名称',
						key: 'stn_name',
					}, {
						title: '实时雨量',
						key: 'hourrain',
						width: 100
					}, {
						title: '今日雨量',
						key: 'todayRain',
						width: 80
					}, {
						title: '昨日雨量',
						key: 'yestRain',
						width: 80
					}
				],
				rainTableData: [],
				shiftTableSize: {
					width: 1,
					height: 1
				},
				shiftTableColumns: [
					{
						title: '人员',
						key: 'duty_person',
						width: 150
					}, {
						title: '签到时间',
						key: 'signed_time',
						width: 150
					}, {
						title: '操作',
						render: (h, param) => {
							if(param.row.signed_time === ""){
								return h('div', [
                                            h('Button', {
                                                props: {
                                                    type: 'primary',
                                                    size: 'small'
                                                },
                                                style: {
                                                    marginRight: '5px'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.send(param.index)
                                                    }
                                                }
                                            }, '签到'),
                                        ]);
							}else{
								return "已签到";
							}
						}
					}
				],
				
				weatherData: [],
				weatherWarnData: [],
            }
        },
		methods: {
			send: function(index) {
				this.modalSignIn = true;
				this.passWord = "";
				this.checkIndex = index;
			},
			// 获取天气
			getWeatherData: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.page = 1;
				params.data.pageSize = 50;
				params.data.orders = {"data_time": -1};
				// params.data.searchValue = {
				// 	// "forecast_period": '3'
				// };
				params.token = this.getKey('token');
				params.url = this.urlWeather;
				params.success = function(res) {
					that.$Loading.finish();
					that.weatherData = res.data.result.result;
					 console.log(res.data.result.result);
				}
				this.ajaxPost(params);
			},
			// 获取天气预警信息
			getWeatherWarnData: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlWeatherWarn;
				params.success = function(res) {
					that.$Loading.finish();
					that.weatherWarnData = res.data.result.result;
					// console.log(res.data.result.result);
				}
				this.ajaxPost(params);
			},
			// 获取雨量
			getRainData: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlRain;
				params.success = function(res) {
					that.$Loading.finish();
					that.rainTableData = res.data.result;
					// console.log(res.data.result);
				}
				this.ajaxPost(params);
			},
			// 获取所有人员列表
			/*getAllUserList: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlGetUserList;
				params.success = function(res) {
					that.$Loading.finish();
					that.shiftTableData = res.data.result.result;
					console.log(111111);
					console.log(that.shiftTableData);
				}
				this.ajaxPost(params);
			},*/
			// 获取已经签到人员列表
			/*getHasSingInUser: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlGetHasSignInUser;
				params.success = function(res) {
					that.$Loading.finish();
					if (res.data.code === '0000') {
						that.shiftUserSignIn.isSign = res.data.result.personList;
					}
				}
				this.ajaxPost(params);
			},*/
			// 获取值班信息表格内容
			getShiftList: function() {
				var that = this;
				var params = {};
				params.data = {};
				console.log(this);
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlGetUserList;
				params.success = function(res) {
					that.$Loading.finish();
					if (res.data.code === '0000') {
						that.DutyUser = res.data.result;
						// console.log(res)
					}
				}
				this.ajaxPost(params);
			},
			// 提交签到
			submitShiftSignIn: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.password = this.passWord;
				params.data.duty_person = this.DutyUser[this.checkIndex].duty_person;
				params.token = this.getKey('token');
				params.url = this.urlSubmitSignIn;
				params.success = function(res) {
					that.$Loading.finish();
					if (res.data.code === '0000') {
						that.$Message.success('签到成功');
						that.getShiftList();

					} else if (res.data.code === '0001') {
						that.$Message.warning('密码错误!');
					} else {
						that.$Message.success('签到失败');
					}
				}
				//this.$store.state.isLoadingShow = true;
				this.ajaxPost(params);

			},
			// 提交交班
			/*submitShiftSignOut: function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.data.duty_person = this.shiftUserSignOutSelect;
				params.data.exchange_remark = this.shiftSignOutInfo;
				params.token = this.getKey('token');
				params.url = this.urlSubmitSignOut;
				params.success = function(res) {
					that.$Loading.finish();
					if (res.data.code === '0000') {
						that.$Message.success('交班成功');
						that.shiftUserSignOutSelect = '';
						that.shiftSignOutInfo = '';
						setTimeout(function() {
							that.getShiftList();
							that.getHasSingInUser();
						}, 500);
					} else {
						that.$Message.error('交班失败');
					}
					console.log(res.data.code);

				}
				//this.$store.state.isLoadingShow = true;
				this.ajaxPost(params);
			},*/
			getTide : function() {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.token = this.getKey('token');
				params.url = this.urlTideList;
				params.success = function(res) {
					that.tide = res.data.result;	
				}
				this.ajaxPost(params);
			}
		},
		watch: {
			'$store.state.monitorMiddleBig': function() {
				this.getTableSize('.rain', ['.ivu-card-head'], 'rainTableSize');
				this.getTableSize('.shift', ['.ivu-card-head'], 'shiftTableSize');
			}
		},
		mounted: function() {
			var that = this;
			this.getWeatherData();
			this.getWeatherWarnData();
			this.getRainData();
			//this.getAllUserList();
			this.getShiftList();
			//this.getHasSingInUser();
			this.getTide();
			this.getTableSize('.rain', ['.ivu-card-head'], 'rainTableSize');
			this.getTableSize('.shift', ['.ivu-card-head'], 'shiftTableSize');

			setInterval(function() {
				that.getWeatherData();
				that.getWeatherWarnData();
				that.getRainData();
				//that.getAllUserList();
				that.getShiftList();
			}, 120000);

			$(window).on('resize', function() {
				that.getTableSize('.rain', ['.ivu-card-head'], 'rainTableSize');
				that.getTableSize('.shift', ['.ivu-card-head'], 'shiftTableSize');
			});
		}
    }
</script>
