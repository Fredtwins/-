<!-- 调度预案管理 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");
</style>


<template>
	<div class="authority">
		<i-col span="24">  
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">系统管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">调度预案管理</Breadcrumb-item>
            </Breadcrumb>
            <Button class="addBtn" @click="addStormPlan"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="120">
							<Form-item label="调度预案名称" prop="scheme_name">
								<Input v-model="formInline.scheme_name" placeholder="请输入调度预案名称" long></Input>
							</Form-item>        
					        <Button type="primary" @click="submitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1" width="800" class="modal-pump">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="80">
                                <i-col span="12">
                                	<Form-item label="片区" prop="area">
    									<Input v-model="formItem.area" class="width90" :maxlength="8" placeholder="请输入片区"></Input><span class="redStar">*</span>
    								</Form-item>
    								<Form-item label="方案名称" prop="scheme_name">
    									<Input v-model="formItem.scheme_name" class="width90" @on-blur="checkName('name')" :readonly="btnChange" :maxlength="16" placeholder="请输入方案名称"></Input><span class="redStar">*</span>
    								</Form-item>
    								<Form-item label="方案编号" prop="scheme_id">
    									<Input v-model="formItem.scheme_id" class="width90" @on-blur="checkName('code')" :readonly="btnChange" :maxlength="8" placeholder="请输入方案编号"></Input><span class="redStar">*</span>
    								</Form-item>
                                </i-col>
                                <i-col span="12">
                                    <Form-item label="街镇" prop="town">
                                        <Input v-model="formItem.town" class="width90" :maxlength="8" placeholder="请输入街镇"></Input><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="方案内容" prop="scheme_content">
                                        <Input v-model="formItem.scheme_content" class="width90" :maxlength="8" placeholder="请输入方案编号"></Input><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="备注" prop="remark">
                                        <Input v-model="formItem.remark" class="width90" :maxlength="8" placeholder="请输入备注"></Input><span class="redStar">*</span>
                                    </Form-item>
                                </i-col>    
								<i-col span="24"><Table :data="stormTaskData" :columns="taskColumns" stripe></Table></i-col>
                                <i-col span="12">
                                    <Form-item label="调度方向" prop="task_type">
                                        <Select v-model="formItem.task_type" class="width90" clearable>
                                            <Option v-for="item in direction" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="站名名称" prop="stn_name">
                                        <Select v-model="formItem.stn_name" @on-change="showCode" class="width90" clearable>
                                            <Option v-for="item in stnName" :value="item.name"     :key="item.name">{{ item.name }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="调度时段" prop="tide_period">
                                        <Select v-model="formItem.tide_period" class="width90" clearable>
                                            <Option v-for="item in timeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="水位名称" prop="wl_stn_name">
                                        <Select v-model="formItem.wl_stn_name" class="width90" clearable>
                                            <Option v-for="item in wlStnNameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
                                    <Button @click="changeTable">保存</Button>
                                </i-col>
                                <i-col span="12">
                                    <Form-item label="操作" prop="action">
                                        <Select v-model="formItem.action" class="width90" clearable>
                                            <Option v-for="item in actionList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                        </Select>
                                        <span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="站点编号" prop="stn_no">
                                        <Input v-model="formItem.stn_no" class="width90" readonly :maxlength="8"  placeholder="站点编号"></Input><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="水位下限" prop="wl_low">
                                        <Input v-model="formItem.wl_low" class="width90" :maxlength="8" placeholder="请输入水位下限"></Input><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="水位上限" prop="wl_up">
                                        <Input v-model="formItem.wl_up" class="width90" :maxlength="8" placeholder="请输入水位上限"></Input><span class="redStar">*</span>
                                    </Form-item>
                                </i-col>
								<Input v-model="formItem.index" v-if="bucunzai"></Input>
                            </Form>
                            <div slot="footer">
                                <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
                                <Button v-if="btnChange" type="primary" @click="changeDepartment">修改</Button>
                                <Button  @click="cancel">取消</Button>
                            </div>
                        </Modal>
					</template> 
				</Panel>
			</Collapse>
            <Modal v-model="modal2" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>确认删除该条预案？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table ref="table" :data="stormPlanData" :columns="theadArr" stripe></Table>
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
    export default {
        data () {
            return {
            	urlStormPlanList: "wtxiqiao/waterresource/wdpdispatchscheme/list",
            	urlStormPlanAdd: "wtxiqiao/waterresource/wdpdispatchscheme/new",
            	urlStormPlanEdit: "wtxiqiao/waterresource/wdpdispatchscheme/edit",
            	urlStormPlanDelete: "wtxiqiao/waterresource/wdpdispatchscheme/delete",
                urlStnNameList: "wtxiqiao/waterresource/restat/site",
            	updateTitle:"",
            	value1: "",
                wlStnNameList: [
                    {name: "官山水位"},
                    {name: "西江水位"},
                    {name: "北江水位"},
                ],
            	theadArr: [{
            			title: "片区",
						key: "area"
            		}, {
            			title: "调度预案名称",
            			key: "scheme_name"
            		}, {
	            		title: '操作',
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
                stnName: [],
                direction: [
                    {name: '引水'},
                    {name: '排水'}
                ],
                timeList: [
                    {name: '涨潮'},
                    {name: '退潮'},
                    {name: '全时段'}
                ],
                actionList: [
                    {name: "开泵"},
                    {name: "关泵"},
                    {name: "开闸"},
                    {name: "关闸"},
                ],
                taskColumns: [{
                    title: "调度方向",
                    key: "task_type"
                }, {
                    title: "站号",
                    key: "stn_no"
                }, {
                    title: "站点名称",
                    key: "stn_name"
                }, {
                    title: "调度时段",
                    key: "tide_period"
                }, {
                    title: "水位名称",
                    key: "wl_stn_name"
                }, {
                    title: "水位下限",
                    key: "wl_low"
                }, {
                    title: "水位上限",
                    key: "wl_up"
                }, {
                    title: "指令",
                    key: "action"
                }, {
                    title: "操作",
                    render: (h, params) => {
                            return h('div', [
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
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        } 
                }],
                stormTaskData: [],
            	btnSave: false,
				btnChange: false,
				modal1: false,
                modal2: false,
                delIndex: "",
                actionPage: "",
				bucunzai:"",
				stormPlanData:[],
            	formItem: {},
            	formInline: {
            		scheme_name:''
            	},
            	waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
                value1: "",
            }
        },
        methods: {
            clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
        	submitSearch: function (page) {
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
            	params.url = this.urlStormPlanList;
            	if(this.formInline.scheme_name !==''){
            		params.data.searchValue.scheme_name = this.formInline.scheme_name+"|#|like";
            	}
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.stormPlanData = res.data.result.result;
                    console.log(res.data);
                    that.waterRecordPage.total = res.data.result.totalSize;
	                
            	}
            	this.ajaxPost(params);
        	},
            remove (index) {
                this.stormTaskData.splice(index, 1);
            },
        	changePage: function(page) {
                this.submitSearch(page);
                this.actionPage = page;
            },
            addStormPlan: function() {
                this.formItem = {
                    area: "",
                    scheme_name: "",
                    scheme_content: "",
                    town: "",
                    scheme_id: "",
                    remark: "",
                	task_type: "",
                	stn_name: "",
                    stn_no: "",
                	tide_period: "",
                	wl_stn_name: "",
                	wl_low: "",
                	wl_up: "",
                	action: "",
                };
                this.stormTaskData = [];
                this.updateTitle = "新增调度预案";
        		this.btnChange = false;
                this.btnSave = true;
                this.modal1 = true;
            },
            ok () {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlStormPlanAdd;
                if(this.formItem.area !=''){
                   params.data.area = this.formItem.area; 
                }else{
                    this.$Notice.warning({
                            title: '请选择片区'
                        });
                    return;
                }
                if(this.formItem.scheme_id !=''){
                   params.data.scheme_id = this.formItem.scheme_id; 
                }else{
                    this.$Notice.warning({
                            title: '请填写调度预案编号'
                        });
                    return;
                }
                if(this.formItem.scheme_name !=''){
                   params.data.scheme_name = this.formItem.scheme_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写调度预案名称'
                        });
                    return;
                }
                if(this.formItem.town !=''){
                   params.data.town = this.formItem.town; 
                }else{
                    this.$Notice.warning({
                            title: '请选择街镇'
                        });
                    return;
                }
                if(this.formItem.remark !== ""){
                    params.data.remark = this.formItem.remark;
                }
                if(this.formItem.scheme_content !== ""){
                    params.data.scheme_content = this.formItem.scheme_content;
                }
                if(this.stormTaskData.length > 0){
                    params.data.tasks = this.stormTaskData;
                }
                params.success=function(res){
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
                    that.submitSearch(parseInt(that.actionPage));
                }
                this.ajaxPost(params); 
            },
            cancel () {
                this.modal1=false;
            },
            edit: function(row,index) {
                this.updateTitle = "编辑调度预案";
                this.formItem = {
                    area: "",
                    scheme_name: "",
                    scheme_content: "",
                    town: "",
                    scheme_id: "",
                    remark: "",
                    task_type: "",
                    stn_name: "",
                    stn_no: "",
                    tide_period: "",
                    wl_stn_name: "",
                    wl_low: "",
                    wl_up: "",
                    action: "",
                };
                this.formItem.area = row.area;
                this.formItem.scheme_name = row.scheme_name;
                this.formItem.scheme_content = row.scheme_content;
                this.formItem.scheme_id = row.scheme_id;
                this.formItem.remark = row.remark;
                this.formItem.town = row.town;
                this.formItem.index = index;
                this.stormTaskData = row.tasks;
                this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
                this.treeShow = true;
                
            },
            changeDepartment: function() {
                var that = this;
                var index = this.formItem.index;
                var params = {};
                params.data = this.stormPlanData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlStormPlanEdit;
                if(this.formItem.area !=''){
                   params.data.area = this.formItem.area; 
                }else{
                    this.$Notice.warning({
                            title: '请选择片区'
                        });
                    return;
                }
                if(this.formItem.scheme_id !=''){
                   params.data.scheme_id = this.formItem.scheme_id; 
                }else{
                    this.$Notice.warning({
                            title: '请填写调度预案编号'
                        });
                    return;
                }
                if(this.formItem.scheme_name !=''){
                   params.data.scheme_name = this.formItem.scheme_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写调度预案名称'
                        });
                    return;
                }
                if(this.formItem.town !=''){
                   params.data.town = this.formItem.town; 
                }else{
                    this.$Notice.warning({
                            title: '请选择街镇'
                        });
                    return;
                }
                if(this.formItem.remark !== ""){
                    params.data.remark = this.formItem.remark;
                }
                if(this.formItem.scheme_content !== ""){
                    params.data.scheme_content = this.formItem.scheme_content;
                }
                if(this.stormTaskData.length > 0){
                    params.data.tasks = this.stormTaskData;
                }
                params.success = function(res){
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
                    that.submitSearch(parseInt(that.actionPage));
                }  
               this.ajaxPost(params);
            },
            changeTable: function() {
                var obj = {}
                var area = this.formItem.area;
                var remark = this.formItemremark;
                var scheme_content = this.formItem.scheme_content;
                var scheme_id = this.formItem.scheme_id;
                var scheme_name = this.formItem.scheme_name;
                var town = this.formItem.town; 
                if(this.formItem.task_type !==''){
                   obj.task_type = this.formItem.task_type; 
                }else{
                    this.$Notice.warning({
                            title: '请选择调度方向'
                        });
                    return;
                }
                if(this.formItem.stn_name !==''){
                   obj.stn_name = this.formItem.stn_name; 
                   obj.stn_no = this.formItem.stn_no;
                }else{
                    this.$Notice.warning({
                            title: '请选择站名'
                        });
                    return;
                }
                if(this.formItem.tide_period !==''){
                   obj.tide_period = this.formItem.tide_period; 
                }else{
                    this.$Notice.warning({
                            title: '请选择调度时段'
                        });
                    return;
                }
                if(this.formItem.wl_stn_name !==''){
                   obj.wl_stn_name = this.formItem.wl_stn_name; 
                }else{
                    this.$Notice.warning({
                            title: '请选择水位名称'
                        });
                    return;
                }
                if(this.formItem.wl_low !==''){
                   obj.wl_low = this.formItem.wl_low; 
                }else{
                    this.$Notice.warning({
                            title: '请填写水位下限'
                        });
                    return;
                }
                if(this.formItem.wl_up !==''){
                   obj.wl_up = this.formItem.wl_up; 
                }else{
                    this.$Notice.warning({
                            title: '请填写水位上限'
                        });
                    return;
                }
                if(this.formItem.action !==''){
                   obj.action = this.formItem.action; 
                }else{
                    this.$Notice.warning({
                            title: '请选择指令'
                        });
                    return;
                }
                obj.wl_stn_no = "",
                obj.wl_action = null,
                obj.valid = 1

                this.stormTaskData.push(obj);
                this.formItem = {
                    area: area,
                    scheme_name: scheme_name,
                    town: town,
                    scheme_id: scheme_id,
                    remark: remark,
                    scheme_id: scheme_id,
                    scheme_content: scheme_content,
                    task_type: "",
                    stn_name: "",
                    stn_no: "",
                    tide_period: "",
                    wl_stn_name: "",
                    wl_low: "",
                    wl_up: "",
                    action: "",
                };
            },
            del2: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data._id=this.stormPlanData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlStormPlanDelete;
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
                    that.submitSearch(parseInt(that.actionPage));
                    that.modal2 = false;
                }
               this.ajaxPost(params); 
            },
            del: function(index) {
                this.modal2 = true;
                this.delIndex = index;
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
                    if(this.formItem.scheme_name === ""){return};
                    params.data.searchValue.scheme_name = this.formItem.scheme_name;
                    params.data.searchValue.area = this.formItem.area;
                }
                if( data === "code"){
                    if(this.formItem.scheme_id === ""){return};
                    params.data.searchValue.scheme_id = this.formItem.scheme_id;
                }   
                params.token = this.getKey('token');
                params.url = this.urlStormPlanList;
                console.log(params.data.searchValue);
                params.success = function(res) {
                    if(parseInt(res.data.result.totalSize) !== 0){
                        that.$Message.warning({
                                content: '已被使用'
                            });
                    }else{
                        that.$Message.success({
                                content: '可用'
                            });
                    }
                }
                this.ajaxPost(params);
            },
            getStnNameList: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.data.page = 1;
                params.data.type = '';
                params.data.searchValue = {};
                params.token = this.getKey('token');
                params.url = this.urlStnNameList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.stnName = res.data.result;
                }
                this.ajaxPost(params);
            },
            showCode: function() {
                for(var i =0;i<this.stnName.length;i++){
                    if(this.formItem.stn_name == this.stnName[i].name){
                        this.formItem.stn_no = this.stnName[i].code
                    }
                }
            }
        },
        mounted: function() {
            this.submitSearch();
            this.getStnNameList();
        },
    }
</script>
