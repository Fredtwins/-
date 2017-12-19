//全局js
import Vue from 'vue';
import axios from 'axios';
import store from '../vuex/store';

Object.assign(Vue.prototype, {
	static: 'static/',
	ajaxGet(obj) {
		axios({
			method: 'get',
			url: this.static + 'json/' + obj.url,
		}).then(obj.success);
	},
	ajaxPost(obj) {
		var that = this;
		this.$Loading.start();
		axios({
			method: 'post',
			url: parameters.domain + obj.url,
			data: obj.data,
			headers: {
				token: obj.token
			}
		}).then(
			function(res) {
				that.$store.state.isLoadingShow = false;
				that.$Loading.finish();
				switch (res.data.code) {
					case '0004':
					  //当登录失败提示框没有显示和当前页面不是登录页面时提示
						if (!that.$store.state.isNoticeLogin && that.$store.state.currentPath!='login') {
							that.$store.state.isNoticeLogin = true;
							that.$Notice.open({
								title: res.data.message + ',请重新登录',
								onClose: function() {
									that.$store.state.isNoticeLogin = false;
									that.$router.push('/login');
                  					that.$store.state.currentPath = 'login';

								}
							});

						}
						break;
					case '0005':
						that.$Notice.open({
							title: res.data.message
						})
						break;
					default:
						obj.success(res);
						break;
				}
			}

		).catch(function(res) {
			that.$store.state.isLoadingShow = false;
		});
	},
  waterAjaxPost(obj) {
    axios({
      method: 'post',
      url: "http://202.105.25.138:20465" + obj.url + "?system_id=1000000'",
      data: obj.data,
      headers: {
        token: '12345678'
      }
    }).then((res) => {
      let data = res.data;
      if(data.code === "0000") {
        obj.success(data.result);
      }else if(data.code === "0001") {
        this.returnLogin();
      }else {
        obj.error(data);
      }
    }).catch((res) => {
      this.errorWarn("操作失败",res.message);
    });
  },
	/*设置本地存储数据*/
	setKey: function(key, val) {
		if(this.getKey(key)) {
			window.localStorage.removeItem(key);
		}
		window.localStorage.setItem(key, val);
	},
	/*删除本地存储数据*/
	removeKey: function(key) {
		window.localStorage.removeItem(key);
	},
	/*取本地存储数据*/
	getKey: function(key) {
		if(window.localStorage) {
			return window.localStorage.getItem(key);
		}
	},
	/*获取地址栏查询参数的值*/
    getParameter: function(key) {
	    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
	    var r = decodeURI(window.location.search).substr(1).match(reg);
	    if (r != null) alert(unescape(r[2]));
	},
	//获取表格的宽度 高度
	getTableSize: function(parent, siblings, tableSize) {
		/*
		* parent:    上一级元素 如 '.water-electric-card'
		* siblings:  同级元素 如 ['.ivu-card-head', '.btnArea']
		* tableSize: 存放表格宽高的字段 如 'rainTableSize'
		* rainTableSize: {
		*	width: 100,
		*	height: 100
		* }
		*/
		var that = this;
		// 解决innerWidth()计算不准确
		setTimeout(function() {
			that[tableSize].height = $(parent).innerHeight();
			for (var i in siblings) {
				that[tableSize].height -= $(parent).find(siblings[i]).outerHeight();
			}
			that[tableSize].width = $(parent).innerWidth();
		},50);
	}
});

