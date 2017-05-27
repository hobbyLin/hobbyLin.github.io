<template>
    <div class="step-one">
    	<hd :config="config"></hd>
        <div class="step-box step-one1">
            <dl>
                <dt><i></i></dt>
                <dd>校验业务员</dd>
            </dl>
            <dl>
                <dt><i></i></dt>
                <dd>上传身份证</dd>
            </dl>
            <dl>
                <dt><i></i></dt>
                <dd>视频认证</dd>
            </dl>
            <dl>
                <dt><i></i></dt>
                <dd>完成</dd>
            </dl>
        </div>
		<div class="step-one-form">
			<div class="step-one-list1">
				<div>业务员代码</div>
				<div>
					<input id="salesmanCode" @input="changeBtnColor" type="text" placeholder="请输入代码" v-model="salesmanCode">
				</div>
				<div :class="{'f-c4175d5': canGetCode, 'f-c666666': !canGetCode}" id="getMsgCode" @click="getMsgCode">{{ getMsgText }}</div>
			</div>
			<div class="step-one-list2">
				<div>
					验证码
				</div>
				<div>
					<input v-model="msgCode" @input="changeBtnColor" type="text" placeholder="请输入短信验证码">
				</div>
				<div>
					{{ limitTime }}s
				</div>
			</div>
		</div>
		<div class="step-one-warn">
			<p>温馨提示：</p>
			<p>风险测评需要有平安业务服务人员在场，服务于您的平安业务人员会提供给您预约码进行后续流程操作。</p>
		</div>
		<div :class="{'gray-btn': !activeBtn, 'orange-btn': activeBtn}" id="toStepTwoBtn" @click="toStepTwo">
			下一步
		</div>
    </div>
</template>
<script>
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import Toast from '../../components/toast/index';
    import services from '../../api/services';
    import hd from '../../components/pageHeader';

	export default {
		components: {
			hd
		},
	    data() {
	        return {
	        	activeBtn: false,
	        	canGetCode: true,
	        	limitTime: 5,
	        	getMsgText: '获取验证码',
	        	salesmanCode: '--',
	        	msgCode:'',
	        	config: {
	        		title: '远程视频身份认证'
	        	}
	        }
	    },
	    created(){
	    	services.queryCustInfo().then((data) => {
                this.salesmanCode = data.bcNo;
            }, (error) => {

            })
	    },
	    methods: {
	    	$(selector){
	    		return document.querySelector(selector)
	    	},
	    	toStepTwo () {
	    		if(this.salesmanCode == ''){
	    			Toast.info('请输入业务员代码');
	    			return;
	    		}else if(this.msgCode == ''){
	    			Toast.info('请输入短信验证码');
	    			return;
	    		}
	    		services.verifySms({
	    			verifyCode: this.msgCode
	    		}).then((data) => {
	    			ald.nav.forward({
                    	url: `${apis.innerStatic}step_two.html`
                	});
	    		}, (error) => {

	    		})
	    	},
	    	changeBtnColor(){
	    		if(this.salesmanCode == '' || this.msgCode == ''){
	    			this.activeBtn = false;
	    		}else{
	    			this.activeBtn = true;
	    		}
	    	},
	    	getMsgCode(){
	    		if(this.salesmanCode == ''){
	    			Toast.info('业务员代码不能为空');
	    			return;
	    		}
	    		if(!this.canGetCode){
	    			return;
	    		}
	    		this.canGetCode = false;
	    		//发送短信校验业务员
	    		services.sendSms({
	    			bcNo: this.salesmanCode
	    		}).then((data) => {
	    			Toast.info('短信验证码已发送!');
	    		}, (error) => {
	    			
	    		});
	    		//倒计时
    			let getCodeTimeId = setInterval(() => {
	    			if(this.limitTime > 1){
	    				this.$('#salesmanCode').disabled = true;
	    				this.limitTime--;
	    			} else if(this.limitTime == 1){
	    				this.getMsgText = '重新获取';
	    				this.limitTime = 60;
	    				this.$('#salesmanCode').disabled = false;
	    				this.canGetCode = true;
	    				clearInterval(getCodeTimeId);
	    			}
				}, 1000);
	    	}
	    }
	}
</script>
