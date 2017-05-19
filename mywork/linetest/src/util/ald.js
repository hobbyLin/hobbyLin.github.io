/**
 * ald和bow接口封装
 */

import {tryLogin} from './acc';
import Toast from '../components/toast/index.js';
import Loading from '../components/loading/index.js';

/*
 * 运行环境判断（app,web）
 */
function checkAladdinHybrid(){
    let ua = window.navigator.userAgent;
    return ua.indexOf("AladdinHybrid") != -1;
}

//缓存运行环境
let isAladdinHybrid = checkAladdinHybrid();

/*
 * 检测appinfo
 */
function checkAppInfo(){
    let ua = window.navigator.userAgent;
    let infos = /AladdinHybrid\/(\d+\.\d+\.?\d*.*?) \((.*?) (\d+\.\d+\.?\d*.*?)\)/i.exec(ua);
    let appInfo = {
        hybridVersion: '',
        appName: '',
        appVersion: '',
    };
    if (Object.prototype.toString.call(infos) === '[object Array]') {
        if (infos.length >= 1) {
            appInfo.hybridVersion = infos[1];
        }
        if (infos.length >= 2) {
            appInfo.appName = infos[2];
        }
        if (infos.length >= 3) {
            appInfo.appVersion = infos[3];
        }
    }

    return appInfo;
}

//缓存appinfo
let appInfo = checkAppInfo();

//请求计数
let requestCount = 0;
//登陆态失效返回码
const needLoginCode = ['291001','650613','650614'];
//请求相关
export const http = {
    request: function (opts, cb) {
        let {mask, ...options} = opts;
        
        if(!mask){
            if(requestCount++ === 0) {
                Loading.open();
            }
        }
        options.xhrFields = options.xhrFields || {withCredentials:true};
        options.crossDomain = options.crossDomain || true;
        options.cache = options.cache || true;
        options.timeout = options.timeout || 20000;
        //options.body.becifNo = '620079455087';
        aladdin.http.request(options, function (err, res) {
            if(!mask){
                if(requestCount === 0 || --requestCount === 0){
                    Loading.close();
                }
            }
            //公共异常处理
            if(err){
                Toast.info(err.message || '网络异常');
                if(cb && (typeof(cb) === 'function')){
                    return cb({responseMsg: err.message || '网络异常'});
                }
            }

            //json解析
            let json;
            try{
                json = JSON.parse(res.body);
            }catch(e){
                json = {responseMsg: '服务器异常-1'};
            }
            // 口袋3.0.0以下逻辑不变,暂时不做变更
            // if(appInfo.appVersion < '3.0.0'){

            //     let responseCode = (json && json.responseCode) ? json.responseCode : '';
            //     // 在列表内的代码需要登录～
            //     if(needLoginCode.indexOf(responseCode) != -1){
            //         tryLogin();
            //     }else{
            //         if(cb && (typeof(cb) === 'function')){
            //             cb(json || {})
            //         }
            //     }
            // } else {
                if(cb && (typeof(cb) === 'function')){
                    cb(json || {})
                }
            //}
        });
    },
    /**
     * JSONP跨域请求
     *
     *
     * @param options
     * @param cb
     */
    jsonp: function (options, cb) {
        // if(requestCount++ === 0) {
        //     storeInstance.commit("loading", true)
        // }
        let name,
            url = options.url,
            params = options.params || {},
            _parseData = function (data) {
                let ret = "";
                if(typeof data === "string") {
                    ret = data;
                }else if(typeof data === "object") {
                    for(let key in data) {
                        ret += "&" + key + "=" + encodeURIComponent(data[key]);
                    }
                }
                // 加个时间戳，防止缓存
                ret += "&_time=" + (new Date()).getTime();
                ret = ret.substr(1);
                return ret;
            },
            _removeElement = function (elem) {
                let parent = elem.parentNode;

                if(parent && parent.nodeType !== 11) {
                    parent.removeChild(elem);
                }
            };

        url = url + (url.indexOf("?") === -1 ? "?" : "&") + _parseData(params);

        let match = /callback=(\w+)/.exec(url);

        if(match && match[1]) {
            name = match[1];
        } else {
            name = options.jsonpCallback || "jsonp_" + (new Date()).getTime() + '_' + Math.random().toString().substr(2);
            url = url.replace("callback=?", "callback="+name);
            url = url.replace("callback=%3F", "callback="+name);
        }

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = "id_" + name;

        window[name] = function(json) {
            window[name] = undefined;
            let elem = document.getElementById("id_" + name);
            _removeElement(elem);
            
            cb(json);
        };

        // 在head里面插入script元素
        let head = document.getElementsByTagName("head");
        if(head && head[0]) {
            head[0].appendChild(script);
        }
    }
};

//头部相关
export const header = {
    config(options){
        aladdin.header.config(options);
    }
};

//跳转相关
export const navigator = {
    forward: function (options) {
        // options.tpl = 'webview';
        // options.mode = 1;
        // aladdin.navigator.forward(options);
        location.href = options.url;
    },
    forwardTo:function(options){
        aladdin.navigator.forward(options);
    },
    backTop: function(){
        aladdin.navigator.backTop();
    },
    back: function (options) {
        //aladdin.navigator.back(options);
        window.history.back();
    }
};

export const nav = {
    forward: function (options) {
        // options.tpl = 'webview';
        // options.mode = 1;
        // aladdin.navigator.forward(options);
        location.href = options.url;
    },
    forwardTo:function(options){
        aladdin.navigator.forward(options);
    },
    backTop: function(){
        aladdin.navigator.backTop();
    },
    back: function (options) {
        //aladdin.navigator.back(options);
        window.history.back();
    }
};

//存储相关
export const store = {
    localStorage: {
        setItem: function(options, cb){
            aladdin.localStorage.setItem(options.key, options.value, true, '3DES', cb);
        },
        getItem: function (key, cb) {
            aladdin.localStorage.getItem(key, true, '3DES', cb);
        },
        removeItem: aladdin.localStorage.removeItem,
        clear: aladdin.localStorage.clear
    },
    sessionStorage: {
        setItem: function(options, cb){
            aladdin.sessionStorage.setItem(options.key, options.value, true, '3DES', cb);
        },
        getItem: function (key, cb) {
            aladdin.sessionStorage.getItem(key, true, '3DES', cb);
        },
        removeItem: function (key, cb) {
            aladdin.sessionStorage.removeItem(key, true, cb);
        },
        clear: aladdin.sessionStorage.clear
    }
};

//埋点
export const track = {
    record: function (options, cb) {
        //非app版本不会执行cb
        if(isAladdinHybrid){
            aladdin.talkingData.trackEvent(options, cb);
        } else {
            console.info(options);
            cb && cb();
        } 
    }
};

//事件
export const event = {
    on: function(event, cb){
        aladdin.on && aladdin.on(event, cb);
    },
    off: function(event, cb){
        aladdin.on && aladdin.off(event, cb);
    },
    once: function(event, cb){
        aladdin.on && aladdin.once(event, cb);
    }
};

//环境检测
export const env = {
    // 判断是否在口袋银行
    ...(aladdin.env || {}),
    isAladdinHybrid: isAladdinHybrid
    //其它
};
