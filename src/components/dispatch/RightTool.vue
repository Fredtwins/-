 <template>
	<div class="rightTool"  v-show="rightToolshow">
		<header class="rightToolHeader">
			<div>{{headTitle}}</div>
      <div class="rightToolClose" @click="rightToolshow=false">X</div>
		</header>
		<section class="rightToolContent">
      <div v-show="currView.name=='sssq'">
        <div class="optionTitle">站点分组</div>
        <Select placeholder="站点分组" v-model="sqStationGroup" @on-change="sqStationGroupChange" >
          <Option v-for="item in sqStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
        </Select>

        <div class="optionTitle">当前水位
          <Checkbox style="float:right;" v-model="sssqAutoRefresh" @on-change="sssqRefresh" >自动刷新</Checkbox>
        </div>
        <Table size="small" width="287" height="400" border :columns="sssqHead" :data="sssqList" ></Table>
      </div>

      <div v-show="currView.name=='ssyq'">
        <div class="optionTitle">区域</div>
        <Select placeholder="区域" v-model="ssyqSelected">
          <Option v-for="item in regionList" :key="item" :value="item.region">{{ item.region }}</Option>
        </Select>
        <div class="optionTitle">站点分组</div>
        <Select placeholder="站点分组" v-model="yqStationGroup">
          <Option v-for="item in yqStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
        </Select>
        <div class="optionTitle">数据时间</div>
        <Date-picker type="datetime" v-model="SSYLSDate" placeholder="选择日期和时间"></Date-picker>
        <div class="rightToolAlign">至</div>
        <Date-picker type="datetime" v-model="SSYLEDate" placeholder="选择日期和时间"></Date-picker>
        <div class="rightToolAlign">
          <Button type="primary" long @click="querySSYQ()">查询</Button>
        </div>
        <div class="optionTitle">时雨量数据
          <Checkbox style="float:right;" v-model="ssyqAutoRefresh" @on-change="ssyqRefresh">自动刷新</Checkbox>
        </div>
        <Table size="small" width="287" height="230" border :columns="ssyqHead" :data="ssyqList" ></Table>
      </div>

      <div v-show="currView.name=='sslq'">
        <div class="optionTitle">站点分组</div>
        <Select placeholder="站点分组" @on-change="lqStationGroupChange" v-model="lqStationGroup">
          <Option v-for="item in lqStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
        </Select>
        <div class="optionTitle">当前积水深度
          <Checkbox style="float:right;" v-model="sslqAutoRefresh" @on-change="sslqRefresh">自动刷新</Checkbox>
        </div>
        <Table size="small" width="287" height="450" border :columns="sslqHead" :data="sslqList"></Table>
      </div>
      <div v-show="currView.name=='sscw'">
        <div class="optionTitle">站点分组</div>
        <Select placeholder="站点分组" @on-change="cwStationGroupChange" v-model="cwStationGroup">
          <Option v-for="item in cwStationGroupList" :key="item" :value="item.stn_group_name">{{ item.stn_group_name }}</Option>
        </Select>

        <div class="optionTitle">当前潮位
          <Checkbox style="float:right;" v-model="sscwAutoRefresh" @on-change="sscwRefresh">自动刷新</Checkbox>
        </div>
        <Table size="small" width="287" height="450" border :columns="sscwHead" :data="sscwList"></Table>
      </div>
		</section>
	</div>
</template>

<script>

