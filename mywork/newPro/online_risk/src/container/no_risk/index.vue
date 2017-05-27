<template>
    <div>
        <hd :config="hdConfig"></hd>
        <div class="no-risk" v-if="showRet === 1">
            <div class="no-risk-con">
                <div>
                    <div class="no-risk-u f-c666666">您的风险评测结果为</div>
                    <div class="no-risk-type">{{ riskLevel | riskText1 }}</div>
                </div>
                <div class="no-risk-img">
                    <img :src="riskLevel, status | riskImg" width="100%" alt="">
                </div>
                <div class="no-risk-canbuy">
                    <p>可以购买<span>{{ riskLevel | riskText2 }}风险</span>及以上产品</p>
                    <p>为您推荐的资产配置<span>查看</span></p>
                </div>
                <div class="no-risk-tips f-c666666">
                    <p>
                        您未在我行进行临柜风测，因此无法购买我行理财产品，您可至我行<span class="f-c4175d5">网点风测</span>或<span class="f-c4175d5" @click="toStepOne">远程风测</span>
                    </p>
                </div>
            </div>
            <div>
                <div class="orange-btn" style="margin-top: .5rem;" @click="reTest">重新评测</div>
                <div class="white-btn" style="margin-top: .3rem;" @click="back">返回</div>
            </div>
            <div class="no-risk-notice f-c4175d5" @click="goNext">查看风险测评预约事项>></div>
        </div>
        <div class="has-risk" v-if="showRet === 2">
            <div class="result-con">
                <div class="result-img">
                    <img src="../../assets/images/pictures/upload_ok.png" height="100%" alt="">
                </div>
                <div class="result-text1 f-c323232">远程视频身份证已生效</div>
                <div class="result-text2 f-c666666">您的风险测评结果为<span class="f-cf37938">{{ riskLevel | riskText1 }}</span></div>
            </div>

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
    components: {
        hd,
    },
    data() {
        return {
            showRet: 0, //需要显示的结果
            riskLevel: 0,
            status: 1,
            hdConfig: {
                title: '风险测评结果'
            },
        }
    },
    created() {
        services.queryRemoteRiskInfo().then((data) => {
            if(data.responseCode === '000000'){
                this.riskLevel = data.data.riskLevel;
                this.status = data.data.status;
                if(data.data.firstChannelFlag === '1'){
                    this.showRet = 2
                } else {
                    this.showRet = 1 
                }
            } else {
                Toast.info(data.responseMsg);
            }
        }, (error) => {
            console.log(error)
        });
    },
    filters: {
        ...filters,
    },
    methods: {
        reTest() {
            let goToUrl = encodeURIComponent(`${apis.innerStatic}no_risk.html`);
            ald.nav.forward({
                url: `${apis.riskAssessment}?goToUrl=${goToUrl}`
            });
        },
        back() {
            ald.nav.back();
        },
        goNext() {
            ald.nav.forward({
                url: `${apis.innerStatic}verify_identity.html`
            });
        },
        toStepOne() {
            ald.nav.forward({
                url: `${apis.innerStatic}step_one.html`
            });
        }
    }
}
</script>
