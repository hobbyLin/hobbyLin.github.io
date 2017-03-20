/**
 * Created by Administrator on 2017/2/28.
 */
// 公共配置文件 包括公共常量 配置方法
;(function(win){
    console.log('这是config文件');
    win.App = {};
    var ua = navigator.userAgent.toUpperCase();
    App.debug = true;
    App.IS_ANDROID= ua.indexOf("ANDROID") != -1;
    console.log(ua.indexOf("ANDROID"))
    App.IS_IPAD =  ua.indexOf('IPAD') != -1;
    App.IS_IPHONE = ua.indexOf("IPHONE") != -1;
    App.clickDown = (App.IS_ANDROID ||  App.IS_IPAD || App.IS_IPHONE) ? "touchstart" : "mousedown";
    App.clickUp = (App.IS_ANDROID ||  App.IS_IPAD || App.IS_IPHONE) ? "touchend" : "mouseup";




})(this)