export default {

	data() {
		return {
      rightToolshow: false,
      headTitle: '',
      /*水雨情*/
      sssqHead: [
        {
          title: '站点名称',
          key: 'stn_name',
          fixed: 'left',
          width: 100
        },
        {
          title: '数据时间',
          key: 'data_time',
          width: 110
        },
        {
          title: '水位(米)',
          key: 'water_level',
          width: 77
        },
        {
          title: '警戒水位(米)',
          key: 'alarm_l1',
          width: 70
        },
        {
          title: '超警标志',
          key: 'trend_flag',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: 'static/img/featureImg/' + params.row.trend_flag + '.png'
              }
            });
          },
          width: 60
        }],
      sssqList: [],
      ssyqHead: [
        {
          title: '站点名称',
          key: 'stn_name',
          width: 177
        },
        {
          title: '雨量(米)',
          key: 'rainfull',
          width: 110
        }],
      ssyqList: [],
      sslqHead: [
        {
          title: '站点名称',
          key: 'stn_name',
          width: 100
        },
        {
          title: '数据时间',
          key: 'data_time',
          width: 110
        },
        {
          title: '水位(米)',
          key: 'water_level',
          width: 77
        }],
      sslqList: [],
      sscwHead: [
        {
          title: '站点名称',
          key: 'stn_name',
          width: 100
        },
        {
          title: '数据时间',
          key: 'data_time',
          width: 110
        },
        {
          title: '潮位(米)',
          key: 'ms_tide',
          width: 77
        }],
      sscwList: [],

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
		}
	},
  created() {
    this.$bus.on('syqShow', this.choose);
  },
  beforeDestroy() {
    this.$bus.off('syqShow', this.choose);
  },
  mounted(){
    this.$nextTick(() => {
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
           // console.log(result.data);
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


    })
  },
	methods: {
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
            this.sssqList = result.data.result.result;
            // this.changeLayerFeature(SSSQLayer, result.result.result, 'trend_flag', 'stn_name');
            setTimeout(this.sssqRefresh, 10000);
          } else {
            this.$Message.error('请先选择区域');
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
            this.sslqList = result.data.result.result;
            //this.changeLayerFeature(SSLQLayer, result.result.result, 'trend_flag', 'stn_name');
            setTimeout(this.sslqRefresh, 10000);
          } else {
            this.$Message.error('请先选择区域');
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
           // this.changeLayerFeature(SSCWLayer, result.result.result, 'trend_flag', 'stn_name');
            setTimeout(this.sscwRefresh, 10000);
          } else {
            this.$Message.error(result.message);
          }
        };
        this.ajaxPost(params);
      }

    },
    querySSYQ: function () {
      var that = this;
      if (this.ssyqSelected) {
        var params = {};
        params.token = this.getKey('token');
        params.url = 'wtxiqiao/realdata/meteo/rain/statis';
        params.data = { order: { rainfull: -1 }, searchValue: { stn_group_name: this.yqStationGroup, region: this.ssyqSelected + this.$searchSeparator + 'like', data_time: this.SSYLSDate.format('yyyy-MM-dd hh:mm:ss') + this.$searchSeparator + this.SSYLEDate.format('yyyy-MM-dd hh:mm:ss'), data_interval: 'H1' } };
        params.success = (result) => {
          that.$Loading.finish();
          if (result.data.code == '0000') {
            this.ssyqList = result.data.result.result;
            //this.changeLayerFeature(SSYQLayer, result.result.result, 'rain_level', 'stn_name');
          } else {
            this.$Message.error(result.data.message);
          }
        };
        this.ajaxPost(params);

      } else {
        this.$Message.error('请先选择区域');
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
            this.ssyqList = result.data.result.result;
            // this.changeLayerFeature(SSYQLayer, result.result.result, 'rain_level', 'stn_name');
            setTimeout(this.ssyqRefresh, 10000);
          } else {
            this.$Message.error(result.data.message);
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
            //this.changeLayerFeature(SSSQLayer, result.result.result, 'trend_flag', 'stn_name');
          } else if (pType == 'sslq') {
            that.sslqList = result.data.result.result;
            //this.changeLayerFeature(SSLQLayer, result.result.result, 'trend_flag', 'stn_name');
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
            //this.changeLayerFeature(SSCWLayer, result.result.result, 'trend_flag', 'stn_name');
          } else {
            this.$Message.error(result.data.message);
          }
        }
      });
    },
    choose: function (item) {
      if (item.selected) {
        this.rightToolshow = true;
        this.currView.name = item.code;
        this.headTitle = item.righTitle;
      }
    },
	}
}

</script>


<style scoped lang="less">
.rightTool {
	width: 330px;
	position: absolute;
  top: 80px;
  left: 280px;
	transition: all .8s ease-in-out;
}



.rightToolHeader {
	width: 100%;
	height: 32px;
	background-color: #008cee;
	color: white;
	line-height: 32px;
	font-size: 18px;
	text-align: center;
	position: relative;
  .rightToolClose{
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
  .rightToolClose:hover{
    color: #444444;
  }
}


.rightToolContent {
	width: 100%;
	height: 585px;
	border: 1px solid #008cee;
	background-color: white;
	display: flex;
	position: relative;
}


</style>
