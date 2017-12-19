 <!-- 顶部导航栏 -->
<style lang="less">
@import url("../../../static/less/color.less");
.topNav {
	background: url('../../../static/img/public/BG1_01.png');
	background-size: cover;
	.logo {
		float: left;
		width: 30%;
		height: 60px;
		line-height: 60px;
		color: #fff;

		img {
			width: 100%;
			vertical-align: middle;
		}
	}
	.warn {
		float: left;
		height: 60px;
		width: calc(~"70% - 600px");
		padding: 0 0 0 1%;
		line-height: 60px;
		color: #fff;
		overflow: hidden;

		p {
			height: 60px;
			font-size: 20px;
			font-weight: bold;
			color: yellow;
		}

		span {
			color: white;
		}
	}
	.funcBtn {
		height: 60px;
		float: right;

		.ivu-menu {

			background: none;

			.ivu-menu-item {
				height: 60px;
				padding: 0 5px;
				font-size: 16px!important;
				font-weight: bold;
				color: #fff;

				&.ivu-menu-item-active, &.ivu-menu-item-selected {
					color: @yellow;
					border-bottom: 3px solid @yellow;
					height: 60px;
				}

				&:hover{
					color: @yellow;
				}
			}



			.ivu-menu-submenu {
				padding: 0 5px;
				font-size: 16px;
				font-weight: bold;
				color: #fff;

				.ivu-menu-item:hover{
					color:@navColor!important;
				}

				.ivu-menu-submenu-title{
					font-size: 16px;
					font-weight: bold;
				}

				.ivu-select-dropdown {

					.ivu-menu-item {
						padding: 8px 4px;
					}
				}
			}
		}
	}



	/* 定义blink类*/
	.blink{
	    animation: blink 3s linear infinite;
	    /* 其它浏览器兼容性前缀 */
	    -webkit-animation: blink 3s linear infinite;
	    -moz-animation: blink 3s linear infinite;
	    -ms-animation: blink 3s linear infinite;
	    -o-animation: blink 3s linear infinite;

	    }

	/* 定义keyframe动画，命名为blink */

	@keyframes blink{
	  0%{opacity: 1;}
	  50%{opacity: 1;}
	  50.01%{opacity: 0;} /* 注意这里定义50.01%立刻透明度为０，可以设置闪烁效果 */
	  100%{opacity: 0;}
	}

	/* 添加兼容性前缀 */

	@-webkit-keyframes blink {
	    0% { opacity: 1; }
	    50% { opacity: 1; }
	    50.01% { opacity: 0; }
	    100% { opacity: 0; }
	}

	@-moz-keyframes blink {
	    0% { opacity: 1; }
	    50% { opacity: 1; }
	    50.01% { opacity: 0; }
	    100% { opacity: 0; }
	}

	@-ms-keyframes blink {
	    0% { opacity: 1; }
	    50% { opacity: 1; }
	    50.01% { opacity: 0; }
	    100% { opacity: 0; }
	}

	@-o-keyframes blink {
	    0% { opacity: 1; }
	    50% { opacity: 1; }
	    50.01% { opacity: 0; }
	    100% { opacity: 0; }
	}
}

	.hideNav{
		display: none!important;
	}
</style>


