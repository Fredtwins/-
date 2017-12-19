<style scoped>
  #myMap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 1300px;
    min-height: 800px;
    position: absolute;
  }

</style>

<template>
  <div id="myMap"></div>
</template>

<script>
  let pump1Img = {
    off: 'static/img/aPicture/DP-0.gif',
    on: 'static/img/aPicture/DP-1.gif'
  };
  let pump2Img = {
    off: 'static/img/aPicture/DP-0.gif',
    on: 'static/img/aPicture/DP-1.gif'
  }
  let gateImg = {
    off: 'static/img/aPicture/DD-0.gif',
    on: 'static/img/aPicture/DD-1.gif'
  };
  let warnImg = {
    off: 'static/img/aPicture/warn.png'
  };
let WaterDirectionLayerImg= {
    off: 'static/img/mapico/waterDirection.gif',
    on: 'static/img/mapico/waterDirection.gif'
};
let hydrologyImg = {
    off: 'static/img/mapico/hydrology.png'
  }
  let waterloggingImg = {
    off: 'static/img/mapico/waterPoint.png'
  }
  let tideGaugeImg = {
    off: 'static/img/mapico/hydrology.png'
  }
  let waterqulityImg = {
    off:''
  }
  let map = null;
  let temperatureLayer = null;
  let windLayer = null;
  // let reservoirLayer = null;
  //修改addLayer 开始的if语句来合并reservoirLayer1 reservoirLayer
  let gateLayer = {
    iconName: 'gateLayer',
    iconUrl: gateImg,
    data: [],
    iconArr: [],
    titleArr: [],
    msgArr: []
  };
  let pumpLayer = {
    iconName: 'pumpLayer',
    iconUrl: pump1Img,
    data: [],
    iconArr: [],
    titleArr: [],
    msgArr: []
  };
  let dpumpLayer = {
    iconName: 'dpumpLayer',
    iconUrl: pump2Img,
    data: [],
    iconArr: [],
    titleArr: [],
    msgArr: []
  };
  let WaterDirectionLayer = {
    iconName: 'WaterDirectionLayer',
    iconUrl: WaterDirectionLayerImg,
    data: [],
    iconArr: [],
    titleArr: [],
    msgArr: []
  };
