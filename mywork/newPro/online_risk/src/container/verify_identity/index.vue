<template>
    <div class="verify-identify">
        <hd :config="hdConfig"></hd>
        <div class="verify-identify-information">
            <div class="verify-identify-list">
                <div class="f-c1e1e1e">预约名称</div>
                <div class="f-c666666">{{ orderName }}</div>
            </div>
            <div class="verify-identify-list">
                <div class="f-c1e1e1e">预约编号</div>
                <div class="f-c666666">{{ orderId }}</div>
            </div>
            <div class="verify-identify-list">
                <div class="f-c1e1e1e">
                    业务员名称
                </div>
                <div class="f-c666666">
                    {{ bcName }}<span class="verify-identify-changebtn" @click="changeSalesman">修改</span>
                </div>
            </div>
            <div class="verify-identify-list">
                <div class="f-c1e1e1e">
                    业务员电话
                </div>
                <div class="f-c666666">{{ bcTelNo }}</div>
            </div>
        </div>
        <div class="verify-identify-time f-c666666">
            <p>温馨提示</p>
            <p>{{ setting }}</p>
        </div>
        <div class="orange-btn" @click="toStepOne">
            进入远程视频身份认证
        </div>
    </div>
</template>
<script>
    import * as ald from '../../util/ald';
    import apis from '../../api/urls';
    import services from '../../api/services';
    import dialog from '../../components/dialog/index';
    import hd from '../../components/pageHeader';
    import OkImg from '../../assets/images/pictures/upload_ok.png';
    export default {
        components: {
            hd
        },
        data() {
            return {
                orderName: '风险测评(远程身份认证)预约事项',
                orderId: '--',
                bcName: '--',
                bcTelNo: '--',
                setting: '（远程视频身份认证时间周一至周五8:30-19:00，周六周日9:00-17:00）',
                //头部
                hdConfig: {
                    title: '远程视频身份认证'
                }
            }
        },
        mounted() {
            // ald.header.config({
            //     title: '远程视频身份认证',
            //     leftButtonCallback: () => {
            //         ald.nav.back();
            //     },
            //     rightButtonVisible: false,
            //     rightButtonCallback: () => {

            //     }
            // })
        },
        created(){
            //获取订单信息接口
            this.getOrderInformation();
        },
        methods: {
            getOrderInformation(){
                services.queryCustInfo().then((data) => {
                    this.orderName = data.orderName;
                    this.orderId = data.orderId;
                    this.bcName = data.bcName;
                    this.bcTelNo = data.bcTelNo;
                    let settingArr = data.setting.split('|');
                    this.setting = `（远程视频身份认证时间周一至周五${settingArr[0]}，周六周日${settingArr[1]}）`;
                }, (error) => {

                })
            },
            changeSalesman(){
                dialog.open({
                    title: '提示',
                    message: '请输入业务员代码',
                    showInput: true,
                    inputPlaceholder: '输入业务员代码',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonCallback: (inputValue) => {
                        services.chgBusinessmanInfo({
                            newBusiClientNo: inputValue
                        }).then((data) => {
                            this.bcName = data.name;
                            this.bcTelNo = data.phone;
                            dialog.open({
                                showTitle: false,
                                useText: true,
                                text: `<div>
                                        <div style="height: 1.42rem;text-align: center;margin-top: 0.16rem;">
                                            <img src='./assets/images/upload_ok.png' height="100%" alt>
                                        </div>
                                        <div style="color: #666;font-size: 0.3rem;text-align: center;line-height: 0.53rem;margin-top: 0.2rem;">操作成功</div>
                                    </div>`,
                                showOneBtn: true,
                                oneBtnText: '我知道了',
                                oneBtnCallback: function () {
                                }
                            })
                        }, (error) => {

                        })
                    },
                    cancelButtonCallback: () => {

                    }
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
