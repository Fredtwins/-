<style lang="less">
  .videoModal{
    .ivu-modal{
      .ivu-modal-content{
        background-color: #fff5e6;
        .ivu-modal-header-inner{
          font-size: 16px;
        }
      }
      .ivu-modal-body{
        text-align: center;
      }
    }
  }

</style>
<template>
  <div id="Video">
    <div id="myVideo" style="text-align: center"></div>
    <Modal title="视频插件提示" v-model="tip" class="videoModal" @on-ok="downLoadPlugin">
      <span style="color: #ff262a;font-size: 15px">
        您还未安装过视频插件，请点击确定进行下载!
        安装时请先关闭浏览器！</span>
    </Modal>
  </div>
</template>
<script>
  let iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
  let videoWidth=1920;
  let videoHeight=962;
  let webSocket ='';
  let videoInfo={
    szIP:'172.172.0.152',//设备ip
    szPort:80,//端口
    szUsername:'admin',//账号
    szPassword:'admin12345',//密码
    iChannelID:1,//通道号
    iChannelname:''//通道名
  }
  export default{
    components:{

    },
    mounted(){
      /*if(window.innerHeight){
        videoHeight=window.innerHeight
      }
      if(window.innerWidth){
        videoWidth=window.innerWidth
      }
      alert(videoHeight+"==="+videoWidth);*/
      /*var obj='{"id":"111"}';
       var ob=JSON.parse(obj);
       console.log(ob['id']);*/
      this.showVideo();
      var that= this;
      webSocket =new WebSocket(webSocketUrl);
      webSocket.onerror = function(event){

      }
      webSocket.onopen = function(event) {

      };
      webSocket.onmessage = function(event){
        if(event.data){
          if(event.data!='你已连接appmesssage_websoket'){
            var data =JSON.parse(event.data);
            videoInfo.szIP=data['video_ip'];
            videoInfo.szPort=data['video_port'];
            videoInfo.szUsername=data['video_username'];
            videoInfo.szPassword=data['video_password'];
            videoInfo.iChannelID=data['video_channel_id'];
            /*console.log( videoInfo.iChannelID);
             console.log( videoInfo.szUsername);*/
          }
          that.showVideo();
        }
      };
      var that = this;
      var timer = setInterval(function() {
        if(that.getKey('token')) {
          clearInterval(timer);
        }else{
          that.login();
        }
      }, 200);
      var refresh = setInterval(function(){
          window.reload();
      },360000)
    },
    data(){
      return{
        tip:false,
        urlLogin: 'wtxiqiao/sys/userinfo/login',
      }
    },
    created() {
      this.$bus.emit('showTopNav');
    },
    methods:{
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
      },
      showVideo: function(){

        if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
          this.tip=true;
          /*if (window.confirm("您还未安装过插件，点击确定即可进行下载安装!安装时请先关闭浏览器！")) {
           window.location = "static/hikvision/WebComponents.exe";
           }*/
          return;
        }
        // 初始化插件参数及插入插件
        WebVideoCtrl.I_InitPlugin(videoWidth,videoHeight);
        WebVideoCtrl.I_InsertOBJECTPlugin("myVideo");
        this.clickLogin();
      },


      //视频设备登录
      clickLogin: function(){
        var szIP = videoInfo.szIP,
          szPort = videoInfo.szPort,
          szUsername = videoInfo.szUsername,
          szPassword = videoInfo.szPassword;
        that =this;
        if ("" == szIP || "" == szPort) {
          return;
        }

        try {
          var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
            success: function (xmlDoc) {
              console.log(szIP + " 登录成功！");
              setTimeout(function () {
                that.getChannelInfo(szIP);
              }, 10);
            },
            error: function () {
              $("#myVideo").html("连接视频录像机失败！(错误信息：用户密码出错)");
            }
          });
        } catch (e) {
          //处理错误
          $("#myVideo").html("捕获到WebVideo的异常信息，视频终止");
          //throw(e.name); //抛出异常
          return;
        } finally {
        }

        if (-1 == iRet) {
          console.log(szIP + " 已登录过！");
          var that = this;
          setTimeout(function () {
            that.getChannelInfo(szIP);
          }, 10);
        }
      },

      // 获取通道
      getChannelInfo:function (szIP) {
        var nAnalogChannel = 0;
        var that =this;
        if ("" == szIP) {
          return;
        }

        // 模拟通道
        WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("VideoInputChannel");
            nAnalogChannel = oChannels.length;
            //console.log(oChannels);
            $.each(oChannels, function (i) {
              var id = parseInt($(this).find("id").eq(0).text(), 10),
                name = $(this).find("name").eq(0).text();
              if ("" == name) {
                name = "Camera " + (id < 9 ? "0" + id : id);
              }
              // console.log("id=" + id + " , name=" + name);
            });
            console.log(szIP + " 获取模拟通道成功！");

            setTimeout(function () {
              that.clickStartRealPlay(szIP);
            }, 10);
          },
          error: function () {
            console.log(szIP + " 获取模拟通道失败！");
          }
        });
        // 数字通道
        WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

            $.each(oChannels, function (i) {
              var id = parseInt($(this).find("id").eq(0).text(), 10),
                name = $(this).find("name").eq(0).text(),
                online = $(this).find("online").eq(0).text();
              if ("false" == online) {// 过滤禁用的数字通道
                return true;
              }
              if ("" == name) {
                name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
              }
              //console.log("id=" + id + " , name=" + name);
            });
            console.log(szIP + " 获取数字通道成功！");
          },
          error: function () {
            console.log(szIP + " 获取数字通道失败！");
          }
        });
        // 零通道
        WebVideoCtrl.I_GetZeroChannelInfo(szIP, {
          async: false,
          success: function (xmlDoc) {
            var oChannels = $(xmlDoc).find("ZeroVideoChannel");

            $.each(oChannels, function (i) {
              var id = parseInt($(this).find("id").eq(0).text(), 10),
                name = $(this).find("name").eq(0).text();
              if ("" == name) {
                name = "Zero Channel " + (id < 9 ? "0" + id : id);
              }
              if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
                //console.log("<option value='" + id + "' bZero='true'>" + name + "</option>");
              }
            });
            console.log(szIP + " 获取零通道成功！");
          },
          error: function () {
            console.log(szIP + " 获取零通道失败！");
          }
        });

      },



      // 开始预览
      clickStartRealPlay: function (szIP) {
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(iWndIndex),
          iStreamType = 1,
          iChannelID =videoInfo.iChannelID,
          bZeroChannel = false,
          szInfo = "";

        if ("" == szIP) {
          return;
        }

        if (oWndInfo != null) {// 已经在播放了，先停止
          WebVideoCtrl.I_Stop();
        }

        var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
          iStreamType: iStreamType,
          iChannelID: iChannelID,
          bZeroChannel: bZeroChannel
        });

        if (0 == iRet) {
          szInfo = "开始预览成功！";
        } else {
          szInfo = "开始预览失败！";
        }

        console.log(szIP + " " + szInfo);
      },
      //下载插件
      downLoadPlugin:function(){
        window.location = "static/hikvision/WebComponents.exe";
      }
    }
  }
</script>