Object.assign(Date.prototype, {
	format(format) {
		var o = {
			'M+': this.getMonth() + 1, //month
			'd+': this.getDate(), //day
			'h+': this.getHours(), //hour
			'm+': this.getMinutes(), //minute
			's+': this.getSeconds(), //second
			'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
			'S': this.getMilliseconds() //millisecond
		}

		if(/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}

		for(var k in o) {
			if(new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
		return format;
	}
});

Vue.prototype.$ajax = (obj) => {
	let url = 'static/json/';
	axios.get(url + obj.url).then(obj.callback);
}
Vue.prototype.$MapAjaxRequest = (pInterfaceId, pToken, pcollection, successCallback, errorCallback) => {
  axios.post('http://192.168.2.121:8080/wtxiqiao/waterresource/'+pInterfaceId+ '/list', {params: pcollection},{headers: {token: pToken}}).then((response) => {
    successCallback(response.data);
  }).catch(error => {
    errorCallback(error);
  });
}
Vue.prototype.$MapAjaxRequest1 = (pInterfaceId, pToken, pcollection, successCallback, errorCallback) => {
	axios.get('http://192.168.80.210:8233/Gykj_DataSharing/' + pcollection + '/runCommand', { params: { interfaceId: pInterfaceId, userId: 'apitester2', pwd: '12345678', token: pToken } }).then((response) => {
		successCallback(response.data);
	}).catch(error => {
		errorCallback(error);
	});
}
Vue.prototype.$treeModelAjaxRequest = (pInterfaceId, pToken, pcollection, url, successCallback, errorCallback) => {
	axios.get('http://202.105.25.138:20465/Gykj_DataSharing/' + pcollection + '/runCommand?interfaceId=' + pInterfaceId + '&userId=apitester2&pwd=12345678&token=' + pToken + '&' + url).then((response) => {
		successCallback(response.data);
	}).catch(error => {
		errorCallback(error);
	});
}
Vue.prototype.$treeModelAjaxRequest1 = (pInterfaceId, pToken, pcollection, url, successCallback, errorCallback) => {
	axios.get('http://192.168.80.210:8233/Gykj_DataSharing/' + pcollection + '/runCommand?interfaceId=' + pInterfaceId + '&userId=apitester2&pwd=12345678&token=' + pToken + '&' + url).then((response) => {
		successCallback(response.data);
	}).catch(error => {
		errorCallback(error);
	});
}

Vue.prototype.$WaterAjax =(lat, lng, tolerance, successCallback, errorCallback) => {
  axios.get('http://202.105.25.138:20462/arcgis/rest/services/data_visualization/guangdong_waterbody_entire/MapServer/identify?geometry=%28' + lat + '%2C' + lng + '%29&geometryType=esriGeometryPoint&sr=&layers=&layerDefs=&time=&layerTimeOptions=&tolerance=' + tolerance + '&mapExtent=111%2C20%2C114%2C26&imageDisplay=imageDisplay%3D600%2C550%2C96&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&dynamicLayers=&returnZ=false&returnM=false&gdbVersion=&f=pjson').then((response) => {
    successCallback(response.data);
  }).catch(error => {
    errorCallback(error);
  });
}
//水雨情
Vue.prototype.$webApiBase = 'http://121.201.43.239:8080/wtxiqiao/';
Vue.prototype.$searchSeparator = '|#|';
Vue.prototype.$http = axios.create({
  baseURL: Vue.prototype.$webApiBase
});
Vue.prototype.$httpPost = function (url, option, okCallback) {

  return Vue.prototype.$http.post(url, option)
    .then((response) => {
      if (okCallback) {
        okCallback(response.data);
      }
    })
    .catch(function (error) {
      Vue.prototype.$Message.error(error);
    })
};
Vue.prototype.$AddDays = function (days, hour, minute, second) {
  var timeAdd = new Date();
  timeAdd.setDate(timeAdd.getDate() + days);
  timeAdd.setHours(hour == undefined ? timeAdd.getHours() : hour);
  timeAdd.setMinutes(minute == undefined ? timeAdd.getMinutes() : minute);
  timeAdd.setSeconds(second == undefined ? 0 : second);
  return timeAdd;
};
Vue.prototype.$getInfoTableStr = function (content, column) {
  let tableStr = '<table class="tableCustom"><thead></thead><tbody>';
  if (content) {
    for (let index in column) {
      let item = column[index];
      let columnValue = item.split("|");
      tableStr += "<tr><td width='30%'>" + columnValue[0] +
        "</td><td width='70%'>" +
        (content[columnValue[1]] == null ? '--' : content[columnValue[1]]) +
        "</td></tr>";
    }
  } else {
    tableStr += '<tr><td colspan="2">暂时没有数据！</td>';
  }
  tableStr += '</tbody></table>'
  return tableStr;
};
Vue.prototype.$showMapLayer = function (layer,trueOrfalse) {
  layer.setVisible(trueOrfalse);
}





/*json对象转dataType对象*/
// function getDataType(json) {
//
//     var a = Object.keys(json).map(
//         function(k) {
//             return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
//         }
//     ).join('&');
//
// 	return a;
// }


