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
            <div class="upload-result-ok"><img src="../../assets/images/pictures/upload_ok.png"  width="100%" alt=""></div>
            <div class="f-c323232 f-z34 upload-result-text1">您已完成身份证上传</div>
            <div class="f-c666666 f-z30 upload-result-text2">{{ showTip }}</div>
        </div>
        <div :class="{'orange-btn': activeBtn, 'gray-btn': !activeBtn}" @click="goNext" style="margin-top: .52rem;">
            下一步
        </div>
    </div>
</template>

<script>
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import hd from '../../components/pageHeader';
    import Toast from '../../components/toast/index';
    import service from '../../api/services';
    import dialog from '../../components/dialog/index';

    export default {
        components: {
            hd
        },
        data () {
            return {
                activeBtn: false,
                config: {
                    title: '远程视频身份认证'
                }
            }
        },
        computed: {
            showTip() {
                if(this.activeBtn){
                    return '验证通过，点击下一步进入视频验证';
                }

                return '系统正在校验信息，请稍等...';
            }
        },
        created() {
            service.checkIdNo().then((data) => {
                if(data.responseCode === '000000'){
                    this.activeBtn = true;
                } else {
                    let showInfo = '公安联网暂未获取到您的身份信息，暂不能核实您的身份信息，不能进行远程视频的接通，还请到银行网点进行风测资质认证，谢谢！';
                    if(data && data.data && data.data.who === "2") {
                        showInfo = '公安联网暂未获取到业务员的身份信息，暂不能核实业务员的身份信息，不能进行远程视频的接通，还请到银行网点进行风测资质认证，谢谢！';
                    }
                    dialog.open({
                        showTitle: true,
                        useText: true,
                        title: '温馨提示',
                        text: `<div>
                                <div style="font-size: 0.3rem; color: #666">
                                    ${showInfo}
                                </div>
                            </div>`,
                        showOneBtn: true,
                        oneBtnText: '我知道了',
                        oneBtnCallback: function () {
                        }
                    });
                }
            }, (error) => {
                console.log(error);
            })
        },
        methods: {
            goNext(){
                if(this.activeBtn){
                    ald.nav.forward({
                        url: `${apis.innerStatic}step_three.html`
                    });
                }
            }
        }
    }
</script>
