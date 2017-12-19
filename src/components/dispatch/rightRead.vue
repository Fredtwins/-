<style lang="less">
  @import url("../../../static/less/color.less");
.rightRead{
 // width: 715px;
  //width: 545px;
  width: 270px;
  position: absolute;
  right: 0px;
  top:30px;
  transition: all 0.8s ease-in-out;
  .mapTool{
    width: 100%;
    height: 40px;
    position: relative;
    .selectBox{
      width: 120px;
      float: left;
      .ivu-select-selection{
        height: 40px;
        .ivu-select-placeholder,.ivu-select-selected-value{
          height: 40px;
          line-height: 40px;
          text-align: center;
        }

      }
    }
  }
  .rightReadHeader{
    width: 100%;
    height: 40px;
    background-color: @navColor;
    position: relative;
    .rightTitle {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: white;
      font-size: 16px;
    }

  }



}
  .rightReadContent {
    color: rgb(49,49,49);
    width: 100%;
    padding: 10px;
    border: 1px solid @navColor;
    background-color:white;
    .areaTitle{
      position: relative;
      font-weight: bold;
      font-size: 14px;
      color: rgb(49,49,49);
      border-left: 3px solid #008cee;
      padding-left: 5px;
      margin-bottom: 15px;
    }
    .taskName{

      margin-bottom: 15px;
      color: rgb(255,155,58);
    }
    .taskDate{
      margin-bottom: 15px;
      .ivu-date-picker{
        right: 0px;
      }
    }
  }
  .menuArrow{
    width: 40px;
    height: 42px;
    cursor: pointer;
    position: absolute;
    left: -40px;
    top:-1px;
    border: 1px solid #e6e5e6;
    border-radius: 5px 0 0 5px;
    background-size: 100% 100%;
    background-color: white;
    background-image: url(./img/leftReadL.png);

  }

  .rightReadNotShow {
    transform: translate3D(100%, 0, 0);
  }

  .leftOrRight {
    background-image: url(./img/leftReadR.png);
  }
  .taskSetmodal{
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      top:0px;
      margin: 0;
    }
    .ivu-modal-content{
      height: 600px;
      background-color: rgb(248,248,249);
      .ivu-modal-close{
        font-size: 14px;
        top:3px
      }
      .ivu-modal-header {
        background:rgb(64,176,255);
        height: 40px;
        padding: 10px;
        .ivu-modal-header-inner{
          text-align: center;
          color: white;
        }
      }
      .ivu-modal-body{
          padding: 10px 10px 8px 8px;
        .tabContainer{
          background-color: white;
          width: 100%;
          padding: 0px 10px;
          .dateLine{
            display: inline-block;margin-left: 18%
          }
          .detailContainer{
            margin-top:20px;
            border: 1px solid #eee;width: 100%;
            .detailTitle{
              height: 30px;
              line-height: 30px;
              background-color: rgb(64,176,255);
              padding-left:10px;
              color: white
            }
            .detailTableBox{
              padding: 10px
            }
          }
        }
      }
    }
  }
.tableClass{
  .ivu-table{
    th {
      height: 30px;
      background-color: rgb(228,246,255);
      font-weight: bold;
      color: rgb(49,49,49);
    }
    td{color: rgb(49,49,49);

      height: 30px;
    }
  }
}

</style>