<template>
	<div class="topNav clear" v-bind:class="{ hideNav: show}">
		<div class="logo"><img src="../../../static/img/public/LOGO1_03.png" alt=""></div>
		<div class="warn" id="warnRoll">
			<div id="warnContent1">
				<p class="blink" v-if="!i.is_confirmed" v-for="i in alermList">{{i.alert_desc}} <span>{{i.alert_time}}</span></p>
			</div>
			<div id="warnContent2">
				<p class="blink" v-if="!i.is_confirmed" v-for="i in alermList">{{i.alert_desc}} <span>{{i.alert_time}}</span></p>
			</div>
		</div>
		<div class="funcBtn">
		    <Menu mode="horizontal" :theme="theme1" :active-name="pathName" @on-select="clickFn">
		        <!-- <Menu-item name="1">
		            <Icon type="ios-paper"></Icon>
		            综合监测
		        </Menu-item>
		        <Menu-item name="2">
		            <Icon type="ios-people"></Icon>
		            调度管理
		        </Menu-item>
				<Menu-item name="3">
					<Icon type="stats-bars"></Icon>
					运行分析
		        </Menu-item>
		        <Menu-item name="4">
		            <Icon type="settings"></Icon>
		            综合管理
		        </Menu-item>
				<Menu-item name="5">
		            <Icon type="log-out"></Icon>
		            注销
		        </Menu-item> -->
				<template v-for="v in navItem">
					<Submenu v-if="v.child" name="v.link">
						<template slot="title">
			                <span class="iconfont" :class="v.src"></span>
			                {{v.name}}
			            </template>
		                <Menu-item v-for="i in v.child" :name="i.link">{{i.name}}</Menu-item>
			        </Submenu>
					<Menu-item v-else :name="v.link">
			            <span class="iconfont" :class="v.src"></span>
			            {{v.name}}
			        </Menu-item>
				</template>
		    </Menu>
		</div>
		<!-- 模态框 -->
		<Modal
                v-model="changeModal"
                title="修改密码">
               	<Form :model="formItem" :label-width="120">
               		<Form-item label="原密码" prop="oldpsw">
						<Input type="password" v-model="formItem.oldpsw" class="smallInput2" :maxlength="16" placeholder="请输入原密码"></Input><span class="redStar">*</span>
					</Form-item>
					<Form-item label="新密码" prop="newpsw">
						<Input type="password" v-model="formItem.newpsw" class="smallInput2" :maxlength="16" placeholder="请输入新密码"></Input><span class="redStar">*</span>
					</Form-item>
					<Form-item label="再次输入新密码" prop="newpsw2">
						<Input type="password" v-model="formItem.newpsw2" class="smallInput2" :maxlength="16" placeholder="请再次输入新密码"></Input><span class="redStar">*</span>
					</Form-item>
               	</Form>
               	<div slot="footer">
                    <Button  type="primary" @click="ok">保存</Button>
                    <Button  @click="cancel">取消</Button>
                </div>
            </Modal>
	</div>
</template>


