<!-- 角色管理 -->
<style lang="less">
@import url("../../../static/less/color.less");
.roleName{
    .ivu-input-type{
        .ivu-input{
            height: 32px!important
        }
    }
}

</style>


<template>
	<div class="roleName">
		<i-col span="24">
             
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">系统管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">角色管理</Breadcrumb-item>
            </Breadcrumb>
            <Button class="addBtn" @click="addRole"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
							        <Form-item label="角色名称" prop="rolename">
										<Input v-model="formInline.rolename" placeholder="请输入角色名称" long></Input>
									</Form-item>
									<Form-item label="角色描述" prop="description">
										<Input v-model="formInline.description" type="textarea" placeholder="请输入..." ></Input>
									</Form-item>
                                    
							        <Button type="primary" @click="submitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="80">	
                                	<Form-item label="角色名称" prop="rolename">
										<Input v-model="formItem.rolename" @on-blur="checkName('name')" class="width90" :maxlength="8" placeholder="请输入角色名称" long></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="角色描述" prop="description">
										<Input v-model="formItem.description" type="textarea" class="width90" :rows="4" placeholder="请输入..."></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="角色权限" prop="modules" class="roleTree">
										<Tree v-if="treeShow" :data="formItem.modules" show-checkbox></Tree>
									</Form-item> 
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
                    <p>确认删除该个角色？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table ref="table" :data="roleData" :columns="theadArr" stripe></Table>
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
                urlRoleList2:"wtxiqiao/sys/role/list",
            	urlRoleList:'wtxiqiao/sys/role/getbyid',
            	urlRoleAddList:'wtxiqiao/sys/role/new',
            	urlRoleUpdateList:'wtxiqiao/sys/role/edit',
            	urlRoleDeleteList:'wtxiqiao/sys/role/delete',
                urlModuleList: "wtxiqiao/sys/module/getallinlevels",
            	updateTitle:"",
                treeShow: false,
                value1: "",
            	theadArr: [{
					title: "角色名称",
					width: 150,
					key: "rolename"
				}, {
					title: "权限描述",
					key: "description"
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
				btnSave: false,
				btnChange: false,
				modal1: false,
                modal2: false,
                delIndex: "",
                actionPage: "",
				bucunzai:"",
            	roleData:[],
            	formItem: {},
            	formInline: {
            		rolename:'',
            		description:''
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
            	params.url = this.urlRoleList;
            	if(this.formInline.rolename !=''){
            		params.data.searchValue.rolename = this.formInline.rolename+"|#|like";
            	}
            	if(this.formInline.description !=''){
            		params.data.searchValue.description = this.formInline.description+"|#|like";
            	}
                console.log(params.data);
            	params.success = function(res) {
	                that.$Loading.finish();
	                that.roleData = res.data.result.result;
                    console.log(res.data);
                    that.waterRecordPage.total = res.data.result.totalSize;
	                
            	}
            	this.ajaxPost(params);
        	},
            changePage: function(page) {
                this.submitSearch(page);
                this.actionPage = page;
            },
        	addRole: function() {
                var that = this;
                var params = {};
                this.formItem = {
                    modules: []
                };
                params.data = {
                    system_id : parameters.system_id,
                    searchValue : {}
                }
                params.token = this.getKey('token');
                params.url = this.urlModuleList;
                params.success = function(res) {
                    console.log(res.data.result.result.modules);

                    that.formItem.modules = res.data.result.result.modules; 
                    //console.log(that.formItem.modules);
                    that.treeShow = true;
                }
                this.ajaxPost(params);
                this.updateTitle = "新增角色";
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
                params.url = this.urlRoleAddList;
                if(this.formItem.rolename !=''){
                   params.data.rolename=this.formItem.rolename; 
                }else{
                    this.$Notice.warning({
                            title: '请填写角色名称'
                        });
                    return;
                }
                if(this.formItem.description !== ''){
                    params.data.description = this.formItem.description;
                }

                if(this.formItem.modules !== ""){
                    params.data.modules = this.formItem.modules;
                }
                console.log(params.data);
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
                this.modal1=false;
            },
            del2: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data._id=this.roleData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlRoleDeleteList;
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
            cancel () {
                this.modal1=false;
            },
            edit: function(row,index) {
            	this.updateTitle = "编辑角色";
            	this.formItem.description = row.description;
                this.formItem.rolename = row.rolename;
                this.formItem.modules = row.modules;
               /* this.formItem.modules = [];
                for(i in row.modules){
                    this.formItem.modules = [{
                        expand: row.modules[i].che,
                    }]
                }*/
            	this.formItem.index = index;
                console.log(this.formItem.modules);
        		this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
                this.treeShow = true;
                
        	},
        	changeDepartment: function() {
                var that = this;
                var index = this.formItem.index;
                var params = {};
                console.log(index);
                params.data = this.roleData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlRoleUpdateList;
   				params.data.description = this.formItem.description;
                if(this.formItem.rolename !=''){
                   params.data.rolename=this.formItem.rolename; 
                }else{
                    this.$Notice.warning({
                            title: '请填写角色名称'
                        });
                    return;
                }
                params.data.modules = this.formItem.modules; 
                console.log(params.data);               
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
                    that.submitSearch(parseInt(that.actionPage));
                }  
               this.ajaxPost(params); 
        	},
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '角色数据'
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
                    if(this.formItem.rolename === ""){return};
                    params.data.searchValue.rolename = this.formItem.rolename;
                } 
                params.token = this.getKey('token');
                params.url = this.urlRoleList2;
                console.log(params.data);
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
        	this.submitSearch();
        }
    }
</script>
