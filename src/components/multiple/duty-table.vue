<!-- 值班表 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");

</style>


<template>
	<div class="">
		<i-col span="24">
            
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">值班管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">值班表</Breadcrumb-item>
            </Breadcrumb>
            <Button class="addBtn" @click="addDutyTable"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
					        <Form-item label="部门名称" prop="department_name">
								<Select v-model="formInline.department_name" clearable style="width:200px">
                                    <Option v-for="item in departmentName" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                </Select>
							</Form-item>
							<Form-item label="值班日期" prop="duty_date">
								<Date-picker type="date" placeholder="请选择值班日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
							</Form-item>

					        <Button type="primary" @click="doubleSubmitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1" class="modal-pump">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="80">
                            	<i-col span="24">	
                                	<Form-item label="值班表名称" prop="duty_table_name">
										<Input v-model="formItem.duty_table_name" class="width90" :maxlength="16" placeholder="请输入值班表名称" long></Input><span class="redStar">*</span>
									</Form-item>
								</i-col>
								<i-col span="12">
									<Form-item label="部门名称" prop="department_name">
										<Select v-model="formItem.department_name" class="width90" clearable @on-change="showCode">
                                            <Option v-for="item in departmentName" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                        </Select><span class="redStar">*</span>
									</Form-item>
									<Form-item label="制作人" prop="tabulator">
										<Input v-model="formItem.tabulator" class="width90" :maxlength="8" readonly placeholder="请输入制作人"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="值班日期" prop="duty_date">
										<Date-picker type="date" class="width90" placeholder="请选择值班日期" format="yyyy-MM-dd" @on-change="change2"></Date-picker><span class="redStar">*</span>
									</Form-item>    
								</i-col>
								<i-col span="12">
									<Form-item label="部门编码" prop="department_code">
										<Input v-model="formItem.department_code" class="width90" readonly :maxlength="16" placeholder="请输入部门编码"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="值班时段" prop="duty_time">
										<TimePicker confirm format="HH:mm" type="timerange" class="width90" placeholder="请选择值班时段" @on-change="change4"></TimePicker><span class="redStar">*</span>
									</Form-item>
								</i-col>
								<i-col span="24">
                                    <Form-item label="值班人员" prop="duty_person">
                                        <Select v-model="formItem.duty_person" multiple class="width90">
                                           <Option v-for="item in UserData" :value="item.realname" :key="item.realname">{{ item.realname }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
                                    <Form-item label="值班领导" prop="duty_leader">
                                        <Select v-model="formItem.duty_leader" multiple class="width90">
                                           <Option v-for="item in UserData" :value="item.realname" :key="item.realname">{{ item.realname }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
									<Form-item label="备注" prop="remark">
										<Input v-model="formItem.remark" class="width90" type="textarea" :rows="4" placeholder="请输入..."></Input>
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
                    <p>确认删除该条值班表？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table :data="dutyTableData" :columns="theadArr" stripe></Table>
                <Table ref="table" v-show="bucunzai" :data="dutyTableAllData" :columns="theadArr" stripe></Table>
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
            	urlDutyTableList:'wtxiqiao/waterresource/dutytable/list',
            	urlDutyTableAddList:'wtxiqiao/waterresource/dutytable/new',
            	urlDutyTableUpdateList:'wtxiqiao/waterresource/dutytable/edit',
            	urlDutyTableDeleteList:'wtxiqiao/waterresource/dutytable/delete',
            	urlDepartmentList:'wtxiqiao/sys/department/list',
                urlUserList: "wtxiqiao/sys/userinfo/list",
            	updateTitle:"",
            	theadArr: [{
					title: "值班表名称",
					key: "duty_table_name"
				}, {
					title: "部门名称",
					key: "department_name"
				}, {
					title: "值班日期",
					key: "duty_date"
				}, {
					title: "值班时段",
					key: "duty_time2"
				}, {
					title: "值班人员",
					key: "duty_person2"
				}, {
					title: "值班领导",
					key: "duty_leader2"
				}, {
					title: '用户操作',
					align: 'center',
					width: 200,
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
				btnSave:false,
				btnChange:false,
				modal1:false,
                modal2: false,
                delIndex: "",
                actionPage: "",
				bucunzai:"",
            	dutyTableData:[],
                dutyTableAllData: [],
            	formItem: {},
            	departmentName: [],
                UserData: [],
                value1: "",
            	formInline: {
            		department_name:'',
            		duty_date:''
            	},
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
        	addDutyTable: function () {
                var myDate = new Date();
        		this.formItem = {
        			duty_table_name: "",
					department_name: "",
					duty_date: "",
					department_code: "",
					duty_time: "",
					duty_person: [],
					duty_leader: [],
					remark: ""
        		}
                this.formItem.make_time = myDate.format("yyyy-MM-dd hh:mm:ss");
                this.formItem.tabulator = this.getKey('username');
        		this.updateTitle = "新增值班表";
        		this.btnChange = false;
        		this.btnSave = true;
        		this.modal1 = true; 
        	},
            del2: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data._id=this.dutyTableData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlDutyTableDeleteList;
                 params.success=function(res){
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
                    that.submitSearch(parseInt(that.actionPage),10);
                    that.modal2=false;
                }
                 
               this.ajaxPost(params);
            },
        	del: function(index) {
               this.modal2 = true;
               this.delIndex = index;
            },
            cancel () {
                this.modal1=false;
            },
            edit: function (row,index) {
                this.updateTitle = "编辑值班表";
            	this.formItem.duty_table_name = row.duty_table_name;
                this.formItem.department_name = row.department_name;
                this.formItem.department_code = row.department_code;
                this.formItem.duty_date = row.duty_date;
                this.formItem.duty_time = row.duty_time;
                this.formItem.duty_person = row.duty_person;
                this.formItem.duty_leader = row.duty_leader;
                this.formItem.remark = row.remark;
            	this.formItem.index = index;
        		this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
        	},
        	submitSearch: function (page,pageSize) {
        		var that = this;
            	var params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		order : {"_id":-1},
            		searchValue : {}
            	}
                params.data.pageSize = pageSize;
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
            	params.token = this.getKey('token');
            	params.url = this.urlDutyTableList;
            	if(this.formInline.department_name !== "") {
            		params.data.searchValue.department_name = this.formInline.department_name;
            	}
            	if(this.formInline.duty_date !== "") {
            		params.data.searchValue.duty_date = this.formInline.duty_date;
            	}
                if(parseInt(pageSize) === 10){
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.dutyTableData = res.data.result.result;
                        for(var i = 0;i<that.dutyTableData.length;i++){
                            that.dutyTableData[i].duty_time2 = that.dutyTableData[i].duty_time[0] + " - " + that.dutyTableData[i].duty_time[1]//把数组遍历成字符串放到表格上更加好看
                            that.dutyTableData[i].duty_person2 = "";
                            for(var j = 0;j<that.dutyTableData[i].duty_person.length;j++){
                                that.dutyTableData[i].duty_person2 +=  that.dutyTableData[i].duty_person[j] + ","
                            }
                            that.dutyTableData[i].duty_leader2 = "";
                            for(var z = 0;z<that.dutyTableData[i].duty_leader.length;z++){
                                that.dutyTableData[i].duty_leader2 +=  that.dutyTableData[i].duty_leader[z] + ","
                            }
                        }
                        that.waterRecordPage.total = res.data.result.totalSize;
                        console.log(that.dutyTableData);
                    }
                }
                if(parseInt(pageSize) === 10000){
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.dutyTableAllData = res.data.result.result;
                    }
                }	
            	this.ajaxPost(params);
        	},
            changePage: function(page) {
                this.submitSearch(page,10);
                this.actionPage = page;
            },
        	change: function (data) {
        		this.formInline.duty_date = data;
        	},
        	change2: function (data) {
        		this.formItem.duty_date = data;
        	},
            change4: function (data) {
                console.log(data);
                this.formItem.duty_time = data;
            },
        	ok () {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlDutyTableAddList;
                if(this.formItem.department_name !==''){
                   params.data.department_name=this.formItem.department_name;
                   params.data.department_code = this.formItem.department_code; 
                }else{
                    this.$Notice.warning({
                            title: '请填写部门名称'
                        });
                    return;
                }
                if(this.formItem.duty_table_name !==''){
                   params.data.duty_table_name = this.formItem.duty_table_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写值班表名称'
                        });
                    return;
                }
                if(this.formItem.duty_time !==''){
                   params.data.duty_time=this.formItem.duty_time; 
                }else{
                    this.$Notice.warning({
                            title: '请选择值班时段'
                        });
                    return;
                }
                if(this.formItem.duty_person !==''){
                   params.data.duty_person = this.formItem.duty_person; 
                }else{
                    this.$Notice.warning({
                            title: '请选择值班人员'
                        });
                    return;
                }
                if(this.formItem.duty_leader !==''){
                   params.data.duty_leader = this.formItem.duty_leader; 
                }else{
                    this.$Notice.warning({
                            title: '请选择值班领导'
                        });
                    return;
                }
                if(this.formItem.duty_date !==''){
                    params.data.duty_date=this.formItem.duty_date;
                }else{
                    this.$Notice.warning({
                            title: '请填写值班日期'
                        });
                    return;
                }
                params.data.tabulator = this.formItem.tabulator;
                params.data.make_time = this.formItem.make_time;
                params.data.remark = this.formItem.remark;
                params.success = function(res){
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
                    that.submitSearch(parseInt(that.actionPage),10);
                }  
                this.ajaxPost(params); 
            },
            changeDepartment: function() {
                var that = this;
                var index = this.formItem.index;
                var params = {};
                console.log(index);
                params.data = this.dutyTableData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlDutyTableUpdateList;
                if(this.formItem.department_name !==''){
                   params.data.department_name=this.formItem.department_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写部门名称'
                        });
                    return;
                }
                if(this.formItem.duty_date !==''){
                    params.data.duty_date=this.formItem.duty_date;
                }else{
                    this.$Notice.warning({
                            title: '请填写值班日期'
                        });
                    return;
                }
                params.data.duty_table_name = this.formItem.duty_table_name;
                params.data.tabulator = this.formItem.tabulator;
                params.data.department_code = this.formItem.department_code;
                params.data.make_time = this.formItem.make_time;
                params.data.duty_time = this.formItem.duty_time;
                params.data.duty_person = this.formItem.duty_person;
                params.data.duty_leader = this.formItem.duty_leader;
                params.data.remark = this.formItem.remark;
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
                            that.$Message.success({
                                content: res.data.message + " 请重新输入"
                            }); 
                    }
                    that.submitSearch(parseInt(that.actionPage),10);
                }  
               this.ajaxPost(params);
            },
            getNameList: function () {
            	var that = this;
            	var params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		page : 1,
            		pageSize : 50,
            		order : {},
            		searchValue : {}
            	}
            	params.token = this.getKey('token');
            	params.url = this.urlDepartmentList;
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.departmentName = res.data.result.result;
	                console.log(that.departmentName);
            	}
            	this.ajaxPost(params);
            },
            getUserNameList: function() {
                var that = this;
                var params = {};
                params.data = {
                    system_id : parameters.system_id,
                    order : {"_id":-1},
                    searchValue : {}
                }
                params.data.page = 1;
                params.token = this.getKey('token');
                params.url = this.urlUserList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.UserData = res.data.result.result;
                }
                this.ajaxPost(params);
            },
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '值班表数据'
                });
            },
            doubleSubmitSearch: function() {
                this.submitSearch(1,10);
                this.submitSearch(1,10000);
            },
            showCode: function(data) {
                for(var i = 0;i<this.departmentName.length;i++){
                    if(this.departmentName[i].name === data){
                        this.formItem.department_code = this.departmentName[i].code;
                    }
                }
            }    
        },
        mounted: function () {
        	this.doubleSubmitSearch();
        	this.getNameList();
            this.getUserNameList();
        }
    }
</script>
