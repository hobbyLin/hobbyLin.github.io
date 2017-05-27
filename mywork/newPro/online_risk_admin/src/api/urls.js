/**
* Created by EX_WLJR_YANLIHUI on 2017/05/03
* 用于初始化相关域名，打生产包的时候会去除掉测试开发的相关域名信息
**/

function initHostname(){
    //开发环境
    if(ENV === 'development') {
        return {
            rmb: 'http://10.14.220.43:8080',
            //rmb: 'http://127.0.0.1:9997',
            static:'http://pop-stg.paic.com.cn', //用于跳转外部模块链接
            localProDelPath: 'http://pop-stg.paic.com.cn/product/new-public-custom.html?',
            innerStatic: '/robo-ad/aum_zntg/', //用于跳转内部链接
            innerStatic2: '', //用于跳转内部链接且不带prefix-/robo-ad/aum_zntg/
        };
    }
    // 测试环境
    if(ENV === 'staging') {
        return {
            rmb:'http://pop-stg.paic.com.cn',
            static:'http://pop-stg.paic.com.cn',
            localProDelPath: 'http://pop-stg.paic.com.cn/product/new-public-custom.html?',
            innerStatic: 'https://bank-static-stg.pingan.com.cn/robo-ad/aum_zntg/',
            innerStatic2: 'https://bank-static-stg.pingan.com.cn',
        }
    }
    //生产环境
    if(ENV === 'production'){
        return {
            rmb:'http://brop.pab.com.cn',
            static:'http://brop.pab.com.cn',
            localProDelPath: 'http://brop.pab.com.cn/product/new-public-custom.html?',
            innerStatic: 'https://bank-static.pingan.com.cn/robo-ad/aum_zntg/',
            innerStatic2: 'https://bank-static.pingan.com.cn',
        }
    }
}

//初始化域名
const hostname = initHostname();

export default {
    login: hostname.static + '/portal/login.html',
    //查询列表
    querySettingList: hostname.rmb + '/admin/querySettingList',
    //新增列表
    addSetting: hostname.rmb + '/admin/addSetting',
    //修改列表
    updateSetting: hostname.rmb + '/admin/updateSetting',
    //查询方案详情
    querySetting: hostname.rmb + '/admin/querySetting'

}