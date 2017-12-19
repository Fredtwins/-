<!-- 水位开度，电流监控 -->
<style lang="less">
@import url("../../../static/less/color.less");
#phoneMap{
	width: 100%;
	height: 100%;
	overflow: hidden;
	min-width: 320px;
    min-height: 508px;
}
</style>


<template>
	<Row>
		<Col :xs="24">
			<Menu mode="horizontal" @on-select="clickFn" active-name="1">
				<MenuItem name="phone">
                    <Icon type="ios-navigate"></Icon>
                    综合监测
                </MenuItem>
                <MenuItem name="publicMap">
                    <Icon type="ios-keypad"></Icon>
                    站点地图
                </MenuItem>
            </Menu>
		</Col>
		<div id="phoneMap">

		</div>
    </Row>
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
  let geoJsonStyles = {
    "purple": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#7f00ff',
        width: 5
      })
    })],
    "blue": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#0000ff',
        width: 4
      })
    })],
    "red": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        width: 3
      })
    })],
    "green": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#3f7f00',
        width: 2
      })
    })],
    "normal": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#c8d653',
        width: 1
      })
    })],
    "purpleDash": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#7f00ff',
        lineDash: [10],
        width: 5
      })
    })],
    "blueDash": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#0000ff',
        lineDash: [10],
        width: 4
      })
    })],
    "redDash": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ff0000',
        lineDash: [10],
        width: 3
      })
    })],
    "greenDash": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#3f7f00',
        lineDash: [10],
        width: 2
      })
    })],
    "normalDash": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#c8d653',
        lineDash: [10],
        width: 1
      })
    })],
    "famen": [new ol.style.Style({
      image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        src: 'static/img/mapico/famen.png',
        scale: 0.5,
        rotateWithView: true
      }))
    })],
    "geometry": [new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#81F7F3',
        width: 1
      })
    })],
    "pump": [new ol.style.Style({
      image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        src: 'static/img/mapico/beng.png',
        scale: 0.5
      }))
    })],
    "waterfactory": [new ol.style.Style({
      image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        src: 'static/img/mapico/waterFactory.png',
        scale: 0.5
      }))
    })],
    "wastewater": [new ol.style.Style({
      image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        src: 'static/img/mapico/dirtyFactory.png',
        scale: 0.5
      }))
    })],
    "paiwukou": [new ol.style.Style({
      image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 0.5],
        src: 'static/img/mapico/paiwukou.png',
        scale: 0.5
      }))
    })]
  };
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
      this.$bus.emit('showTopNav');

    },
    beforeDestroy() {

    },
    mounted() {
      this.addOverlay("gateLayer");
      this.addOverlay("pumpLayer");
      this.addOverlay("dpumpLayer");
      this.addOverlay("WaterDirectionLayer");
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
          target: phoneMap,
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
      })

    },
	methods: {
		clickFn: function(data) {
			this.$router.push('/' + data);
		},
		addOverlay: function (layerName) {

	        var that = this;
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

	                that.addPointOverlay(eval(layerName), res.data.result);



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
	                that.addPointOverlay(eval(layerName), res.data.result);
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
	                that.addPointOverlay(eval(layerName), res.data.result);
	              }
	            };

	            break;
	          case 'WaterDirectionLayer'://水流方向
	            var params = {
	              // url: 'wtxiqiao/waterresource/bsiinnerriver/list',
	              url: 'wtxiqiao/waterresource/flowlogo/list',
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
    },
	    addWaterDirection (layer, data){
	        layer.iconArr = [];
	        data.map((item, index) => {
	          var waterImg = document.createElement('img');
	          $(waterImg).addClass('over-img').attr({'direction-num': index, 'direction-name': layer.iconName});
	          var transformValue = "rotate(" + item.logoangle + "deg)"
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

		}
}
</script>
