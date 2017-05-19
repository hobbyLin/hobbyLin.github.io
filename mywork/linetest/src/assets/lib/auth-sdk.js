(function (global, undefined) {
    "use strict";

    //统一会员中心SDK核心配置

    global.__AUTH_SDK_CONFIG__ = {
        //运行时环境
        runtimes: {
            //口袋App
            PAE_BANK_APP: "paebank",
            //手机浏览器
            MOBILE_BROWSER: "mb",
            //PC浏览器
            PC_BROWSER: "pc",
            //微信
            WE_CHAT: "wechat"
        },
        onIntercepted: function onIntercepted(code, msg) {},
        //必须清理数据的状态码
        MUST_CLEAR_DATA_CODES: ["393", "390", "391", "394"],
        //引导绑定银行卡的状态吗
        GUIDE_BIND_CARD_CODES: ["310", "311", "312", "3121", "313", "3131"],
        /**
         *  1、 授权结果代号(code)：HeaderName：UC-AUTH-CODE，HeaderValue，整型(int)
         *  2、 授权结果消息(msg)：HeaderName：UC-AUTH-MSG，HeaderValue，字符串(string，URLEncode)，
         *  获取需要使用方法：decodeURIComponent(msg);
         *  3、响应代号：
         *  --311     未激活网银用户!                                引导加挂卡
         *  --312     未激活互联网账户用户!                         引导II类户身份验证
         *  --3121    未持有II类户!                                引导注册II类户
         *  313     未激活信用卡用户!                               引导信用卡用户身份验证
         *  3131    未持有信用卡!                                 引导申请信用卡
         *  --310     会员未绑定银行客户，三个用户都未激活!             引导加挂卡
         *  390     会话已超时或已失效!                            提示并引导登陆
         *  394     被强制下线!                                  提示并引导登陆
         *  391     登陆态安全级别不够!                           提示并引导登陆
         *  393     未登陆!                                     提示并引导登陆
         *  --395     一账通登陆，缺失会员手机号!                    引导注册新会员
         *  399     其它错误!                                   提示系统错误
         * 字段用途： 定义每一个被拦截状态码最终调用的方法名(也就是最终执行的操作)
         */
        INTERCEPT_CONFIGS: {
            /***会员中心状态码***/
            //390     会话已超时或已失效!                            提示并引导登陆
            390: {
                dontCallback: true,
                //执行的方法
                execMethod: "launchLogin"
            },
            //391     登陆态安全级别不够!                           提示并引导登陆
            391: {
                dontCallback: true,
                execMethod: "launchLogin"
            },
            //393     未登陆!                                     提示并引导登陆
            393: {
                dontCallback: true,
                execMethod: "launchLogin"
            },
            //394     被强制下线!                                  提示并引导登陆
            394: {
                dontCallback: true,
                tipConfig: {
                    title: "温馨提示(394)",
                    message: "您已强制下线，请重新登录.",
                    leftButtonText: "重置密码",
                    rightButtonText: "立即登录",
                    leftButtonAction: "launchResetPassword",
                    rightButtonAction: "launchLogin"
                }
            },
            /****提示系统错误****/
            //399     其它错误!                                   提示系统错误
            399: {
                dontCallback: true,
                tipConfig: {
                    title: "提示(399)",
                    message: "系统错误",
                    buttonText: "确定",
                    action: "none"
                }
            },
            310: {
                dontCallback: true,
                tipConfig: {
                    title: "温馨提示(310)",
                    message: "添加一张银行卡即可使用该服务， 您可添加平安银行或其他银行的银行卡",
                    leftButtonText: "以后再说",
                    rightButtonText: "立即添加",
                    leftButtonAction: "none",
                    rightButtonAction: "launchBindBankCard"
                }
            },
            /***********下面的状态码会员中心默认不处理，但是执行拦截，避免其它模块踢掉会员的会话态**********/
            311: {
                dontCallback: true,
                // execMethod: "none"
                tipConfig: {
                    title: "温馨提示(311)",
                    message: "添加一张银行卡即可使用该服务， 您可添加平安银行或其他银行的银行卡",
                    leftButtonText: "以后再说",
                    rightButtonText: "立即添加",
                    leftButtonAction: "none",
                    rightButtonAction: "launchBindBankCard"
                }
            },
            312: {
                dontCallback: true,
                tipConfig: {
                    title: "温馨提示(312)",
                    message: "添加一张银行卡即可使用该服务， 您可添加平安银行或其他银行的银行卡",
                    leftButtonText: "以后再说",
                    rightButtonText: "立即添加",
                    leftButtonAction: "none",
                    rightButtonAction: "launchBindBankCard"
                }
            },
            3121: {
                dontCallback: true,
                tipConfig: {
                    title: "温馨提示(3121)",
                    message: "添加一张银行卡即可使用该服务， 您可添加平安银行或其他银行的银行卡",
                    leftButtonText: "以后再说",
                    rightButtonText: "立即添加",
                    leftButtonAction: "none",
                    rightButtonAction: "launchBindBankCard"
                }
            },
            313: {
                dontCallback: true,
                tipConfig: {
                    title: "温馨提示(313)",
                    message: "添加一张银行卡即可使用该服务， 您可添加平安银行或其他银行的银行卡",
                    leftButtonText: "以后再说",
                    rightButtonText: "立即添加",
                    leftButtonAction: "none",
                    rightButtonAction: "launchBindBankCard"
                }
            },
            3131: {
                dontCallback: true,
                tipConfig: {
                    title: "温馨提示(3131)",
                    message: "添加一张银行卡即可使用该服务， 您可添加平安银行或其他银行的银行卡",
                    leftButtonText: "以后再说",
                    rightButtonText: "立即添加",
                    leftButtonAction: "none",
                    rightButtonAction: "launchBindBankCard"
                }
            }
        },
        /**
         * 界面配置
         */
        pageConfig: {
            //页面上面的头部
            head: {
                //是否显示
                show: true,
                //最大可配20字符
                text: ""
            },
            //登录页面上的logo
            logo: {
                show: true,
                url: ""
            },
            //登录用户名
            username: {
                //值
                value: "",
                //是否掩码
                mask: false,
                //是否可编辑
                editable: true
            },
            //最多支持10个字符
            buttonText: "登录",
            //按钮下方的链接,第一位代表：忘记密码，第二位代表： 快速注册， 0表示不显示，1表示显示
            links: "11",
            //话术, 默认不显示,话术编号对应的话术文案
            patters: {
                1: "",
                2: ""
            },
            //协议,默认无协议
            protocol: {
                show: false,
                //协议内容{{链接显示内容}}协议内容后面的文本
                text: "",
                //协议文档链接地址
                linkURL: ""
            },
            //推荐人
            referee: false,
            //绑定微信,仅微信环境有效
            bindWeChat: {
                //是否显示微信绑定
                enable: false
            },
            //解绑微信
            unbindWeChat: {
                //是否显示微信解绑
                enable: false
            }
        }
    };
})(window);
(function (global, config, undefined) {
    "use strict";
    //生产

    var _LOGIN, _FORGET_PASSWORD, _BIND_BANK_CARD;

    var _config$runtimes = config.runtimes,
        MOBILE_BROWSER = _config$runtimes.MOBILE_BROWSER,
        PAE_BANK_APP = _config$runtimes.PAE_BANK_APP,
        PC_BROWSER = _config$runtimes.PC_BROWSER,
        WE_CHAT = _config$runtimes.WE_CHAT;

    //组件的主入口定义

    config.componentsMainGate = {
        //登录
        LOGIN: (_LOGIN = {}, _LOGIN[MOBILE_BROWSER] = "https://bank-static.pingan.com.cn/ibank/member/mobile/login/pages/login.html", _LOGIN[PC_BROWSER] = "https://bank-static.pingan.com.cn/ibank/member/mobile/login/pages/login.html", _LOGIN[WE_CHAT] = "https://bank-static.pingan.com.cn/ibank/member/wechat/login/pages/login.html", _LOGIN),
        FORGET_PASSWORD: (_FORGET_PASSWORD = {}, _FORGET_PASSWORD[PAE_BANK_APP] = "/member/forget-password/pages/find-password.html", _FORGET_PASSWORD[MOBILE_BROWSER] = "https://bank-static.pingan.com.cn/ibank/member/mobile/forget-password/pages/find-password.html", _FORGET_PASSWORD[PC_BROWSER] = "https://bank-static.pingan.com.cn/ibank/member/mobile/forget-password/pages/find-password.html", _FORGET_PASSWORD[WE_CHAT] = "https://bank-static.pingan.com.cn/ibank/member/wechat/forget-password/pages/find-password.html", _FORGET_PASSWORD),
        BIND_BANK_CARD: (_BIND_BANK_CARD = {}, _BIND_BANK_CARD[PAE_BANK_APP] = "https://bank-static.pingan.com.cn/brac-ia/accountManager/pages/addCardRouter.html", _BIND_BANK_CARD[MOBILE_BROWSER] = "https://bank-static.pingan.com.cn/brac-ia/accountManager/pages/addCardRouter.html", _BIND_BANK_CARD[PC_BROWSER] = "https://bank-static.pingan.com.cn/brac-ia/accountManager/pages/addCardRouter.html", _BIND_BANK_CARD[WE_CHAT] = "https://bank-static.pingan.com.cn/brac-ia/accountManager/pages/addCardRouter.html", _BIND_BANK_CARD)
    };
})(window, __AUTH_SDK_CONFIG__);
(function (global, config, undefined) {
    "use strict";

    var userAgent = navigator.userAgent;

    var runtimeEnv = config.runtimes.MOBILE_BROWSER;

    if (userAgent.indexOf("PAEBank") > 0) {
        runtimeEnv = config.runtimes.PAE_BANK_APP;
    }

    if (userAgent.indexOf("MicroMessenger") > 0) {
        runtimeEnv = config.runtimes.WE_CHAT;
    }
    //TODO: 完善运行时环境检查


    global.__RUNTIME_ENVIRONMENT__ = runtimeEnv;
})(window, __AUTH_SDK_CONFIG__);
/**
 * 统一登陆业务插件引用的sdk
 */