<template>
<div class="rightRead" :class="[{rightReadNotShow: !isOut}]">

  <div class="menuArrow" :class="{leftOrRight: isOut}" @click="isOut=!isOut;" ></div>
  <div class="mapTool">
    <div class="selectBox">
      <Select v-model="areaMap" placeholder="区域" @on-change="changeAreaMap($event)">
        <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="selectBox">
      <Select v-model="mapType" placeholder="行政图" @on-change="changeMapType($event)">
        <Option v-for="item in mapTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
  </div>
  <header class="rightReadHeader">
    <div class="rightTitle">当前执行调度方案</div>
  </header>
  <section class="rightReadContent">


    <!--调度方案-->
      <div class="areaTitle">桑园片
        <Button type="primary" style="position:absolute;right: 0px" size="small" @click="showTaskDetailModal('sangyuan')">方案详细</Button>
      </div>
    <div v-if="new Date() > new Date(this.scheme.Sangyuan.deadline_time)" style="color:#ff5953;margin-bottom: 5px">当前方案已过期，请重新设置！</div>

    <div class="taskName">
        <span style="color: rgb(49,49,49)">方案名：</span>{{scheme.Sangyuan.scheme_name}}
      </div>
      <div class="taskDate">
        <span>有效期至:</span>
        <Date-picker :value="this.scheme.Sangyuan.deadline_time" :readonly="true"  @on-change="setSangDate" type="datetime" placement="bottom"  format="yyyy-MM-dd" placeholder="选择日期和时间" style="width: 190px"></Date-picker>

      </div>

    <div class="areaTitle">大栅片
      <Button type="primary" style="position:absolute;right: 0px" size="small" @click="showTaskDetailModal('daShan')">方案详细</Button>

    </div>
    <div v-if="new Date() > new Date(this.scheme.daShan.deadline_time)" style="color:#ff5953;margin-bottom: 5px">当前方案已过期，请重新设置！</div>

    <div class="taskName"><span style="color: rgb(49,49,49)">方案名：</span>{{scheme.daShan.scheme_name}}

      </div>

      <div class="taskDate">
        <span>有效期至:</span>
        <Date-picker :value="this.scheme.daShan.deadline_time" :readonly="true"   @on-change="setDashanDate" type="datetime" placement="bottom" format="yyyy-MM-dd" placeholder="选择日期和时间" style="width: 190px"></Date-picker>
      </div>
      <Table class="tableClass" :data="waterlevel" size="small" :width="240" height="122" :columns="waterlevelrightColumns" stripe border></Table>

  </section>
  <Modal v-model="taskSet" title="调度方案设置" class-name="taskSetmodal" width="800">
    <div class="tabContainer">
      <Tabs type="card" v-model="currentSaveArea" @on-click="tab_Click">
        <TabPane label="桑园片" name="sangyuan">
            方案：
            <Select v-model="scheme.Sangyuan.scheme_name"  clearable style="width: 300px" @on-change="getTaskDetail('sangyuan',1,6)">
              <Option v-for="item in scheme.SschemeList" :value="item.scheme_name" :key="item.scheme_id">{{item.scheme_name}}</Option>
            </Select>
         <span class="dateLine">
           有效期至：
           <Date-picker :value="this.scheme.Sangyuan.deadline_time"  @on-change="setSangDate" type="datetime" placement="bottom"  format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
         </span>
          <div class="detailContainer">
            <div class="detailTitle">方案详细</div>
            <div class="detailTableBox">
              <Table class="tableClass"  border stripe  size="small" height="200" :columns="taskColumns" :data="sangyuan_taskData" ></Table>
              <div style="margin: 6px 0 0 0;overflow: hidden">
                <div style="float: right;">
                  <Page :total=this.sangyuan_totalCount show-total :page-size=this.sangyuan_pageSize :current="1" size="small" @on-change="getTaskDetail('sangyuan',$event,6)"></Page>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane label="大栅片" name="daShan">

          方案：
          <Select v-model="scheme.daShan.scheme_name"  clearable style="width: 300px" @on-change="getTaskDetail('dashan',1,6)">
            <Option v-for="item in scheme.DschemeList" :value="item.scheme_name" :key="item.scheme_id">{{item.scheme_name}}</Option>
          </Select>
          <span class="dateLine">
           有效期至：
           <Date-picker :value="this.scheme.daShan.deadline_time"  @on-change="setDashanDate" type="datetime" placement="bottom"  format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" style="width: 200px"></Date-picker>
         </span>
          <div class="detailContainer">
            <div class="detailTitle">方案详细</div>
            <div class="detailTableBox">
              <Table class="tableClass"  border stripe  size="small" height="205" :columns="taskColumns" :data="daShan_taskData" ></Table>
              <div style="margin: 6px 0 0 0;overflow: hidden">
                <div style="float: right;">
                  <Page :total=this.daShan_totalCount show-total :page-size=this.daShan_pageSize :current="1" size="small" @on-change="getTaskDetail('dashan',$event,6)"></Page>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div style="margin-top: 10px">
        <Row>
          <Col span="16">
             <Table class="tableClass" :data="waterlevel" size="small" :width="400" :columns="waterlevelColumns" stripe border></Table>
          </Col>
        <Col span="8">
          <div style="margin-top:50px" >
            <Button type="primary" @click="saveTask">保存当前方案</Button>
          </div>
          </Col>
        </Row>
      </div>

    </div>
    <div slot="footer"></div>
  </Modal>



  <Modal v-model="changeCommit" width="200">
      <p>确定更改当前调度方案？</p>
    <div slot="footer">
      <Button type="ghost" size="small" @click="changeCommit=false">取消</Button><Button type="primary" size="small" @click="saveOrderPlan(currentScheme)">确定</Button></div>
  </Modal>

