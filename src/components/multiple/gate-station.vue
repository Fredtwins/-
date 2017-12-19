<!-- 闸站信息管理 -->
<style lang="less">
@import url("../../../static/less/color.less");
	#myMap2{
		width: 100%;
		height: 200px;
	}
</style>


<template>
	<div class="">
		<side-nav></side-nav>
		<i-col span="21">
            
            <Breadcrumb class="ml32">
            	<Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">基础信息</Breadcrumb-item>
                <Breadcrumb-item class="blue">闸站信息管理</Breadcrumb-item> 
            </Breadcrumb>
            <Button class="addBtn" @click="addGate"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Modal
                            v-model="modal1" width="800" class="modal-pump">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="120">
                        		<i-col span="12">

                                	<Form-item label="站号" prop="id">
										<Input v-model="formItem.id" :readonly="changePumpRead" @on-blur="checkName('code')" :maxlength="16" class="smallInput" placeholder="请输入站号"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="站名" prop="sluicegate_name">
										<Input v-model="formItem.sluicegate_name" :maxlength="16" @on-blur="checkName('name')" :readonly="changePumpRead" class="smallInput" placeholder="请输入站名"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="河流" prop="river">
										<Input v-model="formItem.river" class="smallInput" :maxlength="16" placeholder="请输入河流"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="片区" prop="area_name">
										<Select v-model="formItem.area_name" clearable style="width:250px">
                                       		<Option v-for="item in areaName" :value="item.name" :key="item.name">{{ item.name }}</Option>
                               			</Select>
                               			<span class="redStar">*</span>
									</Form-item>
									<Form-item label="所在街镇" prop="town">
							            <Input v-model="formItem.town" class="smallInput" :maxlength="16" placeholder="请输入街镇"></Input><span class="redStar">*</span>
							        </Form-item>
							        <Form-item label="所在堤围" prop="dick_name">
										<Input v-model="formItem.dick_name" class="smallInput" :maxlength="16" placeholder="请输入堤围"></Input>
									</Form-item>
									<Form-item label="堤围桩号" prop="stake_no">
										<Input v-model="formItem.stake_no" class="smallInput" :maxlength="16" placeholder="请输入堤围桩号"></Input>
									</Form-item>
									<Form-item label="建设时间" prop="rebuild_time">
							            <Date-picker type="date" placeholder="请选择建设时间" class="smallInput" format="yyyy-MM-dd" @on-change="change"></Date-picker><span class="redStar">*</span>
							        </Form-item>
							        <Form-item label="捍卫面积" prop="defence_area">
										<Input v-model="formItem.defence_area" class="smallInput" :maxlength="16" placeholder="请输入捍卫面积"></Input>
									</Form-item>
									<Form-item label="闸门类型" prop="sluicegate_type">
										<Select v-model="formItem.sluicegate_type" clearable style="width:250px">
											<Option v-for="item in sluicegateType" :value="item.value" :key="item.name">{{ item.name }}</Option>
                               			</Select>
                               			<span class="redStar">*</span>
									</Form-item>
							        <Form-item label="历史最高水位" prop="his_level">
										<Input v-model="formItem.his_level" class="smallInput" :maxlength="16" placeholder="历史最高水位"></Input>
									</Form-item>
									<Form-item label="历史最高水位时间" prop="his_level_date">
										<Date-picker type="date" placeholder="请选择建设时间" class="smallInput" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
									</Form-item>
								</i-col>
								<i-col span="12">	
                                	<Form-item label="设计流量" prop="flow">
										<Input v-model="formItem.flow" placeholder="请输入设计流量" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="设计启闭水头差" prop="waterhead">
										<Input v-model="formItem.waterhead" placeholder="设计启闭水头差" :maxlength="16" class="smallInput"></Input>
									</Form-item>
									<Form-item label="闸门形式及材料" prop="gate_material">
										<Input v-model="formItem.gate_material" placeholder="闸门形式及材料" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="闸门启闭形式" prop="gate_form">
										<Input v-model="formItem.gate_form" placeholder="闸门启闭形式" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="闸底板高程" prop="board_height">
										<Input v-model="formItem.board_height" placeholder="闸底板高程" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="孔数" prop="holes">
										<Input v-model="formItem.holes" placeholder="孔数" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="每孔净宽(m)" prop="hole_width">
										<Input v-model="formItem.hole_width" placeholder="每孔净宽(m)" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="每孔净宽(m)" prop="hole_hight">
										<Input v-model="formItem.hole_hight" placeholder="孔高" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="闸室总长(m)" prop="gateroom_length">
										<Input v-model="formItem.gateroom_length" placeholder="闸室总长(m)" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="船室净宽(m)" prop="shiproom_width">
										<Input v-model="formItem.shiproom_width" placeholder="船室净宽(m)" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="船室总长(m)" prop="shiproom_length">
										<Input v-model="formItem.shiproom_length" placeholder="船室总长(m)" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="突变水位" prop="abrupt_level">
										<Input v-model="formItem.abrupt_level" placeholder="突变水位" :maxlength="16" class="smallInput"></Input><span class="redStar">*</span>
									</Form-item>
								</i-col>
								<i-col span="24">
									<Card>
						                <p slot="title">常态流程</p>
						                <i-col span="12">
							                <Form-item label="常态内江警戒水位" prop="normal_alarm_level_in">
												<Input v-model="formItem.normal_alarm_level_in" class="smallInput2" :maxlength="16" placeholder="常态内江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="常态外江警戒水位" prop="normal_alarm_level_out">
												<Input v-model="formItem.normal_alarm_level_out" class="smallInput2" :maxlength="16" placeholder="常态外江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
										<i-col span="12">
											<Form-item label="常态内江超限水位" prop="normal_over_level_in">
												<Input v-model="formItem.normal_over_level_in" class="smallInput2" :maxlength="16" placeholder="常态内江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="常态外江超限水位" prop="normal_over_level_out">
												<Input v-model="formItem.normal_over_level_out" class="smallInput2" :maxlength="16" placeholder="常态外江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
						            </Card>
								</i-col>
								<i-col span="24">
									<Card>
						                <p slot="title">排水流程</p>
						                <i-col span="12">
							                <Form-item label="排水内江警戒水位" prop="drain_alarm_level_in">
												<Input v-model="formItem.drain_alarm_level_in" class="smallInput2"  :maxlength="16" placeholder="排水内江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="排水外江警戒水位" prop="drain_alarm_level_out">
												<Input v-model="formItem.drain_alarm_level_out" class="smallInput2"  :maxlength="16" placeholder="排水外江警戒水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
										<i-col span="12">
											<Form-item label="排水内江超限水位" prop="drain_over_level_in">
												<Input v-model="formItem.drain_over_level_in" class="smallInput2"  :maxlength="16" placeholder="排水内江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
											<Form-item label="排水外江江超限水位" prop="drain_over_level_out">
												<Input v-model="formItem.drain_over_level_out"  class="smallInput2" :maxlength="16" placeholder="排水外江江超限水位"></Input><span class="redStar">*</span>
											</Form-item>
										</i-col>
						            </Card>
								</i-col>
								<i-col span="24">
									<i-col span="12">
										<Form-item label="经度" prop="lng">
											<Input v-model="formItem.lng" readonly placeholder="经度" class="smallInput"></Input><span class="redStar">*</span>
										</Form-item>
									</i-col>			
									<i-col span="12">
										<Form-item label="纬度" prop="lat">
											<Input v-model="formItem.lat" readonly placeholder="纬度" class="smallInput"></Input><span class="redStar">*</span>
										</Form-item>
									</i-col>
								</i-col>
								<i-col span="24">
									<div id="myMap2">
										
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
			<Modal v-model="modal2" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>确认删除该个闸站？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table :data="GateData" :columns="theadArr" stripe></Table>
				<Table ref="table" :data="GateAllData" v-show="bucunzai" :columns="theadArr" stripe></Table>
				<Page
                        class="pull-right"
                        :total="waterRecordPage.total"
                        :current="waterRecordPage.current"
                        size="small"
                        show-total
                        @on-change="changePage"
                    ></Page>
			</div>
		</i-col>
	</div>
