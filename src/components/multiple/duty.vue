<!-- 值班记录查询 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");

</style>


<template>
	<div class="">
        <Row>
    		<i-col span="24">
                <Breadcrumb class="ml32">
                    <Button type="primary" class="pull-right" @click.native="clickFn('menu')">后退</Button>
                    <Breadcrumb-item class="black">值班管理</Breadcrumb-item>
                    <Breadcrumb-item class="blue">值班记录查询</Breadcrumb-item>
                </Breadcrumb>
                <Button class="exportBtn" style="margin-left: 5px" @click.stop="exportData"><img src="../../../static/img/icon/export.svg" alt=""> 导出数据</Button>
    			<Collapse v-model="value1" class="aa">
    				<Panel name="1">
    					条件筛选
    					<template slot="content">
    						<Form ref="formInline" :model="formInline" inline :labelWidth="60">
    							        <Form-item label="部门名称" prop="department_name">
    							            <Select v-model="formInline.department_name" clearable style="width:200px">
                                               <Option v-for="item in departmentName" :value="item.name" :key="item.name">{{ item.name }}</Option>
                                            </Select>
    							        </Form-item>
    							        <Form-item label="开始时间" prop="signed_time">
    							            <Date-picker type="date" placeholder="选择开始日期" format="yyyy-MM-dd" @on-change="change"></Date-picker>
    							        </Form-item>
    							        <Form-item label="结束时间" prop="exchange_time">
    							            <Date-picker type="date" placeholder="选择结束日期" format="yyyy-MM-dd" @on-change="change2"></Date-picker>
    							        </Form-item>
    							            <Button type="primary" @click="submitSearch">搜索</Button>
    							    </Form>
    					</template> 
    				</Panel>
    			</Collapse>
    			<div class="center">
    				<Table ref="table" :data="dutyData[0]" :columns="dutyColumns" stripe></Table>
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
        </Row>
	</div>
</template>


<script>
    export default {
        data () {
            return {
            	urlDutyList: "wtxiqiao/waterresource/dutdutyrecord/list",
            	urlDepartmentList: "wtxiqiao/sys/department/list",
            	formInline:{
            		department_name:'',
            		signed_time:'',
            		exchange_time:''
            	},
                departmentName: [],
                value1: "",
                dutyData: [],
                dutyColumns: [{
            		title:'部门名称',
            		key:'department_name',
            	}, {
            		title:'值班日期',
            		key:'duty_date',
            	}, {
            		title:'值班人员',
            		key:'duty_person',
            	}, {
            		title:'签到人员',
            		key:'signed_person',
            	}, {
            		title:'签到时间',
            		key:'signed_time',
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
        	change: function(data) {
                this.formInline.signed_time = data;
            },
            change2: function(data) {
                this.formInline.exchange_time = data;
            },
            submitSearch: function(page) {
            	var that=this;
                var params={};
                var myDate = new Date().format("yyyy-MM-dd hh:mm:ss");
                params.data = {};
                params.data.searchValue={}; 
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
                params.data.order={"signed_time":-1};
                params.token = this.getKey('token');
                params.url = this.urlDutyList;
                if(this.formInline.department_name !== ""){
                	params.data.searchValue.department_name = this.formInline.department_name;
                }
                if(this.formInline.signed_time !== ""){
                    if(this.formInline.exchange_time !== ""){
                        params.data.searchValue.signed_time = this.formInline.signed_time + " 00:00:00|#|" + this.formInline.exchange_time + " 23:59:59";
                    }else{
                        params.data.searchValue.signed_time = this.formInline.signed_time + " 00:00:00|#|" + myDate;
                    }
                }else{
                    if(this.formInline.exchange_time !== ""){
                        params.data.searchValue.signed_time = "1970-01-01 00:00:00|#|" + this.formInline.exchange_time + " 23:59:59";
                    }
                }
                console.log(params.data.searchValue);
                params.success = function(res) {
                    that.$Loading.finish();
                    that.$store.state.isLoadingShow = false;
                    that.dutyData.unshift(res.data.result.result);
                    that.waterRecordPage.total = res.data.result.totalSize;
                }
                this.ajaxPost(params);    
            },
            changePage: function(page) {
                this.submitSearch(page);
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
            exportData: function() {
                this.$refs.table.exportCsv({
                        filename: '值班记录数据'
                });
            }
        },
        mounted: function () {
        	this.submitSearch();
        	this.getNameList();
        }
    }
</script>
