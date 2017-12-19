<template>
  <div id="basechart">
  </div>
</template>

<script>
let baseChart = null;
export default {
  props: {
    canResize: {
      type: Boolean,
      default: true
    }
  },
  mounted() {

    let chartContainer = document.getElementById('basechart')

    // 基于准备好的dom，初始化echarts实例
    baseChart = echarts.init(chartContainer);
    if (this.canResize){
      //用于使chart自适应高度和宽度
      window.onresize = function () {
        chartContainer.style.height = (window.innerHeight - 90) + 'px';
        baseChart.resize();
      };
    }
  },
  methods: {
    setOption: function (option) {
      baseChart.clear();
      baseChart.setOption(option);
    },
    showLoading: function () {
      baseChart.showLoading();
    },
    hideLoading: function () {
      baseChart.hideLoading();
    },
    getBaseChart: function () {
      return baseChart;
    },
    save:function(){
      return baseChart.getDataURL('jpeg',undefined,undefined,['toolbox']);
    }
  }
}

</script>
