/**
 * 作者: bullub
 * 日期: 2016/12/19 17:02
 * 用途:
 */
"use strict";
(function (global, nav, undefined) {

    var getCurrentScript = function () {
        if (document.currentScript) {
            return document.currentScript.src;
        } else {
            var scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1].src;
        }
    };

    var src = getCurrentScript();

    var currentScriptBase = src.substring(0, src.lastIndexOf("/")) + "/";

    var ua = nav.userAgent;

    //默认运行纯web环境
    var runtime = '.web';

    //运行时是阿拉丁壳
    if(ua.indexOf("AladdinHybrid") > 0) {
        runtime = "";
    }

    //与运行时环境有关系的库文件
    var deps = [
        "aladdin.ibank{environment}.min.js"
        //"aladdin{environment}.min.js",
        // "./aladdin-loading/dist/aladdin.loading{environment}.js",
        // "./aladdin-toast/dist/aladdin.toast{environment}.js",
        // "./aladdin-dialog/dist/aladdin.dialog{environment}.js",
        //"bow{environment}.min.js",
    ];

    var depscripts = '';

    for(var i = 0, len = deps.length; i < len; i ++) {
        depscripts += '<script src="' + currentScriptBase + deps[i] + '"></script>\n';
    }

    document.write(depscripts.replace(/\{environment\}/g, runtime));

}(window, navigator));