<script>
    export default {
        data () {
            return {
				urlGetAlermData: 'wtxiqiao/waterresource/rldalertrealtime/list',
				urlChangePassWord: 'wtxiqiao/sys/userinfo/changepsw',
                theme1: 'dark',
				navItem: [
					{
						name: '综合监测',
						link: 'monitor',
						src: 'icon-monitor'
					}, {
						name: '调度管理',
						link: 'dispatch',
						src: 'icon-dispatch'
					}, {
						name: '功能导航',
						link: 'analysis',
						src: 'icon-analysis'
					}, {
						name: '系统',
						src: 'icon-logout',
						child: [{
							name: "修改密码",
							link: "change-password"
						},{
							name: "用户管理",
							link: "analysis/user"
						},{
							name: "注销",
							link: "logout"
						}]
					}

				],
				formItem: {},
				alermList: [],
				alermRollSpeed: 5000,
				alermTimer: null,
				show: false,
				changeModal: false,
            }
        },
		methods: {
			clickFn: function(name) {
				if(name !== 'change-password'){
					if (name === 'logout') {
						this.removeKey('token');
						this.removeKey('realname');
						this.removeKey('roles');
						this.removeKey('userid');
						this.removeKey('username');
						this.$router.push('/login');
            this.$store.state.currentPath = 'login';
						return;
					}
					this.$router.push('/home/' + name);
				}else{
					this.changeModal = true;
					this.formItem = {
						oldpsw: "",
						newpsw: "",
						newpsw2: ""
					}
				}

			},
			cancel () {
				this.changeModal = false;
			},
			ok () {
				this.changeModal = true;
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				params.url = this.urlChangePassWord;
				params.token = this.getKey('token');
				if(this.formItem.oldpsw !==''){
                   params.data.oldpsw = this.formItem.oldpsw;
                }else{
                    this.$Message.warning({
                            content: '请填写旧密码'
                        });
                    console.log(this.changeModal);
                    return;
                }

                if(this.formItem.newpsw !==''){
                   params.data.newpsw = this.formItem.newpsw;
                }else{
                    this.$Message.warning({
                            content: '请填写新密码'
                        });
                    return;
                }
                if(this.formItem.newpsw2 !==''){
                   if(this.formItem.newpsw !== this.formItem.newpsw2){
	                	this.$Message.warning({
	                            content: '前后输入密码不一致'
	                        });
	                    return;
	                }
                }else{
                    this.$Message.warning({
                            content: '请再次填写新密码'
                        });
                    return;
                }
                params.data._id = this.getKey('_id');
                params.data.username = this.getKey('username');
                params.success = function(res) {
                	switch(res.data.code) {
                    	case '0000':
	                    	that.$Message.success({
	                            content: '修改成功'
	                        });
	                    	that.changeModal = false;
	                    break;
	                    default:
	                    	that.$Message.warning({
	                            content: res.data.message + " 请重新输入"
	                        });
                    }
                }
                this.ajaxPost(params);
			},
			// 报警滚动
			AlermRoll: function() {
				var that = this;
				var container = document.getElementById('warnRoll');
				var content1 = document.getElementById('warnContent1');
				var content2 = document.getElementById('warnContent2');
				var func = function() {
					if (content2.offsetTop - container.scrollTop <= 0) {
						container.scrollTop -= content1.offsetHeight;
					} else {
						// 每次滚动 报警信息content1下面的p的高度
						container.scrollTop += 60;
					}
				}
				this.alermTimer = setInterval(func, this.alermRollSpeed);

				container.onmouseover = function() {
					clearInterval(that.alermTimer);
				}

				container.onmouseout = function() {
					that.alermTimer = setInterval(func, that.alermRollSpeed);
				}
			},
			// 获取报警信息列表
			getAlermData: function(page) {
				var that = this;
				var params = {};
				params.data = {};
				params.data.system_id = parameters.system_id;
				if(typeof page === "string" || typeof page === "number"){
                    params.data.page = parseInt(page);
                }else{
                    params.data.page = 1;
                }
				params.data.pageSize = 10;
				params.data.order = {
					is_confirmed: 1,
					alert_time: -1
				};
				var myDate = new Date();
				params.data.searchValue = {};
				params.data.searchValue.active_time = myDate.format("yyyy-MM-dd hh:mm:ss")+"|#|gte";
				// console.log(params.data);
				params.token = this.getKey('token');
				params.url = this.urlGetAlermData;
				params.success = function(res) {
					that.$Loading.finish();
					// console.log(res.data.result);
					if (res.data.code === '0000') {
						that.alermList = res.data.result.result;
						that.$bus.emit('setAlermTable', res.data.result);
					}
				}
				this.ajaxPost(params);
			},
			//隐藏顶部导航
			hiddeNav: function() {
				this.show = true;
			}
		},
		watch: {
			alermList: function() {
				var that = this;
				clearInterval(this.alermTimer);
				this.alermTimer = null;
				// 有1条报警就滚动
				for (var i in this.alermList) {
					if (!this.alermList[i].is_confirmed) {
						// setTimeout 解决报错
						setTimeout(function(){
							that.AlermRoll();
						}, 20);
						break;
					}
				}
			}
		},
		computed: {
			pathName: function() {
				console.log(this.$route);
				var path = this.$route.fullPath.replace('/home/', '');
				for (var i in this.navItem) {
					if (path.indexOf(this.navItem[i].link) !== -1) {
						return this.navItem[i].link;
					}
				}
			}
		},
		mounted: function() {
			var that = this;
			this.getAlermData(1);
			setInterval(function() {
				that.getAlermData(1);
			}, 300000);
		},
		created() {
			this.$bus.on('showTopNav', this.hiddeNav);
			this.$bus.on('getAlermData', this.getAlermData);
		},
		beforeDestroy() {
			this.$bus.off('getAlermData', this.getAlermData);
			this.$bus.off('showTopNav', this.hiddeNav);
		},
    }
</script>
