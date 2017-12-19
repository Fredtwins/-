<style lang="less">
	@import url("../../../static/less/modal.less");
	@import url("../../../static/less/color.less");
	#aPicture {
    @import url("../../../static/less/scroll.less");
    width: 100%;
    height: 100%;
    min-height: 767px;
    position: relative;
    overflow: hidden;
  }


    .modalSec {
      .content {
        width: 100%;
        height: 100%;
      }

    }
		.mapInfo {
      /*滚动条 start*/
      ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background-color: #f5f8fc;
      }
      /*定义滚动条轨道 内阴影+圆角*/
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background: #fff;
      }
      /*定义滑块 内阴影+圆角*/
      ::-webkit-scrollbar-thumb {
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #dfedff;
      }
      ::-webkit-scrollbar-thumb:hover {
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #c8c8c8;
      }
			width: 720px;
			height: 450px;
			border-radius: 5px;
			background-color: white;
			position: absolute;
			overflow: hidden;
			border: 1px solid @color;
			font-size: 14px;
			z-index: 4;
      position: absolute;
			top: 10px;
			right: 35%;
			display: flex;
			flex-direction: column;
			.mapInfoHead {
				width: 100%;
				height: 40px;
				position: relative;
				color: white;
				background-color: @color;
				.mapInfoTitle {
					width: 100%;
					height: 40px;
					line-height: 40px;
					text-align: center;
				}
				.mapInfoClose {
					width: 40px;
					height: 40px;
					text-align: center;
					line-height: 40px;
					font-size: 24px;
					position: absolute;
					right: 0;
					top: 0;
					cursor: pointer;
				}
				.mapInfoClose:hover {
					color: #444444;
				}
			}
			.mapInfoContent {
				flex: 1;
				overflow-x: hidden;
				overflow-y: auto;
				.mapInfoTop {
					width: 100%;
					height: 304px;
					display: flex;
				}
				.mapInfoBot {
					width: 100%;
					padding: 5px;
          .status{
            p{
              padding: 5px 0px;
              span{
                margin-left: 30px;
              }
            }
          }
				}
			}
      .mapInfoImgContent {
        flex: 1;
        padding: 5px 5px 5px 15px;
        .video{
          width: 100%;
          height: 100%;
          li{
            display: inline-block;
          a{
            color:white;
            display: inline-block;
            background: #58a;
            border-radius: 10px;
            color: white;
            text-align: center;
            width: 110px;
            height: 40px;
            padding: 10px 10px 10px 0;
            margin: 0 5px 20px 0;
            cursor: pointer;
          }
            a:hover{
              background: #58817b;
            }
          }
          .videoClound_btn{
            color:white;
            display: inline-block;
            background: @color;
            border-radius: 6px;
            color: white;
            font-size: 16px;
            text-align: center;
            width: 110px;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
          }

        }

      }
      .mapInfoChartContent {
        flex: 1;
        padding: 5px;
        .mapInfoEchart {
          width: 700px;
          height: 320px;
        }
      }
      .waterQualityInfo{

      }
      .waterQualityChart{
        width: 600px;
        height: 355px;
      }
		}
    /*内河涌样式开始*/
    .waterMapModal {
      user-select: none;
    }

    .waterMap {
      display: flex;
      flex-direction: column;
      iframe {
        flex: 1;
      }
      .ivu-tabs-tab {
        font-size: 12px;
        padding: 5px 4px 4px !important;
      }
      .ivu-tabs-bar {
        margin-bottom: 2px;
      }
      .ivu-form-item {
        margin-bottom: 7px;
      }
    }
  /*内河涌样式结束*/

    .over-title{
      font-family: "Hiragino Sans GB";
      font-size: 10px;
      color: black;
      margin: 32px 0px 0 0;
    }
  .overMsg{
    padding: 0 2px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: rgba(49, 49, 49, 0.7);
    border-radius: 2px;
    font-size: 10px;
    color: #24ffca;
    margin: -28px 0px 0px 30px;
  }
/*水雨情开始*/
  .water_rain {
    width: 330px;
    position: absolute;
    top: 10px;
    left: 65px;
    transition: all .8s ease-in-out;
  }
  .waterRainHeader {
    width: 100%;
    height: 32px;
    background-color: #008cee;
    color: white;
    line-height: 32px;
    font-size: 18px;
    text-align: center;
    position: relative;
    .waterRainClose{
      width: 32px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      font-size: 18px;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
    }
    .waterRainClose:hover{
      color: #444444;
    }
  }
  .waterRainContent {
    width: 100%;
    height: 585px;
    border: 1px solid #008cee;
    background-color: white;
    padding: 0 10px 0 20px;
    position: relative;
    overflow-y: auto;
  }
  .optionTitle {
    border-left: 4px solid #008cee;
    font-size: 14px;
    margin: 10px 0;
    padding-left: 5px;
  }
  .waterRainAlign{
    display:block;
    text-align:center;
    margin:10px auto;
  }

  .msgBox {
    width: 450px;
    height: 420px;
    border: 1px solid #008cee;
    background-color: #fff;
    z-index: 2;
  }
  .msgBoxHeader {
    width: 100%;
    height: 30px;
    font-size: 18px;
    text-align: center;
    color: #fff;
    background-color: #008cee;
    line-height: 30px;
  }

  .msgBoxHeader .closer {
    background-color: transparent;
    cursor: pointer;
    float: right;
    margin-right: 10px;
  }
  .msgBoxContent{
    .ivu-tabs-bar{
      margin-bottom: 0px;
    }
  }
  .tableCustom{
    width:100%;border-collapse: collapse;
    border: none;
  }

  .tableCustom thead>tr>th,.tableCustom tbody>tr>td{
    border: solid #c8c8c8 1px;
    padding:3px 5px;
  }
/*水雨情结束*/
  .legend{
    position: absolute;
    bottom: 10px;
    left: 56px;
    width: 234px;
    padding: 5px 5px;
    color: #313131;
    .LegendTop {
      font-size: 14px;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding:5px ;
      .title {
        padding-right: 10px;
        border-right: 1px solid #ccc;
      }
      .isDown {
        width: 20px;
        height: 9px;
        margin-top: 5px;
        cursor: pointer;
        background-image: url(./img/leadReadModelDown.png);
      }
      .isUp {
        background-image: url(./img/leadReadModelUp.png);
      }
    }
    /*水情图例样式开始*/
    .waterLegend {
      width: 100%;
      border: 1px solid @color;
      background-color: white;
      font-size: 12px;
      .waterLegendBot {
        padding: 8px 0;
        cursor: default;
        overflow: hidden;
        .waterLegendBotLi {
          width: 20%;
          text-align: center;
          img {
            width: 12px;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
          }
          .leadReadModelBotClear {
            vertical-align: top;
          }
        }

      }
    }
    /*水情图例样式结束*/
    /*站点图例样式开始*/
    .stationLegend {
      width: 100%;
      margin-top: 10px;
      width: 100%;
      border: 1px solid @color;
      background-color: white;

      .stationLegendBot{
        .stationLegendLi{
          width: 50%;
          font-size: 12px;
          padding: 2px;
          img {
            vertical-align: middle;
          }
          span {
            display: inline-block;
            text-align: left;
            vertical-align: middle;
          }
        }
      }

    }
    /*站点图例样式结束*/
  }
.videoCloundBox{
  position: absolute;
  top:10px;
  left:20%;
  width: 1000px;
  height: 800px;
  border: 1px solid #40B0FF;
  background: rgba(255,255,255,0.5);
  .videoCloundBox_title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background:rgb(64,176,255);
    color: white;
    font-size: 20px;
    text-align: right;
    padding-right: 20px;
    .close{
      display: inline-block;
      height: 40px;
      width: 40px;
      line-height: 40px;
      cursor: pointer;
    }
    .close:hover{
      color: #444444;
    }
  }
}
.bigBox{
  position: absolute;
  left:0!important;
  top:0!important;
  width: 100%!important;
  height: 885px!important;
}
.bigIframe{
  height: 843px!important;
}
.iframe1{
  width: 100%;
  height: 758px;
}
</style>

