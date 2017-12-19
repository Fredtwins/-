<!-- 人员管理 -->
<style lang="less">
@import url("../../../static/less/color.less");
.width90{
    width: 90%!important;
}
</style>


<template>
	<div class="">
		<i-col span="24">

            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">系统管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">人员管理</Breadcrumb-item>
            </Breadcrumb>
            <Button class="addBtn" @click="addUser"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
							        <Form-item label="用户账号" prop="username">
										<Input v-model="formInline.username"  :maxlength="16" placeholder="请输入账号"></Input>
									</Form-item>
									<Form-item label="用户名称" prop="realname">
										<Input v-model="formInline.realname" :maxlength="16" placeholder="请输入名称"></Input>
									</Form-item>
									<Form-item label="用户角色" prop="rolename">
										<Select v-model="formInline.rolename" clearable style="width:162px">
                                               <Option v-for="item in rolenameList" :value="item.rolename" :key="item.rolename">{{ item.rolename }}</Option>
                                        </Select>
									</Form-item>
									<Form-item label="用户部门" prop="departmentName">
										<Select v-model="formInline.departmentName" clearable style="width:162px">
                                               <Option v-for="item in departmentNameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                        </Select>
									</Form-item>
							        <Button type="primary" @click="submitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="80">
                                <Form-item label="用户账号" prop="username">
									<Input v-model="formItem.username" class="width90" :maxlength="16" @on-blur="checkName('code')" :readonly="changeRead" placeholder="请输入账号"></Input><span class="redStar">*</span>
								</Form-item>
								<Form-item label="用户密码" prop="password">
									<Input v-model="formItem.password" class="width90" :maxlength="16" type="password" placeholder="请输入密码"></Input><span class="redStar">*</span>
								</Form-item>
								<Form-item label="用户名称" prop="realname">
									<Input v-model="formItem.realname" class="width90" :maxlength="16" placeholder="请输入名称"></Input><span class="redStar">*</span>
								</Form-item>
								<Form-item label="用户邮箱" prop="email">
									<Input v-model="formItem.email" class="width90" :maxlength="20" placeholder="请输入邮箱"></Input><span class="redStar">*</span>
								</Form-item>
								<Form-item label="电话号码" prop="mobile">
									<Input v-model="formItem.mobile" class="width90" :maxlength="11" placeholder="请输入联系方式"></Input><span class="redStar">*</span>
								</Form-item>
								<Form-item label="用户角色" prop="rolename">
									<Select v-model="formItem.rolename" clearable style="width:90%">
                                        <Option v-for="item in rolenameList" :value="item.rolename" :key="item.rolename">{{ item.rolename }}</Option>
                                    </Select><span class="redStar">*</span>
								</Form-item>
								<Form-item label="用户部门" prop="departmentName">
									<Select v-model="formItem.departmentName" clearable style="width:90%">
                                        <Option v-for="item in departmentNameList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                    </Select><span class="redStar">*</span>
								</Form-item>
                                <Form-item label="身份证" prop="identification">
                                    <Input v-model="formItem.identification" :maxlength="20" placeholder="请输入身份证" class="width90"></Input>
                                </Form-item>
								<Input v-model="formItem.index" v-if="bucunzai"></Input>
                            </Form>
                            <div slot="footer">
                                <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
                                <Button v-if="btnChange" type="primary" @click="changeNotice">修改</Button>
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
                    <p>确认删除该个用户？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table :data="UserData" :columns="theadArr" stripe></Table>
                <Table ref="table" v-show="bucunzai" :data="UserAllData" :columns="theadArr" stripe></Table>
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
            	urlUserList: "wtxiqiao/sys/userinfo/list",
                urlAddUserList: "wtxiqiao/sys/userinfo/new",
                urlUpdateUserList: "wtxiqiao/sys/userinfo/edit",
                urlDeleteUserList: "wtxiqiao/sys/userinfo/delete",
                urlDepartmentNameList: "wtxiqiao/sys/department/list",
                urlRolenameList: "wtxiqiao/sys/role/list",
                modal1: false,
                modal2: false,
                delIndex: "",
                actionPage: "",
                btnChange: false,
                btnSave: false,
                changeRead: false,
                value1: "",
                updateTitle: "",
            	formInline:{
            		username:'',
            		password:'',
            		realname:'',
            		email:'',
            		mobile:'',
            		rolename:'',
            		departmentName:''
            	},
                waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
            	UserData: [],
                UserAllData: [],
            	rolenameList: [],
            	departmentNameList: [],
            	bucunzai: '',
            	formItem: {},
            	theadArr: [{
					title: "用户账号",
					key: "username"
				}, {
					title: "用户名称",
					key: "realname"
				}, {
					title: '联系电话',
					key: 'mobile'
				}, {
					title: '电子邮箱',
					key: 'email'
				}, {
                    title: '用户部门',
                    key: 'departmentName'
                }, {
					title: '用户操作',
					align: 'center',
					width: 200,
					render: (h, param) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight : '5px'
								},
								on: {
									click: () => {
										this.edit(param.row,param.index)
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.del(param.index)
									}
								}
							}, '删除')
						]);
					}
				}],
            }
        },
        methods:{
            clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
            changePage: function(page) {
                this.submitSearch(page,10);
                this.actionPage = page;
            },
        	ok () {

                var that = this;
                var params = {};
                params.data = {};
                params.data.roles = [{
                    roleid: "",
                    rolename: "",
                }];
                this.formItem.identification = "";
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlAddUserList;
                if(this.formItem.username !=''){
                   params.data.username = this.formItem.username;
                }else{
                    this.$Notice.warning({
                            title: '请填写账号'
                        });
                    return;
                }
                if(this.formItem.password !=''){
                    params.data.password = this.formItem.password;
                }else{
                    this.$Notice.warning({
                            title: '请填写密码'
                        });
                    return;
                }
                if(this.formItem.realname !=''){
                    params.data.realname = this.formItem.realname;
                }else{
                    this.$Notice.warning({
                            title: '请填写名称'
                        });
                    return;
                }
                if(this.formItem.mobile !=''){
                    params.data.mobile = this.formItem.mobile;
                }else{
                    this.$Notice.warning({
                            title: '请填写名称'
                        });
                    return;
                }
                if(this.formItem.rolename !=''){
                    for(let i = 0;i<this.rolenameList.length;i++){
                        if(this.rolenameList[i].rolename === this.formItem.rolename){
                            params.data.roles[0].roleid = this.rolenameList[i].roleid;
                            params.data.roles[0].rolename = this.formItem.rolename;
                        }
                    }
                }else{
                    this.$Notice.warning({
                            title: '请选择角色'
                        });
                    return;
                }
            if(this.formItem.departmentName !=''){
              for(var i = 0;i<this.departmentNameList.length;i++){
                if(this.formItem.departmentName == this.departmentNameList[i].name){
                  params.data.department = {};
                  params.data.department.name = this.departmentNameList[i].name;
                  params.data.department.code = this.departmentNameList[i].code;
                  params.data.department.system_id = this.departmentNameList[i].system_id;
                }
              }
            }else{
              this.$Notice.warning({
                title: '请选择部门'
              });
              return;
            }
                if(this.formItem.email !=''){
                    params.data.email=this.formItem.email;
                }else{
                    this.$Notice.warning({
                            title: '请填写邮箱'
                        });
                    return;
                }
            console.log(params.data.department);
                params.data.identification = this.formItem.identification;
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
                    that.submitSearch(parseInt(that.actionPage),10);
                }
                this.ajaxPost(params);
            },
            cancel () {
                this.modal1=false;
            },
            getRoleNameList: function() {
            	var that = this;
            	let params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		page : 1,
            		pageSize : 50,
            		order : {}
            	}
            	params.token = this.getKey('token');
            	params.url = this.urlRolenameList;
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.rolenameList = res.data.result.result;
	                console.log(res.data.result);
            	}
            	this.ajaxPost(params);
            },
            getDepartmentNameList: function() {
            	var that = this;
            	let params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		page : 1,
            		pageSize : 50,
            		order : {},
            		searchValue : {}
            	}
            	params.token = this.getKey('token');
            	params.url = this.urlDepartmentNameList;
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.departmentNameList = res.data.result.result;
	                console.log(that.departmentNameList);
            	}
            	this.ajaxPost(params);

            },
        	submitSearch: function (page,pageSize) {
                console.log(page);
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
                console.log(params.data);
            	params.token = this.getKey('token');
            	params.url = this.urlUserList;
            	if(this.formInline.username !=''){
            		params.data.searchValue.username=this.formInline.username+"|#|like";
            	}
            	if(this.formInline.realname !=''){
            		params.data.searchValue.realname=this.formInline.realname+"|#|like";
            	}
            	if(this.formInline.email !=''){
            		params.data.searchValue.email=this.formInline.email+"|#|like";
            	}
            	if(this.formInline.mobile !=''){
            		params.data.searchValue.mobile=this.formInline.mobile+"|#|like";
            	}
            	if(this.formInline.rolename !=''){
            		params.data.searchValue['roles.rolename'] = this.formInline.rolename+"|#|like";
            	}
            	if(this.formInline.departmentName !=''){
            		params.data.searchValue.departmentName = this.formInline.departmentName+"|#|like";
            	}
                console.log(params.data.searchValue);
                if(parseInt(pageSize) === 10){
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.UserData = res.data.result.result;
                        that.waterRecordPage.total = res.data.result.totalSize;
                        for(var i = 0;i<res.data.result.result.length;i++){
                            that.UserData[i].departmentName = res.data.result.result[i].department.name;
                        }
                    }
                }
                if(parseInt(pageSize) === 1000){
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.UserAllData = res.data.result.result;
                        for(var i = 0;i<res.data.result.result.length;i++){
                            that.UserData[i].departmentName = res.data.result.result[i].department.name;
                        }
                    }
                }
            	this.ajaxPost(params);
        	},
            doubleSubmitSearch: function() {
                this.submitSearch(1,10);
                this.submitSearch(1,1000);
            },
        	addUser: function() {
                this.formItem = {
                    username:'',
                    password:'',
                    realname:'',
                    email:'',
                    mobile:'',
                    rolename:'',
                    departmentName:'',
                    index:''
                };
                this.updateTitle = "新增用户";
        		this.btnChange = false;
                this.btnSave = true;
                this.modal1 = true;
                this.changeRead = false;
        	},
        	edit: function(row,index) {
                this.updateTitle = "编辑用户";
        		this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
                this.changeRead = true;
                this.formItem.username = row.username;
                this.formItem.realname = row.realname;
                this.formItem.mobile = row.mobile;
                this.formItem.email = row.email;
                this.formItem.identification = row.identification;
                this.formItem.password = row.password;
                this.formItem.rolename = this.UserData[index].roles[0].rolename;
                this.formItem.departmentName = this.UserData[index].departmentName;
                this.formItem.index = index;
        	},
        	changeNotice: function() {
                var that = this;
                var index = this.formItem.index;
                var params = {};
                params.data = this.UserData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlUpdateUserList;
                if(this.formItem.username !=''){
                   params.data.username=this.formItem.username;
                }else{
                    this.$Notice.warning({
                            title: '请填写账号'
                        });
                    return;
                }
                if(this.formItem.password !=''){
                    params.data.password=this.formItem.password;
                }else{
                    this.$Notice.warning({
                            title: '请填写密码'
                        });
                    return;
                }
                if(this.formItem.realname !=''){
                    params.data.realname=this.formItem.realname;
                }else{
                    this.$Notice.warning({
                            title: '请填写名称'
                        });
                    return;
                }
                if(this.formItem.rolename !=''){
                    for(let i = 0;i<this.rolenameList.length;i++){
                        if(this.rolenameList[i].rolename === this.formItem.rolename){
                            params.data.roles[0].roleid = this.rolenameList[i].roleid;
                            params.data.roles[0].rolename = this.formItem.rolename;
                        }
                    }

                }else{
                    this.$Notice.warning({
                            title: '请选择角色'
                        });
                    return;
                }
            if(this.formItem.departmentName !=''){
              for(var i = 0;i<this.departmentNameList.length;i++){
                if(this.formItem.departmentName == this.departmentNameList[i].name){
                  params.data.department = {};
                  params.data.department.name = this.departmentNameList[i].name;
                  params.data.department.code = this.departmentNameList[i].code;
                  params.data.department.system_id = this.departmentNameList[i].system_id;
                }
              }
            }else{
              this.$Notice.warning({
                title: '请选择部门'
              });
              return;
            }
                if(this.formItem.email !=''){
                    params.data.email = this.formItem.email;
                }else{
                    this.$Notice.warning({
                            title: '请选择邮箱'
                        });
                    return;
                }
                if(this.formItem.mobile !=''){
                    params.data.mobile = this.formItem.mobile;
                }else{
                    this.$Notice.warning({
                            title: '请选择电话'
                        });
                    return;
                }

                params.data.identification = this.formItem.identification;
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
                    that.submitSearch(parseInt(that.actionPage),10);
                }
               this.ajaxPost(params);
               this.modal1=false;
            },
            del2: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data._id=this.UserData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlDeleteUserList;
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
                    that.submitSearch(parseInt(that.actionPage),10);
                    that.modal2 = false;
                }

               this.ajaxPost(params);
            },
            del: function(index) {
            	this.modal2 = true;
                this.delIndex = index;
            },
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '人员数据'
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
                if( data === "code"){
                    if(this.formItem.username === ""){return};
                    params.data.searchValue.username = this.formItem.username;
                }
                params.token = this.getKey('token');
                params.url = this.urlUserList;
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
            }
        },
        mounted: function() {
            this.doubleSubmitSearch();
            this.getRoleNameList();
            this.getDepartmentNameList();
        }
    }
</script>
