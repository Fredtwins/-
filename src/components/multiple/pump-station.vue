<!-- 泵站信息管理 -->
<style lang="less">
@import url("../../../static/less/color.less");
	.ivu-card-bordered {
		float: left;
		width: 100%;
	}
	.modal-pump{
		.ivu-modal-body {
			float: left;
		}
	}
	
	#myMap1{
		width: 100%;
		height: 200px;
	}
	.smallInput{
		width: 250px!important;
	}
	.smallInput2{
		width: 236px!important;
	}
	.redStar{
		color: red;
		float: right;
		margin-left: 5px;
	}
</style>


<template>
	<div class="">
		<side-nav></side-nav>
		<i-col span="21">
             
            <Breadcrumb class="ml32">
            	<Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">基础信息</Breadcrumb-item>
                <Breadcrumb-item class="blue">泵站信息管理</Breadcrumb-item>
            </Breadcrumb>
            <Button class="addBtn" @click="addPumpStation"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Modal
                            v-model="modal1" width="800" class="modal-pump">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="120">
                        		<i-col span="12">
                                	<Form-item label="站号" prop="station_no">
										<Input v-model="formItem.station_no" :maxlength="16" @on-blur="checkName('code')" :readonly="changePumpRead" class="smallInput" placeholder="请输入站号"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="站名" prop="station_name">
										<Input v-model="formItem.station_name" :maxlength="16" @on-blur="checkName('name')" class="smallInput" :readonly="changePumpRead" placeholder="请输入站名"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="片区" prop="area_name">
										<Select v-model="formItem.area_name" clearable style="width:250px">
                                       		<Option v-for="item in areaName" :value="item.name" :key="item.name">{{ item.name }}</Option>
                               			</Select>
                               			<span class="redStar">*</span>
									</Form-item>
									<Form-item label="所在街镇" prop="town">
										<Input v-model="formItem.town" :maxlength="16" class="smallInput" placeholder="请输入街镇"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="建设时间" prop="rebuild_time">
							            <Date-picker type="date" placeholder="请选择建设时间" class="smallInput" format="yyyy-MM-dd" @on-change="change"></Date-picker><span class="redStar">*</span>
							        </Form-item>
							        <Form-item label="历史最高水位" prop="his_level">
										<Input v-model="formItem.his_level" :maxlength="16" class="smallInput" placeholder="历史最高水位"></Input>
									</Form-item>
									<Form-item label="历史最高水位时间" prop="his_level_date">
										<Date-picker type="date" placeholder="请选择建设时间" class="smallInput" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
									</Form-item>
									<Form-item label="突变水位" prop="abrupt_level">
										<Input v-model="formItem.abrupt_level" :maxlength="16" class="smallInput" placeholder="突变水位"></Input>
									</Form-item>
								</i-col>
								<i-col span="12">	
                                	<Form-item label="站点类型" prop="Stion_type">
										<Select v-model="formItem.Stion_type" clearable style="width:250px">
                                       		<Option v-for="item in stionType" :value="item.name" :key="item.name">{{ item.name }}</Option>
                               			</Select>
                               			<span class="redStar">*</span>
									</Form-item>
									<Form-item label="河流" prop="river">
										<Input v-model="formItem.river" :maxlength="16" placeholder="请输入河流" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="所在堤围" prop="dick_name">
										<Input v-model="formItem.dick_name" :maxlength="16" placeholder="请输入堤围" class="smallInput"></Input>
									</Form-item>
									<Form-item label="总装机容量（kw）" prop="installed_capacity">
										<Input v-model="formItem.installed_capacity" :maxlength="16" placeholder="请输入河流" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="机组台数" prop="pump_count">
										<Input v-model="formItem.pump_count" :maxlength="16" placeholder="请输入机组台数" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="水泵口径（单台）" prop="pump_caliber">
										<Input v-model="formItem.pump_caliber" :maxlength="16" placeholder="水泵口径（单台）" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="排水-受益面积(亩)" prop="drain_area">
										<Input v-model="formItem.drain_area" :maxlength="16" class="smallInput" placeholder="排水-受益面积(亩)"></Input>
									</Form-item>
									<Form-item label="灌溉-受益面积(亩)" prop="irrigation_area">
										<Input v-model="formItem.irrigation_area" :maxlength="16" class="smallInput" placeholder="灌溉-受益面积(亩)"></Input>
									</Form-item>
								</i-col>
								<i-col span="24">
									<Card>
						                <p slot="title">常态流程</p>
						                <i-col span="12">
							                <Form-item label="常态内江警戒水位" prop="normal_alarm_level_in">
												<Input v-model="formItem.normal_alarm_level_in" :maxlength="16" class="smallInput2" placeholder="常态内江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="常态外江警戒水位" prop="normal_alarm_level_out">
												<Input v-model="formItem.normal_alarm_level_out" :maxlength="16" class="smallInput2" placeholder="常态外江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
										<i-col span="12">
											<Form-item label="常态内江超限水位" prop="normal_over_level_in">
												<Input v-model="formItem.normal_over_level_in" :maxlength="16" class="smallInput2" placeholder="常态内江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="常态外江超限水位" prop="normal_over_level_in">
												<Input v-model="formItem.normal_over_level_out" :maxlength="16" class="smallInput2" placeholder="常态外江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
						            </Card>
								</i-col>
								<i-col span="24">
									<Card>
						                <p slot="title">排水流程</p>
						                <i-col span="12">
							                <Form-item label="排水内江警戒水位" prop="drain_alarm_level_in">
												<Input v-model="formItem.drain_alarm_level_in" :maxlength="16" class="smallInput2" placeholder="排水内江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="排水外江警戒水位" prop="drain_alarm_level_out">
												<Input v-model="formItem.drain_alarm_level_out" :maxlength="16" class="smallInput2" placeholder="排水外江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
										<i-col span="12">
											<Form-item label="排水内江超限水位" prop="drain_over_level_in">
												<Input v-model="formItem.drain_over_level_in" :maxlength="16" class="smallInput2" placeholder="排水内江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="排水外江江超限水位" prop="drain_over_level_out">
												<Input v-model="formItem.drain_over_level_out" :maxlength="16"  class="smallInput2"placeholder="排水外江江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
						            </Card>
								</i-col>
								<i-col span="24">
									<i-col span="12">
										<Form-item label="经度" prop="lng">
											<Input v-model="formItem.lng" placeholder="经度" readonly class="smallInput"></Input><span class="redStar">*</span>
										</Form-item>
									</i-col>			
									<i-col span="12">
										<Form-item label="纬度" prop="lat">
											<Input v-model="formItem.lat" placeholder="纬度" readonly class="smallInput"></Input><span class="redStar">*</span>
										</Form-item>
									</i-col>
								</i-col>
								<i-col span="24">
									<div id="myMap1">
										
									</div>
								</i-col>	
								<Input v-model="formItem.index" v-if="bucunzai"></Input>
                            </Form>
                            <div slot="footer">
                                <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
                                <Button v-if="btnChange" type="primary" @click="changePump">修改</Button>
                                <Button  @click="cancel">取消</Button>
                            </div>
                        </Modal>
			<div class="center">
				<Table :data="PmupData" :columns="theadArr" stripe></Table>
				<Table ref="table" v-show="bucunzai" :data="PmupAllData" :columns="theadArr" stripe></Table>
				<Page
                        class="pull-right"
                        :total="waterRecordPage.total"
                        :current="waterRecordPage.current"
                        size="small"
                        show-total
                        @on-change="changePage"
                    ></Page>
			</div>
			<Modal v-model="modal2" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>确认删除该个泵站？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
		</i-col>
	</div>