(function (global, config, runtime, undefined) {
    "use strict";
    //判断页面是否已经成功加载的标识,因为未成功加载时，直接跳转页面，该页面不在历史记录中，因此做此处理

    var isPageLoaded = false;

    var oldOnLoad = global.onload;

    var injectedStyle = void 0;

    var injectedScaleStyle = void 0;

    function debounce(fn, delay) {
        var timer = null;

        return function () {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(fn, delay || 50);
        };
    }

    if (runtime === config.runtimes.PAE_BANK_APP) {
        isPageLoaded = true;
    } else {
        global.onload = function () {
            if (typeof oldOnLoad === 'function') {
                oldOnLoad.apply(this, Array.prototype.slice.call(arguments));
            }

            setTimeout(function () {
                isPageLoaded = true;
            }, 10);
        };
    }

    var tipOpened = false;

    function _injectStyle() {

        if (!!injectedStyle) {
            document.head.removeChild(injectedStyle);
        }

        if (!!injectedScaleStyle) {
            document.head.removeChild(injectedScaleStyle);
        }

        var cssCode = '.aladdin-dialog{position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;display:-webkit-box;-webkit-box-orient:horizontal;-webkit-box-pack:center;-webkit-box-align:center;background:rgba(0,0,0,.12)}div.aladdin-dialog-content{font-size: 13px;/*box-shadow:1px 1px 10px 6px rgba(0,0,0,.5);*/border-radius:15px;width:270px;-webkit-background-clip:padding-box;background-clip:padding-box;pointer-events:auto;background-color:rgba(253,253,253,1);position:relative;}.aladdin-dialog-header{height:48px;line-height:48px;text-align:center;position:relative;border-bottom:1px solid #ded8d8}.aladdin-dialog-body{min-height:40px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom:1px solid #ded8d8;padding:18px;display:-webkit-box;display:box;-webkit-box-pack:center;-webkit-box-align:center;-webkit-box-orient:vertical}.aladdin-dialog-body>div{width:100%;text-align:center}.aladdin-dialog-footer{height:42px;line-height:42px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;width:100%}.aladdin-dialog-footer-btn{color:#157EFB;font-size: 16px;text-align:center;width:100%;line-height:42px;text-align:center;display:inline-block}.aladdin-dialog-footer-left{font-weight: 500;width:49%;border-right:1px solid #ded8d8}.aladdin-dialog-footer-right{width:49%}';
        injectedStyle = __injectStyle(cssCode);
        // let styleEl = document.createElement('style');
        // styleEl.setAttribute("type", "text/css");
        // if (styleEl.styleSheet) { //ie
        //     styleEl.styleSheet.cssText += cssCode;
        // } else if (document.getBoxObjectFor) {
        //     styleEl.innerHTML += cssCode; //火狐支持直接innerHTML添加样式表字串
        // } else {
        //     styleEl.appendChild(document.createTextNode(cssCode));
        // }
        // document.head.appendChild(styleEl);

        var metaEl = document.querySelector('meta[name="viewport"]');
        if (metaEl) {
            var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
            if (match) {
                var scale = parseFloat(match[1]);
                if (scale < 1) {
                    var dpr = parseFloat(1 / scale);
                } else {
                    dpr = 1;
                }
                injectedScaleStyle = __injectStyle('.aladdin-dialog-content{transform: scale(' + dpr + ',' + dpr + ');}');
            }
        }
    }

    //监听窗口大小变化，做窗口大小自适应
    window.addEventListener("resize", debounce(_injectStyle, 50), false);

    function __injectStyle(css) {

        if (!css) {
            return;
        }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);

        return style;
    }

    var utils = global.__AUTH_UTILS__ = {
        /**
         * 给URL加上query string参数
         * @param url {String} URL地址
         * @param params {Object} 要加的参数对象
         * @returns {String} 拼接参数之后的url地址
         */
        addParams: function addParams(url, params) {
            if (!params) {
                return url;
            }

            for (var key in params) {
                if (params.hasOwnProperty(key) && params[key] !== undefined) {
                    if (url.indexOf("?") > 0) {
                        url += "&" + key + "=" + encodeURIComponent(params[key]);
                    } else {
                        url += "?" + key + "=" + encodeURIComponent(params[key]);
                    }
                }
            }

            return url;
        },

        /**
         * 唤起一个在线组件
         * @param componentName {String} 组件名
         * @param target {String} 跳转到的目标界面
         * @param channel {String} 渠道信息
         */
        launchComponent: function launchComponent(componentName, target, channel, partnerId, pageConfig) {
            //构造组件的参数
            // let params = {
            //     referer: location.href,
            //     target,
            //     channel
            // };

            //拿到组件入口地址
            // let componentMainGateURL = config.componentsMainGate[componentName][runtime];

            // if(!!channel) {
            //     params.channel = channel;
            // }
            //
            // if(!!target) {
            //     params.target = target;
            // }

            // componentMainGateURL += "?t=" + btoa(JSON.stringify(params));
            //没传递目标页面，且页面还没加载完成
            if (!target && !isPageLoaded) {
                target = location.href;
            }

            location.assign(utils.getLaunchURL(componentName, target, channel, partnerId, btoa(utils.toUnicode(JSON.stringify(pageConfig)))));
        },

        /**
         * 唤起native组件
         * @param componentName {String} 组件名
         * @param target {String} 跳转到的目标界面
         * @param channel {String} 渠道信息
         * @param partnerId {String} 合作方接入通道
         * @param callback {Function} 回调函数
         */
        launchNativeComponent: function launchNativeComponent(componentName, target, channel, partnerId, callback) {
            //拿到要打开的目标地址
            var componentMainGateURL = utils.getLaunchURL(componentName, target, channel, partnerId);
            try {
                bow.navigator.forward({
                    url: componentMainGateURL
                }, callback);
            } catch (e) {
                callback({ message: "Auth SDK在口袋app中运行需依赖bow和aladdin,请确认已正确加载依赖。" }, null);
                //在口袋网银中，需要使用bow
                // console.error("Auth SDK在口袋app中运行需依赖bow和aladdin,请确认已正确加载依赖。");
            }
        },
        getLaunchURL: function getLaunchURL(componentName, target, channel, partnerId, pageConfigB64) {
            //构造组件的参数
            var params = {
                referer: location.href,
                target: target,
                channel: channel,
                partnerId: partnerId,
                config: pageConfigB64
            };

            //拿到组件入口地址
            var componentMainGateURL = config.componentsMainGate[componentName][runtime];
            return utils.addParams(componentMainGateURL, params);
        },

        //初始化时，插入样式
        init: function init() {
            // if(runtime !== config.runtimes.PAE_BANK_APP) {
            _injectStyle();
            // }
        },
        /**
         * 打开一个提示框
         * @param tipConfig
         * @param options
         * @param code
         */
        openTip: function openTip(tipConfig, options, code) {

            if (tipOpened) {
                return;
            }
            tipOpened = true;
            //非口袋App中，弹出自定义弹出层
            var tipHtml = '<div class="aladdin-dialog">' + '<div class="aladdin-dialog-content">';
            if (tipConfig.title) {
                // tipHtml += '<div class="aladdin-dialog-header">' + tipConfig.title + '</div>';
            }
            tipHtml += '<div class="aladdin-dialog-body"><div>' + utils.htmlEscape(tipConfig.message) + '</div></div>' + '<div class="aladdin-dialog-footer">';

            if (tipConfig.buttonText) {
                tipHtml += '<span class="aladdin-dialog-footer-btn">' + utils.htmlEscape(tipConfig.buttonText) + '</span>';
            } else if (tipConfig.leftButtonText && tipConfig.rightButtonText) {
                tipHtml += '<span class="aladdin-dialog-footer-btn aladdin-dialog-footer-left">' + utils.htmlEscape(tipConfig.leftButtonText) + '</span>';
                tipHtml += '<span class="aladdin-dialog-footer-btn aladdin-dialog-footer-right">' + utils.htmlEscape(tipConfig.rightButtonText) + '</span>';
            } else {
                console.error("The auth code tip config invalid [" + JSON.stringify(tipConfig) + "], please check your code.");
                return;
            }

            tipHtml += '</div></div></div>';

            var tipElem = document.createElement('div');
            tipElem.className = 'aladdin-dialog';
            tipElem.innerHTML = tipHtml;
            document.body.appendChild(tipElem);

            tipElem.addEventListener("touchstart", function (event) {
                event.preventDefault();
            }, false);
            var buttonEls = tipElem.getElementsByClassName('aladdin-dialog-footer-btn');

            function removeTipDialog() {
                tipElem.style.visibility = 'hidden';
                tipOpened = false;
                setTimeout(function () {
                    tipElem.remove();
                }, 1200);
                try {
                    buttonEls[0].removeEventListener("touchstart", singleButtonHandler);
                    buttonEls[0].removeEventListener("touchstart", leftButtonHandler);
                    buttonEls[1].removeEventListener("touchstart", rightButtonHandler);
                } catch (e) {
                    //ignore this
                }
            }

            function singleButtonHandler(event) {
                removeTipDialog();
                AuthCore[tipConfig.action].call(AuthCore, options);
            }

            function leftButtonHandler(event) {
                //添加监控
                if (__RUNTIME_ENVIRONMENT__ === config.runtimes.PAE_BANK_APP && ~config.GUIDE_BIND_CARD_CODES.indexOf(code)) {
                    //添加监控
                    try {
                        bow.call("bowtalkingData", "trackEvent", {
                            eventId: '05-登录',
                            eventLabel: '0512001-弹框引导添加银行卡-以后再说'
                        }, function (err, cb) {
                            //ignore this
                        });
                    } catch (e) {
                        //ignore this
                    }
                }
                removeTipDialog();
                AuthCore[tipConfig.leftButtonAction].call(AuthCore, options);
            }

            function rightButtonHandler(event) {
                if (__RUNTIME_ENVIRONMENT__ === config.runtimes.PAE_BANK_APP && ~config.GUIDE_BIND_CARD_CODES.indexOf(code)) {
                    //添加监控
                    try {
                        bow.call("bowtalkingData", "trackEvent", {
                            eventId: '05-登录',
                            eventLabel: '0512002-弹框引导添加银行卡-立即添加'
                        }, function (err, cb) {
                            //ignore this
                        });
                    } catch (e) {
                        //ignore this
                    }
                }

                removeTipDialog();
                AuthCore[tipConfig.rightButtonAction].call(AuthCore, options);
            }

            if (tipConfig.buttonText && buttonEls[0]) {
                buttonEls[0].addEventListener("touchstart", singleButtonHandler, false);
            } else if (tipConfig.leftButtonText && tipConfig.rightButtonText && buttonEls[1]) {
                buttonEls[0].addEventListener("touchstart", leftButtonHandler, false);
                buttonEls[1].addEventListener("touchstart", rightButtonHandler, false);
            }
            // if(runtime !== config.runtimes.PAE_BANK_APP) {
            // } else {
            //     if(tipConfig.buttonText) {
            //         //alert
            //         try {
            //             bow.call("dialog", "alert", {
            //                 title: tipConfig.title,
            //                 message: tipConfig.message,
            //                 buttonText: tipConfig.buttonText,
            //                 callback: function () {
            //                     AuthCore[tipConfig.action].call(AuthCore, options);
            //                 }
            //             }, function (err) {
            //                 //ignore this
            //             });
            //             // bow.dialog.alert();
            //         } catch (e) {
            //             //ignore this
            //         }
            //
            //     } else if(tipConfig.leftButtonText && tipConfig.rightButtonText) {
            //         try {
            //             bow.call("dialog", "confirm", {
            //                 title: tipConfig.title,
            //                 message: tipConfig.message,
            //                 leftButtonText: tipConfig.leftButtonText,
            //                 rightButtonText: tipConfig.rightButtonText,
            //                 leftButtonCallback: function () {
            //                     AuthCore[tipConfig.leftButtonAction].call(AuthCore, options);
            //                 },
            //                 rightButtonCallback: function () {
            //                     AuthCore[tipConfig.rightButtonAction].call(AuthCore, options);
            //                 }
            //             }, function (err) {
            //                 //ignore this
            //             });
            //             // bow.dialog.confirm();
            //         } catch (e) {
            //             //ignore this
            //         }
            //     } else {
            //         console.error("The auth code tip config invalid [" + JSON.stringify(tipConfig) +  "], please check your code.");
            //     }
            // }
        },
        /**
         * 对String进行Unicode字符串混编，以兼容浏览器的atob和btoa
         * @param str
         * @returns {string}
         */
        toUnicode: function toUnicode() {
            var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

            var charArr = [];
            var charCode;
            for (var i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0xff) {
                    charArr[i] = str[i];
                } else {
                    charArr[i] = '\\u' + charCode.toString(16);
                }
            }
            return charArr.join('');
        },
        htmlEscape: function htmlEscape() {
            var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return ('' + str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    };
})(window, __AUTH_SDK_CONFIG__, __RUNTIME_ENVIRONMENT__);
/**
 * 用途: 用户代理的拦截代理
 *  311     未激活网银用户!                                引导加挂卡
 *  312     未激活互联网账户用户!                         引导II类户身份验证
 *  3121    未持有II类户!                                引导注册II类户
 *  313     未激活信用卡用户!                               引导信用卡用户身份验证
 *  3131    未持有信用卡!                                 引导申请信用卡
 *  310     会员未绑定银行客户，三个用户都未激活!             引导加挂卡
 *  390     会话已超时或已失效!                            提示并引导登陆
 *  394     被强制下线!                                  提示并引导登陆
 *  391     登陆态安全级别不够!                           提示并引导登陆
 *  393     未登陆!                                     提示并引导登陆
 *  395     一账通登陆，缺失会员手机号!                    引导注册新会员
 *  399     其它错误!                                   提示系统错误
 */
