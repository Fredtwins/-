<!-- 值班人员管理 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");

</style>


<template>
	<div class="">
		<i-col span="24">
             
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">值班管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">值班人员管理</Breadcrumb-item> 
            </Breadcrumb>
            <Button class="addBtn" @click="addDutyPerson"><Icon type="plus-round"></Icon> 新增</Button>
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
									<Form-item label="用户名称" prop="realname">
										<Input v-model="formInline.realname" placeholder="请输入用户名称" long></Input>
									</Form-item>
							        <Button type="primary" @click="submitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1" class="modal-pump" width="600">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="100">
                            	<i-col span="12">
                                    <Form-item label="人员姓名" prop="person_name">
                                        <Select v-model="formItem.person_name" clearable class="width90" @on-change="showOrderData">
                                           <Option v-for="item in userName" :value="item.realname" :key="item.realname">{{ item.realname }}</Option>
                                        </Select><span class="redStar">*</span>
                                    </Form-item>
									<Form-item label="岗位" prop="title">
										<Input v-model="formItem.title" class="width90" placeholder="请输入岗位" long></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="手机" prop="mobile">
										<Input v-model="formItem.mobile" class="width90" placeholder="请输入手机" long></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="紧急联系人" prop="crash_contract">
										<Input v-model="formItem.crash_contract" class="width90" placeholder="请输入紧急联系人" long></Input>
									</Form-item>
									<Form-item label="部门名称" prop="department_name">
										<Input v-model="formItem.department_name" class="width90" placeholder="请输入部门名称" long></Input><span class="redStar">*</span>
									</Form-item>
                            	</i-col>
                            	<i-col span="12">
									<Form-item label="用户名称" prop="user_name">
										<Input v-model="formItem.user_name" class="width90" placeholder="请输入用户名称" long></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="身份证" prop="identification">
										<Input v-model="formItem.identification" class="width90" placeholder="请输入身份证" long></Input>
									</Form-item>
									<Form-item label="紧急联系电话" prop="crash_tele">
										<Input v-model="formItem.crash_tele" class="width90" placeholder="请输入紧急联系电话" long></Input>
									</Form-item>
									<Form-item label="部门编码" prop="department_code">
										<Input v-model="formItem.department_code" class="width90" placeholder="请输入部门编码" long></Input><span class="redStar">*</span>
									</Form-item>
                            	</i-col>	
								<i-col span="24">
									<Form-item label="备注" prop="remark">
										<Input v-model="formItem.remark" type="textarea" placeholder="请输入..."></Input>
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
                    <p>确认删除该条用户？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table ref="table" :data="dutyPersonData" :columns="theadArr" stripe></Table>
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
            	urlDutyPersonList:'wtxiqiao/waterresource/dutperson/list',
            	urlDutyPersonAddList:'wtxiqiao/waterresource/dutperson/newperson',
            	urlDutyPersonUpdateList:'wtxiqiao/waterresource/dutperson/edit',
            	urlDutyPersonDeleteList:'wtxiqiao/waterresource/dutperson/delete',
                urlDepartmentList: "wtxiqiao/sys/department/list",
                getUserNameList: "wtxiqiao/sys/userinfo/list",
            	updateTitle:"",
                value1: "",
            	theadArr: [{
					title: "部门名称",
					key: "department_name"
				}, {
					title: "人员姓名",
					key: "person_name"
				}, {
					title: "手机",
					key: "mobile"
				}, {
					title: "岗位",
					key: "title"
				}, {
					title: "联系电话",
					key: "crash_tele"
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
            	dutyPersonData: [],
                departmentName: [],
                userName: [],
            	formItem: {},
            	formInline: {
            		department_name:'',
            		realname:''
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
        	submitSearch: function(page) {
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
            	params.url = this.urlDutyPersonList;
            	if(this.formInline.department_name !=''){
            		params.data.searchValue.department_name=this.formInline.department_name;
            	}
            	if(this.formInline.realname !=''){
            		params.data.searchValue.person_name=this.formInline.realname+"|#|like";
            	}
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.dutyPersonData = res.data.result.result;
                    that.waterRecordPage.total = res.data.result.totalSize;
	                console.log(that.dutyPersonData);
            	}
            	this.ajaxPost(params);
        	},
            changePage: function(page) {
                this.submitSearch(page);
                this.actionPage = page;
            },
        	addDutyPerson: function() {
        		this.updateTitle = "新增值班人员";
        		this.formItem = {
        			user_name:'',
            		person_name:'',
                    mobile: "",
                    crash_contract: "",
                    department_name: "",
                    department_code: "",
                    identification: "",
                    picture: "",
                    remark: "",
                    crash_tele: "",

            	};
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
                params.url = this.urlDutyPersonAddList;
                if(this.formItem.person_name !=''){
                   params.data.person_name = this.formItem.person_name; 
                }else{
                    this.$Notice.warning({
                            title: '请选择人员姓名'
                        });
                    return;
                }
                if(this.formItem.user_name !=''){
                   params.data.user_name = this.formItem.user_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写用户名称'
                        });
                    return;
                }
                if(this.formItem.mobile !=''){
                   params.data.mobile = this.formItem.mobile; 
                }else{
                    this.$Notice.warning({
                            title: '请填写手机'
                        });
                    return;
                }
                if(this.formItem.department_code !=''){
                   params.data.department_code=this.formItem.department_code; 
                }else{
                    this.$Notice.warning({
                            title: '请选择部门编号'
                        });
                    return;
                }
                if(this.formItem.department_name !=''){
                   params.data.department_name=this.formItem.department_name; 
                }else{
                    this.$Notice.warning({
                            title: '请选择部门编号'
                        });
                    return;
                }
                if(this.formItem.title !=''){
                   params.data.title=this.formItem.title; 
                }else{
                    this.$Notice.warning({
                            title: '请填写岗位'
                        });
                    return;
                }
                params.data.crash_tele = this.formItem.crash_tele
                params.data.crash_contract = this.formItem.crash_contract
                params.data.identification = this.formItem.identification
                params.data.remark = this.formItem.remark 
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
                    that.submitSearch(parseInt(that.actionPage));
                }
                this.ajaxPost(params); 
            },
            del2: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data._id=this.dutyPersonData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlDutyPersonDeleteList;
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
                    that.submitSearch(parseInt(that.actionPage));
                    that.modal2 = false;
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
            edit: function(row,index) {
            	this.updateTitle = "编辑值班人员";
            	this.formItem = row;
            	this.formItem.index = index;
        		this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
                
        	},
        	changeDepartment: function() {
                var that = this;
                var index = this.formItem.index;
                var params = {};
                console.log(index);
                params.data = this.dutyPersonData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlDutyPersonUpdateList;
                if(this.formItem.department_name !=''){
                   params.data.department_name=this.formItem.department_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写部门名称'
                        });
                    return;
                }
                if(this.formItem.user_name !=''){
                   params.data.user_name=this.formItem.user_name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写用户名称'
                        });
                    return;
                }
                if(this.formItem.person_name !=''){
                	params.data.person_name = this.formItem.person_name
                }
                if(this.formItem.mobile !=''){
					params.data.mobile = this.formItem.mobile
                }
                if(this.formItem.crash_tele !=''){
					params.data.crash_tele = this.formItem.crash_tele
                }
                if(this.formItem.crash_contract !=''){
                	params.data.crash_contract = this.formItem.crash_contract
                } 
                if(this.formItem.identification !=''){
					params.data.identification = this.formItem.identification
                }
                if(this.formItem.picture !=''){
                	params.data.picture = this.formItem.picture
                } 
                if(this.formItem.remark !=''){
					params.data.remark = this.formItem.remark
                }
                if(this.formItem.department_code !=''){
                	params.data.department_code = this.formItem.department_code
                }
                if(this.formItem.title !=''){
                	params.data.title = this.formItem.title
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
                            that.$Message.success({
                                content: res.data.message + " 请重新输入"
                            }); 
                    }
                    that.submitSearch(parseInt(that.actionPage));
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
            getUserName: function() {
                var that = this;
                var params = {};
                params.data = {
                    system_id : parameters.system_id,
                    page : 1,
                    order : {},
                    searchValue : {}
                }
                params.token = this.getKey('token');
                params.url = this.getUserNameList;
                params.success = function(res) {
                    that.$Loading.finish();
                    that.userName = res.data.result.result;
                    console.log(that.userName);
                }
                this.ajaxPost(params);
            },
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '值班人员数据'
                });
            },
            showOrderData: function(data) {
                for(let i = 0;i < this.userName.length;i++){
                    if(this.userName[i].realname === data){
                        console.log(this.userName[i]);
                        this.formItem.title = this.userName[i].roles[0].rolename;
                        this.formItem.person_name = this.userName[i].realname;
                        this.formItem.department_code = this.userName[i].department.code;
                        this.formItem.department_name = this.userName[i].department.name;
                        this.formItem.user_name = this.userName[i].username;
                        this.formItem.mobile = this.userName[i].mobile;
                    }
                }
            }
        },
        mounted: function() {
        	this.submitSearch();
            this.getNameList();
            this.getUserName();
        }
    }
</script>
