<!-- 部门管理 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");
</style>


<template>
	<div class="">
		<i-col span="24">
            
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">系统管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">部门管理</Breadcrumb-item>    
            </Breadcrumb>
            <Button class="addBtn" @click="addDepartment"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
							        <Form-item label="部门名称" prop="name">
										<Input v-model="formInline.name" :maxlength="16" placeholder="请输入部门名称"></Input>
									</Form-item>
									<Form-item label="部门编号" prop="code">
										<Input v-model="formInline.code" :maxlength="16" placeholder="请输入部门编号"></Input>
									</Form-item>
									<Form-item label="部门简称" prop="shortname">
										<Input v-model="formInline.shortname" :maxlength="16" placeholder="请输入部门简称"></Input>
									</Form-item>
							        <Button type="primary" @click="doubleSubmitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="80">
                                	<Form-item label="部门名称" prop="name">
										<Input v-model="formItem.name" :maxlength="16" class="width90" @on-blur="checkName('name')" placeholder="请输入部门名称"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="部门编号" prop="code">
										<Input v-model="formItem.code" :maxlength="16" class="width90" @on-blur="checkName('code')" placeholder="请输入部门编号"></Input><span class="redStar">*</span>
									</Form-item>
                                    <Form-item label="部门简称" prop="shortname">
                                        <Input v-model="formItem.shortname" :maxlength="16" class="width90" placeholder="请输入部门简称"></Input><span class="redStar">*</span>
                                    </Form-item>
									<Form-item label="部门级别" class="width90" prop="level">
										<Select clearable v-model="formItem.level">
											<Option :value="1">1级</Option>
											<Option :value="2">2级</Option>
											<Option :value="3">3级</Option>
											<Option :value="4">4级</Option>
<!--                                             <Option :value="5">5级</Option> -->
										</Select>
									</Form-item>
									<Form-item label="部门等级1" prop="level1">
										<Input v-model="formItem.level1" :maxlength="16" class="width90" placeholder="请输入部门等级1"></Input>
									</Form-item>
									<Form-item label="部门等级2" prop="level2">
										<Input v-model="formItem.level2" :maxlength="16" class="width90" placeholder="请输入部门等级2"></Input>
									</Form-item>
									<Form-item label="部门等级3" prop="level3">
										<Input v-model="formItem.level3" :maxlength="16" class="width90" placeholder="请输入部门等级3"></Input>
									</Form-item>
									<Form-item label="部门等级4" prop="level4">
										<Input v-model="formItem.level4" :maxlength="16" class="width90" placeholder="请输入部门等级4"></Input>
									</Form-item>
<!--                                     <Form-item label="部门等级5" prop="level5">
    <Input v-model="formItem.level5" placeholder="请输入部门等级5"></Input>
