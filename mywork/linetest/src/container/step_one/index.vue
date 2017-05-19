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
					<input id="salesmanCode" @input="changeBtnColor" type="text" placeholder="请输入代码" :value="salesmanCode">
				</div>
				<div class="f-c4175d5" id="getMsgCode" @click="getMsgCode">{{ getMsgText }}</div>
			</div>
			<div class="step-one-list2">
				<div>
					验证码
				</div>
				<div>
					<input id="msgCode" @input="changeBtnColor" type="text" placeholder="请输入短信验证码">
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
		<div class="gray-btn" id="toStepTwoBtn" @click="toStepTwo">
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
    import DomTools from '../../util/domTools';
	export default {
		components: {
			hd
		},
	    data() {
	        return {
	        	limitTime: 60,
	        	getMsgText: '获取验证码',
	        	salesmanCode: '--',
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
	    	toStepTwo () {
	    		let [salesmanCode, msgCode] = [DomTools.$('#salesmanCode').value, DomTools.$('#msgCode').value]
	    		if(salesmanCode == ''){
	    			Toast.info('请输入业务员代码');
	    			return;
	    		}else if(msgCode == ''){
	    			Toast.info('请输入短信验证码');
	    			return;
	    		}
	    		services.verifySms({
	    			verifyCode: msgCode
	    		}).then((data) => {
	    			ald.nav.forward({
                    	url: `${apis.innerStatic}step_two.html`
                	});
	    		}, (error) => {

	    		})
	    	},
	    	changeBtnColor(){
	    		let [salesmanCode, msgCode, toStepTwoBtn] = [DomTools.$('#salesmanCode').value, DomTools.$('#msgCode').value, DomTools.$('#toStepTwoBtn')];
	    		if(salesmanCode == '' || msgCode == ''){
	    			DomTools.setClass(toStepTwoBtn, 'gray-btn');
	    			//toStepTwoBtn.setAttribute('class', 'gray-btn');
	    		}else{
	    			DomTools.setClass(toStepTwoBtn, 'orange-btn');
	    			//toStepTwoBtn.setAttribute('class', 'orange-btn');
	    		}
	    	},
	    	getMsgCode(){
	    		let [getMsgCode, salesmanCode] = [DomTools.$('#getMsgCode'), DomTools.$('#salesmanCode').value];
	    		if(salesmanCode == ''){
	    			Toast.info('业务员代码不能为空');
	    			return;
	    		}
	    		if(DomTools.hasClass(getMsgCode, 'f-c666666')){
	    			return;
	    		}
	    		DomTools.setClass(getMsgCode, 'f-c666666');
	    		//getMsgCode.setAttribute('class', 'f-c666666');
	    		this.salesmanCode = salesmanCode;
	    		//发送短信校验业务员
	    		services.sendSms({
	    			bcNo: salesmanCode
	    		}).then((data) => {
	    			Toast.info('短信验证码已发送!');
	    		}, (error) => {
	    			
	    		});
	    		//倒计时
    			let getCodeTimeId = setInterval(() => {
	    			if(this.limitTime > 1){
	    				DomTools.$('#salesmanCode').disabled = true;
	    				this.limitTime--;
	    			} else if(this.limitTime == 1){
	    				this.getMsgText = '重新获取';
	    				this.limitTime = 60;
	    				DomTools.$('#salesmanCode').disabled = false;
	    				DomTools.setClass(getMsgCode, 'f-c4175d5');
	    				//getMsgCode.setAttribute('class', 'f-c4175d5');
	    				clearInterval(getCodeTimeId);
	    			}
				}, 1000);
	    	}
	    }
	}
</script>
