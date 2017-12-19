<style scoped lang="less">
	@import url("../../../static/less/color.less");
.leadRead{
  position: absolute;
  left: 0px;
  top:2px;
  width: 56px;
  padding-left: 3px;
  height: 100%;
  background-color: white;
  color: rgb(49,49,49);
  .leftMenu{
    .menuType{
      width: 48px;
      border-bottom: 2px solid #ff9b3a;
      font-size: 14px;
      text-align: center;
      color: #ff9b3a;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .menuType:hover{
      color: rgb(255, 130, 29);
    }
    .iconMenu{
      width: 50px;
      height: 50px;
      background: url("../../../static/img/aPicture/leftMenuIcon/unchoose.svg");
      text-align: center;
      margin-bottom: 6px;
      .menuTitle{
        position: absolute;
        margin-top: -10px;
        width: 50px;
        font-size: 12px;
        color: rgb(49,49,49);
        text-align: center
      }
    }
    .active{
      background: url("../../../static/img/aPicture/leftMenuIcon/choose.svg");
    }
  }

}


</style>

<template>

<div class="leadRead">
  <div class="leftMenu">
    <!--水调度菜单-->
    <div class="menuType" @click="waterDispatch=!waterDispatch">水调度</div>
    <div v-show="waterDispatch">
    <div  class="iconMenu" v-for="item in waterDispatchMenu"  :class="{'active':item.selected}" @click="chooseMenu(item)">
      <img :src="item.img"/>
      <div class="menuTitle">{{item.name}}</div>
    </div>
    </div>
    <!--水雨情菜单-->
    <div class="menuType" @click="waterRain=!waterRain">水雨情</div>
    <div v-show="waterRain">
    <div class="iconMenu" v-for="item in waterRainMenu"  :class="{'active':item.selected}" @click="chooseMenu(item)">
      <img :src="item.img"/>
      <div class="menuTitle">{{item.name}}</div>
    </div>
    </div>
    <!--气象菜单-->
    <div class="menuType" @click="weather=!weather">气象</div>
    <div v-show="weather">
    <div class="iconMenu" v-for="item in weatherMenu"  :class="{'active':item.selected}" @click="chooseMenu(item)">
      <img :src="item.img"/>
      <div class="menuTitle">{{item.name}}</div>
    </div>
    </div>
  </div>
</div>

</template>

