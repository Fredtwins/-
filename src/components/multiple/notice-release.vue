<!-- 通知发布 -->
<style lang="less">
@import url("../../../static/less/color.less");
.addBtn{
    background: rgb(64,176,255)!important;
    color: white!important;
    margin: 5px;
    height: 30px;
    line-height: 0.5!important;   
}
.exportBtn{
    background: rgb(32,153,238)!important;
    color: white!important;
    height: 30px;
    margin-top: 5px;
}
.ivu-collapse{
    border: 0;
    margin-top: 5px;
}
</style>


<template>
	<div class="">
		<i-col span="24">
             
            <Breadcrumb class="ml32">
                <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                <Breadcrumb-item class="black">综合管理</Breadcrumb-item>
                <Breadcrumb-item class="blue">通知记录</Breadcrumb-item>
            </Breadcrumb>
            <Button class="addBtn" @click="addNotice"><Icon type="plus-round"></Icon> 新增</Button>
            <Button class="exportBtn" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
			<Collapse v-model="value1" class="aa">
				<Panel name="1">
					条件筛选
					<template slot="content">
						<Form ref="formInline" :model="formInline" inline :label-width="80">
							        <Form-item label="标题" prop="notice_title">
							            <Input type="text" v-model="formInline.notice_title" placeholder="请输入标题名称"></Input>
							        </Form-item>
							        <Form-item label="时间" prop="release_time">
							            <Date-picker type="date" placeholder="请选择时间" format="yyyy-MM-dd" @on-change="change"></Date-picker>
							        </Form-item>
							        <Button type="primary" @click="submitSearch">搜索</Button>
						</Form>
                        <Modal
                            v-model="modal1">
                            <div slot="header">{{updateTitle}}</div>
                            <Form :model="formItem" :label-width="80">
                                <Form-item label="标题">
                                    <Input v-model="formItem.notice_title" :maxlength="16" placeholder="请输入标题" style="width:187px"></Input>
                                </Form-item>
                                <Form-item label="发布时间" prop="release_time" v-if="formItem.timeShow">
                                     <Input v-model="formItem.release_time" disabled style="width:187px"></Input>
                                </Form-item>
                                <Form-item label="内容">
                                    <Input v-model="formItem.notice_content" :maxlength="300" type="textarea" :rows="4" placeholder="请输入..."></Input>
                                </Form-item>
                                <Form-item label="状态">
                                    <Input v-model="formItem.notice_status" disabled style="width:187px"></Input>
                                </Form-item>
                                    <Input v-model="formItem.index" v-if="bucunzai"></Input>
                            </Form>
                            <div slot="footer">
                                <Button v-if="btnSave" type="primary" @click="ok">保存</Button>
                                <Button v-if="btnChange && !formItem.timeShow" type="primary" @click="changeNotice">修改</Button>
                                <Button  @click="cancel">取消</Button>
                            </div>
                        </Modal>
					</template> 
				</Panel>
			</Collapse>
			<div class="center">
				<Table ref="table" :data="NoticeData" :columns="pumpRecordColumns" stripe></Table>
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
                    <p>确认删除该条通知？</p>
                    <p>是否继续删除？</p>
                    <p v-model="delIndex" v-if="bucunzai"></p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del">删除</Button>
                </div>
            </Modal>
		</i-col>
	</div>
</template>