<template>
  <div id="aPicture">
    <my-map ref="baseMap"></my-map>
		<left-read ref="leftRead"></left-read>
    <right-read></right-read>
   <!-- <dispatch-helper></dispatch-helper>-->
    <robot ref="robot"></robot>
    <!--水雨情-->
    <div class="water_rain"  v-show="waterRainshow">
      <header class="waterRainHeader">
        <div>{{headTitle}}</div>
        <div class="waterRainClose" @click="waterRainshow=false">X</div>
      </header>
      <section class="waterRainContent">
        <!--实时水情-->
        <div v-if="currView.name=='sssq'">
          <div class="optionTitle">站点分组</div>
          <Select placeholder="站点分组" v-model="sqStationGroup" @on-change="sqStationGroupChange" >
            <Option v-for="item in sqStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
          </Select>

          <div class="optionTitle">当前水位
            <Checkbox style="float:right;" v-model="sssqAutoRefresh" @on-change="sssqRefresh" >自动刷新</Checkbox>
          </div>

          <Table  border  size="small" height="440" width="287" :columns="sssqHead" :data="sssqList" @on-row-click="sssqRowClick" ></Table>

        </div>
        <!--实时涝情-->
        <div v-if="currView.name=='sslq'">
          <div class="optionTitle">站点分组</div>
          <Select placeholder="站点分组" @on-change="lqStationGroupChange" v-model="lqStationGroup">
            <Option v-for="item in lqStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
          </Select>
          <div class="optionTitle">当前积水深度
            <Checkbox style="float:right;" v-model="sslqAutoRefresh" @on-change="sslqRefresh">自动刷新</Checkbox>
          </div>
          <Table size="small" width="287" height="440" border :columns="sslqHead" :data="sslqList" @on-row-click="sslqRowClick"></Table>
        </div>
        <!--实时潮位-->
        <div v-if="currView.name=='sscw'">
          <div class="optionTitle">站点分组</div>
          <Select p0laceholder="站点分组" @on-change="cwStationGroupChange" v-model="cwStationGroup">
            <Option v-for="item in cwStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
          </Select>

          <div class="optionTitle">当前潮位
            <Checkbox style="float:right;" v-model="sscwAutoRefresh" @on-change="sscwRefresh">自动刷新</Checkbox>
          </div>
          <Table size="small" width="287" height="450" border :columns="sscwHead" :data="sscwList" @on-row-click="sscwRowClick"></Table>
        </div>
        <!--实时雨情-->
        <div v-if="currView.name=='ssyq'">
          <div style="font-size: 14px;margin: 10px 0;padding-left: 5px;">区域
            <Select placeholder="区域" v-model="ssyqSelected" style="width: 250px;">
              <Option v-for="item in regionList" :key="item" :value="item.region">{{ item.region }}</Option>
            </Select>
          </div>

          <div class="optionTitle">站点分组</div>
          <Select placeholder="站点分组" v-model="yqStationGroup">
            <Option v-for="item in yqStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
          </Select>
          <div class="optionTitle">数据时间</div>
          <Date-picker type="datetime" v-model="SSYLSDate" placeholder="选择日期和时间" style="width: 135px"></Date-picker>
          &nbsp;至&nbsp;
          <Date-picker type="datetime" v-model="SSYLEDate" placement="bottom-end" placeholder="选择日期和时间" style="width: 135px"></Date-picker>
          <div class="waterRainAlign">
            <Button type="primary" long @click="querySSYQ()">查询</Button>
          </div>
          <div class="optionTitle">雨量范围（单位：mm）</div>
          <div>
            <div>
              <Checkbox style="width:85px;padding: 4px" v-for="item in yqCheckboxs" v-model="item.selected" @on-change="changeSsyqList(item)"><img :src="item.img" style="vertical-align: middle"/>{{item.value}}</Checkbox>
            </div>
          </div>
          <div class="optionTitle">雨量信息
            <Checkbox style="float:right;" v-model="ssyqAutoRefresh" @on-change="ssyqRefresh">自动刷新</Checkbox>
          </div>
          <Table size="small" width="287" height="195" border :columns="ssyqHead" :data="ssyqList" @on-row-click="ssyqRowClick" ></Table>
        </div>


        <div v-if="currView.name=='pump'||currView.name=='gate'||currView.name=='dpump'" style="margin-top: 10px">
          <Table  border  size="small" height="560" width="287" :columns="stationHead" :data="stationList" @on-row-click="stationRowClick"></Table>
        </div>

      </section>
    </div>

    <div class="msgBox" id="msgBox">
      <div class="msgBoxHeader">{{msgBoxHeadTitle}}
        <span class="closer" id="msgBoxCloser">&#10006;</span>
      </div>
      <div class="msgBoxContent">
        <Tabs active-key="name" size="small">
          <Tab-pane :label="tabsTitle[0]" key="name">
           <base-chart :canResize="false" ref="baseChart" style="height:320px"></base-chart>
            <Date-picker placement="top" v-show="currView.name=='sssq'" style="width:200px;margin:0px auto;display: block" type="date" v-model="SQDate" @on-change="SQDateChange" placeholder="选择日期"></Date-picker>
          </Tab-pane>
          <Tab-pane :label="tabsTitle[1]" key="param">
            <div v-html="dataTableHtml" style="overflow-y:auto;height:330px;"></div>
          </Tab-pane>
          <Tab-pane :label="tabsTitle[2]" key="style">
            <div v-html="infoTableHtml" style="overflow-y:auto;height:330px;"></div>
          </Tab-pane>
        </Tabs>
      </div>
    </div>
    <!--水雨情结束-->
<div class="legend">
  <!--水情图例开始-->
  <div class="waterLegend" >
    <header class="LegendTop clear">
      <div class="pull-left title">水情图例</div>
      <div class="pull-right isDown" :class="{isUp: downBol1}" @click="downBol1=!downBol1"></div>
    </header>
    <ul class="waterLegendBot clear" v-show='!downBol1'>
      <li class="pull-left waterLegendBotLi">
        <img src="./img/waterLegendPicture1.png" /><span>涨</span>
      </li>
      <li class="pull-left waterLegendBotLi">
        <img src="./img/waterLegendPicture2.png" /><span>平</span>
      </li>
      <li class="pull-left waterLegendBotLi">
        <img src="./img/waterLegendPicture3.png" /><span>落</span>
      </li>
      <li class="pull-left waterLegendBotLi">
        <img src="./img/waterLegendPicture4.png" /><span>正常</span>
      </li>
      <li class="pull-left waterLegendBotLi">
        <img src="./img/waterLegendPicture5.png" /><span>预警</span>
      </li>
    </ul>
  </div>
  <!--水情图例结束-->
  <!--站点图例开始-->
  <div class="stationLegend">
    <header class="LegendTop clear">
      <div class="pull-left title">站点图例</div>
      <div class="pull-right isDown" :class="{isUp: downBol2}" @click="downBol2=!downBol2"></div>
    </header>
    <ul class="stationLegendBot clear" v-show='!downBol2'>
      <li class="pull-left stationLegendLi">
        <img src="static/img/aPicture/DP-0.gif"/><span>泵站</span>
      </li>
      <li class="pull-left stationLegendLi">
        <img src="static/img/aPicture/DP-1.gif"/><span>泵站运行</span>
      </li>
      <li class="pull-left stationLegendLi">
        <img src="static/img/aPicture/DD-0.gif"/><span>闸站</span>
      </li >
      <li class="pull-left stationLegendLi">
        <img src="static/img/aPicture/DD-1.gif"/><span>闸站运行</span>
      </li >
      <li class="pull-left stationLegendLi">
        <img src="static/img/mapico/waterDirection.gif"/><span>水流方向</span>
      </li>
    </ul>
  </div>
  <!--站点图例结束-->
</div>


    <Modal v-model="$store.state.mapCount.typhoon" title="台风" class="modalSec" width="auto" @on-cancel="weatherModalCancel()">
        <section class="content">
            <iframe src="https://tf.istrongcloud.com/release/index-id.html?id=1260216490&from=groupmessage&isappinstalled=0#route" width="100%" height="99%"></iframe>
        </section>
        <div slot="footer"></div>
    </Modal>
    <Modal v-model="$store.state.mapCount.cloud" title="云图" class="modalSec" width="auto" @on-cancel="weatherModalCancel()">
        <section class="content" >
            <iframe src="https://tf.istrongcloud.com/release/index-id.html?id=1260216490&from=groupmessage&isappinstalled=0#route" width="100%" height="99%"></iframe>
        </section>
        <div slot="footer"></div>
    </Modal>
    <Modal v-model="$store.state.mapCount.radar" title="雷达" class="modalSec" width="auto" @on-cancel="weatherModalCancel()">
        <section class="content">
            <iframe src="https://tf.istrongcloud.com/release/index-id.html?id=1260216490&from=groupmessage&isappinstalled=0#route" width="100%" height="99%"></iframe>
        </section>
        <div slot="footer"></div>
    </Modal>

    <!--内河涌开始-->
    <Modal v-model="$store.state.mapCount.isWater" title="河涌详情" @on-cancel="waterView='water-base';waterTab='water-base'" class="modalSec waterMapModal" width="auto">
      <!--<div slot="header">
                <div class="ivu-modal-header-inner">河涌详情</div>
            </div>-->
      <section class="content waterMap" style="padding: 5px 0;" >
        <Tabs @on-click="waterTabClick" v-model="waterTab" type="card" :animated="false">
          <Tab-pane label="基本信息" name="water-base"></Tab-pane>
          <Tab-pane label="桩端信息" name="water-pile"></Tab-pane>
          <Tab-pane label="排水口信息" name="water-outfall"></Tab-pane>
          <Tab-pane label="水质情况" name="water-quality"></Tab-pane>
          <Tab-pane label="水质趋势图" name="water-picture"></Tab-pane>
          <Tab-pane label="整治方案" name="water-renovation"></Tab-pane>
          <Tab-pane label="河涌概貌" name="water-profile"></Tab-pane>
          <Tab-pane label="建筑物信息" name="water-build"></Tab-pane>
          <Tab-pane label="河长信息" name="water-river"></Tab-pane>
          <Tab-pane label="河涌巡查信息" name="water-patrol"></Tab-pane>
          <Tab-pane label="河涌景观" name="water-scenery"></Tab-pane>
          <Tab-pane label="河涌宣传报道信息" name="water-report"></Tab-pane>
          <Tab-pane label="河涌相关管理公文信息" name="water-document"></Tab-pane>
          <Tab-pane label="模型" name="water-3d"></Tab-pane>
        </Tabs>
        <component v-if="$store.state.mapCount.isWater" class="component" :is="waterView"></component>

      </section>
      <div slot="footer"></div>
    </Modal>
    <!--内河涌结束-->

		<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
			<div v-show="this.$store.state.mapCount.mapInfoShow" class="mapInfo animated">
				  <header class="mapInfoHead">
					    <div class="mapInfoTitle">{{mapInfo.title}}</div>
					    <div @click="mapInfoClose();" class="mapInfoClose">&times;</div>
				  </header>
				  <div class="mapInfoContent" >
              <Tabs @on-click="tabClick">
                  <tab-pane label="水位曲线图">
                      <div style="display: flex">
                          <div class="mapInfoChartContent" v-show="mapInfo.echart">
                              <!--<Icon type="arrow-graph-up-right" size="18"></Icon> 水位-->
                              <div id="mapInfoChart" class="mapInfoEchart" v-show="mapInfo.echart"></div>
                          </div>

                      </div>
                  </tab-pane>
                  <tab-pane label="运行状态">
                      <div class="mapInfoBot">
                          <div class="status">
                              <p>采集时间：&nbsp;&nbsp;{{runStatusInfo.data_time}}</p>
                              <p>外江水位:&nbsp;&nbsp;{{runStatusInfo.water_river_out}}（米）<span>内江水位:&nbsp;&nbsp;{{runStatusInfo.water_river_in}}（米）</span><span>状态：&nbsp;&nbsp;{{runStatusInfo.statu}}</span></p>
                          </div>
                          <table class="mapInformation" style="width: 100%;color: #414e61;border: solid #c8c8c8 1px;font-size:14px;" border><tbody>
                              <tr v-for="item in runStatus">
                                  <td width='25%' style='padding:3px 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>{{item.name}}</td>
                                  <td width='25%' style='padding:3px 5px;'>{{item.value}}</td>
                              </tr></tbody>
                          </table>

                      </div>

                  </tab-pane>
                  <tab-pane label="基本信息" >
                      <div class="mapInfoBot" v-show="ifBase">
                       基本信息
                      <div v-html="mapInfo.table"></div>
                      </div>
                  </tab-pane>
                  <tab-pane label="调度" name="order" >
                      <div style="padding: 5px">
                          <Form  :label-width="80">
                              <Form-item label="站点名称" >
                                  <Input v-model="stationOrder.stn_name" readonly="" style="width: 200px;"></Input>
                              </Form-item>

                              <Form-item label="调度方向" >
                                  <Input v-model="stationOrder.direction" readonly=""  style="width: 200px;"></Input>

                              </Form-item>
                              <Form-item label="选择指令" >
                                  <Select v-model="stationOrder.order_code" @on-change="setOrderContent" placeholder="请选择调度指令" style="width: 200px">
                                      <Option v-for="item in orderList" :value="item.order_code" :key="item.order_name">{{item.order_name}}</Option>
                                  </Select>
                              </Form-item>
                              <Form-item label="调度内容">
                                  <Input v-model="stationOrder.orderContent"  type="textarea" :autosize="{minRows: 4,maxRows: 6}" ></Input>
                              </Form-item>
                              <Form-item>
                                  <Button type="primary" @click="dispathOrderSubmit">发布</Button>
                              </Form-item>
                          </Form>
                      </div>
                  </tab-pane>
                  <tab-pane label="水质情况" name="waterQuality">
                      <div class="pull-left" style="height: 100%">
                          <Menu width="100" active-name="waterInfo" @on-select="waterMenuClick">
                              <Menu-item name="waterInfo">
                              水质情况
                              </Menu-item>
                              <Menu-item name="PH">
                              PH趋势图
                              </Menu-item>
                          </Menu>
                      </div>
                      <div class="pull-left" >
                          <div v-show="menuActive=='waterInfo'" class="waterQualityInfo" >
                              <Table border stripe :width="600" :height="355" size="small" :columns="waterQualityCols" :data="waterQualityData"></Table>
                          </div>
                          <div v-show="menuActive=='PH'" >
                              <div id="waterQualityChart" class="waterQualityChart"></div>
                          </div>
                      </div>
                  </tab-pane>
                  <tab-pane label="视频列表" name="stationVideo">
                      <div class="mapInfoImgContent">
                        <div class="video">
                         <!-- <Row>
                            <Col span="9" >
                                <ul>
                                  <li v-for="item in videoList" @click="changeVideo(item)">
                                    &lt;!&ndash;<a href="/xqSystem/#/home/video" target="_blank">{{item.video_title}}</a>&ndash;&gt;
                                    <a>{{item.video_title}}</a>
                                  </li>
                                </ul>
                                <div v-if="videoList.length<=0">
                                  该站点暂时无视频！
                                </div>
                            </Col>
                            <Col span="15">
                              <div style="padding-left: 5px;">
                                <iframe v-bind:src="videoYunUrl" seamless width="100%" height="330px"></iframe>
                              </div>

                            </Col>
                          </Row>-->
                          <ul>
                            <li v-for="item in videoList" @click="changeVideo(item)">
                              <!--<a href="/xqSystem/#/home/video" target="_blank">{{item.video_title}}</a>-->
                              <a>{{item.video_title}}</a>
                            </li>
                          </ul>
                          <span><img src="static/img/aPicture/right.png"></span>
                          <a @click="openVideoCloundBox" class="videoClound_btn">视频云控台</a>
                          <div v-if="videoList.length<=0">
                            该站点暂时无视频！
                          </div>
                        </div>
                      </div>
                  </tab-pane>
              </Tabs>

				</div>
			</div>
		</transition>
    <div class="videoCloundBox" v-bind:class="{bigBox : big}" v-show="videoCloundShow">
      <header class="videoCloundBox_title">
        <Icon class="close" v-if="!big" @click.native="big = !big" type="android-expand"></Icon>
        <Icon class="close" v-if="big" @click.native="big = !big" type="android-contract"></Icon>
        <span class="close" @click="videoCloundShow=false">X</span>
      </header>
      <iframe v-bind:src="videoYunUrl" v-bind:class="{bigIfrmae : big}" class="iframe1"></iframe>
    </div>
	</div>