</template>


<script>
	import sideNav from '../analysis/gate-nav.vue';
	let map = null;
	let notionLayer = null;
	let xiqiao_riverLayer = null;
	let waterNetLayer = null;
    export default {
        data () {
            return {
            	urlGateStationList: "wtxiqiao/waterresource/bsisluicegate/list",
            	urlGateAddList: "wtxiqiao/waterresource/bsisluicegate/new",
            	urlGateDelList: "wtxiqiao/waterresource/bsisluicegate/delete",
            	urlGateEditList: "wtxiqiao/waterresource/bsisluicegate/edit",
            	formItem: {},
            	formInline: {
            		dick_name:'',
            		sluicegate_name:''
            	},
            	value1: "",
            	modal1: false,
            	modal2: false,
            	changePumpRead: false,
            	delIndex: "",
            	stnName: "",
            	btnChange: false,
            	btnSave: false,
            	bucunzai: '',
            	actionPage: "",
            	GateData: [],
            	GateAllData: [],
            	value1: "",
            	updateTitle: '',
            	sluicegateType: [{
            		name: "中型水闸",
            		value: 1
            	}, {
					name: "中型船闸",
					value: 2            		
            	}, {
 					name: "小型窦闸",
 					value: 3          		
            	}, {
 					name: "电排站穿堤涵管",
 					value: 4         		
            	}],
            	areaName: [{
                	name: "大栅片"
                }, {
                	name: "西岸片"
                }, {
                	name: "桑园片"
                }],
            	theadArr: [{
					title: "闸号",
					key: "id"
				}, {
					title: "涵闸名称",
					key: "sluicegate_name"
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
					key: "flow"
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
				waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        },
        methods: {
        	clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
        	addGate: function() {
        		var that = this; 
        		this.updateTitle = "新增闸站";
        		this.btnChange = false;
        		this.btnSave = true;
        		this.modal1 = true;
        		this.changePumpRead = false;
        		this.formItem = {
            		id: '',
            		sluicegate_name: '',
            		town: '',
            		rebuild_time: '',
            		area_name: "",
            		his_level: '',
            		his_level_date: '',
            		abrupt_level: '',
            		sluicegate_type: '',
            		river: '',
            		dick_name: '',
            		rebuild_time: "",
            		normal_alarm_level_in: '',
            		normal_alarm_level_out: '',
            		normal_over_level_in: '',
            		normal_over_level_out: '',
            		drain_alarm_level_in: '',
            		drain_alarm_level_out: '',
            		drain_over_level_in: '',
            		drain_over_level_out: '',
            		lat: '',
            		lng: '',
            		stake_no: "",
            		defence_area: "",
					flow: "",
					waterhead: "",
					gate_material: "",
					gate_form: "",
					board_height: "",
					holes: "",
					hole_width: "",
					hole_hight: "",
					gateroom_length: "",
					shiproom_width: "",
					shiproom_length: "",
            	};

            	var myMap2 = document.getElementById("myMap2");
            	myMap2.innerHTML = "";
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
			          target: myMap2,
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
			        	console.log(that);
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
                params.url = this.urlGateAddList;
                params.data.his_level = this.formItem.his_level;
                params.data.his_level_date = this.formItem.his_level_date;
                params.data.defence_area = this.formItem.defence_area;
                params.data.waterhead = this.formItem.waterhead;
                if(this.formItem.sluicegate_name !=''){
                   params.data.sluicegate_name = this.formItem.sluicegate_name; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸站名称'
                        });
                    return;
                }
                if(this.formItem.id !=''){
                   params.data.id = this.formItem.id; 
                }else{
                    this.$Message.warning({
                            content: '请填写站号'
                        });
                    return;
                }
                if(this.formItem.town !=''){
                   params.data.town = this.formItem.town; 
                }else{
                    this.$Message.warning({
                            content: '请填写所在街镇'
                        });
                    return;
                }
                if(this.formItem.rebuild_time !=''){
                   params.data.rebuild_time = this.formItem.rebuild_time; 
                }else{
                    this.$Message.warning({
                            content: '请选择建设时间'
                        });
                    return;
                }
                console.log(this.formItem.sluicegate_type);
                if(this.formItem.sluicegate_type !=''){
                   params.data.sluicegate_type = this.formItem.sluicegate_type; 
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
                if(this.formItem.dick_name !=''){
                   params.data.dick_name = this.formItem.dick_name; 
                }
                if(this.formItem.stake_no !=''){
                   params.data.stake_no=this.formItem.stake_no; 
                }
                if(this.formItem.flow !=''){
                   params.data.flow=this.formItem.flow; 
                }else{
                    this.$Message.warning({
                            content: '请填写设计流量'
                        });
                    return;
                }
                if(this.formItem.gate_material !=''){
                   params.data.gate_material = this.formItem.gate_material; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸门形式及材料'
                        });
                    return;
                }
                if(this.formItem.gate_form !=''){
                   params.data.gate_form = this.formItem.gate_form; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸门启闭形式'
                        });
                    return;
                }
                if(this.formItem.board_height !=''){
                   params.data.board_height = this.formItem.board_height; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸底板高程'
                        });
                    return;
                }
                if(this.formItem.holes !=''){
                   params.data.holes = this.formItem.holes; 
                }else{
                    this.$Message.warning({
                            content: '请填写孔数'
                        });
                    return;
                }
                if(this.formItem.hole_width !=''){
                   params.data.hole_width=this.formItem.hole_width; 
                }else{
                    this.$Message.warning({
                            content: '请填写孔宽'
                        });
                    return;
                }
                if(this.formItem.hole_hight !=''){
                   params.data.hole_hight = this.formItem.hole_hight; 
                }else{
                    this.$Message.warning({
                            content: '请填写孔高'
                        });
                    return;
                }
                if(this.formItem.gateroom_length !=''){
                   params.data.gateroom_length=this.formItem.gateroom_length; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸室总长'
                        });
                    return;
                }
                if(this.formItem.abrupt_level !=''){
                   params.data.abrupt_level=this.formItem.abrupt_level; 
                }else{
                    this.$Message.warning({
                            content: '请填写突变水位'
                        });
                    return;
                }
                /*if(this.formItem.shiproom_width !=''){
                   params.data.shiproom_width=this.formItem.shiproom_width; 
                }else{
                    this.$Message.warning({
                            content: '请填写船室净宽'
                        });
                    return;
                }if(this.formItem.shiproom_length !=''){
                   params.data.shiproom_length=this.formItem.shiproom_length; 
                }else{
                    this.$Message.warning({
                            content: '请填写船室总长'
                        });
                    return;
                }*/
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
                   params.data.lat = this.formItem.lat;
                   params.data.lng = this.formItem.lng; 
                }else{
                    this.$Message.warning({
                            content: '请填写经纬度'
                        });
                    return;
                }
                if(this.formItem.area_name !=''){
                   params.data.area_name = this.formItem.area_name; 
                }else{
                    this.$Message.warning({
                            content: '请选择片区名'
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
                            that.$Message.success({
                                content: res.data.message + " 请重新输入"
                            }); 
                    }
                    that.submitSearch(this.stnName,parseInt(that.actionPage),10);
                }
                this.ajaxPost(params); 
        	},
        	cancel: function() {
        		this.modal1 = false;
        	},
        	submitSearch: function(name,page,pageSize) {
        		var that = this;
            	var params = {};
            	params.data = {
            		system_id : parameters.system_id,
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
                if(pageSize === undefined || pageSize == 0){
                    params.data.pageSize = 10;
                    pageSize = 10;
                }else{
                    params.data.pageSize = pageSize;
                }
                params.data.pageSize = pageSize;
            	params.token = this.getKey('token');
            	params.url = this.urlGateStationList;
            	if(this.formInline.dick_name !== ''){
            		params.data.searchValue.area_name=this.formInline.dick_name;
            	}
            	if(name !== undefined && name !== ""){
                    params.data.searchValue.sluicegate_name = name+"|#|like";//数据库该字段后面有空格，需要使用模糊查询
                    this.stnName = name;
                }else{
                    params.data.searchValue.sluicegate_name = "|#|like";
                }
            	if(parseInt(pageSize) === 10){
            		params.success = function(res) {
		                that.$Loading.finish();
		                that.GateData = res.data.result.result;
		                that.waterRecordPage.total = res.data.result.totalSize;
	            	}
            	}
            	if(parseInt(pageSize) === 1000){
            		params.success = function(res) {
		                that.$Loading.finish();
		                that.GateAllData = res.data.result.result;
	            	}
            	}
            	
            	this.ajaxPost(params);
        	},
        	doubleSubmitSearch: function() {
                this.submitSearch(this.stnName,1,10);
                this.submitSearch(this.stnName,1,1000);
            },
        	changePage: function(page) {
                this.submitSearch(this.stnName,page,10);
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
        		var myMap2 = document.getElementById("myMap2");
            	myMap2.innerHTML = "";
            	this.updateTitle = "编辑闸站";
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
		          	target: myMap2,
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
		        		var logo = document.getElementsByClassName("ol-overlaycontainer")[0];
		          		logo.innerHTML = "";	
			        	console.log(that);
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
                params.data._id=this.GateData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlGateDelList;
                 params.success=function(){
                    that.$Loading.finish();
                    switch(res.data.code) {
                        case '0000':
                            that.$Message.success({
                                content: '删除成功'
                            });
                        break;
                        default:
                            that.$Message.success({
                                content: res.data.message + " 删除失败"
                            }); 
                    }
                    that.submitSearch(this.stnName,parseInt(that.actionPage),10);
                    that.modal2 = false;
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
                params.data = this.GateData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlGateEditList;
                params.data.his_level = this.formItem.his_level;
                params.data.his_level_date = this.formItem.his_level_date;
                params.data.defence_area = this.formItem.defence_area;
                params.data.waterhead = this.formItem.waterhead;
                if(this.formItem.sluicegate_name !=''){
                   params.data.sluicegate_name = this.formItem.sluicegate_name; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸站名称'
                        });
                    return;
                }
                if(this.formItem.id !=''){
                   params.data.id = this.formItem.id; 
                }else{
                    this.$Message.warning({
                            content: '请填写站号'
                        });
                    return;
                }
                if(this.formItem.town !=''){
                   params.data.town = this.formItem.town; 
                }else{
                    this.$Message.warning({
                            content: '请填写所在街镇'
                        });
                    return;
                }
                if(this.formItem.rebuild_time !=''){
                   params.data.rebuild_time = this.formItem.rebuild_time; 
                }else{
                    this.$Message.warning({
                            content: '请选择建设时间'
                        });
                    return;
                }
                if(this.formItem.sluicegate_type !=''){
                   params.data.sluicegate_type = this.formItem.sluicegate_type; 
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
                if(this.formItem.dick_name !=''){
                   params.data.dick_name = this.formItem.dick_name; 
                }
                if(this.formItem.stake_no !=''){
                   params.data.stake_no=this.formItem.stake_no; 
                }
                if(this.formItem.flow !=''){
                   params.data.flow=this.formItem.flow; 
                }else{
                    this.$Message.warning({
                            content: '请填写设计流量'
                        });
                    return;
                }
                if(this.formItem.gate_material !=''){
                   params.data.gate_material = this.formItem.gate_material; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸门形式及材料'
                        });
                    return;
                }
                if(this.formItem.gate_form !=''){
                   params.data.gate_form = this.formItem.gate_form; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸门启闭形式'
                        });
                    return;
                }
                if(this.formItem.board_height !=''){
                   params.data.board_height = this.formItem.board_height; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸底板高程'
                        });
                    return;
                }
                if(this.formItem.holes !=''){
                   params.data.holes = this.formItem.holes; 
                }else{
                    this.$Message.warning({
                            content: '请填写孔数'
                        });
                    return;
                }
                if(this.formItem.hole_width !=''){
                   params.data.hole_width=this.formItem.hole_width; 
                }else{
                    this.$Message.warning({
                            content: '请填写孔宽'
                        });
                    return;
                }
                if(this.formItem.hole_hight !=''){
                   params.data.hole_hight = this.formItem.hole_hight; 
                }else{
                    this.$Message.warning({
                            content: '请填写孔高'
                        });
                    return;
                }
                if(this.formItem.gateroom_length !=''){
                   params.data.gateroom_length=this.formItem.gateroom_length; 
                }else{
                    this.$Message.warning({
                            content: '请填写闸室总长'
                        });
                    return;
                }
                if(this.formItem.abrupt_level !=''){
                   params.data.abrupt_level=this.formItem.abrupt_level; 
                }else{
                    this.$Message.warning({
                            content: '请填写突变水位'
                        });
                    return;
                }
                /*if(this.formItem.shiproom_width !=''){
                   params.data.shiproom_width=this.formItem.shiproom_width; 
                }else{
                    this.$Message.warning({
                            content: '请填写船室净宽'
                        });
                    return;
                }if(this.formItem.shiproom_length !=''){
                   params.data.shiproom_length=this.formItem.shiproom_length; 
                }else{
                    this.$Message.warning({
                            content: '请填写船室总长'
                        });
                    return;
                }*/
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
                   params.data.lat = this.formItem.lat;
                   params.data.lng = this.formItem.lng; 
                }else{
                    this.$Message.warning({
                            content: '请填写经纬度'
                        });
                    return;
                }
                if(this.formItem.area_name !=''){
                   params.data.area_name = this.formItem.area_name; 
                }else{
                    this.$Message.warning({
                            content: '请选择片区名'
                        });
                    return;
                }
                console.log(params.data);
                params.success = function(res) {
                    that.$Loading.finish();
                    switch(res.data.code) {
                        case '0000':
                            that.$Message.success({
                                content: '修改成功'
                            });
                            that.modal1=false;
                        break;
                        default:
                            that.$Message.success({
                                content: res.data.message + " 请重新输入"
                            }); 
                    }
                    that.submitSearch(this.stnName,parseInt(that.actionPage),10);
                }  
               this.ajaxPost(params);
        	},
        	exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '闸站基本信息数据'
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
                	if(this.formItem.sluicegate_name === ""){return};
                    params.data.searchValue.sluicegate_name = this.formItem.sluicegate_name;
                }
                if( data === "code"){
                	if(this.formItem.id === ""){return};
                    params.data.searchValue.id = this.formItem.id;
                }   
                params.token = this.getKey('token');
                params.url = this.urlGateStationList;
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
            getGateNameList: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlGateNameList;
                console.log(params.data);
                params.success = function(res) {
                    that.$Loading.finish();
                    that.data = res.data.result;
                    for(let i=0;i<that.data.length;i++){
                        that.dickName.push(that.data[i]._id)
                    }
                    console.log(that.dickName);
                }
                this.ajaxPost(params);
            },
        },
        mounted: function(){
        	this.doubleSubmitSearch();
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