<script>
    export default {
        data () {
            return {
                urlNoticeList:"wtxiqiao/waterresource/sysnotice/list",
                urlAddNoticeList:"wtxiqiao/waterresource/sysnotice/newnotice",
                urlUpdateNoticeList:"wtxiqiao/waterresource/sysnotice/edit",
                urlDeleteNoticeList:"wtxiqiao/waterresource/sysnotice/delete",
                NoticeData:[],
                modal1: false,
                modal2: false,
                delIndex: "",
                actionPage: "",
            	formInline:{
            		notice_title:'',
            		release_time:''
            	},
                bucunzai: "",
                updateTitle:"",
                btnChange:false,
                btnSave:false,
                value1: "",
                formItem: {
                    index:'',
                    notice_title: '',
                    release_time:'',
                    notice_content: '',
                    notice_status:''
                },
                waterRecordPage: {
                    current: 1,
                    pageSize: 10,
                    total: 0
                },
            	pumpRecordColumns:[{
            		title:'标题',
            		key:'notice_title',
            	},{
            		title:'发布部门',
            		key:'release_department',
            	},{
            		title:'发布人',
            		key:'release_username',
            	},{
            		title:'内容',
            		key:'notice_content',
            	},{
            		title:'状态',
            		key:'notice_status',
            	},{
                    title:'发布时间',
                    key:'release_time',
                },{
            		title:'操作',
            		key:'',
            		render: (h, param) => {
                                if(param.row.timeShow === false){
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
                                            }, '发布'),
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
                                                        this.show(param.index)
                                                    }
                                                }
                                            }, '查看'),
                                            h('Button', {
                                                props: {
                                                    type: 'error',
                                                    size: 'small'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.remove(param.index)
                                                    }
                                                }
                                            }, '删除')
                                        ]);
                                }else{
                                    return h('div', [
                                            h('Button', {
                                                props: {
                                                    disabled:'disabled',
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
                                            }, '发布'),
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
                                                        this.show(param.index)
                                                    }
                                                }
                                            }, '查看'),
                                            h('Button', {
                                                props: {
                                                    type: 'error',
                                                    size: 'small'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.remove(param.index)
                                                    }
                                                }
                                            }, '删除')
                                        ]);
                                }
                            }
                            
                        
            	}]
            }
        },
        methods:{
            clickFn (name) {
                this.$router.push('/home/analysis/' + name)
             },
            ok () {
                this.modal1=false;
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlAddNoticeList;
                if(this.formItem.notice_title !=''){
                   params.data.notice_title=this.formItem.notice_title; 
                }else{
                    this.$Notice.warning({
                            title: '请填写标题'
                        });
                    return;
                }
                if(this.formItem.notice_content !=''){
                    params.data.notice_content=this.formItem.notice_content;
                }else{
                    this.$Notice.warning({
                            title: '请填写内容'
                        });
                    return;
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
                    that.submitSearch(parseInt(that.actionPage),10);
                }
                console.log(params);  
               this.ajaxPost(params); 
            },
            cancel () {
                this.modal1=false;
            },
            show : function (index) {
                this.updateTitle = "查看通知";
                this.btnSave = false;
                this.btnChange = true;
                this.modal1 = true;
                this.formItem.notice_title = this.NoticeData[index].notice_title;
                this.formItem.notice_content = this.NoticeData[index].notice_content;
                this.formItem.notice_status = this.NoticeData[index].notice_status;
                this.formItem.timeShow = this.NoticeData[index].timeShow;
                this.formItem.release_time = this.NoticeData[index].release_time;
                this.formItem.index = index;
            },
            remove : function(index) {
                this.modal2 = true;
                this.delIndex = index;  
            },
            del: function() {
                var that = this;
                var params = {};
                var index = this.delIndex;
                params.data = {};
                params.data._id=this.NoticeData[index]._id;
                params.token = this.getKey('token');
                params.url = this.urlDeleteNoticeList;
                params.success=function(res){
                    that.$Loading.finish();
                    switch(res.data.code) {
                        case '0000':
                            that.$Message.success({
                                content: '删除成功'
                            });
                            that.modal2 = false;
                        break;
                        default:
                            that.$Message.warning({
                                content: res.data.message + " 删除失败"
                            }); 
                    }
                    that.submitSearch(parseInt(that.actionPage),10);                            
                }
                this.ajaxPost(params);
            },
            send:function(index) {
                var that = this;
                var params = {};
                var release_time = new Date().format("yyyy-MM-dd hh:mm:ss");
                //console.log(release_time);
                params.data = this.NoticeData[index];
                params.token = this.getKey('token');
                params.url = this.urlUpdateNoticeList;
                params.data.release_time = release_time;
                params.data.notice_status = "published";
                 params.success=function(res){
                    that.$Loading.finish();
                    switch(res.data.code) {
                        case '0000':
                            that.$Message.success({
                                content: '发布成功'
                            });
                        break;
                        default:
                            that.$Message.warning({
                                content: res.data.message + " 发布失败"
                            }); 
                    }
                    that.submitSearch(parseInt(that.actionPage),10);
                }
                 
               this.ajaxPost(params); 
            },
            addNotice: function() {
                this.updateTitle = "新增通知";
                this.btnChange = false;
                this.btnSave = true;
                this.formItem.timeShow = false;
                this.formItem.notice_status = '草稿';
                this.formItem.notice_title = '';
                this.formItem.notice_content = '';
                this.modal1 = true;
            },
            changeNotice: function() {
                this.modal1=false;
                var that = this;
                var index = this.formItem.index;
                var params = {};
                params.data = this.NoticeData[index];
                params.data.system_id = parameters.system_id;
                params.token = this.getKey('token');
                params.url = this.urlUpdateNoticeList;
                params.data.notice_status = "saved";
                if(this.formItem.notice_title !=''){
                   params.data.notice_title=this.formItem.notice_title; 
                }else{
                    this.$Notice.warning({
                            title: '请填写标题'
                        });
                    return;
                }
                if(this.formItem.notice_content !=''){
                    params.data.notice_content=this.formItem.notice_content;
                }else{
                    this.$Notice.warning({
                            title: '请填写内容'
                        });
                    return;
                }
                console.log(params); 
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
            },
            change: function(data) {
                this.formInline.release_time=data;
            },
            submitSearch: function (page) {
                var that = this;
                var params = {};
                params.data = {};
                params.data.system_id = parameters.system_id;
                if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
                if(page == 0 || page == NaN){
                    params.data.page = 1;
                }
                params.data.pageSize = 10;
                params.data.order={"saved_time":-1};
                params.data.searchValue = {};
                params.token = this.getKey('token');
                params.url = this.urlNoticeList;
                if(this.formInline.notice_title !=''){
                       params.data.searchValue.notice_title=this.formInline.notice_title+"|#|like"; 
                }
                if(this.formInline.release_time !=''){
                    params.data.searchValue.release_time=this.formInline.release_time+" 00:00:00|#|"+this.formInline.release_time+" 23:59:59";
                }
                //console.log(params.data);
                params.success = function(res) {
                    that.$Loading.finish();
                    for(let i=0;i<res.data.result.result.length;i++){
                        if(res.data.result.result[i].notice_status === "saved"){
                            res.data.result.result[i].notice_status = "草稿";
                            res.data.result.result[i].timeShow = false;
                        }else{
                            res.data.result.result[i].notice_status = "已发布";
                            res.data.result.result[i].timeShow = true;
                        }
                    }
                    that.NoticeData = res.data.result.result;
                    that.waterRecordPage.total = res.data.result.totalSize;
                    //console.log(res.data.result);
                }
                this.ajaxPost(params);
            },
            changePage: function(page) {
                this.submitSearch(page,10);
                this.actionPage = page;
            },
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '通知数据'
                });
            }
        },
        mounted: function() {
            this.submitSearch();
        }
    }
</script>
