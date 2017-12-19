<!-- 运行分析侧边栏 -->
<style lang="less">
@import url("../../../static/less/color.less");
.analysis-nav{
    .ivu-menu-submenu-title{
        padding: 9.5px 24px!important;
    }
}

</style>


<template>
    <div class="analysis-nav">
        <i-col span="3">
            <Menu ref="stnMenu" width="auto" :open-names="['桑园片','大栅片']" @on-select="selectStn">
                <template v-for="v in stnName">
                    <Submenu :name="v._id">
                        <template slot="title">
                            {{v._id}}
                        </template>
                        <Menu-item v-for="i in v.stn_name" :name="i">{{i}}</Menu-item>
                    </Submenu>
                </template>
            </Menu>
        </i-col>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                stnNameList: "wtxiqiao/waterresource/bsisluicegate/site",
                stnName: []
            }
        },
        methods: {
              getName () {
                    var that = this;
                    var params = {};
                    params.data = {};
                    params.data.system_id = parameters.system_id;
                    params.data.page = 1;
                    params.data.type = '';
                    params.token = this.getKey('token');
                    params.url = this.stnNameList;
                    params.success = function(res) {
                        that.$Loading.finish();
                        that.stnName = res.data.result;
                        that.$nextTick(function() {
                            that.$refs.stnMenu.updateOpened();
                            that.$refs.stnMenu.updateActiveName();
                          })
                    }
                    this.ajaxPost(params);
                    
              },
              selectStn (name) {
                this.$bus.emit("stnName",name);
              }
        },
        mounted:function(){
            this.getName();
        }

    }
</script>
