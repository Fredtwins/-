<!--首页页面-->
<style lang="less">
	@import url("../../../static/less/color.less");
	@import url('../../../static/font/iconfont.css');
	.home {
		width: 100%;
		height: 100%;
		
		header {
		}

		.homeContent {
			height: calc(~"100% - 65px");
		}
	}

	.ivu-card-head {
		padding: 3px 16px!important;

		p {
			height: 29px!important;
		    line-height: 29px!important;
		}
	}
</style>

<template>

	<div class="home flexColBox">
		<loading v-show="this.$store.state.isLoadingShow"></loading>
		<header class="homeHeader">
			<top-nav></top-nav>
		</header>
		<section class="homeContent relative"> 
			<!-- <transition name="appFade"> -->
				<router-view></router-view>
			<!-- </transition> -->
		</section>
	</div>
</template>

<script>
	import topNav from '../public/topNav.vue';
	import loading from '../public/loading.vue';

	export default {
		data () {
            return {

            }
        },
		components: {
			'top-nav': topNav,
			'loading': loading
		}
	}
</script>