</template>


<script>
	import sideNav from '../analysis/pump-nav.vue';
	let map = null;
	let notionLayer = null;
	let xiqiao_riverLayer = null;
	let waterNetLayer = null;

    export default {
        data () {
            return {
            	urlPumpStationList: "wtxiqiao/waterresource/bsipumpstation/list",
            	urlPumpAddList: "wtxiqiao/waterresource/bsipumpstation/new",
            	urlPumpDelList: "wtxiqiao/waterresource/bsipumpstation/delete",
            	urlPumpEditList: "wtxiqiao/waterresource/bsipumpstation/edit",
            	formItem: {},
            	formInline: {
            		dick_name:'',
            		station_name:''
            	},
            	value1: "",
            	modal1: false,
            	modal2: false,
            	changePumpRead: false,
            	delIndex: "",
            	actionPage: "",
            	dickName: [],
            	stnName: "",
            	btnChange: false,
            	btnSave: false,
            	bucunzai: '',
            	PmupData: [],
            	PmupAllData: [],
            	updateTitle: '',
            	actionPage: "",
            	waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
                areaName: [{
                	name: "大栅片"
                }, {
                	name: "西岸片"
                }, {
                	name: "桑园片"
                }],
                stionType:[{
                	name:"电排站"
                }, {
                	name:"泵站"
                }],
            	theadArr: [{
					title: "站号",
					key: "station_no"
				}, {
					title: "站名",
					key: "station_name"
				}, {
					title: "机组台数",
					key: "pump_count"
				}, {
					title: "内江超限",
					key: "normal_over_level_in"
				}, {
					title: "外江超限",
					key: "normal_over_level_out"
				}, {
					title: "内江警戒",
					key: "normal_alarm_level_in"
				}, {
					title: "外江警戒",
					key: "normal_alarm_level_out"
				}, {
					title: "突变水位",
					key: "abrupt_level"
				}, {
					title: "所属围",
					key: "area_name"
				}, {
					title: "堤围桩号",
					key: "stake_no"
				}, {
					title: "总开机流量",
					key: "total_flow"
				}, {
					title: '用户操作',
					align: 'center',
					width: 150,
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small',
								},
								style: {
									marginRight : '5px'
								},
								on: {
									click: () => {
										this.edit(params.row,params.index)
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small',
								},
								style: {
									marginRight : '5px'
								},
								on: {
									click: () => {
										this.del(params.index)
									}
								}
							}, '删除')
						]);
					}
				}],
            }
        },
        methods: {
        	clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
        	addPumpStation: function() {
        		var that = this;
        		this.updateTitle = "新增泵站";
        		this.btnSave = true;
        		this.btnChange = false;
        		this.modal1 = true;
        		this.changePumpRead = false;
        		this.formItem = {
            		station_no: '',
            		area_name: "",
            		pump_count: "",
            		station_name: '',
            		town: '',
            		rebuild_time: '',
            		his_level: '',
            		his_level_date: '',
            		abrupt_level: '',
            		Stion_type: '',
            		river: '',
            		dick_name: '',
            		installed_capacity: '',
            		pump_caliber: '',
            		drain_area: '',
            		rebuild_time: "",
            		irrigation_area: '',
            		normal_alarm_level_in: '',
            		normal_alarm_level_out: '',
            		normal_over_level_in: '',
            		normal_over_level_out: '',
            		drain_alarm_level_in: '',
            		drain_alarm_level_out: '',
            		drain_over_level_in: '',
            		drain_over_level_out: '',
            		lat: '',
            		lng: ''
            	};

            	var myMap1 = document.getElementById("myMap1");
            	myMap1.innerHTML = "";
            	xiqiao_riverLayer = new ol.layer.Tile({
		          source: new ol.source.TileArcGISRest({
		            url: 'http://202.105.25.138:20462/arcgis/rest/services/xiqiao/xiqiao_small_river_partial/MapServer'
		          })
		        });
		        //镇街名layer
		        notionLayer = new ol.layer.Tile({
		          source: new ol.source.TileArcGISRest({
		            url: "http://202.105.25.138:20462/arcgis/rest/services/data_visualization/notation/MapServer"
		          })
		        });
		        //水网layer
		        waterNetLayer = new ol.layer.Tile({
		          source: new ol.source.TileArcGISRest({
		            url: 'http://202.105.25.138:20462/arcgis/rest/services/data_visualization/guangdong_waterbody_entire/MapServer'
		          })
		        });
		          setTimeout(function() {
		          	  map = new ol.Map({
			          target: myMap1,
			          layers: [waterNetLayer, notionLayer,xiqiao_riverLayer],
			          view: new ol.View({
			            center: [112.94836962890625,22.948907702636717],
			            zoom: 13,
			            maxZoom: 19,
			            minZoom: 3,
			            projection: 'EPSG:4326',
			            extent: [109.6820068359375, 20.264282226562504, 116.8670654296875, 25.3729248046875]
			          }),
			          controls: ol.control.defaults({
			            attribution: false,
			          })
			        });
		          	map.on('singleclick', (evt) => {
		          		var logo = document.getElementsByClassName("ol-overlaycontainer")[0];
		          		logo.innerHTML = "";	
			        	console.log(evt.coordinate[0], evt.coordinate[1]);
			        	that.formItem.lng = evt.coordinate[0];
			        	that.formItem.lat = evt.coordinate[1];
			        	var overImg = document.createElement('img');
					    overImg.setAttribute("src", "static/img/analysis/gis1.png");
					    var img_layer = new ol.Overlay({
					        element: overImg,
					        stopEvent: false,
					        position: [evt.coordinate[0], evt.coordinate[1]]
					    });
					    map.addOverlay(img_layer);
		            });
		          },500)	
		          

        	},
        	ok: function() {
        		var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlPumpAddList;
                params.data.his_level = this.formItem.his_level;
                params.data.his_level_date = this.formItem.his_level_date;
                params.data.abrupt_level = this.formItem.abrupt_level;
                params.data.drain_area = this.formItem.drain_area;
                params.data.irrigation_area = this.formItem.irrigation_area;
                if(this.formItem.station_name !=''){
                   params.data.station_name=this.formItem.station_name; 
                }else{
                    this.$Message.warning({
                            content: '请填写泵站名称'
                        });
                    return;
                }
                if(this.formItem.area_name !=''){
                   params.data.area_name=this.formItem.area_name; 
                }else{
                    this.$Message.warning({
                            content: '请选择片区名称'
                        });
                    return;
                }
                if(this.formItem.station_no !=''){
                   params.data.station_no=this.formItem.station_no; 
                }else{
                    this.$Message.warning({
                            content: '请填写站号'
                        });
                    return;
                }
                if(this.formItem.town !=''){
                   params.data.town=this.formItem.town; 
                }else{
                    this.$Message.warning({
                            content: '请填写所在街镇'
                        });
                    return;
                }
                if(this.formItem.rebuild_time !=''){
                   params.data.rebuild_time=this.formItem.rebuild_time; 
                }else{
                    this.$Message.warning({
                            content: '请选择建设时间'
                        });
                    return;
                }
                if(this.formItem.Stion_type !=''){
                   params.data.Stion_type=this.formItem.Stion_type; 
                }else{
                    this.$Message.warning({
                            content: '请选择站点类型'
                        });
                    return;
                }
                if(this.formItem.river !=''){
                   params.data.river=this.formItem.river; 
                }else{
                    this.$Message.warning({
                            content: '请填写河流'
                        });
                    return;
                }
                if(this.formItem.pump_count !=''){
                   params.data.pump_count=this.formItem.pump_count; 
                }else{
                    this.$Message.warning({
                            content: '请填写机组台数'
                        });
                    return;
                }
                if(this.formItem.dick_name !=''){
                   params.data.dick_name=this.formItem.dick_name; 
                }
                if(this.formItem.installed_capacity !=''){
                   params.data.installed_capacity=this.formItem.installed_capacity; 
                }else{
                    this.$Message.warning({
                            content: '请填写总装机容量'
                        });
                    return;
                }
                if(this.formItem.pump_caliber !=''){
                   params.data.pump_caliber=this.formItem.pump_caliber; 
                }else{
                    this.$Message.warning({
                            content: '请填写水泵口径'
                        });
                    return;
                }
                if(this.formItem.normal_alarm_level_in !=''){
                   params.data.normal_alarm_level_in=this.formItem.normal_alarm_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态内江警戒水位'
                        });
                    return;
                }
                if(this.formItem.normal_alarm_level_out !=''){
                   params.data.normal_alarm_level_out = this.formItem.normal_alarm_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态外江警戒水位'
                        });
                    return;
                }
                if(this.formItem.normal_over_level_in !=''){
                   params.data.normal_over_level_in=this.formItem.normal_over_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态内江超限水位'
                        });
                    return;
                }
                if(this.formItem.normal_over_level_out !=''){
                   params.data.normal_over_level_out=this.formItem.normal_over_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态外江超限水位'
                        });
                    return;
                }
                if(this.formItem.drain_alarm_level_in !=''){
                   params.data.drain_alarm_level_in=this.formItem.drain_alarm_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水内江警戒水位'
                        });
                    return;
                }
                if(this.formItem.drain_alarm_level_out !=''){
                   params.data.drain_alarm_level_out = this.formItem.drain_alarm_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水外江警戒水位'
                        });
                    return;
                }
                if(this.formItem.drain_over_level_in !=''){
                   params.data.drain_over_level_in=this.formItem.drain_over_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水内江超限水位'
                        });
                    return;
                }
                if(this.formItem.drain_over_level_out !=''){
                   params.data.drain_over_level_out=this.formItem.drain_over_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水外江超限水位'
                        });
                    return;
                }
                if(this.formItem.lat !=''){
                   params.data.lat=this.formItem.lat;
                   params.data.lng=this.formItem.lng; 
                }else{
                    this.$Message.warning({
                            content: '请填写经纬度'
                        });
                    return;
                }
                console.log(params.data);
                params.success = function(res) {
                    that.$Loading.finish();
                    switch(res.data.code) {
                    	case '0000':
	                    	that.$Message.success({
	                            content: '新增成功'
	                        });
	                    	that.modal1=false;
	                    break;
	                    default:
	                    	that.$Message.warning({
	                            content: res.data.message + " 请重新输入"
	                        });	
                    }
                    
                    that.submitSearch(this.stnName,parseInt(that.actionPage));
                }
                this.ajaxPost(params); 
                
        	},
        	cancel: function () {
        		this.modal1 = false;
        	},
        	submitSearch: function (name,page) {
        		var that = this;
            	var params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		pageSize : 10,
            		order : {"_id":-1},
            		searchValue : {}
            	}
            	if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
                if(page == 0 || page == NaN){
                    params.data.page = 1;
                }
            	params.token = this.getKey('token');
            	params.url = this.urlPumpStationList;
            	if(name !== undefined && name !== ""){
                    params.data.searchValue.station_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                    this.stnName = name;
                }else{
                    params.data.searchValue.station_name = "|#|like";
                }
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.PmupData = res.data.result.result;
	                console.log(that.PmupData);
	                that.waterRecordPage.total = res.data.result.totalSize;
            	}
            	this.ajaxPost(params);
        	},
        	submitSearch2: function (name,page) {
        		var that = this;
            	var params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		pageSize : 10000,
            		order : {"_id":-1},
            		searchValue : {}
            	}
            	if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
            	params.token = this.getKey('token');
            	params.url = this.urlPumpStationList;
            	if(name !== undefined && name !== ""){
                    params.data.searchValue.stn_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                    this.stnName = name;
                }else{
                    params.data.searchValue.stn_name = "|#|like";
                }
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.PmupAllData = res.data.result.result;
            	}
            	this.ajaxPost(params);
        	},
        	changePage: function(page) {
                this.submitSearch(this.stnName,page);
                this.actionPage = page;
            },
            change: function(data) {
            	this.formItem.rebuild_time = data;
            },
            change2: function(data) {
            	this.formItem.his_level_date = data;
            },
        	edit: function(row,index) {
        		var that = this;
        		var myMap1 = document.getElementById("myMap1");
            	myMap1.innerHTML = "";
            	this.updateTitle = "编辑泵站";
            	this.formItem = row;
            	this.formItem.index = index;
        		this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
                this.changePumpRead = true;
                let lat = row.lat;
                let lng = row.lng;
                xiqiao_riverLayer = new ol.layer.Tile({
		          source: new ol.source.TileArcGISRest({
		            url: 'http://202.105.25.138:20462/arcgis/rest/services/xiqiao/xiqiao_small_river_partial/MapServer'
		          })
		        });
		        //镇街名layer
		        notionLayer = new ol.layer.Tile({
		          source: new ol.source.TileArcGISRest({
		            url: "http://202.105.25.138:20462/arcgis/rest/services/data_visualization/notation/MapServer"
		          })
		        });
		        //水网layer
		        waterNetLayer = new ol.layer.Tile({
		          source: new ol.source.TileArcGISRest({
		            url: 'http://202.105.25.138:20462/arcgis/rest/services/data_visualization/guangdong_waterbody_entire/MapServer'
		          })
		        });

		        setTimeout(function() {
		          	map = new ol.Map({
		          	target: myMap1,
			        layers: [waterNetLayer, notionLayer,xiqiao_riverLayer],
			        view: new ol.View({
			            center: [lng,lat],
			            zoom: 13,
			            maxZoom: 19,
			            minZoom: 3,
			            projection: 'EPSG:4326',
			            extent: [109.6820068359375, 20.264282226562504, 116.8670654296875, 25.3729248046875]
			        }),
			        controls: ol.control.defaults({
			            attribution: false,
			          })
			        });
		          	var overImg = document.createElement('img');
				    overImg.setAttribute("src", "static/img/analysis/gis1.png");
				    var img_layer = new ol.Overlay({
				        element: overImg,
				        stopEvent: false,
				        position: [lng, lat]
				    });
				    map.addOverlay(img_layer);


				    map.on('singleclick', (evt) => {
		        		console.log(evt.coordinate[0], evt.coordinate[1]);
		        		var logo = document.getElementsByClassName("ol-overlaycontainer")[0];
		          		logo.innerHTML = "";	
			        	console.log(evt.coordinate[0], evt.coordinate[1]);
			        	that.formItem.lng = evt.coordinate[0];
			        	that.formItem.lat = evt.coordinate[1];
			        	var overImg = document.createElement('img');
					    overImg.setAttribute("src", "static/img/analysis/gis1.png");
					    var img_layer = new ol.Overlay({
					        element: overImg,
					        stopEvent: false,
					        position: [evt.coordinate[0], evt.coordinate[1]]
					    });
					    map.addOverlay(img_layer);

		        	});	
		          },500);

		        
    
        	},
        	del2: function() {
        		var that = this;
                var params = {};
                params.data = {};
                params.data._id = this.PmupData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlPumpDelList;
                 params.success=function(res){
                    that.$Loading.finish();
                    switch(res.data.code) {
                    	case '0000':
	                    	that.$Message.success({
	                            content: '删除成功'
	                        });	                    	
	                    break;
	                    default:
	                    	that.$Message.warning({
	                            content: res.data.message + " 删除失败"
	                        });	
                    }
                    that.modal2=false;
                    that.submitSearch(this.stnName,parseInt(that.actionPage),10);
                }
                 
               this.ajaxPost(params); 
        		
        	},
        	del: function(index) {
            	this.modal2 = true;
        		this.delIndex = index;
            },
            changePump: function() {
                var that = this;
                var index = this.formItem.index;
                var params = {};
                console.log(index);
                params.data = this.PmupData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlPumpEditList;
                if(this.formItem.station_name !=''){
                   params.data.station_name=this.formItem.station_name; 
                }else{
                    this.$Message.warning({
                            content: '请填写站点名称'
                        });
                    return;
                }
                if(this.formItem.station_no !=''){
                   params.data.station_no=this.formItem.station_no; 
                }else{
                    this.$Message.warning({
                            content: '请填写站号'
                        });
                    return;
                }
                if(this.formItem.town !=''){
                   params.data.town=this.formItem.town; 
                }else{
                    this.$Message.warning({
                            content: '请填写所在街镇'
                        });
                    return;
                }
                if(this.formItem.rebuild_time !=''){
                   params.data.rebuild_time=this.formItem.rebuild_time; 
                }else{
                    this.$Message.warning({
                            content: '请选择建设时间'
                        });
                    return;
                }
                if(this.formItem.Stion_type !=''){
                   params.data.Stion_type=this.formItem.Stion_type; 
                }else{
                    this.$Message.warning({
                            content: '请选择站点类型'
                        });
                    return;
                }
                if(this.formItem.area_name !=''){
                   params.data.area_name=this.formItem.area_name; 
                }else{
                    this.$Message.warning({
                            content: '请选择片区名称'
                        });
                    return;
                }
                if(this.formItem.river !=''){
                   params.data.river=this.formItem.river; 
                }else{
                    this.$Message.warning({
                            content: '请填写河流'
                        });
                    return;
                }
                if(this.formItem.dick_name !=''){
                   params.data.dick_name=this.formItem.dick_name; 
                }
                if(this.formItem.installed_capacity !=''){
                   params.data.installed_capacity=this.formItem.installed_capacity; 
                }else{
                    this.$Message.warning({
                            content: '请填写总装机容量'
                        });
                    return;
                }
                if(this.formItem.pump_caliber !=''){
                   params.data.pump_caliber=this.formItem.pump_caliber; 
                }else{
                    this.$Message.warning({
                            content: '请填写水泵口径'
                        });
                    return;
                }
                if(this.formItem.normal_alarm_level_in !=''){
                   params.data.normal_alarm_level_in=this.formItem.normal_alarm_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态内江警戒水位'
                        });
                    return;
                }
                if(this.formItem.normal_alarm_level_out !=''){
                   params.data.normal_alarm_level_out = this.formItem.normal_alarm_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态外江警戒水位'
                        });
                    return;
                }
                if(this.formItem.normal_over_level_in !=''){
                   params.data.normal_over_level_in=this.formItem.normal_over_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态内江超限水位'
                        });
                    return;
                }
                if(this.formItem.normal_over_level_out !=''){
                   params.data.normal_over_level_out=this.formItem.normal_over_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写常态外江超限水位'
                        });
                    return;
                }
                if(this.formItem.drain_alarm_level_in !=''){
                   params.data.drain_alarm_level_in=this.formItem.drain_alarm_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水内江警戒水位'
                        });
                    return;
                }
                if(this.formItem.drain_alarm_level_out !=''){
                   params.data.drain_alarm_level_out = this.formItem.drain_alarm_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水外江警戒水位'
                        });
                    return;
                }
                if(this.formItem.drain_over_level_in !=''){
                   params.data.drain_over_level_in=this.formItem.drain_over_level_in; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水内江超限水位'
                        });
                    return;
                }
                if(this.formItem.drain_over_level_out !=''){
                   params.data.drain_over_level_out=this.formItem.drain_over_level_out; 
                }else{
                    this.$Message.warning({
                            content: '请填写排水外江超限水位'
                        });
                    return;
                }
                if(this.formItem.lat !=''){
                   params.data.lat=this.formItem.lat; 
                }else{
                    this.$Message.warning({
                            content: '请填写经纬度'
                        });
                    return;
                }
                params.data.his_level = this.formItem.his_level;
                params.data.his_level_date = this.formItem.his_level_date;
                params.data.pump_caliber = this.formItem.pump_caliber;
                params.data.drain_area = this.formItem.drain_area;
                params.data.irrigation_area = this.formItem.irrigation_area;             
                params.success=function(res){
                    that.$Loading.finish();
                    switch(res.data.code) {
                    	case '0000':
	                    	that.$Message.success({
	                            content: '修改成功'
	                        });
	                    	that.modal1=false;
	                    break;
	                    default:
	                    	that.$Message.warning({
	                            content: res.data.message + " 请重新输入"
	                        });	
                    }
                    that.submitSearch(this.stnName,parseInt(that.actionPage));
                }  
               this.ajaxPost(params);
               this.modal1=false; 
        	},
        	chaneg: function(data) {
        		this.formItem.rebuild_time = data;
        	},
        	exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '泵站基本信息数据'
                });
            },
            checkName: function(data) {
                var that = this;
                var params = {};
                console.log(data);
                params.data = {
                    system_id : parameters.system_id,
                    page : 1,
                    order : {"_id":-1},
                    searchValue : {}
                }
                if( data === "name"){
                	if(this.formItem.station_name === ""){return};
                    params.data.searchValue.station_name = this.formItem.station_name;
                }
                if( data === "code"){
                	if(this.formItem.station_no === ""){return};
                    params.data.searchValue.station_no = this.formItem.station_no;
                }   
                params.token = this.getKey('token');
                params.url = this.urlPumpStationList;
                console.log(params.data.searchValue);
                params.success = function(res) {
                    if(parseInt(res.data.result.totalSize) !== 0){
                        that.$Message.warning({
                                content: '已被注册'
                            });
                    }else{
                        that.$Message.success({
                                content: '可用'
                            });
                    }
                }
                this.ajaxPost(params);
            },
            doubleSubmitSearch: function() {
            	this.submitSearch();
            	this.submitSearch2();
            },
        },
        mounted: function(){
        	this.submitSearch();
        	this.submitSearch2();
        },
        created() {
            this.$bus.on("stnName",this.submitSearch);
        },
        beforeDestroy() {
            this.$bus.off("stnName",this.submitSearch);
        },
        components: {
            'side-nav': sideNav
        }
    }
</script>
