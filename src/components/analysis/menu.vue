<!-- 运行分析侧边栏 -->
<style lang="less">
@import url("../../../static/less/color.less");
.bigMenu{
    width: 100%;
    overflow: hidden;
    .smallMenu{
        height: calc(~"(100vh - 340px)/7");
        text-align: center;
        font-size: 16px;
        line-height: calc(~"(100vh - 340px)/7");
        cursor: pointer;
    }
    .title{
        width: 100%;
        background: #e4f6ff;
        height: 40px;
        float: left;
        font-size: 14px;
        color: #000000; 
    }
    .img-foot{
        width: 100%;
        position: absolute;
        top: 22%;
        left: 0%;
    }
}
</style>


<template>
	<div class="bigMenu">
        <Row v-for="v in navItem">
            <div class="title">
                <img :src="v.src" style="vertical-align: middle" width="40" height="40" alt="">
                {{v.title}}
            </div>
            <Col span="24" class="smallMenu">
                <Row>
                    <Col span="4" v-for="i in v.child" @click.native="clickFn(i.link)">
                        <div style="position:relative;">
                            <img :src="i.src" style="margin-top: 5px" alt="">
                            <span class="img-foot">{{i.name}}</span>   
                        </div>
                        
                    </Col>
                </Row>
            </Col>
        </Row>    
           
    </div>
</template>


<script>
    export default {
        data () {
            return {
                navItem: [{
                    title: "通知",
                    src: "static/img/gongneng/tongzhi.png",
                    child: [{
                        name: "运行看板",
                        link: "statistics-chart",
                        src: "static/img/gongneng/yuxingkanban.png"
                    }, {
                        name: "通知记录",
                        link: "noticeRelease",
                        src: "static/img/gongneng/tongzhijilu.png"
                    }]
                }, {
                    title: "运行分析",
                    src: "static/img/gongneng/yuxingfenxi.png",
                    child: [{
                        name: '水位极值统计',
                        link: 'water-extremum',
                        src: "static/img/gongneng/shuiweijizhi.png"
                    }, {
                        name: '历史水位曲线对比',
                        link: 'water-history',
                        src: "static/img/gongneng/lishishuiwei.png"
                    }, {
                        name: '泵站运行统计',
                        link: 'pump-statistics',
                        src: "static/img/gongneng/bzhanyunxing.png"
                    }, {
                        name: '闸站运行统计',
                        link: 'gate-statistics',
                        src: "static/img/gongneng/zhazhanyunx.png"
                    }, {
                        name: '雨量统计',
                        link: "rain-fall",
                        src: "static/img/gongneng/rain.png"
                    }]
                }, {
                    title: "调度管理",
                    src: "static/img/gongneng/diaoduguanli.png",
                    child: [{
                        name: '调度记录查询',
                        link: 'dispatch-select',
                        src: "static/img/gongneng/diaoduchaxun.png"
                    }, {
                        name: '调度统计',
                        link: 'dispatch-record',
                        src: "static/img/gongneng/diaodutongji.png"
                    }, {
                        name: "调度预案管理",
                        link: "authority",
                        src: "static/img/gongneng/diaoduyuan.png"
                    }]
                }, {
                    title: "运行记录",
                    src: "static/img/gongneng/yuxinjilu.png",
                    child: [{
                        name:'水位记录查询',
                        link:'water-record',
                        src: "static/img/gongneng/shuiweijilu.png"
                    },{
                        name:'泵站运行记录查询',
                        link:'pump-record',
                        src: "static/img/gongneng/pump.png"
                    },{
                        name:'闸站运行记录查询',
                        link:'gate-record',
                        src: "static/img/gongneng/gate.png"
                    }]
                }, {
                    title: "基础信息",
                    src: "static/img/gongneng/jicu.png", 
                    child: [{
                        name:'泵站信息管理',
                        link:"pumpStation",
                        src: "static/img/gongneng/pump-jicu.png"  
                      },{
                        name:"闸站信息管理",
                        link:"gateStation",
                        src: "static/img/gongneng/gate-jicu.png"
                      }
                    ]
                }, {
                    title: "系统管理",
                    src: "static/img/gongneng/system.png",
                    child: [{
                        name:'部门管理',
                        link:"department",
                        src: "static/img/gongneng/department.png"   
                      },{
                        name:"人员管理",
                        link:"user",
                        src: "static/img/gongneng/user.png"
                      },{
                        name:"角色管理",
                        link:"Rolename",
                        src: "static/img/gongneng/role.png"
                      }
                    ]
                }, {
                    title: "值班管理",
                    src: "static/img/gongneng/duty.png", 
                    child: [{
                        name:'值班表',
                        link:"dutyTable",
                        src: "static/img/gongneng/duty-table.png"    
                      },{
                        name:"值班人员管理",
                        link:"dutyUser",
                        src: "static/img/gongneng/duty-user.png"
                      },{
                        name:"值班记录查询",
                        link:"duty",
                        src: "static/img/gongneng/duty-jilu.png"
                      }
                    ],
                }]
   }  	
        },
		methods: {
			 clickFn: function(name) {
                this.$router.push('/home/analysis/' + name)
             }  
		},

    }
</script>
