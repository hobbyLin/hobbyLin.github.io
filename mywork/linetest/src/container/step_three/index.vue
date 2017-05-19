<template>
    <div>
    	<hd :config="hdConfig"></hd>
        <div class="step-box step-three1">
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
        <div class="step-three-con">
        	<div class="step-three-text f-c666666">接下来由我司远程工作人员与您进行简短的视频确认，请您做好以下准备</div>
        	<div class="step-three-text1 f-cf37938">
            	{{ setting }}
        	</div>
        	<div class="step-three-img">
        		<img src="../../assets/images/pictures/step_three.png" height="100%" alt="">
        	</div>
        </div>
		<div @click="toVideo" class="orange-btn" style="margin-top: 0.5rem">
			我准备好了，接通远程视频
		</div>
    </div>
</template>
<script>
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import services from '../../api/services';
    import hd from '../../components/pageHeader';

	export default {
		components: {
	        hd,
	    },
	    data() {
	        return {
	        	setting: '（远程视频身份认证时间周一至周五8:30-19:00，周六周日9:00-17:00）',
	        	hdConfig: {
	                title: '远程视频身份认证'
	            },
	        }
	    },
	    created() {
	    	services.queryCustInfo().then((data) => {
	    		//todo 业务处理
	    		let settingArr = data.setting.split('|');
                this.setting = `（远程视频身份认证时间周一至周五${settingArr[0]}，周六周日${settingArr[1]}）`;
	    	}, (error) => {
	    		console.log(error)
	    	});
	    },
	    methods: {
	    	toVideo () {
	    		services.queryCustInfo().then((data) => {
		    		//todo 业务处理
	                ald.nav.forward({
	                    url: `${apis.innerStatic}result.html`
	                });
		    	}, (error) => {
		    		console.log(error)
		    	});
	    	}
	    }
	}
</script>
