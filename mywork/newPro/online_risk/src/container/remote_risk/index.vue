<template>
    <div class="remote-risk">
        <hd :config="hdConfig"></hd>
        <div class="remote-risk-con">
        <div class="remote-risk-myrisk f-c4175d5" @click="myRisk">我的风测等级</div>
            <div class="remote-risk-img">
                <img src="../../assets/images/pictures/remote_risk.png" height="100%" alt="">
            </div>
            <div class="remote-risk-introduce f-c666666">完成风险测评，您就可以购买高收入的理财产品了哦！</div>
        </div>
        <div class="orange-btn" style="margin-top: .52rem;" @click="gotoRisk">
            马上开始风险评测
        </div>

        <!-- <div class="remote-risk-btn1" @click="gotoTest">
            跳转index页面
        </div> -->
    </div>
</template>

<script>
import * as ald from '../../util/ald';
import apis from '../../api/urls';
import dialog from '../../components/dialog/index';
import Toast from '../../components/toast/index';
import services from '../../api/services';
import hd from '../../components/pageHeader';

const BREAK_CODE = {
    '1': `${apis.innerStatic}step_one.html`,
    '2': `${apis.innerStatic}step_two.html`,
    '3': `${apis.innerStatic}step_three.html`, 
};

export default {
    components: {
        hd,
    },
    data () {
        return {
            isInit: false,
            riskRet: {
                status: -1,
                riskLevel: '',
                riskTypeName: '',
                firstChannelFlag: '',
                riskStep: '0',
            },
            hdConfig: {
                title: '远程风险测评'
            }
        }
    },
    methods: {
        // gotoTest(){
        //     ald.nav.forward({
        //         url: `${apis.innerStatic}index.html`
        //     });
        // },
        gotoRisk () {
            if(!this.isInit) {
                services.queryRemoteRiskInfo().then((data) => {
                    if(data.responseCode === '000000'){
                        this.isInit = true;
                        this.riskRet.status = data.data.status;
                        this.riskRet.riskLevel = data.data.riskLevel;
                        this.riskRet.riskTypeName = data.data.riskTypeName;
                        this.riskRet.firstChannelFlag = data.data.firstChannelFlag;
                        this.riskRet.riskStep = data.data.riskStep || '0';
                        this.handleToRisk();
                    } else {
                        Toast.info(data.responseMsg);
                    }
                }, (error) => {
                    console.log(error)
                })
            } else {
                this.handleToRisk();
            }
        },
        handleToRisk(){
            if(this.riskRet.status === '1') {//有风测
                dialog.open({
                    showTitle: true,
                    title: '提示',
                    useText: true,
                    text: `<div style="font-size: 0.3rem;color: #666666;">
                            您已经进行了风险测评，请到<span style="color: #4175d5">[我的风险等级]</span>查看风险结果
                        </div>`,
                    showOneBtn: true,
                    oneBtnText: '我知道了',
                    oneBtnCallback: function () {
                    }
                });
            } else {//无风测或过期
                if(this.riskRet.riskStep !== '0') {//有断点进入断点
                    dialog.open({
                        title: '提示',
                        message: '您有还未完成的远程风险测评，是否继续？',
                        confirmButtonText: '继续',
                        cancelButtonText: '取消',
                        confirmButtonCallback: () => {
                            ald.nav.forward({
                                url: this.getriskStep(this.riskRet.riskStep)
                            });
                        },
                        cancelButtonCallback: () => {

                        }
                    });
                } else {
                    let goToUrl = encodeURIComponent(`${apis.innerStatic}no_risk.html`);
                    ald.nav.forward({
                        url: `${apis.riskAssessment}?goToUrl=${goToUrl}`
                    });
                }
            }
        },
        getriskStep(code){
            let ret = location.href = BREAK_CODE[code];
            if(ret === undefined){
                ret = location.href;
            }

            return ret;
        },
        myRisk () {
            //请求接口判断是否做过风险评测
            if(!this.isInit){
                services.queryRemoteRiskInfo().then((data) => {
                    if(data.responseCode === '000000'){
                        this.isInit = true;
                        this.riskRet.status = data.data.status;
                        this.riskRet.riskLevel = data.data.riskLevel;
                        this.riskRet.riskTypeName = data.data.riskTypeName;
                        this.riskRet.firstChannelFlag = data.data.firstChannelFlag;
                        this.riskRet.riskStep = data.data.riskStep || '0';
                        this.handleMyRisk();
                    } else {
                        Toast.info(data.responseMsg);
                    }
                }, error => {
                    console.log(error);
                });
            } else {
                this.handleMyRisk();
            }
        },
        handleMyRisk() {
            if(this.riskRet.status === '1') {//有风测,
                ald.nav.forward({
                    url: `${apis.innerStatic}no_risk.html`
                });
            } else {  //无风测(包括过期)
                dialog.open({
                    title: '提示',
                    message: '您有还未进行过远程风险测评，马上进入风险测评',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonCallback: () => {
                        let goToUrl = encodeURIComponent(`${apis.innerStatic}no_risk.html`);
                        ald.nav.forward({
                            url: `${apis.riskAssessment}?goToUrl=${goToUrl}`
                        });
                    },
                    cancelButtonCallback: () => {

                    }
                });
            }
        }
    }
}
</script>
