import Loading from '../../components/loading/index.js';

"use strict";
(function(global, undefined) {
    window.bow = window.aladdin;
    var ua = navigator.userAgent + '';
    var infos = /AladdinHybrid\/(\d+\.\d+\.?\d*.*?) \((.*?) (\d+\.\d+\.?\d*.*?)\)/i.exec(ua);
    var appInfo = {
        hybridVersion: '',
        appName: '',
        appVersion: '3.1.1'
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

    /* 获取当前页面URL地址 －－
     * 返回：
     * prefix 主机头   String [lostname:[port]]
     * search 搜索字段  String [param1=1&param2=2...]
     * params 搜索字段  Object [{param1:1,param2:2...}]
     * hash   锚点     String [hash or '']
     */
    function getRefererUrl() {
        var prefix = '',
            search = '',
            hash = '',
            param = '',
            ohash = '',
            returnUrl = '',
            params = {};
        var url = location.href;
        var urls = url.split('#');
        url = urls[0];
        hash = urls[1] ? urls[1] : '';
        url = url.split('?');
        search = url[1] ? url[1] : '';
        prefix = url[0];
        if (hash) {
            // search加在单页hash后面如：index.html?aa&bb&cc/#/a?b&c&d
            hash = hash.split('?');
            ohash = hash[0];
            param = hash[1] ? hash[1] : '';
        }
        // returnUrl = prefix+(search?'&'+search:'')+(param?'&'+param:'')+ohash;
        if (search) {
            // search = '?'+search;
            if (param) {
                param = '&' + param
            }
            search = search + param;
        } else {
            // if(param){
            //     param = '?'+param
            // }
            search = search + param;
        }
        param = search.split('&');
        for (var i = 0; i < param.length; i++) {
            var a = param[i].split('=');
            params[a[0]] = a[1] || '';
        }

        return {
            prefix: prefix,
            search: search,
            params: params,
            hash: ohash
        }
    }

    /* 新会员通用拦截器
     * options: Object
     *      channel: 渠道代码
     *      agents: 拦截渠道，omm-mobile 统一使用bow请求模块
     *      target: 登录或拦截后回跳地址
     * 调用：
     *      各模块页面调用 ald.authInit({...})
     *      正常情况下，authInit 仅调用一次即可；可以调用多次，后面再次调用请不要传 agents
     */
    function authInit(options) {
        var targets = getRefererUrl();
        // var opt = {
        //     channel: 'C0012',
        //     target: encodeURIComponent(targets.prefix + (targets.search ? '?' + targets.search : '') + (targets.hash ? '#' + targets.hash : ''))
        // };
        // var opts = Object.assign({}, opt, options);

        var opts = options || {};
        if (options && options.channel)
            opts.channel = options.channel;
        else
            opts.channel = 'C0012';

        // 口袋3.0之后拦截
        if (appInfo.appVersion >= '3.0.0') {
            AuthCore.init({
                //渠道，指定掉起登陆界面时，传递的渠道信息
                channel: opts.channel,
                // 指定初始化后，拦截哪些库的请求
                // 默认，根据当前上下文检查是否使用ajax或bow，进行拦截
                // 如果不使用默认agents的方式，可以不传该参数，使用手动调起登陆页面的方法
                agents: ["bow"],
                //合作方接入通道
                partnerId: "",
                config: {
                    INTERCEPT_CONFIGS: {
                        // * 314  未开通 一类户或互联网用户 110
                        // 您还未添加账户，点击添加即可使用。
                        310: {
                            dontCallback: true,
                            // //执行的方法
                            // execMethod: "launchAccount",
                            tipConfig: {
                                title: "温馨提示",
                                message: "您还未添加账户，点击添加即可使用。",
                                leftButtonText: "取消",
                                rightButtonText: "立即添加",
                                leftButtonAction: "none",
                                rightButtonAction: "launchAccount"
                            }
                        },
                        311: {
                            dontCallback: true,
                            // //执行的方法
                            // execMethod: "launchAccount",
                            tipConfig: {
                                title: "温馨提示",
                                message: "您还未添加账户，点击添加即可使用。",
                                leftButtonText: "取消",
                                rightButtonText: "立即添加",
                                leftButtonAction: "none",
                                rightButtonAction: "launchAccount"
                            }
                        },
                        390: {
                            dontCallback: true,
                            //执行的方法
                            execMethod: "launchLoginMy"
                        },
                        //391     登陆态安全级别不够!                           提示并引导登陆
                        391: {
                            dontCallback: true,
                            execMethod: "launchLoginMy"
                        },
                        //393     未登陆!                                     提示并引导登陆
                        393: {
                            dontCallback: true,
                            execMethod: "launchLoginMy"
                        },
                    }
                }
            });
            console.log('init auth', AuthCore)
        }
    }
    global.AuthCore.none = function(){
        Loading.close();
    }

    global.AuthCore.launchLoginMy = function(){
        Loading.close();
        AuthCore.launchLogin();
    }

    global.AuthCore.launchAccount = function() {
        Loading.close();
        var referer = getRefererUrl();
        var forwardParam = '',
            returnUrl = '',
            halfUrl = '',
            refererParams = '';
        var env = ENV || 'prd';
        var forwardUrl = 'https://bank-static' + (env == 'prd' ? '' : '-stg') + '.pingan.com.cn/brac-ia/accountManager/pages/addCardRouter.html';

        // 拼主机头
        returnUrl += referer.prefix;
        // 拼search
        if (referer.search)
            returnUrl += '?' + referer.search;
        // 拼hash
        if (referer.hash)
            returnUrl += '#' + referer.hash;

        var params = {
            businessType: '02',
            channelCode: 'C0012',
            sceneId: '03',
            url: returnUrl,
            config: '01'
        };

        forwardParam = '?' + encodeURIComponent(JSON.stringify(params));
        location.replace(forwardUrl + forwardParam);
    }
    global.authInit = authInit;
    authInit();
}(window, undefined));
