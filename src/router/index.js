import Vue from 'vue';
import Router from 'vue-router';
import iView from 'iview';
import store from '../vuex/store';


//登陆页面
import login from '../components/login/login.vue';

//首页页面
import home from '../components/home/home.vue';

//综合监测
import monitor from '../components/monitor/monitor.vue';

//调度管理
import dispatch from '../components/dispatch/aPicture.vue';

//运行分析
import analysis from '../components/analysis/index.vue';

// //综合管理
import multiple from '../components/multiple/index.vue';

//运行记录
//首页统计图
import statisticsChart from '../components/analysis/statistics-chart.vue';

//水位记录查询
import waterRecord from '../components/analysis/water-record.vue';

//泵站记录查询
import pumpRecord from '../components/analysis/pump-record.vue';

//闸门记录查询
import gateRecord from '../components/analysis/gate-record.vue';

//运行分析
//水位极值统计
import waterExtremum from '../components/analysis/water-extremum.vue';

//历史水位曲线对比
import waterHistory from '../components/analysis/water-history.vue';

//泵站运行统计
import pumpStatistics from '../components/analysis/pump-statistics.vue';

//闸门运行统计
import gateStatistics from '../components/analysis/gate-statistics.vue';

//雨量统计
import rainFall from '../components/analysis/rain-fall.vue';

//调度分析
//调度记录查询
import dispatchSelect from '../components/analysis/dispath-select.vue';

//调度统计
import dispatchRecord from '../components/analysis/dispath-record.vue';

//通知管理
//通知发布
import noticeRelease from '../components/multiple/notice-release.vue';

//基础信息
//泵站信息管理
import pumpStation from '../components/multiple/pump-station.vue';

//闸站信息管理
import gateStation from '../components/multiple/gate-station.vue';

//系统管理
//部门管理
import department from '../components/multiple/department.vue';

//人员管理
import user from '../components/multiple/user.vue';

//调度预案管理
import authority from '../components/multiple/authority.vue';

//通知查询
import Rolename from '../components/multiple/role-name.vue';

//值班管理
//值班表
import dutyTable from '../components/multiple/duty-table.vue';

//值班人员管理
import dutyUser from '../components/multiple/duty-user.vue';

//值班记录查询
import duty from '../components/multiple/duty.vue';

//手机内嵌页面主页
import phoneMonitor from '../components/phoneIndex/phone-monitor.vue';
//手机水位曲线
import phoneWaterLevel from '../components/phoneIndex/phone-waterLevel.vue';

//手机网页监测界面
import publicMonitor from '../components/phonepublic/public-monitor.vue';

//手机网页地图
import publicMap from '../components/phonepublic/public-map.vue';

//
import publicRedict from '../components/phonepublic/phone-redict.vue';

//
import video from '../components/dispatch/video.vue';

//功能导航的menu
import menu from '../components/analysis/menu.vue';

import sideNav from '../components/analysis/pump-nav.vue';


Vue.use(Router); 

export const router = new Router({
	routes: [{
		path: '/home',
		component: home,
		children: [{
			path: 'monitor',
			component: monitor,
		}, {
			path: 'dispatch',
			component: dispatch,
		}, {
			path: 'analysis',
			component: analysis,
			children: [{
				path: 'water-record',
				component: waterRecord,
			}, {
				path: 'water-history',
				component: waterHistory,
			}, {
				path: 'pump-statistics',
				component: pumpStatistics,
			}, {
				path: 'gate-statistics',
				component: gateStatistics,
			}, {
				path: 'water-extremum',
				component: waterExtremum,
			}, {
				path: 'pump-record',
				component: pumpRecord,
			}, {
				path: 'gate-record',
				component: gateRecord,
			}, {
				path: 'rain-fall',
				component: rainFall,
			}, {
				path: 'dispatch-select',
				component: dispatchSelect,
			}, {
				path: 'dispatch-record',
				component: dispatchRecord,
			}, {
				path: 'statistics-chart',
				component: statisticsChart,
			}, {
				path: 'menu',
				component: menu,
			}, {
				path: 'department',
				component: department,
			}, {
				path: 'user',
				component: user,
			}, {
				path: 'authority',
				component: authority,
			}, {
				path: 'duty',
				component: duty,
			},{
				path: 'noticeRelease',
				component: noticeRelease,
			},{
				path: 'Rolename',
				component: Rolename,
			},{
				path: 'pumpStation',
				component: pumpStation,
			},{
				path: 'gateStation',
				component: gateStation,
			},{
				path:'dutyTable',
				component: dutyTable,
			},{
				path:'dutyUser',
				component: dutyUser,
			},{
				path:"side-nav",
				component: sideNav,
			}]
		}, {
			path: 'multiple',
			component: multiple,
			children: []
		}, {
			path: 'phoneMonitor',
			component: phoneMonitor,
		}, {
			path: 'phoneWaterLevel',
			component: phoneWaterLevel,
		},{
      path: 'video',
      component: video,
    }]
	}, {
		path: '/login',
		component: login,
		children: []
	}, {
		path: '/phone',
		component: publicMonitor,
		children: []
	}, {
		path: '/publicMap',
		component: publicMap,
		children: []
	}, {
		path: '/phone-redict',
		component: publicRedict,
		children: []
	}]
});

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	if (to.path === '/home/phoneWaterLevel' || to.path === '/home/phoneMonitor') {
		if (to.query.token) {
			Vue.prototype.setKey('token', to.query.token);
		}
	}
	var isLogin = Vue.prototype.getKey('token');
	if(to.path === '/phone' || to.path === '/phone-redict' || to.path === "/home/video") {
		isLogin = true;
	}

	if(to.path !== "/login" && isLogin === null) {
		next('/login');
	} else if (to.path === '/') {
		next('/home/monitor');
	} else if (to.path === '/home/analysis') {
		next('/home/analysis/menu');
	} else if (to.path === '/home/multiple') {
		next('/home/multiple/noticeRelease');
	} else {
		next();
	}
})

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
});