<script>
	export default {
		props: [],
		components: {

		},
		data() {
			return {
				isIn: true,
        downBol1: false,
				rightActive: 0,
        zhanDianChoose:false,
        currentMainMenu:'waterDispatch',
        waterDispatch:true,
        waterRain:true,
        weather:true,
        waterDispatchMenu:[
          { name: '泵站', layer: 'pumpLayer', selected: true,img: this.static +'img/aPicture/leftMenuIcon/pump.svg',code:'pump',righTitle:'泵站水位信息' },
          { name: '闸站', layer: 'gateLayer', selected: true,img:this.static +'img/aPicture/leftMenuIcon/gate.svg',code:'gate',righTitle:'闸站水位信息'},
          //{ name: '电排站', layer: 'dpumpLayer', selected: true,img:this.static +'img/aPicture/leftMenuIcon/dpump.svg',code:'dpump',righTitle:'电排站水位信息'},
          { name: '水流向',layer:'WaterDirectionLayer', selected: true,img:this.static +'img/aPicture/leftMenuIcon/riverDirection.svg' },
        ],
        waterRainMenu:[
          { name: '水情', layer: 'hydrologyLayer', selected: false ,img: this.static + 'img/aPicture/leftMenuIcon/shuiqing.svg',code: 'sssq',righTitle: '水情信息'},
          { name: '涝情', layer: 'waterloggingLayer', selected: false ,img: this.static + 'img/aPicture/leftMenuIcon/laoqing.svg',code: 'sslq',righTitle: '涝情信息'},
          { name: '潮位', layer: 'tideGaugeLayer', selected: false ,img: this.static + 'img/aPicture/leftMenuIcon/chaowei.svg', code: 'sscw',righTitle: '潮位信息'},
          { name: '雨情',layer:'rainLayer', selected: false,img: this.static + 'img/aPicture/leftMenuIcon/yuqing.svg',code: 'ssyq',righTitle: '雨情信息'}
        ],
        weatherMenu:[
          { name: '台风', layer: 'typhoonLayer', selected: false ,img: this.static + 'img/aPicture/leftMenuIcon/taifeng.svg'},
          { name: '云图', layer: 'cloudLayer', selected: false,img: this.static + 'img/aPicture/leftMenuIcon/yutu.svg' },
          { name: '雷达', layer: 'radarLayer', selected: false,img: this.static + 'img/aPicture/leftMenuIcon/leidatu.svg' }

        ],
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
		mounted: function() {
			this.$nextTick(() => {
				this.initPointOverLayer(this.waterDispatchMenu);
			})
		},
		methods: {
      /*showMenu:function (obj) {
          this.currentMainMenu =obj;
      },*/
      chooseMenu: function(item){
          item.selected = !item.selected;
        switch(item.layer){
          case 'typhoonLayer'://台风
            if (item.selected) {
              this.$store.state.mapCount.typhoon = true;
            }
            break;
          case 'cloudLayer'://云图
            if (item.selected) {
              this.$store.state.mapCount.typhoon = true;
            }
            break;
          case 'radarLayer'://雷达
            if (item.selected) {
              this.$store.state.mapCount.typhoon = true;
            }
            break;
          case 'pumpLayer'://泵站
//						this.$bus.emit('featureMsg', "3242343");
            if(item.selected){

              this.$bus.emit('addOverlay','pumpLayer');
              this.$bus.emit('syqShow',item);

            }else{
              this.$bus.emit('removePointOverlay', 'pumpLayer');
            }
            break;
          case 'dpumpLayer'://电排站
            if(item.selected){
              this.$bus.emit('addOverlay','dpumpLayer');
              this.$bus.emit('syqShow',item);
            }else{
              this.$bus.emit('removePointOverlay', 'dpumpLayer');
            }
            break;
          case 'WaterDirectionLayer'://电排站
            if(item.selected){
              this.$bus.emit('addOverlay','WaterDirectionLayer');

            }else{
              this.$bus.emit('removePointOverlay', 'WaterDirectionLayer');
            }
            break;
          case 'hydrologyLayer'://水情
            if(item.selected){
              this.$bus.emit('syqShow',item);
            }
            this.$bus.emit('showFeatureLayer',item.code,item.selected);
            break;
          case 'rainLayer'://雨情
            if(item.selected){
              this.$bus.emit('syqShow',item);
            }
            this.$bus.emit('showFeatureLayer',item.code,item.selected);
            break;
          case 'waterloggingLayer'://涝情
            if(item.selected){
              this.$bus.emit('syqShow',item);
            }
            this.$bus.emit('showFeatureLayer',item.code,item.selected);
            break;
          case 'tideGaugeLayer'://潮位
            if(item.selected){
              this.$bus.emit('syqShow',item);
            }
            this.$bus.emit('showFeatureLayer',item.code,item.selected);
            break;
          default:
//						this.$bus.emit('featureMsg', "3242343");
            if(item.selected){
              this.$bus.emit('addOverlay',item.layer);
              this.$bus.emit('syqShow',item);
            }else{
              //this.$bus.emit('removeLayer', item.layer);
              this.$bus.emit('removePointOverlay', item.layer);
            }
            break;
        }
      },
      //初始化地图站点图标layer
      initPointOverLayer (layerArray) {
        for(var i in layerArray){
            //if(layerArray[i]['layer']!='WaterDirectionLayer'){
         //layerArray[i]['selected'] = true;
          this.$bus.emit('addOverlay',layerArray[i]['layer'])
            //}
        }
      },


			leadReadContentRightLiClick(count) {
				if (this.isIn) {
					this.isIn = false;
				}
				this.leadReadContentBotLi = this.loadreadContent[count];
				this.rightActive = count;
				//加载水雨情数据
       // this.$bus.emit('initialWaterRain');
			},
      //刷新地图站点图标数据
      refreshPointOverLayer: function () {

          this.waterDispatchMenu.map((item) => {
              if(item.layer==='WaterDirectionLayer'){
                this.$bus.emit('removePointOverlay',item.layer);
              }
             if(item.selected){
                this.$bus.emit('removePointOverlay',item.layer);
                this.$bus.emit('addOverlay',item.layer);
              }
          })

      }
		}
	}
</script>