(function (global, config, utils, runtime, undefined) {
    "use strict";
    //授权码拦截，拦截的交互，唤起不同组件

    function intercept(code, options, msg) {
        var interceptConfig = config.INTERCEPT_CONFIGS[code];

        // 当匹配到状态码对应的拦截方法时，执行拦截方法
        // 然后再执行回调，执行回调主要是为了兼容某些请求在发送时修改页面状态，请求响应之后需要反转页面状态的情况
        if (!!interceptConfig) {
            if (interceptConfig.tipConfig) {
                utils.openTip(interceptConfig.tipConfig, options, code, msg);
            } else if (interceptConfig.execMethod) {
                AuthCore[interceptConfig.execMethod].call(AuthCore, options, code, msg);
            }

            //触发拦截回调
            if (typeof config.onIntercepted === 'function') {
                config.onIntercepted(code, msg);
            }

            //阻止了原回调的调用
            if (interceptConfig.dontCallback) {
                if (runtime === config.runtimes.PAE_BANK_APP) {
                    try {
                        bow.call("loading", "stop", function (err) {
                            //stop loading
                        });
                    } catch (e) {
                        //ignore this
                    }
                }
                return true;
            }
        }
    }

    global.__AUTH_AGENTS_INTERCEPTORS__ = {
        /**
         * 处理bow.http.request方法的代理
         * @param options {Object} 代理处理时的必要参数
         *      {
         *          channel: {String} 渠道，需与会员中心后台，赵俊，黄登峰方获取具体业务的渠道字段
         *      }
         */
        bow: function (_bow) {
            function bow(_x) {
                return _bow.apply(this, arguments);
            }

            bow.toString = function () {
                return _bow.toString();
            };

            return bow;
        }(function (options) {
            //检查是否存在$.ajax方法，如果不存在，则抛出异常，并终止代码执行
            if (!global.bow || !bow.http || !bow.http.request) {
                // throw new Error("No bow.http.request method defined, please check your code!");
                console.warn("No bow.http.request method defined, please check your code!");
                return;
            }

            //将bow的http组件的request方法保存起来，并代理它
            var bowRequestMethod = bow.http.request;

            bow.http.request = function (opts, cb) {
                var _cb = function _cb(error, res) {
                    if (null !== error) {
                        cb(error, res);
                        return;
                    }

                    if (intercept(res.headers["UC-AUTH-CODE"], options, res.headers["UC-AUTH-MSG"])) {
                        return;
                    }

                    // let status = res.headers["UC-AUTH-CODE"];
                    // let interceptConfig = config.interceptStatusCodes[status];
                    //
                    // // 当匹配到状态码对应的拦截方法时，执行拦截方法
                    // // 然后再执行回调，执行回调主要是为了兼容某些请求在发送时修改页面状态，请求响应之后需要反转页面状态的情况
                    // if(!!interceptConfig && (interceptConfig.tipConfig || interceptConfig.execMethod)) {
                    //
                    //     intercept(code)
                    // }

                    cb(error, res);
                };

                return bowRequestMethod.call(this, opts, _cb);
            };
        }),
        /**
         * 处理ajax方法的代理
         * @param options {Object} 代理处理时的必要参数
         *      {
         *          channel: {String} 渠道，需与会员中心后台，赵俊，黄登峰方获取具体业务的渠道字段
         *      }
         */
        "$.ajax": function $Ajax() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


            //检查是否存在$.ajax方法，如果不存在，则抛出警告信息并终止代理
            if (!global.$ || !$.ajax) {
                // throw new Error("No $.ajax method defined, please check your code!");
                console.warn("No $.ajax method defined, please check your code!");
                return;
            }

            //将bow的http组件的request方法保存起来，并代理它
            var $ajax = $.ajax;

            $.ajax = function (opts) {
                var _success = opts.success;

                opts.success = function (responseData, status, xhr) {
                    try {
                        if (intercept(xhr.getResponseHeader("UC-AUTH-CODE"), options, xhr.getResponseHeader("UC-AUTH-MSG"))) {
                            return;
                        }
                    } catch (e) {
                        //ignore this, 可能是服务器没有对应的响应头且跨域，这种情况不进行处理
                        console.error("无UC-AUTH-CODE头，且跨域了。", e);
                    }

                    // let _status = xhr.getResponseHeader("UC-AUTH-CODE");
                    // let runMethod = config.interceptStatusCodes[_status];
                    // // 当匹配到状态码对应的拦截方法时，执行拦截方法
                    // // 然后再执行回调，执行回调主要是为了兼容某些请求在发送时修改页面状态，请求响应之后需要反转页面状态的情况
                    // if(typeof runMethod === 'string') {
                    //     AuthCore[runMethod].call(AuthCore, options);
                    // }

                    if (typeof _success === 'function') {
                        _success.call(this, responseData, status, xhr);
                    }
                };

                return $ajax.call($, opts);
            };
        }
    };
})(window, __AUTH_SDK_CONFIG__, __AUTH_UTILS__, __RUNTIME_ENVIRONMENT__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 统一登陆业务插件引用的sdk
 */
(function (global, config, utils, runtime, interceptors, undefined) {
    "use strict";

    var _inited = false;

    var _channel = null;

    var _partnerId = null;

    //所有的状态都是为了防止多次触发同一个动作设计的，比如已经打开了登录，后面的请求虽然会话已经过期，但是这个时候不宜再次打开登录
    var states = {
        //已启动登录组件
        loginLaunched: false,
        //已启动信用卡挂卡组件
        creditCardBindLaunched: false,
        //已启动申请信用卡组件
        creditCardApplyLaunched: false,
        //已启动申请信用卡组件
        bankCardBindLaunched: false
    };

    //当从其它任何流程回到当前流程时，将这些打开的状态重置
    global.addEventListener("pageshow", function () {
        for (var key in states) {
            states[key] = false;
        }
    });
    //当从其它任何流程回到当前流程时，将这些打开的状态重置
    try {
        aladdin.on("pageDidBack", function () {
            for (var key in states) {
                states[key] = false;
            }
        });
    } catch (e) {}
    //ignore this


    //不同运行时环境中的登录，绑卡等等组件的唤方法
    var runtimeMethods = {
        /*********************口袋银行App******************/
        "paebank": {
            //登录，在口袋银行中，登录组件的唤起依赖bow,app中不支持登录页面定制
            login: function login(target, channel, partnerId, pageConfig, forwardConfig) {
                try {
                    bow.auth.launchLogin(function (err, data) {
                        states.loginLaunched = false;
                        if (data.state == '0') {
                            forwardConfig.url = forwardConfig.url || target;
                            if (!!forwardConfig.url) {
                                if ((!forwardConfig.type || forwardConfig.type === "webapp") && forwardConfig.url.indexOf('http') > -1) {
                                    forwardConfig.tpl = forwardConfig.tpl || 'webview';
                                }

                                if (forwardConfig && forwardConfig.forwardInCurrentPage) {
                                    // when get type single_page, the means to goto frame in current context
                                    location.href = forwardConfig.url;
                                    return;
                                }

                                delete forwardConfig.forwardInCurrentPage;

                                bow.navigator.forward(forwardConfig);
                            }
                        } else {
                            aladdin.broadcast('cancelLogin', data, function (err) {
                                if (err) {
                                    //ignore this
                                    console.error("派发事件失败！");
                                }
                            });
                        }
                    });
                } catch (e) {
                    //在口袋网银中，需要使用bow
                    console.error("Auth SDK在口袋app中运行需依赖bow和aladdin,请确认已正确加载依赖。");
                }
            },
            forgetPassword: function forgetPassword() {
                if (states.resetPasswordLaunched) {
                    return;
                }
                states.resetPasswordLaunched = true;
                utils.launchNativeComponent("FORGET_PASSWORD", null, _channel, _partnerId, function (err) {
                    states.resetPasswordLaunched = false;
                    if (null !== err) {
                        console.error("调用bow.navigator.forward出错", err);
                    }
                });
            },
            bindBankCard: function bindBankCard() {
                var obj = {
                    businessType: "03",
                    sceneId: "01",
                    channelCode: "C0012",
                    source: 'KDAPP3',
                    outerSource: 'new_member',
                    url: location.href
                };
                var params = encodeURIComponent(JSON.stringify(obj));

                bow.navigator.forward({
                    tpl: "webview",
                    url: config.componentsMainGate['BIND_BANK_CARD'][runtime] + '?' + params
                });

                // utils.launchNativeComponent("BIND_BANK_CARD", null, _channel, _partnerId, function (err) {
                //     states.bankCardBindLaunched = false;
                //     if(null !== err) {
                //         console.error("调用bow.navigator.forward出错", err);
                //     }
                // });
            }
        },
        /*********************手机浏览器******************/
        "mb": {
            login: function login(target, channel, partnerId, pageConfig) {
                utils.launchComponent("LOGIN", target, channel || _channel, partnerId || _partnerId, pageConfig);
            },
            forgetPassword: function forgetPassword(target, channel, partnerId, pageConfig) {
                utils.launchComponent("FORGET_PASSWORD", target, channel || _channel, partnerId || _partnerId, pageConfig);
            },
            bindBankCard: function bindBankCard(target, channel, partnerId, pageConfig) {
                var obj = {
                    businessType: "03",
                    sceneId: "01",
                    channelCode: "C0012",
                    url: location.href
                };
                var params = encodeURIComponent(JSON.stringify(obj));

                location.assign(config.componentsMainGate['BIND_BANK_CARD'][runtime] + '?' + params);
            }
        },
        /*********************pc浏览器******************/
        "pc": {
            login: function login(target, channel, partnerId, pageConfig) {
                utils.launchComponent("LOGIN", target, channel || _channel, partnerId || _partnerId, pageConfig);
            },
            forgetPassword: function forgetPassword(target, channel, partnerId, pageConfig) {
                utils.launchComponent("FORGET_PASSWORD", target, channel || _channel, partnerId || _partnerId, pageConfig);
            },
            bindBankCard: function bindBankCard(target, channel, partnerId, pageConfig) {
                // utils.launchComponent("BIND_BANK_CARD", target, channel || _channel, partnerId || _partnerId, pageConfig);
                var obj = {
                    businessType: "03",
                    sceneId: "01",
                    channelCode: channel || _channel || "C0012",
                    url: target || location.href
                };
                var params = encodeURIComponent(JSON.stringify(obj));

                location.assign(config.componentsMainGate['BIND_BANK_CARD'][runtime] + '?' + params);
            }
        },
        /*********************微信客户端******************/
        "wechat": {
            login: function login(target, channel, partnerId, pageConfig) {
                utils.launchComponent("LOGIN", target, channel || _channel, partnerId || _partnerId, pageConfig);
            },
            forgetPassword: function forgetPassword(target, channel, partnerId, pageConfig) {
                utils.launchComponent("FORGET_PASSWORD", target, channel || _channel, partnerId || _partnerId, pageConfig);
            },
            bindBankCard: function bindBankCard(target, channel, partnerId, pageConfig) {
                var obj = {
                    businessType: "03",
                    sceneId: "01",
                    channelCode: "C0012",
                    url: location.href
                };
                var params = encodeURIComponent(JSON.stringify(obj));

                location.assign(config.componentsMainGate['BIND_BANK_CARD'][runtime] + '?' + params);
            }
        }
    };

    function _initInterceptors() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var agents = options.agents;
        var interceptor = null;

        //为所有预定义的用户代理初始化拦截器
        for (var i = 0, len = agents.length; i < len; i++) {
            interceptor = interceptors[agents[i]];

            if (typeof interceptor !== "function") {
                throw new Error("No interceptor find for agent [ " + agents[i] + " ], please check your code!");
            }
            //初始化拦截器
            interceptor({
                channel: _channel
            });
        }
    }

    /**
     * 深拷贝
     * @param dist
     * @param src
     * @private
     */
    function _deepCopy(dist, src) {

        for (var key in src) {
            //基本类型，直接赋值
            if (_typeof(src[key]) !== 'object') {
                dist[key] = src[key];
                continue;
            }

            if (!dist[key]) {
                dist[key] = Object.create(null);
            }

            _deepCopy(dist[key], src[key]);
        }
    }

    /**
     * 初始化配置信息
     * @param _configs
     * @private
     */
    function _initConfigs(_configs) {
        if (!_configs) {
            return;
        }

        for (var key in _configs) {
            //运行时环境不允许配置
            if (key === 'runtime') {
                continue;
            }

            //无这种配置，不管
            if (!config[key]) {
                continue;
            }

            //基本类型，直接赋值
            if (_typeof(_configs[key]) !== 'object') {
                config[key] = _configs[key];
                continue;
            }

            //对象，深拷贝
            _deepCopy(config[key], _configs[key]);
        }
    }

    global.AuthCore = {
        _VERSION: "0.0.1",
        /**
         * 初始化统一拦截组件
         * @param options {Object} 初始化选项
         *      {
         *          channel: {String} 渠道，需与会员中心后台，赵俊，黄登峰方获取具体业务的渠道字段
         *          agents: {Array} 发送请求的用户代理， 目前支持bow和$.ajax，初始化之后，Auth组件会拦截所有指定用户代理发送的请求，自动处理会员中心定义的错误状态码
         *      }
         */
        init: function init() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!_inited) {
                //初始化工具
                utils.init();

                _channel = options.channel;

                _partnerId = options.partnerId;

                if (!options.channel) {
                    //channel不能为空，初始化时，必须有channel
                    throw new Error("Channel option can't be empty, please check your code!");
                }
                //初始化拦截回调
                if (typeof options.onIntercepted === 'function') {
                    config.onIntercepted = options.onIntercepted;
                }
            }

            //首次初始化之后，后续调用init方法只有配置生效
            _initConfigs(options.config);

            if (!_inited) {
                _initInterceptors(options);
                _inited = true;
            }
        },
        /**
         * 唤起登录流程,唤起密码登录流程
         * @param options
         * @param code {String} 可选
         */
        launchLogin: function launchLogin() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var code = arguments[1];


            function login() {
                if (states.loginLaunched) {
                    return;
                }
                states.loginLaunched = true;

                var pageConfig = {};

                _deepCopy(pageConfig, config.pageConfig);
                _deepCopy(pageConfig, options.pageConfig || {});

                // 跳转配置，参数定义同Aladdin，forward API
                var forwardConfig = options.forwardConfig || {};

                runtimeMethods[runtime].login(options.target, options.channel, options.partnerId, pageConfig, forwardConfig);
            }

            //如果当前在App中运行且拦截的代码必须清理数据，则清理掉数据(兼容旧版本)
            if (runtime === config.runtimes.PAE_BANK_APP && ~config.MUST_CLEAR_DATA_CODES.indexOf(code)) {
                try {
                    // bow.sharedMemory.clear();
                    bow.auth.synLogout(login);
                } catch (e) {
                    //ignore this
                }
            } else {
                login();
            }
        },
        /**
         * 唤起opt登录界面
         * @param options
         * @param code
         */
        // launchOtpLogin: function (options = {}, code) {
        //     //如果当前拦截的代码必须清理数据，则清理掉数据(兼容旧版本)
        //     if(~config.MUST_CLEAR_DATA_CODES.indexOf(code)) {
        //         try{
        //             bow.sharedMemory.removeItem("Login_Info_Data");
        //         } catch (e) {
        //             //ignore this
        //         }
        //     }
        //
        //     if(states.loginLaunched) {
        //         return ;
        //     }
        //     states.loginLaunched = true;
        //     runtimeMethods[runtime].otpLogin(options.target, options.channel);
        // },
        /**
         * 跳转到银行卡绑定页
         */
        launchBindBankCard: function launchBindBankCard() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


            // if(runtime === config.runtimes.PAE_BANK_APP && !states.bankCardBindLaunched) {
            //
            //     states.bankCardBindLaunched = true;
            //     //App中跳转到银行卡绑页
            //     try {
            //         bow.navigator.forward({
            //             url: "/accountManage/pages/addCards/addCards.html"
            //         }, function (err) {
            //             states.bankCardBindLaunched = false;
            //             if(null !== err) {
            //                 console.error("调用bow.navigator.forward出错", err);
            //             }
            //         });
            //     } catch (e) {
            //         states.bankCardBindLaunched = false;
            //         console.error("调用bow.navigator.forward出错", e);
            //     }
            // } else {
            //     //其它环境跳转到银行卡绑定页
            //     // location.assign("https://bank.pingan.com/accountManage/pages/addCards/addCards.html");
            // }
            runtimeMethods[runtime].bindBankCard(options.target, options.channel || _channel, options.partnerId || _partnerId);
        },

        /**
         * 运行重置密码流程
         */
        launchResetPassword: function launchResetPassword() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            // if(runtime === config.runtimes.PAE_BANK_APP && !states.resetPasswordLaunched) {
            //     //App中跳转到银行卡绑页
            //     states.resetPasswordLaunched = true;
            //     utils.launchNativeComponent("FORGET_PASSWORD", null, _channel, _partnerId, function (err) {
            //         states.resetPasswordLaunched = false;
            //         if(null !== err) {
            //             console.error("调用bow.navigator.forward出错", err);
            //         }
            //     });
            //
            //     // try {
            //     //     bow.navigator.forward({
            //     //         url: "/member/forget-password/pages/find-password.html"
            //     //     }, function (err) {
            //     //         states.resetPasswordLaunched = false;
            //     //         if(null !== err) {
            //     //             console.error("调用bow.navigator.forward出错", err);
            //     //         }
            //     //     });
            //     //
            //     // } catch (e) {
            //     //     states.resetPasswordLaunched = false;
            //     //     console.error("调用bow.navigator.forward出错", e);
            //     // }
            // } else {
            //     //其它环境跳转到银行卡绑定页
            //     //location.assign("https://bank.pingan.com/accountManage/pages/addCards/addCards.html");
            //
            // }

            runtimeMethods[runtime].forgetPassword(options.target, options.channel || _channel, options.partnerId || _partnerId);
        },

        /**
         * 返回到前一个页面
         */
        back: function back() {
            if (runtime === config.runtimes.PAE_BANK_APP) {
                bow.navigator.back();
            } else {
                history.back();
            }
        },
        none: function none() {},

        openTip: function openTip(config) {
            utils.openTip(config, null, 0);
        }
    };
})(window, __AUTH_SDK_CONFIG__, __AUTH_UTILS__, __RUNTIME_ENVIRONMENT__, __AUTH_AGENTS_INTERCEPTORS__);