let hydrologyLayer = {//水位站
  iconName: 'hydrologyLayer',
  iconUrl: hydrologyImg,
  data: [],
  iconArr: [],
  titleArr: [],
  msgArr: []
};
let waterloggingLayer = {
  iconName: 'waterloggingLayer',
  iconUrl: waterloggingImg,
  data: [],
  iconArr: [],
  titleArr: [],
  msgArr: []
}
let tideGaugeLayer = {
  iconName: 'tideGaugeLayer',
  iconUrl: tideGaugeImg,
  data: [],
  iconArr: [],
  titleArr: [],
  msgArr: []
}
let waterqulityLayer = {
  iconName: 'waterqulityLayer',
  iconUrl: waterqulityImg,
  data: [],
  iconArr: [],
  titleArr: [],
  msgArr: [],

}
let rainLayer = {data: [],}

  let waterNetLayer = null;

  let baseLayer = null;
  let heightLayer = null;
  let panoramaLayer = null;
  let panoramaLayer1 = null;
  let notionLayer = null;
  let nanhaiFoshanLayer = null;
  let xiqiao_riverLayer = null;
  let dlng = 0.000036098145;
  let dlat = -0.00003449096765;
  //let dlng =0.0000858306884;
  //let dlat = -0.00025749206542;
  let oZoom = 14;
  export default {
    data() {
      return {
        gateDataOld: [],
        gateData:[],
        pumpDataOld: [],
        pumpData: [],
        dpumpDataOld:[],
        dpumpData:[],
        pZoom: '',
      }
    },
    created() {
      this.$bus.on('changeMapLayer', this.changeMapLayer);
      this.$bus.on('removePointOverlay', this. removePointOverlay);
      this.$bus.on('addOverlay',this.addOverlay);
      this.$bus.on('mapOperator', this.mapOperator);


    },
    beforeDestroy() {

      this.$bus.off('changeMapLayer', this.changeMapLayer);
      this.$bus.off('removePointOverlay', this. removePointOverlay);
      this.$bus.off('addOverlay',this.addOverlay);
      this.$bus.off('mapOperator', this.mapOperator);

    },
    mounted() {
      this.$nextTick(() => {
        baseLayer = new ol.layer.Tile({
          source: new ol.source.TileArcGISRest({
            // url: "http://121.201.61.249:6080/arcgis/rest/services/data_visualization/basemap_backgroud_normal/MapServer"
            url: "http://202.105.25.138:20462/arcgis/rest/services/data_visualization/basemap_backgroud_normal/MapServer"
          }),
          visible: true
        });


        //卫星图广东layer
        panoramaLayer = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://202.105.25.138:20463/static/map_tile/satellite_guangdong_tiandi/tiles/{z}/{y}/{x}.png",
            minZoom: 0,
            maxZoom: 18
          }),
          visible: false
        });
        //卫星图佛山layer
        panoramaLayer1 = new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: "http://202.105.25.138:20463/static/map_tile/satellite_foshan_tiandi/tiles/{z}/{y}/{x}.png",
            minZoom: 0,
            maxZoom: 18
          }),
          visible: false
        });

        nanhaiFoshanLayer = new ol.layer.Tile({
          source: new ol.source.TileArcGISRest({
            url: "http://202.105.25.138:20462/arcgis/rest/services/data_visualization/basemap_foshan_nanhai/MapServer"
          }),
          visible: false
        });

        //镇街名layer
        notionLayer = new ol.layer.Tile({
          source: new ol.source.TileArcGISRest({
            url: "http://202.105.25.138:20462/arcgis/rest/services/data_visualization/notation/MapServer"
          })
        });
        //水网layer
        waterNetLayer = new ol.layer.Tile({
          source: new ol.source.TileArcGISRest({
            //url: 'http://202.105.25.138:20462/arcgis/rest/services/data_visualization/guangdong_waterbody_entire/MapServer'
            url:'http://202.105.25.138:20462/arcgis/rest/services/data_visualization/foshan_waterbody_entire/MapServer'
          })
        });
       //西樵主干涌layer
        xiqiao_riverLayer = new ol.layer.Tile({
          source: new ol.source.TileArcGISRest({
            url: 'http://202.105.25.138:20462/arcgis/rest/services/xiqiao/xiqiao_small_river_partial/MapServer'
          })
        });

        map = new ol.Map({
          target: myMap,
          layers: [baseLayer, panoramaLayer, panoramaLayer1, waterNetLayer,nanhaiFoshanLayer, notionLayer,xiqiao_riverLayer],
          view: new ol.View({
            center: [112.94836962890625, 22.948907702636717],
            zoom: 14,
            maxZoom: 17,
            minZoom: 10,
            projection: 'EPSG:4326',
            extent: [109.6820068359375, 20.264282226562504, 116.8670654296875, 25.3729248046875]
          }),
          controls: ol.control.defaults({
            attribution: false,
          })
        });
       map.on('singleclick', (evt) => {
           if(this.$store.state.mapCount.mapInfoShow) {
               return;
             console.log(evt.coordinate[0], evt.coordinate[1])
           }
         console.log(evt.coordinate[0], evt.coordinate[1]);
          this.displayFeatureInfo(evt);
          if (waterNetLayer) {
            let that = this;
            this.$WaterAjax(evt.coordinate[0],evt.coordinate[1],10 ,function(res) {
              let name = res.results[0].attributes.name;
              if (name) {
                that.waterAjaxPost({
                  url: '/sanfang/onepicture/ztwaterstriv/list',
                  data: {
                    page: 1,
                    pageSize: 10,
                    searchValue: {
                      rivname: name
//										strivid: 'FA0C5BAB-B137-749E-7BC6-2EB39BFF75CA'
                    }
                  },
                  success: function(res) {
                    that.$store.commit('setStrivInfo',res.result[0]);
                    that.waterNetInfo();
                  }
                });
              }
            }, function(error) {

            })
          }

        });
       var that =this;
       map.getView().on('change:resolution',function (){
          //console.log(map.getView().getZoom());
          var currZoom= this.getZoom();

          //var dZoom = 13- currZoom;//当前层级与最大层级18的差

       if(parseInt(currZoom)==currZoom){
           if(currZoom<13){
               $('.overMsg').hide();
               $('.over-title').hide();
               $('.over-img').hide();
           }else {
             $('.overMsg').show();
             $('.over-title').show();
             $('.over-img').show();
           }
         //  console.log((currZoom-oZoom)*dlng);
          // console.log((currZoom-oZoom)*dlat);
            var overlayArry = map.getOverlays().getArray();
            overlayArry.map((item,index) => {
             //console.log(item.getPosition());
             //var overlayPosition = item.getPosition();
             //overlayPosition[0] = parseFloat(overlayPosition[0]) +(oZoom-currZoom)*dlng;
            // overlayPosition[1] = parseFloat(overlayPosition[1]) +(oZoom-currZoom)*dlat;
             //item.setPosition(overlayPosition);
           })
          // this.oZoom= currZoom;
         }
       });
       var refreshInterval= setInterval(function () {
          that.refreshOverlay();
        },60000);


      })

    },
    methods: {
      addOverlay: function (layerName) {

        var that = this;
        that.$bus.emit('setStationList');
        switch (layerName) {
          case 'gateLayer'://水闸
            var params = {
              url: 'wtxiqiao/waterresource/rlddevicerunrec/listcurrent',
              token: this.getKey("token"),
              data: {
                "orders": "datetime",
                "system_id": parameters.system_id,
                "searchValue": {"stn_type": "闸站", "town": "西樵"}
              },
              success: function (res) {
                that.$Loading.finish();
                that.gateDataOld = res.data.result;
                //console.log(eval(layerName));
                that.addPointOverlay(eval(layerName), res.data.result);
                //设置左边站点table数据
                that.$bus.emit('setStationList','gateLayer',res.data.result);
              }
            }
            break;
          case 'pumpLayer'://泵站
            var params = {
              url: 'wtxiqiao/waterresource/rlddevicerunrec/listcurrent',
              token: this.getKey("token"),
              data: {
                "orders": "datetime",
                "system_id": parameters.system_id,
                "searchValue": {"stn_type": "泵站", "town": "西樵"}
              },
              success: function (res) {
                that.$Loading.finish();
                that.pumpDataOld = res.data.result;
                that.addPointOverlay(eval(layerName), res.data.result);
                //设置左边站点table数据
                that.$bus.emit('setStationList','pumpLayer',res.data.result);
              }
            };

            break;
          case 'dpumpLayer'://电排站
            var params = {
              url: 'wtxiqiao/waterresource/rlddevicerunrec/listcurrent',
              token: this.getKey("token"),
              data: {
                "orders": "datetime",
                "system_id": parameters.system_id,
                "searchValue": {"stn_type": "电排站", "town": "西樵"}
              },
              success: function (res) {
                that.$Loading.finish();
                that.dpumpDataOld = res.data.result;
                that.addPointOverlay(eval(layerName), res.data.result);
                //设置左边站点table数据
                that.$bus.emit('setStationList','dpumpLayer',res.data.result);
              }
            };

            break;
          case 'WaterDirectionLayer'://水流方向
            var params = {
              // url: 'wtxiqiao/waterresource/bsiinnerriver/list',
              //url: 'wtxiqiao/waterresource/flowlogo/list',
              url: 'wtxiqiao/waterresource/rldriverflow/listcurrent',
              token: this.getKey("token"),
              data: {"system_id": parameters.system_id},
              success: function (res) {
                that.$Loading.finish();
                // that.addWaterDirection(eval(layerName), res.data.result.result);
                that.addPointOverlay(eval(layerName), res.data.result.result);

              }
            };
            break;
        }
        // this.ajaxGet(params);
        this.ajaxPost(params);
      },
      addPointOverlay: function (type, data) {
          //如果是水流方向层直接加图标
        if (type.iconName == "WaterDirectionLayer") {
          this.addWaterDirection(type, data);
          return;
        }

        type.data = data;
        type.iconArr = [];
        type.titleArr = [];
        type.msgArr = [];


        var idPrefix = '';//不同layer的id前缀
        if (type.iconName === 'gateLayer') {
          idPrefix = 'gate';
        } else if (type.iconName === 'pumpLayer') {
          idPrefix = 'pump'
        } else if (type.iconName === 'dpumpLayer') {
          idPrefix = 'dpump';
        }

        //console.log(type);
        type.data.map((item, i) => {
          //创建站点图标html元素
          var overImg = document.createElement('img');
          $(overImg).addClass('over-img').attr({
            'data-num': i,
            'data-name': type.iconName,
            'id': (idPrefix + 'img' + item.id)
          });

          if (type.data[i]['switch'] == 1) {
            $(overImg).attr("src", type.iconUrl.on);
          } else {
            $(overImg).attr("src", type.iconUrl.off);
          }

          //创建站点名称html元素
          var overP = document.createElement('p');
          $(overP).addClass('over-title')
            .attr({'data-num': i, 'data-name': type.iconName, 'id': (idPrefix + 'title' + item.id)})
            .html(type.data[i]["stn_name"]);

          //创建内外江水位数据html元素
          var waterIn = 0;
          var waterOut = 0;
          var innertrend='';
          var  outertrend='';
          var innertrendColor='';//内江水位超限颜色
          var  outertrendColor='';//外江水位超限颜色
          if (type.data[i]["gate"]) {
            innertrend = type.data[i]["gate"]["innertrend"]=="涨"?"↑":"↓";
            outertrend = type.data[i]["gate"]["outertrend"]=="涨"?"↑":"↓";

            waterIn = type.data[i]["gate"]["water_river_in"];
            waterOut = type.data[i]["gate"]["water_river_out"];
            innertrendColor = waterIn >= type.data[i]["gate"]["inner_limit"]?"rgb(255,155,58)":"";
            outertrendColor = waterOut >= type.data[i]["gate"]["outer_limit"]?"rgb(255,155,58)":"";
          }
          if (type.data[i]["pump"]) {
            innertrend = type.data[i]["pump"]["innertrend"]=="涨"?"↑":"↓";
            outertrend = type.data[i]["pump"]["outertrend"]=="涨"?"↑":"↓";
            waterIn = type.data[i]["pump"]["water_river_in"];
            waterOut = type.data[i]["pump"]["water_river_out"];
            innertrendColor = waterIn >= type.data[i]["pump"]["inner_limit"]?"rgb(255,155,58)":"";
            outertrendColor = waterOut >= type.data[i]["pump"]["outer_limit"]?"rgb(255,155,58)":"";
          }

          var overMsg = document.createElement('p');
          $(overMsg).addClass('overMsg')
            .attr({'data-num': i, 'data-name': type.iconName, 'id': (idPrefix + 'Msg' + item.id)})
            .html('<span style="color: white">外江:</span> '+'<span style="color:'+outertrendColor+' ">' +waterOut +outertrend+'</span>'+ '&nbsp;&nbsp;<span style="color: white">内江:</span> ' +'<span style="color: '+innertrendColor+'">'+ waterIn+innertrend+'</span>')


          var img_layer = new ol.Overlay({
            element: overImg,
            stopEvent: false,
            position: [type.data[i]["lng"], type.data[i]["lat"]],
            positioning:'center-center'
            //position: type.data[i]["coordinates"]
          });

          var title_layer = new ol.Overlay({
            element: overP,
            stopEvent: false,
            position: [type.data[i]["lng"], type.data[i]["lat"]],
            positioning:'center-center'
          });
          var msg_layer = new ol.Overlay({
            element: overMsg,
            stopEvent: false,
            position: [type.data[i]["lng"], type.data[i]["lat"]],
            positioning:'center-center'
          });

          type.iconArr.push(img_layer);
          type.titleArr.push(title_layer);
          type.msgArr.push(msg_layer);
          //加图层
          for (var i in type.iconArr) {
            map.addOverlay(type.iconArr[i]);
            map.addOverlay(type.titleArr[i]);
            map.addOverlay(type.msgArr[i]);
          }
        })


        //事件
        this.pointOverlayClick();
      },
      pointOverlayClick: function () {

        var that = this;
        $('.over-img').off('click').on('click', function (e) {
          var num = $(this).data('num');
          var name = $(this).data('name');
          //do something
          that.pointOverlayShowDetail(name, eval(name)['data'][num]);

        });
      },
      // 显示详细信息框
      pointOverlayShowDetail: function (layerName, data) {
//        alert(data.user);

        //this.$bus.emit('sendSocketMsg',obj);
        this.$bus.emit('pointOverlayShowMsg', {
          layer: layerName,
          content: data,
        });
      },
      showLayer: function (layer) {
        map.addLayer(layer);
      },
      removePointOverlay: function (layerName) {
        switch (layerName) {
          case 'waterNetLayer':
            map.removeLayer(waterNetLayer);
            waterNetLayer = null;
            // map.removeLayer(innerRiverLayer);
            break;
          default:
            $('.over-img[data-name="' + layerName + '"]').parent('.ol-overlay-container').remove();
            $('.over-title[data-name="' + layerName + '"]').parent('.ol-overlay-container').remove();
            $('.overMsg[data-name="' + layerName + '"]').parent('.ol-overlay-container').remove();
            $('.over-img[direction-name="' + layerName + '"]').parent('.ol-overlay-container').remove();
            map.removeLayer(eval(layerName));
            break;
        }
      },
      waterNetInfo() {
        this.$bus.emit('pointOverlayShowMsg', {
          layer: 'waterNetLayer',
          content: '',
          name: '',
          handle: ''
        });
      },
      addWaterDirection (layer, data){
        layer.iconArr = [];
        data.map((item, index) => {
          var waterImg = document.createElement('img');
          $(waterImg).addClass('over-img').attr({'direction-num': index, 'direction-name': layer.iconName});
          var transformValue = "rotate(" + item.logoangle + "deg)";
          $(waterImg).css("transform", transformValue);
          $(waterImg).attr("src", layer.iconUrl.off);


          var waterDirection_layer = new ol.Overlay({
            element: waterImg,
            stopEvent: false,
            position: [item.logolng, item.logolat],
            positioning:'center-center'
            //position: type.data[i]["coordinates"]
          });
          layer.iconArr.push(waterDirection_layer);
          //加图层
          for (var i in layer.iconArr) {
            map.addOverlay(layer.iconArr[i]);
          }
        })
      },
      refreshOverlay: function () {
         this.getStationData('gateLayer');
         this.getStationData('pumpLayer');
         this.getStationData('dpumpLayer');

        var waterIn= 0;
        var waterOut=0;
        var innertrend='';
        var outertrend='';
        var innertrendColor='';
        var outertrendColor='';
        if(this.gateData.length > 0){
             this.gateDataOld.map((itemO) => {
                 this.gateData.map((itemN) =>{
                     if(itemO.id === itemN.id){

                         if(itemO.switch != itemN.switch){
                             var imgSrc ='';
                             if(itemN.switch ==1){
                               imgSrc = 'static/img/aPicture/DD-1.gif';
                             }else {
                               imgSrc = 'static/img/aPicture/DD-0.gif';
                             }
                             var selector ='#gateimg'+itemO.id;
                             //console.log(selector);
                             $(selector).attr('src',imgSrc);
                            // console.log($(selector)[0].src);
                         };
                         if(itemO.gate.water_river_in != itemN.gate.water_river_in || itemO.gate.water_river_out != itemN.gate.water_river_out){

                             if(itemN.gate){
                               innertrend = itemN.gate.innertrend=="涨"?"↑":"↓";
                               outertrend = itemN.gate.outertrend=="涨"?"↑":"↓";
                               waterIn = itemN.gate.water_river_in;
                               waterOut = itemN.gate.water_river_out;
                               innertrendColor = waterIn >= itemN.gate.inner_limit?"rgb(255,155,58)":"";
                               outertrendColor = waterOut >= itemN.gate.outer_limit?"rgb(255,155,58)":"";
                             }
                           var selector ='#gateMsg'+itemO.id;
                           $(selector)
                             .html('<span style="color: white">外江:</span> '+'<span style="color:'+outertrendColor+' ">' +waterOut +outertrend+'</span>'+ '&nbsp;&nbsp;<span style="color: white">内江: </span>' +'<span style="color: '+innertrendColor+'">'+ waterIn+innertrend+'</span>')

                         }
                     }
                 })
             })
         this.gateDataOld = this.gateData;
          eval('gateLayer').data = this.gateData;
         }

        if(this.pumpData.length > 0){
          this.pumpDataOld.map((itemO) => {
            this.pumpData.map((itemN) =>{
              if(itemO.id === itemN.id){

                if(itemO.switch != itemN.switch){
                  var imgSrc ='';
                  if(itemN.switch ==1){
                    imgSrc = 'static/img/aPicture/DP-1.gif';
                  }else {
                    imgSrc = 'static/img/aPicture/DP-0.gif';
                  }
                  var selector ='#pumpimg'+itemO.id;
                  //console.log(selector);
                  $(selector).attr('src',imgSrc);
                  // console.log($(selector)[0].src);
                };
                if(itemO.pump.water_river_in != itemN.pump.water_river_in || itemO.pump.water_river_out != itemN.pump.water_river_out){

                 // var waterIn= 0;
                  //var waterOut=0;
                  if(itemN.pump){
                    innertrend = itemN.pump.innertrend=="涨"?"↑":"↓";
                    outertrend = itemN.pump.outertrend=="涨"?"↑":"↓";
                    waterIn = itemN.pump.water_river_in;
                    waterOut = itemN.pump.water_river_out;
                    innertrendColor = waterIn>=itemN.pump.inner_limit?"rgb(255,155,58)":"";
                    outertrendColor = waterOut>=itemN.pump.outer_limit?"rgb(255,155,58)":"";
                  }
                  var selector ='#pumpMsg'+itemO.id;
                  $(selector)
                    .html('<span style="color: white">外江:</span> '+'<span style="color:'+outertrendColor+' ">' +waterOut +outertrend+'</span>'+ '&nbsp;&nbsp;<span style="color: white">内江:</span> ' +'<span style="color: '+innertrendColor+'">'+ waterIn+innertrend+'</span>')

                }
              }
            })
          })
          this.pumpDataOld = this.pumpData;
          eval('pumpLayer').data = this.pumpData;
        };

        if(this.dpumpData.length > 0){
          this.dpumpDataOld.map((itemO) => {
            this.dpumpData.map((itemN) =>{
              if(itemO.id === itemN.id){
                if(itemO.switch != itemN.switch){
                  var imgSrc ='';
                  if(itemN.switch ==1){
                    imgSrc = 'static/img/aPicture/DP-1.gif';
                  }else {
                    imgSrc = 'static/img/aPicture/DP-0.gif';
                  }
                  var selector ='#dpumpimg'+itemO.id;
                  //console.log(selector);
                  $(selector).attr('src',imgSrc);
                  // console.log($(selector)[0].src);
                };
                if(itemO.pump.water_river_in != itemN.pump.water_river_in || itemO.pump.water_river_out != itemN.pump.water_river_out){

                  //console.log("Old內江："+itemO.pump.water_river_in);
                 // console.log("New內江："+itemN.pump.water_river_in);
                 // console.log("Old外江："+itemO.pump.water_river_out);
                 // console.log("New外江："+itemN.pump.water_river_out);

                  var waterIn= 0;
                  var waterOut=0;
                  if(itemN.pump){
                    innertrend = itemN.pump.innertrend=="涨"?"↑":"↓";
                    outertrend = itemN.pump.outertrend=="涨"?"↑":"↓";
                    innertrendColor=innertrend=="↑"?"rgb(255,155,58)":"";
                    outertrendColor=outertrend=="↑"?"rgb(255,155,58)":"";
                    waterIn = itemN.pump.water_river_in;
                    waterOut = itemN.pump.water_river_out;
                  }
                  var selector ='#dpumpMsg'+itemO.id;
                  $(selector)
                    .html('<span style="color: white">外江:</span> '+'<span style="color:'+outertrendColor+' ">' +waterOut +outertrend+'</span>'+ '&nbsp;&nbsp;<span style="color: white">内江:</span> ' +'<span style="color: '+innertrendColor+'">'+ waterIn+innertrend+'</span>')

                }
               // console.log('===========');
              }
            })
          })
          this.dpumpDataOld = this.dpumpData;
          eval('dpumpLayer').data = this.dpumpData;
        }

      },
      getStationData: function (layerName) {

        var that = this;
        var stn_type = '';
        var url = 'wtxiqiao/waterresource/rlddevicerunrec/listcurrent';
        var token = this.getKey("token");
        var success = '';
        switch (layerName) {

          case 'gateLayer'://水闸
            stn_type = '闸站';
            success = function (res) {
              if(res.data.code=='0004'){
                  clearInterval(refreshInterval);
              }
              that.$Loading.finish();
              that.gateData = res.data.result;

            }
            break;
          case 'pumpLayer'://泵站
            stn_type = '泵站',
              success = function (res) {
                that.$Loading.finish();
                that.pumpData = res.data.result;
              }
            break;
          case 'dpumpLayer'://电排站
            stn_type = '电排站';
            success = function (res) {
              that.$Loading.finish();
              if(res.data.result){
                that.dpumpData = res.data.result;
              }

            }
            break;
        }
        var params = {
          url: url,
          token: token,
          data: {
            "orders": "datetime",
            "system_id": parameters.system_id,
            "searchValue": {"stn_type": stn_type, "town": "西樵"}
          },
          success: success,
        };
        this.ajaxPost(params);
      },
      changeMapLayer: function(baseLayerShow, heightLayerShow, panoramaLayerShow) {
        baseLayer.setVisible(baseLayerShow);
        // heightLayer.setVisible(heightLayerShow);
        panoramaLayer.setVisible(panoramaLayerShow);
        panoramaLayer1.setVisible(panoramaLayerShow);
        nanhaiFoshanLayer.setVisible(panoramaLayerShow);
      },

      displayFeatureInfo:function (evt) {
        var features = [];
        var layerNames = [];
        map.forEachFeatureAtPixel(evt.pixel,function(feature,layer){
            features.push(feature);
            if(layer){
                layerNames.push(layer.get('name')==null?"":layer.get('name'));
            }
        });
        if(features.length > 0){
            switch (layerNames[0]){
              case 'sssq':
                this.$bus.emit('sssqMsgBox',features[0].get('content'), 'sssq');
                break;
              case 'sslq':
                this.$bus.emit('sssqMsgBox',features[0].get('content'), 'sslq');
                break;
              case 'sscw':
                this.$bus.emit('sssqMsgBox',features[0].get('content'), 'sscw');
                break;
              case 'ssyq':
                this.$bus.emit('ssyqRowClick',features[0].get('content'), false)
                  break;

            }
        }
      },
      getBasemap: function(){
        return map;
      },

      mapOperator: function (type, params) {
        switch (type) {

          case 'setCenterAndZoom':
            this.setCenterAndZoom(params.point, params.zoom);
            break;

        }
      },
      //设置地图中心和层级
      setCenterAndZoom: function (point, zoom) {
        map.getView().setCenter(point);
        if (zoom) {
          map.getView().setZoom(zoom);
        }
      },
    }
  }
</script>
