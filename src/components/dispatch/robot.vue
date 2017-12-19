
<style  lang="less">
  @import url("../../../static/less/color.less");
  .robot{
    position: absolute;
    width:200px;
    height: 80px;
    bottom: 20px;
    right: 20px;
    .robotHome{
      width: 100%;
      height: 100%;
      background-size:100% 100%;
      background-image: url(../../../static/img/aPicture/robot/robotHome.png);
      .ivu-poptip-inner{
        background-color: #FDF3D9;
        color: rgb(49,49,49);
      }
      .ivu-poptip-title:after {
        background-color: rgba(0,0,0,.6);
      }
      .ivu-poptip-arrow:after {
        border-top-color: #FDF3D9;
      }
      .ivu-poptip-body-content{
        white-space: normal;
      }
      .robotImg {
        width: 100%;
        height: 100%;
      }
      }

  }

    .robotWaterWarning{
      display: flex;
      align-items: center;
      justify-content: center;

      .ivu-modal{
        top:0px;
        margin: 0;
        border: 1px solid #40B0FF;
      }
      .ivu-modal-content{
        height: 600px;
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
      }
    }
    .robotModalMask{
      .ivu-modal-mask{
        background: none !important;
      }
    }
  .robot_tableClass{
    .ivu-table{
      th {
        background-color: rgb(64,176,255);
        color:white;
        font-size: 14px;

      }

    }
  }
.adviceCommitModal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal-content{
    background-color: #fff8df;
    .ivu-modal-body{
      font-size: 16px;
      color: rgb(49,49,49);
    }
  }
}

</style>
<template>
  <div class="robot" v-show="showRobot">
    <div class="robotHome">
      <Poptip v-model="showPoptip" @on-popper-hide="robotComeOn(false)">
        <div slot="title" class="robot-poptip-title">信息</div>
        <div slot="content">{{robotMsg}}</div>
        <img ref="poptip" :src="robotImg" class="robotImg"/>
      </Poptip>
    </div>
    <Modal v-model="waterWarning" class-name="robotWaterWarning" class="robotModalMask" width="800">
      <div slot="header">
          
          <div class="ivu-modal-header-inner">
            <Checkbox v-model="single" style="float: left">一小时之内不再显示</Checkbox>
            <span style="position:absolute;top:10px;left:35%;">{{modalTitle}}</span>
          </div>

          <Select v-model="riverName" :label-in-value=true @on-change="changeChart" style="width: 200px;position: absolute;right: 50px; top:4px">
            <Option v-for="item in riverList" :value="item.riverName" :key="item.riverName">{{item.riverName}}</Option>
          </Select>
      </div>
      <div>
        <div id="waterChart" style="height: 300px"></div>
      </div>
      <div style="position: relative">
        <Table class="tableClass robot_tableClass" border   size="small" :height="220" :columns="adviceCols" :data="adviceData" @on-selection-change="tableCheckBox"></Table>
        <Button type="error" size="small" style="position: absolute;top: 4px;right: 10px;" @click="executeAdvice()">执行建议</Button>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal v-model="adviceCommit" width="200" class-name="adviceCommitModal">
      <p>确定执行调度建议？</p>
      <div slot="footer">
        <Button type="ghost" size="small" @click="adviceCommit=false">取消</Button>
        <Button type="primary" size="small" @click="executeAdvice(true)">确定</Button>
      </div>

    </Modal>
  </div>
