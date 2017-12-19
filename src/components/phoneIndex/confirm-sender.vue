<!--发送指令-->
<style lang="less">

</style>

<template>
	<div class="control-sender">
		<Form :model="formItem" :label-width="80">
	        <FormItem label="发布时间">
	            <Input readonly v-model="formItem.send_time" placeholder=""></Input>
	        </FormItem>
	        <FormItem label="调度内容">
	            <Input readonly v-model="formItem.order_content" placeholder=""></Input>
	        </FormItem>
	        <FormItem label="执行内容">
	            <Input readonly v-model="formItem.execu_result" placeholder=""></Input>
	        </FormItem>
	        <FormItem label="发布单位">
	            <Input readonly v-model="formItem.send_department" placeholder=""></Input>
	        </FormItem>
	        <FormItem>
	        	<Button type="primary" @click="confirm">确认</Button>
	        </FormItem>	
	    </Form>    
	</div>
</template>

<script>
	export default {
		data () {
			return {
				formItem: {
					send_time: "",
					order_content: "",
					execu_result: "",
					execu_status: "",
					send_department: "",
					_id: "",
					is_reply: "",
					order_name: "",
					station_name: "",
				},
				urlConfirmSenderList: "wtxiqiao/waterresource/wdpdispatchrec/confirm",
			}
		},
		methods: {
			showSender: function(obj) {
				this.formItem.send_time = obj.send_time;
				this.formItem.order_content = obj.order_content;
				this.formItem.execu_result = obj.execu_result;
				this.formItem.execu_status = obj.execu_status;
				this.formItem.send_department = obj.send_department;
				this.formItem._id = obj._id
				this.formItem.is_reply = obj.is_reply
				this.formItem.order_name = obj.order_name
				this.formItem.station_name = obj.station_name
			},
			confirm: function() {
				var that = this;
                var params = {};
                params.data = {};
                params.data._id = this.formItem._id;
                params.data.is_reply = this.formItem.is_reply;
                params.data.order_name = this.formItem.order_name;
                params.data.station_name = this.formItem.station_name;
                params.token = this.getKey('token');
                params.url = this.urlConfirmSenderList;
                params.success=function(){
                    that.$Loading.finish();
                    that.$Notice.success({
                            title: '确认成功'
                    });
				}
				this.ajaxPost(params); 
			}	
		},
		created() {
            this.$bus.on("comfirmSender",this.showSender);
        },
        beforeDestroy() {
            this.$bus.off("comfirmSender",this.showSender);
        }	
	}
</script>
