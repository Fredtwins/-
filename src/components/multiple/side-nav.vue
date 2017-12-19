<!-- 综合管理侧边栏 -->
<style lang="less">
@import url("../../../static/less/color.less");
.multiple-nav{
    .ivu-menu-light{
        color:white;
        background-color: @navBg!important;
        height: calc(~"100vh - 63px");
    }
    .ivu-menu-submenu-title{
    	padding: 9.5px 24px!important;
        background-color: @navColor;
    }
    .ivu-menu-submenu-title:hover{
    	color: @navColor!important;
    }
    .ivu-menu-submenu-title:hover span{
    	color: @navColor!important;
    }
    .ivu-menu-item-selected{
        color: rgb(100,186,255)!important;
        background-color: white;
    }
    .yellow{
        color: yellow;
    }
}
</style>


<template>
	<div class="multiple-nav">
		<i-col span="4">
                    <Menu active-name="multiple" width="auto" :open-names="['2','3','4','5']" @on-select="clickFn">
	                    <div class="ivu-menu-submenu-title" style="margin-bottom: 2px" @click="clickFn('noticeRelease')">
	                    	<span v-bind:class="{ yellow: notice2}"><span class="iconfont icon-tongzhijilu"></span> 通知记录</span>
	                    </div>
                        
                        <Submenu name="2">
                            <template slot="title">
                                <span v-bind:class="{ yellow: jicu2}"><span class="iconfont icon-jichuxinxi"></span> 基础信息</span>
                            </template>
                            <Menu-item v-for="i in nav2" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}</Menu-item>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <span v-bind:class="{ yellow: system2}"><span class="iconfont icon-system"></span> 系统管理</span>
                            </template>
                            <Menu-item v-for="i in nav3" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}</Menu-item>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <span v-bind:class="{ yellow: duty2}"><span class="iconfont icon-zhibanxinxi"></span> 值班管理</span>
                            </template>
                            <Menu-item v-for="i in nav4" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}</Menu-item>
                        </Submenu>
                        <Submenu name="5">
                            <template slot="title">
                                <span v-bind:class="{ yellow: dispath2}"><span class="iconfont icon-zhibanxinxi"></span> 调度管理</span>
                            </template>
                            <Menu-item v-for="i in nav5" @click="clickFn(i.link)" style="cursor:pointer" :name="i.link">{{i.name}}</Menu-item>
                        </Submenu>
                    </Menu>
        </i-col>
	</div>
</template>


<script>
    export default {
        data () {
            return {
				nav1: [{
						name:"通知记录",
						link:"noticeRelease"
					}
				],
				nav2 :[{
						name:'泵站信息管理',
						link:"pumpStation"	
					  },{
						name:"闸站信息管理",
						link:"gateStation"
				      }
			  	],
			  	nav3 :[{
						name:'部门管理',
						link:"department"	
					  },{
						name:"人员管理",
						link:"user"
				      },{
				      	name:"角色管理",
				      	link:"Rolename"
				      }/*,{
				      	name:"系统日志",
				      	link:"systemJournal"
				      }*/
			  	],
			  	nav4 :[{
						name:'值班表',
						link:"dutyTable"	
					  },{
						name:"值班人员管理",
						link:"dutyUser"
				      },{
				      	name:"值班记录查询",
				      	link:"duty"
				      }
			  	],
			  	nav5 :[{
			  		name: "调度预案管理",
			  		link: "authority"
			  	}],
			  	notice: true,
			  	notice2: false,
			  	jicu: true,
			  	jicu2: false,
			  	system: true,
			  	system2: false,
			  	duty: true,
			  	duty2: false,
			  	dispath: true,
			  	dispath2: false
            }
        },
		methods: {
			clickFn: function(name) {
				this.$router.push('/home/multiple/' + name);
				if(name === 'noticeRelease'){
					this.notice = false;
					this.notice2 = true;
					this.jicu = true;
			  		this.jicu2 = false;
			  		this.system = true;
			  		this.system2 = false;
			  		this.duty = true;
			  		this.duty2 = false;
			  		this.dispath = true;
			  		this.dispath2 = false;
				}
				if(name === 'pumpStation' || name === 'gateStation'){
					this.notice = true;
					this.notice2 = false;
					this.jicu = false;
			  		this.jicu2 = true;
			  		this.system = true;
			  		this.system2 = false;
			  		this.duty = true;
			  		this.duty2 = false;
			  		this.dispath = true;
			  		this.dispath2 = false;
				}
				if(name === 'department' || name === 'user' || name === 'Rolename' || name === 'authority' || name ==='systemJournal'){
					this.notice = true;
					this.notice2 = false;
					this.jicu = true;
			  		this.jicu2 = false;
			  		this.system = false;
			  		this.system2 = true;
			  		this.duty = true;
			  		this.duty2 = false;
			  		this.dispath = true;
			  		this.dispath2 = false;
				}
				if(name === 'dutyTable' || name === 'dutyUser' || name === 'duty'){
					this.notice = true;
					this.notice2 = false;
					this.jicu = true;
			  		this.jicu2 = false;
			  		this.system = true;
			  		this.system2 = false;
			  		this.duty = false;
			  		this.duty2 = true;
			  		this.dispath = true;
			  		this.dispath2 = false;
				}
				if(name === 'authority'){
					this.notice = true;
					this.notice2 = false;
					this.jicu = true;
			  		this.jicu2 = false;
			  		this.system = true;
			  		this.system2 = false;
			  		this.duty = true;
			  		this.duty2 = false;
			  		this.dispath = false;
			  		this.dispath2 = true;
				}
			}
		}
    }
</script>
