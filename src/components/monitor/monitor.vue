<!-- 综合监测 -->
<style lang="less" scoped>
@import url("../../../static/less/color.less");
.monitor-container {
	height: calc(~"100% - 1px");
	padding: 0;
	margin: 5px 0 0 0!important; 
	.monitor-container-col {
		height: 100%;
		padding:0 5px 15px!important;
	}
}
</style>

<template>
	<Row :gutter="16" class="monitor-container">
		<Col v-show="!$store.state.monitorMiddleBig" span="5" class="monitor-container-col">
			<control></control>
		</Col>
		<Col :span="$store.state.monitorMiddleBig ? 24 : 14" class="monitor-container-col">
			<water-electric></water-electric>
		</Col>
		<Col v-show="!$store.state.monitorMiddleBig" span="5" class="monitor-container-col">
			<other-info></other-info>
		</Col>
	</Row>
</template>


<script>
	import 'jquery';
	import control from './control.vue';
	import waterElectric from './waterElectric.vue';
	import other from './other.vue';
    export default {
        data () {
            return {

            }
        },
		components: {
			'control': control,
			'water-electric': waterElectric,
			'other-info': other
		}
    }
</script>