</template>

<script>
  let webSocket ='';
  let myMap = null;
  let SSYQLayer = null;
  let SSSQLayer = null;
  let SSLQLayer = null;
  let SSCWLayer= null;
  let circleLayer = null;
  let msgBoxOverlay = null;
  let stationalarm_l1 = 0;
  let stationhis_level = 0;
  let station_no = '';
	let waterloggingRequest_url = "http://183.238.82.216:8080/";
  let msgBoxTitles = {
    head: {
      sssq: '实时水情',
      ssyq: '实时雨情',
      sslq: '实时涝情',
      sscw: '实时潮位'
    },
    tabs: {
      sssq: ['水位过程线', '水位报表', '站点信息'],
      ssyq: ['日雨量', '雨量报表', '站点信息'],
      sslq: ['积水过程线', '积水报表', '站点信息'],
      sscw: ['潮位过程线', '潮位报表', '站点信息']
    }
  };

	import baseMap from './myMap.vue';
	import leftRead from './leftRead.vue';
	import rightRead from './rightRead.vue';
  /*import helper from './helper.vue';*/
  import waterBase from './water/waterBase.vue';
  import waterOutFall from './water/waterOutFall.vue';
  import waterPicture from './water/waterPicture.vue';
  import waterPile from './water/waterPile.vue';
  import waterBuild from './water/waterBuild.vue';
  import waterProfile from './water/waterProfile.vue';
  import waterQuality from './water/waterQuality.vue';
  import waterRenovation from './water/waterRenovation.vue';
  import waterRiver from './water/waterRiver.vue';
  import waterPatrol from './water/waterPatrol.vue';
  import waterScenery from './water/waterScenery.vue';
  import waterReport from './water/waterReport.vue';
  import waterDocument from './water/waterDocument.vue';
  import water3d from './water/water3d.vue';
  import baseChart from '../public/BaseChart';
  import robot from './robot.vue'
	export default {
		components: {

      'robot':robot,
      'my-map':baseMap,
      leftRead,
      rightRead,
      'base-chart':baseChart,
      /*'dispatch-helper':helper,*/
      'water-base': waterBase,
      'water-pile': waterPile,//桩端信息
      'water-picture': waterPicture,
      'water-build': waterBuild,
      'water-outfall': waterOutFall,
      'water-profile': waterProfile,
      'water-quality': waterQuality,
      'water-renovation': waterRenovation,
      'water-river': waterRiver,
      'water-patrol': waterPatrol,
      'water-scenery': waterScenery,
      'water-report': waterReport,
      'water-document': waterDocument,
      'water-3d': water3d
		},
		data() {
			return {

        downBol1: false,
        downBol2:false,
        mapTypeActive: 1,
        waterNetTitle: '',
        big: false,
        ifBase: false,
        runStatus: [],
        runStatusInfo:{
            statu: '关',
        },
        stationData:'',
        waterView: 'water-base',
        waterTab: 'water-base',
        stationOrder: {
          stn_name: '',
          order_code: '',
          orderContent: '',
          direction: '',
          order_name:'',
          order_type:'',
        },
				mapInfo: {
					title: '',
					img: '',
					time: '',
					echart: false,
					table: '',
				},
        waterQualityCols:[
          {title:'站点名称',key:'stn_name',width:100},
          {title:'氨氮含量',key:'an_data',width:80},
          {title:'PH值',key:'ph_data',width:60},{title:'溶解氧',key:'do_data',width:80},
          {title:'高锰酸盐指数',key:'pi_data',width:80},{title:'水质情况',key:'qulity_level',width:100},
          {title:'所属河涌',key:'striv_name',width:100},{title:'所属支涌',key:'route_name',width:100},
          {title:'数据来源',key:'datasource',width:100},{title:'数据时间',key:'data_time',width:100},
        ],
        waterQualityData:[],
        orderList:[],
        menuActive: 'waterInfo',
        waterQuality:{},
        /*水雨情开始*/
        isFistLoad: true,
        waterRainshow: false,
        headTitle: '',
        sssqHead: [
          {
            title: '站点名称',
            key: 'stn_name',
            width: 80
          },
          {
            title: '数据时间',
            key: 'data_time',
            width: 79
          },
          {
            title: '水位(米)',
            key: 'water_level',
            width: 40
          },
          {
            title: '超警标志',
            key: 'trend_flag',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  src: 'static/img/waterRain/' + params.row.trend_flag + '.png'
                }
              });
            },
            width: 40
          }, {
            title: '警戒水位(米)',
            key: 'alarm_l1',
            width: 40
          }],
        sssqList: [],
        ssyqHead: [
          {
            title: '站点名称',
            key: 'stn_name',
            width: 185
          },
          {
            title: '雨量(mm)',
            key: 'rainfull',
            width: 100
          }],
        yqData:[],
        yqCheckboxs:[
          {value:'0-10',rain_level:'level1',img:this.static + 'img/waterRain/level1.png',selected:false},{value:'10-25',rain_level:'level2',img:this.static + 'img/waterRain/level2.png',selected:false},
          {value:'25-50',rain_level:'level3',img:this.static + 'img/waterRain/level3.png',selected:false},{value:'50-100',rain_level:'level4',img:this.static + 'img/waterRain/level4.png',selected:false},
          {value:'100-200',rain_level:'level5',img:this.static + 'img/waterRain/level5.png',selected:false},{value:'200以上',rain_level:'level6',img:this.static + 'img/waterRain/level6.png',selected:false}],
        ssyqList: [],
        sslqHead: [
          {
            title: '站点名称',
            key: 'stn_name',
            width: 130
          },
          {
            title: '数据时间',
            key: 'data_time',
            width: 80
          },
          {
            title: '水位(米)',
            key: 'water_level',
            width: 75
          }],
        sslqList: [],
        sscwHead: [
          {
            title: '站点名称',
            key: 'stn_name',
            width: 130
          },
          {
            title: '数据时间',
            key: 'data_time',
            width: 80
          },
          {
            title: '潮位(米)',
            key: 'ms_tide',
            width: 75
          }],
        sscwList: [],

        stationHead:[
          {
            title:'站名',
            key:'stn_name',
            width:124
          },
          {
            title:'内江水位(m)',
            key:'water_river_in',
            width:80
          },
          {
            title:'外江水位(m)',
            key:'water_river_out',
            width:80
          },
        ],
        stationList:[],

        currView: {
          name: 'sssq',
          righTitle: '实时水情',
          //mapExample: mapExample.waterExample
        },
        sssqAutoRefresh: false,
        sqStationGroup: '',
        sqStationGroupList: [],
        sslqAutoRefresh: false,
        lqStationGroup: '',
        lqStationGroupList: [],
        ssyqAutoRefresh: false,
        yqStationGroup: '',
        yqStationGroupList: [],
        sscwAutoRefresh: false,
        cwStationGroup: '',
        cwStationGroupList: [],
        regionList: [],
        ssyqSelected: '',
        SSYLSDate: this.$AddDays(-1, 8, 0),
        SSYLEDate: this.$AddDays(0, 8, 0),

        msgBoxHeadTitle: msgBoxTitles.head.sssq,
        tabsTitle: msgBoxTitles.tabs.sssq,
        SQDate: this.$AddDays(0, 0, 0),
        dataTableHtml: '',
        infoTableHtml: '',
        /*水雨情结束*/
        videoList:[],
        videoYunUrl:'',
        videoCloundShow:false,

			}
		},
		created() {
			this.$bus.on('showFeatureMsg', this.showFeatureMsg);
      this.$bus.on('pointOverlayShowMsg', this.pointOverlayShowMsg);
      this.$bus.on('showFeatureLayer', this.showFeatureLayer);
      this.$bus.on('sendSocketMsg', this.sendSocketMsg);
      /*水雨情*/
      this.$bus.on('syqShow', this.currViewShow);
      this.$bus.on('ssyqRowClick', this.ssyqRowClick);
      this.$bus.on('sssqMsgBox',this.sssqMsgBox);
      this.$bus.on('setStationList',this.setStationList);
		},
		beforeDestroy() {
			this.$bus.off('showFeatureMsg', this.showFeatureMsg);
      this.$bus.off('pointOverlayShowDetail', this.pointOverlayShowDetail);
      this.$bus.off('showFeatureLayer', this.showFeatureLayer);
      this.$bus.off('syqShow', this.currViewShow);
      this.$bus.off('ssyqRowClick', this.ssyqRowClick);
      this.$bus.off('sssqMsgBox',this.sssqMsgBox);
      this.$bus.off('setStationList',this.setStationList);
      this.$bus.off('sendSocketMsg', this.sendSocketMsg);
		},
		mounted() {
			this.$nextTick(() => {
				this.initInteract();
        myMap = this.$refs.baseMap.getBasemap();
        SSYQLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          name: 'ssyq',
          style: function (feature) {
            return feature.get('style');
          }
        });
        myMap.addLayer(SSYQLayer);
        SSSQLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          name : 'sssq',
          style: function(feature){
              return feature.get('style');
          }
        });
        myMap.addLayer(SSSQLayer);

        SSLQLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          name: 'sslq',
          style: function (feature) {
            return feature.get('style');
          }
        });
        myMap.addLayer(SSLQLayer);
        SSCWLayer = new ol.layer.Vector({
          source: new ol.source.Vector(),
          name: 'sscw',
          style: function(feature){
              return feature.get('style');
          }
        });
        myMap.addLayer(SSCWLayer);
        circleLayer = new ol.layer.Vector({
          source:new ol.source.Vector(),
          name:'circle',
        });
        myMap.addLayer(circleLayer);

        var msgBoxCloser = document.getElementById('msgBoxCloser');
        msgBoxOverlay = new ol.Overlay({
          element: document.getElementById('msgBox'),
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          },
          positioning: 'top-left',
          position: undefined
        });
        msgBoxCloser.onclick = function () {
          msgBoxOverlay.setPosition(undefined);
        };
        myMap.addOverlay(msgBoxOverlay);

        webSocket =new WebSocket(webSocketUrl);
        webSocket.onerror = function(event){
        }
        webSocket.onopen = function(event) {

        };
        webSocket.onmessage = function(event){
            console.log(event.data);
        };

      })
		},
		methods: {

      sendSocketMsg: function (data) {
        webSocket.send(data);

      },
      waterTabClick: function(name) {
        this.waterView = name;
      },
			changMapType(typeIndex, baseLayerShow, heightLayerShow, panoramaLayerShow) {
				if(typeIndex != this.mapTypeActive) {
					this.mapTypeActive = typeIndex;
					this.$bus.emit('changeMapLayer', baseLayerShow, heightLayerShow, panoramaLayerShow);
				}
			},
      showFeatureLayer:function (layer,isShow) {
          switch (layer){
            case 'sssq':
                layer = SSSQLayer;
                break;
            case 'sslq':
              layer = SSLQLayer;
              break;
            case 'sscw':
              layer = SSCWLayer;
              break;
            case 'ssyq':
              layer = SSYQLayer;
              break;
          }
        if(!isShow){
          msgBoxOverlay.setPosition(undefined);
        }
        this.$showMapLayer(layer,isShow);
      },

			dateNow() {
				return new Date().format("yyyy-MM-dd");
			},
//自由拖动站点信息弹出框
			initInteract() {
				let dropOption = {
					restrict: {
						restriction: "parent",
						elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
					},
					onmove: function(event) {
						var target = event.target,
							x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
							y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
						target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
						target.setAttribute('data-x', x);
						target.setAttribute('data-y', y);
					}
				};
				interact('.mapInfo').draggable(dropOption);
        interact('.videoCloundBox').draggable(dropOption);

			},
      mapInfoClose() {
        this.$store.state.mapCount.mapInfoShow = false;
      },
//站点详细信息
      pointOverlayShowMsg(obj){
        let that =this;
       this.stationData=obj.content;
        this.mapInfo = {
          title: '',
          img: '',
          time: '',
          echart: false,
          table: ''
        };
        if(obj.layer == 'waterNetLayer'){
          this.$store.state.mapCount.isWater = true;
          //this.waterNetTitle = obj.name;
          return;
        }
        let column = '';
			    switch (obj.layer) {
            case 'gateLayer': //水闸
              column = ['站点编号|state_no','站点名称|stn_name','站点类型|stn_type','设计流量（m3/s)|flow',
                '所属街镇|town', '所属河流|river', '片区|area_name','堤围桩号|state_no',
                '内江超限水位|inner_limit', '外江超限水位|outer_limit', '历史最高水位水位(米)|hightest_depth', '历史最高水位发生时间(年、月、日)|hightest_time',
                '闸门数|gate_count','建设(重建)(加固)时间|rebuild_time', '经度|lng', '纬度|lat'];
              var showInfo=obj.content;
              showInfo.stn_no=obj.content.gate.stn_no;
              showInfo.stn_type=obj.content.gate.stn_type;
              showInfo.gate_count=obj.content.gate.gate_count;
              showInfo.inner_limit = obj.content.gate.inner_limit;
              showInfo.outer_limit = obj.content.gate.outer_limit;
              this.stationOrder.stn_name = obj.content.stn_name;
              this.stationOrder.direction=obj.content.gate_function;
              this.ifBase = true;
              this.mapInfo.table = this.mapCreateInfo(showInfo, column);
              this.mapInfo.title = obj.content.stn_name;

              this.createRunStatus(obj.content,obj.layer);

              //创建水位曲线图
              this.ajaxPost({
                url: '/wtxiqiao/waterresource/rlddevicerunrec/waterlevel',
                token: this.getKey("token"),
                data: {"orders":"datetime","system_id":parameters.system_id,"stn_name":obj.content.stn_name},
                success: function(res) {
                  that.$Loading.finish();
                  that.CreateWaterLevlEchart({
                    data: res.data.result,
                    obj:obj,
                    chartId: 'mapInfoChart'
                  });
                }
              })


             break;

            case 'pumpLayer': //泵站
            column = ['站点编号|station_no','站点名称|stn_name', '站点类型|Stion_type','功能|pump_function',
              '所属街镇|town', '所属河流|river', '片区|area_name', '堤围桩号|state_no',
              '机组台数|pump_count','总装机容量（kw）|installed_capacity', '水泵口径（单台）|pump_caliber','总开机流量|total_flow',
              '内江超限水位|inner_limit', '外江超限水位|outer_limit', '排水-受益面积(亩)|drain_area', '灌溉-受益面积(亩)|irrigation _area',
              '建设(重建)(加固)时间|rebuild_time', '经度|lng', '纬度|lat'];
              var showInfo=obj.content;
              showInfo.inner_limit = obj.content.pump.inner_limit;
              showInfo.outer_limit = obj.content.pump.outer_limit;
              this.stationOrder.stn_name = obj.content.stn_name;
              this.stationOrder.direction=obj.content.pump_function;
              this.ifBase = true;
              this.mapInfo.table = this.mapCreateInfo(showInfo, column);
              this.mapInfo.title = obj.content.stn_name;

              this.createRunStatus(obj.content,obj.layer);
             // this.mapImgHtml = this.mapCreateImg("http://pic.pp3.cn/uploads/201412/2014123114.jpg");
              //获取水位数据，创建水位曲线
              this.ajaxPost({
                url: '/wtxiqiao/waterresource/rlddevicerunrec/waterlevel',
                token: this.getKey("token"),
                data: {"orders":"datetime","system_id":parameters.system_id,"stn_name":obj.content.stn_name},
                success: function(res) {
                  that.$Loading.finish();
                  that.CreateWaterLevlEchart({
                    data: res.data.result,
                    obj:obj,
                    chartId: 'mapInfoChart'
                  });
                }
              })

            break;
            case 'dpumpLayer': //电排站
              column = ['站点编号|station_no','站点名称|stn_name', '站点类型|Stion_type','功能|pump_function',
                '所属街镇|town', '所属河流|river', '片区|area_name', '堤围桩号|state_no',
                '机组台数|pump_count','总装机容量（kw）|installed_capacity', '水泵口径（单台）|pump_caliber','总开机流量|total_flow',
                '内江超限水位|inner_limit', '外江超限水位|outer_limit', '排水-受益面积(亩)|drain_area', '灌溉-受益面积(亩)|irrigation _area',
                '建设(重建)(加固)时间|rebuild_time', '经度|lng', '纬度|lat'];
              var showInfo=obj.content;
              showInfo.inner_limit = obj.content.pump.inner_limit;
              showInfo.outer_limit = obj.content.pump.outer_limit;
              this.ifBase = true;
              this.mapInfo.table = this.mapCreateInfo(showInfo, column);
              this.mapInfo.title = obj.content.stn_name;
              this.stationOrder.stn_name = obj.content.stn_name;
              this.stationOrder.direction=obj.content.pump_function;

              this.createRunStatus(obj.content,obj.layer);
              //this.mapImgHtml = this.mapCreateImg("http://pic.pp3.cn/uploads/201412/2014123114.jpg");
              //获取水位数据，创建水位曲线
              this.ajaxPost({
                  url: '/wtxiqiao/waterresource/rlddevicerunrec/waterlevel',
                  token: this.getKey("token"),
                  data: {"orders":"datetime","system_id":parameters.system_id,"stn_name":obj.content.stn_name},
                  success: function(res) {
                    that.$Loading.finish();
                    that.CreateWaterLevlEchart({
                      data: res.data.result,
                      obj:obj,
                      chartId: 'mapInfoChart'
                    });
                  }
              })

              break;
          }
        this.getWaterQualityInfo();
        this.waterChartCreat();
        this.$store.state.mapCount.mapInfoShow = true;
        //获取视频列表
        this.getVideoList(obj.content.stn_name);
      },
      createRunStatus(data,layerName) {
        this.runStatus= [];
          switch (layerName) {
            case 'gateLayer':
              if(data['switch']==0){
                  this.runStatusInfo={};
                  this.runStatusInfo.statu="关";
                for(var i=0;i<6;i++){
                  var name=(i+1)+"号门开度";
                  this.runStatus.push({"name":name,"value":0});
                }
                return;
              }
              this.runStatusInfo.statu=data['gate']['gatestatus'];
              this.runStatusInfo.data_time=data['gate']['data_time'];
              this.runStatusInfo.water_river_out=data['gate']['water_river_out'];
              this.runStatusInfo.water_river_in=data['gate']['water_river_in'];
              for(var i=0;i<6;i++){
                var name=(i+1)+"号门开度";
                var value='';
                if(data['gate']["gate"+(i+1)+"_kaidu"]==undefined){
                  value=0;
                }else {
                  value=data['gate']["gate"+(i+1)+"_kaidu"];
                }

                this.runStatus.push({"name":name,"value":value});
              }
              break;
            case 'pumpLayer':


              if(data['switch']==0){
                this.runStatusInfo={};
                this.runStatusInfo.statu="关";
                for(var i=0;i<12;i++) {
                  var name = (i + 1) + "号泵电流";
                  this.runStatus.push({"name":name,"value":0});
                }
                return;
              }

              this.runStatusInfo.statu=data['pump']['pumpstatus'];
              this.runStatusInfo.data_time=data['pump']['data_time'];
              this.runStatusInfo.water_river_out=data['pump']['water_river_out'];
              this.runStatusInfo.water_river_in=data['pump']['water_river_in'];
              for(var i=0;i<12;i++) {
                var name = (i + 1) + "号泵电流";
                var value ='';
                if(data['pump']["pump"+(i+1)+"_current"]==undefined){
                  value =0;
                }else {
                  value = data['pump']["pump" + (i + 1) + "_current"];
                }
                this.runStatus.push({"name":name,"value":value});
              }

              break;
            case 'dpumpLayer':
              if(data['switch']==0){
                this.runStatusInfo={};
                this.runStatusInfo.statu="关";
                for(var i=0;i<12;i++) {
                  var name = (i + 1) + "号泵电流";
                  this.runStatus.push({"name":name,"value":0});
                }
                return;
              }

              this.runStatusInfo.statu=data['pump']['pumpstatus'];
              this.runStatusInfo.data_time=data['pump']['data_time'];
              this.runStatusInfo.water_river_out=data['pump']['water_river_out'];
              this.runStatusInfo.water_river_in=data['pump']['water_river_in'];
              for(var i=0;i<12;i++) {
                var name = (i + 1) + "号泵电流";
                var value ='';
                if(data['pump']["pump"+(i+1)+"_current"]==undefined){
                  value =0;
                }else {
                  value = data['pump']["pump" + (i + 1) + "_current"];
                }
                this.runStatus.push({"name":name,"value":value});
              }

              break;
          }
      },
			mapCreateInfo(content, column) {
				let str = '<table class="mapInformation" style="width: 100%;color: #414e61;border: solid #c8c8c8 1px;font-size:14px;" border><tbody>';
				if(content) {
					column.map((item, index) => {
						let columnValue = item.split("|");
						if(index % 2 == 0) {
							str += "<tr><td width='25%' style='padding:3px 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>" + columnValue[0] +
								"</td><td width='25%' style='padding:3px 5px;'>" +
								(content[columnValue[1]] == '' || content[columnValue[1]] == null ? '--' : content[columnValue[1]]) +
								"</td>";
						} else {
							str += "<td width='25%' style='padding:3px 5px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>" + columnValue[0] +
								"</td><td width='25%' style='padding:3px 5px;'>" +
								(content[columnValue[1]] == '' || content[columnValue[1]] == null ? '--' : content[columnValue[1]]) +
								"</td></tr>";
						}
					})
				} else {
					str = '<tr><td colspan="2">暂时没有数据！</td>';
				}
				str += '</tbody></table>';
				return str;
			},


//站点水位曲线图
      CreateWaterLevlEchart: function (obj) {
         // console.log(obj.data);
        let option = {};
        this.mapInfo.echart = true;
        let myChart = echarts.init(document.getElementById(obj.chartId));

        var todayinnerData = [];
        var todayouterData = [];
        var yesterdayinnerData = [];
        var yesterdayouterData = [];
        var xDatas = [];

        var currentDate=new Date();
        var todayData=[];
        var yesterdayData=[];
        var todayDate='';
        var yesterdayDate ='';
        var maxLevel;
        var minLevel;

        if(obj.obj.content.enable==1) {
          if (obj.data['today'] == undefined || obj.data['today'] == "" || obj.data['today'].length == 0) {
            todayData = [];
            todayDate = currentDate.getMonth() + 1 + "月" + currentDate.getDate() + "日";
          } else {
            todayData = obj.data['today'];
            todayDate = todayData[0].data_time.substring(5, 7) + "月" + todayData[0].data_time.substring(8, 10) + "日";
          }
          if (obj.data['yesterday'] == undefined || obj.data['yesterday'] == "" || obj.data['yesterday'].length == 0) {
            yesterdayData = [];
            yesterdayDate = currentDate.getMonth() + 1 + "月" + (currentDate.getDate() - 1) + "日";
          } else {
            yesterdayData = obj.data['yesterday'];
            yesterdayDate = yesterdayData[0].data_time.substring(5, 7) + "月" + yesterdayData[0].data_time.substring(8, 10) + "日";

          }

          for (var i in todayData) {
            todayinnerData.push(todayData[i].water_river_in);
            todayouterData.push(todayData[i].water_river_out);
            //xDatas.push(todayData[i].data_time.substring(11, 16));
          }
          for (var i in yesterdayData) {
            yesterdayinnerData.push(yesterdayData[i].water_river_in);
            yesterdayouterData.push(yesterdayData[i].water_river_out);
            var time=yesterdayData[i].data_time.substring(11, 16)
            xDatas.push(time);

          }
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

            option = {
              color: [
                '#c23531',
                "#1e90ff",
                "#ff7f10",
                "#00fa9a",
                '#749f83',
                '#61a0a8',
                '#d48265',
                '#91c7ae',
              ],
              title: {
                text: '24小时水位趋势',
              },
              legend: {
                data:[todayDate+'内江',todayDate+'外江',yesterdayDate+'内江',yesterdayDate+'外江'],
                right: 30,
                padding: 3,
              },
              grid: {
                left: 0,
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              tooltip: {
                trigger: 'axis'
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xDatas,
                axisLabel:{interval:23}

              },
              yAxis: {
                type: 'value',
                min: minLevel,
                max: maxLevel,
                axisLabel: {
                  formatter: '{value} 米'
                }
              },
              series: [{
                name: todayDate+'内江',
                type: 'line',
                showSymbol: false,

                data: todayinnerData,

              }, {
                name: todayDate+'外江',
                type: 'line',
                showSymbol: false,
                data: todayouterData,

              },{
                name: yesterdayDate+'内江',
                type: 'line',
                showSymbol: false,
                data: yesterdayinnerData,

              }, {
                name: yesterdayDate+'外江',
                type: 'line',
                showSymbol: false,
                data: yesterdayouterData,

              }]
            };
        myChart.clear();
        myChart.setOption(option);

      },

      tabClick:function (name) {
        if(name==='order'){
            this.getOrderTemplate();
        }
       /* if(name === 'waterQuality'){
            this.getWaterQualityInfo();
            this.waterChartCreat();
        }*/

      },
      getOrderTemplate: function() {
        var that = this;
        var params = {};
        params.data = {};
        params.data.system_id = parameters.system_id;
        params.data.page = 1;
        params.data.pageSize = 50;
        params.data.searchValue = {};
        params.token = this.getKey('token');
        params.url = 'wtxiqiao/waterresource/wdpordertemplate/list';
        params.success = function(res) {
          that.$Loading.finish();
          that.orderList=res.data.result.result;
        }
        this.ajaxPost(params);
      },
      setOrderContent: function (event) {

        this.orderList.map((item,index) => {
            if(item.order_code==event){
                this.stationOrder.orderContent=item.content_template;
                this.stationOrder.order_name=item.order_name;
                this.stationOrder.order_type=item.order_type;
            }
        })
      },
      dispathOrderSubmit: function () {
        var that = this;
        if(this.stationOrder.order_code==""){
            that.$Notice.warning({
            title: '请选择指令'
          });
          return;
        }

        var params = {};
        var station_name=[];
        station_name.push(this.stationOrder.stn_name);
        params.data = {};
        params.data.system_id = parameters.system_id;
        params.token = this.getKey('token');
        params.data.order_code = this.stationOrder.order_code ;
        params.data.order_content = this.stationOrder.orderContent;
        params.data.order_name=this.stationOrder.order_name;
        params.data.order_type=this.stationOrder.order_type;
        params.data.station_name = station_name;
        params.url = 'wtxiqiao/waterresource/wdpdispatchrec/new';
        params.success = function(res) {
          that.$Loading.finish();
          if (res.data.code === '0000') {
            that.$Message.success('添加成功');
            if(that.stationOrder.order_name==='关闸'||that.stationOrder.order_name==='关泵'){

              //that.$refs.leftRead.loadreadContent[0][3].selected=false;
            }else{
             // that.$refs.leftRead.loadreadContent[0][3].selected=true;
            }
            //刷新地图
            //that.$refs.leftRead.refreshPointOverLayer();

          } else {
            that.$Message.error('添加失败' + res.data.message);
          }
         //console.log(res);
        }
        this.ajaxPost(params);
      },
      waterMenuClick: function(name) {
        this.menuActive = name;
      },
      //站点水质
      getWaterQualityInfo:function () {
          var that = this;
          var params = {};
          params.token = this.getKey('token');
          //params.url = 'wtxiqiao/waterresource/rtlenvwaterqulity/list';
          params.url = 'wtxiqiao/waterresource/rtlenvwaterqulity/list';
          params.data = {"page":1,"pageSize":50,"order":{"data_time":-1},"system_id":parameters.system_id,"searchValue":{"stn_name":this.mapInfo.title}};
          params.success = function (res) {
            that.$Loading.finish();
              if(res.data.code ==='0000'){
                  that.waterQualityData = [];
                  var data = res.data.result.result;
                  console.log(data)
                  data.map((item) => {
                      var obj = item;
                      obj.ph_data = item.data.ph_data;
                      obj.do_data = item.data.do_data;
                      obj.an_data = item.data.an_data+ ' mg/L';
                      obj.pi_data = item.data.pi_data;
                    that.waterQualityData.push(obj);

                  })
              }

          };
          this.ajaxPost(params);

      },
      //站点水质PH趋势图
      waterChartCreat:function () {
          let waterChart = echarts.init(document.getElementById('waterQualityChart'));
          let option = {};
          option = {
            title:{
              text:'PH值趋势图',
            },
            grid:{},
            tooltip:{
              trigger: 'axis',
            },
            xAxis:{
              type: 'category',
              boundaryGap: false,
//              data: ['8-12','8-13','8-14','8-15','8-16'],
              data:[]
            },
            yAxis:{
              type: 'value',
            },
            series:[
              {
                name:'ph值',
                type:'line',
//                data:[7.4,7.3,7.2,7.4,7.3],
                data:[]
              }
            ]
        };
          waterChart.setOption(option);
      },

      /*水雨情*/
      setMymap: function(data) {
        myMap = data;
      },
      initialWaterRain: function(){
        if(this.isFistLoad){
          this.isFistLoad = false;
          this.getStationGroup({searchValue: {group_type: '水情'}}, 'sssq');
          this.getStationGroup({searchValue: {group_type: '雨情'}}, 'ssyq');
          this.getStationGroup({searchValue: {group_type: '内涝'}}, 'sslq');
          this.getStationGroup({searchValue: {group_type: '潮位'}}, 'sscw');

          var that = this;
          this.ajaxPost({
            url: 'wtxiqiao/base/hydrology/region/list',
            data: {},
            token: this.getKey('token'),
            success: (result) => {
              if (result.data.code === '0000') {
                this.regionList = result.data.result.result;

                if (this.regionList.length > 0) {
                  this.ssyqSelected = this.regionList[0].region;
                }
              } else {
                that.$Message.error(result.data.message);
              }
            }
          });
        }
      },
      getStationGroup: function (searchParams, pType) {
        var that = this;
        var params={};
        params.url='wtxiqiao/base/hydrology/station_group/list';
        params.data = searchParams;
        params.token=this.getKey('token');
        params.success= function (result) {
          that.$Loading.finish();
          // console.log(result.data.result.result);
          if (result.data.code === '0000') {
            if (pType == 'sssq') {
              that.sqStationGroupList = result.data.result.result;

              if (that.sqStationGroupList.length > 0) {
                that.sqStationGroup = that.sqStationGroupList[0].stn_group_name;
              }
            } else if (pType == 'sslq') {
              that.lqStationGroupList = result.data.result.result;
              if (that.lqStationGroupList.length > 0) {
                that.lqStationGroup = that.lqStationGroupList[0].stn_group_name;
              }
            } else if (pType == 'sscw') {
              that.cwStationGroupList = result.data.result.result;
              if (that.cwStationGroupList.length > 0) {
                that.cwStationGroup = that.cwStationGroupList[0].stn_group_name;
              }
            } else if (pType == 'ssyq') {
              that.yqStationGroupList = result.data.result.result;
              if (that.yqStationGroupList.length > 0) {
                that.yqStationGroup = that.yqStationGroupList[0].stn_group_name;
              }
            }
          } else {
            that.$Message.error(result.data.message);
          }
        };
        this.ajaxPost(params);
      },
      sssqRefresh: function () {
        var that = this;
        if (this.sssqAutoRefresh && this.sqStationGroup) {
          var params = {};
          params.token = this.getKey('token');
          params.url = 'wtxiqiao/realdata/water/waterlevel/getbygroup';
          params.data = { searchValue: { stn_group_name: this.sqStationGroup }, order: { water_level: -1 } };
          params.success = (result) => {
            that.$Loading.finish();
            if (result.data.code == '0000') {
              that.sssqList = result.data.result.result;
              that.changeLayerFeature(SSSQLayer, result.data.result.result, 'trend_flag');
              setTimeout(that.sssqRefresh, 10000);
            } else {
              that.$Message.error('请先选择区域');
            }
          };
          this.ajaxPost(params);

        }
      },
      sslqRefresh: function () {
        var that = this;
        if (this.sslqAutoRefresh && this.lqStationGroup) {

          var params = {};
          params.token = this.getKey('token');
          params.url = 'wtxiqiao/realdata/water/waterlevel/getbygroup';
          params.data = { searchValue: { stn_group_name: this.lqStationGroup }, order: { water_level: -1 } };
          params.success = (result) => {
            that.$Loading.finish();
            if (result.data.code == '0000') {
              that.sslqList = result.data.result.result;
              that.changeLayerFeature(SSLQLayer, result.result.result, 'trend_flag');
              setTimeout(that.sslqRefresh, 10000);
            } else {
              that.$Message.error('请先选择区域');
            }
          };
          this.ajaxPost(params);
        }
      },
      sscwRefresh: function () {
        var that = this;
        if (this.sscwAutoRefresh && this.cwStationGroup) {

          var params = {};
          params.token = this.getKey('token');
          params.url = 'wtxiqiao/realdata/hydrology/tide/getbygroup';
          params.data = { searchValue: { stn_group_name: this.cwStationGroup }, order: { ms_tide: -1 } };
          params.success = (result) => {
            that.$Loading.finish();
            if (result.data.code == '0000') {
              this.sscwList = result.data.result.result;
              that.changeLayerFeature(SSCWLayer, result.data.result.result, 'trend_flag');
              setTimeout(that.sscwRefresh, 10000);
            } else {
              that.$Message.error(result.message);
            }
          };
          this.ajaxPost(params);
        }

      },
      //实时雨情查询
      querySSYQ: function () {
        var that = this;
        if (this.ssyqSelected) {
          var params = {};
          params.token = this.getKey('token');
          //params.url = 'wtxiqiao/realdata/meteo/rain/statis';
          params.url = 'wtxiqiao/realdata/meteo/rain/statisgroup';
          params.data = { order: { rainfull: -1 }, searchValue: { stn_group_name: this.yqStationGroup, region: this.ssyqSelected + this.$searchSeparator + 'like', data_time: this.SSYLSDate.format('yyyy-MM-dd hh:mm:ss') + this.$searchSeparator + this.SSYLEDate.format('yyyy-MM-dd hh:mm:ss'), data_interval: 'H1' } };
          //console.log(params.data);
          params.success = (result) => {
            that.$Loading.finish();

            if (result.data.code == '0000') {
              that.yqData = result.data.result;

              that.yqCheckboxs[1].selected = true;
              that.ssyqList = that.yqData.level2;
              that.changeLayerFeature(SSYQLayer,that.ssyqList,'rain_level');
              //this.changeLayerFeature(SSYQLayer, result.result.result, 'rain_level', 'stn_name');
            } else {
              that.$Message.error(result.data.message);
            }
          };
          this.ajaxPost(params);

        } else {
          that.$Message.error('请先选择区域');
        }
      },
      ssyqRefresh: function () {
        var that = this;
        if (this.ssyqAutoRefresh && this.ssyqSelected) {
          var params = {};
          params.token = this.getKey('token');
          params.url = 'wtxiqiao/realdata/meteo/rain/statis';
          params.data = { order: { rainfull: -1 }, searchValue: { region: this.ssyqSelected + this.$searchSeparator + 'like', data_time: this.SSYLSDate.format('yyyy-MM-dd hh:mm:ss') + this.$searchSeparator + this.SSYLEDate.format('yyyy-MM-dd hh:mm:ss'), data_interval: 'H1' } };
          params.success = (result) => {
            that.$Loading.finish();
            if (result.data.code == '0000') {
              that.ssyqList = result.data.result.result;
              that.changeLayerFeature(SSYQLayer, result.data.result.result, 'rain_level');
              setTimeout(that.ssyqRefresh, 10000);
            } else {
              that.$Message.error(result.data.message);
            }
          };
          this.ajaxPost(params);
        }
      },
      stationGroupChange: function (value, pType) {

        var that = this;
        var params = {};
        params.url = 'wtxiqiao/realdata/water/waterlevel/getbygroup';
        params.data = {searchValue: { stn_group_name: value }, order: { water_level: -1 } };
        params.token = this.getKey('token');
        params.success = function (result) {
          if (result.data.code == '0000') {
            if (pType == 'sssq') {
              that.sssqList = result.data.result.result;
              //console.log(that.sssqList);
              that.changeLayerFeature(SSSQLayer,that.sssqList, 'trend_flag');
            } else if (pType == 'sslq') {
              that.sslqList = result.data.result.result;
              that.changeLayerFeature(SSLQLayer, that.sslqList, 'trend_flag');
            }
          } else {
            that.$Message.error(result.data.message);
          }
        };
        this.ajaxPost(params);



      },
      sqStationGroupChange: function (value) {
        if (value)
          this.stationGroupChange(value, 'sssq');
      },
      lqStationGroupChange: function (value) {
        if (value)
          this.stationGroupChange(value, 'sslq');
      },
      cwStationGroupChange: function (value) {
        if (value)
          this.ajaxPost({
            url: 'wtxiqiao/realdata/hydrology/tide/getbygroup',
            token: this.getKey('token'),
            data: { searchValue: { stn_group_name: value, group_type: '潮位' }, order: { ms_tide: -1 } },
            success : (result) => {
              if (result.data.code == '0000') {
                this.sscwList = result.data.result.result;
                this.changeLayerFeature(SSCWLayer, result.data.result.result, 'trend_flag');
              } else {
                this.$Message.error(result.data.message);
              }
            }
          });
      },
      currViewShow: function (item) {
        if (item.selected) {
          this.waterRainshow = true;
          this.currView.name = item.code;
          this.headTitle = item.righTitle;
          //初始化水雨情数据
          this.initialWaterRain();
        }
      },

      changeSsyqList: function (item){

        if(item.selected){
          switch(item.rain_level){
            case 'level1':
              this.ssyqList = this.yqData.level1;

              break;
            case 'level2':
              this.ssyqList = this.yqData.level2;
              break;
            case 'level3':
              this.ssyqList = this.yqData.level3;
              break;
            case 'level4':
              this.ssyqList = this.yqData.level4;
              break;
            case 'level5':
              this.ssyqList = this.yqData.level5;
              break;
            case 'level6':
              this.ssyqList = this.yqData.level6;
              break;
            default:
              this.ssyqList = this.yqData.level2;
          }
        }else {
          //this.removeLayerFeature(SSYQLayer);
        }
        this.changeLayerFeature(SSYQLayer,this.ssyqList,'rain_level');
      },

      changeLayerFeature: function(layer,data,img){
        layer.getSource().clear();
        layer.getSource().addFeatures(this.createFeaturesImg(data,img));

      },
      /*removeLayerFeature: function(layer){
       layer.getSource().clear();
       },*/
      createFeaturesImg: function(data,img){
        let features = [];
        data.map((item) =>{
          if(item.lng && item.lat){
            let feature = new ol.Feature(new ol.geom.Point([item.lng,item.lat]));
            // myMap.getView().setCenter([item.lng,item.lat]);
            //myMap.getView().setCenter([item.lng,item.lat]);
            feature.setStyle(new ol.style.Style({
              image: new ol.style.Icon({
                src: 'static/img/waterRain/'+item[img]+'.png'
              }),
              text: new ol.style.Text({
                fill: new ol.style.Fill({
                  color: '#000'
                }),
                offsetX: 0,
                offsetY: 10,
                text: item.stn_name
              })
            }));
            feature.set('content',item);
            features.push(feature);
          }
        })
        return features;
      },

      SQDateChange: function (value) {
        let dataTime = (value + ' 00:00:00') + this.$searchSeparator + (value + ' 23:59:59');
        var that = this;
        var params = {};
        params.token = this.getKey('token');
        params.url = 'wtxiqiao/realdata/water/waterlevel/list';
        params.data = { searchValue: { stn_no: station_no, data_time: dataTime }, order: { data_time: 1 } };
        params.success = function(result){
          if (result.data.code === '0000') {

            if (result.data.result.result.length > 0) {

              let swMax = result.data.result.result[0].water_level;
              let swMin = result.data.result.result[0].water_level;

              let chartDatas = [];

              for (let i = 0, itemLength = result.data.result.result.length; i < itemLength; i++) {

                chartDatas.push([result.data.result.result[i].data_time, result.data.result.result[i].water_level]);
                if (swMax < result.data.result.result[i].water_level) {
                  swMax = result.data.result.result[i].water_level;
                }
                if (swMin > result.data.result.result[i].water_level) {
                  swMin = result.data.result.result[i].water_level;
                }
              }
              let option = {
                grid: {
                  left: '14%',
                  right: '15%'
                },
                title: {
                  text: '水位过程线',
                  left: 'center'
                },
                tooltip: {
                  trigger: 'axis',
                  confine: true
                },
                legend: {
                  data: ['水位'],
                  right: '10%'
                },
                toolbox: {
                  show: true,
                  feature: {
                    saveAsImage: {}
                  },
                  right: '5%'
                },
                xAxis: {
                  type: 'time',
                  boundaryGap: false
                },
                yAxis: {
                  type: 'value',
                  name: '水位(m)',
                  nameLocation: 'middle',
                  nameGap: 30
                },
                series: [
                  {
                    name: '水位',
                    type: 'line',
                    data: chartDatas,
                    symbol: 'circle'
                  },
                  {
                    name: '警戒线',
                    type: 'line',
                    itemStyle: {
                      normal: {
                        color: '#f72626'
                      }
                    },
                    markLine: {
                      name: '警戒线',
                      data: [
                        {
                          yAxis: stationalarm_l1
                        }
                      ],
                      lineStyle: {
                        normal: {
                          width: 2
                        },
                        emphasis: {
                          width: 2
                        }
                      },
                      label: {
                        normal: {
                          formatter: function (obj) {
                            return obj.seriesName;
                          }
                        }
                      }
                    }
                  },
                  {
                    name: '历史最高线',
                    type: 'line',
                    itemStyle: {
                      normal: {
                        color: '#f6b26b'
                      }
                    },
                    markLine: {
                      name: '历史最高线',
                      data: [
                        {
                          yAxis: stationhis_level
                        }
                      ],
                      lineStyle: {
                        normal: {
                          width: 2
                        },
                        emphasis: {
                          width: 2
                        }
                      },
                      label: {
                        normal: {
                          formatter: function (obj) {
                            return obj.seriesName;
                          }
                        }
                      }
                    }
                  }
                ]
              };
              if (stationalarm_l1 < stationhis_level) {
                if (swMax < stationhis_level) {
                  option.yAxis.max = Math.round(stationhis_level + 1, 0);
                }
                if (swMin > stationalarm_l1) {
                  option.yAxis.min = Math.round(stationalarm_l1 - 1, 0);
                }
              } else {
                if (swMax < stationalarm_l1) {
                  option.yAxis.max = Math.round(stationalarm_l1 + 1, 0);
                }
                if (swMin > stationhis_level) {
                  option.yAxis.min = Math.round(stationhis_level - 1, 0);
                }
              }
              that.$refs.baseChart.setOption(option);
            }
          } else {
            that.$Message.error(result.data.message);
          }
        };
        this.ajaxPost(params);
      },

      sssqMsgBox: function (msgData, pType) {
        let queryUrl = 'wtxiqiao/realdata/water/waterlevel/list';
        let dataTime = this.$AddDays(0, 0, 0).format('yyyy-MM-dd hh:mm:ss') + this.$searchSeparator + this.$AddDays(0, 23, 59, 59).format('yyyy-MM-dd hh:mm:ss');
        if (pType == 'sssq') {
          this.SQDate = this.$AddDays(0, 0, 0);
          this.msgBoxHeadTitle = msgData.stn_name + '-' + msgBoxTitles.head.sssq;
          this.tabsTitle = msgBoxTitles.tabs.sssq;
          stationalarm_l1 = parseFloat(msgData.alarm_l1 || 0);
          stationhis_level = parseFloat(msgData.his_level || 0);
          station_no = msgData.stn_no;
        } else if (pType == 'sslq') {
          this.msgBoxHeadTitle = msgData.stn_name + '-' + msgBoxTitles.head.sslq;
          this.tabsTitle = msgBoxTitles.tabs.sslq;
          let now = new Date();
          let last8Hour = new Date(now.getTime() - 8 * 60 * 60 * 1000);
          dataTime = last8Hour.format('yyyy-MM-dd hh:mm:00') + this.$searchSeparator + now.format('yyyy-MM-dd hh:mm:00');
        } else if (pType == 'sscw') {
          this.msgBoxHeadTitle = msgData.stn_name + '-' + msgBoxTitles.head.sscw;
          this.tabsTitle = msgBoxTitles.tabs.sscw;
          stationalarm_l1 = msgData.alarm_l1 || 0;
          stationhis_level = msgData.his_level || 0;
          queryUrl = 'wtxiqiao/realdata/hydrology/tide/list'
        }
        this.infoTableHtml = this.$getInfoTableStr(msgData, ['站码|stn_no', '站点类型|stn_type', '站点名称|stn_name', '数据标签|data_tag', '站点状态|stn_status', '行政区域|region', '行政区划代码|region_code', '站点地址|location', '经度|lng', '纬度|lat', '所属河流名称|river', '流域|basin', '水系|hydr_net', '备注|remark', '最后采集时间|final_collect_time', '警界水位|alarm_l1', '历史最高水位|his_level', '历史最高水位时间|his_level_date']);

        var that = this;
        var params ={};
        params.token = this.getKey('token');
        params.url = queryUrl;
        params.data = { searchValue: { stn_no: msgData.stn_no, data_time: dataTime }, order: { data_time: 1 } };
        params.success = function(result){
          if (result.data.code === '0000') {
            if (result.data.result.result.length > 0) {
              let swMax = 0;
              let swMin = 0;
              let chartDatas = [];
              let yOptions = {
                type: 'value',
                name: '水位(m)',
                nameLocation: 'middle',
                nameGap: 30
              };
              if (pType != 'sscw') {
                swMax = result.data.result.result[0].water_level;
                swMin = result.data.result.result[0].water_level;
                that.dataTableHtml = that.getDataTableStr(result.data.result.result, ['data_time', 'water_level'], ['时间', '水位(m)']);
                for (let i = 0, itemLength = result.data.result.result.length; i < itemLength; i++) {
                  chartDatas.push([result.data.result.result[i].data_time, result.data.result.result[i].water_level]);
                  if (swMax < result.data.result.result[i].water_level) {
                    swMax = result.data.result.result[i].water_level;
                  }
                  if (swMin > result.data.result.result[i].water_level) {
                    swMin = result.data.result.result[i].water_level;
                  }
                }
                if (pType == 'sslq') {
                  yOptions.max = 5;
                  yOptions.min = -0.1
                }
              } else {
                swMax = result.data.result.result[0].ms_tide;
                swMin = result.data.result.result[0].ms_tide;
                that.dataTableHtml = that.getDataTableStr(result.data.result.result, ['data_time', 'ms_tide'], ['时间', '潮位(m)']);
                for (let i = 0, itemLength = result.data.result.result.length; i < itemLength; i++) {
                  chartDatas.push([result.data.result.result[i].data_time, result.data.result.result[i].ms_tide]);
                  if (swMax < result.data.result.result[i].ms_tide) {
                    swMax = result.data.result.result[i].ms_tide;
                  }
                  if (swMin > result.data.result.result[i].ms_tide) {
                    swMin = result.data.result.result[i].ms_tide;
                  }

                }
              }
              let option = {
                grid: {
                  left: '14%'
                },
                title: {
                  text: '水位过程线',
                  left: 'center'
                },
                tooltip: {
                  trigger: 'axis',
                  confine: true
                },
                legend: {
                  data: ['水位'],
                  right: '10%'
                },
                toolbox: {
                  show: true,
                  feature: {
                    saveAsImage: {}
                  },
                  right: '5%'
                },
                xAxis: {
                  type: 'time',
                  boundaryGap: false
                },
                yAxis: yOptions,
                series: [
                  {
                    name: '水位',
                    type: 'line',
                    data: chartDatas,
                    symbol: 'circle'
                  }
                ]
              };
              if (pType == 'sssq' || pType == 'sscw') {

                if (stationalarm_l1 < stationhis_level) {
                  if (swMax < stationhis_level) {
                    option.yAxis.max = Math.round(stationhis_level + 1, 0);
                  }
                  if (swMin > stationalarm_l1) {
                    option.yAxis.min = Math.round(stationalarm_l1 - 1, 0);
                  }
                } else {
                  if (swMax < stationalarm_l1) {
                    option.yAxis.max = Math.round(stationalarm_l1 + 1, 0);
                  }
                  if (swMin > stationhis_level) {
                    option.yAxis.min = Math.round(stationhis_level - 1, 0);
                  }
                }
                option.series.push({
                  name: '警戒线',
                  type: 'line',
                  itemStyle: {
                    normal: {
                      color: '#f72626'
                    }
                  },
                  markLine: {
                    name: '警戒线',
                    data: [
                      {
                        yAxis: stationalarm_l1
                      }
                    ],
                    lineStyle: {
                      normal: {
                        width: 2
                      },
                      emphasis: {
                        width: 2
                      }
                    },
                    label: {
                      normal: {
                        formatter: function (obj) {
                          return obj.seriesName;
                        }
                      }
                    }
                  }
                });
                option.series.push({
                  name: '历史最高线',
                  type: 'line',
                  itemStyle: {
                    normal: {
                      color: '#f6b26b'
                    }
                  },
                  markLine: {
                    name: '历史最高线',
                    data: [
                      {
                        yAxis: stationhis_level
                      }
                    ],
                    lineStyle: {
                      normal: {
                        width: 2
                      },
                      emphasis: {
                        width: 2
                      }
                    },
                    label: {
                      normal: {
                        formatter: function (obj) {
                          return obj.seriesName;
                        }
                      }
                    }
                  }
                });
                option.grid.right = '15%';
              }
              that.$refs.baseChart.setOption(option);
            }
          } else {
            that.$Message.error(result.data.message);
          }
        };
        this.ajaxPost(params);
        msgBoxOverlay.setPosition([parseFloat(msgData.lng), parseFloat(msgData.lat)]);
      },


      sssqRowClick: function (rowData) {
        this.sssqMsgBox(rowData, 'sssq');
        this.$bus.emit('mapOperator', 'setCenterAndZoom', { point: [parseFloat(rowData.lng), parseFloat(rowData.lat)] });
      },
      sslqRowClick: function (rowData) {
        this.sssqMsgBox(rowData, 'sslq');
        this.$bus.emit('mapOperator', 'setCenterAndZoom', { point: [parseFloat(rowData.lng), parseFloat(rowData.lat)] });
      },
      sscwRowClick: function (rowData) {
        this.sssqMsgBox(rowData, 'sscw');
        this.$bus.emit('mapOperator', 'setCenterAndZoom', { point: [parseFloat(rowData.lng), parseFloat(rowData.lat)] });
      },
      ssyqRowClick: function (rowData, isRowClick) {
        this.msgBoxHeadTitle = rowData.stn_name + '-' + msgBoxTitles.head.ssyq;
        this.tabsTitle = msgBoxTitles.tabs.ssyq;

        this.infoTableHtml = this.$getInfoTableStr(rowData, ['站码|stn_no', '站点类型|stn_type', '站点名称|stn_name', '数据时间|data_time', '数据来源|data_source', '行政区域|region']);
       var that = this;
       var params = {};
        params.url = 'wtxiqiao/realdata/meteo/rain/list';
        params.token = this.getKey('token');
        params.data = { searchValue: { stn_no: rowData.stn_no, data_time: this.SSYLSDate.format('yyyy-MM-dd hh:mm:ss') + this.$searchSeparator + this.SSYLEDate.format('yyyy-MM-dd hh:mm:ss'), data_interval: 'H1' }, order: { data_time: 1 } };
        params.success = function (result) {
          if (result.data.code === '0000') {
            that.dataTableHtml = that.getDataTableStr(result.data.result.result, ['data_time', 'rainfull'], ['时间', '雨量(mm)']);
            let chartDatas = [];
            for (let i = 0, itemLength = result.data.result.result.length; i < itemLength; i++) {
              chartDatas.push([result.data.result.result[i].data_time, result.data.result.result[i].rainfull]);
            }

            let option = {
              grid: {
                left: '14%'
              },
              title: {
                text: '雨量过程',
                left: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                confine: true
              },
              legend: {
                data: ['雨量'],
                right: '10%'
              },
              toolbox: {
                show: true,
                feature: {
                  saveAsImage: {}
                },
                right: '5%'
              },
              xAxis: {
                type: 'time'
              },
              yAxis: {
                type: 'value',
                name: '雨量(mm)',
                nameLocation: 'middle',
                nameGap: 30
              },
              series: [
                {
                  name: '雨量',
                  type: 'bar',
                  data: chartDatas,
                  barMaxWidth: ''
                }
              ]
            };
            that.$refs.baseChart.setOption(option);
          } else {
            that.$Message.error(result.data.message);
          }
        };
        this.ajaxPost(params);
        msgBoxOverlay.setPosition([parseFloat(rowData.lng), parseFloat(rowData.lat)]);
        if (isRowClick != false) {
          this.$bus.emit('mapOperator', 'setCenterAndZoom', { point: [parseFloat(rowData.lng), parseFloat(rowData.lat)] });
        }

      },
      stationRowClick:function(rowData){
         // console.log(rowData);

        this.$bus.emit('mapOperator', 'setCenterAndZoom', { point: [parseFloat(rowData.lng), parseFloat(rowData.lat)] });
        this.createCircleFeature(rowData);
      },
//绘制地图定位站点圆圈
      createCircleFeature:function (data) {
        circleLayer.getSource().clear();

        var circle = new ol.Feature(new ol.geom.Point([data.lng,data.lat]));
        circleLayer.getSource().addFeature(circle);
        var radius = 0;
        var width=0;
        var animate=setInterval(function () {
          circle.setStyle(new ol.style.Style({
            image:new ol.style.Circle({
              radius:radius,
              stroke: new ol.style.Stroke({
                color: '#f71c01',
                size: 1,
                width:width,
              })
            })
          }));
          radius++;
          radius = radius%40;
          width+=0.15;
          width=width%6;
        },20);
        setTimeout(function () {
          clearInterval(animate);
          circleLayer.getSource().clear();
        },8000);
      },
      getDataTableStr: function (content, column, head) {
        var tableStr = '<table class="tableCustom">';
        if (head) {
          tableStr += '<thead><tr><th width="70%">' + head[0] + "</th><th width='30%'>" + head[1] + "</th></tr></thead>";
        }
        tableStr += '<tbody>';
        if (content) {
          for (let i = 0; i < content.length; i++)
            tableStr += "<tr><td width='30%'>" + content[i][column[0]] +
              "</td><td width='70%'>" + content[i][column[1]] + "</td></tr>";
        }
        else {
          tableStr += '<tr><td colspan="2">暂时没有数据！</td>';
        }
        tableStr += '</tbody></table>'
        return tableStr;
      },

      //设置左边水调度定位表格信息
      setStationList:function (layerName,data) {
        this.stationList=[];
        if (layerName =='pumpLayer' ||layerName=='dpumpLayer'){
              data.map((item) =>{
                  if(item.pump){
                    item.water_river_in=item.pump.water_river_in;
                    item.water_river_out=item.pump.water_river_out;
                  }else{
                    item.water_river_in='--';
                    item.water_river_out='--';
                  }
                  this.stationList.push(item);
                  return;
              })

        }else if(layerName=='gateLayer'){
          data.map((item) =>{
            if(item.gate){
              item.water_river_in=item.gate.water_river_in;
              item.water_river_out=item.gate.water_river_out;
            }else{
              item.water_river_in='--';
              item.water_river_out='--';
            }
            this.stationList.push(item);
          })
        }
      },
      //获取视频列表
      getVideoList:function(stn_name){
          this.videoYunUrl = '';
          let that = this;
          var params ={};
          params.url='wtxiqiao/waterresource/video/list';
          params.token=this.getKey('token');
          params.data={"searchValue":{"video_station":stn_name}};
          params.success=function (res) {
            that.videoList = [];
              if(res.data.code=='0000'){
                  if(res.data.result.result){
                    that.videoList=res.data.result.result;
                  }
              }
            if(that.videoList.length>0){
                that.changeVideo(that.videoList[0]);
                that.videoYunUrl = 'http://'+that.videoList[0]['video_ip'];
            }
          };
          this.ajaxPost(params);
      },
      //切换视频
      changeVideo:function (item) {
        //console.log(JSON.stringify(item));
        this.sendSocketMsg(JSON.stringify(item));
        //this.sendSocketMsg(item.iChannelID);
      },
      //打开视频云控台窗口
      openVideoCloundBox:function () {
        this.videoCloundShow = true;
        this.$store.state.mapCount.mapInfoShow=false
      },
      weatherModalCancel:function () {
          //把气象menu改为非选中状态
        this.$refs.leftRead.weatherMenu.map((item) =>{
          item.selected = false;
        })
      },
		}

	}
</script>
