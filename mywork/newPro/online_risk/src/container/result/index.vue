<template>
    <div class="result">
    	<hd :config="config"></hd>
    	<div class="result-con">
	        <div class="result-img">
	        	<img src="../../assets/images/pictures/upload_ok.png" height="100%" alt="">
	        </div>
	        <div class="result-text1 f-c323232">远程视频身份核验已生效</div>
	        <div class="result-text2 f-c666666">您的风险测评结果为<span class="f-cf37938">{{ riskLevel | riskText1 }}</span></div>
		</div>
		<div class="orange-btn" style="margin-top: .5rem;">查看并确认预约订单</div>

		<div class="result-list">
			<div class="result-list-text1">———— 您可以购买以下产品 ————</div>
			<ul class="result-list-recommend">
				<li>
					<div class="recommend-title">金鹰红利价值</div>
					<div class="recommend-con">
						<div><span>2</span>.48%</div>
						<div>长期价值突出</div>
						<div>
							<span>立即购买</span>
						</div>
					</div>
					<div class="recommend-footer">
						<div class="f-c666666">近一年涨幅</div>
						<div><span class="f-cff8000">1分钱起购</span> | 收益率高</div>
						<div> </div>
					</div>	
				</li>
				<li>
					<div class="recommend-title">金鹰红利价值</div>
					<div class="recommend-con">
						<div><span>2</span>.48%</div>
						<div>长期价值突出</div>
						<div>
							<span>立即购买</span>
						</div>
					</div>
					<div class="recommend-footer">
						<div class="f-c666666">近一年涨幅</div>
						<div><span class="f-cff8000">1分钱起购</span> | 收益率高</div>
						<div> </div>
					</div>	
				</li>
			</ul>
		</div>
    </div>
</template>
<script>
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import services from '../../api/services';
	import * as filters from '../../filters/common';
	import Toast from '../../components/toast/index';
	import hd from '../../components/pageHeader';

	export default {
		components:{
			hd
		},
	    data() {
	        return {
	        	riskLevel: '',
	        	config: {
	        		title: '投资风险测评'
	        	}
	        }
	    },

	    created() {
	    	services.queryRemoteRiskInfo().then((data) => {
	            if(data.responseCode === '000000'){
	                this.riskLevel = data.data.riskLevel;
	            } else {
	                Toast.info(data.responseMsg);
	            }
	        }, (error) => {
	            console.log(error)
	        });
	    },
	    filters: {
	    	...filters
	    }
	}
</script>
