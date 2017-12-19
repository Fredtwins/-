<!--登陆页面-->
<style lang="less">
	.login-content {

		position: relative;
		height: 100%;
		background: url('../../../static/img/login/BG.jpg');
		background-size: cover;

		.login-right {

			position: absolute;
			right: 2vw;
			top: 2vh;

			.logo {

				width: 37vw;
				padding-bottom: 2vh;
				text-align: center;

				img {
					width: 100%;
					max-width: 525px;
				}
			}
			.input-group {

				margin: 0 2vw;
				padding: 3vh 0;
				text-align: center;
				background: rgba(26, 117, 255, 0.6);

				h1 {
					padding-bottom: 20px;
					color: #fff;
					font-size: 24px;
				}

				p {
					padding-bottom: 30px;

					.ivu-input-wrapper{
						width: 65%;
						height: 45px;

						.ivu-input {
							height: 100%;
						}

						.ivu-icon {

							height: 100%;
							line-height: 45px;
							font-size: 23px;
						}
					}

					.ivu-btn {
						width: 65%;
						height: 50px;
						font-size: 23px;
						background: #4fceaa;
					}
				}
			}
		}
	}
</style> 

<template>
	<div class="login-content">
		<div class="login-right">
			<div class="logo">
				<img src="../../../static/img/login/LOGO.png" alt="">
			</div>
			<div class="input-group">
				<h1>用户登录</h1>
				<p><Input v-model="username" autofocus icon="person" placeholder="请输入账号"></Input></p>
				<p><Input v-model="password" @on-enter="submit" type="password" icon="locked" placeholder="请输入密码"></Input></p>
				<p><Button type="success" @click="submit">登录</Button></p>
				
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			url: 'wtxiqiao/sys/userinfo/login',
			username: '',
			password: ''
		}
	},
	methods: {
		submit: function() {
			if (this.username === '') {
				this.$Notice.warning({
					title: '请输入账号名'
				});
				return;
			}
			if (this.password === '') {
				this.$Notice.warning({
					title: '请输入账号密码'
				});
				return;
			}

			var that = this;
			var params = {};
			params.data = {};
			// 将用户名和密码 url地址赋值
			params.data.username = this.username;
			params.data.password = this.password;
			params.data.system_id = parameters.system_id;
			params.url = this.url;
			// 成功的回调函数
			params.success = function(res) {
				that.$Loading.finish();
				console.log(res.data);
				if (res.data.code === '0000') {
					that.$Message.info({
						content: '登录成功',
						duration: 1,
						onClose: function() {
							// console.log(res.data.result);
							// console.log(res);
							// 传入各种参数
							that.setKey('realname', res.data.result.realname);
							that.setKey('department', JSON.stringify(res.data.result.department));
							that.setKey('username', res.data.result.username);
							that.setKey('token',    res.data.result.token);
							that.setKey('userid',   res.data.result.userid);
							that.setKey('_id',   res.data.result._id);
							that.setKey('roles',    JSON.stringify(res.data.result.roles));
							that.setKey('alermSound', true);
							// 跳转到首页
							that.$router.push('/home/monitor');

              that.$store.state.currentPath ='monitor';	
						}
					});
				} else {
					that.$Notice.warning({
						title: '登录失败'
					});
				}
			}
			this.ajaxPost(params);
		}
	}
}
</script>
