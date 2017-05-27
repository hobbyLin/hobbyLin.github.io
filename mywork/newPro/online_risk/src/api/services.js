/*
 * @EX_WLJR_YANLIHUI
 * 各种接口请求封装
 */

import api from './urls';
import * as ald from '../util/ald';
import Toast from '../components/toast/index.js';

export default {
    //影像上传接口
    upload(options = {}){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', api.upload);
            xhr.withCredentials = true;//跨域
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        //会员中心拦截
                        try {
                            if (__AUTH_AGENTS_INTERCEPTORS__.intercept(xhr.getResponseHeader("UC-AUTH-CODE"), {}, xhr.getResponseHeader("UC-AUTH-MSG"))) {
                                return;
                            }
                        } catch (e) {
                            console.error("无UC-AUTH-CODE头，且跨域了。", e);
                        }
                        
                        let data = JSON.parse(xhr.responseText);
                        if(data.code === '000000' || data.responseCode === '000000') {
                            resolve(data)
                        } else {
                            Toast.info(data.responseMsg || data.msg);
                        }
                    } else {
                        Toast.info('网络错误');
                    }
                }
            }
            xhr.send(options);
        });
    },
    //发送短信接口
    sendSms(options = {}){
        return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.sendSms,
                body: options
            }, function (data) {
                if(data.code === '000000' || data.responseCode === '000000') {
                    resolve(data.data)
                } else {
                    Toast.info(data.responseMsg || data.msg);
                }
            })

        })
    },
    //验证短信接口
    verifySms(options = {}){
        return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.verifySms,
                body: options
            }, function (data) {
                if(data.code === '000000' || data.responseCode === '000000') {
                    resolve(data.data)
                } else {
                    Toast.info(data.responseMsg || data.msg);
                }
            })

        })
    },
    //查询预约订单信息
    queryCustInfo(options = {}){
        return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.queryCustInfo,
                body: options
            }, function (data) {
                if(data.code === '000000' || data.responseCode === '000000'){
                    resolve(data.data);
                } else {
                    Toast.info(data.responseMsg || data.msg);
                }
            })

        })
    },
    //变更业务员接口
    chgBusinessmanInfo(options = {}){
        return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.chgBusinessmanInfo,
                body: options
            }, function (data) {
                if(data.code === '000000' || data.responseCode === '000000'){
                    resolve(data.data);
                } else {
                    Toast.info(data.responseMsg || data.msg);
                }
            })

        })
    },

    //lihui end

    //yuan start
    //风险查询
    queryRemoteRiskInfo(options = {}) {
       return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.queryRemoteRiskInfo,
                body: options,
            }, function (data) {
                resolve(data);
            });
        }); 
    },

    //视频权限校验（时间校验）
    videoAuthentication(options = {}) {
       return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.videoAuthentication,
                body: options,
            }, function (data) {
                resolve(data);
            });
        }); 
    },

    //客户,业务员证件ID与姓名校验
    checkIdNo(options = {}) {
       return new Promise((resolve, reject) => {
            ald.http.request({
                method: 'POST',
                url: api.checkIdNo,
                body: options,
            }, function (data) {
                resolve(data);
            });
        }); 
    },
}
