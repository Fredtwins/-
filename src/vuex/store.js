import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex)

// 应用初始状态
const state = {
    mapCount: {
        typhoon: false,
        cloud: false,
        radar: false,
        isWater: false,
        mapInfoShow: false,
        strivInfo: {},
    },
    // 全屏loading
    isLoadingShow: false,
    // 综合监测-实时监测 全屏显示
    monitorMiddleBig: false,
    // 提示重新登录flag
    isNoticeLogin: false,
    currentPath: '',//标识浏览器当前route,
}

// 定义所需的 mutations
const mutations = {
  setIsWater(state,bol) {
    state.mapCount.isWater = bol;
  },
  setStrivInfo(state,obj) {
    state.mapCount.strivInfo = obj;
  },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
