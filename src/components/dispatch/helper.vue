<style lang="less">
  @import url("../../../static/less/color.less");
  .orderHelper{
    position: absolute;
    right: 0px;
    top: 440px;
    border: 1px solid @color;
    transition: all 0.8s ease-in-out;

  }
  .helperArrow{
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    left: -40px;
    border: 1px solid #e6e5e6;
    border-radius: 5px 0 0 5px;
    background-size: 100% 100%;
    background-color: white;
    background-image: url(./img/leftReadL.png);
  }
  .helperMenu {
    position:absolute;
    left: -40px;
    margin-top: 46px;
    li {
      padding: 10px;
      width: 40px;
      height: 96px;
      box-sizing: border-box;
      background-color: @navColor;
      border-radius: 5px 0 0 5px;
      cursor: pointer;
      margin-top: 1px;
      color:white;
      line-height: 17px;
      font-size: 14px;
      color: white;
      text-align: center;
    }

  }
  .rightReadNotShow {
    transform: translate3D(100%, 0, 0);
  }

  .leftOrRight {
    background-image: url(./img/leftReadR.png);
  }
.cardBox{
  width: 485px;
  background-color: white;
  font-size: 14px;
  color: rgb(49,49,49);
  .helperHeader{

    height: 40px;
    line-height: 40px;
    background-color: @navColor;
    h3{
      width: 100px;color: white;padding-left: 10px
    }
    .taskAdvice{
      padding-left:10px;
      background-color: rgb(12,116,199);
      width: 380px;
      height: 30px;
      margin-top: 5px;
      line-height: 30px
    }
  }
  .ivu-table table{
    font-size: 14px;
    color: rgb(49,49,49);
  }
  .ivu-table table thead{
    .ivu-table-cell{
      font-weight: bold;
    }

  }
}
</style>






<template>

  <div class="orderHelper" :class="[{rightReadNotShow: !helperOut}]">
    <div  @click="orderHelperMsg">
      <div class="helperArrow" :class="{leftOrRight: helperOut}" @click="helperOut = !helperOut;" ></div>
      <ul class="helperMenu" @click="helperOut = !helperOut;">
        <li>调度助手</li>
      </ul>
    </div>
    <div class="cardBox">
      <div class="helperHeader">
        <h3 style="" class="pull-left">调度助手</h3>
        <div class="pull-left taskAdvice">
          <span style="color:#FFF100">根据当前调度方案建议执行以下操作</span>
            <Button type="primary" size="small" @click="helperSendDetail" style="margin-left: 95px;">执行</Button>
        </div>
      </div>新增
      <div style="padding: 10px">
        <Table border stripe  size="small" :height="340" :width="470" :columns="orderHelperCols" :data="orderHelperData" @on-selection-change="tableCheckBox"></Table>
      </div>
    </div>
    <Modal v-model="helperSendShow" title="发送调度指令">
      <Table border stripe  size="small" :columns="helperSendCols" :data="helperSendData" height="250" ></Table>
      <div slot="footer"><Button type="ghost" @click="helperSendShow=false">取消</Button><Button type="primary" @click="helperSendCommit">发送</Button></div>
    </Modal>
  </div>

</template>
<script>

  export default {
    components:{},
    mounted(){
      var that = this;
      /*setInterval(function () {
        if(!that.helperOut || that.orderHelperData.length <= 0){
          that.orderHelperMsg();
        }
      },5000)*/
    },
    data() {
      return {
        helperOut:false,
        helperSendShow:false,
        helperSelect:[],
        orderHelperCols:[
          {type:'selection', width: 50,align: 'center'},
          //{title:'方案名称',key:'scheme_name',width: 90},
          {title:'时间',key:'log_time',width: 80},
          {title:'调度建议',key:'dispatch_order',width: 230},
          {title:'调度指令',key:'action',width:180},
        ],
        orderHelperData:[],
        helperSendCols:[
          {title:'站名',key:'stn_name',width:100},
          {
            title:'调度内容',
            key:'action',
            width:400,
          },
        ],
        helperSendData:[],
      }
    },
    methods:{
      //获取调度助手table数据
      orderHelperMsg: function () {
        var that =this;
        var params={};
        params.url='wtxiqiao/waterresource/wdpdispatchlog/list';
        params.token = this.getKey('token');
        //?
        var data={"page":1,"pageSize":50,"order":{"log_time":-1},"system_id":parameters.system_id,"searchValue":{}}
        params.data=data;
        params.success = function(res) {
          that.$Loading.finish();
          if (res.data.code === '0000') {
            that.orderHelperData=[];
            var data=res.data.result.result;
            console.log(data);
            for(var i in data){
              //var logObj={};
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
                that.orderHelperData.push(obj);
              }
            }
          }
          //that.helperOut = that.orderHelperData.length<=0?false:true;
        };
        this.ajaxPost(params);
      },
      tableCheckBox:function (obj) {
        this.helperSelect=[];
        this.helperSelect=obj;
        //console.log(obj);

      },
      helperSendDetail:function () {
        this.helperSendData=[];
        this.helperSelect.map((item) =>{
          this.helperSendData.push(item);
        });
        if(this.helperSendData.length<=0){
          this.$Notice.warning({
            title: '请选择调度建议！'
          });
          return;
        }
        this.helperSendShow=true;
      },
      helperSendCommit: function () {
        this.helperSelect=[];
        this.helperSendShow=false;

        var params = {};
        params.data={};
        var that = this;
        params.data.Log_List = this.helperSendData;
        params.token = this.getKey('token');
        params.url ='wtxiqiao/waterresource/wdpdispatchlog/send';
        // console.log(params);
        params.success = function (res) {
          that.$Loading.finish();
          that.helperOut = false;
         // that.$refs.rightRead.isOut = false;
          // console.log(res.data);

        };
        this.ajaxPost(params);

      },
    },

  }
</script>
