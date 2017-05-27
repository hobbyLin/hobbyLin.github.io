/*
 * 用于统一放置请求地址，便于管理
 */

/*
 * 用于初始化相关域名，打生产包的时候会去除掉测试开发的相关域名信息
 */
function initHostname(){
    if(ENV === 'dev') {
        return {
            //rmb: '',
            rmb: 'https://rmb-stg.pingan.com.cn',
            static:'https://bank-static-stg.pingan.com.cn', //用于跳转外部模块链接
            innerStatic: 'http://my.pingan.com.cn:9998/robo-ad/online_risk/', //用于跳转内部链接
            innerStatic2: '', //用于跳转内部链接且不带prefix-/robo-ad/aum_zntg/
        };
    }

    if(ENV === 'stg') {
        return {
            rmb:'https://rmb-stg.pingan.com.cn',
            static:'https://bank-static-stg.pingan.com.cn',
            innerStatic: 'https://bank-static-stg.pingan.com.cn/robo-ad/online_risk/',
            innerStatic2: 'https://bank-static-stg.pingan.com.cn',
        }
    }

    if(ENV === 'prd'){
        return {
            rmb:'https://rmb.pingan.com.cn',
            static:'https://bank-static.pingan.com.cn',
            innerStatic: 'https://bank-static.pingan.com.cn/robo-ad/online_risk/',
            innerStatic2: 'https://bank-static.pingan.com.cn',
        }
    }
}

//初始化域名
const hostname = initHostname();

export default {
    //影像上传接口
    upload: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/image/upload.do',
    //发送短信接口
    sendSms: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/sms/sendSms.do',
    //验证短信接口
    verifySms: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/sms/verifySms.do',
    //查询预约号业务员信息
    queryCustInfo: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/risk/queryCustInfo.do',
    //变更业务员接口
    chgBusinessmanInfo: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/busiman/chgBusinessmanInfo.do',
    //------------------前端页面内部跳转地址
    innerStatic: hostname.innerStatic,
    innerStatic2: hostname.innerStatic2,
    //-------------------前端跳转H5地址

    //yuan start
    //风险查询
    //userRiskInfo: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/fund/userRiskInfo.do',
    queryRemoteRiskInfo: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/risk/queryRemoteRiskInfo.do',
    //视频权限校验（时间校验）
    videoAuthentication: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/setting/videoAuthentication.do',
    //客户,业务员证件ID与姓名校验
    checkIdNo: hostname.rmb + '/bron/ibank/cust/bron-ibank-pd/rrs/check/checkIdNo.do',

    // 会员相关
    //新会员绑卡页
    newBindCard: hostname.static + '/brac-ia/accountManager/pages/addCardRouter.html',

    //前端页面跳转
    riskAssessment: hostname.static + '/omm/mobile/risk_assessment.html'
}