</div>

</template>
<script>

  export default {
    components: {

    },
    mounted() {

      this.$nextTick(() => {

       //获取参考水位
        this.getwaterLevel();
        //获取当前调度方案
        this.getCurrentOrderPlan();
        //获取调度方案list
        this.scheme.SschemeList=[];
        this.scheme.DschemeList=[];
        this.getDispatchScheme();

      })
    },
      data () {

          return {
            currentSaveArea:'sangyuan',
            taskSet:false,
            changeCommit: false,
            currentScheme:'',

            isOut: true,

            stationSelected:'',
            order_code:'',
            order_content:'',
            orderDirection:'',
            current_order_content: '',


            scheme:{
              SschemeList:[],
              DschemeList:[],
              Sangyuan:{scheme_name:'',deadline_time:'',scheme_id:'',town:'',_id:'',area:'',create_time:'',create_department:'',create_person:'',scheme_id:''},
              daShan: {scheme_name:'',deadline_time:'',scheme_id:'',town:'',_id:'',area:'',create_time:'',create_department:'',create_person:'',scheme_id:''},
            },

            sangyuan_totalCount: 0,
            sangyuan_pageSize: 0,
            daShan_totalCount: 0,
            daShan_pageSize: 0,

            waterlevelColumns: [{
              title: "河流",
              key: "river",
              width:150
            }, {
              title: "参考值(m)",
              key: "reference_waterLevel",
              width:124
            }, {
              title: "当前值(m)",
              key: "current_level",
              width:123
            }],
            waterlevelrightColumns: [{
              title: "河流",
              key: "river",
              width:80
            }, {
              title: "参考值(m)",
              key: "reference_waterLevel",
              width:79
            }, {
              title: "当前值(m)",
              key: "current_level",
              width:79
            }],
            taskColumns: [{
              title: "调度依据",
              key: "schemeDetailed"
            }],
            sangyuan_taskData: [],
            daShan_taskData: [],


            waterlevel: [],
            logColData: [],

            areaList: [
              {
                value: 'xq',
                label: '西樵镇'
              }
            ],
            areaMap: '',
            mapTypeList: [{value: 'xzt', label: '行政图'},{value: 'yxt', label: '影像图'}],
            mapType: '',
            mapToolList: [
              {value: 'choose', label: '选择'}, {value: 'measure', label: '测距'}, {value: 'save', label: '保存'}, {value: 'clear', label: '清除全部'}
            ],
            mapTool: '',
          }
      },

    methods:{

        showTaskDetailModal:function(obj){
          this.taskSet=true;
          this.currentSaveArea=obj;
        },
       //保存调度方案
      saveOrderPlan: function (obj) {

          var params={};
          var that=this;
          params.data={};
          //params.data.schemes=[];
           params.system_id = parameters.system_id;
           params.token = this.getKey('token');
           params.url ='wtxiqiao/waterresource/wdpcurrscheme/edit';
           var create_department=JSON.parse(this.getKey('department'))['name'];
           var create_person=this.getKey('realname');
           var create_time= new Date(new Date().getTime()).format('yyyy-MM-dd hh:mm');

           params.success = function(res) {
          if (res.data.code === '0000') {
            that.$Message.success('保存成功');
            that.taskSet=false;
          } else {
            that.$Message.error('保存失败' + res.data.message);
          }
          //console.log(res.data.result);
        };
       switch (obj.area){
         case '桑园片':
           if(this.scheme.Sangyuan.scheme_name!=''&&this.scheme.Sangyuan.deadline_time!=''){

             if(!(this.validateDate(this.scheme.Sangyuan.deadline_time))){
               return;
             }
             // params.data.schemes.push(this.scheme.Sangyuan);
             this.scheme.Sangyuan.create_department=create_department;
             this.scheme.Sangyuan.create_person=create_person;
             this.scheme.Sangyuan.create_time=create_time;
             this.scheme.SschemeList.map((item) =>{
               if(item.scheme_name===that.scheme.Sangyuan.scheme_name){
                 //console.log(item.scheme_id);
                 that.scheme.Sangyuan.scheme_id=item.scheme_id;
                 return;
               }
             });
             params.data=this.scheme.Sangyuan;
             //console.log(params.data);
             this.ajaxPost(params);


           }
             break;
         case '大栅片':
           if(this.scheme.daShan.scheme_name!=''&&this.scheme.daShan.deadline_time!=''){

             if(!this.validateDate(this.scheme.Sangyuan.deadline_time)){
               return;
             }
             //params.data.schemes.push(this.scheme.daShan);
             this.scheme.daShan.create_department=create_department;
             this.scheme.daShan.create_person=create_person;
             this.scheme.daShan.create_time=create_time;
             this.scheme.DschemeList.map((item) =>{
               if(item.scheme_name===that.scheme.daShan.scheme_name){
                 //console.log(item.scheme_id);
                 that.scheme.daShan.scheme_id=item.scheme_id;
                 return;
               }
             });
             params.data=this.scheme.daShan;
             this.ajaxPost(params);
           }
             break;
       }
        this.changeCommit=false;
      },
      //获取当前调度方案
      getCurrentOrderPlan: function () {
        var params={};
        var that=this;
        params.system_id = parameters.system_id;
        params.token = this.getKey('token');
        params.url ='wtxiqiao/waterresource/wdpcurrscheme/list';
        params.success = function(res){
          that.$Loading.finish();
          var data=res.data.result.result;
          data.map((item) =>{
              if(item.area==='桑园片'){
                that.scheme.Sangyuan.scheme_name=item.scheme_name;
                that.scheme.Sangyuan.deadline_time=item.deadline_time;
                that.scheme.Sangyuan.scheme_id=item.scheme_id;
                that.scheme.Sangyuan.town=item.town;
                that.scheme.Sangyuan._id=item._id;
                that.scheme.Sangyuan.area=item.area;

              }
              if(item.area==='大栅片'){
                that.scheme.daShan.scheme_name=item.scheme_name;
                that.scheme.daShan.deadline_time=item.deadline_time;
                that.scheme.daShan.scheme_id=item.scheme_id;
                that.scheme.daShan.town=item.town;
                that.scheme.daShan._id=item._id;
                that.scheme.daShan.area=item.area;
              }
            })
        };
        this.ajaxPost(params);

      },
      //获取调度方案列表
      getDispatchScheme:function () {
         var params = {};
         var that = this;
         params.data = {"system_id":parameters.system_id,"searchValue":{}};
         params.token = this.getKey('token');
         params.url ='wtxiqiao/waterresource/wdpdispatchscheme/list';
         params.success = function (res) {
           that.$Loading.finish();
           var data=res.data.result.result;
           if (res.data.code === '0000') {
             data.map((item) => {
                 switch (item.area){
                   case '桑园片':
                     that.scheme.SschemeList.push(item);
                     break;
                   case '大栅片':
                     that.scheme.DschemeList.push(item);
                    // console.log(item);
                     break;
                 }
             })
           }
           };
         this.ajaxPost(params);

      },


//过滤非法的调度方案有效日期
      validateDate: function (event) {
        var currentDate=new Date();
        var date=new Date(event);
        if(date < currentDate){
          this.$Notice.warning({
            title: '有效期不能小于当前时间'
          });
          return false;
        }
        return true;
      },
      //设置桑园片有效期
      setSangDate: function (event) {
        this.validateDate(event);
        this.scheme.Sangyuan.deadline_time=event+':00';

      },
      //设置大栅片有效期
      setDashanDate: function (event) {
        this.validateDate(event);
        this.scheme.daShan.deadline_time=event+':00';

      },
      //获取参考水位
      getwaterLevel: function () {
        var that = this;
        var params = {};
        params.data = {};
        params.data.system_id = parameters.system_id;
        params.data.page = 1;
        params.data.pageSize = 50;
        params.data.orders = 'data_time';
        params.data.searchValue = {};
        params.token = this.getKey('token');
        params.url ='wtxiqiao/waterresource/rlddevicerunrec/listcurrent';
        ;
        params.success = function(res) {
          that.$Loading.finish();
          if(res.data.code=='0000'){
              let data = res.data.result;
              data.map((item) =>{
                  switch(item.stn_name){
                    case'华夏窦':
                      that.gsLevel = item.water_river_out;
                      break;
                    case'太平船闸':
                      that.xjLevel = item.water_river_out;
                      break;
                    case'三多引水闸站':
                      that.bjLevel = item.water_river_out;
                      break;
                  }
                that.waterlevel = [{
                  river: "西江水位",
                  reference_waterLevel: "0.7~1.2",
                  current_level: that.xjLevel
                }, {
                  river: "北江水位",
                  reference_waterLevel: "0.7~1.2",
                  current_level: that.bjLevel
                }, {
                  river: "官山水位",
                  reference_waterLevel: "0.6",
                  current_level: that.gsLevel
                }]
              });
            }

        }
        this.ajaxPost(params);
      },

      changeScheme:function (obj) {
           if(obj.scheme_name!==''&& obj.deadline_time!==''){

               this.changeCommit = true;
               this.currentScheme = obj;

           }
      },
      //获取调度方案详细
      getTaskDetail: function (name,pageNo,pageSize) {
        var params = {};
        var that = this;
        params.token = this.getKey('token');
        params.url ='wtxiqiao/waterresource/wdpdispatchscheme/getSchemeDetailed';

        switch(name){
          case'sangyuan':
            that.sangyuan_taskData=[];
            params.data = {"page":pageNo,"pageSize":pageSize,"area":"桑园片","scheme_name":this.scheme.Sangyuan.scheme_name}
            params.data.system_id = parameters.system_id
            params.success = function (res) {
              that.$Loading.finish();
              var data=res.data.result;
              if (res.data.code === '0000') {
                that.sangyuan_taskData = data.Scheme.tasks;
                that.sangyuan_totalCount=data.totalSize;
                that.sangyuan_pageSize=data.pageSize;
                //console.log(data)
              }
            };
            this.ajaxPost(params);
            break;
          case'dashan':
            that.daShan_taskData=[];
            params.data = {"page":pageNo,"pageSize":pageSize,"area":"大栅片","scheme_name":this.scheme.daShan.scheme_name}
            params.data.system_id = parameters.system_id
            params.success = function (res) {
              that.$Loading.finish();
              var data=res.data.result;
              if (res.data.code === '0000') {
                that.daShan_taskData = data.Scheme.tasks;
                that.daShan_totalCount=data.totalSize;
                that.daShan_pageSize=data.pageSize;
                //console.log(data)
              }
            };
            this.ajaxPost(params);
            break;
          default:
            params.data={};
            params.data.system_id = parameters.system_id
            this.ajaxPost(params);
            break;
        }


        //console.log(this.taskData);
      },

      //切换tab，显示不同片区的调度方案详细
      tab_Click:function(name){
        this.currentSaveArea=name;
        let pageSize=0;
        switch (name){
          case'sangyuan':
              pageSize=this.sangyuan_pageSize;
              break;
          case'daShan':
            pageSize=this.daShan_pageSize;
            break;
        }
        this.getTaskDetail(name,1,pageSize);
      },
      saveTask:function () {
        if(this.currentSaveArea=='sangyuan'){
            this.changeScheme(this.scheme.Sangyuan);
        }
        if(this.currentSaveArea=='daShan'){
          this.changeScheme(this.scheme.daShan);
        }
      },
      /*地图工具*/
      //改变区域
      changeAreaMap: function(evt){
      },
      //改变地图
      changeMapType(event){
        if(event == "xzt"){
          this.$bus.emit('changeMapLayer',true,false,false);
        }else if(event=="yxt"){
          this.$bus.emit('changeMapLayer',false,false,true);
        }else if(event == "dxt"){
          //this.$bus.emit('changeMapLayer',false,true,false);
        }

      },
    },

  }



</script>
