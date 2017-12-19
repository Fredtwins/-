<style lang="less">

</style>

<template>

</template>

<script>

export default {
	data () {
		return {
			urlLogin: 'wtxiqiao/sys/userinfo/login',
		}
	},
	methods: {
		login: function() {
			var that = this;
			var params = {};
			params.data = {};
			console.log(1111111)
			params.data.username = "public";
			params.data.password = "123456";
			params.data.system_id = parameters.system_id;
			params.url = this.urlLogin;
			params.success = function(res) {
				that.$Loading.finish();
				console.log(res.data);
				if (res.data.code === '0000') {
					console.log(5555555)
					that.setKey('realname', res.data.result.realname);
					that.setKey('department', JSON.stringify(res.data.result.department));
					that.setKey('username', res.data.result.username);
					that.setKey('token',    res.data.result.token);
					that.setKey('userid',   res.data.result.userid);
					that.setKey('roles',    JSON.stringify(res.data.result.roles));
					that.setKey('alermSound', true);
					}
				}
			this.ajaxPost(params);
		}
	},
	mounted: function() {
		MobLink.init();
		var that = this;
		var timer = setInterval(function() {
			if(that.getKey('token')) {
				clearInterval(timer);
			}else{
				that.login();
			}
		}, 200);
	},
}
</script>