</template>
<script>

  export default {
    components:{

    },
    mounted(){
        var that = this;
       /*setTimeout(function () {
          that.robotComeOn(true);
        },10000)*/
        this.robotComeOn();
     var robotInterval= setInterval(function(){
         if(!that.waterWarning){
           that.getAdvice();
         }
       },30000)
    },
    data(){
        return{
          adviceCommit:false,
          modalTitle:'',
          showRobot:false,
          showPoptip:false,
          robotImg:'',
          waterWarning:false,
          riverName:'',
          single: false,
          riverList:[
            {
              riverName:'官山水位'
            },
            {
              riverName:'北江水位'
            },
            {
              riverName:'西江水位'
            }
          ],
          robotMsg:'根据当前调度方案，有站点需要进行调度，请等待领导审批！',
          adviceCols:[
            {
              type:'selection',
              width: 40,
              align: 'center'
            },
              {
                title:'调度建议',
                key:'dispatch_order',
                width:715,
                render:(h,params) => {
                    var that =this;
                  return h('Input',{
                    props: {
                      type: 'text',
                      value:params.row.dispatch_order,
                    },
                    style: {
                      width: '100%',
                    },
                    on: {
                      'on-blur': (event) => {
                         // console.log(event);
                       that.adviceData[params.index].dispatch_order=event.target.value;
                       //params.row.dispatch_order=event;
                       //console.log(params.row.dispatch_order);
                      }
                    }
                  })
                }
              }
              ],
          adviceData:[],
          adviceSelected:[],

        }
    },
    methods:{
        //robot展示和隐藏
        robotComeOn:function (flag) {
          var single = this.getKey('single');
          var nowDate = this.getKey('nowDate')
          if(single !== null){
            var myDate = new Date()
            if(parseInt(nowDate)+1000*3600 > myDate.getTime()){
              return
            }else{
              this.single = false;
            }
          }
          var that = this;
          let index = null;
          this.showRobot=true;
          let robotImgArry =['img/aPicture/robot/robot1.png','img/aPicture/robot/robot2.png', 'img/aPicture/robot/robot3.png',
            'img/aPicture/robot/robot4.png','img/aPicture/robot/robot5.png','img/aPicture/robot/robot6.png','img/aPicture/robot/roboted.gif'];
          let time = null;
          //展示robot
          if(flag){
            index=0;
            time = setInterval(function(){
              if(index > 5){
                clearInterval(time);
                that.showPoptip=true;
              }
              that.robotImg= that.static+robotImgArry[index];
              index++;
            },100)
            this.waterWarning = true;
            that.riverName = that.riverList[0].riverName;
          }else{

            //隐藏robot
            index =6;
            time = setInterval(function(){
              if(index < 1){
                clearInterval(time);
                that.showRobot=false;
              }
              that.robotImg= that.static+robotImgArry[index];
              index--;
            },100)
          }

        },
      //获取调度建议
      getAdvice:function(){
        var that =this;
        var params={};
        params.url='wtxiqiao/waterresource/wdpdispatchlog/list';
        params.token = this.getKey('token');
        var log_time = new Date(new Date().getTime()-30*60*1000).format("yyyy-MM-dd hh:mm:ss")+'|#|gte';
        var data={"page":1,"pageSize":50,"order":{"log_time":-1},"system_id":parameters.system_id,"searchValue":{"log_time":log_time}}
        params.data=data;
        params.success = function(res) {
          that.$Loading.finish();
          if (res.data.code === '0000') {
            that.adviceData=[];
            var data=res.data.result.result;
            for(var i in data){

              var obj={};

              //console.log(data[i]);
              // obj.scheme_name=data[i]['scheme_name'];
              if(data[i]['is_send']===false){
                obj.log_time=data[i]['log_time'].substring(0,16);
                obj.stn_name=data[i]['stn_name'];
                obj.dispatch_order=data[i]['dispatch_order'];
                obj.action=data[i]['action'];
                obj.task_val=(data[i]['task_val']+'').substring(0,4);
                obj._id=data[i]['_id'];
                obj.scheme_name=data[i]['scheme_name'];
                obj.stn_no=data[i]['stn_no'];
                obj.is_send=data[i]['is_send'];
                obj.flag=data[i]['flag'];
                that.adviceData.push(obj);
              }
            }
          }
          //展示robot
          if(that.adviceData.length>0){
            that.robotComeOn(true);
          }
          if(res.data.code=='0004'){
              clearInterval(robotInterval);
          }
        };
        this.ajaxPost(params);
      },
      //创建水位曲线图
      changeChart:function (event) {
        var that =this;
        var stn_name='';
        this.modalTitle='当前'+event.value+'水位变化图';
        switch (event.value){
          case'官山水位':
            stn_name='华夏窦';
            break;
          case'西江水位':
            stn_name='太平船闸';
            break;
          case'北江水位':
            stn_name='三多引水闸站';
            break;
        }
        var params ={};

        params.token = this.getKey('token');
        params.url = 'wtxiqiao/waterresource/rlddevicerunrec/reference';
        params.data={"searchValue":{"stn_name":stn_name}};
        params.success = function(res){
            var data = res.data.result[0];
            //console.log(res)
            that.createChart(data);
        }
        this.ajaxPost(params);

      },
      //robot同步弹出框图表
      createChart:function(data){
        var alarm= 0;
        //console.log(alarm);
       // console.log(data)
        var dateTime=[];
        var river_in_Data=[];
        var river_out_Data=[];
        var maxLevel;
        var minLevel;
        var first;
        var last;
        var first_time;
        var last_time;
        if(data){
            first = data.first
            last = data.last
            first_time = data.firsttime.substring(11,16)
            last_time = data.lasttime.substring(11,16)
            alarm =data.normal_alarm_level_out;
            data.waterlevel.map((item) =>{
            dateTime.push(item.data_time.substring(11,16));
            river_in_Data.push(item.water_river_in);
            river_out_Data.push(item.water_river_out);
          });
        }
        if(this.getKey('maxLevel') !== null){
          maxLevel = this.getKey('maxLevel')
        }else{
          maxLevel = 4
        }
        if(this.getKey('minLevel') !== null){
          minLevel = this.getKey('minLevel')
        }else{
          minLevel = -2
        }
        let waterChart = echarts.init(document.getElementById("waterChart"));
        let option = {
          color: [
            '#c23531',
            "#1e90ff",
          ],
          title: {
            text: '水位趋势图',
          },
          legend: {
            data:['内江水位','外江水位'],
            padding: 3,
          },
          grid: {
            left: 0,
            right: '6%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateTime,

          },
          yAxis: {
            type: 'value',
            max: maxLevel,
            min: minLevel,
            axisLabel: {
              formatter: '{value} 米'
            }
          },
          /*visualMap: {
            show: false,
            dimension: 0,
            pieces: [{
                gt: 0,
                lte: first
            },{
                gte: first,
                lte: last,
                color: 'red'
            }]
          },*/
          series:[
            {
              name:'内江水位',
              type:'line',
              showSymbol: false,
              data:river_in_Data,
              markLine:{
                data:[
                  {
                    name: '警戒值',
                    yAxis: alarm,
                  }],
                label:{
                    normal:{
                      show:true,
                      formatter:function (params) {
                        return params.name
                      }
                    }
                }
              },
              markArea: {
                data: [ [{
                    name: '最近30分钟',
                    xAxis: first_time
                }, {
                    xAxis: last_time
                }]]
              }
            },
            {
              name:'外江水位',
              type:'line',
              showSymbol: false,
              data:river_out_Data,

            },
          ]
        };
        waterChart.clear();
        waterChart.setOption(option);
      },
      tableCheckBox:function(obj){
        this.adviceSelected=obj;
       // console.log(this.adviceSelected);

      },
      //执行调度建议
      executeAdvice:function (commit){
          if(commit){
            var params = {};
            params.data={};
            var that = this;
            params.data.Log_List = this.adviceSelected;
            params.token = this.getKey('token');
            params.url ='wtxiqiao/waterresource/wdpdispatchlog/send';
            // console.log(params);
            params.success = function (res) {
              that.$Loading.finish();
              that.adviceSelected=[];

            };
            this.ajaxPost(params);
            this.adviceCommit=false;
            this.waterWarning=false;
          }else{
            if(this.adviceSelected.length<=0){
              this.$Notice.warning({
                title: '请选择调度建议！'
              });
              return;
            }
            this.adviceCommit=true;
          }
      }
    },
    watch: {
      'single' : function () {
        if(this.single){
          var nowDate = new Date().getTime();
          this.setKey('single',this.single);
          this.setKey('nowDate',nowDate);
        }else{
          this.removeKey('single');
          this.removeKey('nowDate');
        }
      }
    }
  }

</script>