</Form-item> -->
									<Form-item label="负责人" prop="leader">
										<Input v-model="formItem.leader" :maxlength="8" class="width90" placeholder="请输入负责人名称"></Input><span class="redStar">*</span>
									</Form-item>
									<Form-item label="联系电话" prop="telephone">
										<Input v-model="formItem.telephone" :maxlength="11" class="width90" placeholder="请输入负责人联系电话"></Input><span class="redStar">*</span>
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
                    <p>确认删除该个部门？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del2">删除</Button>
                </div>
            </Modal>
			<div class="center">
				<Table :data="departmentData" :columns="theadArr" stripe></Table>
                <Table ref="table" :data="departmentAllData" v-show="bucunzai" :columns="theadArr" stripe></Table>
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
            	urlDepartmentList:'wtxiqiao/sys/department/list',
            	urlDepartmentAddList:'wtxiqiao/sys/department/new',
            	urlDepartmentUpdateList:'wtxiqiao/sys/department/edit',
            	urlDepartmentDeleteList:'wtxiqiao/sys/department/delete',
            	formItem: {},
                updateTitle: "",
            	formInline: {
            		name:'',
            		code:'',
            		level:'',
            		level1:'',
            		level2:'',
            		level3:'',
            		level4:'',
/*            		level5:'',*/
            		leader:'',
            		telephone:'',
            		shortname:''
            	},
                value1: "",
            	bucunzai:"",
            	departmentData:[],
                departmentAllData: [],
            	theadArr: [{
					title: "部门名称",
					width: 200,
					key: "name",
					fixed: "left"
				}, {
					title: "部门简称",
					width: 120,
					key: "shortname"
				}, {
					title: "部门编号",
					width: 200,
					key: "code"
				}, {
					title: "当前部门级别",
					width: 120,
					key: "level",
                    render: (h,params) => {
                        return params.row.level + "级部门"
                    }
				}, {
					title: "部门等级1",
					width: 200,
					key: "level1"
				}, {
					title: "部门等级2",
					width: 200,
					key: "level2"
				}, {
					title: "部门等级3",
					width: 200,
					key: "level3"
				}, {
					title: "部门等级4",
					width: 200,
					key: "level4"
				}/*, {
					title: "部门等级5",
					width: 200,
					key: "level5"
				}*/, {
					title: "负责人",
					width: 120,
					key: "leader"
				}, {
					title: "联系方式",
					width: 150,
					key: "telephone"
				}, {
					title: '用户操作',
					align: 'center',
					width: 200,
					fixed: 'right',
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
                actionPage: "1",
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
        	submitSearch: function(page,pageSize) {
        		var that = this;
            	var params = {};
            	params.data = {
            		system_id : parameters.system_id,
            		order : {"_id":-1},
            		searchValue : {}
            	}
                params.data.pageSize = pageSize;
                //解决iview分页控件的问题
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
            	params.url = this.urlDepartmentList;
            	if(this.formInline.name !=''){
            		params.data.searchValue.name=this.formInline.name+"|#|like";
            	}
            	if(this.formInline.code !=''){
            		params.data.searchValue.code=this.formInline.code+"|#|like";
            	}
            	if(this.formInline.level !=''){
            		params.data.searchValue.level=this.formInline.level+"|#|like";
            	}
            	if(this.formInline.shortname !=''){
            		params.data.searchValue.shortname=this.formInline.shortname+"|#|like";
            	}
            	if(this.formInline.level1 !=''){
            		params.data.searchValue.level1=this.formInline.level1+"|#|like";
            	}
            	if(this.formInline.level2 !=''){
            		params.data.searchValue.level2=this.formInline.level2+"|#|like";
            	}
            	if(this.formInline.level3 !=''){
            		params.data.searchValue.level3=this.formInline.level3+"|#|like";
            	}
            	if(this.formInline.level4 !=''){
            		params.data.searchValue.level4=this.formInline.level4+"|#|like";
            	}
            	if(this.formInline.level5 !=''){
            		params.data.searchValue.level5=this.formInline.level5;
            	}
            	if(this.formInline.leader !=''){
            		params.data.searchValue.leader=this.formInline.leader+"|#|like";
            	}
            	if(this.formInline.telephone !=''){
            		params.data.searchValue.telephone=this.formInline.telephone+"|#|like";
            	}
                if(parseInt(pageSize) === 10){
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.departmentData = res.data.result.result;
                        that.waterRecordPage.total = res.data.result.totalSize;
                    } 
                }
                if(parseInt(pageSize) === 10000){
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.departmentAllData = res.data.result.result;
                    }
                }           	
            	this.ajaxPost(params);
        	},
            changePage: function(page) {
                this.submitSearch(page,10);
                this.actionPage = page;
            },
        	addDepartment: function() {
        		this.formItem={
        			name:'',
            		code:'',
            		level:'',
            		level1:'',
            		level2:'',
            		level3:'',
            		level4:'',
            		leader:'',
            		telephone:'',
            		shortname:''
            	};
                this.updateTitle = "新增部门";
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
                params.url = this.urlDepartmentAddList;
                if(this.formItem.name !=''){
                   params.data.name=this.formItem.name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写部门名称'
                        });
                    return;
                }
                if(this.formItem.code !=''){
                    params.data.code=this.formItem.code;
                }else{
                    this.$Notice.warning({
                            title: '请填写部门编号'
                        });
                    return;
                }
                if(this.formItem.shortname !=''){
                    params.data.shortname = this.formItem.shortname;
                }else{
                    this.$Notice.warning({
                            title: '请填写部门简称'
                        });
                    return;
                }
                if(this.formItem.telephone !=''){
                    params.data.telephone = this.formItem.telephone;
                }else{
                    this.$Notice.warning({
                            title: '请填写联系电话'
                        });
                    return;
                }
                if(this.formItem.leader !=''){
                    params.data.leader = this.formItem.leader;
                }else{
                    this.$Notice.warning({
                            title: '请填写领导'
                        });
                    return;
                }
                params.data.level = this.formItem.level;
                params.data.level1 = this.formItem.level1;
                params.data.level2 = this.formItem.level2;
                params.data.level3 = this.formItem.level3;
                params.data.level4 = this.formItem.level4;
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
            del2: function() {
                var that = this;
                var params = {};
                params.data = {};
                params.data._id=this.departmentData[this.delIndex]._id;
                params.token = this.getKey('token');
                params.url = this.urlDepartmentDeleteList;
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
                    that.modal2=false;
                    that.submitSearch(parseInt(that.actionPage),10);
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
                this.updateTitle = "编辑部门";
            	this.formItem.name = row.name;
                this.formItem.shortname = row.shortname;
                this.formItem.code = row.code;
                this.formItem.level = row.level;
                this.formItem.level1 = row.level1;
                this.formItem.level2 = row.level2;
                this.formItem.level3 = row.level3;
                this.formItem.level4 = row.level4;
                this.formItem.leader = row.leader;
                this.formItem.telephone = row.telephone;
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
                params.data = this.departmentData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlDepartmentUpdateList;
   				params.data.level1=this.formItem.level1;
   				params.data.level2=this.formItem.level2;
   				params.data.level3=this.formItem.level3;
   				params.data.level4=this.formItem.level4;
   				params.data.level5=this.formItem.level5;
   				params.data.leader=this.formItem.leader;
   				params.data.shortname=this.formItem.shortname;
   				params.data.telephone=this.formItem.telephone;
                if(this.formItem.name !=''){
                   params.data.name=this.formItem.name; 
                }else{
                    this.$Notice.warning({
                            title: '请填写部门名称'
                        });
                    return;
                }
                if(this.formItem.code !=''){
                    params.data.code=this.formItem.code;
                }else{
                    this.$Notice.warning({
                            title: '请填写部门编号'
                        });
                    return;
                }
                if(this.formItem.level !=''){
                    params.data.level=this.formItem.level;
                }else{
                    this.$Notice.warning({
                            title: '请选择部门级别'
                        });
                    return;
                }
                console.log(params); 
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
                    that.submitSearch(parseInt(that.actionPage),10);
                }  
               this.ajaxPost(params); 
        	},
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '部门数据'
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
                    if(this.formItem.name === ""){return};
                    params.data.searchValue.name = this.formItem.name;
                }
                if( data === "code"){
                    if(this.formItem.code === ""){return};
                    params.data.searchValue.code = this.formItem.code;
                }   
                params.token = this.getKey('token');
                params.url = this.urlDepartmentList;
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
                this.submitSearch(1,10);
                this.submitSearch(1,10000);
            }
        },
        mounted: function() {
            this.doubleSubmitSearch();
        }
    }
</script>
