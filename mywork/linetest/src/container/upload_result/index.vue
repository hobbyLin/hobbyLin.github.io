<template>
    <div class="upload-result">
        <hd :config="config"></hd>
        <div class="step-box step-two1">
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
        <div class="upload-result-suc">
        	<!-- <img src="../../assets/images/pictures/upload_result.png" width="100%" alt=""> -->
            <div class="upload-result-ok"><img src="../../assets/images/pictures/upload_ok.png"  width="100%" alt=""></div>
            <div class="f-c323232 f-z34 upload-result-text1">您已完成身份证上传</div>
            <!-- <div class="f-c666666 f-z30 upload-result-text2">温馨提示：系统正在校验信息，请稍等...</div> -->
        </div>
        <div class="orange-btn" @click="goNext" style="margin-top: .52rem;">
            下一步
        </div>
    </div>
</template>

<script>
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import hd from '../../components/pageHeader';


    export default {
        components: {
            hd
        },
        data () {
            return {
                config: {
                    title: '远程视频身份认证'
                }
            }
        },
        methods: {
            goNext(){
                ald.nav.forward({
                    url: `${apis.innerStatic}step_three.html`
                });
            }
        }
    }
</script>
